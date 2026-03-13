export const userCardCode = `
const USER_DATA_TEMPLATE = {
    name: "Jane Doe",
    role: "Senior Product Designer",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
    avatar: "https://i.pravatar.cc/150?u=jane",
  };

function UserCardExample({ isLoading }: { isLoading: boolean }) {
  const user = isLoading ? USER_DATA_TEMPLATE: {
    name: "Marry Jane",
    role: "Senior Product Designer",
    bio: "Passionate about creating intuitive and accessible user experiences that delight customers and drive business value.",
    avatar: "https://i.pravatar.cc/150?u=jane",
  };

  return (
    <AdaptiveSkeleton isLoading={isLoading}>
      <div className="flex flex-col sm:flex-row gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm max-w-md w-full">
        <div
          className="size-24 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 mx-auto sm:mx-0 overflow-hidden"
          // Force this div to become a skeleton block
          data-skeleton
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-foreground">{user.name}</h3>

          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {user.role}
          </p>

          <div>
            {/*  data-no-skeleton-text does not skeletonize text nodes */}
            <div data-no-skeleton-text className="flex gap-1 items-center">
              <span className="text-sm">Bio</span>
              <Star className="size-4" />
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {user.bio}
            </p>
          </div>
        </div>
      </div>
    </AdaptiveSkeleton>
  );
}
`;

export const gridCode = `import { AdaptiveSkeleton } from "@/components/ui/adaptive-skeleton";

export function ProductGridExample({ isLoading }: { isLoading: boolean }) {
  // Use a fallback array of matching length for consistent skeleton generation
  const items = isLoading
    ? [
        { id: 1, title: "Wireless Bluetooth Headphones", price: "$129.99" },
        { id: 2, title: "Mechanical RGB Keyboard", price: "$149.50" },
        { id: 3, title: "Ergonomic Office Mouse", price: "$79.00" },
        { id: 4, title: "4K Ultra HD Monitor", price: "$349.00" },
        { id: 5, title: "Aluminium Laptop Stand", price: "$45.99" },
        { id: 6, title: "10-in-1 USB-C Hub", price: "$59.90" },
      ]
    : [
        { id: 1, title: "Wireless Headphones", price: "$129.99" },
        { id: 2, title: "Mechanical Keyboard", price: "$149.50" },
        { id: 3, title: "Ergonomic Mouse", price: "$79.00" },
        { id: 4, title: "4K Monitor", price: "$349.00" },
        { id: 5, title: "Laptop Stand", price: "$45.99" },
        { id: 6, title: "USB-C Hub", price: "$59.90" },
      ];

  return (
    // Single observer for the entire grid (Macro performance pattern)
    <AdaptiveSkeleton isLoading={isLoading}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {items.map((item, i) => (
          <div 
            key={item.id || i}
            className="flex flex-col gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900"
          >
            <div 
              className="w-full aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              data-skeleton 
              data-flat-skeleton 
            />
            <div>
              <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
              <p className="text-zinc-500 text-xs mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </AdaptiveSkeleton>
  );
}
`;

export const tableCode = `import { AdaptiveSkeleton } from "@/components/ui/adaptive-skeleton";

export function TableExample({ isLoading }: { isLoading: boolean }) {
  const users = isLoading
    ? [
        { id: 1, name: "Alice M. Smith", status: "Active", role: "Administrator" },
        { id: 2, name: "Robert B. Johnson", status: "Offline", role: "Content Editor" },
        { id: 3, name: "Charles C. Brown", status: "Active", role: "Staff Viewer" },
        { id: 4, name: "Diana D. Prince", status: "Active", role: "Administrator" },
      ]
    : [
        { id: 1, name: "Alice Smith", status: "Active", role: "Admin" },
        { id: 2, name: "Bob Johnson", status: "Offline", role: "Editor" },
        { id: 3, name: "Charlie Brown", status: "Active", role: "Viewer" },
        { id: 4, name: "Diana Prince", status: "Active", role: "Admin" },
      ];

  const getStatusClass = (status: string) => {
    return status === 'Active' 
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400';
  };

  return (
    <div className="w-full overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <tr>
            <th className="p-4 font-medium text-zinc-500">Name</th>
            <th className="p-4 font-medium text-zinc-500">Status</th>
            <th className="p-4 font-medium text-zinc-500">Role</th>
          </tr>
        </thead>
        
        {/* Polymorphic container — render prop keeps valid HTML structure */}
        <AdaptiveSkeleton render={<tbody />} isLoading={isLoading}>
          {users.map((user, i) => (
            <tr key={user.id || i} className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
              <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">
                <span data-skeleton>{user.name}</span>
              </td>
              <td className="p-4">
                <span className={"inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold " + getStatusClass(user.status)}>
                  {user.status}
                </span>
              </td>
              <td className="p-4 text-zinc-500 dark:text-zinc-400">
                <span data-skeleton>{user.role}</span>
              </td>
            </tr>
          ))}
        </AdaptiveSkeleton>
      </table>
    </div>
  );
}
`;

export const shimmerCode = `import { createAdaptiveSkeleton } from "react-adaptive-skeleton";

// Define the keyframe in your global CSS (or a <style> tag):
// @keyframes skeleton-shimmer {
//   0%   { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }

const ShimmerSkeleton = createAdaptiveSkeleton(
  <div className="bg-zinc-200 dark:bg-zinc-800 rounded-md" />,
  {
    overlay: {
      children: (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "200%",
            left: "-50%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
            animation: "skeleton-shimmer 2s ease-in-out infinite",
          }}
        />
      ),
    },
  },
);

function ShimmerExample({ isLoading }: { isLoading: boolean }) {
  const user = isLoading
    ? {
        name: "Jane Doe",
        role: "Senior Product Designer",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        avatar: "https://i.pravatar.cc/150?u=jane",
      }
    : {
        name: "Marry Jane",
        role: "Senior Product Designer",
        bio: "Passionate about creating intuitive and accessible user experiences that delight customers.",
        avatar: "https://i.pravatar.cc/150?u=jane",
      };

  return (
    <ShimmerSkeleton isLoading={isLoading}>
      <div className="flex flex-col sm:flex-row gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm max-w-md w-full">
        <div className="size-24 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 mx-auto sm:mx-0 overflow-hidden" data-skeleton>
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{user.role}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{user.bio}</p>
        </div>
      </div>
    </ShimmerSkeleton>
  );
}
`;

export const scrollCode = `import { AdaptiveSkeleton } from "@/components/ui/adaptive-skeleton";

export function ScrollContainerExample({ isLoading }: { isLoading: boolean }) {
  const items = isLoading
    ? Array(8).fill(null).map((_, i) => ({
        id: i,
        title: "Recent System Notification",
        description: "This is a placeholder description that is long enough to span multiple lines in the notification feed to match the loaded state.",
        time: "10m ago"
      }))
    : Array.from({ length: 8 }, (_, i) => ({ 
        id: i, 
        title: "Notification event " + (i + 1),
        description: "Some long text data to fill up horizontal and vertical space inside this constrained container list view.",
        time: (i * 2 + 1) + "m ago"
      }));

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm overflow-hidden max-w-sm w-full mx-auto">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 font-semibold bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center">
        <span>Updates</span>
        <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">New</span>
      </div>
      
      {/* PERFECT: AdaptiveSkeleton is INSIDE the scroll view wrapper */}
      <div className="h-72 overflow-y-auto p-4 relative bg-zinc-50/30 dark:bg-black/20">
        <AdaptiveSkeleton isLoading={isLoading}>
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={item.id || i} className="flex gap-4 items-start p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 shrink-0" data-skeleton />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2 mb-1">
                    <p className="text-sm font-semibold truncate text-foreground">{item.title}</p>
                    <span className="text-xs text-zinc-400 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AdaptiveSkeleton>
      </div>
    </div>
  );
}
`;
