import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppShell } from './components/AppShell';
import { useWorkspaceApp } from './hooks/useWorkspaceApp';
import { OverviewRoute } from './routes/overview/OverviewRoute';
import { StartRoute } from './routes/start/StartRoute';
import { BlueprintsRoute } from './routes/blueprints/BlueprintsRoute';
import { ThemeRoute } from './routes/theme/ThemeRoute';
import { ContentRoute } from './routes/content/ContentRoute';
import { PreviewRoute } from './routes/preview/PreviewRoute';
import { HandoffRoute } from './routes/handoff/HandoffRoute';

export default function App() {
  const app = useWorkspaceApp();

  return (
    <AppShell
      summary={app.summary}
      loading={app.loading}
      error={app.error}
      notice={app.notice}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route
          path="/overview"
          element={
            <OverviewRoute
              summary={app.summary}
              studioSummary={app.studioSummary}
              inventory={app.inventory}
            />
          }
        />
        <Route
          path="/start"
          element={
            <StartRoute
              summary={app.summary}
              studioSummary={app.studioSummary}
              systemCatalog={app.systemCatalog}
              client={app.client}
              blogId={app.boot.blogId}
              onSaved={app.refresh}
              onNotice={app.setNotice}
            />
          }
        />
        <Route
          path="/blueprints"
          element={
            <BlueprintsRoute
              summary={app.summary}
              studioSummary={app.studioSummary}
              systemCatalog={app.systemCatalog}
              client={app.client}
              blogId={app.boot.blogId}
              onSaved={app.refresh}
              onNotice={app.setNotice}
            />
          }
        />
        <Route
          path="/theme"
          element={
            <ThemeRoute
              summary={app.summary}
              studioSummary={app.studioSummary}
              product={app.product}
              onSaveProduct={app.saveProductDetails}
              onRefresh={app.refresh}
            />
          }
        />
        <Route
          path="/content"
          element={
            <ContentRoute
              summary={app.summary}
              studioSummary={app.studioSummary}
              inventory={app.inventory}
              client={app.client}
              blogId={app.boot.blogId}
              onSaved={app.refresh}
              onNotice={app.setNotice}
            />
          }
        />
        <Route
          path="/preview"
          element={
            <PreviewRoute
              summary={app.summary}
              documents={
                app.studioSummary?.builderWorkspace?.documents ||
                app.inventory?.builder?.documents ||
                []
              }
              client={app.client}
              blogId={app.boot.blogId}
            />
          }
        />
        <Route
          path="/handoff"
          element={
            <HandoffRoute
              summary={app.summary}
              studioSummary={app.studioSummary}
              inventory={app.inventory}
            />
          }
        />
      </Routes>
    </AppShell>
  );
}
