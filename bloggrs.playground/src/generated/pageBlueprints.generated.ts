/* eslint-disable */
export interface BlueprintZoneDefinition {
  key: string;
  sections: string[];
}

export interface PageBlueprintDefinition {
  key: string;
  title: string;
  productType: string;
  narrativeGoal: string;
  zones: BlueprintZoneDefinition[];
}

export const pageBlueprints: PageBlueprintDefinition[] = [
  {
    "key": "blog-home",
    "title": "Blog Home",
    "productType": "blog",
    "narrativeGoal": "orient readers, surface fresh content, and create repeatable editorial discovery patterns",
    "zones": [
      {
        "key": "hero",
        "sections": [
          "hero",
          "cta"
        ]
      },
      {
        "key": "featured",
        "sections": [
          "article-rail",
          "feature-grid"
        ]
      },
      {
        "key": "trust",
        "sections": [
          "testimonial",
          "faq"
        ]
      },
      {
        "key": "footer",
        "sections": [
          "navigation",
          "footer"
        ]
      }
    ]
  },
  {
    "key": "blog-post",
    "title": "Blog Post",
    "productType": "blog",
    "narrativeGoal": "guide a reader through one piece of content while supporting metadata, related content, and conversion",
    "zones": [
      {
        "key": "masthead",
        "sections": [
          "hero",
          "navigation"
        ]
      },
      {
        "key": "content",
        "sections": [
          "media-story"
        ]
      },
      {
        "key": "related",
        "sections": [
          "article-rail",
          "cta"
        ]
      },
      {
        "key": "footer",
        "sections": [
          "footer"
        ]
      }
    ]
  },
  {
    "key": "store-home",
    "title": "Store Home",
    "productType": "commerce",
    "narrativeGoal": "explain value quickly, anchor navigation, and promote high-priority offers",
    "zones": [
      {
        "key": "hero",
        "sections": [
          "hero",
          "stats"
        ]
      },
      {
        "key": "offers",
        "sections": [
          "product-rail",
          "pricing"
        ]
      },
      {
        "key": "trust",
        "sections": [
          "testimonial",
          "comparison"
        ]
      },
      {
        "key": "footer",
        "sections": [
          "navigation",
          "footer"
        ]
      }
    ]
  },
  {
    "key": "product-detail",
    "title": "Product Detail",
    "productType": "commerce",
    "narrativeGoal": "create confidence, answer objections, and support conversion with consistent information architecture",
    "zones": [
      {
        "key": "summary",
        "sections": [
          "media-story",
          "cta"
        ]
      },
      {
        "key": "details",
        "sections": [
          "feature-grid",
          "faq"
        ]
      },
      {
        "key": "related",
        "sections": [
          "product-rail",
          "comparison"
        ]
      },
      {
        "key": "footer",
        "sections": [
          "footer"
        ]
      }
    ]
  },
  {
    "key": "campaign-page",
    "title": "Campaign Page",
    "productType": "landing",
    "narrativeGoal": "focus attention on one promise, one segment, and one conversion path",
    "zones": [
      {
        "key": "open",
        "sections": [
          "hero",
          "stats"
        ]
      },
      {
        "key": "story",
        "sections": [
          "media-story",
          "feature-grid"
        ]
      },
      {
        "key": "proof",
        "sections": [
          "testimonial",
          "comparison"
        ]
      },
      {
        "key": "close",
        "sections": [
          "cta",
          "faq"
        ]
      }
    ]
  },
  {
    "key": "app-base",
    "title": "App Base",
    "productType": "application",
    "narrativeGoal": "launch an authenticated product surface with onboarding, login/register flows, and collection-backed dashboard sections",
    "zones": [
      {
        "key": "entry",
        "sections": [
          "navigation",
          "hero"
        ]
      },
      {
        "key": "auth",
        "sections": [
          "form-shell",
          "cta"
        ]
      },
      {
        "key": "workspace",
        "sections": [
          "stats",
          "collection-grid"
        ]
      },
      {
        "key": "support",
        "sections": [
          "faq",
          "footer"
        ]
      }
    ]
  },
  {
    "key": "knowledge-hub",
    "title": "Knowledge Hub",
    "productType": "knowledge-base",
    "narrativeGoal": "guide the reader into the right topic path and reduce search friction",
    "zones": [
      {
        "key": "orientation",
        "sections": [
          "hero",
          "navigation"
        ]
      },
      {
        "key": "topics",
        "sections": [
          "collection-grid",
          "feature-grid"
        ]
      },
      {
        "key": "support",
        "sections": [
          "faq",
          "cta"
        ]
      },
      {
        "key": "footer",
        "sections": [
          "footer"
        ]
      }
    ]
  }
];
