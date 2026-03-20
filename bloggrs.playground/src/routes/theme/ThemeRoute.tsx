import { useState } from 'react';
import type { BloggrsWorkspaceSummary } from 'bloggrs.sdk';
import type {
  PlaygroundProductSummary,
  PlaygroundStudioSummary,
} from '../../api/client';

interface SaveOptions {
  syncDesignTokens?: boolean;
}

interface Props {
  summary: BloggrsWorkspaceSummary | null;
  studioSummary: PlaygroundStudioSummary | null;
  product: PlaygroundProductSummary | null;
  onSaveProduct: (
    patch: Partial<PlaygroundProductSummary>,
    options?: SaveOptions,
  ) => Promise<{ ok: boolean; message: string }>;
  onRefresh: () => Promise<void>;
}

type EditableNodeType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

interface EditableNode {
  id: string;
  path: string;
  valueType: EditableNodeType;
  value: string;
}

interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && !Array.isArray(value) && typeof value === 'object';
}

function inferNodeType(value: unknown): EditableNodeType {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return 'number';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  if (isPlainObject(value)) {
    return 'object';
  }

  return 'string';
}

function stringifyNodeValue(value: unknown, valueType: EditableNodeType) {
  switch (valueType) {
    case 'number':
      return Number.isFinite(value) ? String(value) : '';
    case 'boolean':
      return value ? 'true' : 'false';
    case 'null':
    case 'object':
    case 'array':
      return '';
    case 'string':
    default:
      return String(value ?? '');
  }
}

function flattenNodes(
  value: unknown,
  basePath = '',
  output: EditableNode[] = [],
  includeCurrent = false,
) {
  const nodeType = inferNodeType(value);

  if (includeCurrent && basePath) {
    output.push({
      id: createId('node'),
      path: basePath,
      valueType: nodeType,
      value: stringifyNodeValue(value, nodeType),
    });
  }

  if (nodeType === 'object') {
    Object.entries((value as Record<string, unknown>) || {}).forEach(([key, childValue]) => {
      const childPath = basePath ? `${basePath}.${key}` : key;
      flattenNodes(childValue, childPath, output, true);
    });
  }

  if (nodeType === 'array') {
    (value as unknown[]).forEach((childValue, index) => {
      const childPath = basePath ? `${basePath}.${index}` : String(index);
      flattenNodes(childValue, childPath, output, true);
    });
  }

  if (!basePath && !output.length) {
    output.push({
      id: createId('node'),
      path: '',
      valueType: 'object',
      value: '',
    });
  }

  return output;
}

function toEditableNodes(source: unknown) {
  return flattenNodes(source).sort((left, right) => left.path.localeCompare(right.path));
}

function parseNodeValue(node: EditableNode) {
  switch (node.valueType) {
    case 'number': {
      const parsed = Number(node.value);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    case 'boolean':
      return node.value === 'true';
    case 'null':
      return null;
    case 'object':
      return {};
    case 'array':
      return [];
    case 'string':
    default:
      return node.value;
  }
}

function isArraySegment(segment: string) {
  return /^\d+$/.test(segment);
}

function setDeepValue(
  target: Record<string, unknown> | unknown[],
  segments: string[],
  value: unknown,
) {
  let current: Record<string, unknown> | unknown[] = target;

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const nextSegment = segments[index + 1];
    const nextContainer = isArraySegment(nextSegment || '') ? [] : {};

    if (Array.isArray(current)) {
      const arrayIndex = Number(segment);

      if (isLast) {
        current[arrayIndex] = value;
        return;
      }

      if (current[arrayIndex] === undefined || current[arrayIndex] === null) {
        current[arrayIndex] = nextContainer;
      }

      current = current[arrayIndex] as Record<string, unknown> | unknown[];
      return;
    }

    if (isLast) {
      current[segment] = value;
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(current, segment) || current[segment] == null) {
      current[segment] = nextContainer;
    }

    current = current[segment] as Record<string, unknown> | unknown[];
  });
}

function buildStructureFromNodes(nodes: EditableNode[]) {
  const root: Record<string, unknown> = {};
  const orderedNodes = [...nodes]
    .filter(node => node.path.trim())
    .sort((left, right) => left.path.split('.').length - right.path.split('.').length);

  orderedNodes.forEach(node => {
    setDeepValue(root, node.path.split('.').filter(Boolean), parseNodeValue(node));
  });

  return root;
}

function readNavigationItems(settings: Record<string, unknown>) {
  const source = Array.isArray(settings.navigation) ? settings.navigation : [];

  return source.map(item => {
    if (typeof item === 'string') {
      return {
        id: createId('nav'),
        label: item,
        path: '/',
      };
    }

    if (isPlainObject(item)) {
      return {
        id: createId('nav'),
        label: String(item.label || item.name || 'Link'),
        path: String(item.path || item.href || '/'),
      };
    }

    return {
      id: createId('nav'),
      label: 'Link',
      path: '/',
    };
  });
}

function omitNavigation(settings: Record<string, unknown>) {
  const next = { ...settings };
  delete next.navigation;
  return next;
}

function buildNavigationItems(items: NavigationItem[]) {
  return items
    .map(item => ({
      label: item.label.trim(),
      path: item.path.trim(),
    }))
    .filter(item => item.label || item.path);
}

interface NodeEditorSectionProps {
  title: string;
  description: string;
  nodes: EditableNode[];
  onChange: (nodes: EditableNode[]) => void;
}

function NodeEditorSection({
  title,
  description,
  nodes,
  onChange,
}: NodeEditorSectionProps) {
  function updateNode(id: string, patch: Partial<EditableNode>) {
    onChange(nodes.map(node => (node.id === id ? { ...node, ...patch } : node)));
  }

  function removeNode(id: string) {
    onChange(nodes.filter(node => node.id !== id));
  }

  function addNode() {
    onChange([
      ...nodes,
      {
        id: createId('node'),
        path: '',
        valueType: 'string',
        value: '',
      },
    ]);
  }

  return (
    <article className="workspace-panel">
      <div className="workspace-toolbar">
        <div className="workspace-toolbar__copy">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="workspace-toolbar__actions">
          <button className="workspace-button workspace-button--secondary" onClick={() => addNode()}>
            Add field
          </button>
        </div>
      </div>

      <div className="workspace-list">
        {nodes.length ? (
          nodes.map(node => (
            <article className="workspace-list-item" key={node.id}>
              <div className="workspace-config-row">
                <input
                  placeholder="path.like.this or section.0.label"
                  value={node.path}
                  onChange={event => updateNode(node.id, { path: event.target.value })}
                />
                <select
                  value={node.valueType}
                  onChange={event =>
                    updateNode(node.id, {
                      valueType: event.target.value as EditableNodeType,
                      value:
                        event.target.value === 'boolean'
                          ? 'false'
                          : event.target.value === 'number'
                            ? '0'
                            : '',
                    })
                  }
                >
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                  <option value="object">object</option>
                  <option value="array">array</option>
                  <option value="null">null</option>
                </select>
                {node.valueType === 'object' ||
                node.valueType === 'array' ||
                node.valueType === 'null' ? (
                  <div className="workspace-config-row__placeholder">Container</div>
                ) : (
                  <input
                    placeholder="value"
                    value={node.value}
                    onChange={event => updateNode(node.id, { value: event.target.value })}
                  />
                )}
                <button
                  className="workspace-button workspace-button--danger"
                  onClick={() => removeNode(node.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))
        ) : (
          <article className="workspace-list-item">
            <p>No fields configured yet.</p>
          </article>
        )}
      </div>
    </article>
  );
}

export function ThemeRoute({ summary, studioSummary, product, onSaveProduct, onRefresh }: Props) {
  if (!product) {
    return (
      <article className="workspace-panel">
        <h2>No linked product</h2>
        <p className="workspace-muted">
          Playground can preview the workspace shape, but product config and deep navigation need
          a linked builder product before they can be edited safely.
        </p>
      </article>
    );
  }

  return (
    <ThemeEditorForm
      key={`${product.id}:${product.updatedAt || 'draft'}`}
      product={product}
      summary={summary}
      studioSummary={studioSummary}
      onSaveProduct={onSaveProduct}
      onRefresh={onRefresh}
    />
  );
}

interface ThemeEditorFormProps {
  summary: BloggrsWorkspaceSummary | null;
  studioSummary: PlaygroundStudioSummary | null;
  product: PlaygroundProductSummary;
  onSaveProduct: (
    patch: Partial<PlaygroundProductSummary>,
    options?: SaveOptions,
  ) => Promise<{ ok: boolean; message: string }>;
  onRefresh: () => Promise<void>;
}

function ThemeEditorForm({
  summary,
  studioSummary,
  product,
  onSaveProduct,
  onRefresh,
}: ThemeEditorFormProps) {
  const initialSettings = isPlainObject(product.settings) ? product.settings : {};
  const initialSeo = isPlainObject(product.seo) ? product.seo : {};
  const initialTheme = isPlainObject(product.themeTokens) ? product.themeTokens : {};

  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [productSummary, setProductSummary] = useState(product.summary || '');
  const [status, setStatus] = useState(product.status || 'draft');
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(
    readNavigationItems(initialSettings),
  );
  const [settingsNodes, setSettingsNodes] = useState<EditableNode[]>(
    toEditableNodes(omitNavigation(initialSettings)),
  );
  const [seoNodes, setSeoNodes] = useState<EditableNode[]>(toEditableNodes(initialSeo));
  const [themeNodes, setThemeNodes] = useState<EditableNode[]>(toEditableNodes(initialTheme));
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  function addNavigationItem() {
    setNavigationItems(current => [
      ...current,
      {
        id: createId('nav'),
        label: '',
        path: '/',
      },
    ]);
  }

  function updateNavigationItem(id: string, patch: Partial<NavigationItem>) {
    setNavigationItems(current =>
      current.map(item => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function removeNavigationItem(id: string) {
    setNavigationItems(current => current.filter(item => item.id !== id));
  }

  async function handleSave() {
    setIsSaving(true);
    setError('');
    setFeedback('');

    const settings = buildStructureFromNodes(settingsNodes);
    const navigation = buildNavigationItems(navigationItems);
    if (navigation.length) {
      settings.navigation = navigation;
    }

    const result = await onSaveProduct(
      {
        name: name.trim() || product.name,
        slug: slug.trim() || product.slug,
        summary: productSummary.trim() || null,
        status: status.trim() || product.status,
        settings,
        seo: buildStructureFromNodes(seoNodes),
        themeTokens: buildStructureFromNodes(themeNodes),
      },
      { syncDesignTokens: true },
    );

    setIsSaving(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setFeedback(result.message);
  }

  async function handleRefresh() {
    setError('');
    setFeedback('');
    await onRefresh();
  }

  return (
    <div className="workspace-stack">
      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Theme and product config</span>
            <h2>{product.name}</h2>
            <p>
              Edit linked product metadata, deep navigation, structured settings, SEO, and theme
              tokens through the node-backed builder product model.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <button
              className="workspace-button workspace-button--secondary"
              onClick={() => void handleRefresh()}
            >
              Reload
            </button>
            <button className="workspace-button" onClick={() => void handleSave()}>
              {isSaving ? 'Saving...' : 'Save config'}
            </button>
          </div>
        </div>
      </article>

      {error ? <div className="workspace-banner workspace-banner--error">{error}</div> : null}
      {feedback ? <div className="workspace-banner workspace-banner--success">{feedback}</div> : null}

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <h2>Product details</h2>
          <div className="workspace-form-grid">
            <label>
              <span>Name</span>
              <input value={name} onChange={event => setName(event.target.value)} />
            </label>
            <label>
              <span>Slug</span>
              <input value={slug} onChange={event => setSlug(event.target.value)} />
            </label>
            <label>
              <span>Status</span>
              <input value={status} onChange={event => setStatus(event.target.value)} />
            </label>
            <label className="workspace-form-span-2">
              <span>Summary</span>
              <textarea
                rows={4}
                value={productSummary}
                onChange={event => setProductSummary(event.target.value)}
              />
            </label>
          </div>
        </article>

        <article className="workspace-panel">
          <h2>Workspace summary</h2>
          <div className="workspace-detail-list">
            <div>
              <strong>Product type</strong>
              <span>{product.productType?.name || product.productType?.key || 'Unknown'}</span>
            </div>
            <div>
              <strong>Navigation links</strong>
              <span>{navigationItems.length}</span>
            </div>
            <div>
              <strong>Routes in workspace</strong>
              <span>{studioSummary?.studio?.routeCount || 0}</span>
            </div>
            <div>
              <strong>Preview path</strong>
              <code>{summary?.runtime?.previewUrl || summary?.runtime?.previewPath || 'n/a'}</code>
            </div>
            <div>
              <strong>Site status</strong>
              <span>{summary?.experience?.siteStatus || 'unconfigured'}</span>
            </div>
            <div>
              <strong>Updated</strong>
              <span>{product.updatedAt || 'n/a'}</span>
            </div>
          </div>
        </article>
      </div>

      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <h2>Navigation</h2>
            <p>
              Edit primary navigation directly as relational config fields instead of patching a
              JSON blob.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <button
              className="workspace-button workspace-button--secondary"
              onClick={() => addNavigationItem()}
            >
              Add link
            </button>
          </div>
        </div>

        <div className="workspace-list">
          {navigationItems.length ? (
            navigationItems.map(item => (
              <article className="workspace-list-item" key={item.id}>
                <div className="workspace-config-row">
                  <input
                    placeholder="Label"
                    value={item.label}
                    onChange={event =>
                      updateNavigationItem(item.id, { label: event.target.value })
                    }
                  />
                  <input
                    placeholder="/path"
                    value={item.path}
                    onChange={event =>
                      updateNavigationItem(item.id, { path: event.target.value })
                    }
                  />
                  <button
                    className="workspace-button workspace-button--danger"
                    onClick={() => removeNavigationItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <article className="workspace-list-item">
              <p>No navigation links configured.</p>
            </article>
          )}
        </div>
      </article>

      <NodeEditorSection
        title="Settings paths"
        description="Edit nested settings as dotted paths like `productSystem.customization.primaryAction`."
        nodes={settingsNodes}
        onChange={setSettingsNodes}
      />

      <div className="workspace-editor-layout">
        <NodeEditorSection
          title="SEO fields"
          description="Manage SEO keys without switching back to raw JSON."
          nodes={seoNodes}
          onChange={setSeoNodes}
        />
        <NodeEditorSection
          title="Theme tokens"
          description="Theme tokens stay editable as structured fields and still sync to the blog workspace."
          nodes={themeNodes}
          onChange={setThemeNodes}
        />
      </div>
    </div>
  );
}
