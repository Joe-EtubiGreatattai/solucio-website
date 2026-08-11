const waNumbers = [
  "0000", "0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008",
  "0009", "0010", "0011", "0012", "0013", "0014", "0015", "0016", "0017",
  "0018", "0019", "0020", "0021", "0022", "0024", "0025", "0026",
  "0027", "0028", "0029", "0030", "0031", "0032", "0034",
];

const soNumbers = ["1", "2", "3", "4", "5", "6", "7"];

const altVariants = [
  "Solucio Clinic private room",
  "Solucio Clinic ward",
  "Solucio Clinic reception area",
  "Solucio Clinic facility interior",
  "Solucio Clinic consultation room",
  "Solucio Clinic hallway",
];

export const galleryImages: { src: string; alt: string }[] = [
  ...waNumbers.map((n, i) => ({
    src: `/images/gallery/IMG-20251206-WA${n}.jpg`,
    alt: altVariants[i % altVariants.length],
  })),
  ...soNumbers.map((n, i) => ({
    src: `/images/gallery/so${n}.jpg`,
    alt: altVariants[(waNumbers.length + i) % altVariants.length],
  })),
];
