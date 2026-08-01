/* ==========================================================================
   UNIPATH - AUSTRALIA SPECIALIZED UNIVERSITY & SCHOLARSHIP DATABASE
   ========================================================================== */

window.UniData = {
  australiaInfo: {
    title: "Study in Australia Portal",
    subtitle: "Group of Eight (Go8) & Premier Australian Universities",
    visaType: "Subclass 500 Student Visa",
    healthCover: "OSHC (Overseas Student Health Cover) Required",
    intakes: ["Semester 1 (Feb/March Start)", "Semester 2 (July Start)", "Term 1/2/3 (UNSW 3+ Trimester)"]
  },

  universities: [
    {
      id: "unimelb",
      name: "The University of Melbourne",
      shortName: "UniMelb",
      country: "Australia",
      state: "Victoria",
      city: "Melbourne, VIC",
      cricos: "00116K",
      isGo8: true,
      worldRank: 14,
      acceptanceRate: 70.0,
      minGpa: 3.5,
      minSat: 1350,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 85,
      tuitionAud: 47500,
      tuitionUsd: 31000,
      image: "assets/images/unimelb.png",
      tags: ["Group of Eight (Go8)", "Rank #1 in Australia", "Melbourne Model", "CRICOS: 00116K"],
      programs: ["Bachelor of Science (CS)", "Bachelor of Commerce", "Bachelor of Design", "Biomedicine", "Data Science"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-31",
      academicRequirements: {
        atar: "85.00+ (Biomedicine 95.00+, Commerce 91.00+)",
        ib: "31 - 38 points (Science 31, Commerce 36, Biomedicine 38)",
        aLevels: "ABB to AAA (12-15 points across best 3 A-Level subjects)",
        sat: "SAT 1350+ (or ACT 29+) with 3.5 GPA and AP exam scores (3+)",
        cbse: "85% - 95% aggregate in best 4 academic subjects",
        gaokao: "70% - 80% of total provincial maximum score"
      },
      englishRequirements: {
        ielts: "6.5 overall (no individual band lower than 6.0)",
        pte: "58 overall (no communicative skill lower than 50)",
        toefl: "79 overall (Writing 21, Speaking 18, Reading 13, Listening 13)",
        cambridge: "176 overall with no skill score below 169",
        notes: "Higher band (IELTS 7.0 / PTE 65) required for Law, Fine Arts, and Nursing."
      },
      applicationPortal: {
        portalName: "UniMelb Direct Online Portal (Offshore) / VTAC (Onshore Year 12)",
        fee: "AUD $100 application assessment fee",
        depositAud: "AUD $17,000 (1st semester fee deposit to issue CoE)"
      },
      coursePrerequisites: [
        "Mathematics Methods or Specialist Mathematics (for CS, Commerce, Science)",
        "Chemistry / Biology (for Biomedicine & Science prerequisites)",
        "Minimum VCE Study Score of 25 in English / EAL equivalent"
      ],
      requiredDocuments: [
        "Official High School Transcripts & Graduation Certificate (certified English translation)",
        "Valid English Language Test Result (IELTS / PTE / TOEFL taken within 2 years)",
        "Copy of Passport Bio-Page (valid for at least 6 months)",
        "Genuine Student (GS) Written Statement addressing Home Affairs criteria",
        "Financial Support Evidence (Proof of AUD $29,710/yr living costs + tuition + AUD $2,000 travel)",
        "Overseas Student Health Cover (OSHC) Confirmation (Medibank / Allianz / Bupa)"
      ],
      requirements: [
        "ATAR 85.00+ or IB 31+ / A-Levels ABB / SAT 1350+",
        "IELTS 6.5 (min 6.0 bands) / PTE 58 / TOEFL 79",
        "Mathematics Methods / Specialist Math prerequisite (for STEM/Business)",
        "Genuine Student (GS) Statement for Visa Subclass 500",
        "Overseas Student Health Cover (OSHC) Certification",
        "Financial Capability Proof (AUD $29,710/yr living cost benchmark)",
        "Passport copy & Certified Academic Transcripts with English translation"
      ],
      description: "Ranked #1 in Australia, Melbourne University is renowned for the 'Melbourne Model' undergraduate structure, vibrant Parkville campus, world-leading research institutes, and exceptional graduate employability."
    },
    {
      id: "usyd",
      name: "The University of Sydney",
      shortName: "USYD",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      cricos: "00026A",
      isGo8: true,
      worldRank: 18,
      acceptanceRate: 68.0,
      minGpa: 3.45,
      minSat: 1320,
      minIelts: 6.5,
      minPte: 61,
      atarEquivalent: 83,
      tuitionAud: 48500,
      tuitionUsd: 31800,
      image: "assets/images/usyd.png",
      tags: ["Group of Eight (Go8)", "Iconic Sandstone Campus", "Sydney Quadrangle", "CRICOS: 00026A"],
      programs: ["Bachelor of Advanced Computing", "Bachelor of Commerce", "Medicine & Health", "Architecture", "Law"],
      sem1Deadline: "2026-12-15",
      sem2Deadline: "2026-06-15",
      academicRequirements: {
        atar: "83.00+ (Commerce 95.00, Advanced Computing 90.00, Law 99.50)",
        ib: "30 - 40 points depending on program",
        aLevels: "13 - 17 points across best 3 or 4 subjects",
        sat: "SAT 1320+ (or ACT 28+) with high school transcript",
        cbse: "83% - 95% overall average",
        gaokao: "70% - 80% of provincial maximum score"
      },
      englishRequirements: {
        ielts: "6.5 overall (no individual band lower than 6.0)",
        pte: "61 overall (no communicative skill below 54)",
        toefl: "85 overall (Writing 19, Reading 17, Listening 17, Speaking 17)",
        cambridge: "176 overall with no band lower than 169",
        notes: "Law, Veterinary Science & Health Sciences require IELTS 7.0 - 7.5 overall."
      },
      applicationPortal: {
        portalName: "Sydney Student Direct Portal / UAC (Universities Admissions Centre)",
        fee: "AUD $150 application processing fee",
        depositAud: "AUD $18,000 (First semester fee deposit)"
      },
      coursePrerequisites: [
        "Mathematics Advanced / Extension 1 (for Computer Science, Engineering, Commerce)",
        "Assumed knowledge in HSC Science for health/biomedical degrees"
      ],
      requiredDocuments: [
        "Official High School Academic Transcripts & Completion Certificate",
        "English Language Test Score Report (IELTS Academic / PTE Academic)",
        "Passport Bio Page Copy",
        "Subclass 500 Genuine Student (GS) Assessment Form & Supporting Statement",
        "Financial Proof of Living Funds (AUD $29,710/yr + Tuition)",
        "OSHC Health Insurance Certificate"
      ],
      requirements: [
        "ATAR 83.00+ or IB 30+ / A-Levels 13 pts / SAT 1320+",
        "IELTS Academic 6.5 (no band below 6.0) / PTE 61 / TOEFL 85",
        "Mathematics Assumed Knowledge for CS & Engineering",
        "Genuine Student (GS) requirement verification for Visa Subclass 500",
        "OSHC Health Insurance Enrollment",
        "Financial proof of AUD $29,710/yr living costs + tuition deposit"
      ],
      description: "Australia's first university, USYD features the world-famous Quadrangle building, strong industry partnerships in Sydney's CBD, and extensive global exchange opportunities."
    },
    {
      id: "unsw",
      name: "UNSW Sydney (University of New South Wales)",
      shortName: "UNSW",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      cricos: "00098G",
      isGo8: true,
      worldRank: 19,
      acceptanceRate: 65.0,
      minGpa: 3.4,
      minSat: 1300,
      minIelts: 6.5,
      minPte: 64,
      atarEquivalent: 84,
      tuitionAud: 49000,
      tuitionUsd: 32000,
      image: "assets/images/unsw.png",
      tags: ["Group of Eight (Go8)", "Engineering Titan", "UNSW 3+ Trimester", "CRICOS: 00098G"],
      programs: ["Computer Science (AI Specialisation)", "Quantum Engineering", "Finance & Fintech", "Photovoltaics"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-30",
      academicRequirements: {
        atar: "84.00+ (Engineering 90.00, Computer Science 91.00, Commerce 93.00)",
        ib: "31 - 39 points",
        aLevels: "13 - 17 points",
        sat: "SAT 1300+ / ACT 27+",
        cbse: "84% - 93% aggregate",
        gaokao: "70% - 80% tier 1 benchmark"
      },
      englishRequirements: {
        ielts: "6.5 overall (minimum 6.0 in each subtest)",
        pte: "64 overall (minimum 54 in each communicative skill)",
        toefl: "90 overall (Writing 23, Reading 22, Listening 22, Speaking 22)",
        cambridge: "176 overall with no subtest below 169",
        notes: "UNSW 3+ Trimester model allows entry in T1 (Feb), T2 (May/June), or T3 (Sept)."
      },
      applicationPortal: {
        portalName: "UNSW Apply Online Direct Portal / UAC",
        fee: "AUD $150 application fee",
        depositAud: "AUD $18,500 (1st trimester deposit for CoE)"
      },
      coursePrerequisites: [
        "Mathematics Extension 1 or Extension 2 (for CS and Quantum Engineering)",
        "Physics / Chemistry for specialized engineering streams",
        "Portfolio Submission (for UNSW Art, Design & Architecture programs)"
      ],
      requiredDocuments: [
        "Certified High School Academic Transcripts & Certificate",
        "Official English Language Test Results",
        "Passport copy",
        "UNSW Genuine Student (GS) Financial & Intent Questionnaire",
        "Evidence of Financial Capacity (AUD $29,710/yr standard living costs)",
        "OSHC Insurance Confirmation"
      ],
      requirements: [
        "ATAR 84.00+ / IB 31+ / A-Levels 13 pts / SAT 1300+",
        "IELTS 6.5 (min 6.0 subtests) / PTE 64 / TOEFL 90",
        "Mathematics Extension 1 prerequisite for STEM degrees",
        "Genuine Student (GS) assessment form for Visa Subclass 500",
        "OSHC Health Cover Setup",
        "Financial Capability documentation for living costs and tuition"
      ],
      description: "UNSW Sydney is a powerhouse for engineering, solar energy research, tech entrepreneurship, and computer science, operating under the flexible UNSW 3+ trimester model."
    },
    {
      id: "anu",
      name: "Australian National University",
      shortName: "ANU",
      country: "Australia",
      state: "Australian Capital Territory",
      city: "Canberra, ACT",
      cricos: "00120C",
      isGo8: true,
      worldRank: 30,
      acceptanceRate: 60.0,
      minGpa: 3.5,
      minSat: 1340,
      minIelts: 6.5,
      minPte: 64,
      atarEquivalent: 82,
      tuitionAud: 45000,
      tuitionUsd: 29500,
      image: "assets/images/anu.png",
      tags: ["Group of Eight (Go8)", "National Capital Uni", "Policy & Cyber", "CRICOS: 00120C"],
      programs: ["Advanced Computing (R&D)", "International Relations", "Cyber Security", "Physics & Astronomy"],
      sem1Deadline: "2026-12-01",
      sem2Deadline: "2026-05-15",
      academicRequirements: {
        atar: "82.00+ (Advanced Computing 90.00, Law 97.00)",
        ib: "29 - 37 points",
        aLevels: "12 - 16 points",
        sat: "SAT 1340+ / ACT 29+",
        cbse: "80% - 90% aggregate",
        gaokao: "70% - 78% provincial cut-off"
      },
      englishRequirements: {
        ielts: "6.5 overall (minimum 6.0 in each individual band)",
        pte: "64 overall (minimum 55 in each skill)",
        toefl: "80 overall (Writing 20, Reading 20, Listening 18, Speaking 18)",
        cambridge: "176 overall (minimum 169 in each skill)",
        notes: "Co-curricular or service activity declaration is evaluated during ANU admissions."
      },
      applicationPortal: {
        portalName: "ANU Direct Online Application Portal",
        fee: "AUD $110 application fee",
        depositAud: "AUD $16,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "Advanced Mathematics / Calculus (for Advanced Computing R&D)",
        "Physics / Chemistry for Advanced Science programs"
      ],
      requiredDocuments: [
        "Certified High School Academic Transcripts & Diploma",
        "English Language Test Report",
        "ANU Co-curricular & Service Requirement Form",
        "Genuine Student (GS) Written Statement",
        "Financial Capability Documentation (AUD $29,710/yr living expense standard)",
        "Passport copy & OSHC policy"
      ],
      requirements: [
        "ATAR 82.00+ / IB 29+ / A-Levels 12 pts / SAT 1340+",
        "IELTS 6.5 (min 6.0 in each band) / PTE 64 / TOEFL 80",
        "ANU Co-curricular & Service activity documentation",
        "Genuine Student (GS) statement for Subclass 500 visa",
        "Proof of financial capacity (AUD $29,710/yr living costs)",
        "OSHC Health Cover"
      ],
      description: "Located in Australia's capital Canberra, ANU is the national research university closely aligned with federal science agencies, national security centers, and global diplomacy."
    },
    {
      id: "uq",
      name: "The University of Queensland",
      shortName: "UQ",
      country: "Australia",
      state: "Queensland",
      city: "Brisbane, QLD",
      cricos: "00025B",
      isGo8: true,
      worldRank: 40,
      acceptanceRate: 72.0,
      minGpa: 3.3,
      minSat: 1280,
      minIelts: 6.5,
      minPte: 64,
      atarEquivalent: 78,
      tuitionAud: 44000,
      tuitionUsd: 28800,
      image: "assets/images/uq.png",
      tags: ["Group of Eight (Go8)", "Subtropical St Lucia Campus", "Biotech Leadership", "CRICOS: 00025B"],
      programs: ["Software Engineering", "Biotechnology", "Environmental Management", "Marine Science"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-31",
      academicRequirements: {
        atar: "78.00+ (Commerce 82.00, Engineering 86.00)",
        ib: "28 - 36 points",
        aLevels: "10 - 14 points",
        sat: "SAT 1280+ / ACT 27+",
        cbse: "78% - 88% aggregate",
        gaokao: "70% - 75% provincial benchmark"
      },
      englishRequirements: {
        ielts: "6.5 overall (minimum 6.0 in each sub-score)",
        pte: "64 overall (no sub-score lower than 60)",
        toefl: "87 overall (Writing 21, Reading 19, Listening 19, Speaking 19)",
        cambridge: "176 overall (no sub-score lower than 169)",
        notes: "Nursing, Midwifery & Speech Pathology require IELTS 7.0 - 7.5 overall."
      },
      applicationPortal: {
        portalName: "UQ Online Application Portal / QTAC",
        fee: "AUD $100 application assessment fee",
        depositAud: "AUD $15,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "Mathematical Methods / Specialist Mathematics (for Engineering & IT)",
        "Chemistry / Physics / Biology (for Science & Biotech streams)"
      ],
      requiredDocuments: [
        "Certified High School Graduation Certificate & Transcripts",
        "Valid English Language Test Result",
        "Passport Bio Page Copy",
        "Genuine Student (GS) Questionnaire & Statement",
        "Financial Proof (Bank Statement showing AUD $29,710/yr living costs + tuition)",
        "OSHC Health Insurance Certificate"
      ],
      requirements: [
        "ATAR 78.00+ / IB 28+ / A-Levels 10 pts / SAT 1280+",
        "IELTS 6.5 (no band lower than 6.0) / PTE 64 / TOEFL 87",
        "Mathematical Methods & Chemistry/Physics prerequisite for STEM",
        "OSHC Health Insurance setup",
        "Subclass 500 Student Visa Genuine Student (GS) compliance",
        "Financial capability declaration"
      ],
      description: "UQ boasts a stunning campus along the Brisbane River in sunny Queensland, recognized globally for vaccine development, bioengineering, and clean technology."
    },
    {
      id: "monash",
      name: "Monash University",
      shortName: "Monash",
      country: "Australia",
      state: "Victoria",
      city: "Melbourne, VIC",
      cricos: "00008C",
      isGo8: true,
      worldRank: 42,
      acceptanceRate: 75.0,
      minGpa: 3.25,
      minSat: 1260,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 75,
      tuitionAud: 43500,
      tuitionUsd: 28500,
      image: "assets/images/monash.png",
      tags: ["Group of Eight (Go8)", "Pharmacy & CS Leader", "Global Campuses", "CRICOS: 00008C"],
      programs: ["Computer Science", "Pharmacy & Pharmaceutical Sciences", "Banking & Finance", "Robotics"],
      sem1Deadline: "2026-12-01",
      sem2Deadline: "2026-06-01",
      academicRequirements: {
        atar: "75.00+ (CS 80.00, Pharmacy 84.00, Engineering 87.00)",
        ib: "26 - 35 points",
        aLevels: "9 - 14 points",
        sat: "SAT 1260+ / ACT 26+",
        cbse: "75% - 85% aggregate",
        gaokao: "65% - 75% tier benchmark"
      },
      englishRequirements: {
        ielts: "6.5 overall (no individual band lower than 6.0)",
        pte: "58 overall (no communicative skill lower than 50)",
        toefl: "79 overall (Writing 21, Reading 13, Listening 12, Speaking 18)",
        cambridge: "176 overall with no skill below 169",
        notes: "Pharmacy & Law require IELTS 7.0 overall."
      },
      applicationPortal: {
        portalName: "Monash Direct Application Portal / VTAC",
        fee: "AUD $100 application fee",
        depositAud: "AUD $15,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "Higher Mathematics (Mathematical Methods or Specialist Math) for CS & Engineering",
        "Chemistry & Biology for Pharmacy & Medical Science"
      ],
      requiredDocuments: [
        "Certified High School Transcripts & Certificate of Completion",
        "Official English Language Test Score",
        "Passport Bio Page Copy",
        "Subclass 500 Visa Genuine Student (GS) Documentation",
        "Financial Capacity Declaration (AUD $29,710/yr living costs)",
        "OSHC Health Insurance Certificate"
      ],
      requirements: [
        "ATAR 75.00+ / IB 26+ / A-Levels 9 pts / SAT 1260+",
        "IELTS 6.5 (min 6.0 sub-scores) / PTE 58 / TOEFL 79",
        "Higher Mathematics prerequisite for CS/Engineering",
        "Subclass 500 Visa documentation & GS letter",
        "Financial support verification",
        "OSHC Cover"
      ],
      description: "Australia's largest university, Monash is celebrated for world #2 rankings in Pharmacy, cutting-edge AI labs, and expansive global alliance programs."
    },
    {
      id: "uts",
      name: "University of Technology Sydney",
      shortName: "UTS",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      cricos: "00099F",
      isGo8: false,
      worldRank: 88,
      acceptanceRate: 78.0,
      minGpa: 3.1,
      minSat: 1220,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 72,
      tuitionAud: 41000,
      tuitionUsd: 26800,
      image: "assets/images/uts.png",
      tags: ["Tech Precinct", "Sydney Tech Central", "High Employability", "CRICOS: 00099F"],
      programs: ["Cyber Security", "Data Science & AI", "Games Development", "Design & Architecture"],
      sem1Deadline: "2026-12-15",
      sem2Deadline: "2026-06-15",
      academicRequirements: {
        atar: "72.00+ (IT/CS 80.00, Business 82.00, Engineering 80.00)",
        ib: "25 - 31 points",
        aLevels: "8 - 12 points",
        sat: "SAT 1220+ / ACT 25+",
        cbse: "72% - 82% aggregate",
        gaokao: "60% - 70% provincial benchmark"
      },
      englishRequirements: {
        ielts: "6.5 overall (Writing 6.0)",
        pte: "58 overall (Writing 50)",
        toefl: "79 overall (Writing 21)",
        cambridge: "176 overall (Writing 169)",
        notes: "Design, Animation, and IT courses accept direct entry or UTS College diploma pathway."
      },
      applicationPortal: {
        portalName: "UTS Direct Online Application Portal / UAC",
        fee: "Free for direct online international applications (or AUD $100)",
        depositAud: "AUD $14,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "HSC Mathematics Advanced (for IT, Data Science, and Engineering)",
        "Design Portfolio / Reel (for Bachelor of Design in Animation / Architecture)"
      ],
      requiredDocuments: [
        "High School Transcripts & Completion Certificate",
        "English Language Test Score",
        "Passport Bio Page",
        "Design Portfolio / Digital Reel (Design applicants only)",
        "Genuine Student (GS) Assessment Form",
        "OSHC Insurance Confirmation"
      ],
      requirements: [
        "ATAR 72.00+ / IB 25+ / A-Levels 8 pts / SAT 1220+",
        "IELTS 6.5 (writing 6.0) / PTE 58 / TOEFL 79",
        "Design Portfolio (for Animation & Architecture degrees)",
        "Genuine Student (GS) assessment for Subclass 500 visa",
        "OSHC Coverage",
        "Proof of living expenses (AUD $29,710/yr)"
      ],
      description: "Located right in Sydney's innovative Tech Central precinct, UTS delivers hands-on industry practice, state-of-the-art Frank Gehry architecture, and strong startup accelerators."
    },
    {
      id: "rmit",
      name: "RMIT University",
      shortName: "RMIT",
      country: "Australia",
      state: "Victoria",
      city: "Melbourne, VIC",
      cricos: "00122A",
      isGo8: false,
      worldRank: 123,
      acceptanceRate: 82.0,
      minGpa: 3.0,
      minSat: 1180,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 68,
      tuitionAud: 37500,
      tuitionUsd: 24500,
      image: "assets/images/rmit.png",
      tags: ["Design & Innovation", "Melbourne City Campus", "Work Integrated Learning", "CRICOS: 00122A"],
      programs: ["Information Technology", "Digital Media & Design", "Aviation", "Software Engineering"],
      sem1Deadline: "2026-12-20",
      sem2Deadline: "2026-06-20",
      academicRequirements: {
        atar: "68.00+ (IT 65.00, Business 70.00, Engineering 75.00)",
        ib: "24 - 29 points",
        aLevels: "7 - 11 points",
        sat: "SAT 1180+ / ACT 24+",
        cbse: "68% - 78% aggregate",
        gaokao: "60% - 68% provincial benchmark"
      },
      englishRequirements: {
        ielts: "6.5 overall (no band lower than 6.0)",
        pte: "58 overall (no skill lower than 50)",
        toefl: "79 overall (Writing 21, Reading 13, Listening 12, Speaking 18)",
        cambridge: "176 overall (no band below 169)",
        notes: "Design programs require creative task / folio submission alongside academic requirements."
      },
      applicationPortal: {
        portalName: "RMIT Direct International Online Portal",
        fee: "Free direct online application",
        depositAud: "AUD $13,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "VCE Mathematical Methods or equivalent for IT & Software Engineering",
        "Folio / Creative Selection Task for Architecture, Fashion, Fine Art, Game Design"
      ],
      requiredDocuments: [
        "High School Transcripts & Certificate of Completion",
        "Official English Proficiency Certificate",
        "Creative Folio / Selection Task Submission (for Design / Media programs)",
        "Passport Bio-Page Copy",
        "Subclass 500 Genuine Student (GS) Verification Form",
        "Financial Evidence (AUD $29,710/yr living costs + tuition)"
      ],
      requirements: [
        "ATAR 68.00+ / IB 24+ / A-Levels 7 pts / SAT 1180+",
        "IELTS 6.5 overall / PTE 58 / TOEFL 79",
        "Creative Selection Task / Portfolio (for Design & Media programs)",
        "Subclass 500 GS Verification",
        "OSHC Health Cover",
        "Financial Proof of Living Expenses"
      ],
      description: "A global university of technology, design, and enterprise based in central Melbourne, famous for industry placements and creative technological innovation."
    }
  ],

  scholarships: [
    {
      id: "sch-aus-awards",
      name: "Australia Awards Scholarships",
      university: "Participating Australian Universities (Go8 & National)",
      country: "Australia",
      coverage: "Full Tuition + Airfare + Living Allowance (AUD $30k/yr) + OSHC",
      type: "Government Full Ride",
      deadline: "2026-04-30",
      eligibility: "High-achieving applicants from partner countries in Asia-Pacific, Latin America, and Africa demonstrating leadership.",
      description: "Prestigious Australian Government awards providing full tuition, return air travel, establishment allowance, and full health cover."
    },
    {
      id: "sch-melb-undergrad",
      name: "Melbourne International Undergraduate Scholarship",
      university: "The University of Melbourne",
      country: "Australia",
      coverage: "100% Tuition Fee Remission (or AUD $10,000 allowance)",
      type: "Merit-Based",
      deadline: "2026-11-30",
      eligibility: "Top international high school graduates applying for undergraduate study at UniMelb.",
      description: "Awarded automatically to high-achieving international students based on ATAR or IB academic merit."
    },
    {
      id: "sch-usyd-achievers",
      name: "Sydney Achievers International Scholarship",
      university: "The University of Sydney",
      country: "Australia",
      coverage: "AUD $10,000 to $20,000 per year",
      type: "Merit-Based",
      deadline: "2026-12-15",
      eligibility: "High performing international students commencing undergraduate degrees at Sydney University.",
      description: "Recognizes exceptional academic performance among incoming international undergraduates."
    },
    {
      id: "sch-unsw-award",
      name: "UNSW International Award",
      university: "UNSW Sydney",
      country: "Australia",
      coverage: "$15,000 per year towards tuition fees",
      type: "Merit & Leadership",
      deadline: "2026-11-30",
      eligibility: "International students commencing full-time coursework degrees at UNSW Sydney.",
      description: "Offers financial support to high-caliber international students undertaking undergraduate study."
    }
  ]
};
