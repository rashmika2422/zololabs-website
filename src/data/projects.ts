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
  demoNote?: string;
  image?: { src: string; alt: string; aspectRatio?: string };
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

export const ceylonGemsProject: Project = {
  slug: "ceylon-heritage-gems",
  name: "Ceylon Heritage Gems",
  industry: "Gemstone Boutique Concept",
  category: "Luxury E-Commerce Experience",
  sourceLabel: "ZoloLabs Demo",
  description:
    "A luxury e-commerce concept created for a Ceylon gemstone boutique, combining premium product presentation, collection discovery, interactive product details and heritage-driven storytelling.",
  challenge:
    "Explore how a digital boutique can bring clarity, character and a premium browsing experience to high-value products.",
  solution:
    "An experimental storefront combining refined imagery, collection browsing, product-detail and modal interactions, heritage storytelling and responsive frontend motion.",
  technologies: [],
  capabilities: [
    { title: "Collection discovery", description: "Browse a concept gemstone collection with premium product presentation." },
    { title: "Product interactions", description: "Explore product details, modal interactions and certification-style demo information." },
    { title: "Heritage storytelling", description: "Refined typography, imagery and scroll-triggered motion create a distinctive boutique experience." },
  ],
  demoNote:
    "Concept only. No real gemstones are sold; prices, testimonials, certificates and business details are illustrative.",
  liveUrl: "https://ceylongemsdemo.netlify.app",
  image: {
    src: "/projects/ceylongemsdemo/ceylongems.png",
    alt: "Ceylon Heritage Gems demo website, a luxury gemstone boutique concept",
    aspectRatio: "2880 / 1628",
  },
};

export const bloodlineProject: Project = {
  slug: "bloodline-studio",
  name: "Bloodline Studio",
  industry: "Creative Studio",
  category: "Creative Digital Experience",
  sourceLabel: "ZoloLabs Demo",
  description:
    "An immersive recording-studio website concept exploring cinematic imagery, typography, motion, interactive scrolling and modern service presentation.",
  challenge:
    "Explore a distinctive digital direction for a creative studio concept.",
  solution:
    "A responsive website concept centered on expressive art direction and clear studio storytelling.",
  technologies: [],
  capabilities: [],
  liveUrl: "https://bloodline-studio-website.vercel.app",
};

/** Keep client work and explicitly labelled studio concepts in editorial order. */
export const projects: readonly Project[] = [teaCareProject, ceylonGemsProject, bloodlineProject];
