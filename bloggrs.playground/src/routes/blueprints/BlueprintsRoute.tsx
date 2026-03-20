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

export function BlueprintsRoute({
  summary,
  studioSummary,
  systemCatalog,
  client,
  blogId,
  onSaved,
  onNotice,
}: Props) {
  const [savingKey, setSavingKey] = useState('');
  const [error, setError] = useState('');

  if (!systemCatalog) {
    return (
      <div className="workspace-stack">
        <article className="workspace-panel">
          <h2>Loading blueprint catalog</h2>
          <p className="workspace-muted">
            Playground is requesting the backend app-system catalog for this workspace.
          </p>
        </article>
      </div>
    );
  }

  const catalog = systemCatalog;
  const activeBlueprintKey =
    catalog.activeBlueprint?.key || catalog.current.blueprintKey || '';
  const siteTitle = catalog.current.siteTitle || summary?.blog.name || 'Workspace system';
  const tagline =
    catalog.current.tagline ||
    summary?.blog.description ||
    'Install a serious backend-defined product system.';

  async function applyBlueprint(blueprintKey: string) {
    const blueprint =
      catalog.catalog.blueprints.find(item => item.key === blueprintKey) || null;

    if (!blueprint) {
      return;
    }

    setSavingKey(blueprint.key);
    setError('');

    try {
      await client.applyBlueprint(blogId, {
        blueprintKey: blueprint.key,
        siteType: blueprint.siteType,
        experienceType: blueprint.experienceType,
        tone: blueprint.tone,
        siteTitle,
        tagline,
      });

      onNotice(`${blueprint.label} applied to the linked product workspace.`);
      await onSaved();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Unable to apply the selected blueprint.',
      );
    } finally {
      setSavingKey('');
    }
  }

  return (
    <div className="workspace-stack">
      {error ? <div className="workspace-banner workspace-banner--error">{error}</div> : null}

      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Blueprint catalog</span>
            <h2>Compare full product systems, not page templates</h2>
            <p>
              These blueprints package routes, models, entries, runtime
              bindings, and publication-ready documents as one backend contract.
              The goal is to let the workspace grow like software does: from
              composable primitives instead of disconnected screens.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <span className="workspace-chip">
              Active: {catalog.activeBlueprint?.label || 'Not applied'}
            </span>
            <span className="workspace-chip">
              API sync: {studioSummary?.studio?.apiSyncStatus || 'unknown'}
            </span>
          </div>
        </div>
      </article>

      <div className="workspace-grid workspace-grid--capabilities">
        {catalog.catalog.capabilities.map(capability => (
          <article className="workspace-card" key={capability.key}>
            <span className="workspace-card-label">{capability.label}</span>
            <p>{capability.summary}</p>
            <code>{(capability.apiSurfaces || []).join(' / ')}</code>
          </article>
        ))}
      </div>

      <div className="workspace-system-compare">
        {catalog.catalog.blueprints.map(blueprint => {
          const isCurrent = activeBlueprintKey === blueprint.key;
          const isSaving = savingKey === blueprint.key;

          return (
            <article className="workspace-panel" key={blueprint.key}>
              <div className="workspace-system-option__header">
                <span className="workspace-kicker">{blueprint.productTypeKey}</span>
                <div className="workspace-inline-actions">
                  <span className="workspace-chip">{blueprint.siteType}</span>
                  <span className="workspace-chip">{blueprint.tone}</span>
                  {isCurrent ? <span className="workspace-chip">Active</span> : null}
                </div>
              </div>

              <h2>{blueprint.label}</h2>
              <p>{blueprint.summary}</p>
              <p className="workspace-muted">{blueprint.description}</p>

              <div className="workspace-stat-row">
                <span>{blueprint.routeCount} routes</span>
                <span>{blueprint.modelCount} models</span>
                <span>{blueprint.capabilityCount} capabilities</span>
              </div>

              <div className="workspace-section-grid">
                <article className="workspace-subpanel">
                  <strong>Routes</strong>
                  <div className="workspace-chip-row">
                    {blueprint.routeBlueprints.map(route => (
                      <span className="workspace-chip" key={route.path}>
                        {route.label}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="workspace-subpanel">
                  <strong>Models</strong>
                  <div className="workspace-chip-row">
                    {blueprint.modelBlueprints.map(model => (
                      <span className="workspace-chip" key={model.key}>
                        {model.label}
                      </span>
                    ))}
                  </div>
                </article>
              </div>

              <div className="workspace-list">
                {blueprint.outcomes.map(outcome => (
                  <article className="workspace-list-item" key={outcome}>
                    <p>{outcome}</p>
                  </article>
                ))}
              </div>

              <div className="workspace-capability-list">
                {blueprint.capabilities.map(capability => (
                  <article className="workspace-subpanel" key={capability.key}>
                    <strong>{capability.label}</strong>
                    <p>{capability.summary}</p>
                  </article>
                ))}
              </div>

              <button
                className="workspace-button"
                onClick={() => void applyBlueprint(blueprint.key)}
              >
                {isSaving
                  ? 'Applying...'
                  : isCurrent
                    ? 'Reapply system'
                    : 'Apply system'}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
