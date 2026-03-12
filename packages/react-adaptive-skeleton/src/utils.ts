import type React from "react";

import {
  ATTR_FLAT_SKELETON,
  ATTR_NO_SKELETON,
  ATTR_NO_SKELETON_TEXT,
  ATTR_SKELETON,
  LEAF_TAGS,
} from "./constants";

export interface AdaptiveSkeletonRect {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius?: string | undefined;
  borderTopLeftRadius?: string | undefined;
  borderTopRightRadius?: string | undefined;
  borderBottomRightRadius?: string | undefined;
  borderBottomLeftRadius?: string | undefined;
  cornerShape?: string | undefined;
}

export interface AdaptiveSkeletonOptions {
  /**
   * CSS selectors, tag names (e.g., "label"), or attribute selectors (e.g., "[data-no-sk]")
   * that the scanner should skip.
   */
  skipSelectors?: Array<string>;
  /**
   * CSS selectors, tag names (e.g., "p"), or attribute selectors for elements
   * whose text nodes (and descendants' text nodes) should be skipped.
   */
  skipTextSelectors?: Array<string>;
  /**
   * Explicit CSS selectors, tag names, or attribute selectors for elements
   * that should be skeletonized as blocks.
   */
  targetSelectors?: Array<string>;
  /**
   * Default HTML attributes/props applied to the wrapper container for every
   * instance of this skeleton. Instance-level props (`className`, `style`,
   * custom data attributes, etc.) take precedence and override these defaults.
   *
   * @example
   * defaultProps: { className: "group/skeleton", "data-wrapper": "" }
   */
  defaultProps?: React.HTMLAttributes<HTMLElement> & Record<string, unknown>;
}

/**
 * Computes intersection between two DOMRects.
 * If they don't intersect, returns null.
 */
function intersectRects(rect1: DOMRect, rect2?: DOMRect): DOMRect | null {
  if (!rect2) return rect1;

  const left = Math.max(rect1.left, rect2.left);
  const top = Math.max(rect1.top, rect2.top);
  const right = Math.min(rect1.right, rect2.right);
  const bottom = Math.min(rect1.bottom, rect2.bottom);

  if (right <= left || bottom <= top) {
    return null;
  }

  return new DOMRect(left, top, right - left, bottom - top);
}

/**
 * Measures a node relative to its skeleton container.
 *
 * @param startIndex - Base index for generating stable rect IDs. Pass the
 *   current accumulator length so IDs remain unique across multiple calls
 *   within a single scan.
 */
export const getRelativeRect = (
  rect: DOMRect | Iterable<DOMRect>,
  containerRect: DOMRect,
  borderRadius?: string,
  clipRect?: DOMRect,
  details?: Partial<
    Pick<
      AdaptiveSkeletonRect,
      | "borderTopLeftRadius"
      | "borderTopRightRadius"
      | "borderBottomRightRadius"
      | "borderBottomLeftRadius"
      | "cornerShape"
    >
  >,
  startIndex = 0,
): AdaptiveSkeletonRect[] => {
  const rects = rect instanceof DOMRect ? [rect] : Array.from(rect);

  return rects
    .map((r) => (clipRect ? intersectRects(r, clipRect) : r))
    .filter((r): r is DOMRect => r !== null && r.width > 0 && r.height > 0)
    .map((r, i) => ({
      id: `sk-${startIndex + i}`,
      top: r.top - containerRect.top,
      left: r.left - containerRect.left,
      width: r.width,
      height: r.height,
      borderRadius,
      ...details,
    }));
};

/**
 * Recursively scans the DOM to find elements and text nodes to skeletonize
 */
export const scanDOM = (
  container: HTMLElement,
  isLoading?: boolean,
  options?: AdaptiveSkeletonOptions,
): AdaptiveSkeletonRect[] => {
  const containerRect = container.getBoundingClientRect();

  // Bail out early if the container has not been painted yet (e.g. display:none,
  // inside a closed <details>, or a portal that hasn't mounted).
  // All relative-position calculations would produce meaningless rects.
  if (containerRect.width === 0 && containerRect.height === 0) return [];

  const foundRects: AdaptiveSkeletonRect[] = [];
  const nodesToUpdate: Array<{
    element: HTMLElement;
    type: "block" | "text";
  }> = [];

  const traverse = (node: Node, parentClipRect?: DOMRect) => {
    const element =
      node instanceof Element ? (node as HTMLElement | SVGElement) : null;

    // SVG children (anything inside <svg> that isn't the <svg> root itself)
    // use a different coordinate system and their text nodes would produce
    // incorrectly positioned rects. The <svg> root is handled as a leaf block.
    // The typeof guard keeps this safe in non-browser environments (e.g. JSDOM).
    if (
      typeof SVGElement !== "undefined" &&
      element instanceof SVGElement &&
      !(element instanceof SVGSVGElement)
    )
      return;

    // Skip elements with data-no-skeleton attribute or skip selectors
    if (
      element?.hasAttribute(ATTR_NO_SKELETON) ||
      options?.skipSelectors?.some((skipKey) => element?.matches(skipKey))
    )
      return;

    let currentClipRect = parentClipRect;

    // Single getComputedStyle call per element, shared between the clipping
    // check and the block handler below
    const style = element ? window.getComputedStyle(element) : null;

    if (element && style) {
      const isClipping =
        style.overflow === "hidden" ||
        style.overflow === "clip" ||
        style.overflowX === "hidden" ||
        style.overflowY === "hidden" ||
        style.display === "-webkit-box";

      if (isClipping) {
        currentClipRect =
          intersectRects(element.getBoundingClientRect(), parentClipRect) ||
          undefined;
      }
    }

    const isLeafTag = LEAF_TAGS.includes(node.nodeName.toUpperCase());

    // Handle Blocks
    if (
      element &&
      style &&
      (isLeafTag ||
        element.hasAttribute(ATTR_SKELETON) ||
        options?.targetSelectors?.some((targetKey) =>
          element.matches(targetKey),
        ))
    ) {
      const rect = element.getBoundingClientRect();

      const isNonZero = (val: string) => {
        const parsed = Number.parseFloat(val);
        return !Number.isNaN(parsed) && parsed > 0;
      };

      const hasNativeRadius =
        isNonZero(style.borderTopLeftRadius) ||
        isNonZero(style.borderTopRightRadius) ||
        isNonZero(style.borderBottomRightRadius) ||
        isNonZero(style.borderBottomLeftRadius);

      const shouldAdaptBorder =
        hasNativeRadius || element.hasAttribute(ATTR_FLAT_SKELETON);

      if (rect.width > 0 && rect.height > 0) {
        nodesToUpdate.push({ element: element as HTMLElement, type: "block" });
        foundRects.push(
          ...getRelativeRect(
            rect,
            containerRect,
            shouldAdaptBorder ? style.borderRadius : undefined,
            currentClipRect,
            shouldAdaptBorder
              ? {
                  borderTopLeftRadius: style.borderTopLeftRadius,
                  borderTopRightRadius: style.borderTopRightRadius,
                  borderBottomRightRadius: style.borderBottomRightRadius,
                  borderBottomLeftRadius: style.borderBottomLeftRadius,
                  // @ts-ignore - experimental property
                  cornerShape: style.cornerShape || style.webkitCornerShape,
                }
              : undefined,
            foundRects.length,
          ),
        );
      }
      return;
    }

    // Handle Text Nodes
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const parentElement = node.parentElement;

      if (
        parentElement &&
        (parentElement.closest(`[${ATTR_NO_SKELETON_TEXT}]`) ||
          options?.skipTextSelectors?.some((skipKey) =>
            parentElement.closest(skipKey),
          ))
      ) {
        return;
      }

      const range = document.createRange();
      range.selectNodeContents(node);

      foundRects.push(
        ...getRelativeRect(
          range.getClientRects(),
          containerRect,
          undefined,
          currentClipRect,
          undefined,
          foundRects.length,
        ),
      );

      if (node.parentElement) {
        nodesToUpdate.push({
          element: node.parentElement as HTMLElement,
          type: "text",
        });
      }
      return;
    }

    for (const child of node.childNodes) {
      traverse(child, currentClipRect);
    }
  };

  // Phase 1: Measurements (Reads)
  traverse(container);

  // Phase 2: Style Updates (Writes)
  // Only write style properties when the value actually needs to change —
  // avoids forcing style mutations on elements that were never touched
  for (const { element, type } of nodesToUpdate) {
    if (type === "block") {
      if (isLoading) {
        element.style.opacity = "0";
        element.style.pointerEvents = "none";
      } else {
        if (element.style.opacity) element.style.opacity = "";
        if (element.style.pointerEvents) element.style.pointerEvents = "";
      }
    } else if (type === "text") {
      if (isLoading) {
        element.style.color = "transparent";
      } else {
        if (element.style.color) element.style.color = "";
      }
    }
  }

  return foundRects;
};
