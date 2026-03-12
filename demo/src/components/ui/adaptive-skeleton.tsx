import { createAdaptiveSkeleton } from "react-adaptive-skeleton";

export const AdaptiveSkeleton = createAdaptiveSkeleton(
  <div className="dark:bg-zinc-800 bg-zinc-200 animate-pulse rounded-md" />,
  {
    skipSelectors: [".no-skeleton"],
    targetSelectors: [".skeleton"],
  },
);
