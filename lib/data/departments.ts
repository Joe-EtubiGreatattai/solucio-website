export type Department = {
  slug: string;
  name: string;
  summary: string;
  services: string[];
};

export const departments: Department[] = [
  {
    slug: "general-surgery",
    name: "General Surgery",
    summary:
      "Our General Surgery unit is manned by Consultants with the West African College of Surgeons' Fellowship. Two of them have further interests in Breast and Thyroid Surgeries among others.",
    services: [],
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    summary:
      "Our Ophthalmology unit is manned by consultant Ophthalmologists who are fellows of both the National and West African Colleges of Surgeons.",
    services: [
      "Cataract surgery",
      "Surgery for Glaucoma (Trabeculectomy)",
      "Pterygium surgery (with or without autograft)",
      "Ptosis surgery, lid reconstruction and repairs",
      "Cosmetic facial reconstructive surgeries",
      "Refraction and optical services, including contact lens",
      "Visual Field Assessment (CVF)",
      "Pachymetry",
      "Ocular scan",
      "Fundus photography",
      "OCT — Optical Coherence Tomography",
      "Tonometry",
    ],
  },
  {
    slug: "pediatric-surgery",
    name: "Pediatric Surgery",
    summary:
      "Our Pediatric Surgery unit is manned by a Consultant Pediatric Surgeon, Fellow of the West African College of Surgeons, with special interest in Hypospadias surgery.",
    services: [
      "Laparotomy for acute abdominal conditions e.g. intussusception",
      "Surgery for ano-rectal malformations",
      "Surgery for hernias and hydroceles",
      "Surgery for undescended testes",
      "Circumcision — primary and re-do",
    ],
  },
  {
    slug: "anesthesia",
    name: "Anesthesia",
    summary:
      "We are equipped for full general (with endotracheal intubation, face mask etc) and regional anesthesia. Our general anesthesia for major surgeries is always superintended by a consultant anesthesiologist.",
    services: [],
  },
  {
    slug: "plastic-surgery",
    name: "Plastic Surgery",
    summary: "Manned by a Fellow of the West African College of Surgeons.",
    services: [
      "Wound care and skin grafting for diabetic foot (co-managed with the orthopedic surgeon and the endocrinologist)",
      "Orbital and facial tumor excision and grafting (co-managed with the ophthalmologist)",
    ],
  },
  {
    slug: "neurosurgery",
    name: "Neurosurgery",
    summary: "Manned by a Fellow of the West African College of Surgeons.",
    services: [
      "Ventriculo-peritoneal (VP) shunt",
      "Repair of spina bifida",
    ],
  },
  {
    slug: "urology",
    name: "Urology",
    summary:
      "Manned by a highly experienced Consultant Urologist with a deep passion for Men's Health and extensive expertise in managing a wide range of general urological conditions.",
    services: [
      "Suprapubic cystostomy",
      "Prostate biopsy",
      "Nephrectomy",
      "Diagnostic cystoscopy",
      "Open prostatectomy",
      "Orchiectomy",
      "Orchidopexy",
      "Varicocelectomy",
    ],
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    summary:
      "Manned by Fellows of the West African College of Surgeons with special interest in laparoscopic surgery.",
    services: [
      "Booked antenatal clinic (by special arrangement)",
      "Consultations, counselling",
      "Elective caesarean sections",
      "Couples counselling",
      "Fertility evaluation",
      "Laparoscopic gynecologic tumor excision",
      "Open hysterectomy / Myomectomy",
    ],
  },
  {
    slug: "ent",
    name: "E.N.T.",
    summary:
      "Ear, Nose & Throat — manned by a visiting Professor of ENT with special competence in endoscopic ENT surgery.",
    services: [
      "Booked consultation",
      "Endoscopic sinus surgery with bilateral polypectomy",
      "Adenotonsillectomy",
    ],
  },
  {
    slug: "orthopedic-surgery",
    name: "Orthopedic Surgery",
    summary: "Manned by a Fellow of the National Postgraduate College of Surgeons.",
    services: [],
  },
];
