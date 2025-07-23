import { Comments } from "@/components/comments";
import { FloatingELI5 } from "@/components/floating-eli5";
import { mdxComponents } from "@/components/mdx-components";
import { TOCNode } from "@/components/mdx/remark-toc";
import { RawMarkdown } from "@/components/raw-markdown";
import { Social } from "@/components/social";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { getPostColors } from "@/lib/colors";
import { MDXContent } from "@content-collections/mdx/react";
import { allPosts } from "content-collections";
import { T } from "gt-next";
import { getGT } from "gt-next/server";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";

import { ClientTOC } from "./client-toc";

// Generate static params for all posts
export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    const t = await getGT();
    return {
      title: t("Post Not Found"),
    };
  }

  // Clean URL construction using URLSearchParams
  const ogParams = new URLSearchParams({
    title: post.title,
    description: post.description,
    type: "post",
  });
  const ogImageUrl = `/og?${ogParams.toString()}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Ben Gubler", url: "https://bengubler.com" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date.toISOString(),
      modifiedTime: post.lastUpdated?.toISOString() || post.date.toISOString(),
      authors: ["Ben Gubler"],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@bgub_",
      images: [ogImageUrl],
    },
  };
}

// View transition style function (same as old website)
function getTransitionStyle(slug: string, prefix: string = "") {
  const transitionName =
    prefix + slug.replace(/[^\w\s\-\/]/gi, "").replace(/[\s\/]/g, "-");
  return {
    viewTransitionName: transitionName,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const colors = getPostColors(post.slug);
  const toc: TOCNode = JSON.parse(post.toc);
  const hasTOC = toc.children.length > 0;

  // Format date to match post cards
  const formattedDate = post.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <nav className="text-sm text-muted-foreground">
          <Link
            href="/posts"
            className="hover:text-foreground transition-colors"
          >
            <T>Posts</T>
          </Link>
          <T><span className="mx-2">›</span></T>
          <span>{post.title}</span>
        </nav>

        {/* Styled Post Header */}
        <div
          className={`${colors.bg} ${colors.border} border rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg`}
          style={getTransitionStyle(post.url, "post-card-")}
        >
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <time
                dateTime={post.date.toISOString()}
                style={getTransitionStyle(post.url, "date-")}
              >
                {formattedDate}
              </time>
              <span>•</span>
              <span style={getTransitionStyle(post.url, "reading-time-")}>
                {(post as any).readingTime || "5 min read"}
              </span>
              {post.lastUpdated && (
                <>
                  <span>•</span>
                  <span>
                    <T>Updated</T>{" "}
                    {post.lastUpdated.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight group-hover:text-foreground/90 transition-colors break-words"
              style={getTransitionStyle(post.url, "title-")}
            >
              {post.title}
              {post.archived && (
                <T><span className="text-muted-foreground"> (archived)</span></T>
              )}
            </h1>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <p
              className="text-lg leading-relaxed text-muted-foreground max-w-3xl break-words"
              style={getTransitionStyle(post.url, "description-")}
            >
              {post.description}
            </p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs px-2 py-0.5 bg-background/60 hover:bg-background/80 transition-colors"
                    style={getTransitionStyle(`${post.url}-${tag}`, `tag-`)}
                  >
                    #{tag.toLowerCase()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile TOC and Raw Markdown - Show before content on mobile */}
      <div className="lg:hidden space-y-4">
        {hasTOC && (
          <div className="bg-card border rounded-lg p-4">
            <ClientTOC tree={toc} />
          </div>
        )}
        <div className="bg-card border rounded-lg p-4">
          <RawMarkdown slug={post.slug} content={post.content} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[1fr_250px] gap-8">
        <main className="min-w-0">
          <Typography className="text-lg">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </Typography>

          {/* Mobile Social - Show after content on mobile */}
          <div className="lg:hidden mt-8">
            <div className="bg-card border rounded-lg p-4">
              <Social title={post.title} />
            </div>
          </div>

          {/* Comments */}
          <div className="mt-12 pt-8 border-t">
            <Comments />
          </div>
        </main>

        {/* Desktop TOC, Social, and Raw Markdown - Show on desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {hasTOC && (
              <div className="bg-card border rounded-lg p-4">
                <ClientTOC tree={toc} />
              </div>
            )}
            <div className="bg-card border rounded-lg p-4">
              <Social title={post.title} />
            </div>
            <div className="bg-card border rounded-lg p-4">
              <RawMarkdown slug={post.slug} content={post.content} />
            </div>
          </div>
        </aside>
      </div>

      {/* Floating ELI5 Button */}
      <FloatingELI5 content={post.content} title={post.title} />
    </div>
  );
}
