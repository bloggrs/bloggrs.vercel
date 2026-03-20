import type { PropsWithChildren } from 'react';
import type { BloggrsWorkspaceSummary } from 'bloggrs.sdk';
import { NavLink } from 'react-router-dom';

interface AppShellProps extends PropsWithChildren {
  summary: BloggrsWorkspaceSummary | null;
  loading: boolean;
  error: string;
  notice: string;
}

const items = [
  { to: '/overview', label: 'Overview' },
  { to: '/start', label: 'Start' },
  { to: '/blueprints', label: 'Blueprints' },
  { to: '/theme', label: 'Theme + Config' },
  { to: '/content', label: 'Content' },
  { to: '/preview', label: 'Preview' },
  { to: '/handoff', label: 'Handoff' },
];

export function AppShell({
  summary,
  loading,
  error,
  notice,
  children,
}: AppShellProps) {
  return (
    <div className="workspace-app">
      <aside className="workspace-sidebar">
        <div className="workspace-brand">
          <span className="workspace-kicker">Bloggrs Playground</span>
          <strong>{summary?.blog.name || 'Workspace starter'}</strong>
          <p>{summary?.contentSources?.mode || 'Loading workspace context'}</p>
        </div>
        <nav className="workspace-nav">
          {items.map(item => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `workspace-nav-link${isActive ? ' is-active' : ''}`
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="workspace-main">
        <header className="workspace-header">
          <div>
            <h1>{summary?.blog.name || 'Workspace starter'}</h1>
            <p>Guided setup for the blog-backed site workspace.</p>
          </div>
          <div className="workspace-header-signals">
            <span>Status: {summary?.experience?.siteStatus || 'loading'}</span>
            <span>Product: {summary?.product?.productName || 'not linked'}</span>
          </div>
        </header>
        {loading ? (
          <div className="workspace-banner">Loading workspace context...</div>
        ) : null}
        {error ? (
          <div className="workspace-banner workspace-banner--error">{error}</div>
        ) : null}
        {notice ? (
          <div className="workspace-banner workspace-banner--success">{notice}</div>
        ) : null}
        <section className="workspace-content">{children}</section>
      </main>
    </div>
  );
}
