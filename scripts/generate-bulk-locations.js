const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Base lists of places in Maharashtra
const cities = {
  pune: [
    "Wagholi", "Kharadi", "Hadapsar", "Chakan", "Ranjangaon", "Shikrapur", "Lonikand", "Koregaon Bhima",
    "Karegaon", "Shirur", "Pimpri", "Chinchwad", "Hinjawadi", "Baner", "Balewadi", "Wakad", "Alandi",
    "Dehu", "Talegaon", "Lonavala", "Saswad", "Jejuri", "Baramati", "Junnar", "Khed", "Manchar",
    "Narayangaon", "Bhor", "Velhe", "Purandar", "Daund", "Indapur", "Mulshi", "Paud", "Pirangut",
    "Lavasa", "Khadakwasla", "Dhankawadi", "Katraj", "Kondhwa", "Undri", "Pisoli", "Yewalewadi",
    "Wanowrie", "NIBM", "Camp", "Kothrud", "Karve Nagar", "Erandwane", "Deccan", "Shivajinagar",
    "Aundh", "Sangvi", "Pimple Saudagar", "Pimple Nilakh", "Rahatani", "Kalewadi", "Thergaon",
    "Tathawade", "Ravet", "Kiwale", "Moshi", "Bhosari", "Charholi", "Dighi", "Lohegaon", "Viman Nagar",
    "Yerwada", "Vadgaon Sheri", "Kalyani Nagar", "Mundhwa", "Kesnand", "Bakori", "Awhalwadi",
    "Uruli Kanchan", "Loni Kalbhor", "Fursungi", "Uruli Devachi", "Wadki", "Phursungi", "Yawat",
    "Kedgaon", "Supa", "Khandala", "Shirwal", "Lonand", "Phaltan", "Somatane", "Urse", "Kanhe",
    "Kamshet", "Malavli", "Bhaje", "Valvan", "Khandala", "Kurvande"
  ],
  mumbai: [
    "Colaba", "Cuffe Parade", "Nariman Point", "Fort", "Churchgate", "Marine Lines", "Charni Road",
    "Grant Road", "Mumbai Central", "Mahalakshmi", "Lower Parel", "Elphinstone Road", "Dadar",
    "Matunga", "Sion", "Kurla", "Vidyavihar", "Ghatkopar", "Vikhroli", "Kanjurmarg", "Bhandup",
    "Mulund", "Thane", "Kalwa", "Mumbra", "Diva", "Dombivli", "Kalyan", "Shahad", "Ambivli",
    "Titwala", "Khadavli", "Vasind", "Asangaon", "Atgaon", "Khardi", "Kasara", "Bandra", "Khar",
    "Santacruz", "Vile Parle", "Andheri", "Jogeshwari", "Goregaon", "Malad", "Kandivali", "Borivali",
    "Dahisar", "Mira Road", "Bhayandar", "Naigaon", "Vasai", "Nallasopara", "Virar", "Vaitarna",
    "Saphale", "Kelve Road", "Palghar", "Umroli", "Boisar", "Vangaon", "Dahanu Road", "Chembur",
    "Govandi", "Mankhurd", "Vashi", "Sanpada", "Juinagar", "Nerul", "Belapur", "Kharghar",
    "Mansarovar", "Khandeshwar", "Panvel", "Taloja", "Kamothe", "Kalamboli", "Ulhasnagar",
    "Ambernath", "Badlapur", "Karjat", "Khopoli"
  ],
  kolhapur: [
    "Karveer", "Ichalkaranji", "Jaysingpur", "Kagal", "Gadhinglaj", "Shirol", "Panhala", "Shahuwadi",
    "Radhanagari", "Bhudargad", "Ajara", "Chandgad", "Hatkanangle", "Gandhinagar", "Uchgaon",
    "Hupari", "Kurundwad", "Rukadi", "Chikhali", "Pattan Kodoli", "Nandre", "Shiroli", "Jule Kolhapur",
    "Rajarampuri", "Shahupuri", "Tarabai Park", "Kasaba Bawada", "Phulewadi", "Kalamba", "Sane Guruji",
    "Pratibhanagar", "Sambhaji Nagar", "Mangalwar Peth", "Budhwar Peth", "Somwar Peth", "Shaniwar Peth"
  ],
  other_maharashtra: [
    "Satara", "Karad", "Wai", "Mahabaleshwar", "Panchgani", "Phaltan", "Koregaon", "Shirwal", "Khandala",
    "Sangli", "Miraj", "Jat", "Tasgaon", "Kavathe Mahankal", "Vita", "Shirala", "Palus", "Islampur",
    "Solapur", "Pandharpur", "Barshi", "Mohol", "Akkalkot", "Sangola", "Karmala", "Kurduvadi",
    "Nashik", "Malegaon", "Manmad", "Sinnar", "Niphad", "Yeola", "Trimbakeshwar", "Igatpuri", "Satana",
    "Thane", "Kalyan", "Dombivli", "Ulhasnagar", "Ambernath", "Badlapur", "Bhiwandi", "Shahapur", "Murbad",
    "Navi Mumbai", "Panvel", "Uran", "Karjat", "Khopoli", "Pen", "Alibag", "Roha", "Mangaon", "Mahad",
    "Nagpur", "Kamptee", "Hingna", "Katol", "Kalmeshwar", "Ramtek", "Umred", "Saoner",
    "Aurangabad", "Chhatrapati Sambhajinagar", "Gangapur", "Vaijapur", "Kannad", "Paithan", "Sillod", "Phulambri"
  ]
};

const suffixes = [
  "MIDC", "Phase 1", "Phase 2", "Phase 3", "East", "West", "Nagar", "Wadi", "Gaon", "Chowk", 
  "Market", "Extension", "Layout", "Colony", "Township", "Park", "Industrial Area", "Sector 1", 
  "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Rural", "Tehsil", "Peth", "Bazar", "Naka"
];

const generated = [];
const seenSlugs = new Set(db.locations.map(l => l.slug));

function getPincodePrefix(city) {
  if (city === 'pune') return '411';
  if (city === 'mumbai') return '400';
  if (city === 'kolhapur') return '416';
  return '410';
}

const targetCount = 1500;
const districts = ['pune', 'mumbai', 'kolhapur', 'other_maharashtra'];

while (generated.length < targetCount) {
  for (const dist of districts) {
    const basePlaces = cities[dist];
    for (const place of basePlaces) {
      for (const suff of suffixes) {
        if (generated.length >= targetCount) break;

        const name = `${place} ${suff}`;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        const pinPrefix = getPincodePrefix(dist);
        const pinVal = String(Math.floor(100 + Math.random() * 900));
        const pincodes = [`${pinPrefix}${pinVal}`];

        const lType = suff.includes("MIDC") || suff.includes("Industrial") ? "industrial" : "locality";

        generated.push({
          slug,
          name,
          type: lType,
          pincodes,
          landmarks: [
            `${place} Grampanchayat Office`,
            `${place} Zilla Parishad School`,
            `${place} Bus Stand`,
            `Maruti Mandir ${suff}`
          ],
          nearbyBusinesses: [
            `${place} Electricals`,
            `Sai Cooling Services`,
            `Balaji HVAC Care`
          ],
          reviews: [
            {
              author: "Local Customer",
              rating: 5,
              text: `Excellent AC repair and split AC maintenance service in ${name}. Very quick and professional support.`,
              role: "Property Owner"
            }
          ],
          mapEmbedUrl: "",
          faqs: [
            {
              q: `Do you provide emergency AC repair services in ${name}?`,
              a: `Yes, Prime Cool offers 24/7 emergency dispatch and rapid AC repair services in ${name} and surrounding neighborhoods.`
            }
          ]
        });
      }
    }
  }
}

db.locations = [...db.locations, ...generated];
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log(`Successfully generated and added ${generated.length} locations to db.json! Total locations now: ${db.locations.length}`);
