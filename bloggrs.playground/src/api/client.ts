import {
  fetchBloggrsApi,
  fetchWorkspaceSummary,
  type BloggrsRuntimeResolvePayload,
  type BloggrsWorkspaceSummary,
} from 'bloggrs.sdk';

export interface PlaygroundStudioSummary extends BloggrsWorkspaceSummary {
  studio?: {
    routeCount?: number;
    modelCount?: number;
    entryCount?: number;
    publicationCount?: number;
    apiSyncStatus?: string;
    recentActivity?: Array<Record<string, unknown>>;
  };
  builderWorkspace?: {
    product?: PlaygroundProductSummary;
    contentModels?: Array<Record<string, unknown>>;
    entries?: Array<Record<string, unknown>>;
    documents?: Array<Record<string, unknown>>;
    latestPublication?: Record<string, unknown> | null;
  } | null;
}

export interface PlaygroundContentInventory {
  workspaceSummary: BloggrsWorkspaceSummary;
  legacy: {
    contentModels?: Array<Record<string, unknown>>;
    collections?: Record<string, Array<Record<string, unknown>>>;
    summary?: Record<string, unknown>;
  };
  builder?: {
    product?: PlaygroundProductSummary;
    contentModels?: Array<Record<string, unknown>>;
    entries?: Array<Record<string, unknown>>;
    documents?: Array<Record<string, unknown>>;
    latestPublication?: Record<string, unknown> | null;
  } | null;
  summary: Record<string, unknown>;
}

export interface PlaygroundProductType {
  id: number;
  key: string;
  name: string;
  description?: string | null;
  capabilities?: string[];
  editorConfig?: Record<string, unknown>;
}

export interface PlaygroundProductSummary {
  id: number;
  name: string;
  slug: string;
  summary?: string | null;
  status: string;
  settings?: Record<string, unknown>;
  themeTokens?: Record<string, unknown>;
  seo?: Record<string, unknown>;
  productType?: PlaygroundProductType | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface PlaygroundBuilderWorkspace {
  product: PlaygroundProductSummary;
}

export interface PlaygroundSystemCapability {
  key: string;
  label: string;
  summary: string;
  apiSurfaces?: string[];
}

export interface PlaygroundSystemBlueprintSummaryCapability {
  key: string;
  label: string;
  summary: string;
}

export interface PlaygroundSystemBlueprint {
  key: string;
  label: string;
  productTypeKey: string;
  siteType: string;
  experienceType: string;
  tone: string;
  summary: string;
  description: string;
  outcomes: string[];
  capabilityKeys: string[];
  routeBlueprints: Array<{ path: string; label: string }>;
  modelBlueprints: Array<{ key: string; label: string }>;
  routeCount: number;
  modelCount: number;
  capabilityCount: number;
  capabilities: PlaygroundSystemBlueprintSummaryCapability[];
}

export interface PlaygroundSystemCatalogPayload {
  catalog: {
    capabilities: PlaygroundSystemCapability[];
    blueprints: PlaygroundSystemBlueprint[];
  };
  activeBlueprint: PlaygroundSystemBlueprint | null;
  current: {
    blueprintKey?: string | null;
    siteType?: string | null;
    experienceType?: string | null;
    tone?: string | null;
    siteTitle?: string | null;
    tagline?: string | null;
    linkedProductId?: string | number | null;
    linkedProductName?: string | null;
    productTypeKey?: string | null;
  };
}

export interface PlaygroundBlueprintInput {
  blueprintKey: string;
  siteType?: string;
  experienceType?: string;
  tone?: string;
  siteTitle: string;
  tagline: string;
}

export class PlaygroundApiClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getWorkspaceSummary(blogId: string | number) {
    return fetchWorkspaceSummary({
      baseUrl: this.baseUrl,
      blogId,
      token: this.token,
    });
  }

  getContentInventory(blogId: string | number) {
    return fetchBloggrsApi<{ inventory: PlaygroundContentInventory }>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/content-inventory`,
      token: this.token,
    }).then(data => data.inventory);
  }

  getStudioSummary(blogId: string | number) {
    return fetchBloggrsApi<{ summary: PlaygroundStudioSummary }>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/studio-summary`,
      token: this.token,
    }).then(data => data.summary);
  }

  getSystemCatalog(blogId: string | number) {
    return fetchBloggrsApi<PlaygroundSystemCatalogPayload>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/playground/system-catalog`,
      token: this.token,
    });
  }

  applyBlueprint(blogId: string | number, input: PlaygroundBlueprintInput) {
    return fetchBloggrsApi<{ experience: Record<string, unknown> }>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/playground/apply-blueprint`,
      method: 'POST',
      token: this.token,
      body: input,
    });
  }

  getProduct(productId: string | number) {
    return fetchBloggrsApi<PlaygroundBuilderWorkspace>({
      baseUrl: this.baseUrl,
      path: `/products/${productId}`,
      token: this.token,
    }).then(data => data.product);
  }

  updateProduct(productId: string | number, payload: Record<string, unknown>) {
    return fetchBloggrsApi<{ product: PlaygroundProductSummary }>({
      baseUrl: this.baseUrl,
      path: `/products/${productId}`,
      method: 'PATCH',
      token: this.token,
      body: payload,
    }).then(data => data.product);
  }

  updateDesignTokens(blogId: string | number, tokens: Record<string, unknown>) {
    return fetchBloggrsApi<{ tokens: Record<string, unknown> }>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/design-tokens`,
      method: 'PATCH',
      token: this.token,
      body: { tokens },
    });
  }

  seedStarterContent(blogId: string | number, mode: string) {
    return fetchBloggrsApi<{ mode: string; sync: Record<string, unknown> }>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/seed-starter-content`,
      method: 'POST',
      token: this.token,
      body: { mode },
    });
  }

  getRuntimePreview(blogId: string | number, routePath: string) {
    return fetchBloggrsApi<BloggrsRuntimeResolvePayload>({
      baseUrl: this.baseUrl,
      path: `/blogs/${blogId}/runtime-resolve?routePath=${encodeURIComponent(routePath)}`,
      token: this.token,
    });
  }
}
