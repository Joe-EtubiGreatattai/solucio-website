export type Facility = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const facilities: Facility[] = [
  {
    slug: "emergency-ward",
    name: "Emergency Ward",
    description: "Two-bedded semi-private emergency facility.",
    image: "/images/gallery/IMG-20251206-WA0005.jpg",
  },
  {
    slug: "male-ward",
    name: "Male Ward",
    description: "Comfortable semi-private ward for male patients.",
    image: "/images/gallery/IMG-20251206-WA0007.jpg",
  },
  {
    slug: "female-ward",
    name: "Female Ward",
    description: "Dedicated semi-private ward for female patients.",
    image: "/images/gallery/IMG-20251206-WA0009.jpg",
  },
  {
    slug: "private-rooms",
    name: "Private Rooms",
    description: "3 single-bedded rooms with full utility services.",
    image: "/images/gallery/IMG-20251206-WA0000.jpg",
  },
  {
    slug: "vip-suite",
    name: "VIP Suite",
    description: "2 rooms, kitchenette and sit-out balcony.",
    image: "/images/gallery/IMG-20251206-WA0011.jpg",
  },
  {
    slug: "operating-theatres",
    name: "Operating Theatres",
    description: "Twin modern theatre suites.",
    image: "/images/gallery/IMG-20251206-WA0013.jpg",
  },
  {
    slug: "laboratory",
    name: "Laboratory",
    description: "Fully equipped diagnostic laboratory.",
    image: "/images/gallery/IMG-20251206-WA0016.jpg",
  },
  {
    slug: "reception-areas",
    name: "Reception Areas",
    description: "General & private reception lounges.",
    image: "/images/gallery/IMG-20251206-WA0018.jpg",
  },
  {
    slug: "guest-house",
    name: "Guest House",
    description: "Comfortable lodging for relatives.",
    image: "/images/gallery/IMG-20251206-WA0020.jpg",
  },
  {
    slug: "elevator-facility",
    name: "Elevator Facility",
    description: "Easy mobility with lift access.",
    image: "/images/gallery/IMG-20251206-WA0022.jpg",
  },
];
