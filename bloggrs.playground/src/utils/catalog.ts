export interface PlaygroundBlueprintOption {
  key: string;
  label: string;
  siteType: string;
  experienceType: string;
  tone: string;
  summary: string;
  outcomes: string[];
}

export const playgroundBlueprintCatalog: PlaygroundBlueprintOption[] = [
  {
    key: 'editorial-starter',
    label: 'Editorial Starter',
    siteType: 'blog',
    experienceType: 'content',
    tone: 'editorial',
    summary: 'A simple article-first site with a homepage, article archive, and a strong editorial hierarchy.',
    outcomes: ['Home page', 'Article collection', 'Legacy content adapter'],
  },
  {
    key: 'commerce-launch',
    label: 'Commerce Launch',
    siteType: 'commerce',
    experienceType: 'commerce',
    tone: 'conversion',
    summary: 'A commerce-first starter tuned for product highlights, trust cues, and offer-driven pages.',
    outcomes: ['Hero + offer structure', 'Product-focused theme', 'Preview-ready shop flow'],
  },
  {
    key: 'portal-workspace',
    label: 'Portal Workspace',
    siteType: 'application',
    experienceType: 'portal',
    tone: 'product',
    summary: 'A portal-style starter for dashboards, logged-in experiences, and guided journeys.',
    outcomes: ['Portal navigation', 'Status-first content', 'Studio handoff'],
  },
];

export const defaultThemeTokens: Record<string, string> = {
  brandColor: '#1d4ed8',
  accentColor: '#f97316',
  surfaceColor: '#ffffff',
  backgroundColor: '#f8fafc',
  textColor: '#0f172a',
  mutedColor: '#64748b',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  spacingScale: 'comfortable',
  headerStyle: 'solid',
  footerStyle: 'simple',
};
