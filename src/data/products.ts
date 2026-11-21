import type { Product } from "@/types/product";

export const flexPulseG2: Product = {
  id: "flexpulse-g2",
  name: "FlexPulse G2",
  slug: "flexpulse-g2",
  price: 999,
  currency: "USD",
  description:
    "Portable PEMF therapy device with 10 programs, up to 200 gauss, and a rechargeable battery. Designed and manufactured in Germany.",
  images: [
    "/assets/share-image.webp",
    "/assets/flexpulse-front.webp",
    "/assets/group-228.webp",
    "/assets/woman-back-coil-kitchen.webp",
  ],
  packageContents: [
    "Control unit",
    "2 applicators",
    "1 wireless charge pad",
    "1 belt clip case",
    "1 magnetic field detector",
    "1 travel case",
    "1 blue lanyard",
    "1 PEMF compression wrap",
    "1 user manual",
    "Program descriptions",
    "1 quick start guide",
  ],
  details: [
    { label: "Weight", value: "2 lbs (0.6 lbs control unit)" },
    { label: "Dimensions", value: "13 × 9 × 4 in (control unit 4.5” × 2.5” × 1”)" },
    { label: "Waveform", value: "Trapezoidal" },
    { label: "Frequency Range", value: "3 – 1,000 Hz" },
    { label: "Maximum Intensity", value: "200 gauss" },
    { label: "Number of Programs", value: "10" },
    { label: "Program Duration", value: "10-60 minutes or continuous" },
    { label: "Power", value: "Internal rechargeable battery (up to 12 hr)" },
    { label: "Coil applicator", value: "2” × 2.5”" },
    { label: "Warranty", value: "2 years on control unit, 6 months on charger and accessories" },
    { label: "Return Period", value: "30 days" },
    { label: "Restocking Fee", value: "20% of purchase price" },
  ],
};

export const flexPulseCoil: Product = {
  id: "flexpulse-coil",
  name: "FlexPulse Coil",
  slug: "flexpulse-coil",
  price: 40,
  currency: "USD",
  description:
    "One replacement coil to be used with the FlexPulse device. 6-month manufacturer warranty.",
  images: [
    "/assets/group-228.webp",
    "/assets/man-knee-coil.webp",
    "/assets/woman-back-coil-kitchen.webp",
  ],
  packageContents: ["1 coil applicator with lead"],
  details: [
    { label: "Weight", value: "0.125 lbs" },
    { label: "Dimensions", value: "9 × 6 × 0.5 in" },
    { label: "Warranty", value: "6 months" },
  ],
};

export const flexPulseCharger: Product = {
  id: "flexpulse-charger",
  name: "FlexPulse G2 Wireless Charger",
  slug: "flexpulse-charger",
  price: 40,
  currency: "USD",
  description:
    "Wireless charging disc for the FlexPulse G2. Indicator pulses blue while charging and turns solid when fully charged.",
  images: [
    "/assets/flexpulse-front.webp",
  ],
  packageContents: ["Charging disc", "USB cable", "Wall power adapter"],
  details: [{ label: "Warranty", value: "6 months" }],
};

export const products = [flexPulseG2, flexPulseCoil, flexPulseCharger];
