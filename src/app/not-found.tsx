import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { T } from "gt-next";
import { getGT } from "gt-next/server";
import type { InlineTranslationOptions } from "gt-next/types";

const getMetadata = (t: (content: string, options?: InlineTranslationOptions) => string): Metadata => ({
  title: `${t("Page Not Found")} - Ben Gubler`,
  description: t("The page you're looking for doesn't exist."),
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getGT();
  return getMetadata(t);
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <T>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Page Not Found
          </h2>
        </T>
        <T>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </T>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button asChild>
          <Link href="/"><T>Go Home</T></Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/posts"><T>View Posts</T></Link>
        </Button>
      </div>
    </div>
  );
}
