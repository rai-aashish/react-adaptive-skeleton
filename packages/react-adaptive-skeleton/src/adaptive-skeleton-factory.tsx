import {
  type CSSProperties,
  type ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useRef,
} from "react";

import { ATTR_SKELETON_ACTIVE, ATTR_SKELETON_OVERLAY } from "./constants";
import { mergeRefs, useSkeletonScanner } from "./hooks/index";
import type { AdaptiveSkeletonOptions, AdaptiveSkeletonRect } from "./utils";

export type AdaptiveSkeletonProps<T extends React.ElementType> = {
  isLoading: boolean;
  as?: T;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "ref" | "as" | "style" | "className"
>;

export const createAdaptiveSkeleton = <P extends {}>(
  skeletonTemplate: ReactElement<P & { style?: CSSProperties }>,
  options?: AdaptiveSkeletonOptions,
) => {
  const InternalAdaptiveSkeleton = (
    {
      isLoading,
      children,
      style,
      className,
      as: Component = "div",
      ...restProps
    }: AdaptiveSkeletonProps<React.ElementType>,
    passedContainerRef: React.ForwardedRef<HTMLElement>,
  ) => {
    const localContainerRef = useRef<HTMLElement>(null);
    // Memoized so React doesn't detach/re-attach the ref on every render
    const containerRef = useMemo(
      () => mergeRefs(localContainerRef, passedContainerRef),
      [passedContainerRef],
    );

    const rects = useSkeletonScanner(localContainerRef, isLoading, options);

    if (!isValidElement(skeletonTemplate)) {
      throw new Error("Valid Element is required for skeleton");
    }

    return (
      <Component
        ref={containerRef}
        className={className}
        style={
          {
            position: "relative",
            width: "fit-content",
            display: Component === "div" ? "block" : undefined,
            // Hide content until rects are ready to prevent flash
            opacity: isLoading && rects.length === 0 ? 0 : 1,
            ...style,
          } as CSSProperties
        }
        {...{ [ATTR_SKELETON_ACTIVE]: isLoading }}
        aria-busy={isLoading}
        {...restProps}
      >
        {children}

        {isLoading && (
          <div
            {...{ [ATTR_SKELETON_OVERLAY]: true }}
            aria-hidden="true"
            data-slot="skeleton-overlay"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "auto",
              userSelect: "none",
            }}
          >
            {rects.map((rect: AdaptiveSkeletonRect) =>
              cloneElement(skeletonTemplate, {
                key: rect.id,
                ...skeletonTemplate?.props,
                style: {
                  ...skeletonTemplate?.props?.style,
                  position: "absolute",
                  top: rect?.top,
                  left: rect?.left,
                  width: rect?.width,
                  height: rect?.height,
                  // Only override border radius if scanner explicitly provides it
                  ...(rect?.borderRadius !== undefined && {
                    borderRadius: rect.borderRadius,
                  }),
                  ...(rect?.borderTopLeftRadius !== undefined && {
                    borderTopLeftRadius: rect.borderTopLeftRadius,
                  }),
                  ...(rect?.borderTopRightRadius !== undefined && {
                    borderTopRightRadius: rect.borderTopRightRadius,
                  }),
                  ...(rect?.borderBottomRightRadius !== undefined && {
                    borderBottomRightRadius: rect.borderBottomRightRadius,
                  }),
                  ...(rect?.borderBottomLeftRadius !== undefined && {
                    borderBottomLeftRadius: rect.borderBottomLeftRadius,
                  }),
                  // @ts-ignore
                  cornerShape: rect?.cornerShape,
                  // @ts-ignore
                  WebkitCornerShape: rect?.cornerShape,
                },
              }),
            )}
          </div>
        )}
      </Component>
    );
  };

  const AdaptiveSkeleton = forwardRef(
    InternalAdaptiveSkeleton as unknown as React.ForwardRefRenderFunction<
      HTMLElement,
      Omit<AdaptiveSkeletonProps<React.ElementType>, "ref">
    >,
  );

  AdaptiveSkeleton.displayName = "AdaptiveSkeleton";

  return AdaptiveSkeleton as <T extends React.ElementType = "div">(
    props: AdaptiveSkeletonProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
  ) => React.ReactElement | null;
};
