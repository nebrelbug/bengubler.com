"use client";

import { TOCNode } from "@/components/mdx/remark-toc";
import { TOCLink } from "@/components/mdx/toc-link";
import { T } from "gt-next";
import { useEffect, useState } from "react";

interface ClientTOCProps {
  tree: TOCNode;
}

export function ClientTOC({ tree }: ClientTOCProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    // Observe all headings with IDs
    const headings = document.querySelectorAll(
      "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"
    );
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (!tree.children.length) {
    return null;
  }

  return (
    <div className="space-y-2">
      <T>
        <h3 className="font-semibold text-sm text-foreground">
          Table of Contents
        </h3>
      </T>
      <ul className="space-y-1">
        {tree.children.map((node) => (
          <li key={node.id}>
            <TOCLink node={node} activeSection={activeSection} />
            {node.children.length > 0 && (
              <ul className="ml-4 space-y-1">
                {node.children.map((childNode) => (
                  <li key={childNode.id}>
                    <TOCLink node={childNode} activeSection={activeSection} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
