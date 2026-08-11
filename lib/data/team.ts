export type TeamMember = {
  name: string;
  title: string;
  description: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Dr. (Mrs.) Abimbola Odi",
    title: "Chief Medical Director",
    description:
      "Oversees all medical departments with a focus on clinical excellence and patient safety.",
    image: "/images/team/ceo1.jpg",
  },
  {
    name: "Dr. Temitope Odi",
    title: "Managing Director",
    description:
      "Provides strategic direction and ensures alignment with Solucio Clinic's mission.",
    image: "/images/team/chief1.jpg",
  },
  {
    name: "Mrs. Babagbemi",
    title: "Accounting Officer",
    description: "Manages budgets, reporting, and financial compliance for Solucio Clinic.",
    image: "/images/team/babagbemi.jpg",
  },
  {
    name: "Mrs. Benjamin",
    title: "HMO Desk Officer",
    description: "Coordinates insurance and patient care authorizations.",
    image: "/images/team/benjamin.jpg",
  },
  {
    name: "Mrs. Joseph",
    title: "Client Officer",
    description: "Ensures personalized and professional patient interaction.",
    image: "/images/team/joseph.jpg",
  },
  {
    name: "Miss Helen",
    title: "Nursing Officer",
    description: "Provides compassionate bedside care for patients.",
    image: "/images/team/helen.jpg",
  },
];
