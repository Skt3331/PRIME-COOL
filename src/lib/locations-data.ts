export interface LocationDetail {
  slug: string;
  name: string;
  type: "locality" | "town" | "midc" | "district" | "city";
  pincodes: string[];
  landmarks: string[];
  nearbyBusinesses: string[];
  reviews: { author: string; rating: number; text: string; role?: string }[];
  mapEmbedUrl: string;
  faqs: { q: string; a: string }[];
}

export const locationsData: Record<string, LocationDetail> = {
  wagholi: {
    slug: "wagholi",
    name: "Wagholi",
    type: "locality",
    pincodes: ["412207", "411047"],
    landmarks: [
      "Wagheshwar Temple",
      "Lexicon International School",
      "Wagholi Plaza",
      "BJS College",
    ],
    nearbyBusinesses: ["Decathlon Wagholi", "Soyuz Industrial Tools", "Ganesh Supermarket"],
    reviews: [
      {
        author: "Aniket Shinde",
        rating: 5,
        text: "Excellent split AC gas filling service in Wagholi. The technician arrived in 30 minutes and charged very transparently.",
        role: "Homeowner",
      },
      {
        author: "Pooja Mehta",
        rating: 5,
        text: "Got our commercial display counter repaired for our bakery in Wagholi. Very professional troubleshooting.",
        role: "Bakery Owner",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3782.2612989435647!2d73.97827827519266!3d18.574635682527878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3f878f10fb5%3A0x6b4ef82110c73243!2sWagholi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "How fast can you dispatch an AC technician in Wagholi?",
        a: "We provide emergency AC dispatch under 45 minutes along the main Nagar Road corridor in Wagholi.",
      },
      {
        q: "Do you offer Annual Maintenance Contracts in Wagholi?",
        a: "Yes, we support both residential and commercial AMC plans across all societies and office complexes in Wagholi.",
      },
    ],
  },
  lonikand: {
    slug: "lonikand",
    name: "Lonikand",
    type: "town",
    pincodes: ["412216"],
    landmarks: ["Lonikand Police Station", "Nagar Road Toll Plaza", "Shree Ram Mangal Karyalaya"],
    nearbyBusinesses: ["Sai Weighbridge", "Balaji Hardware", "Khandoba Traders"],
    reviews: [
      {
        author: "Rahul Temgire",
        rating: 5,
        text: "Best refrigerator repair service in Lonikand. Quick turnaround and genuine parts used.",
        role: "Hotel Manager",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3781.3323049187304!2d73.9934!3d18.5996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c153835a507b%3A0xe5a3c9e6db3fbc5!2sLonikand%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Do you service domestic double-door refrigerators in Lonikand?",
        a: "Yes, our technicians carry common relays, overload protectors, and gas charging kits to fix fridges in Lonikand on the spot.",
      },
    ],
  },
  "koregaon-bhima": {
    slug: "koregaon-bhima",
    name: "Koregaon Bhima",
    type: "town",
    pincodes: ["412216"],
    landmarks: ["Vijay Stambh Monument", "Bhima River Bridge", "Koregaon Bhima Gram Panchayat"],
    nearbyBusinesses: ["Venkatesh Steel", "Koregaon Industrial Gases", "Ganga Hotel"],
    reviews: [
      {
        author: "Sumit Gawande",
        rating: 5,
        text: "Excellent industrial compressor repair. They fixed our process cooling line leak in record time.",
        role: "Plant Engineer",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3779.6200277346124!2d74.0772!3d18.6657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c678a1e5069f%3A0xad5f0b4d4750c18d!2sKoregaon%20Bhima%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Do you support 24/7 emergency service in Koregaon Bhima?",
        a: "Yes, for factory chillers, process cooling loops, and warehouse cold rooms, we provide 24/7 priority support.",
      },
    ],
  },
  shikrapur: {
    slug: "shikrapur",
    name: "Shikrapur",
    type: "town",
    pincodes: ["412208"],
    landmarks: ["Chakan-Shikrapur Chowk", "Shikrapur Police Station", "Nagar Road Bypass"],
    nearbyBusinesses: ["Jadhav Mechanicals", "Mahalaxmi Sweets & Dairy", "Shikrapur Steel Yards"],
    reviews: [
      {
        author: "Nikhil Tilekar",
        rating: 5,
        text: "Our water cooler was not chilling. Prime Cool solved the scaling problem and restored cooling water for our factory workers.",
        role: "HR Head",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3778.694665427192!2d74.1132!3d18.6974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c80c98f98a27%3A0x6e9f45d1f851c2eb!2sShikrapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Can you install multi-split cassette ACs for shops in Shikrapur?",
        a: "Yes, we handle the complete sizing, layout routing, drainage installation, and commissioning of Cassette ACs.",
      },
    ],
  },
  karegaon: {
    slug: "karegaon",
    name: "Karegaon",
    type: "locality",
    pincodes: ["412220"],
    landmarks: ["Karegaon Ganpati Mandir", "Nagar Road MIDC Corridor", "Karegaon Toll Plaza"],
    nearbyBusinesses: [
      "LG Electronics India Factory",
      "Fiat India Automobiles",
      "Karegaon Logistics Hub",
    ],
    reviews: [
      {
        author: "Deepak Yadav",
        rating: 5,
        text: "Managed our warehouse deep freezer overhaul perfectly. Kept our frozen dairy stock from spoiling.",
        role: "Cold Chain Logistics Manager",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3777.6200277346124!2d74.1950!3d18.7300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cc47a8e5069f%3A0xad5f0b4d4750c18d!2sKaregaon%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Do you service bulk milk chillers in Karegaon?",
        a: "Yes, we service Bulk Milk Coolers (BMC) and Plate Heat Exchangers for dairy collectors in the Karegaon area.",
      },
    ],
  },
  "ranjangaon-midc": {
    slug: "ranjangaon-midc",
    name: "Ranjangaon MIDC",
    type: "midc",
    pincodes: ["412220"],
    landmarks: [
      "Mahaganapati Mandir Ranjangaon",
      "L&T Heavy Engineering Plant",
      "Whirlpool Manufacturing Unit",
    ],
    nearbyBusinesses: ["Pernod Ricard India", "Bekaert Industries", "Haier Appliances Factory"],
    reviews: [
      {
        author: "Satish Deshmukh",
        rating: 5,
        text: "Excellent industrial cooling tower overhaul. Replaced the PVC fills and aligned the blower blades. Approach is now optimal.",
        role: "Maintenance Manager",
      },
      {
        author: "Amit Verma",
        rating: 5,
        text: "Highly reliable screw chiller maintenance support. They are under our yearly industrial AMC.",
        role: "Operations Lead",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3777.2913049187304!2d74.2412!3d18.7521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cd4ad2fa2fa2%3A0xe5a3c9e6db3fb1b!2sRanjangaon%20MIDC%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "What industrial refrigeration units do you service in Ranjangaon MIDC?",
        a: "We service process chillers, cooling towers, industrial scroll/screw compressors, air handling units (AHUs), and heavy cold rooms.",
      },
      {
        q: "What is your emergency response SLA for Ranjangaon MIDC factories?",
        a: "For premium Industrial AMC holders, we guarantee an on-site mechanical engineer within 4 hours of call registration.",
      },
    ],
  },
  shirur: {
    slug: "shirur",
    name: "Shirur",
    type: "town",
    pincodes: ["412210"],
    landmarks: ["Ghodnadi River Bridge", "Shirur Bus Stand", "Shirur Municipal Council"],
    nearbyBusinesses: ["Ghodganga Sugar Factory", "Shirur Cold Storage", "Manas Electronics"],
    reviews: [
      {
        author: "Kishor Patil",
        rating: 5,
        text: "Fixed our cold storage compressor in Shirur overnight. Very knowledgeable mechanical team.",
        role: "Cold Storage Owner",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3775.2913049187304!2d74.3721!3d18.8245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2d787093bc2f5%3A0x6b4ef82110c71a3!2sShirur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Can you travel past Shirur for agricultural cold room diagnostics?",
        a: "Yes, we serve farms, dairy centers, and storage facilities along the border of Pune and Ahmednagar districts.",
      },
    ],
  },
  hadapsar: {
    slug: "hadapsar",
    name: "Hadapsar",
    type: "locality",
    pincodes: ["411028", "411013"],
    landmarks: ["Magarpatta City", "SP Infocity", "Hadapsar Gliding Centre", "Noble Hospital"],
    nearbyBusinesses: ["Accenture SP Infocity", "Amanora Mall", "Hadapsar Industrial Estate"],
    reviews: [
      {
        author: "Vikram Sen",
        rating: 5,
        text: "Excellent server room cooling setup at our IT startup in Hadapsar. They set up standby redundancy switchboards.",
        role: "IT Director",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3783.5029012435647!2d73.9262!3d18.5089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1f9d50a2f5f%3A0xe5a3c9e6db3fbc5!2sHadapsar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Do you service VRF/VRV air conditioning systems in Hadapsar commercial offices?",
        a: "Yes, we offer quarterly preventative descaling, filter drops, and sensor troubleshooting for office complexes in Hadapsar.",
      },
    ],
  },
  kharadi: {
    slug: "kharadi",
    name: "Kharadi",
    type: "locality",
    pincodes: ["411014"],
    landmarks: [
      "World Trade Center (WTC) Pune",
      "EON IT Park",
      "Gera Commerzone",
      "Radisson Blu Kharadi",
    ],
    nearbyBusinesses: ["Barclays EON", "Symantec Kharadi", "Columbia Asia Hospital"],
    reviews: [
      {
        author: "Shruti Iyer",
        rating: 5,
        text: "Excellent cassette AC repair at our clinic in Kharadi. They replaced the drain lift pump in under two hours.",
        role: "Clinic Manager",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3782.4612989435647!2d73.9482!3d18.5646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3e21010fb5%3A0x6b4ef82110c73243!2sKharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Can you provide N+1 redundancy standby AC controllers for server rooms in EON IT Park?",
        a: "Yes, we design, build, and program standby rotation switchboards for server rooms and hub systems in Kharadi.",
      },
    ],
  },
  "chakan-midc": {
    slug: "chakan-midc",
    name: "Chakan MIDC",
    type: "midc",
    pincodes: ["410501", "410507"],
    landmarks: [
      "Chakan Phase II Industrial Area",
      "Mercedes-Benz India Plant",
      "Volkswagen Assembly Facility",
    ],
    nearbyBusinesses: [
      "Mahindra Vehicle Manufacturers",
      "Bridgestone India",
      "GE India Industrial",
    ],
    reviews: [
      {
        author: "Swapnil Marathe",
        rating: 5,
        text: "We had a critical breakdown on our process chiller loop in Chakan Phase II. The team showed up in 3 hours, replaced the scroll compressor contactor, and saved our run batch.",
        role: "Factory Head",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3774.2913049187304!2d73.8124!3d18.7721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2d787093bc2f5%3A0x6b4ef82110c71a3!2sChakan%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "Do your technicians have experience with heavy screw chillers in Chakan?",
        a: "Yes, our industrial engineers are trained on Bitzer, Danfoss, and Copeland industrial screw and reciprocating chiller circuits.",
      },
    ],
  },
  "pimpri-chinchwad": {
    slug: "pimpri-chinchwad",
    name: "Pimpri-Chinchwad",
    type: "city",
    pincodes: ["411018", "411019", "411033"],
    landmarks: ["PCMC Bhavan", "Tata Motors Plant", "Thermax Chowk", "Bhosari MIDC Plaza"],
    nearbyBusinesses: ["Thermax Limited", "Sandvik Asia", "Forbes Marshall"],
    reviews: [
      {
        author: "Milind Joshi",
        rating: 5,
        text: "Ductable AC repair done professionally. Clean work and balanced airflow across our commercial showroom in Chinchwad.",
        role: "Showroom Manager",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3780.4913049187304!2d73.8012!3d18.6221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b888fa8e507b%3A0xe5a3c9e6db3fbc5!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
    faqs: [
      {
        q: "What areas of PCMC do you cover?",
        a: "We cover Bhosari MIDC, Nigdi, Akurdi, Chinchwad, Pimpri, Wakad, and Ravet.",
      },
    ],
  },

  // Districts (Adding standard fallback for Maharashtra districts SEO)
  "pune-district": {
    slug: "pune-district",
    name: "Pune District",
    type: "district",
    pincodes: ["411001", "412207"],
    landmarks: ["Western Ghats Range", "Pune Metropolitan Region"],
    nearbyBusinesses: ["Pune Industrial Zones"],
    reviews: [
      {
        author: "P. R. Shinde",
        rating: 5,
        text: "Comprehensive AMC management across our regional warehouses in Pune.",
      },
    ],
    mapEmbedUrl: "",
    faqs: [
      {
        q: "Do you cover rural Pune agricultural cold storage?",
        a: "Yes, we support cold room installation and repair across the entire Pune rural agricultural district.",
      },
    ],
  },
  "mumbai-district": {
    slug: "mumbai-district",
    name: "Mumbai District",
    type: "district",
    pincodes: ["400001"],
    landmarks: ["Gateway of India", "Nariman Point"],
    nearbyBusinesses: ["Marine refrigeration operators"],
    reviews: [
      {
        author: "Marine Logistics",
        rating: 5,
        text: "Excellent industrial condenser maintenance.",
      },
    ],
    mapEmbedUrl: "",
    faqs: [
      {
        q: "Do you service marine vessel refrigeration?",
        a: "Yes, we service commercial cold storage aboard cargo vessels docked in Mumbai on request.",
      },
    ],
  },
  "nashik-district": {
    slug: "nashik-district",
    name: "Nashik District",
    type: "district",
    pincodes: ["422001"],
    landmarks: ["Trimbakeshwar", "Sula Vineyards"],
    nearbyBusinesses: ["Wine cold storages", "Ambad MIDC"],
    reviews: [
      {
        author: "Vintner Cold Chain",
        rating: 5,
        text: "Perfect relative humidity and temperature calibrations for our wine aging rooms in Nashik.",
      },
    ],
    mapEmbedUrl: "",
    faqs: [
      {
        q: "Do you service agricultural pre-coolers in Nashik?",
        a: "Yes, we maintain grape pre-cooling facilities and cold room networks across Nashik district.",
      },
    ],
  },
};
