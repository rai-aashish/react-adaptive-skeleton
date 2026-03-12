// ─── Skeleton scanning constants ─────────────────────────────────────────────

export const LEAF_TAGS = [
  "IMG",
  "BUTTON",
  "SELECT",
  "TEXTAREA",
  "IFRAME",
  "CANVAS",
  "VIDEO",
  "AUDIO",
  "SVG",
  "INPUT",
];

// ─── Data-attribute API ───────────────────────────────────────────────────────

/** Force an element to be captured as a skeleton block. */
export const ATTR_SKELETON = "data-skeleton";

/** Exclude an element (and its entire subtree) from skeleton scanning. */
export const ATTR_NO_SKELETON = "data-no-skeleton";

/** Exclude an element's text nodes (and its descendants' text nodes) from scanning. */
export const ATTR_NO_SKELETON_TEXT = "data-no-skeleton-text";

/**
 * Opt an element into border-radius adaptation even when it has no native
 * border radius (i.e. produce a rectangular skeleton placeholder).
 */
export const ATTR_FLAT_SKELETON = "data-flat-skeleton";

// ─── React-level data-attribute constants ────────────────────────────────────

/**
 * Set on the root container element to signal the current loading state.
 * Consumers can target `[data-skeleton-active="true"]` in CSS to apply custom
 * styles while skeletons are visible.
 */
export const ATTR_SKELETON_ACTIVE = "data-skeleton-active";

/**
 * Internal marker placed on the absolutely-positioned overlay div that holds
 * the skeleton rect elements. Used by the MutationObserver to filter out DOM
 * mutations caused by the skeleton itself.
 */
export const ATTR_SKELETON_OVERLAY = "data-skeleton-overlay";
