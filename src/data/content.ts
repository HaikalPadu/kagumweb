// Central content source for the Kagum Advance website.
// Edit text, courses and services here without touching page layouts.

export type Service = {
  id: string;
  eyebrow: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  image: string;
};

const px = (id: number, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const images = {
  hero: "/assets/enhanced/gambarmain.png",
  about: "/assets/enhanced/gambarmain.png",
  team: "/assets/enhanced/gambarhrdcclaimmable.png",
  career: "/assets/enhanced/gambarcareer.png",
  contact: px(3182812),
  training: "/assets/enhanced/gambarhrdctrainingprovider.png",
};

const originalServices: Service[] = [
  {
    id: "training-provider",
    eyebrow: "People & Performance",
    title: "HRDC Training Provider",
    short: "HRD Corp claimable programmes that turn learning into capability.",
    description:
      "As a registered HRD Corp training provider, Kagum delivers practical programmes across entrepreneurship, leadership, digital skills, technology and more — designed to create measurable workplace impact.",
    points: ["50+ courses across modern business skills", "Practical, hands-on skills development", "Networking with professionals and industry experts", "HRD Corp claimable for eligible employers"],
    image: "/assets/enhanced/gambarhrdctrainingprovider.png",
  },
  {
    id: "digital",
    eyebrow: "Brand & Growth",
    title: "Digital Marketing Services",
    short: "Content, social and digital strategy that gets brands found and remembered.",
    description:
      "Kagum Digital helps ambitious businesses grow online through strategic social media management, digital advertising, content production and website development.",
    points: ["Social media management", "Digital advertising campaigns", "Content creation and videography", "Website design and development"],
    image: "/assets/enhanced/gambardigitalservices.png",
  },
  {
    id: "it",
    eyebrow: "Systems & Solutions",
    title: "IT Consultant",
    short: "Technology solutions tailored to your organisation's challenges.",
    description:
      "From system integration to software needs, our IT consultants help organisations build efficient and reliable technology infrastructure.",
    points: ["IT solutions and integration", "Software and system requirements", "Efficient technology infrastructure", "Ongoing advisory and support"],
    image: "/assets/enhanced/gambaritconsultant.png",
  },
  {
    id: "supply",
    eyebrow: "Supply & Sourcing",
    title: "Supply & Trading",
    short: "Reliable sourcing and distribution that keeps you moving.",
    description:
      "Kagum Supplies provides dependable sourcing, trading and delivery of quality products for organisations across the public and private sectors.",
    points: ["Supply and trading of products", "Seamless sourcing and distribution", "High-quality, on-time delivery", "Government and corporate procurement"],
    image: "/assets/enhanced/gambarsupplyandtrading.png",
  },
  {
    id: "prosilat",
    eyebrow: "Community & Heritage",
    title: "Akademi ProSilat",
    short: "Martial arts built on discipline, confidence and heritage.",
    description:
      "Akademi ProSilat is Kagum's community initiative that develops discipline, confidence and self-defence skills through the heritage of silat.",
    points: ["Silat training for all age groups", "Community and youth development", "Self-defence programmes for women", "Collaboration-led programmes"],
    image: "/assets/enhanced/gambarsilat.png",
  },
];

export const services: Service[] = originalServices.filter(s => ["training-provider","digital","supply"].includes(s.id)).map(s => ({...s, title: s.id === "training-provider" ? "Kagum Academy" : s.id === "digital" ? "Kagum Digital" : "Kagum Supplies", image: s.id === "digital" ? "/assets/digital-updated.png" : s.id === "supply" ? "/assets/supplies-updated.png" : s.image }));

export const courseTracks: Record<string, string[]> = {
  Entrepreneurship: ["Kursus Asas Keusahawanan", "Social Entrepreneur", "Asas Pengurusan Kewangan Perniagaan", "Business Model Canvas (Beginner)", "Etika Perniagaan", "Rancangan Perniagaan for Startup", "Revolusi Industri 4.0 (Asas)"],
  "Management & Leadership": ["Office Management for Small Business", "Bookkeeping for Small Business", "Effective Time Management", "Quality Management System", "Organization Leadership", "Strategic Planning", "Event Management", "Team Building"],
  "ICT & Entrepreneurship": ["Website Management for Small Business", "Professional PowerPoint for Business", "Smartphone Videography for Social Media", "Smartphone Photography for Social Media", "Website Development for E-Commerce", "Interactive Presentation"],
  "Digital Marketing & Social Media": ["General Online Marketing Through Social Media", "WhatsApp Business Marketing", "Facebook Ads for Beginners", "Instagram for Beginners", "Social Media Marketing using YouTube", "Copywriting Masterclass", "Canva for Beginners", "CapCut for Beginners"],
  "Information & Communication Technology": ["Interactive Microsoft Excel Reporting", "WordPress Website Management", "Adobe Photoshop CC", "Data Analysis using SPSS", "Android App Development with MIT App Inventor", "Mastering Google Classroom", "Mastering Google Tools for Education"],
  "Lean Management & Logistics": ["Supply Chain Management", "Project Cargo Management", "Import & Export Documentation", "Lean Logistics", "Logistics Management", "Warehouse Management"],
  "IoT & Robotic Tech": ["DIY IoT Smart Home System", "Basic Arduino", "Robotic Android Control", "NODEMCU Home Automation", "NODEMCU Smart Irrigation System"],
  "Self Defense / Martial Arts": ["Kursus Asas Beladiri Wanita (K.A.B.W)", "Closed Combat Protection System (C.C.P.T)"],
  "Artificial Intelligence": ["AI Fundamentals", "AI for Creative Tasks", "AI for Entrepreneurs", "AI Tools for Entrepreneurs", "AI for Educators", "AI for Students", "Specialized AI Tools"],
};

export const stats = [
  { value: "2,500+", label: "Trained participants" },
  { value: "50+", label: "Courses offered" },
  { value: "40+", label: "Completed projects" },
  { value: "10+", label: "Top collaborations" },
];

export const partners = [
  { name: "HRDC Training", logo: "/assets/collaborations/hrdc-training.png" },
  { name: "HRD Corp Claimable", logo: "/assets/collaborations/hrdc-corp-claimable.png" },
  { name: "Majlis Amanah Rakyat", logo: "/assets/collaborations/mara.png" },
  { name: "Dewan Perniagaan Melayu Malaysia", logo: "/assets/collaborations/dewan-perniagaan-melayu.png" },
  { name: "Kementerian Pembangunan Usahawan", logo: "/assets/collaborations/kementerian-usahawan.png" },
  { name: "Khazanah Nasional", logo: "/assets/collaborations/khazanah-nasional.png" },
  { name: "UCAM", logo: "/assets/collaborations/ucam.png" },
  { name: "UTHM", logo: "/assets/collaborations/uthm.png" },
  { name: "UniKL", logo: "/assets/collaborations/unikl.png" },
  { name: "UiTM", logo: "/assets/collaborations/uitm.png" },
  { name: "UTeM", logo: "/assets/collaborations/utem.png" },
  { name: "POLYCC", logo: "/assets/collaborations/polycc.png" },
  { name: "EduCity", logo: "/assets/collaborations/educity.png" },
  { name: "UniSHAMS", logo: "/assets/collaborations/unishams.png" },
  { name: "MAAHAD", logo: "/assets/collaborations/maahad.png" },
  { name: "Akademi ProSilat", logo: "/assets/collaborations/prosilat.png" },
  { name: "Universiti Geomatika", logo: "/assets/collaborations/geomatika.png" },
  { name: "FSKTM", logo: "/assets/collaborations/fsktm.png" },
  { name: "NAWAL", logo: "/assets/collaborations/nawal.png" },
  { name: "TEKUN Nasional", logo: "/assets/collaborations/tekun-nasional.png" },
  { name: "AR Mechatronics", logo: "/assets/collaborations/ar-mechatronics.png" },
  { name: "CWAL", logo: "/assets/collaborations/cwal.png" },
  { name: "Sakses", logo: "/assets/collaborations/sakses.png" },
  { name: "Kolej RISDA", logo: "/assets/collaborations/kolej-risda.png" },
  { name: "PERNAS", logo: "/assets/collaborations/pernas.png" },
  { name: "JELITA", logo: "/assets/collaborations/jelita.png" },
  { name: "K-Youth", logo: "/assets/collaborations/k-youth.png" },
  { name: "INSKEN", logo: "/assets/collaborations/insken.png" },
  { name: "AIINTEX", logo: "/assets/collaborations/aiintex.png" },
  { name: "FPTV", logo: "/assets/collaborations/fptv.png" },
];

export const brands = [
  { name: "Kagum Academy", logo: "/assets/kagum-academy-logo.png", poster: "/assets/brands/kagum-academy-enhanced.png", original: "/assets/brands/kagum-academy-original.png", text: "Training & HRDC programmes" },
  { name: "Kagum Digital", logo: "/assets/kagum-digital-logo.png", poster: "/assets/brands/kagum-digital-enhanced.png", original: "/assets/brands/kagum-digital-original.png", text: "Digital marketing & web" },
  { name: "Kagum Supplies", logo: "/assets/kagum-supplies-logo.png", poster: "/assets/brands/kagum-supplies-enhanced.png", original: "/assets/brands/kagum-supplies-original.png", text: "Supply & trading" },
];

export const values = [
  { title: "Capability", text: "We build real, practical skills that people can apply from day one." },
  { title: "Adaptability", text: "We design solutions that evolve with industry, technology and people." },
  { title: "Scalability", text: "We help organisations grow with systems and talent that scale." },
];

export const roles = [
  { title: "Assistant Manager", type: "Full-time", area: "Operations" },
  { title: "Content Creator", type: "Full-time", area: "Kagum Digital" },
  { title: "Digital Marketing Executive", type: "Full-time", area: "Kagum Digital" },
  { title: "K-Youth", type: "Programme", area: "Youth development" },
];

export const contact = {
  email: "info@kagum.co",
  phone: "011-3969 9786",
  phoneHref: "tel:+601139699786",
  hq: ["No. 34-01, Jalan Pulai Makmur 5/1,", "Bandar Baru Kangkar Pulai,", "81300 Johor Bahru, Johor."],
  branch: ["J 8837 Batu 15, Sungai Renggei,", "77300 Merlimau, Melaka."],
  mapQuery: "No. 34-01, Jalan Pulai Makmur 5/1, Bandar Baru Kangkar Pulai, 81300 Johor Bahru, Johor",
  socials: {
    facebook: "https://facebook.com/KAGUM.academy",
    instagram: "https://instagram.com/kagum.academy/",
    linkedin: "https://linkedin.com/in/kagum-academy-a40a112b6/",
  },
};
