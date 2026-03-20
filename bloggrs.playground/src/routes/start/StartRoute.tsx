import { useState } from 'react';
import type { BloggrsWorkspaceSummary } from 'bloggrs.sdk';
import type {
  PlaygroundApiClient,
  PlaygroundStudioSummary,
  PlaygroundSystemCatalogPayload,
} from '../../api/client';

interface Props {
  summary: BloggrsWorkspaceSummary | null;
  studioSummary: PlaygroundStudioSummary | null;
  systemCatalog: PlaygroundSystemCatalogPayload | null;
  client: PlaygroundApiClient;
  blogId: string;
  onSaved: () => Promise<void>;
  onNotice: (message: string) => void;
}

interface StartDraft {
  blueprintKey: string;
  siteTitle: string;
  tagline: string;
}

const STORAGE_KEY = 'bloggrs.playground.start-draft';

function readBuilderConfig(summary: BloggrsWorkspaceSummary | null) {
  return (summary?.experience?.builderConfig || {}) as Record<string, unknown>;
}

function readStoredDraft() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved) as Partial<StartDraft>;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function resolveBlueprints(systemCatalog: PlaygroundSystemCatalogPayload | null) {
  return systemCatalog?.catalog.blueprints || [];
}

function resolveBlueprint(
  systemCatalog: PlaygroundSystemCatalogPayload | null,
  blueprintKey: string,
) {
  const blueprints = resolveBlueprints(systemCatalog);

  return (
    blueprints.find(blueprint => blueprint.key === blueprintKey) || blueprints[0] || null
  );
}

function getInitialDraft(
  summary: BloggrsWorkspaceSummary | null,
  systemCatalog: PlaygroundSystemCatalogPayload | null,
): StartDraft {
  const builderConfig = readBuilderConfig(summary);
  const saved = readStoredDraft();
  const fallbackBlueprint = resolveBlueprints(systemCatalog)[0];
  const initialBlueprintKey = String(
    saved?.blueprintKey ||
      systemCatalog?.current.blueprintKey ||
      systemCatalog?.activeBlueprint?.key ||
      builderConfig.blueprintKey ||
      fallbackBlueprint?.key ||
      'brand-studio',
  );

  return {
    blueprintKey: initialBlueprintKey,
    siteTitle: String(
      saved?.siteTitle ||
        systemCatalog?.current.siteTitle ||
        builderConfig.siteTitle ||
        summary?.blog.name ||
        '',
    ),
    tagline: String(
      saved?.tagline ||
        systemCatalog?.current.tagline ||
        builderConfig.tagline ||
        summary?.blog.description ||
        '',
    ),
  };
}

function readCount(value: unknown) {
  const normalized = Number(value || 0);
  return Number.isFinite(normalized) ? normalized : 0;
}

export function StartRoute({
  summary,
  studioSummary,
  systemCatalog,
  client,
  blogId,
  onSaved,
  onNotice,
}: Props) {
  const initialDraft = getInitialDraft(summary, systemCatalog);
  const formKey = [
    summary?.experience?.updatedAt || 'new',
    systemCatalog?.current.blueprintKey || 'none',
    initialDraft.blueprintKey,
    initialDraft.siteTitle,
    initialDraft.tagline,
  ].join(':');

  return (
    <StartRouteForm
      key={formKey}
      summary={summary}
      studioSummary={studioSummary}
      systemCatalog={systemCatalog}
      client={client}
      blogId={blogId}
      onSaved={onSaved}
      onNotice={onNotice}
      initialDraft={initialDraft}
    />
  );
}

interface StartRouteFormProps extends Props {
  initialDraft: StartDraft;
}

function StartRouteForm({
  summary,
  studioSummary,
  systemCatalog,
  client,
  blogId,
  onSaved,
  onNotice,
  initialDraft,
}: StartRouteFormProps) {
  const blueprints = resolveBlueprints(systemCatalog);
  const [selectedBlueprintKey, setSelectedBlueprintKey] = useState(initialDraft.blueprintKey);
  const [siteTitle, setSiteTitle] = useState(initialDraft.siteTitle);
  const [tagline, setTagline] = useState(initialDraft.tagline);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const selectedBlueprint = resolveBlueprint(systemCatalog, selectedBlueprintKey);
  const activeBlueprintKey =
    systemCatalog?.activeBlueprint?.key || systemCatalog?.current.blueprintKey || '';
  const capabilityCatalog = systemCatalog?.catalog.capabilities || [];
  const selectedCapabilities = selectedBlueprint
    ? capabilityCatalog.filter(capability =>
        selectedBlueprint.capabilityKeys.includes(capability.key),
      )
    : [];

  async function handleSubmit() {
    if (!selectedBlueprint) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      const draft = {
        blueprintKey: selectedBlueprint.key,
        siteTitle,
        tagline,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));

      await client.applyBlueprint(blogId, {
        blueprintKey: selectedBlueprint.key,
        siteType: selectedBlueprint.siteType,
        experienceType: selectedBlueprint.experienceType,
        tone: selectedBlueprint.tone,
        siteTitle,
        tagline,
      });

      onNotice(`${selectedBlueprint.label} synced into the linked product workspace.`);
      await onSaved();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Unable to install the selected product system.',
      );
    } finally {
      setSaving(false);
    }
  }

  if (!systemCatalog || !selectedBlueprint) {
    return (
      <div className="workspace-stack">
        <article className="workspace-panel">
          <h2>Loading product systems</h2>
          <p className="workspace-muted">
            Playground is requesting the backend app-system catalog for this workspace.
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="workspace-stack">
      {error ? <div className="workspace-banner workspace-banner--error">{error}</div> : null}

      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Product system</span>
            <h2>Choose the serious thing this workspace should become</h2>
            <p>
              Each option installs a backend-defined contract: product identity,
              routes, content models, seeded entries, and runtime-ready
              documents. This is not a theme toggle. It changes the workspace
              shape.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <span className="workspace-chip">
              Active: {systemCatalog.activeBlueprint?.label || 'Not applied'}
            </span>
            <span className="workspace-chip">
              Product: {summary?.product?.productName || 'Not linked'}
            </span>
          </div>
        </div>
      </article>

      <div className="workspace-system-grid">
        {blueprints.map(blueprint => {
          const isSelected = selectedBlueprint.key === blueprint.key;
          const isActive = activeBlueprintKey === blueprint.key;

          return (
            <button
              className={`workspace-system-option${isSelected ? ' is-selected' : ''}`}
              key={blueprint.key}
              onClick={() => setSelectedBlueprintKey(blueprint.key)}
              type="button"
            >
              <div className="workspace-system-option__header">
                <span className="workspace-kicker">{blueprint.productTypeKey}</span>
                <div className="workspace-inline-actions">
                  <span className="workspace-chip">{blueprint.siteType}</span>
                  {isActive ? <span className="workspace-chip">Active</span> : null}
                </div>
              </div>
              <h3>{blueprint.label}</h3>
              <p>{blueprint.summary}</p>
              <div className="workspace-stat-row">
                <span>{blueprint.routeCount} routes</span>
                <span>{blueprint.modelCount} models</span>
                <span>{blueprint.capabilityCount} capabilities</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <div className="workspace-panel-stack">
            <div>
              <span className="workspace-kicker">Selected system</span>
              <h2>{selectedBlueprint.label}</h2>
              <p className="workspace-muted">{selectedBlueprint.description}</p>
            </div>

            <div className="workspace-form-grid">
              <label>
                <span>Product name</span>
                <input
                  onChange={event => setSiteTitle(event.target.value)}
                  value={siteTitle}
                />
              </label>
              <label className="workspace-form-span-2">
                <span>Positioning summary</span>
                <textarea
                  onChange={event => setTagline(event.target.value)}
                  rows={4}
                  value={tagline}
                />
              </label>
            </div>

            <div className="workspace-section-grid">
              <article className="workspace-subpanel">
                <strong>Routes installed</strong>
                <div className="workspace-chip-row">
                  {selectedBlueprint.routeBlueprints.map(route => (
                    <span className="workspace-chip" key={route.path}>
                      {route.label}: {route.path}
                    </span>
                  ))}
                </div>
              </article>

              <article className="workspace-subpanel">
                <strong>Models seeded</strong>
                <div className="workspace-chip-row">
                  {selectedBlueprint.modelBlueprints.map(model => (
                    <span className="workspace-chip" key={model.key}>
                      {model.label}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            <div className="workspace-list">
              {selectedBlueprint.outcomes.map(outcome => (
                <article className="workspace-list-item" key={outcome}>
                  <p>{outcome}</p>
                </article>
              ))}
            </div>

            <div className="workspace-capability-list">
              {selectedCapabilities.map(capability => (
                <article className="workspace-subpanel" key={capability.key}>
                  <strong>{capability.label}</strong>
                  <p>{capability.summary}</p>
                  <code>{(capability.apiSurfaces || []).join(' / ')}</code>
                </article>
              ))}
            </div>

            <button
              className="workspace-button"
              disabled={saving}
              onClick={() => void handleSubmit()}
            >
              {saving
                ? 'Installing...'
                : activeBlueprintKey === selectedBlueprint.key
                  ? 'Reinstall product system'
                  : 'Install product system'}
            </button>
          </div>
        </article>

        <article className="workspace-panel">
          <div className="workspace-panel-stack">
            <div>
              <span className="workspace-kicker">Current backend state</span>
              <h2>What the workspace will align</h2>
            </div>

            <div className="workspace-detail-list">
              <div>
                <strong>Site status</strong>
                <span>{summary?.experience?.siteStatus || 'unconfigured'}</span>
              </div>
              <div>
                <strong>API sync</strong>
                <span>{studioSummary?.studio?.apiSyncStatus || 'unknown'}</span>
              </div>
              <div>
                <strong>Linked product</strong>
                <span>{summary?.product?.productName || 'No linked product yet'}</span>
              </div>
              <div>
                <strong>Product type</strong>
                <span>{systemCatalog.current.productTypeKey || selectedBlueprint.productTypeKey}</span>
              </div>
              <div>
                <strong>Route count</strong>
                <span>{readCount(studioSummary?.studio?.routeCount)} in workspace today</span>
              </div>
              <div>
                <strong>Model count</strong>
                <span>{readCount(studioSummary?.studio?.modelCount)} in workspace today</span>
              </div>
              <div>
                <strong>Entry count</strong>
                <span>{readCount(studioSummary?.studio?.entryCount)} in workspace today</span>
              </div>
            </div>

            <article className="workspace-subpanel">
              <strong>Decision signal</strong>
              <p>
                Pick the system that matches the nouns and flows the product
                actually needs. Marketing, docs, app operations, and commerce
                can all be composed later, but the first contract should match
                the dominant job to be done.
              </p>
            </article>
          </div>
        </article>
      </div>
    </div>
  );
}
