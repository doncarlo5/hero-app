import { APP_STORE_URL } from "@/links";

export function AppStoreButton() {
  return (
    <a
      href={APP_STORE_URL}
      className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-6 py-3 text-white shadow-sm transition-colors hover:bg-gray-700"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-current"
      >
        <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.48ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.56-1.23Z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-xs opacity-80">Download on the</span>
        <span className="block text-lg font-semibold">App Store</span>
      </span>
    </a>
  );
}
