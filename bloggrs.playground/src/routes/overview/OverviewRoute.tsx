import { Link } from 'react-router-dom';
import type { BloggrsWorkspaceSummary } from 'bloggrs.sdk';
import type {
  PlaygroundContentInventory,
  PlaygroundStudioSummary,
} from '../../api/client';

interface Props {
  summary: BloggrsWorkspaceSummary | null;
  studioSummary: PlaygroundStudioSummary | null;
  inventory: PlaygroundContentInventory | null;
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

function readCount(record: Record<string, unknown> | undefined, key: string) {
  const value = record?.[key];
  if (typeof value === 'number') {
    return value;
  }

  const normalized = Number(value || 0);
  return Number.isFinite(normalized) ? normalized : 0;
}

function readBuilderConfig(summary: BloggrsWorkspaceSummary | null) {
  return (summary?.experience?.builderConfig || {}) as Record<string, unknown>;
}

export function OverviewRoute({ summary, studioSummary, inventory }: Props) {
  if (!summary) {
    return null;
  }

  const builderConfig = readBuilderConfig(summary);
  const recentActivity = studioSummary?.studio?.recentActivity || [];
  const inventorySummary = inventory?.summary || {};
  const cards = [
    ['Site status', summary.experience?.siteStatus || 'unconfigured'],
    ['Linked product', summary.product?.productName || 'Not linked'],
    ['Content mode', summary.contentSources?.mode || 'legacy-preview'],
    ['Routes', String(studioSummary?.studio?.routeCount || 0)],
    ['Models', String(studioSummary?.studio?.modelCount || 0)],
    ['Entries', String(studioSummary?.studio?.entryCount || 0)],
  ];

  return (
    <div className="workspace-stack">
      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Workspace overview</span>
            <h2>Backend workspace state</h2>
            <p>
              Playground is now reading the same workspace summary, studio
              summary, and content inventory data that Scratch uses for the
              linked blog workspace.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <Link className="workspace-button" to="/start">
              Configure starter
            </Link>
            <Link className="workspace-button workspace-button--secondary" to="/preview">
              Open preview
            </Link>
            <Link className="workspace-button workspace-button--secondary" to="/handoff">
              Handoff to Scratch
            </Link>
          </div>
        </div>
      </article>

      <div className="workspace-grid">
        {cards.map(([label, value]) => (
          <article className="workspace-card" key={label}>
            <span className="workspace-card-label">{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <h2>Workspace summary</h2>
          <div className="workspace-detail-list">
            <div>
              <strong>Blog</strong>
              <span>
                {summary.blog.name} ({summary.blog.slug})
              </span>
            </div>
            <div>
              <strong>Runtime site slug</strong>
              <span>{summary.runtime?.siteSlug || 'n/a'}</span>
            </div>
            <div>
              <strong>Public path</strong>
              <code>{summary.runtime?.publicUrl || summary.runtime?.publicPath || 'n/a'}</code>
            </div>
            <div>
              <strong>Preview path</strong>
              <code>{summary.runtime?.previewUrl || summary.runtime?.previewPath || 'n/a'}</code>
            </div>
            <div>
              <strong>Scratch path</strong>
              <code>{summary.editors?.scratchPath || 'n/a'}</code>
            </div>
            <div>
              <strong>Playground path</strong>
              <code>{summary.editors?.playgroundPath || 'n/a'}</code>
            </div>
          </div>
        </article>

        <article className="workspace-panel">
          <h2>Applied starter configuration</h2>
          <div className="workspace-detail-list">
            <div>
              <strong>Blueprint</strong>
              <span>{String(builderConfig.blueprintKey || 'Not applied')}</span>
            </div>
            <div>
              <strong>Site type</strong>
              <span>{String(builderConfig.siteType || 'n/a')}</span>
            </div>
            <div>
              <strong>Experience type</strong>
              <span>{String(builderConfig.experienceType || 'n/a')}</span>
            </div>
            <div>
              <strong>Tone</strong>
              <span>{String(builderConfig.tone || 'n/a')}</span>
            </div>
          </div>
        </article>
      </div>

      <article className="workspace-panel">
        <h2>Content inventory</h2>
        <div className="workspace-grid">
          <article className="workspace-card">
            <span className="workspace-card-label">Legacy articles</span>
            <strong>{readCount(inventorySummary, 'legacyArticles')}</strong>
          </article>
          <article className="workspace-card">
            <span className="workspace-card-label">Legacy pages</span>
            <strong>{readCount(inventorySummary, 'legacyPages')}</strong>
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
      </article>

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <h2>Recent backend activity</h2>
          {recentActivity.length ? (
            <div className="workspace-list">
              {recentActivity.map((activity, index) => (
                <article
                  className="workspace-list-item"
                  key={`${activity.type || 'activity'}-${index}`}
                >
                  <h3>{String(activity.message || activity.type || 'Workspace event')}</h3>
                  <p>{formatDate(activity.at)}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="workspace-empty-state">
              <h3>No recent activity yet</h3>
              <p>The workspace has not reported a publish or update event yet.</p>
            </div>
          )}
        </article>

        <article className="workspace-panel">
          <h2>Recommended next step</h2>
          <div className="workspace-link-grid">
            <Link className="workspace-link-card" to="/start">
              <strong>Start</strong>
              <span>Set the site type, experience type, and starter metadata.</span>
            </Link>
            <Link className="workspace-link-card" to="/blueprints">
              <strong>Blueprints</strong>
              <span>Apply a guided backend starter structure to the workspace.</span>
            </Link>
            <Link className="workspace-link-card" to="/theme">
              <strong>Theme + Config</strong>
              <span>Edit navigation, SEO, settings paths, and theme tokens for the linked product.</span>
            </Link>
            <Link className="workspace-link-card" to="/content">
              <strong>Content</strong>
              <span>Inspect legacy and builder inventory and seed workspace content.</span>
            </Link>
            <Link className="workspace-link-card" to="/preview">
              <strong>Preview</strong>
              <span>Resolve a real runtime payload for any route.</span>
            </Link>
            <Link className="workspace-link-card" to="/handoff">
              <strong>Handoff</strong>
              <span>Verify readiness and continue into Scratch.</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
