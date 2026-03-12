import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { ATTR_SKELETON_OVERLAY } from "../constants";
import {
  type AdaptiveSkeletonOptions,
  type AdaptiveSkeletonRect,
  scanDOM,
} from "../utils";

export const useSkeletonScanner = (
  containerRef: RefObject<HTMLElement | null>,
  isLoading: boolean,
  options?: AdaptiveSkeletonOptions,
) => {
  const [rects, setRects] = useState<AdaptiveSkeletonRect[]>([]);

  // Hold options in a ref so the effect doesn't need to re-attach observers
  // when only the options reference changes — the latest value is always
  // read via optionsRef.current at scan time
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Collapse burst events from MutationObserver + ResizeObserver into at
    // most one scan per animation frame
    let rafId = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const foundRects = scanDOM(container, isLoading, optionsRef.current);
        setRects(foundRects);
      });
    };

    // Initial scan runs synchronously so skeletons appear before paint
    const foundRects = scanDOM(container, isLoading, optionsRef.current);

    // If not loading, we only needed that single scanDOM call to clean up
    // the injected inline styles (opacity/pointer-events).
    // We don't need to save rects (the overlay is hidden anyway) and we
    // DEFINITELY don't need to observe for mutations or resizes.
    if (!isLoading) {
      setRects([]);
      return;
    }

    setRects(foundRects);

    // Re-scan when real content changes. `attributes` is intentionally
    // excluded — scanDOM writes inline styles which are attribute mutations,
    // and observing them would cause an infinite feedback loop.
    // Mutations originating from inside the skeleton overlay are also filtered
    // out since they are caused by our own renders.
    const overlaySelector = `[${ATTR_SKELETON_OVERLAY}]`;
    const observer = new MutationObserver((mutations) => {
      const hasRealMutation = mutations.some((m) => {
        const target = m.target as Element;
        return !target.closest?.(overlaySelector);
      });
      if (hasRealMutation) scheduleUpdate();
    });
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Re-scan on resize
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [containerRef, isLoading]);

  return rects;
};
