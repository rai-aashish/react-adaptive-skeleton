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
import {
  type RenderProp,
  mergeRefs,
  useRender,
  useSkeletonScanner,
} from "./hooks/index";
import type { AdaptiveSkeletonOptions, AdaptiveSkeletonRect } from "./utils";

export type AdaptiveSkeletonProps = {
  isLoading: boolean;
  /**
   * Controls the container element. Mirrors the base-ui `render` prop pattern:
   *
   * - Element form: `render={<section className="card" />}` — props are merged in
   * - Function form: `render={(props) => <section {...props} />}` — full control
   * - Omitted: renders a `<div>` (default)
   */
  render?: RenderProp<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Extra styles merged into every rendered skeleton rectangle (on top of the template's styles). */
  skeletonStyle?: CSSProperties;
  /** Extra class name(s) added to every rendered skeleton rectangle. */
  skeletonClassName?: string;
};

export const createAdaptiveSkeleton = <P extends {}>(
  skeletonTemplate: ReactElement<
    P & { className?: string; style?: CSSProperties }
  >,
  options?: AdaptiveSkeletonOptions,
) => {
  const {
    style: defaultStyle,
    className: defaultClassName,
    ...restDefaultProps
  } = options?.defaultProps ?? {};

  const overlayOption = options?.overlay;

  const mergeClassNames =
    options?.classNameMerger ??
    ((...classes: string[]) => classes.filter(Boolean).join(" "));

  const InternalAdaptiveSkeleton = (
    {
      isLoading,
      children,
      style,
      className,
      render,
      skeletonStyle,
      skeletonClassName,
    }: AdaptiveSkeletonProps,
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

    return useRender(render, "div", {
      ...restDefaultProps,
      ref: containerRef,
      className: className ?? defaultClassName,
      style: {
        ...defaultStyle,
        position: "relative",
        // Hide content until rects are ready to prevent flash
        opacity: isLoading && rects.length === 0 ? 0 : 1,
        ...style,
      } as CSSProperties,
      [ATTR_SKELETON_ACTIVE]: isLoading,
      "aria-busy": isLoading,
      inert: isLoading,
      children: (
        <>
          {children}

          {isLoading && (
            <div
              {...{ [ATTR_SKELETON_OVERLAY]: true }}
              aria-hidden="true"
              inert={true}
              data-slot="skeleton-overlay"
              className={overlayOption?.className}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                pointerEvents: "auto",
                userSelect: "none",
                // Clip animated children (e.g. shimmer) at the overlay boundary
                ...(overlayOption?.children ? { overflow: "hidden" } : undefined),
                ...overlayOption?.style,
              }}
            >
              {rects.map((rect: AdaptiveSkeletonRect) =>
                cloneElement(skeletonTemplate, {
                  key: rect.id,
                  ...skeletonTemplate?.props,
                  className: skeletonClassName
                    ? mergeClassNames(
                        skeletonTemplate?.props?.className ?? "",
                        skeletonClassName,
                      )
                    : skeletonTemplate?.props?.className,
                  style: {
                    ...skeletonTemplate?.props?.style,
                    ...skeletonStyle,
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
              {overlayOption?.children}
            </div>
          )}
        </>
      ),
    } as Record<string, unknown>) as ReactElement;
  };

  const AdaptiveSkeleton = forwardRef(
    InternalAdaptiveSkeleton as unknown as React.ForwardRefRenderFunction<
      HTMLElement,
      Omit<AdaptiveSkeletonProps, "ref">
    >,
  );

  AdaptiveSkeleton.displayName = "AdaptiveSkeleton";

  return AdaptiveSkeleton;
};
