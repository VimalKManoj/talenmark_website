import culturalCentre from "@/assets/images/cultural-centre.jpg";
import culturalCentreRed from "@/assets/images/cultural-centre-red.jpg";
import chilgroveAerial from "@/assets/images/chilgrove-aerial.jpg";
import chilgroveVilla from "@/assets/images/chilgrove-villa.jpg";

export const images = {
  culturalCentre,
  culturalCentreRed,
  chilgroveAerial,
  chilgroveVilla,
};

/**
 * The red Cultural Centre render has a dark graphic panel baked into its
 * right side; this crop keeps portrait frames on the clean architecture.
 */
export const redCrop = {
  objectPosition: "0% 40%",
  transform: "scale(1.32)",
  transformOrigin: "0% 40%",
} as const;

export type Vertical = {
  slug: "real-estate" | "hospitality";
  href: string;
  index: string;
  word: string;
  name: string;
  short: string;
  tagline: string;
  blurb: string;
  image: typeof culturalCentre;
  imageAlt: string;
  align: "left" | "right";
};

export const verticals: Vertical[] = [
  {
    slug: "real-estate",
    href: "/real-estate",
    index: "01",
    word: "Structure",
    name: "Real Estate, Construction & Township Development",
    short: "Real Estate & Construction",
    tagline: "Spaces that endure.",
    blurb:
      "Residences, commercial hubs and landmark developments — contemporary design that respects traditional architecture.",
    image: culturalCentre,
    imageAlt: "Talenmark's Cultural Centre at Markaz Knowledge City, Calicut",
    align: "left",
  },
  {
    slug: "hospitality",
    href: "/hospitality",
    index: "02",
    word: "Sanctuary",
    name: "Hospitality",
    short: "Hospitality",
    tagline: "Places that restore.",
    blurb:
      "Premium resorts, luxury hotels and wellness retreats that blend seamlessly with nature — beginning 2,600 ft up in Wayanad.",
    image: chilgroveAerial,
    imageAlt: "Aerial view of Talenmark Chilgrove resort villas in Vythiri, Wayanad",
    align: "right",
  },
];

export const contact = {
  company: "Talenmark Developers Pvt. Ltd.",
  address: ["TalenHouse, Civil Station Road", "Kottooli, Kozhikode – 673 016", "Kerala, India"],
  phone: "+91 8606 00 11 00",
  phoneHref: "tel:+918606001100",
  email: "info@talenmark.com",
};

export const awards = [
  { year: "2019", title: "Best Brand", by: "The Economic Times" },
  { year: "2019", title: "Innovative Project of the Year", by: "Industry recognition" },
  { year: "Malabar", title: "Top 20 Trendsetters", by: "The Indian Express" },
  { year: "K-RERA", title: "RERA compliant developer", by: "Kerala Real Estate Regulatory Authority" },
];

export const values = ["Trust", "Truthfulness", "Integrity", "Innovation"];

export const pageLabels: Record<string, string> = {
  "/": "Talenmark",
  "/real-estate": "Structure",
  "/hospitality": "Sanctuary",
};
