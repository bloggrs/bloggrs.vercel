import { useEffect, useState } from 'react';
import type {
  BloggrsRuntimeResolvePayload,
  BloggrsWorkspaceSummary,
} from 'bloggrs.sdk';
import type { PlaygroundApiClient } from '../../api/client';

const DEFAULT_RUNTIME_HOST = import.meta.env.VITE_PLATFORM_BLOG_URL || 'http://localhost:5175';

interface Props {
  summary: BloggrsWorkspaceSummary | null;
  documents: Array<Record<string, unknown>>;
  client: PlaygroundApiClient;
  blogId: string;
}

function normalizeRoutePath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return '/';
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function toRecord(value: unknown) {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function toArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function createAbsoluteUrl(pathname: string, search = '') {
  const url = new URL(DEFAULT_RUNTIME_HOST);
  url.pathname = pathname;
  url.search = search;
  return url.toString();
}

function formatDate(value: unknown) {
  if (typeof value !== 'string' || !value) {
    return 'Not available';
  }

  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export function PreviewRoute({ summary, documents, client, blogId }: Props) {
  const [routePath, setRoutePath] = useState('');
  const [preview, setPreview] = useState<BloggrsRuntimeResolvePayload | null>(null);
  const [error, setError] = useState('');
  const normalizedRoutePath = normalizeRoutePath(
    routePath || String(documents[0]?.routePath || '/'),
  );

  useEffect(() => {
    if (!blogId) {
      return;
    }

    let cancelled = false;

    async function loadPreview() {
      try {
        const nextPreview = await client.getRuntimePreview(blogId, normalizedRoutePath);

        if (!cancelled) {
          setPreview(nextPreview);
          setError('');
        }
      } catch (loadError) {
        if (!cancelled) {
          setPreview(null);
          setError(
            loadError instanceof Error ? loadError.message : 'Unable to resolve preview.',
          );
        }
      }
    }

    void loadPreview();

    return () => {
      cancelled = true;
    };
  }, [blogId, client, normalizedRoutePath]);

  const runtimeSiteSlug = summary?.runtime?.siteSlug || '';
  const publicUrl = runtimeSiteSlug
    ? createAbsoluteUrl(
        normalizedRoutePath === '/'
          ? `/sites/${encodeURIComponent(runtimeSiteSlug)}`
          : `/sites/${encodeURIComponent(runtimeSiteSlug)}${normalizedRoutePath}`,
      )
    : '';
  const previewUrl = blogId
    ? createAbsoluteUrl(
        '/runtime',
        `?view=preview&blogId=${encodeURIComponent(
          blogId,
        )}&routePath=${encodeURIComponent(normalizedRoutePath)}`,
      )
    : '';
  const payload = toRecord(preview?.payload);
  const resolvedDocument = toRecord(payload.document);
  const navigation = toArray(payload.navigation);
  const collections = toRecord(payload.collections);
  const collectionKeys = Object.keys(collections);

  return (
    <div className="workspace-stack">
      {error ? <div className="workspace-banner workspace-banner--error">{error}</div> : null}

      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Backend preview</span>
            <h2>Resolve a real runtime payload</h2>
            <p>
              Playground now reads the backend runtime resolver so preview reflects
              linked products, publications, and legacy content exactly as the API exposes them.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            {previewUrl ? (
              <a className="workspace-button" href={previewUrl} target="_blank" rel="noreferrer">
                Open draft preview
              </a>
            ) : null}
            {publicUrl ? (
              <a
                className="workspace-button workspace-button--secondary"
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open public route
              </a>
            ) : null}
          </div>
        </div>
      </article>

      <article className="workspace-panel">
        <div className="workspace-inline-actions">
          <label>
            <span>Route path</span>
            <input value={routePath} onChange={event => setRoutePath(event.target.value || '/')} />
          </label>
          <span className="workspace-chip">
            {String(toRecord(preview?.resolution).mode || 'preview')}
          </span>
          <span className="workspace-chip">
            {String(toRecord(preview?.resolution).source || 'runtime-resolve')}
          </span>
        </div>
        {documents.length ? (
          <div className="workspace-link-grid">
            {documents.map((document, index) => {
              const record = document as Record<string, unknown>;

              return (
                <button
                  className="workspace-link-card"
                  key={`${record.key || 'document'}-${index}`}
                  onClick={() => setRoutePath(String(record.routePath || '/'))}
                  type="button"
                >
                  <strong>{String(record.name || record.key || 'Document')}</strong>
                  <span>{String(record.routePath || '/')}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </article>

      <div className="workspace-grid">
        <article className="workspace-card">
          <span className="workspace-card-label">Document</span>
          <strong>{String(resolvedDocument.name || resolvedDocument.routePath || 'n/a')}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Navigation items</span>
          <strong>{navigation.length}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Collections</span>
          <strong>{collectionKeys.length}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Published at</span>
          <strong>{formatDate(toRecord(preview?.publication).publishedAt)}</strong>
        </article>
      </div>

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <h2>Resolved route</h2>
          <div className="workspace-detail-list">
            <div>
              <strong>Route path</strong>
              <span>{String(resolvedDocument.routePath || normalizedRoutePath)}</span>
            </div>
            <div>
              <strong>Status</strong>
              <span>{String(resolvedDocument.status || 'n/a')}</span>
            </div>
            <div>
              <strong>Publication</strong>
              <span>
                {String(
                  toRecord(preview?.publication).version ||
                    toRecord(preview?.publication).label ||
                    'Draft workspace preview',
                )}
              </span>
            </div>
          </div>
        </article>

        <article className="workspace-panel">
          <h2>Collections</h2>
          {collectionKeys.length ? (
            <div className="workspace-list">
              {collectionKeys.map(key => (
                <article className="workspace-list-item" key={key}>
                  <h3>{key}</h3>
                  <p>{toArray(collections[key]).length} items available.</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="workspace-empty-state">
              <h3>No collections resolved</h3>
              <p>The selected route payload did not include collection data.</p>
            </div>
          )}
        </article>
      </div>

      <article className="workspace-panel">
        <h2>Preview payload</h2>
        <pre className="workspace-code-block">{JSON.stringify(preview, null, 2)}</pre>
      </article>

      {previewUrl ? (
        <article className="workspace-panel">
          <h2>Draft runtime</h2>
          <iframe className="workspace-runtime-frame" src={previewUrl} title="Runtime preview" />
        </article>
      ) : null}
    </div>
  );
}
