export const setupSnippet = `import React from "react";
import { createAdaptiveSkeleton } from "react-adaptive-skeleton";

// 1. Define your skeleton "stamp" - how each unit looks
const Template = () => (
  <div className="bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse w-full h-full" />
);

// 2. Create the reusable component with all available options
export const AdaptiveSkeleton = createAdaptiveSkeleton(<Template />, {
  // Optional: Global selectors to always ignore
  skipSelectors: [".no-sk", "#ignore-me"],
  
  // Optional: Custom selectors to explicitly skeletonize
  targetSelectors: [".skeletonize", "[data-sk]"],
});

// Use it anywhere: <AdaptiveSkeleton isLoading={true}>...</AdaptiveSkeleton>`;

export const exampleSnippet = `// Define safe fallbacks that represent the visual space you need
const dummyUser = { 
  name: "Placeholder Name", 
  role: "Admin" 
};



function UserProfile() {
  const { data, isLoading } = useUserQuery();

  const userData = isLoading ? dummyUser : data;

  return (
    <AdaptiveSkeleton isLoading={isLoading}>
      {/* The component renders this structure off-screen to measure bounds. */}
      <div className="flex gap-4 p-4 border rounded-xl">
      {/* Target this specific div for skeletonizing */}
      <div className="size-12 relative aspect-video" 
          // target this node for skeleton
          data-skeleton 
          // makes skeleton corners flat ignoring templates border radii
          data-flat-skeleton
        >
        <Image src={userData.avatar} fill alt={userData.name} />
      </div>
      
      <div className="flex-1 space-y-2">
        <h3 className="font-bold">{userData.name}</h3>
        
        {/* Skip skeletonizing this metadata */}
        <p className="text-sm text-zinc-500" data-no-skeleton>
          {userData.role}
        </p>
      </div>
    </div>
    </AdaptiveSkeleton>
  );
  
`;

export const tableExampleSnippet = `function UserTable({ users, isLoading }) {
  return (
    <table className="w-full min-w-120 text-left border-collapse">
      <thead>
        <tr>
          <th className="p-2 border-b">Name</th>
          <th className="p-2 border-b">Role</th>
          <th className="p-2 border-b">Address</th>
        </tr>
      </thead>
      {/* Wrap the entire tbody — render prop keeps valid HTML structure */}
      <AdaptiveSkeleton render={<tbody />} isLoading={isLoading}>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-2">
              <span data-skeleton>{user.name}</span>
            </td>
            <td className="p-2 border-b">{user.role}</td>
            <td className="p-2 border-b">{user.address}</td>
          </tr>
        ))}
      </AdaptiveSkeleton>
    </table>
  );
}`;

export const scrollSnippet = `// ❌ WRONG: Skeletons will float over the scroll view
<AdaptiveSkeleton isLoading={true}>
  <div className="h-96 overflow-y-auto">
    {/* scrolling content */}
  </div>
</AdaptiveSkeleton>

// ✅ CORRECT: The overlay will scroll smoothly with the content
<div className="h-96 overflow-y-auto">
  <AdaptiveSkeleton isLoading={true}>
    {/* scrolling content */}
  </AdaptiveSkeleton>
</div>`;
