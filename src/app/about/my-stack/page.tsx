import { getColorByIndex } from "@/lib/colors";
import type { Metadata } from "next";
import Link from "next/link";
import { T, useGT } from "gt-next";

type StackItem = {
  name: string;
  description: string;
  link?: string;
};

type StackSection = {
  category: string;
  items: StackItem[];
};

export const metadata: Metadata = {
  title: "My Stack - Ben Gubler",
  description:
    "Tools, technologies, and platforms that Ben Gubler uses for productivity, language learning, and development.",
};


export default function MyStackPage() {
  const t = useGT();
  
  // Translate the stack data structure
  const translatedStack: StackSection[] = [
    {
      category: t("Productivity"),
      items: [
        {
          name: t("Todoist"),
          link: "https://todoist.com",
          description: t("I couldn't function effectively without my trusty todo list!"),
        },
        {
          name: t("Notion"),
          link: "https://notion.so",
          description: t("Second brain & knowledge base."),
        },
        {
          name: t("Google Calendar"),
          link: "https://calendar.google.com",
          description: t("Boring, but effective."),
        },
        {
          name: t("Monarch Money"),
          link: "https://monarchmoney.com",
          description: t("I switched from Mint to Monarch and have been enjoying it so far."),
        },
      ],
    },
    {
      category: t("Language Learning"),
      items: [
        {
          name: t("Anki"),
          link: "https://apps.ankiweb.net",
          description: t("A flashcard app that uses spaced repetition. I use it to practice vocab."),
        },
        {
          name: t("Pimsleur"),
          link: "https://pimsleur.com",
          description: t("My favorite way to start learning a language. It's based on listening and repetition, so it's great for improving your accent."),
        },
        {
          name: t("Glossika"),
          link: "https://glossika.com",
          description: t("A great way to practice speaking. It's based on listening and repeating sentences and has lots of language pairings (e.g. Czech to Russian)."),
        },
        {
          name: t("Mango"),
          link: "https://mangolanguages.com",
          description: t("Solid alternative to Duolingo. If you have a public library membership, it may be free for you."),
        },
        {
          name: t("DeepL Translator"),
          link: "https://deepl.com",
          description: t("Like Google Translate, but more natural translations."),
        },
        {
          name: t("Glosbe Dictionary"),
          link: "https://glosbe.com",
          description: t("Dictionary with tons of languages and example sentences sourced from the web."),
        },
      ],
    },
    {
      category: t("Tech — Languages"),
      items: [
        {
          name: t("JavaScript / Node.js"),
          description: t("Fun to program in, but I prefer TypeScript."),
        },
        {
          name: t("TypeScript"),
          description: t("Makes writing JavaScript not scary!"),
        },
        {
          name: t("Python"),
          description: t("Fantastic for AI/ML work."),
        },
        {
          name: t("Rust"),
          description: t("For writing low-level code with a modern build system, great syntax, and no segfaults :)"),
        },
      ],
    },
    {
      category: t("Tech — Libraries"),
      items: [
        {
          name: t("React"),
          link: "https://react.dev",
          description: t("By far my favorite tool for building websites."),
        },
        {
          name: t("Next.js"),
          link: "https://nextjs.org",
          description: t("Solid ecosystem, great performance."),
        },
        {
          name: t("Tailwind"),
          link: "https://tailwindcss.com",
          description: t("Literally so much better than writing CSS by hand in separate files."),
        },
        {
          name: t("shadcn/ui"),
          link: "https://ui.shadcn.com",
          description: t("My go-to for building UI components. Love how they're accessible + customizable!"),
        },
      ],
    },
    {
      category: t("Tech — Platforms"),
      items: [
        {
          name: t("Vercel"),
          link: "https://vercel.com",
          description: t("Fantastic solution for hosting web apps."),
        },
        {
          name: t("GitHub Actions"),
          link: "https://github.com/features/actions",
          description: t("CI/CD built in to GitHub."),
        },
        {
          name: t("Umami Analytics"),
          link: "https://umami.is",
          description: t("Like Google Analytics. I self-host my own instance!"),
        },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <T>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            My Stack
          </h1>
        </T>
      </header>

      {translatedStack.map((section, index) => {
        const colors = getColorByIndex(index);
        return (
          <section key={section.category} className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {section.category}
            </h2>
            <div
              className={`${colors.bg} ${colors.border} border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-lg`}
            >
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {item.link ? (
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:underline"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="font-medium text-foreground">
                        {item.name}
                      </span>
                    )}{" "}
                    — {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
