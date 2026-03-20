import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createBloggrsChildBridge,
  type BloggrsBridgeCapabilities,
  type BloggrsBridgeRuntimeWindow,
  type BloggrsBridgeSessionPayload,
  type BloggrsBridgeThemePayload,
  type BloggrsChildBridge,
  parseBloggrsHostBootParams,
  type BloggrsWorkspaceSummary,
} from 'bloggrs.sdk';
import {
  PlaygroundApiClient,
  type PlaygroundContentInventory,
  type PlaygroundProductSummary,
  type PlaygroundSystemCatalogPayload,
  type PlaygroundStudioSummary,
} from '../api/client';

const BRIDGE_CAPABILITIES: BloggrsBridgeCapabilities = {
  routeSync: true,
  resizeSync: true,
  themeSync: true,
  sessionSync: true,
  save: false,
  publish: false,
  notifications: true,
};

function measureDocumentSize() {
  const documentElement = document.documentElement;
  const body = document.body;

  return {
    height: Math.ceil(
      Math.max(
        documentElement?.scrollHeight || 0,
        documentElement?.offsetHeight || 0,
        documentElement?.clientHeight || 0,
        body?.scrollHeight || 0,
        body?.offsetHeight || 0,
        body?.clientHeight || 0,
      ),
    ),
    width: Math.ceil(
      Math.max(
        documentElement?.scrollWidth || 0,
        documentElement?.offsetWidth || 0,
        documentElement?.clientWidth || 0,
        body?.scrollWidth || 0,
        body?.offsetWidth || 0,
        body?.clientWidth || 0,
      ),
    ),
  };
}

export function useWorkspaceApp() {
  const boot = useMemo(() => parseBloggrsHostBootParams(window.location.search), []);
  const [session, setSession] = useState<BloggrsBridgeSessionPayload | null>(null);
  const [theme, setTheme] = useState<BloggrsBridgeThemePayload | null>(null);
  const [summary, setSummary] = useState<BloggrsWorkspaceSummary | null>(null);
  const [studioSummary, setStudioSummary] = useState<PlaygroundStudioSummary | null>(null);
  const [inventory, setInventory] = useState<PlaygroundContentInventory | null>(null);
  const [product, setProduct] = useState<PlaygroundProductSummary | null>(null);
  const [systemCatalog, setSystemCatalog] = useState<PlaygroundSystemCatalogPayload | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const bridgeRef = useRef<BloggrsChildBridge | null>(null);
  const bridgeRuntime = useMemo<BloggrsBridgeRuntimeWindow>(
    () => ({
      addEventListener: window.addEventListener.bind(window),
      removeEventListener: window.removeEventListener.bind(window),
      setTimeout: (callback, timeoutMs) =>
        window.setTimeout(callback, timeoutMs),
      clearTimeout: handle => window.clearTimeout(handle as number),
    }),
    [],
  );

  const apiBaseUrl = session?.apiBaseUrl || boot.apiBaseUrl;
  const token = session?.authToken || '';
  const client = useMemo(() => new PlaygroundApiClient(apiBaseUrl, token), [apiBaseUrl, token]);

  const notify = useCallback((title: string, message: string, level: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setNotice(message);
    bridgeRef.current?.notify({ level, title, message });
  }, []);

  const loadSummary = useCallback(async () => {
    if (!boot.blogId || !apiBaseUrl || !token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const [nextSummary, nextStudioSummary, nextInventory, nextSystemCatalog] =
        await Promise.all([
        client.getWorkspaceSummary(boot.blogId),
        client.getStudioSummary(boot.blogId),
        client.getContentInventory(boot.blogId),
        client.getSystemCatalog(boot.blogId),
      ]);

      setSummary(nextSummary);
      setStudioSummary(nextStudioSummary);
      setInventory(nextInventory);
      setSystemCatalog(nextSystemCatalog);

      const linkedProductId = nextSummary.product?.productId || null;

      if (linkedProductId) {
        const nextProduct = await client.getProduct(linkedProductId);
        setProduct(nextProduct);
      } else {
        setProduct(null);
      }
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load the workspace.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl, boot.blogId, client, token]);

  useEffect(() => {
    if (!boot.parentOrigin || window.parent === window) {
      return;
    }

    const bridge = createBloggrsChildBridge({
      runtimeWindow: bridgeRuntime,
      parentWindow: () => window.parent,
      parentOrigin: boot.parentOrigin,
      localApp: 'playground',
    });
    bridgeRef.current = bridge;

    const disposeSession = bridge.onRequest('bridge.session.sync', payload => {
      setSession(payload);
      return { appliedAt: new Date().toISOString() };
    });
    const disposeTheme = bridge.onRequest('bridge.theme.sync', payload => {
      setTheme(payload);
      return { appliedAt: new Date().toISOString() };
    });
    const disposeRoute = bridge.onRequest('bridge.route.sync', payload => ({
      accepted: true,
      routePath: payload.routePath || window.location.hash.replace(/^#/, '') || '/overview',
    }));

    bridge
      .connect({
        appKey: 'playground',
        appLabel: 'Playground',
        routePath: window.location.hash.replace(/^#/, '') || '/overview',
        capabilities: BRIDGE_CAPABILITIES,
        sdkVersion: '0.3.0',
      })
      .then(handshake => {
        setSession(handshake.session);
        setTheme(handshake.theme);
        bridge.markReady({
          appKey: 'playground',
          appLabel: 'Playground',
          routePath: window.location.hash.replace(/^#/, '') || '/overview',
          readyAt: new Date().toISOString(),
          capabilities: BRIDGE_CAPABILITIES,
        });
      })
      .catch(() => undefined);

    return () => {
      disposeSession();
      disposeTheme();
      disposeRoute();
      bridge.destroy();
      bridgeRef.current = null;
    };
  }, [boot.parentOrigin, bridgeRuntime]);

  useEffect(() => {
    if (!theme) {
      return;
    }

    Object.entries(theme.tokens || {}).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  useEffect(() => {
    if (!boot.parentOrigin || window.parent === window) {
      return;
    }

    let frameHandle = 0;
    const queueResizeSync = () => {
      if (frameHandle) {
        return;
      }

      frameHandle = window.requestAnimationFrame(() => {
        frameHandle = 0;
        const bridge = bridgeRef.current;

        if (!bridge) {
          return;
        }

        const nextSize = measureDocumentSize();

        if (nextSize.height <= 0) {
          return;
        }

        bridge.sendResize(nextSize);
      });
    };

    queueResizeSync();

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            queueResizeSync();
          });
    const mutationObserver =
      typeof MutationObserver === 'undefined'
        ? null
        : new MutationObserver(() => {
            queueResizeSync();
          });

    resizeObserver?.observe(document.documentElement);

    if (document.body) {
      resizeObserver?.observe(document.body);
      mutationObserver?.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    window.addEventListener('resize', queueResizeSync);
    window.addEventListener('load', queueResizeSync);

    return () => {
      if (frameHandle) {
        window.cancelAnimationFrame(frameHandle);
      }

      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener('resize', queueResizeSync);
      window.removeEventListener('load', queueResizeSync);
    };
  }, [boot.parentOrigin]);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const saveProductDetails = useCallback(
    async (
      patch: Partial<PlaygroundProductSummary>,
      options: { syncDesignTokens?: boolean } = {},
    ) => {
      const productId = summary?.product?.productId || null;

      if (!productId || !product) {
        return { ok: false, message: 'No linked product to save.' };
      }

      const nextProduct: PlaygroundProductSummary = {
        ...product,
        ...patch,
        settings: patch.settings ?? product.settings ?? {},
        themeTokens: patch.themeTokens ?? product.themeTokens ?? {},
        seo: patch.seo ?? product.seo ?? {},
      };

      setError('');

      try {
        const savedProduct = await client.updateProduct(productId, {
          name: nextProduct.name,
          slug: nextProduct.slug,
          summary: nextProduct.summary,
          status: nextProduct.status,
          settings: nextProduct.settings || {},
          themeTokens: nextProduct.themeTokens || {},
          seo: nextProduct.seo || {},
        });

        setProduct(savedProduct);

        if (options.syncDesignTokens && boot.blogId) {
          await client.updateDesignTokens(boot.blogId, nextProduct.themeTokens || {});
        }

        notify(
          'Product saved',
          'Linked product details updated through the builder workspace.',
          'success',
        );
        await loadSummary();
        return { ok: true, message: 'Product saved.' };
      } catch (saveError) {
        const message =
          saveError instanceof Error ? saveError.message : 'Unable to save linked product.';
        setError(message);
        return { ok: false, message };
      }
    },
    [boot.blogId, client, loadSummary, notify, product, summary?.product?.productId],
  );

  return {
    boot,
    session,
    theme,
    summary,
    studioSummary,
    inventory,
    product,
    systemCatalog,
    loading,
    error,
    notice,
    setNotice,
    client,
    refresh: loadSummary,
    notify,
    saveProductDetails,
  };
}
