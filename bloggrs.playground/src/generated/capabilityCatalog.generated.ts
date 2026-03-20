/* eslint-disable */
export type ExperienceLevelKey = 'beginner' | 'practitioner' | 'advanced' | 'expert';

export interface ExperienceLevelDefinition {
  key: ExperienceLevelKey;
  name: string;
  summary: string;
  goals: string[];
}

export interface ProductTypeDefinition {
  key: string;
  name: string;
  coreOutcome: string;
  surfaces: string[];
  beginnerFocus: string;
  expertFocus: string;
}

export interface CapabilityDefinition {
  key: string;
  name: string;
  family: string;
  purpose: string;
  beginnerUsage: string;
  practitionerUsage: string;
  advancedUsage: string;
  expertUsage: string;
  blogExample: string;
  commerceExample: string;
  documentationContract: string;
  typeSignal: string;
  validationRule: string;
  integrationNote: string;
}

export const experienceLevels: ExperienceLevelDefinition[] = [
  {
    "key": "beginner",
    "name": "Beginner",
    "summary": "Focus on safe defaults, a small surface area, and clear language that teaches the generic model without overloading the user.",
    "goals": [
      "Understand the difference between products, documents, models, entries, and publications.",
      "Assemble a page from well-named blocks and starter blueprints.",
      "Publish blog or commerce content without needing custom code first."
    ]
  },
  {
    "key": "practitioner",
    "name": "Practitioner",
    "summary": "Compose multi-page systems, reuse schemas, and align editorial or merchandising workflows to the shared builder contract.",
    "goals": [
      "Create reusable sections and connected data bindings.",
      "Model a blog or storefront without hard-coding domain assumptions into the API.",
      "Review and approve publications with confidence."
    ]
  },
  {
    "key": "advanced",
    "name": "Advanced",
    "summary": "Shape the document system itself, define organization standards, and tune rendering, types, and extension boundaries.",
    "goals": [
      "Introduce custom block families, tokens, and validation rules.",
      "Design versioning and operational review processes.",
      "Build opinionated product-type packs on top of the generic foundation."
    ]
  },
  {
    "key": "expert",
    "name": "Expert",
    "summary": "Govern the platform, automate documentation and type production, and evolve the builder into a durable product platform.",
    "goals": [
      "Create enterprise governance and training systems.",
      "Turn patterns into codified blueprints and typed registries.",
      "Own migration, audit, observability, and expansion toward ecommerce scale."
    ]
  }
];

export const productTypes: ProductTypeDefinition[] = [
  {
    "key": "blog",
    "name": "Blog",
    "coreOutcome": "editorial publishing, content archives, authoring workflows, and recurring publication schedules",
    "surfaces": [
      "home",
      "post",
      "archive",
      "author",
      "category",
      "about"
    ],
    "beginnerFocus": "work with starter layouts, hero sections, featured posts, and metadata-heavy article templates",
    "expertFocus": "codify editorial systems, design article taxonomies, and automate publication packs"
  },
  {
    "key": "commerce",
    "name": "Commerce",
    "coreOutcome": "catalog storytelling, campaign landing pages, product detail pages, and trust-building conversion flows",
    "surfaces": [
      "home",
      "collection",
      "product",
      "bundle",
      "campaign",
      "checkout-assist"
    ],
    "beginnerFocus": "compose homepage offers, merchandising rails, and product content blocks",
    "expertFocus": "standardize product information architecture and campaign operations on the same generic builder contract"
  },
  {
    "key": "application",
    "name": "Application",
    "coreOutcome": "authenticated account flows, dashboard surfaces, registration paths, and API-driven product workspaces",
    "surfaces": [
      "home",
      "login",
      "register",
      "dashboard",
      "settings"
    ],
    "beginnerFocus": "start from login/register screens, account summaries, and reusable app shell sections",
    "expertFocus": "formalize SQL-backed models and flexible collection surfaces on a shared runtime contract"
  },
  {
    "key": "knowledge-base",
    "name": "Knowledge Base",
    "coreOutcome": "structured reference material, guided learning paths, search-first navigation, and rich information retrieval",
    "surfaces": [
      "landing",
      "topic",
      "article",
      "guide",
      "faq"
    ],
    "beginnerFocus": "start with article pages and grouped collections",
    "expertFocus": "formalize structured docs with reusable learning journeys"
  },
  {
    "key": "landing",
    "name": "Campaign Landing",
    "coreOutcome": "high-conversion storytelling, messaging experiments, and audience-specific page systems",
    "surfaces": [
      "campaign",
      "feature",
      "pricing",
      "signup",
      "comparison"
    ],
    "beginnerFocus": "build one-off campaign pages from curated blocks",
    "expertFocus": "govern experiments, variants, and data-informed conversion systems"
  }
];

export const fieldKinds = [
  {
    "key": "string",
    "name": "String Field",
    "purpose": "captures concise labels, titles, and nav text",
    "shape": "string",
    "guardrail": "keep labels human-readable and avoid overloading them with HTML"
  },
  {
    "key": "text",
    "name": "Text Field",
    "purpose": "stores longer editorial or product-support copy",
    "shape": "string",
    "guardrail": "enforce tone and length expectations per model"
  },
  {
    "key": "richText",
    "name": "Rich Text Field",
    "purpose": "holds formatted long-form content and annotated narratives",
    "shape": "rich-text tree or HTML string",
    "guardrail": "validate embeds and unsupported formatting before publication"
  },
  {
    "key": "markdown",
    "name": "Markdown Field",
    "purpose": "supports docs-friendly authoring and portable content storage",
    "shape": "string",
    "guardrail": "normalize heading depth and fenced code conventions"
  },
  {
    "key": "number",
    "name": "Number Field",
    "purpose": "captures ranking, prices, weights, counts, and inventory-like values",
    "shape": "number",
    "guardrail": "document units, currency context, and allowed ranges"
  },
  {
    "key": "boolean",
    "name": "Boolean Field",
    "purpose": "signals toggles such as featured, gated, hidden, or preorder",
    "shape": "boolean",
    "guardrail": "avoid using booleans when a future enum is more likely"
  },
  {
    "key": "enum",
    "name": "Enum Field",
    "purpose": "restricts values to a curated set that the UI and docs can explain",
    "shape": "string union",
    "guardrail": "version the option set and publish change notes when it evolves"
  },
  {
    "key": "image",
    "name": "Image Field",
    "purpose": "stores primary or supporting media references",
    "shape": "asset reference",
    "guardrail": "enforce aspect-ratio guidance and alt-text policies"
  },
  {
    "key": "gallery",
    "name": "Gallery Field",
    "purpose": "represents ordered media groups for storytelling or merchandising",
    "shape": "asset reference array",
    "guardrail": "set max item counts and image sequencing rules"
  },
  {
    "key": "reference",
    "name": "Reference Field",
    "purpose": "connects one model to another without duplicating data",
    "shape": "entry reference",
    "guardrail": "document ownership and fallback behavior for missing references"
  },
  {
    "key": "list",
    "name": "List Field",
    "purpose": "stores repeatable plain-value collections",
    "shape": "array",
    "guardrail": "define ordering semantics and max item counts"
  },
  {
    "key": "datetime",
    "name": "Datetime Field",
    "purpose": "drives publication timing, launches, and scheduled visibility",
    "shape": "ISO timestamp",
    "guardrail": "always document timezone expectations and scheduling behavior"
  }
] as const;

export const blockFamilies = [
  {
    "key": "hero",
    "name": "Hero Block",
    "purpose": "opens the page with narrative and intent",
    "extension": "supports campaign, article, and storefront variants"
  },
  {
    "key": "feature-grid",
    "name": "Feature Grid",
    "purpose": "summarizes benefits, categories, or learning paths",
    "extension": "maps cleanly to reusable card types"
  },
  {
    "key": "article-rail",
    "name": "Article Rail",
    "purpose": "surfaces recent or featured editorial entries",
    "extension": "binds to collections with optional editorial curation"
  },
  {
    "key": "product-rail",
    "name": "Product Rail",
    "purpose": "merchandises catalog entries, bundles, or comparisons",
    "extension": "supports badges, prices, and conversion actions"
  },
  {
    "key": "testimonial",
    "name": "Testimonial Block",
    "purpose": "provides social proof and trust signals",
    "extension": "can draw from curated quote collections"
  },
  {
    "key": "faq",
    "name": "FAQ Block",
    "purpose": "answers repeated questions with structured disclosure patterns",
    "extension": "works for blog policies and commerce objections alike"
  },
  {
    "key": "cta",
    "name": "CTA Block",
    "purpose": "moves readers toward the next step",
    "extension": "can be routed to signup, checkout, subscribe, or learn-more flows"
  },
  {
    "key": "navigation",
    "name": "Navigation Block",
    "purpose": "coordinates movement across published documents",
    "extension": "uses product navigation manifests rather than hard-coded URLs"
  },
  {
    "key": "footer",
    "name": "Footer Block",
    "purpose": "provides policy, discovery, and brand continuity",
    "extension": "may include legal, taxonomy, or support clusters"
  },
  {
    "key": "comparison",
    "name": "Comparison Block",
    "purpose": "shows side-by-side tradeoffs across plans, posts, or product groups",
    "extension": "benefits from typed row definitions"
  },
  {
    "key": "timeline",
    "name": "Timeline Block",
    "purpose": "communicates release paths, launch plans, or editorial series progress",
    "extension": "can visualize schedules and milestones"
  },
  {
    "key": "stats",
    "name": "Stats Block",
    "purpose": "highlights quantitative proof, metrics, or community signals",
    "extension": "works with live and static data sources"
  },
  {
    "key": "media-story",
    "name": "Media Story Block",
    "purpose": "pairs image, video, or motion with narrative copy",
    "extension": "helps bridge blog storytelling and merchandising"
  },
  {
    "key": "form-shell",
    "name": "Form Shell",
    "purpose": "hosts capture, feedback, request, and support forms",
    "extension": "abstracts forms away from product-specific assumptions"
  },
  {
    "key": "pricing",
    "name": "Pricing Block",
    "purpose": "packages offers into persuasive comparison views",
    "extension": "requires strong token and validation standards"
  },
  {
    "key": "collection-grid",
    "name": "Collection Grid",
    "purpose": "renders structured entry lists with repeatable cards",
    "extension": "acts as a core generic block for many product types"
  }
] as const;

export const dataSourceTypes = [
  {
    "key": "manual",
    "name": "Manual Source",
    "purpose": "injects static authored content into a document",
    "safeguard": "track ownership and review intent"
  },
  {
    "key": "collection",
    "name": "Collection Source",
    "purpose": "hydrates blocks from entry collections",
    "safeguard": "document sort, filters, and empty states"
  },
  {
    "key": "reference-chain",
    "name": "Reference Chain",
    "purpose": "follows references from one entry to another",
    "safeguard": "avoid deep graph traversal without cache strategy"
  },
  {
    "key": "computed",
    "name": "Computed Source",
    "purpose": "derives values from other fields and publication metadata",
    "safeguard": "publish the derivation rules for maintainability"
  },
  {
    "key": "remote-rest",
    "name": "Remote REST Source",
    "purpose": "loads external system data into a safe binding boundary",
    "safeguard": "define timeout, retry, and failure fallbacks"
  },
  {
    "key": "remote-graphql",
    "name": "Remote GraphQL Source",
    "purpose": "hydrates rich external datasets with explicit field selection",
    "safeguard": "version the query contract and cache semantics"
  },
  {
    "key": "analytics",
    "name": "Analytics Source",
    "purpose": "feeds evidence and trend data into blocks and dashboards",
    "safeguard": "separate operational metrics from editorial truth"
  },
  {
    "key": "publication",
    "name": "Publication Source",
    "purpose": "uses publication manifests and document metadata as data",
    "safeguard": "keep publication snapshots immutable"
  }
] as const;

export const themeTokenGroups = [
  {
    "key": "color-brand",
    "name": "Brand Color Tokens",
    "purpose": "anchors visual identity across sections and components"
  },
  {
    "key": "color-surface",
    "name": "Surface Tokens",
    "purpose": "coordinates cards, shells, panels, and emphasis backgrounds"
  },
  {
    "key": "color-feedback",
    "name": "Feedback Tokens",
    "purpose": "signals success, warning, and error states consistently"
  },
  {
    "key": "type-display",
    "name": "Display Type Tokens",
    "purpose": "controls hero, campaign, and narrative headline behavior"
  },
  {
    "key": "type-body",
    "name": "Body Type Tokens",
    "purpose": "sets reading comfort, rhythm, and density"
  },
  {
    "key": "spacing",
    "name": "Spacing Tokens",
    "purpose": "governs composition rhythm and section breathing room"
  },
  {
    "key": "radius",
    "name": "Radius Tokens",
    "purpose": "aligns card, media, and interactive surface curvature"
  },
  {
    "key": "shadow",
    "name": "Shadow Tokens",
    "purpose": "defines depth without arbitrary one-off effects"
  }
] as const;

export const extensionPoints = [
  {
    "key": "product-pack",
    "name": "Product Pack",
    "purpose": "bundles starter types, models, docs, and page blueprints for a domain"
  },
  {
    "key": "block-registry",
    "name": "Block Registry",
    "purpose": "registers new block families with typed configuration and docs metadata"
  },
  {
    "key": "field-plugin",
    "name": "Field Plugin",
    "purpose": "adds new input semantics to content models while keeping the core contract stable"
  },
  {
    "key": "publication-hook",
    "name": "Publication Hook",
    "purpose": "runs additional checks or export steps during publish"
  },
  {
    "key": "render-adapter",
    "name": "Render Adapter",
    "purpose": "adapts builder output to a consuming runtime or SDK surface"
  },
  {
    "key": "theme-pack",
    "name": "Theme Pack",
    "purpose": "ships token groups, presets, and usage guidance together"
  },
  {
    "key": "validation-pack",
    "name": "Validation Pack",
    "purpose": "collects domain rules and review constraints into reusable sets"
  },
  {
    "key": "documentation-pack",
    "name": "Documentation Pack",
    "purpose": "ships learning tracks, examples, and migration notes with the feature surface"
  }
] as const;

export const capabilityMatrix: CapabilityDefinition[] = [
  {
    "key": "string",
    "name": "String Field",
    "family": "field-kind",
    "purpose": "captures concise labels, titles, and nav text",
    "beginnerUsage": "Start with string field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat string field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how string field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern string field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, string field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, string field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of string field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "string",
    "validationRule": "keep labels human-readable and avoid overloading them with HTML",
    "integrationNote": "Connect string field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "text",
    "name": "Text Field",
    "family": "field-kind",
    "purpose": "stores longer editorial or product-support copy",
    "beginnerUsage": "Start with text field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat text field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how text field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern text field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, text field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, text field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of text field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "string",
    "validationRule": "enforce tone and length expectations per model",
    "integrationNote": "Connect text field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "richText",
    "name": "Rich Text Field",
    "family": "field-kind",
    "purpose": "holds formatted long-form content and annotated narratives",
    "beginnerUsage": "Start with rich text field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat rich text field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how rich text field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern rich text field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, rich text field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, rich text field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of rich text field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "rich-text tree or HTML string",
    "validationRule": "validate embeds and unsupported formatting before publication",
    "integrationNote": "Connect rich text field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "markdown",
    "name": "Markdown Field",
    "family": "field-kind",
    "purpose": "supports docs-friendly authoring and portable content storage",
    "beginnerUsage": "Start with markdown field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat markdown field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how markdown field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern markdown field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, markdown field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, markdown field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of markdown field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "string",
    "validationRule": "normalize heading depth and fenced code conventions",
    "integrationNote": "Connect markdown field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "number",
    "name": "Number Field",
    "family": "field-kind",
    "purpose": "captures ranking, prices, weights, counts, and inventory-like values",
    "beginnerUsage": "Start with number field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat number field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how number field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern number field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, number field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, number field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of number field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "number",
    "validationRule": "document units, currency context, and allowed ranges",
    "integrationNote": "Connect number field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "boolean",
    "name": "Boolean Field",
    "family": "field-kind",
    "purpose": "signals toggles such as featured, gated, hidden, or preorder",
    "beginnerUsage": "Start with boolean field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat boolean field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how boolean field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern boolean field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, boolean field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, boolean field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of boolean field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "boolean",
    "validationRule": "avoid using booleans when a future enum is more likely",
    "integrationNote": "Connect boolean field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "enum",
    "name": "Enum Field",
    "family": "field-kind",
    "purpose": "restricts values to a curated set that the UI and docs can explain",
    "beginnerUsage": "Start with enum field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat enum field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how enum field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern enum field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, enum field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, enum field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of enum field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "string union",
    "validationRule": "version the option set and publish change notes when it evolves",
    "integrationNote": "Connect enum field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "image",
    "name": "Image Field",
    "family": "field-kind",
    "purpose": "stores primary or supporting media references",
    "beginnerUsage": "Start with image field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat image field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how image field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern image field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, image field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, image field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of image field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "asset reference",
    "validationRule": "enforce aspect-ratio guidance and alt-text policies",
    "integrationNote": "Connect image field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "gallery",
    "name": "Gallery Field",
    "family": "field-kind",
    "purpose": "represents ordered media groups for storytelling or merchandising",
    "beginnerUsage": "Start with gallery field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat gallery field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how gallery field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern gallery field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, gallery field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, gallery field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of gallery field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "asset reference array",
    "validationRule": "set max item counts and image sequencing rules",
    "integrationNote": "Connect gallery field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "reference",
    "name": "Reference Field",
    "family": "field-kind",
    "purpose": "connects one model to another without duplicating data",
    "beginnerUsage": "Start with reference field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat reference field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how reference field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern reference field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, reference field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, reference field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of reference field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "entry reference",
    "validationRule": "document ownership and fallback behavior for missing references",
    "integrationNote": "Connect reference field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "list",
    "name": "List Field",
    "family": "field-kind",
    "purpose": "stores repeatable plain-value collections",
    "beginnerUsage": "Start with list field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat list field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how list field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern list field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, list field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, list field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of list field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "array",
    "validationRule": "define ordering semantics and max item counts",
    "integrationNote": "Connect list field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "datetime",
    "name": "Datetime Field",
    "family": "field-kind",
    "purpose": "drives publication timing, launches, and scheduled visibility",
    "beginnerUsage": "Start with datetime field as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat datetime field as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how datetime field interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern datetime field as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, datetime field helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, datetime field supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of datetime field should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "ISO timestamp",
    "validationRule": "always document timezone expectations and scheduling behavior",
    "integrationNote": "Connect datetime field to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "hero",
    "name": "Hero Block",
    "family": "block-family",
    "purpose": "opens the page with narrative and intent",
    "beginnerUsage": "Start with hero block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat hero block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how hero block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern hero block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, hero block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, hero block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of hero block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "supports campaign, article, and storefront variants",
    "validationRule": "Define explicit allowed values and failure behavior for hero block.",
    "integrationNote": "Connect hero block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "feature-grid",
    "name": "Feature Grid",
    "family": "block-family",
    "purpose": "summarizes benefits, categories, or learning paths",
    "beginnerUsage": "Start with feature grid as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat feature grid as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how feature grid interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern feature grid as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, feature grid helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, feature grid supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of feature grid should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "maps cleanly to reusable card types",
    "validationRule": "Define explicit allowed values and failure behavior for feature grid.",
    "integrationNote": "Connect feature grid to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "article-rail",
    "name": "Article Rail",
    "family": "block-family",
    "purpose": "surfaces recent or featured editorial entries",
    "beginnerUsage": "Start with article rail as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat article rail as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how article rail interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern article rail as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, article rail helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, article rail supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of article rail should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "binds to collections with optional editorial curation",
    "validationRule": "Define explicit allowed values and failure behavior for article rail.",
    "integrationNote": "Connect article rail to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "product-rail",
    "name": "Product Rail",
    "family": "block-family",
    "purpose": "merchandises catalog entries, bundles, or comparisons",
    "beginnerUsage": "Start with product rail as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat product rail as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how product rail interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern product rail as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, product rail helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, product rail supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of product rail should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "supports badges, prices, and conversion actions",
    "validationRule": "Define explicit allowed values and failure behavior for product rail.",
    "integrationNote": "Connect product rail to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "testimonial",
    "name": "Testimonial Block",
    "family": "block-family",
    "purpose": "provides social proof and trust signals",
    "beginnerUsage": "Start with testimonial block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat testimonial block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how testimonial block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern testimonial block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, testimonial block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, testimonial block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of testimonial block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "can draw from curated quote collections",
    "validationRule": "Define explicit allowed values and failure behavior for testimonial block.",
    "integrationNote": "Connect testimonial block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "faq",
    "name": "FAQ Block",
    "family": "block-family",
    "purpose": "answers repeated questions with structured disclosure patterns",
    "beginnerUsage": "Start with faq block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat faq block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how faq block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern faq block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, faq block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, faq block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of faq block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "works for blog policies and commerce objections alike",
    "validationRule": "Define explicit allowed values and failure behavior for faq block.",
    "integrationNote": "Connect faq block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "cta",
    "name": "CTA Block",
    "family": "block-family",
    "purpose": "moves readers toward the next step",
    "beginnerUsage": "Start with cta block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat cta block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how cta block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern cta block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, cta block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, cta block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of cta block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "can be routed to signup, checkout, subscribe, or learn-more flows",
    "validationRule": "Define explicit allowed values and failure behavior for cta block.",
    "integrationNote": "Connect cta block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "navigation",
    "name": "Navigation Block",
    "family": "block-family",
    "purpose": "coordinates movement across published documents",
    "beginnerUsage": "Start with navigation block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat navigation block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how navigation block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern navigation block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, navigation block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, navigation block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of navigation block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "uses product navigation manifests rather than hard-coded URLs",
    "validationRule": "Define explicit allowed values and failure behavior for navigation block.",
    "integrationNote": "Connect navigation block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "footer",
    "name": "Footer Block",
    "family": "block-family",
    "purpose": "provides policy, discovery, and brand continuity",
    "beginnerUsage": "Start with footer block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat footer block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how footer block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern footer block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, footer block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, footer block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of footer block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "may include legal, taxonomy, or support clusters",
    "validationRule": "Define explicit allowed values and failure behavior for footer block.",
    "integrationNote": "Connect footer block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "comparison",
    "name": "Comparison Block",
    "family": "block-family",
    "purpose": "shows side-by-side tradeoffs across plans, posts, or product groups",
    "beginnerUsage": "Start with comparison block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat comparison block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how comparison block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern comparison block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, comparison block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, comparison block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of comparison block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "benefits from typed row definitions",
    "validationRule": "Define explicit allowed values and failure behavior for comparison block.",
    "integrationNote": "Connect comparison block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "timeline",
    "name": "Timeline Block",
    "family": "block-family",
    "purpose": "communicates release paths, launch plans, or editorial series progress",
    "beginnerUsage": "Start with timeline block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat timeline block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how timeline block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern timeline block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, timeline block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, timeline block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of timeline block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "can visualize schedules and milestones",
    "validationRule": "Define explicit allowed values and failure behavior for timeline block.",
    "integrationNote": "Connect timeline block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "stats",
    "name": "Stats Block",
    "family": "block-family",
    "purpose": "highlights quantitative proof, metrics, or community signals",
    "beginnerUsage": "Start with stats block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat stats block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how stats block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern stats block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, stats block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, stats block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of stats block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "works with live and static data sources",
    "validationRule": "Define explicit allowed values and failure behavior for stats block.",
    "integrationNote": "Connect stats block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "media-story",
    "name": "Media Story Block",
    "family": "block-family",
    "purpose": "pairs image, video, or motion with narrative copy",
    "beginnerUsage": "Start with media story block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat media story block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how media story block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern media story block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, media story block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, media story block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of media story block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "helps bridge blog storytelling and merchandising",
    "validationRule": "Define explicit allowed values and failure behavior for media story block.",
    "integrationNote": "Connect media story block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "form-shell",
    "name": "Form Shell",
    "family": "block-family",
    "purpose": "hosts capture, feedback, request, and support forms",
    "beginnerUsage": "Start with form shell as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat form shell as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how form shell interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern form shell as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, form shell helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, form shell supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of form shell should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "abstracts forms away from product-specific assumptions",
    "validationRule": "Define explicit allowed values and failure behavior for form shell.",
    "integrationNote": "Connect form shell to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "pricing",
    "name": "Pricing Block",
    "family": "block-family",
    "purpose": "packages offers into persuasive comparison views",
    "beginnerUsage": "Start with pricing block as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat pricing block as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how pricing block interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern pricing block as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, pricing block helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, pricing block supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of pricing block should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "requires strong token and validation standards",
    "validationRule": "Define explicit allowed values and failure behavior for pricing block.",
    "integrationNote": "Connect pricing block to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "collection-grid",
    "name": "Collection Grid",
    "family": "block-family",
    "purpose": "renders structured entry lists with repeatable cards",
    "beginnerUsage": "Start with collection grid as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat collection grid as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how collection grid interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern collection grid as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, collection grid helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, collection grid supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of collection grid should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "acts as a core generic block for many product types",
    "validationRule": "Define explicit allowed values and failure behavior for collection grid.",
    "integrationNote": "Connect collection grid to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "manual",
    "name": "Manual Source",
    "family": "data-source",
    "purpose": "injects static authored content into a document",
    "beginnerUsage": "Start with manual source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat manual source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how manual source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern manual source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, manual source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, manual source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of manual source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "track ownership and review intent",
    "validationRule": "track ownership and review intent",
    "integrationNote": "Connect manual source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "collection",
    "name": "Collection Source",
    "family": "data-source",
    "purpose": "hydrates blocks from entry collections",
    "beginnerUsage": "Start with collection source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat collection source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how collection source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern collection source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, collection source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, collection source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of collection source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "document sort, filters, and empty states",
    "validationRule": "document sort, filters, and empty states",
    "integrationNote": "Connect collection source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "reference-chain",
    "name": "Reference Chain",
    "family": "data-source",
    "purpose": "follows references from one entry to another",
    "beginnerUsage": "Start with reference chain as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat reference chain as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how reference chain interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern reference chain as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, reference chain helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, reference chain supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of reference chain should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "avoid deep graph traversal without cache strategy",
    "validationRule": "avoid deep graph traversal without cache strategy",
    "integrationNote": "Connect reference chain to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "computed",
    "name": "Computed Source",
    "family": "data-source",
    "purpose": "derives values from other fields and publication metadata",
    "beginnerUsage": "Start with computed source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat computed source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how computed source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern computed source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, computed source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, computed source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of computed source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "publish the derivation rules for maintainability",
    "validationRule": "publish the derivation rules for maintainability",
    "integrationNote": "Connect computed source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "remote-rest",
    "name": "Remote REST Source",
    "family": "data-source",
    "purpose": "loads external system data into a safe binding boundary",
    "beginnerUsage": "Start with remote rest source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat remote rest source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how remote rest source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern remote rest source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, remote rest source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, remote rest source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of remote rest source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "define timeout, retry, and failure fallbacks",
    "validationRule": "define timeout, retry, and failure fallbacks",
    "integrationNote": "Connect remote rest source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "remote-graphql",
    "name": "Remote GraphQL Source",
    "family": "data-source",
    "purpose": "hydrates rich external datasets with explicit field selection",
    "beginnerUsage": "Start with remote graphql source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat remote graphql source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how remote graphql source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern remote graphql source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, remote graphql source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, remote graphql source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of remote graphql source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "version the query contract and cache semantics",
    "validationRule": "version the query contract and cache semantics",
    "integrationNote": "Connect remote graphql source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "analytics",
    "name": "Analytics Source",
    "family": "data-source",
    "purpose": "feeds evidence and trend data into blocks and dashboards",
    "beginnerUsage": "Start with analytics source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat analytics source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how analytics source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern analytics source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, analytics source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, analytics source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of analytics source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "separate operational metrics from editorial truth",
    "validationRule": "separate operational metrics from editorial truth",
    "integrationNote": "Connect analytics source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "publication",
    "name": "Publication Source",
    "family": "data-source",
    "purpose": "uses publication manifests and document metadata as data",
    "beginnerUsage": "Start with publication source as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat publication source as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how publication source interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern publication source as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, publication source helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, publication source supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of publication source should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "keep publication snapshots immutable",
    "validationRule": "keep publication snapshots immutable",
    "integrationNote": "Connect publication source to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "color-brand",
    "name": "Brand Color Tokens",
    "family": "theme-token",
    "purpose": "anchors visual identity across sections and components",
    "beginnerUsage": "Start with brand color tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat brand color tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how brand color tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern brand color tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, brand color tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, brand color tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of brand color tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "anchors visual identity across sections and components",
    "validationRule": "Define explicit allowed values and failure behavior for brand color tokens.",
    "integrationNote": "Connect brand color tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "color-surface",
    "name": "Surface Tokens",
    "family": "theme-token",
    "purpose": "coordinates cards, shells, panels, and emphasis backgrounds",
    "beginnerUsage": "Start with surface tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat surface tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how surface tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern surface tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, surface tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, surface tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of surface tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "coordinates cards, shells, panels, and emphasis backgrounds",
    "validationRule": "Define explicit allowed values and failure behavior for surface tokens.",
    "integrationNote": "Connect surface tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "color-feedback",
    "name": "Feedback Tokens",
    "family": "theme-token",
    "purpose": "signals success, warning, and error states consistently",
    "beginnerUsage": "Start with feedback tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat feedback tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how feedback tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern feedback tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, feedback tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, feedback tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of feedback tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "signals success, warning, and error states consistently",
    "validationRule": "Define explicit allowed values and failure behavior for feedback tokens.",
    "integrationNote": "Connect feedback tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "type-display",
    "name": "Display Type Tokens",
    "family": "theme-token",
    "purpose": "controls hero, campaign, and narrative headline behavior",
    "beginnerUsage": "Start with display type tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat display type tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how display type tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern display type tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, display type tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, display type tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of display type tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "controls hero, campaign, and narrative headline behavior",
    "validationRule": "Define explicit allowed values and failure behavior for display type tokens.",
    "integrationNote": "Connect display type tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "type-body",
    "name": "Body Type Tokens",
    "family": "theme-token",
    "purpose": "sets reading comfort, rhythm, and density",
    "beginnerUsage": "Start with body type tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat body type tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how body type tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern body type tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, body type tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, body type tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of body type tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "sets reading comfort, rhythm, and density",
    "validationRule": "Define explicit allowed values and failure behavior for body type tokens.",
    "integrationNote": "Connect body type tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "spacing",
    "name": "Spacing Tokens",
    "family": "theme-token",
    "purpose": "governs composition rhythm and section breathing room",
    "beginnerUsage": "Start with spacing tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat spacing tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how spacing tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern spacing tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, spacing tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, spacing tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of spacing tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "governs composition rhythm and section breathing room",
    "validationRule": "Define explicit allowed values and failure behavior for spacing tokens.",
    "integrationNote": "Connect spacing tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "radius",
    "name": "Radius Tokens",
    "family": "theme-token",
    "purpose": "aligns card, media, and interactive surface curvature",
    "beginnerUsage": "Start with radius tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat radius tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how radius tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern radius tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, radius tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, radius tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of radius tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "aligns card, media, and interactive surface curvature",
    "validationRule": "Define explicit allowed values and failure behavior for radius tokens.",
    "integrationNote": "Connect radius tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "shadow",
    "name": "Shadow Tokens",
    "family": "theme-token",
    "purpose": "defines depth without arbitrary one-off effects",
    "beginnerUsage": "Start with shadow tokens as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat shadow tokens as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how shadow tokens interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern shadow tokens as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, shadow tokens helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, shadow tokens supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of shadow tokens should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "defines depth without arbitrary one-off effects",
    "validationRule": "Define explicit allowed values and failure behavior for shadow tokens.",
    "integrationNote": "Connect shadow tokens to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "product-pack",
    "name": "Product Pack",
    "family": "extension-point",
    "purpose": "bundles starter types, models, docs, and page blueprints for a domain",
    "beginnerUsage": "Start with product pack as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat product pack as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how product pack interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern product pack as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, product pack helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, product pack supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of product pack should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "bundles starter types, models, docs, and page blueprints for a domain",
    "validationRule": "Define explicit allowed values and failure behavior for product pack.",
    "integrationNote": "Connect product pack to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "block-registry",
    "name": "Block Registry",
    "family": "extension-point",
    "purpose": "registers new block families with typed configuration and docs metadata",
    "beginnerUsage": "Start with block registry as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat block registry as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how block registry interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern block registry as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, block registry helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, block registry supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of block registry should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "registers new block families with typed configuration and docs metadata",
    "validationRule": "Define explicit allowed values and failure behavior for block registry.",
    "integrationNote": "Connect block registry to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "field-plugin",
    "name": "Field Plugin",
    "family": "extension-point",
    "purpose": "adds new input semantics to content models while keeping the core contract stable",
    "beginnerUsage": "Start with field plugin as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat field plugin as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how field plugin interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern field plugin as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, field plugin helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, field plugin supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of field plugin should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "adds new input semantics to content models while keeping the core contract stable",
    "validationRule": "Define explicit allowed values and failure behavior for field plugin.",
    "integrationNote": "Connect field plugin to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "publication-hook",
    "name": "Publication Hook",
    "family": "extension-point",
    "purpose": "runs additional checks or export steps during publish",
    "beginnerUsage": "Start with publication hook as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat publication hook as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how publication hook interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern publication hook as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, publication hook helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, publication hook supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of publication hook should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "runs additional checks or export steps during publish",
    "validationRule": "Define explicit allowed values and failure behavior for publication hook.",
    "integrationNote": "Connect publication hook to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "render-adapter",
    "name": "Render Adapter",
    "family": "extension-point",
    "purpose": "adapts builder output to a consuming runtime or SDK surface",
    "beginnerUsage": "Start with render adapter as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat render adapter as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how render adapter interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern render adapter as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, render adapter helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, render adapter supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of render adapter should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "adapts builder output to a consuming runtime or SDK surface",
    "validationRule": "Define explicit allowed values and failure behavior for render adapter.",
    "integrationNote": "Connect render adapter to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "theme-pack",
    "name": "Theme Pack",
    "family": "extension-point",
    "purpose": "ships token groups, presets, and usage guidance together",
    "beginnerUsage": "Start with theme pack as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat theme pack as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how theme pack interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern theme pack as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, theme pack helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, theme pack supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of theme pack should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "ships token groups, presets, and usage guidance together",
    "validationRule": "Define explicit allowed values and failure behavior for theme pack.",
    "integrationNote": "Connect theme pack to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "validation-pack",
    "name": "Validation Pack",
    "family": "extension-point",
    "purpose": "collects domain rules and review constraints into reusable sets",
    "beginnerUsage": "Start with validation pack as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat validation pack as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how validation pack interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern validation pack as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, validation pack helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, validation pack supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of validation pack should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "collects domain rules and review constraints into reusable sets",
    "validationRule": "Define explicit allowed values and failure behavior for validation pack.",
    "integrationNote": "Connect validation pack to the generic builder through typed registries instead of domain-specific API branching."
  },
  {
    "key": "documentation-pack",
    "name": "Documentation Pack",
    "family": "extension-point",
    "purpose": "ships learning tracks, examples, and migration notes with the feature surface",
    "beginnerUsage": "Start with documentation pack as a curated default and explain it with one sentence, one example, and one safe constraint.",
    "practitionerUsage": "Treat documentation pack as a reusable system asset, not a one-off implementation detail, and connect it to named blueprints.",
    "advancedUsage": "Document ownership, migration expectations, and how documentation pack interacts with publication rules and cross-team standards.",
    "expertUsage": "Govern documentation pack as a platform primitive that can be packed, versioned, audited, and trained consistently.",
    "blogExample": "In a blog context, documentation pack helps shape article discovery, authoring clarity, and publication cadence.",
    "commerceExample": "In a commerce context, documentation pack supports merchandising clarity, conversion confidence, and repeatable campaign composition.",
    "documentationContract": "Every use of documentation pack should have beginner guidance, advanced constraints, and an expert extension story.",
    "typeSignal": "ships learning tracks, examples, and migration notes with the feature surface",
    "validationRule": "Define explicit allowed values and failure behavior for documentation pack.",
    "integrationNote": "Connect documentation pack to the generic builder through typed registries instead of domain-specific API branching."
  }
];
