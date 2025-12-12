// src/utils/constants.js

// ==================== CLUSTERS ====================
export const clusters = [
    "ARK","RGDA", "CHE", "VZM", "VBL", "LKMR", "DWZ", "KRDL", "JDB", 
    "KRPU", "MPM", "PURI", "BAM", "PSA", "KUR", "BBS", "CTC-1", 
    "CTC-2", "JJKR-1", "JJKR-2", "BHC", "KDJR-1", "KDJR-2", "TLHR", "DNKL"
  ];

  // ---------------------- STATIONS DATA ----------------------
  export const stationsData = [
    // ARK
    { name: "BODDAVARA", cluster: "ARK" },
    { name: "CHIMIDIPALLI", cluster: "ARK" },
    { name: "GORAPUR", cluster: "ARK" },
    { name: "KARAKAVALASA", cluster: "ARK" },
    { name: "MALLIVEDU", cluster: "ARK" },
    { name: "SIMILIGUDA", cluster: "ARK" },
    { name: "SRUNGAVARAPUKOTA", cluster: "ARK" },
    { name: "TYADA", cluster: "ARK" },
    { name: "LAKKAVARAPUKOTA", cluster: "ARK" },

    // RGDA
    { name: "PARVATHIPURAM TOWN", cluster: "RGDA" },
    { name: "SINGAPUR ROAD", cluster: "RGDA" },
    { name: "GUMMADA", cluster: "RGDA" },
    { name: "JIMIDIPETA", cluster: "RGDA" },
    { name: "KUNERU", cluster: "RGDA" },
    { name: "LADDA", cluster: "RGDA" },
    { name: "KEUTGUDA", cluster: "RGDA" },

    // CHE
    { name: "KOTABOMMALI", cluster: "CHE" },
    { name: "NOUPADA", cluster: "CHE" },
    { name: "PONDURU", cluster: "CHE" },
    { name: "TILARU", cluster: "CHE" },
    { name: "DUSI", cluster: "CHE" },
    { name: "PUNDI", cluster: "CHE" },
    { name: "URLAM", cluster: "CHE" },

    // VZM
    { name: "CHIPURUPALLI", cluster: "VZM" },
    { name: "SIGADAM", cluster: "VZM" },
    { name: "ALAMANDA", cluster: "VZM" },
    { name: "KANTAKAPALLI", cluster: "VZM" },
    { name: "KORUKONDA", cluster: "VZM" },
    { name: "NELLIMARLA", cluster: "VZM" },

    // VBL
    { name: "GARIVIDI", cluster: "VBL" },
    { name: "PARVATHIPURAM", cluster: "VBL" },
    { name: "DONKINAVALASA", cluster: "VBL" },
    { name: "GAJAPATINAGARAM", cluster: "VBL" },
    { name: "GARUDABILLI", cluster: "VBL" },
    { name: "GOTLAM", cluster: "VBL" },
    { name: "SEETHANAGARAM", cluster: "VBL" },
    { name: "KOMATAPALLI", cluster: "VBL" },

    // LKMR
    { name: "LAXMIPUR ROAD", cluster: "LKMR" },
    { name: "TIKKIRI", cluster: "LKMR" },
    { name: "BAIGUDA", cluster: "LKMR" },
    { name: "BALUMASKA", cluster: "LKMR" },
    { name: "LELIGUMA", cluster: "LKMR" },
    { name: "SIKARPAI", cluster: "LKMR" },
    { name: "KAKRIGUMA", cluster: "LKMR" },

    // DWZ
    { name: "DAPAL", cluster: "DWZ" },
    { name: "DANTEWARA", cluster: "DWZ" },
    { name: "KAKULUR", cluster: "DWZ" },
    { name: "KAWARGAON", cluster: "DWZ" },
    { name: "KUMAR SODARA", cluster: "DWZ" },
    { name: "GIDDAM", cluster: "DWZ" },

    // KRDL
    { name: "BACHELI", cluster: "KRDL" },
    { name: "BHANSI", cluster: "KRDL" },
    { name: "KIRANDUL", cluster: "KRDL" },
    { name: "KAMLUR", cluster: "KRDL" },

    // JDB
    { name: "BHEJA", cluster: "JDB" },
    { name: "DILMILLI", cluster: "JDB" },
    { name: "KUMAR MARANGA", cluster: "JDB" },
    { name: "NAKTISEMRA", cluster: "JDB" },
    { name: "TOKAPAL", cluster: "JDB" },
    { name: "SILAKJHORI", cluster: "JDB" },
    { name: "AMBAGURA", cluster: "JDB" },

    // KRPU
    { name: "BHEJA", cluster: "KRPU" },
    { name: "CHARAMULAKUSUMI", cluster: "KRPU" },
    { name: "CHATHARIPUT", cluster: "KRPU" },
    { name: "DARLIPUT", cluster: "KRPU" },
    { name: "DHANAPUR", cluster: "KRPU" },
    { name: "MACHKHAND ROAD", cluster: "KRPU" },
    { name: "MALIGURA", cluster: "KRPU" },
    { name: "MANABAR", cluster: "KRPU" },
    { name: "PADUA", cluster: "KRPU" },
    { name: "PALIBA", cluster: "KRPU" },
    { name: "SUKU", cluster: "KRPU" },
    { name: "KOTPAD ROAD", cluster: "KRPU" },
    { name: "KADAPA", cluster: "KRPU" },
    { name: "AMBAGOAN", cluster: "KRPU" },
    { name: "JARATI", cluster: "KRPU" },
    { name: "DUMIRIPUT", cluster: "KRPU" },
    { name: "JEYPORE", cluster: "KRPU" },

    // PURI
    { name: "DELANG", cluster: "PURI" },
    { name: "BIRPURUSOTTAMPUR", cluster: "PURI" },
    { name: "KANAS ROAD", cluster: "PURI" },
    { name: "MALATIPATPUR", cluster: "PURI" },

    // BAM
    { name: "RAMBHA", cluster: "BAM" },
    { name: "HUMMA", cluster: "BAM" },
    { name: "GANJAM", cluster: "BAM" },
    { name: "JAGANNATHPUR", cluster: "BAM" },
    { name: "GOLANTHRA", cluster: "BAM" },
    { name: "SURLA ROAD", cluster: "BAM" },

    // PSA
    { name: "JHADUPUDI", cluster: "PSA" },
    { name: "BARUVA", cluster: "PSA" },
    { name: "MANDASA", cluster: "PSA" },
    { name: "SUMMADEVI", cluster: "PSA" },

    // KUR
    { name: "GANGADHARPUR", cluster: "KUR" },
    { name: "KUHURI", cluster: "KUR" },
    { name: "SOLARI", cluster: "KUR" },
    { name: "MOTARI HALT", cluster: "KUR" },
    { name: "RETANG", cluster: "KUR" },
    { name: "KAIPADHAR ROAD", cluster: "KUR" },
    { name: "TAPANG", cluster: "KUR" },

    // BBS
    { name: "BARANG", cluster: "BBS" },
    { name: "MACHESWAR", cluster: "BBS" },
    { name: "NARAJ MARTHAPUR", cluster: "BBS" },
    { name: "RADHAKISHOREPUR", cluster: "BBS" },

    // CTC-1
    { name: "GHANTIKHAL NIDHIPUR", cluster: "CTC-1" },
    { name: "BARITHENGARH", cluster: "CTC-1" },
    { name: "BYREE", cluster: "CTC-1" },
    { name: "CHARBATIA", cluster: "CTC-1" },
    { name: "GOPALPUR BALKDA", cluster: "CTC-1" },
    { name: "KAPILAS ROAD", cluster: "CTC-1" },
    { name: "KENDRAPARA ROAD", cluster: "CTC-1" },
    { name: "NERGUNDI", cluster: "CTC-1" },

    // CTC-2
    { name: "GURUDIJHATIA", cluster: "CTC-2" },
    { name: "KANDARPUR", cluster: "CTC-2" },
    { name: "RAGHUNATHPUR", cluster: "CTC-2" },
    { name: "SALAGAON", cluster: "CTC-2" },
    { name: "BADABANDHA", cluster: "CTC-2" },
    { name: "RAHAMA", cluster: "CTC-2" },

    // JJKR-1
    { name: "HARIDASPUR", cluster: "JJKR-1" },
    { name: "JAKHAPURA", cluster: "JJKR-1" },
    { name: "JENAPUR", cluster: "JJKR-1" },
    { name: "NEW GARHMANDHUPUR", cluster: "JJKR-1" },
    { name: "SUKINDA ROAD", cluster: "JJKR-1" },

    // JJKR-2
    { name: "SAGADAPATA", cluster: "JJKR-2" },
    { name: "BAGHUAPAL", cluster: "JJKR-2" },
    { name: "TANGIRIAPAL", cluster: "JJKR-2" },
    { name: "TOMKA", cluster: "JJKR-2" },

    // BHC
    { name: "BAITARANI ROAD", cluster: "BHC" },
    { name: "BAUDPUR", cluster: "BHC" },
    { name: "KENDUAPADA", cluster: "BHC" },
    { name: "KORAI", cluster: "BHC" },
    { name: "MANJURI ROAD", cluster: "BHC" },

    // KDJR-1
    { name: "BASANTAPUR", cluster: "KDJR-1" },
    { name: "CHILIKINDARA", cluster: "KDJR-1" },
    { name: "GOALDIH", cluster: "KDJR-1" },
    { name: "NARANPUR", cluster: "KDJR-1" },

    // KDJR-2
    { name: "NAYAGARH", cluster: "KDJR-2" },
    { name: "NILAKANTHESWAR", cluster: "KDJR-2" },
    { name: "PORJANPUR", cluster: "KDJR-2" },
    { name: "SITABINJ", cluster: "KDJR-2" },

    // TLHR
    { name: "TALCHER ROAD", cluster: "TLHR" },
    { name: "BURHAPANKA", cluster: "TLHR" },
    { name: "MERMANDOLI", cluster: "TLHR" },

    // DNKL
    { name: "HINDOL ROAD", cluster: "DNKL" },
    { name: "JORANDA ROAD", cluster: "DNKL" },
    { name: "RAJATHGARH", cluster: "DNKL" },
    { name: "SADASHIBAPUR", cluster: "DNKL" },
  ];

    export const initialItems = [
    { id: 1, name: "Full HD Bullet type IP colour camera", unit: "No.", total: 1, work: "Active", qty: 1 },
    { id: 2, name: "Full HD P/T/Z type IP colour camera", unit: "No.", total: 1, work: "Active", qty: 1 },
    { id: 3, name: "Type-I Switch", unit: "No.", total: 2, work: "Active", qty: 2 },
    { id: 4, name: "Type-II Switch", unit: "No.", total: 1, work: "Active", qty: 1 },
    { id: 5, name: "UPS - 1KVA along with accessories and Battery Cage", unit: "No.", total: 2, work: "Active", qty: 2 },
    { id: 6, name: "AC Panic Switch", unit: "No.", total: 3, work: "Active", qty: 3 },
    { id: 7, name: "24 Fibre FMS (SC-APC Type) along with all installation accessories", unit: "No.", total: 1, work: "Passive - A", qty: 1 },
    { id: 8, name: "12 Fibre FMS (SC-APC Type) along with all installation accessories", unit: "No.", total: 2, work: "Passive - A", qty: 2 },
    { id: 9, name: "19\" 9U racks along with all accessories like power strip, MCB, Fantray, Patch Panel", unit: "No.", total: 2, work: "Passive - A", qty: 2 },
    { id: 10, name: "Installation MFCE Earth with multiple pits complete with all accessories (less than 1 Ohm)", unit: "No.", total: 1, work: "Passive - A", qty: 1 },
    { id: 11, name: "Installation ACDB for AC distribution Box with Lock and key arrangements and 35 mark MCBs", unit: "No.", total: 1, work: "Passive - A", qty: 1 },
    { id: 12, name: "Laying of STP CAT-6 Cable", unit: "Mtrs", total: 460, work: "Passive - A", qty: 460 },
    { id: 13, name: "Laying of 12 Core metal strengthened outdoor unarmored Optic Fiber", unit: "Mtrs", total: 550, work: "Passive - A", qty: 550 },
    { id: 14, name: "Laying of PVC Insulated 3 core 4 Sq. Mm, 12 AGW (1.1 KV grade) outdoor strengthened Copper Cable", unit: "Mtrs", total: 260, work: "Passive - A", qty: 260 },
    { id: 15, name: "Laying of 32mm PVC Flexible pipe", unit: "Mtrs", total: 15, work: "Passive - A", qty: 15 },
    { id: 16, name: "Laying of 32mm PVC conduit pipe (ISI mark)", unit: "Mtrs", total: 260, work: "Passive - A", qty: 260 },
    { id: 17, name: "Laying of 40mm dia. HDPE pipe as defined in Chapter-8", unit: "Mtrs", total: 100, work: "Passive - A", qty: 100 },
    { id: 18, name: "Laying of GI pipe (50 mm Dia – 3.65 mm thick) as per IS-1239, Pt-1, medium grade", unit: "Mtrs", total: 16, work: "Passive - A", qty: 16 },
    { id: 19, name: "Laying of RCC of PVC trough 50X50 mm", unit: "Mtrs", total: 0, work: "Passive - A", qty: 0 },
    { id: 20, name: "Installation of RCC Route Marker", unit: "No.", total: 5, work: "Passive - A", qty: 5 },
    { id: 21, name: "Splicing/Termination of two nos of 12F splicing will be consider as 1 nos of 24F", unit: "No.", total: 2, work: "Passive - A", qty: 2 },
    { id: 22, name: "Breaking of pucca road/CC, PF Cutting, Laying of OFC in Trenches and through all types of protections viz HDPE/GI/RCC Pipes & resurfacing as per the specifications", unit: "Mtrs", total: 225, work: "Trenching", qty: 225 },
    { id: 23, name: "Trenching and Laying of HDPE Duct in normal soil and blowing of OFC Cable", unit: "Mtrs", total: 30, work: "Trenching", qty: 30 },
    { id: 24, name: "Erection of G I pipe post (100 mm dia 4.5mm thickness) ISI 239 part I grade J with base arrangement to a height of 4.3 metres including the foundation as per the specifications", unit: "No.", total: 3, work: "Passive - B", qty: 3 },
    { id: 25, name: "I&C of GI earth pipe & wire along", unit: "No.", total: 3, work: "Passive - B", qty: 3 },
    { id: 26, name: "I&C of IP 66 Outdoor 19\" 6U Rack", unit: "No.", total: 1, work: "Passive - B", qty: 1 },
   { id: 27, name: "Track/road crossing through HDD method (with 2 and more duct, laying of fiber and Power as per the specifications)", unit: "Mtrs", total: 0, work: "HDD" },
    { id: 28, name: "Supply and installation of splice/loop chamber as per the specifications", unit: "No.", total: 0, work: "HDD" }
  ];