export type Project = {
  slug: string;
  name: string;
  industry: string;
  category: string;
  sourceLabel: "Client Project" | "ZoloLabs Demo";
  caseStudyPath?: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: readonly string[];
  capabilities: readonly { title: string; description: string }[];
  liveUrl?: string;
  image?: { src: string; alt: string };
};

export const teaCareProject: Project = {
  slug: "teacare",
  name: "TeaCare Services",
  industry: "Corporate Catering & Event Management",
  category: "Business Platform",
  sourceLabel: "Client Project",
  caseStudyPath: "/work/teacare",
  description:
    "A digital customer experience and appointment platform created for TeaCare Services, helping customers explore services, understand the company and connect with the business through a streamlined digital experience.",
  challenge:
    "Give customers a clear way to discover catering and event services, make inquiries, and arrange appointments.",
  solution:
    "A connected digital experience that brings service discovery, customer inquiries and appointment workflows together.",
  technologies: [
    "Next.js",
    "Node.js",
    "REST API",
    "Email automation",
    "Cloud deployment",
  ],
  capabilities: [
    {
      title: "Service discovery",
      description:
        "An accessible introduction to corporate catering and event management services, with clear paths to the next step.",
    },
    {
      title: "Customer inquiries",
      description:
        "A focused inquiry experience that helps customers communicate their requirements and start a conversation.",
    },
    {
      title: "Appointment workflows",
      description:
        "Connected appointment and communication workflows that support the journey from initial interest to a discussion.",
    },
  ],
  liveUrl: "https://teacareservices.com",
  image: {
    src: "/projects/teacare/website-preview.webp",
    alt: "TeaCare Services corporate catering and event management website",
  },
};

export const bloodlineProject: Project = {
  slug: "bloodline-studio",
  name: "Bloodline Studio",
  industry: "Creative Studio",
  category: "Creative Digital Experience",
  sourceLabel: "ZoloLabs Demo",
  description:
    "A ZoloLabs demo exploring an expressive digital presence for a creative studio.",
  challenge:
    "Explore a distinctive digital direction for a creative studio concept.",
  solution:
    "A responsive website concept centered on expressive art direction and clear studio storytelling.",
  technologies: [],
  capabilities: [],
  liveUrl: "https://bloodline-studio-website.vercel.app",
};

/** Add verified projects here; cards and the work index share this source. */
export const projects: readonly Project[] = [teaCareProject, bloodlineProject];
