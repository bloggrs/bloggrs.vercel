import type { BloggrsWorkspaceSummary } from 'bloggrs.sdk';
import type {
  PlaygroundApiClient,
  PlaygroundContentInventory,
  PlaygroundStudioSummary,
} from '../../api/client';
import { useState } from 'react';

interface Props {
  summary: BloggrsWorkspaceSummary | null;
  studioSummary: PlaygroundStudioSummary | null;
  inventory: PlaygroundContentInventory | null;
  client: PlaygroundApiClient;
  blogId: string;
  onSaved: () => Promise<void>;
  onNotice: (message: string) => void;
}

function readCount(record: Record<string, unknown> | undefined, key: string) {
  const value = record?.[key];
  if (typeof value === 'number') {
    return value;
  }

  const normalized = Number(value || 0);
  return Number.isFinite(normalized) ? normalized : 0;
}

export function ContentRoute({
  summary,
  studioSummary,
  inventory,
  client,
  blogId,
  onSaved,
  onNotice,
}: Props) {
  const [savingMode, setSavingMode] = useState('');
  const [error, setError] = useState('');
  const inventorySummary = inventory?.summary || {};
  const builderModels = Array.isArray(inventory?.builder?.contentModels)
    ? inventory?.builder?.contentModels
    : [];
  const builderDocuments = Array.isArray(inventory?.builder?.documents)
    ? inventory?.builder?.documents
    : [];

  async function handleSeed(mode: string) {
    setSavingMode(mode);
    setError('');

    try {
      await client.seedStarterContent(blogId, mode);
      onNotice('Legacy content adapter synced into the workspace context.');
      await onSaved();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Unable to sync the content adapter.',
      );
    } finally {
      setSavingMode('');
    }
  }

  return (
    <div className="workspace-stack">
      {error ? <div className="workspace-banner workspace-banner--error">{error}</div> : null}

      <div className="workspace-grid">
        <article className="workspace-card">
          <span className="workspace-card-label">Legacy articles</span>
          <strong>{readCount(inventorySummary, 'legacyArticles')}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Legacy categories</span>
          <strong>{readCount(inventorySummary, 'legacyCategories')}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Builder models</span>
          <strong>{readCount(inventorySummary, 'builderModels')}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Builder entries</span>
          <strong>{readCount(inventorySummary, 'builderEntries')}</strong>
        </article>
        <article className="workspace-card">
          <span className="workspace-card-label">Builder documents</span>
          <strong>{readCount(inventorySummary, 'builderDocuments')}</strong>
        </article>
      </div>

      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Content sources</span>
            <h2>Sync legacy and builder inventory</h2>
            <p>
              Playground reads the content inventory from the backend so you can
              see both legacy collections and the linked builder workspace side by side.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <span className="workspace-chip">
              Mode:{' '}
              {String(
                summary?.contentSources?.mode ||
                  inventorySummary.mode ||
                  'legacy-preview',
              )}
            </span>
            <span className="workspace-chip">
              API sync: {studioSummary?.studio?.apiSyncStatus || 'unknown'}
            </span>
          </div>
        </div>
      </article>

      <article className="workspace-panel">
        <h2>Starter content sources</h2>
        <p className="workspace-muted">
          These actions call the backend seed/sync endpoint and refresh the
          inventory summary afterward.
        </p>
        <div className="workspace-inline-actions">
          <button className="workspace-button" onClick={() => void handleSeed('legacy-adapter')}>
            {savingMode === 'legacy-adapter'
              ? 'Syncing...'
              : 'Keep legacy content as collections'}
          </button>
          <button
            className="workspace-button workspace-button--secondary"
            onClick={() => void handleSeed('starter-import')}
          >
            {savingMode === 'starter-import'
              ? 'Syncing...'
              : 'Seed starter entries and models'}
          </button>
        </div>
      </article>

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <h2>Builder models</h2>
          {builderModels.length ? (
            <div className="workspace-list">
              {builderModels.map((model, index) => {
                const record = model as Record<string, unknown>;

                return (
                  <article
                    className="workspace-list-item"
                    key={`${record.key || 'model'}-${index}`}
                  >
                    <h3>{String(record.name || record.key || 'Model')}</h3>
                    <p>
                      {String(record.key || 'no-key')} -{' '}
                      {record.isSystem ? 'System-managed' : 'Custom'}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="workspace-empty-state">
              <h3>No builder models yet</h3>
              <p>Use the sync action above or continue into Scratch to create workspace models.</p>
            </div>
          )}
        </article>

        <article className="workspace-panel">
          <h2>Builder documents</h2>
          {builderDocuments.length ? (
            <div className="workspace-list">
              {builderDocuments.map((document, index) => {
                const record = document as Record<string, unknown>;

                return (
                  <article
                    className="workspace-list-item"
                    key={`${record.key || 'document'}-${index}`}
                  >
                    <h3>{String(record.name || record.key || 'Document')}</h3>
                    <p>{String(record.routePath || '/')}</p>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="workspace-empty-state">
              <h3>No builder documents yet</h3>
              <p>Apply a blueprint first to create route documents for the linked workspace.</p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
