import { SkipLink } from "@/components/ui/skip-link";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main
        id="main-content"
        className="flex min-h-0 flex-1 flex-col outline-none"
        tabIndex={-1}
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
