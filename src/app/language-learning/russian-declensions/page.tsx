import { Comments } from "@/components/comments";
import type { Metadata } from "next";
import Link from "next/link";
import { T, Var } from "gt-next";

export const metadata: Metadata = {
  title: "Russian Case Cards - Ben Gubler",
  description: "I built case cards for Russian so you don't have to.",
};

export default function RussianCaseCardsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <nav className="text-sm text-muted-foreground">
          <Link
            href="/language-learning"
            className="hover:text-foreground transition-colors"
          >
            <T>Language Learning</T>
          </Link>
          <T><span className="mx-2">›</span></T>
          <T><span>Russian Case Cards</span></T>
        </nav>
        <T>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Russian Case Cards
          </h1>
        </T>
        <T><p className="text-lg text-muted-foreground"><Var>{metadata.description}</Var></p></T>
      </header>

      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
        <T>
          <p>
            I spent many hours creating this! Print it out and you'll memorize the
            Russian declension patterns in no time.
          </p>
        </T>

        <T>
          <p>
            You may also be interested in my{" "}
            <Link
              href="https://decline.vercel.app/"
              className="text-foreground hover:underline font-medium"
            >
              website for practicing Czech/Russian declensions
            </Link>{" "}
            or my{" "}
            <Link
              href="/language-learning/czech-declensions"
              className="text-foreground hover:underline font-medium"
            >
              Czech case cards
            </Link>
            .
          </p>
        </T>
      </div>

      <section className="space-y-6">
        <T>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Case Card
          </h2>
        </T>
        <T>
          <p className="text-muted-foreground">
            Note: this won't display properly on mobile: go{" "}
            <Link
              href="/declensions/russian-cases-card.pdf"
              className="text-foreground hover:underline font-medium"
            >
              here
            </Link>{" "}
            to view and download the PDF in a new window.
          </p>
        </T>
        <div className="w-full border border-[hsl(var(--border))] rounded-lg overflow-hidden">
          <embed
            src="/declensions/russian-cases-card.pdf"
            width="100%"
            height="800px"
            type="application/pdf"
            className="w-full"
          />
        </div>
      </section>

      {/* Comments Section */}
      <Comments />
    </div>
  );
}
