import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";

import { getPosts, PostOverview } from "@/lib/get-posts";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";

export default function Posts() {
  const allPosts = getPosts();

  return (
    <>
      <h1 className="text-4xl lg:text-5xl font-bold py-8">Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 mb-8">
        {allPosts.map((post, i) => (
          <Post key={post.url} i={i} post={post} />
        ))}
      </div>
    </>
  );
}

export function getTransitionName(slug: string, prefix: string) {
  return prefix + slug.replace(/[^\w\s\-\/]/gi, "").replace(/[\s\/]/g, "-");
}

const randomColors = [
  "from-red-200 to-purple-200 dark:from-red-800 dark:to-purple-800",
  "from-green-200 to-yellow-200 dark:from-green-800 dark:to-yellow-800",
  "from-blue-200 to-green-200 dark:from-blue-800 dark:to-green-800",
  "from-yellow-200 to-red-200 dark:from-yellow-800 dark:to-red-800",
  "from-pink-200 to-blue-200 dark:from-pink-800 dark:to-blue-800",
];

function Post({ post, i }: { post: PostOverview; i: number }) {
  return (
    <Link href={post.url}>
      <Card className="flex flex-col hover:shadow-lg h-full border-2 border-black dark:border-gray-500">
        <AspectRatio ratio={3 / 2}>
          <CardHeader
            className={cn(
              "h-full items-center justify-center p-6",
              "border-b border-black bg-gradient-to-br dark:bg-opacity-50 rounded-t-xl rounded-b-none",
              "dark:border-gray-500",
              randomColors[i % randomColors.length]
            )}
          >
            <div className="flex flex-col justify-between h-full w-full">
              <p className="text-xl xs:text-2xl md:text-xl xl:text-2xl font-bold">
                <span
                  style={{
                    viewTransitionName: getTransitionName(
                      post.url,
                      "post-title-"
                    ),
                  }}
                >
                  {post.title}
                </span>
                {!post.url.startsWith("/posts/") && (
                  <span>
                    <ExternalLinkIcon className="inline-block size-4 xs:size-5 md:size-4 xl:size-5 ml-1" />
                  </span>
                )}
              </p>
              <p className="text-lg text-muted-foreground">
                <span>{post.date}</span>
              </p>
            </div>
          </CardHeader>
        </AspectRatio>

        <CardContent className="p-4 h-full">
          <p className="text-sm text-primary">
            <span
              style={{
                viewTransitionName: getTransitionName(
                  post.url,
                  "post-description-"
                ),
              }}
            >
              {post.description}
            </span>
          </p>
        </CardContent>
        <CardFooter className="px-4">tags</CardFooter>
      </Card>
    </Link>
  );
}
