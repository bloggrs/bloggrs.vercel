export interface WorkflowStepDefinition {
  key: string;
  title: string;
  summary: string;
  detail: string;
}

export interface GuideApiMappingDefinition {
  label: string;
  endpoint: string;
  detail: string;
}

export interface GuideExampleDefinition {
  title: string;
  body: string;
}

export interface GuideCallToActionDefinition {
  label: string;
  action:
    | 'open-builder'
    | 'apply-blueprint'
    | 'create-draft'
    | 'view-api-payload'
    | 'switch-route';
  summary: string;
}

export interface GuideSectionDefinition {
  key: string;
  label: string;
  title: string;
  summary: string;
  audience: string;
  outcome: string;
  checklist: string[];
  quickstart: string[];
  concepts: string[];
  apiMapping: GuideApiMappingDefinition[];
  examples: GuideExampleDefinition[];
  advanced: string[];
  callToAction?: GuideCallToActionDefinition;
}

export interface FoundationPrincipleDefinition {
  key: string;
  title: string;
  body: string;
}

export const workflowSteps: WorkflowStepDefinition[] = [
  {
    key: 'define',
    title: 'Start from the experience',
    summary:
      'Name the product your customer sees first, then let the data model carry the specialization.',
    detail:
      'Blog, store, campaign, and future products all use the same API contract. The difference comes from the product record, content models, and documents you create.',
  },
  {
    key: 'compose',
    title: 'Shape the page with intent',
    summary:
      'Use blueprints, zones, and reusable blocks to create a draft that your team can reopen and refine.',
    detail:
      'The playground creates a document payload with HTML, CSS, JS, editor state, and route metadata so the builder and runtime stay aligned.',
  },
  {
    key: 'ship',
    title: 'Push the draft into the stack',
    summary:
      'Move from guidance to execution by handing the draft to Scratch Console and syncing it to the generic API.',
    detail:
      'The platform shell keeps environment, session, and navigation in control while Scratch handles workspace sync, publication, and operational review.',
  },
];

export const guideSections: GuideSectionDefinition[] = [
  {
    key: 'overview',
    label: 'Overview',
    title: 'What Playground is for',
    summary:
      'Playground is the guided surface for understanding the Bloggrs product model and shaping a real draft before you move into API-backed operations.',
    audience: 'Founders, designers, marketers, editors, and solution architects',
    outcome:
      'You leave with a clear product direction, a concrete draft payload, and a handoff path into the platform shell and Scratch Console.',
    checklist: [
      'Pick a product type that matches the customer experience you are shipping.',
      'Select a blueprint that gives the team a sensible starting structure.',
      'Keep the route and app name in customer-facing language from the start.',
    ],
    quickstart: [
      'Open a blueprint, name the app, and confirm the primary route.',
      'Adjust the page zones until the experience reads correctly in preview.',
      'Export or hand off the current draft when the structure is ready for API sync.',
    ],
    concepts: [
      'A product is the container for a customer-facing experience.',
      'A document is the routable page definition with HTML, CSS, JS, and editor state.',
      'A publication is the immutable snapshot that the public SDK should consume.',
    ],
    apiMapping: [
      {
        label: 'Product container',
        endpoint: 'POST /api/v1/products',
        detail:
          'Create the top-level container first so later documents, entries, and publications have a home.',
      },
      {
        label: 'Guided draft handoff',
        endpoint: 'bridge.action.request -> Scratch Console',
        detail:
          'Playground asks the platform shell to open Scratch or queue a handoff instead of writing directly to the API itself.',
      },
      {
        label: 'Runtime preview',
        endpoint: 'GET /api/v1/public/products/:slug/document?routePath=/',
        detail:
          'The public route is what `bloggrs.sdk` should read after publication, not the draft workspace payload.',
      },
    ],
    examples: [
      {
        title: 'Editorial launch',
        body:
          'Start with Blog Home, confirm the archive route, then hand the blueprint to Scratch so the team can sync posts, authors, and categories into the API.',
      },
      {
        title: 'Storefront campaign',
        body:
          'Use Store Home or Campaign Page, stage the merchandising blocks, then move the draft into Scratch for product selection and publication.',
      },
    ],
    advanced: [
      'Treat Playground as the decision layer and Scratch as the execution layer.',
      'Keep the platform shell in charge of environment and session state so future apps behave consistently.',
      'Prefer repeated blueprints and shared models over one-off route-specific implementations.',
    ],
    callToAction: {
      label: 'Open Builder',
      action: 'open-builder',
      summary: 'Open Scratch Console from the platform shell with the current draft context.',
    },
  },
  {
    key: 'quickstart',
    label: 'Quickstart',
    title: 'From blank route to first shippable draft',
    summary:
      'This is the shortest path to a working draft that is ready to be synced into `bloggrs.api.deprecated`.',
    audience: 'New teams adopting the builder stack',
    outcome:
      'You finish with a route, a draft payload, and a clear next step into Scratch Console or direct export.',
    checklist: [
      'Choose Blog or Commerce based on the customer journey you are shipping first.',
      'Use the preview to make sure the route structure and section order are understandable.',
      'Save the draft locally before handing it to another tool or teammate.',
    ],
    quickstart: [
      'Choose a product type and blueprint in the App Definition panel.',
      'Change the route path to the page your customer should actually visit.',
      'Add, remove, and reorder sections until the page tells the right story.',
    ],
    concepts: [
      'The local draft is for fast iteration and repeated reopening.',
      'The handoff payload is what moves from guidance into operations.',
      'The platform shell keeps the embedded apps working like one product instead of separate sites.',
    ],
    apiMapping: [
      {
        label: 'Local draft',
        endpoint: 'Browser local storage',
        detail:
          'Playground stores local drafts in the browser so a working session can survive reloads before the API is involved.',
      },
      {
        label: 'Workspace sync',
        endpoint: 'PUT /api/v1/products/:product_id/editor/workspace',
        detail:
          'Scratch uses this route to turn the handoff into persisted product, model, and document state.',
      },
      {
        label: 'Publication',
        endpoint: 'POST /api/v1/products/:product_id/publications',
        detail:
          'Publishing should happen after the workspace is synced, reviewed, and tied to the right product.',
      },
    ],
    examples: [
      {
        title: 'Quick blog setup',
        body:
          'Pick Blog Home, keep the route as `/`, save the draft, then open Scratch to connect the page to a real product and publish it.',
      },
      {
        title: 'Quick commerce landing',
        body:
          'Pick Campaign Page, set the route to `/campaign/spring-launch`, then hand the blueprint to Scratch for API-backed execution.',
      },
    ],
    advanced: [
      'Use the platform user level to tune how much guidance the shell surfaces to each team.',
      'Treat route naming as part of the product design, not just a technical field.',
      'Keep the quickstart path opinionated so new teams do not fall into model sprawl early.',
    ],
    callToAction: {
      label: 'Queue Draft',
      action: 'create-draft',
      summary: 'Queue the current draft for Scratch without leaving Playground yet.',
    },
  },
  {
    key: 'concepts',
    label: 'Concepts',
    title: 'Core concepts that keep the API generic',
    summary:
      'The Bloggrs stack works because the API stays generic while the product data, content models, and publications carry the domain meaning.',
    audience: 'Platform teams, schema designers, and technical leads',
    outcome:
      'You understand which concepts belong in the API and which belong in the data model, editor state, and runtime contract.',
    checklist: [
      'Define business nouns as content models instead of route-specific fields.',
      'Use documents to represent pages and reusable layouts.',
      'Use publications as the source of truth for runtime delivery.',
    ],
    quickstart: [
      'Review the product, model, document, and publication structure in the export panel.',
      'Notice that nothing in the API path names says “blog home” or “store page.”',
      'Treat blueprints as guidance on top of the generic platform contract.',
    ],
    concepts: [
      'Products define the experience boundary.',
      'Content models define the reusable data boundary.',
      'Documents define the routable presentation boundary.',
      'Publications define the delivery boundary.',
    ],
    apiMapping: [
      {
        label: 'Models',
        endpoint: 'POST /api/v1/products/:product_id/content-models',
        detail:
          'This is where blog posts, catalog items, authors, bundles, and future entities should be expressed.',
      },
      {
        label: 'Entries',
        endpoint: 'POST /api/v1/products/:product_id/entries',
        detail:
          'Entries hold real content instances and should reference each other instead of duplicating business data across pages.',
      },
      {
        label: 'SDK rendering',
        endpoint: 'mountProduct(target, { baseUrl, slug, routePath })',
        detail:
          'The SDK consumes published product and document payloads without needing to know whether the page is a blog or commerce surface.',
      },
    ],
    examples: [
      {
        title: 'Author profiles',
        body:
          'Author data belongs in a content model and entries, not inside the blog-post document markup.',
      },
      {
        title: 'Product rails',
        body:
          'A product rail block can read from a collection model in commerce and from a featured-post collection in editorial without changing the API.',
      },
    ],
    advanced: [
      'Use references to keep cross-surface data coherent as the platform grows.',
      'Capture editor state alongside HTML, CSS, and JS so the system can reopen and evolve a draft safely.',
      'Keep the shell bridge typed so future apps can rely on the same vocabulary.',
    ],
    callToAction: {
      label: 'Apply Blueprint',
      action: 'apply-blueprint',
      summary: 'Send this blueprint and draft structure to Scratch Console for API-backed continuation.',
    },
  },
  {
    key: 'api-mapping',
    label: 'API Mapping',
    title: 'How Playground maps to bloggrs.api.deprecated',
    summary:
      'Every major action in Playground corresponds to a real contract in `bloggrs.api.deprecated`, even when Playground itself stays draft-oriented.',
    audience: 'Engineers integrating the builder stack end to end',
    outcome:
      'You can take the generated payload and know exactly which API calls and runtime endpoints it turns into.',
    checklist: [
      'Create or select a product before syncing the workspace.',
      'Sync the editor workspace before asking for publication.',
      'Read published runtime endpoints from the SDK and public preview clients.',
    ],
    quickstart: [
      'Inspect the export panel to see the exact payload shape.',
      'Compare the API step cards to the builder routes in `bloggrs.api.deprecated`.',
      'Use Scratch for the authenticated mutation path when running inside the platform shell.',
    ],
    concepts: [
      'Playground generates intent and structure.',
      'Scratch owns API-backed mutation and operational status.',
      'The platform shell owns environment, session, and navigation between them.',
    ],
    apiMapping: [
      {
        label: 'Product list',
        endpoint: 'GET /api/v1/products',
        detail:
          'Scratch uses the product list to select an existing product or verify the target container before sync.',
      },
      {
        label: 'Workspace load',
        endpoint: 'GET /api/v1/products/:product_id/editor/workspace',
        detail:
          'Use this route to rehydrate an existing API-backed workspace into the builder once a product is selected.',
      },
      {
        label: 'Public product',
        endpoint: 'GET /api/v1/public/products/:slug',
        detail:
          'This gives runtime metadata and should be combined with the document route for the full published page.',
      },
    ],
    examples: [
      {
        title: 'Reopen an API-backed draft',
        body:
          'Select a product in Scratch, load `/editor/workspace`, continue editing, then publish again when the release is ready.',
      },
      {
        title: 'Use the SDK after publication',
        body:
          'Once a publication exists, mount the page with `bloggrs.sdk` so preview and production readers use the same published contract.',
      },
    ],
    advanced: [
      'Keep the handoff payload stable even if internal UI details evolve.',
      'Prefer shell-driven session propagation over local iframe authentication logic.',
      'Document parent-to-child and child-to-parent actions together so future apps can register cleanly.',
    ],
    callToAction: {
      label: 'View Payload',
      action: 'view-api-payload',
      summary: 'Tell the platform shell that the current API payload is ready for review.',
    },
  },
  {
    key: 'examples',
    label: 'Examples',
    title: 'Real examples teams can ship from',
    summary:
      'These examples map the abstract model to specific outcomes without breaking the generic API design.',
    audience: 'Solution builders who need concrete implementation patterns',
    outcome:
      'You can translate a blueprint into a shipping path for editorial, commerce, and future product packs.',
    checklist: [
      'Match the blueprint to the route and customer journey.',
      'Keep content models reusable across multiple pages.',
      'Use the publication route only when the draft has a real product target.',
    ],
    quickstart: [
      'Start with a blog home for editorial discovery, or a campaign page for an offer-driven launch.',
      'Use the preview to validate hierarchy before worrying about backend records.',
      'Hand off to Scratch when the page earns a real product record.',
    ],
    concepts: [
      'Examples should teach patterns, not introduce hard-coded API forks.',
      'A good example shows both the customer page and the system contract behind it.',
      'Reusable blocks matter more than pixel-perfect one-off markup at this stage.',
    ],
    apiMapping: [
      {
        label: 'Blog home',
        endpoint: 'product + post/author/category models + home document',
        detail:
          'This combination produces a classic editorial front page without needing special blog-only routes in the API.',
      },
      {
        label: 'Store home',
        endpoint: 'product + catalogItem/collection/trustSignal models + storefront document',
        detail:
          'The same API surface can deliver a commerce homepage once the data models describe inventory and merchandising concepts.',
      },
      {
        label: 'Campaign page',
        endpoint: 'product + document + optional collection sources',
        detail:
          'Short-lived launch pages should still use the same product and document contract so they can be reused later.',
      },
    ],
    examples: [
      {
        title: 'Magazine front page',
        body:
          'Use Blog Home with hero, article rail, feature grid, and FAQ. Keep posts and authors in separate models and reference them from the document.',
      },
      {
        title: 'Bundle launch page',
        body:
          'Use Product Detail or Campaign Page, emphasize proof and pricing blocks, then sync the draft to Scratch for real product linkage and publication.',
      },
    ],
    advanced: [
      'Turn successful examples into product packs and blueprint presets.',
      'Document why each example works so teams learn the system, not just the template.',
      'Use the platform shell to route from docs into execution in one click.',
    ],
    callToAction: {
      label: 'Open Scratch',
      action: 'open-builder',
      summary: 'Open Scratch Console and continue from the current example.',
    },
  },
  {
    key: 'advanced',
    label: 'Advanced',
    title: 'Advanced usage and shell integration',
    summary:
      'The long-term value of Bloggrs comes from treating the shell, bridge, API, and SDK as one product system with clear contracts.',
    audience: 'Platform owners and teams building the next embedded Bloggrs app',
    outcome:
      'You understand how Playground fits into the permanent shell architecture and what future apps need to implement.',
    checklist: [
      'Register new iframe apps in the platform registry instead of special-casing routes.',
      'Implement the bridge requests and events the shell expects.',
      'Keep visual tokens and auth/session flow owned by the platform shell.',
    ],
    quickstart: [
      'Read the platform shell documentation before adding a new embedded tool.',
      'Use shell context instead of inventing new iframe query conventions where possible.',
      'Send typed action requests to the parent when the child needs navigation or orchestration.',
    ],
    concepts: [
      'The registry defines iframe URL, permissions, sandbox, and route recovery behavior.',
      'The shell controls environment, user level, and session propagation.',
      'The child app should focus on its local workspace, not global platform ownership.',
    ],
    apiMapping: [
      {
        label: 'Shell bridge',
        endpoint: 'bridge.handshake / bridge.session.sync / bridge.theme.sync',
        detail:
          'Every embedded app should accept the platform context over the bridge before it tries to act independently.',
      },
      {
        label: 'Action orchestration',
        endpoint: 'bridge.action.request',
        detail:
          'Children should ask the shell to open other apps, queue handoffs, or change platform route state instead of reaching around the shell.',
      },
      {
        label: 'Health and resize',
        endpoint: 'bridge.health.ping / bridge.resize.sync',
        detail:
          'These keep iframe integrations observable and stable under reloads, route changes, and layout growth.',
      },
    ],
    examples: [
      {
        title: 'Add a future analytics app',
        body:
          'Register it in the platform registry, implement the typed bridge, accept shell context, and let the shell own navigation and environment switching.',
      },
      {
        title: 'Keep brand consistency',
        body:
          'Use platform theme tokens and shell copy so the embedded app feels like one console, not a separate tool with its own identity rules.',
      },
    ],
    advanced: [
      'Persist reload-recovery state in the shell, not only in the child.',
      'Treat CSP, iframe sandbox, and origin allowlists as part of the product architecture, not only security hardening.',
      'Document every new embedded app as a shell integration, not just a standalone front end.',
    ],
    callToAction: {
      label: 'Sync Shell Route',
      action: 'switch-route',
      summary: 'Ask the platform shell to treat the current Playground route as the active workspace route.',
    },
  },
];

export const foundationPrinciples: FoundationPrincipleDefinition[] = [
  {
    key: 'generic-api',
    title: 'Keep the API generic',
    body:
      'Routes should talk about products, models, entries, documents, workspaces, and publications. Domain meaning belongs in the data and blueprints.',
  },
  {
    key: 'one-shell',
    title: 'Use one shell for many tools',
    body:
      'The platform shell should own navigation, session state, environment, branding, and health. Embedded tools should focus on their workspace concerns.',
  },
  {
    key: 'docs-to-execution',
    title: 'Let documentation lead directly into execution',
    body:
      'A useful product surface teaches the model, produces a draft, and hands that draft to the next operational tool without forcing the user to re-enter context.',
  },
];
