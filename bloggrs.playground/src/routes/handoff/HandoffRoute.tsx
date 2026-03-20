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

export function HandoffRoute({ summary, studioSummary, inventory }: Props) {
  if (!summary) {
    return null;
  }

  const readiness = [
    {
      label: 'Linked product',
      ready: Boolean(summary.product?.productId),
      detail: summary.product?.productName || 'No linked product yet',
    },
    {
      label: 'Workspace routes',
      ready: Boolean(studioSummary?.studio?.routeCount),
      detail: `${studioSummary?.studio?.routeCount || 0} routes available`,
    },
    {
      label: 'Content models',
      ready: Boolean(studioSummary?.studio?.modelCount),
      detail: `${studioSummary?.studio?.modelCount || 0} models available`,
    },
    {
      label: 'Publications',
      ready: Boolean(studioSummary?.studio?.publicationCount),
      detail: `${studioSummary?.studio?.publicationCount || 0} publications`,
    },
    {
      label: 'Runtime slug',
      ready: Boolean(summary.runtime?.siteSlug),
      detail: summary.runtime?.siteSlug || 'No runtime slug',
    },
    {
      label: 'Legacy adapter',
      ready: Boolean(inventory?.legacy?.contentModels?.length),
      detail: `${inventory?.legacy?.contentModels?.length || 0} legacy models exposed`,
    },
  ];

  return (
    <div className="workspace-stack">
      <article className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-toolbar__copy">
            <span className="workspace-kicker">Handoff</span>
            <h2>Continue in Scratch</h2>
            <p>
              Playground has now read enough backend state to verify whether the
              linked workspace is ready for deeper editing and publication in Scratch.
            </p>
          </div>
          <div className="workspace-toolbar__actions">
            <a
              className="workspace-button"
              href={summary.editors.scratchPath}
              target="_top"
              rel="noreferrer"
            >
              Continue in Scratch
            </a>
            <a
              className="workspace-button workspace-button--secondary"
              href={summary.runtime.previewUrl || summary.runtime.previewPath}
              target="_blank"
              rel="noreferrer"
            >
              Open preview path
            </a>
          </div>
        </div>
      </article>

      <div className="workspace-grid">
        {readiness.map(item => (
          <article className="workspace-card" key={item.label}>
            <span className="workspace-card-label">{item.label}</span>
            <strong>{item.ready ? 'Ready' : 'Pending'}</strong>
            <p className="workspace-muted">{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="workspace-editor-layout">
        <article className="workspace-panel">
          <h2>Workspace handoff summary</h2>
          <div className="workspace-detail-list">
            <div>
              <strong>Blog</strong>
              <span>{summary.blog.name}</span>
            </div>
            <div>
              <strong>Product</strong>
              <span>{summary.product?.productName || 'Not linked'}</span>
            </div>
            <div>
              <strong>Mode</strong>
              <span>{summary.contentSources?.mode || 'legacy-preview'}</span>
            </div>
            <div>
              <strong>Site status</strong>
              <span>{summary.experience?.siteStatus || 'unconfigured'}</span>
            </div>
            <div>
              <strong>Scratch editor path</strong>
              <code>{summary.editors.scratchPath}</code>
            </div>
          </div>
        </article>

        <article className="workspace-panel">
          <h2>Why move to Scratch now</h2>
          <div className="workspace-list">
            <article className="workspace-list-item">
              <h3>Workspace sync</h3>
              <p>Scratch can edit routes, content models, entries, theme data, and publications directly.</p>
            </article>
            <article className="workspace-list-item">
              <h3>Operational review</h3>
              <p>Use the backend-linked preview, publish, and settings flows once the starter intent is in place.</p>
            </article>
            <article className="workspace-list-item">
              <h3>Content execution</h3>
              <p>Continue from the same linked product and runtime context without rebuilding the draft by hand.</p>
            </article>
          </div>
        </article>
      </div>
    </div>
  );
}
