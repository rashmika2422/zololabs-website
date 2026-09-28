import { SolutionsFooter } from "@/components/solutions/SolutionsFooter";
import { SolutionsNav } from "@/components/solutions/SolutionsNav";

/**
 * Scopes navigation to the /solutions segment only. The homepage renders its
 * own Navbar in src/app/page.tsx and is deliberately left untouched.
 */
export default function SolutionsLayout({
  children,
}: LayoutProps<"/solutions">) {
  return (
    <div className="flex min-h-full flex-col bg-[#050814] text-white">
      <SolutionsNav />
      {/* flex column keeps not-found.tsx able to center itself vertically */}
      <div className="flex flex-1 flex-col">{children}</div>
      <SolutionsFooter />
    </div>
  );
}
