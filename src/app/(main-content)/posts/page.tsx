import { getContentOverviews, getTags } from "@/lib/get-content";

import { CardGrid, PostCard } from "@/components/CardGrid";
import { TagButton } from "@/components/TagButton";
import { Button } from "@/components/ui/button";
import { buildSearchParams, modifySearchParams } from "@/lib/utils";
import { RssIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Posts",
  description:
    "Some of my thoughts on programming, language learning, and more.",
};

export default async function Posts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = buildSearchParams(searchParams);

  const activeTags = params.getAll("tag");

  const posts = await getContentOverviews({
    tags: activeTags,
  });

  const tags = await getTags({});

  const archivedPosts = posts.filter((post) => post.archived);
  const nonArchivedPosts = posts.filter((post) => !post.archived);

  return (
    <>
      <h1 className="mt-8">
        {metadata.title}
        <Button size="icon" variant="ghost" className="ml-2" asChild>
          <Link
            href={`/rss.xml?${modifySearchParams(params, {
              type: "posts",
            }).toString()}`}
          >
            <RssIcon className="inline-block" />
          </Link>
        </Button>
      </h1>

      <div className="flex flex-wrap items-start leading-8 gap-4 mb-12">
        {tags.map((tag) => (
          <TagButton key={tag.tag} name={tag.tag} count={tag.count} />
        ))}
      </div>

      <CardGrid>
        {nonArchivedPosts.map((post, i) => (
          <PostCard key={post.url} post={post} i={i} />
        ))}
      </CardGrid>

      {archivedPosts.length > 0 && (
        <>
          <h2>Archived Posts</h2>
          <CardGrid>
            {archivedPosts.map((post, i) => (
              <PostCard key={post.url} post={post} i={i} />
            ))}
          </CardGrid>
        </>
      )}
    </>
  );
}
