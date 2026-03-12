import { describe, expect, it, mock } from "bun:test";
import { act, render } from "@testing-library/react";
import { createAdaptiveSkeleton } from "./adaptive-skeleton-factory";

// Mocking utils dependencies
mock.module("./utils", () => ({
  scanDOM: () => [{ id: "1", top: 10, left: 10, width: 100, height: 20 }],
}));

describe("createAdaptiveSkeleton", () => {
  const SkeletonTemplate = (
    <div data-testid="skeleton-rect" style={{ background: "gray" }} />
  );
  const AdaptiveSkeleton = createAdaptiveSkeleton(SkeletonTemplate);

  it("should render children when not loading", async () => {
    let queries: any;
    await act(async () => {
      queries = render(
        <AdaptiveSkeleton isLoading={false}>
          <div data-testid="content">Hello World</div>
        </AdaptiveSkeleton>,
      );
    });

    const { getByTestId, queryByTestId } = queries;
    expect(getByTestId("content")).toBeTruthy();
    expect(queryByTestId("skeleton-rect")).toBeNull();
  });

  it("should render skeleton rects when loading", async () => {
    let queries: any;
    await act(async () => {
      queries = render(
        <AdaptiveSkeleton isLoading={true}>
          <div data-testid="content">Hello World</div>
        </AdaptiveSkeleton>,
      );
    });

    const { getByTestId, getAllByTestId } = queries;
    expect(getByTestId("content")).toBeTruthy();
    expect(getAllByTestId("skeleton-rect")).toBeTruthy();

    // Verify aria-busy on the container
    const container = queries.container.firstChild as HTMLElement;
    expect(container.getAttribute("aria-busy")).toBe("true");

    // Verify aria-hidden on the overlay
    const overlay = queries.container.querySelector("[data-skeleton-overlay]");
    expect(overlay?.getAttribute("aria-hidden")).toBe("true");
  });
});
