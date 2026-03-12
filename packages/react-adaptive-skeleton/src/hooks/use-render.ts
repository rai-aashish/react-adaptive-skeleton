import { type ReactElement, type Ref, cloneElement, createElement, isValidElement } from "react";
import { mergeRefs } from "./use-merge-refs";

export type RenderProp<Props> = ReactElement | ((props: Props) => ReactElement);

/**
 * Merges component-generated props with props from a render element.
 *
 * - className: combined
 * - style: component base + render element on top
 * - ref: both refs are called (component ref always applied)
 * - children: component always controls children
 * - event handlers: composed (component handler first, then render element handler)
 * - everything else: render element props take precedence
 */
function mergeProps<Props extends Record<string, unknown>>(
  componentProps: Props,
  renderElementProps: Record<string, unknown>,
): Props {
  const merged: Record<string, unknown> = { ...componentProps, ...renderElementProps };

  // Combine classNames
  merged.className =
    [componentProps.className, renderElementProps.className].filter(Boolean).join(" ") ||
    undefined;

  // Merge styles (component base, render element overrides)
  merged.style = {
    ...(componentProps.style as object | undefined),
    ...(renderElementProps.style as object | undefined),
  };

  // Merge refs — component ref always applies
  if (componentProps.ref != null && renderElementProps.ref != null) {
    merged.ref = mergeRefs(
      componentProps.ref as Ref<unknown>,
      renderElementProps.ref as Ref<unknown>,
    );
  } else {
    merged.ref = componentProps.ref ?? renderElementProps.ref;
  }

  // Component always controls children
  merged.children = componentProps.children;

  // Compose event handlers
  for (const key of Object.keys(renderElementProps)) {
    if (
      key.startsWith("on") &&
      typeof renderElementProps[key] === "function" &&
      typeof componentProps[key] === "function"
    ) {
      const componentHandler = componentProps[key] as (...args: unknown[]) => void;
      const renderHandler = renderElementProps[key] as (...args: unknown[]) => void;
      merged[key] = (...args: unknown[]) => {
        componentHandler(...args);
        renderHandler(...args);
      };
    }
  }

  return merged as Props;
}

/**
 * Resolves a `render` prop into a React element.
 *
 * Mirrors the base-ui render prop pattern:
 * - `render={<section />}` — clones the element, merging component props in
 * - `render={(props) => <section {...props} />}` — calls the function with component props
 * - `render` omitted — creates a `defaultTag` element with component props
 */
export function useRender<Props extends Record<string, unknown>>(
  render: RenderProp<Props> | undefined,
  defaultTag: React.ElementType,
  props: Props,
): ReactElement {
  if (typeof render === "function") {
    return render(props);
  }

  if (isValidElement(render)) {
    return cloneElement(
      render,
      mergeProps(props, render.props as Record<string, unknown>),
    );
  }

  return createElement(defaultTag, props);
}
