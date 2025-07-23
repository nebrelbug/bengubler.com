import { getColorByIndex } from "./colors";

const getFeaturedProjectsData = (t: (content: string) => string) => [
  {
    id: "1",
    title: "Eta",
    description: t("A super-fast embedded JS template engine that supports Deno."),
    tech: ["JavaScript", "TypeScript", "Template Engine"],
    links: {
      demo: "https://eta.js.org",
      github: "https://github.com/eta-dev/eta",
    },
    image: "eta.png",
  },
  {
    id: "2",
    title: "Decline App",
    description: t("A website for practicing Czech, Slovak, and Russian noun declensions."),
    tech: ["Next.js", "React", "TypeScript"],
    links: {
      demo: "https://decline.vercel.app/",
      github: "https://github.com/bgub/declension-practice",
    },
    image: "decline.png",
  },
  {
    id: "3",
    title: "GOM",
    description: t("Pip package with CLI tool to monitor GPU usage across Docker containers. A minimalistic alternative to 'nvidia-smi'."),
    tech: ["Python", "Docker", "CLI"],
    links: {
      demo: "https://pypi.org/project/gom/",
      github: "https://github.com/bgub/gom",
    },
    image: "gom.png",
  },
];

export const getFeaturedProjects = (t: (content: string) => string) => {
  const featuredProjectsData = getFeaturedProjectsData(t);
  return featuredProjectsData.map((project, index) => {
    const colors = getColorByIndex(index);
    return {
      ...project,
      borderColor: colors.border,
    };
  });
};
