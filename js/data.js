/* ==========================================================================
   UNIPATH — AUSTRALIA & NEW ZEALAND UNIVERSITY, LANGUAGE SCHOOL & SCHOLARSHIP DATABASE
   Includes structured document requirements for student upload system
   ========================================================================== */

window.UniData = {
  portalInfo: {
    title: "Study in Australia & New Zealand",
    subtitle: "Top Universities, Language Schools & Pathway Programs",
    regions: ["Australia", "New Zealand"],
    types: ["University", "Language School"]
  },

  // ════════════════════════════════════════════════════════════════
  //  INSTITUTIONS — Universities + Language Schools
  // ════════════════════════════════════════════════════════════════
  institutions: [

    // ─── AUSTRALIAN UNIVERSITIES ──────────────────────────────────
    {
      id: "unimelb",
      name: "The University of Melbourne",
      shortName: "UniMelb",
      type: "university",
      country: "Australia",
      state: "Victoria",
      city: "Melbourne, VIC",
      providerCode: "CRICOS: 00116K",
      isElite: true,
      eliteGroup: "Group of Eight (Go8)",
      worldRank: 14,
      acceptanceRate: 70.0,
      minGpa: 3.5,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 85,
      tuitionLocal: 47500,
      tuitionCurrency: "AUD",
      image: "assets/images/unimelb.png",
      tags: ["Group of Eight (Go8)", "Rank #1 in Australia", "Melbourne Model", "CRICOS: 00116K"],
      programs: ["Bachelor of Science (CS)", "Bachelor of Commerce", "Bachelor of Design", "Biomedicine", "Data Science"],
      intakes: ["Semester 1 (Feb/March)", "Semester 2 (July)"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-31",
      academicRequirements: {
        atar: "85.00+ (Biomedicine 95.00+, Commerce 91.00+)",
        ib: "31 - 38 points (Science 31, Commerce 36, Biomedicine 38)",
        aLevels: "ABB to AAA (12-15 points across best 3 A-Level subjects)",
        sat: "SAT 1350+ (or ACT 29+) with 3.5 GPA and AP exam scores (3+)",
        cbse: "85% - 95% aggregate in best 4 academic subjects"
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
        deposit: "AUD $17,000 (1st semester fee deposit to issue CoE)"
      },
      coursePrerequisites: [
        "Mathematics Methods or Specialist Mathematics (for CS, Commerce, Science)",
        "Chemistry / Biology (for Biomedicine & Science prerequisites)",
        "Minimum VCE Study Score of 25 in English / EAL equivalent"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official High School Transcripts & Graduation Certificate (certified English translation)", type: "pdf", required: true },
        { id: "english_test", label: "Valid English Language Test Result (IELTS / PTE / TOEFL — taken within 2 years)", type: "pdf", required: true },
        { id: "passport", label: "Copy of Passport Bio-Page (valid for at least 6 months)", type: "pdf,image", required: true },
        { id: "gs_statement", label: "Genuine Student (GS) Written Statement addressing Home Affairs criteria", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Support Evidence (Proof of AUD $29,710/yr living costs + tuition + AUD $2,000 travel)", type: "pdf", required: true },
        { id: "oshc", label: "Overseas Student Health Cover (OSHC) Confirmation (Medibank / Allianz / Bupa)", type: "pdf", required: false },
        { id: "cv", label: "CV / Resume (if applicable)", type: "pdf", required: false }
      ],
      description: "Ranked #1 in Australia, Melbourne University is renowned for the 'Melbourne Model' undergraduate structure, vibrant Parkville campus, world-leading research institutes, and exceptional graduate employability."
    },

    {
      id: "usyd",
      name: "The University of Sydney",
      shortName: "USYD",
      type: "university",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      providerCode: "CRICOS: 00026A",
      isElite: true,
      eliteGroup: "Group of Eight (Go8)",
      worldRank: 18,
      acceptanceRate: 68.0,
      minGpa: 3.45,
      minIelts: 6.5,
      minPte: 61,
      atarEquivalent: 83,
      tuitionLocal: 48500,
      tuitionCurrency: "AUD",
      image: "assets/images/usyd.png",
      tags: ["Group of Eight (Go8)", "Iconic Sandstone Campus", "Sydney Quadrangle", "CRICOS: 00026A"],
      programs: ["Bachelor of Advanced Computing", "Bachelor of Commerce", "Medicine & Health", "Architecture", "Law"],
      intakes: ["Semester 1 (Feb/March)", "Semester 2 (July)"],
      sem1Deadline: "2026-12-15",
      sem2Deadline: "2026-06-15",
      academicRequirements: {
        atar: "83.00+ (Commerce 95.00, Advanced Computing 90.00, Law 99.50)",
        ib: "30 - 40 points depending on program",
        aLevels: "13 - 17 points across best 3 or 4 subjects",
        sat: "SAT 1320+ (or ACT 28+) with high school transcript",
        cbse: "83% - 95% overall average"
      },
      englishRequirements: {
        ielts: "6.5 overall (no individual band lower than 6.0)",
        pte: "61 overall (no communicative skill below 54)",
        toefl: "85 overall (Writing 19, Reading 17, Listening 17, Speaking 17)",
        cambridge: "176 overall with no band lower than 169",
        notes: "Law, Veterinary Science & Health Sciences require IELTS 7.0 - 7.5 overall."
      },
      applicationPortal: {
        portalName: "Sydney Student Direct Portal / UAC",
        fee: "AUD $150 application processing fee",
        deposit: "AUD $18,000 (First semester fee deposit)"
      },
      coursePrerequisites: [
        "Mathematics Advanced / Extension 1 (for Computer Science, Engineering, Commerce)",
        "Assumed knowledge in HSC Science for health/biomedical degrees"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official High School Academic Transcripts & Completion Certificate", type: "pdf", required: true },
        { id: "english_test", label: "English Language Test Score Report (IELTS Academic / PTE Academic)", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio Page Copy", type: "pdf,image", required: true },
        { id: "gs_statement", label: "Subclass 500 Genuine Student (GS) Assessment Form & Supporting Statement", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Proof of Living Funds (AUD $29,710/yr + Tuition)", type: "pdf", required: true },
        { id: "oshc", label: "OSHC Health Insurance Certificate", type: "pdf", required: false }
      ],
      description: "Australia's first university, USYD features the world-famous Quadrangle building, strong industry partnerships in Sydney's CBD, and extensive global exchange opportunities."
    },

    {
      id: "unsw",
      name: "UNSW Sydney (University of New South Wales)",
      shortName: "UNSW",
      type: "university",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      providerCode: "CRICOS: 00098G",
      isElite: true,
      eliteGroup: "Group of Eight (Go8)",
      worldRank: 19,
      acceptanceRate: 65.0,
      minGpa: 3.4,
      minIelts: 6.5,
      minPte: 64,
      atarEquivalent: 84,
      tuitionLocal: 49000,
      tuitionCurrency: "AUD",
      image: "assets/images/unsw.png",
      tags: ["Group of Eight (Go8)", "Engineering Titan", "UNSW 3+ Trimester", "CRICOS: 00098G"],
      programs: ["Computer Science (AI Specialisation)", "Quantum Engineering", "Finance & Fintech", "Photovoltaics"],
      intakes: ["T1 (February)", "T2 (May/June)", "T3 (September)"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-30",
      academicRequirements: {
        atar: "84.00+ (Engineering 90.00, Computer Science 91.00, Commerce 93.00)",
        ib: "31 - 39 points",
        aLevels: "13 - 17 points",
        sat: "SAT 1300+ / ACT 27+",
        cbse: "84% - 93% aggregate"
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
        deposit: "AUD $18,500 (1st trimester deposit for CoE)"
      },
      coursePrerequisites: [
        "Mathematics Extension 1 or Extension 2 (for CS and Quantum Engineering)",
        "Physics / Chemistry for specialized engineering streams",
        "Portfolio Submission (for UNSW Art, Design & Architecture programs)"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Certified High School Academic Transcripts & Certificate", type: "pdf", required: true },
        { id: "english_test", label: "Official English Language Test Results", type: "pdf", required: true },
        { id: "passport", label: "Passport copy", type: "pdf,image", required: true },
        { id: "gs_statement", label: "UNSW Genuine Student (GS) Financial & Intent Questionnaire", type: "pdf", required: true },
        { id: "financial_proof", label: "Evidence of Financial Capacity (AUD $29,710/yr standard living costs)", type: "pdf", required: true },
        { id: "oshc", label: "OSHC Insurance Confirmation", type: "pdf", required: false }
      ],
      description: "UNSW Sydney is a powerhouse for engineering, solar energy research, tech entrepreneurship, and computer science, operating under the flexible UNSW 3+ trimester model."
    },

    {
      id: "anu",
      name: "Australian National University",
      shortName: "ANU",
      type: "university",
      country: "Australia",
      state: "Australian Capital Territory",
      city: "Canberra, ACT",
      providerCode: "CRICOS: 00120C",
      isElite: true,
      eliteGroup: "Group of Eight (Go8)",
      worldRank: 30,
      acceptanceRate: 60.0,
      minGpa: 3.5,
      minIelts: 6.5,
      minPte: 64,
      atarEquivalent: 82,
      tuitionLocal: 45000,
      tuitionCurrency: "AUD",
      image: "assets/images/anu.png",
      tags: ["Group of Eight (Go8)", "National Capital Uni", "Policy & Cyber", "CRICOS: 00120C"],
      programs: ["Advanced Computing (R&D)", "International Relations", "Cyber Security", "Physics & Astronomy"],
      intakes: ["Semester 1 (Feb)", "Semester 2 (July)"],
      sem1Deadline: "2026-12-01",
      sem2Deadline: "2026-05-15",
      academicRequirements: {
        atar: "82.00+ (Advanced Computing 90.00, Law 97.00)",
        ib: "29 - 37 points",
        aLevels: "12 - 16 points",
        sat: "SAT 1340+ / ACT 29+",
        cbse: "80% - 90% aggregate"
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
        deposit: "AUD $16,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "Advanced Mathematics / Calculus (for Advanced Computing R&D)",
        "Physics / Chemistry for Advanced Science programs"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Certified High School Academic Transcripts & Diploma", type: "pdf", required: true },
        { id: "english_test", label: "English Language Test Report", type: "pdf", required: true },
        { id: "cocurricular", label: "ANU Co-curricular & Service Requirement Form", type: "pdf", required: true },
        { id: "gs_statement", label: "Genuine Student (GS) Written Statement", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Capability Documentation (AUD $29,710/yr living expense standard)", type: "pdf", required: true },
        { id: "passport", label: "Passport copy & OSHC policy", type: "pdf,image", required: true }
      ],
      description: "Located in Australia's capital Canberra, ANU is the national research university closely aligned with federal science agencies, national security centers, and global diplomacy."
    },

    {
      id: "uq",
      name: "The University of Queensland",
      shortName: "UQ",
      type: "university",
      country: "Australia",
      state: "Queensland",
      city: "Brisbane, QLD",
      providerCode: "CRICOS: 00025B",
      isElite: true,
      eliteGroup: "Group of Eight (Go8)",
      worldRank: 40,
      acceptanceRate: 72.0,
      minGpa: 3.3,
      minIelts: 6.5,
      minPte: 64,
      atarEquivalent: 78,
      tuitionLocal: 44000,
      tuitionCurrency: "AUD",
      image: "assets/images/uq.png",
      tags: ["Group of Eight (Go8)", "Subtropical St Lucia Campus", "Biotech Leadership", "CRICOS: 00025B"],
      programs: ["Software Engineering", "Biotechnology", "Environmental Management", "Marine Science"],
      intakes: ["Semester 1 (Feb)", "Semester 2 (July)"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-31",
      academicRequirements: {
        atar: "78.00+ (Commerce 82.00, Engineering 86.00)",
        ib: "28 - 36 points",
        aLevels: "10 - 14 points",
        sat: "SAT 1280+ / ACT 27+",
        cbse: "78% - 88% aggregate"
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
        deposit: "AUD $15,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "Mathematical Methods / Specialist Mathematics (for Engineering & IT)",
        "Chemistry / Physics / Biology (for Science & Biotech streams)"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Certified High School Graduation Certificate & Transcripts", type: "pdf", required: true },
        { id: "english_test", label: "Valid English Language Test Result", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio Page Copy", type: "pdf,image", required: true },
        { id: "gs_statement", label: "Genuine Student (GS) Questionnaire & Statement", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Proof (Bank Statement showing AUD $29,710/yr living costs + tuition)", type: "pdf", required: true },
        { id: "oshc", label: "OSHC Health Insurance Certificate", type: "pdf", required: false }
      ],
      description: "UQ boasts a stunning campus along the Brisbane River in sunny Queensland, recognized globally for vaccine development, bioengineering, and clean technology."
    },

    {
      id: "monash",
      name: "Monash University",
      shortName: "Monash",
      type: "university",
      country: "Australia",
      state: "Victoria",
      city: "Melbourne, VIC",
      providerCode: "CRICOS: 00008C",
      isElite: true,
      eliteGroup: "Group of Eight (Go8)",
      worldRank: 42,
      acceptanceRate: 75.0,
      minGpa: 3.25,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 75,
      tuitionLocal: 43500,
      tuitionCurrency: "AUD",
      image: "assets/images/monash.png",
      tags: ["Group of Eight (Go8)", "Pharmacy & CS Leader", "Global Campuses", "CRICOS: 00008C"],
      programs: ["Computer Science", "Pharmacy & Pharmaceutical Sciences", "Banking & Finance", "Robotics"],
      intakes: ["Semester 1 (Feb/March)", "Semester 2 (July)"],
      sem1Deadline: "2026-12-01",
      sem2Deadline: "2026-06-01",
      academicRequirements: {
        atar: "75.00+ (CS 80.00, Pharmacy 84.00, Engineering 87.00)",
        ib: "26 - 35 points",
        aLevels: "9 - 14 points",
        sat: "SAT 1260+ / ACT 26+",
        cbse: "75% - 85% aggregate"
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
        deposit: "AUD $15,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "Higher Mathematics (Mathematical Methods or Specialist Math) for CS & Engineering",
        "Chemistry & Biology for Pharmacy & Medical Science"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Certified High School Transcripts & Certificate of Completion", type: "pdf", required: true },
        { id: "english_test", label: "Official English Language Test Score", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio Page Copy", type: "pdf,image", required: true },
        { id: "gs_statement", label: "Subclass 500 Visa Genuine Student (GS) Documentation", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Capacity Declaration (AUD $29,710/yr living costs)", type: "pdf", required: true },
        { id: "oshc", label: "OSHC Health Insurance Certificate", type: "pdf", required: false }
      ],
      description: "Australia's largest university, Monash is celebrated for world #2 rankings in Pharmacy, cutting-edge AI labs, and expansive global alliance programs."
    },

    {
      id: "uts",
      name: "University of Technology Sydney",
      shortName: "UTS",
      type: "university",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      providerCode: "CRICOS: 00099F",
      isElite: false,
      eliteGroup: null,
      worldRank: 88,
      acceptanceRate: 78.0,
      minGpa: 3.1,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 72,
      tuitionLocal: 41000,
      tuitionCurrency: "AUD",
      image: "assets/images/uts.png",
      tags: ["Tech Precinct", "Sydney Tech Central", "High Employability", "CRICOS: 00099F"],
      programs: ["Cyber Security", "Data Science & AI", "Games Development", "Design & Architecture"],
      intakes: ["Semester 1 (Feb/March)", "Semester 2 (July)"],
      sem1Deadline: "2026-12-15",
      sem2Deadline: "2026-06-15",
      academicRequirements: {
        atar: "72.00+ (IT/CS 80.00, Business 82.00, Engineering 80.00)",
        ib: "25 - 31 points",
        aLevels: "8 - 12 points",
        sat: "SAT 1220+ / ACT 25+",
        cbse: "72% - 82% aggregate"
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
        deposit: "AUD $14,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "HSC Mathematics Advanced (for IT, Data Science, and Engineering)",
        "Design Portfolio / Reel (for Bachelor of Design in Animation / Architecture)"
      ],
      requiredDocuments: [
        { id: "transcript", label: "High School Transcripts & Completion Certificate", type: "pdf", required: true },
        { id: "english_test", label: "English Language Test Score", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio Page", type: "pdf,image", required: true },
        { id: "portfolio", label: "Design Portfolio / Digital Reel (Design applicants only)", type: "pdf", required: false },
        { id: "gs_statement", label: "Genuine Student (GS) Assessment Form", type: "pdf", required: true },
        { id: "oshc", label: "OSHC Insurance Confirmation", type: "pdf", required: false }
      ],
      description: "Located right in Sydney's innovative Tech Central precinct, UTS delivers hands-on industry practice, state-of-the-art Frank Gehry architecture, and strong startup accelerators."
    },

    {
      id: "rmit",
      name: "RMIT University",
      shortName: "RMIT",
      type: "university",
      country: "Australia",
      state: "Victoria",
      city: "Melbourne, VIC",
      providerCode: "CRICOS: 00122A",
      isElite: false,
      eliteGroup: null,
      worldRank: 123,
      acceptanceRate: 82.0,
      minGpa: 3.0,
      minIelts: 6.5,
      minPte: 58,
      atarEquivalent: 68,
      tuitionLocal: 37500,
      tuitionCurrency: "AUD",
      image: "assets/images/rmit.png",
      tags: ["Design & Innovation", "Melbourne City Campus", "Work Integrated Learning", "CRICOS: 00122A"],
      programs: ["Information Technology", "Digital Media & Design", "Aviation", "Software Engineering"],
      intakes: ["Semester 1 (Feb/March)", "Semester 2 (July)"],
      sem1Deadline: "2026-12-20",
      sem2Deadline: "2026-06-20",
      academicRequirements: {
        atar: "68.00+ (IT 65.00, Business 70.00, Engineering 75.00)",
        ib: "24 - 29 points",
        aLevels: "7 - 11 points",
        sat: "SAT 1180+ / ACT 24+",
        cbse: "68% - 78% aggregate"
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
        deposit: "AUD $13,000 (1st semester deposit)"
      },
      coursePrerequisites: [
        "VCE Mathematical Methods or equivalent for IT & Software Engineering",
        "Folio / Creative Selection Task for Architecture, Fashion, Fine Art, Game Design"
      ],
      requiredDocuments: [
        { id: "transcript", label: "High School Transcripts & Certificate of Completion", type: "pdf", required: true },
        { id: "english_test", label: "Official English Proficiency Certificate", type: "pdf", required: true },
        { id: "portfolio", label: "Creative Folio / Selection Task Submission (for Design / Media programs)", type: "pdf", required: false },
        { id: "passport", label: "Passport Bio-Page Copy", type: "pdf,image", required: true },
        { id: "gs_statement", label: "Subclass 500 Genuine Student (GS) Verification Form", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Evidence (AUD $29,710/yr living costs + tuition)", type: "pdf", required: true }
      ],
      description: "A global university of technology, design, and enterprise based in central Melbourne, famous for industry placements and creative technological innovation."
    },

    // ─── NEW ZEALAND UNIVERSITIES ─────────────────────────────────
    {
      id: "auckland",
      name: "University of Auckland",
      shortName: "UoA",
      type: "university",
      country: "New Zealand",
      state: "Auckland",
      city: "Auckland",
      providerCode: "NZQA: 5601",
      isElite: true,
      eliteGroup: "NZ #1 Ranked",
      worldRank: 68,
      acceptanceRate: 65.0,
      minGpa: 3.3,
      minIelts: 6.0,
      minPte: 50,
      atarEquivalent: 80,
      tuitionLocal: 45000,
      tuitionCurrency: "NZD",
      image: "assets/images/auckland.png",
      tags: ["NZ #1 University", "QS Top 100", "Research Intensive", "NZQA: 5601"],
      programs: ["Computer Science", "Engineering", "Business & Commerce", "Law", "Health Sciences"],
      intakes: ["Semester 1 (February)", "Semester 2 (July)"],
      sem1Deadline: "2026-12-08",
      sem2Deadline: "2026-05-31",
      academicRequirements: {
        atar: "80.00+ equivalent (Engineering 87.00, Law 92.00)",
        ib: "26 - 37 points depending on program",
        aLevels: "9 - 16 points across best 3 subjects",
        sat: "SAT 1250+ / ACT 26+",
        cbse: "78% - 92% aggregate"
      },
      englishRequirements: {
        ielts: "6.0 overall (no band lower than 5.5) — 6.5 for graduate entry",
        pte: "50 overall (no communicative skill below 42)",
        toefl: "80 overall (Writing 21)",
        cambridge: "169 overall",
        notes: "Education, Health, Law programs require IELTS 7.0+. English pathway via ELA accepted."
      },
      applicationPortal: {
        portalName: "University of Auckland Online Application Portal",
        fee: "NZD $0 (no application fee)",
        deposit: "NZD $10,000 (tuition fee deposit)"
      },
      coursePrerequisites: [
        "NCEA Level 3 with University Entrance or international equivalent",
        "Calculus / Statistics for Engineering, Commerce, and Science",
        "Portfolio / Audition for Creative Arts & Music"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official Academic Transcripts & Secondary School Certificate", type: "pdf", required: true },
        { id: "english_test", label: "English Proficiency Test Result (IELTS / PTE / TOEFL)", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio-Page Copy", type: "pdf,image", required: true },
        { id: "personal_statement", label: "Personal Statement / Statement of Purpose", type: "pdf", required: false },
        { id: "financial_proof", label: "Evidence of Funds (NZD $20,000/yr living costs + tuition)", type: "pdf", required: true },
        { id: "insurance", label: "Medical & Travel Insurance (or agreement to purchase UoA group policy)", type: "pdf", required: false }
      ],
      description: "New Zealand's highest-ranked university and a member of Universitas 21, UoA is a comprehensive research university in the heart of Auckland with world-class engineering and medicine programs."
    },

    {
      id: "otago",
      name: "University of Otago",
      shortName: "Otago",
      type: "university",
      country: "New Zealand",
      state: "Otago",
      city: "Dunedin",
      providerCode: "NZQA: 5810",
      isElite: true,
      eliteGroup: "NZ's Oldest University",
      worldRank: 217,
      acceptanceRate: 70.0,
      minGpa: 3.0,
      minIelts: 6.0,
      minPte: 50,
      atarEquivalent: 75,
      tuitionLocal: 35000,
      tuitionCurrency: "NZD",
      image: "assets/images/otago.png",
      tags: ["NZ's Oldest University", "Medical School Leader", "Campus Culture", "NZQA: 5810"],
      programs: ["Medicine & Health Sciences", "Dentistry", "Biomedical Sciences", "Psychology", "Computer Science"],
      intakes: ["Semester 1 (February)", "Semester 2 (July)"],
      sem1Deadline: "2026-10-15",
      sem2Deadline: "2026-04-30",
      academicRequirements: {
        atar: "75.00+ equivalent (Health Sciences 88.00+)",
        ib: "24 - 33 points",
        aLevels: "8 - 14 points",
        sat: "SAT 1200+ / ACT 25+",
        cbse: "75% - 88% aggregate"
      },
      englishRequirements: {
        ielts: "6.0 overall (no band lower than 5.5)",
        pte: "50 overall (minimum 42 in all skills)",
        toefl: "80 overall (Writing 20)",
        cambridge: "169 overall",
        notes: "Health Sciences First Year (HSFY) and Dentistry require IELTS 7.0 minimum."
      },
      applicationPortal: {
        portalName: "Otago Online Application Portal",
        fee: "NZD $0",
        deposit: "NZD $8,000 tuition fee deposit"
      },
      coursePrerequisites: [
        "NCEA Level 3 University Entrance or equivalent",
        "Chemistry, Biology, and Physics for Health Sciences programs",
        "Mathematics for Science and Commerce degrees"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official Academic Transcripts & School Leaving Certificate", type: "pdf", required: true },
        { id: "english_test", label: "English Proficiency Test Score Report", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio-Page Copy", type: "pdf,image", required: true },
        { id: "financial_proof", label: "Financial Evidence (NZD $20,000/yr living costs + tuition fees)", type: "pdf", required: true },
        { id: "cv", label: "CV / Resume (for postgraduate applicants)", type: "pdf", required: false },
        { id: "insurance", label: "Medical & Travel Insurance Documentation", type: "pdf", required: false }
      ],
      description: "New Zealand's oldest university, Otago is famous for its vibrant residential campus in Dunedin, world-leading medical and health science programs, and strong student culture."
    },

    {
      id: "victoria",
      name: "Victoria University of Wellington",
      shortName: "VUW",
      type: "university",
      country: "New Zealand",
      state: "Wellington",
      city: "Wellington",
      providerCode: "NZQA: 5764",
      isElite: false,
      eliteGroup: null,
      worldRank: 241,
      acceptanceRate: 72.0,
      minGpa: 2.8,
      minIelts: 6.0,
      minPte: 50,
      atarEquivalent: 72,
      tuitionLocal: 33000,
      tuitionCurrency: "NZD",
      image: "assets/images/victoria.png",
      tags: ["NZ Capital City", "Law & Policy Hub", "Creative Arts", "NZQA: 5764"],
      programs: ["Law", "International Relations", "Computer Science", "Architecture", "Film & Media"],
      intakes: ["Trimester 1 (March)", "Trimester 2 (July)", "Trimester 3 (November)"],
      sem1Deadline: "2026-12-01",
      sem2Deadline: "2026-05-15",
      academicRequirements: {
        atar: "72.00+ (Law 85.00+)",
        ib: "24 - 30 points",
        aLevels: "7 - 12 points",
        sat: "SAT 1150+ / ACT 24+",
        cbse: "70% - 85% aggregate"
      },
      englishRequirements: {
        ielts: "6.0 overall (no band lower than 5.5)",
        pte: "50 overall (42 minimum per skill)",
        toefl: "80 overall (Writing 20)",
        cambridge: "169 overall",
        notes: "Law and Teacher Education require IELTS 7.0+."
      },
      applicationPortal: {
        portalName: "Victoria Online International Application",
        fee: "NZD $0",
        deposit: "NZD $7,500 tuition fee deposit"
      },
      coursePrerequisites: [
        "NCEA Level 3 University Entrance or international equivalent",
        "Mathematics for Engineering and Science programs"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official Academic Transcripts & Certificates", type: "pdf", required: true },
        { id: "english_test", label: "English Proficiency Evidence", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio-Page Copy", type: "pdf,image", required: true },
        { id: "financial_proof", label: "Financial Evidence (NZD $20,000/yr living + tuition)", type: "pdf", required: true },
        { id: "insurance", label: "Medical & Travel Insurance", type: "pdf", required: false }
      ],
      description: "Located in New Zealand's capital city, VUW is renowned for its law school, international relations programs, close ties to NZ government and creative arts scene."
    },

    {
      id: "canterbury",
      name: "University of Canterbury",
      shortName: "UC",
      type: "university",
      country: "New Zealand",
      state: "Canterbury",
      city: "Christchurch",
      providerCode: "NZQA: 5103",
      isElite: false,
      eliteGroup: null,
      worldRank: 256,
      acceptanceRate: 78.0,
      minGpa: 2.7,
      minIelts: 6.0,
      minPte: 50,
      atarEquivalent: 70,
      tuitionLocal: 32000,
      tuitionCurrency: "NZD",
      image: "assets/images/canterbury.png",
      tags: ["Engineering Strength", "Christchurch Campus", "Post-Quake Rebuild", "NZQA: 5103"],
      programs: ["Engineering (Civil, Mechanical, Software)", "Forestry", "Data Science", "Education"],
      intakes: ["Semester 1 (February)", "Semester 2 (July)"],
      sem1Deadline: "2026-10-15",
      sem2Deadline: "2026-04-15",
      academicRequirements: {
        atar: "70.00+ (Engineering 78.00+)",
        ib: "24 - 28 points",
        aLevels: "7 - 11 points",
        sat: "SAT 1100+ / ACT 23+",
        cbse: "70% - 82% aggregate"
      },
      englishRequirements: {
        ielts: "6.0 overall (no band lower than 5.5)",
        pte: "50 overall (42 minimum per skill)",
        toefl: "80 overall (Writing 19)",
        cambridge: "169 overall",
        notes: "Education and Speech & Language Therapy require IELTS 7.0."
      },
      applicationPortal: {
        portalName: "UC International Online Application",
        fee: "NZD $0",
        deposit: "NZD $7,000 tuition fee deposit"
      },
      coursePrerequisites: [
        "NCEA Level 3 or international equivalent",
        "Mathematics and Physics for Engineering programs"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official Academic Transcripts & School Completion Certificate", type: "pdf", required: true },
        { id: "english_test", label: "English Language Test Score", type: "pdf", required: true },
        { id: "passport", label: "Passport Copy", type: "pdf,image", required: true },
        { id: "financial_proof", label: "Proof of Financial Support (NZD $20,000/yr + tuition)", type: "pdf", required: true },
        { id: "insurance", label: "Medical & Travel Insurance", type: "pdf", required: false }
      ],
      description: "Situated in Christchurch with views of the Southern Alps, UC is known for its strong engineering programs, beautiful campus, and innovative post-earthquake rebuild approach."
    },

    {
      id: "aut",
      name: "Auckland University of Technology",
      shortName: "AUT",
      type: "university",
      country: "New Zealand",
      state: "Auckland",
      city: "Auckland",
      providerCode: "NZQA: 5806",
      isElite: false,
      eliteGroup: null,
      worldRank: 407,
      acceptanceRate: 82.0,
      minGpa: 2.5,
      minIelts: 6.0,
      minPte: 50,
      atarEquivalent: 65,
      tuitionLocal: 31000,
      tuitionCurrency: "NZD",
      image: "assets/images/aut.png",
      tags: ["NZ's Fastest Growing", "Industry Connected", "Creative Tech", "NZQA: 5806"],
      programs: ["Creative Technologies", "Sport & Recreation", "Hospitality Management", "Computer & Info Sciences"],
      intakes: ["Semester 1 (February)", "Semester 2 (July)"],
      sem1Deadline: "2026-11-30",
      sem2Deadline: "2026-05-31",
      academicRequirements: {
        atar: "65.00+",
        ib: "24+ points",
        aLevels: "7+ points",
        sat: "SAT 1050+ / ACT 22+",
        cbse: "65% - 78% aggregate"
      },
      englishRequirements: {
        ielts: "6.0 overall (no band lower than 5.5)",
        pte: "50 overall (42 minimum per skill)",
        toefl: "80 overall (Writing 19)",
        cambridge: "169 overall",
        notes: "Health Sciences and Education require IELTS 6.5 - 7.0."
      },
      applicationPortal: {
        portalName: "AUT International Online Application",
        fee: "NZD $0",
        deposit: "NZD $6,500 tuition fee deposit"
      },
      coursePrerequisites: [
        "NCEA Level 3 University Entrance or international equivalent",
        "Design Portfolio (for Creative Technology programs)"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Official Academic Transcripts & Certificates", type: "pdf", required: true },
        { id: "english_test", label: "English Language Proficiency Results", type: "pdf", required: true },
        { id: "passport", label: "Passport Bio-Page Copy", type: "pdf,image", required: true },
        { id: "financial_proof", label: "Evidence of Funds (NZD $20,000/yr + tuition)", type: "pdf", required: true },
        { id: "cv", label: "CV / Resume (recommended)", type: "pdf", required: false },
        { id: "insurance", label: "Medical & Travel Insurance", type: "pdf", required: false }
      ],
      description: "New Zealand's fastest-growing university, AUT is industry-connected with modern Auckland CBD and South campuses, strong in creative tech, hospitality, and health sciences."
    },

    // ─── LANGUAGE SCHOOLS / PATHWAY PROGRAMS ──────────────────────
    {
      id: "navitas-au",
      name: "Navitas — University Pathway Programs",
      shortName: "Navitas",
      type: "language",
      country: "Australia",
      state: "Multiple",
      city: "Sydney, Melbourne, Adelaide, Perth",
      providerCode: "CRICOS: Multiple Colleges",
      isElite: false,
      eliteGroup: "Pathway Provider",
      worldRank: null,
      acceptanceRate: 90.0,
      minGpa: 2.5,
      minIelts: 5.5,
      minPte: 42,
      atarEquivalent: null,
      tuitionLocal: 28000,
      tuitionCurrency: "AUD",
      image: "assets/images/language_school.png",
      tags: ["University Pathway", "Foundation Studies", "Diploma Entry", "ELICOS"],
      programs: ["Academic English (ELICOS)", "Foundation Studies", "Diploma Programs", "Pre-Master's Pathway"],
      intakes: ["Multiple intakes per year (Feb, Jun, Oct)"],
      sem1Deadline: "Rolling admissions",
      sem2Deadline: "Rolling admissions",
      academicRequirements: {
        atar: "N/A — Pathway entry from Year 11 completion",
        ib: "Minimum 18-22 points",
        aLevels: "Minimum 4-6 points",
        sat: "Not required",
        cbse: "55% - 65% aggregate"
      },
      englishRequirements: {
        ielts: "5.5 overall (no band lower than 5.0) for Foundation/Diploma",
        pte: "42 overall for Foundation; 46+ for Diploma",
        toefl: "46+ overall for Foundation entry",
        cambridge: "154 overall",
        notes: "Lower IELTS (4.5+) accepted with English for Academic Purposes (EAP) pathway pre-study."
      },
      applicationPortal: {
        portalName: "Navitas Direct Application / Agent Portal",
        fee: "AUD $0 (no application fee)",
        deposit: "AUD $8,000 - $12,000 depending on program"
      },
      coursePrerequisites: [
        "Completion of Year 11 (Foundation) or Year 12 (Diploma)",
        "No specific subject prerequisites for most programs"
      ],
      requiredDocuments: [
        { id: "transcript", label: "Academic Transcripts (Year 10, 11, 12 results)", type: "pdf", required: true },
        { id: "english_test", label: "English Proficiency (IELTS / PTE / internal test accepted)", type: "pdf", required: true },
        { id: "passport", label: "Passport Copy", type: "pdf,image", required: true },
        { id: "financial_proof", label: "Financial Evidence for Visa", type: "pdf", required: true },
        { id: "gs_statement", label: "Genuine Student Statement (for visa)", type: "pdf", required: false }
      ],
      description: "Navitas partners with leading Australian universities (Curtin, La Trobe, Western Sydney, etc.) to offer Foundation and Diploma pathway programs that guarantee entry into second year of a bachelor's degree."
    },

    {
      id: "kaplan-au",
      name: "Kaplan International Languages",
      shortName: "Kaplan",
      type: "language",
      country: "Australia",
      state: "Multiple",
      city: "Sydney, Melbourne, Brisbane, Perth, Adelaide",
      providerCode: "CRICOS: 01165D",
      isElite: false,
      eliteGroup: "Language School",
      worldRank: null,
      acceptanceRate: 95.0,
      minGpa: null,
      minIelts: 3.5,
      minPte: null,
      atarEquivalent: null,
      tuitionLocal: 380,
      tuitionCurrency: "AUD/week",
      image: "assets/images/language_school.png",
      tags: ["English Language", "IELTS Prep", "Academic English", "CRICOS: 01165D"],
      programs: ["General English", "Intensive English", "IELTS Preparation", "Academic English (EAP)", "Cambridge Exam Prep"],
      intakes: ["Every Monday (year-round rolling entry)"],
      sem1Deadline: "Rolling admissions",
      sem2Deadline: "Rolling admissions",
      academicRequirements: {
        atar: "N/A",
        ib: "N/A",
        aLevels: "N/A",
        sat: "N/A",
        cbse: "N/A"
      },
      englishRequirements: {
        ielts: "No minimum — placement test on arrival (Elementary to Advanced)",
        pte: "N/A — all levels welcome",
        toefl: "N/A",
        cambridge: "N/A",
        notes: "Students are placed into appropriate levels via Kaplan's own placement test on the first day."
      },
      applicationPortal: {
        portalName: "Kaplan International Online Application / Agent Portal",
        fee: "AUD $260 enrollment fee",
        deposit: "AUD $2,000 - $4,000 (first term fees)"
      },
      coursePrerequisites: [
        "Minimum age 16+ (18+ for some intensive programs)",
        "No prior English level required — all levels accepted"
      ],
      requiredDocuments: [
        { id: "passport", label: "Passport Copy", type: "pdf,image", required: true },
        { id: "enrollment_form", label: "Kaplan Enrollment Application Form", type: "pdf", required: true },
        { id: "financial_proof", label: "Proof of Funds for Visa (if applicable)", type: "pdf", required: true },
        { id: "insurance", label: "OSHC / Travel Insurance", type: "pdf", required: false },
        { id: "gs_statement", label: "Genuine Student Statement (for student visa)", type: "pdf", required: false }
      ],
      description: "Kaplan International offers English language courses across 5 Australian cities with year-round enrollment, flexible durations (2–52 weeks), and direct pathways into university degree programs."
    },

    {
      id: "ilsc-au",
      name: "ILSC Education Group — Australia",
      shortName: "ILSC",
      type: "language",
      country: "Australia",
      state: "Multiple",
      city: "Sydney, Melbourne, Brisbane, Adelaide",
      providerCode: "CRICOS: 02137M",
      isElite: false,
      eliteGroup: "Language School",
      worldRank: null,
      acceptanceRate: 95.0,
      minGpa: null,
      minIelts: 3.0,
      minPte: null,
      atarEquivalent: null,
      tuitionLocal: 370,
      tuitionCurrency: "AUD/week",
      image: "assets/images/language_school.png",
      tags: ["ELICOS", "University Pathway", "Vocational", "CRICOS: 02137M"],
      programs: ["General English", "Academic English", "Business English", "IELTS/Cambridge Mastery", "VET Diploma Pathway"],
      intakes: ["Monthly intake dates throughout the year"],
      sem1Deadline: "Rolling admissions",
      sem2Deadline: "Rolling admissions",
      academicRequirements: {
        atar: "N/A",
        ib: "N/A",
        aLevels: "N/A",
        sat: "N/A",
        cbse: "N/A"
      },
      englishRequirements: {
        ielts: "No minimum required — placement test on arrival",
        pte: "N/A",
        toefl: "N/A",
        cambridge: "N/A",
        notes: "Beginner to Advanced levels. EAP completion provides direct entry to partner universities."
      },
      applicationPortal: {
        portalName: "ILSC Online Application / Agent Portal",
        fee: "AUD $230 enrollment fee",
        deposit: "AUD $2,000 (first term payment)"
      },
      coursePrerequisites: [
        "Minimum age 16+",
        "No English level requirement — all levels welcome"
      ],
      requiredDocuments: [
        { id: "passport", label: "Passport Copy", type: "pdf,image", required: true },
        { id: "enrollment_form", label: "ILSC Application & Enrollment Form", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Proof for Student Visa Application", type: "pdf", required: true },
        { id: "insurance", label: "OSHC Health Cover (for student visa holders)", type: "pdf", required: false }
      ],
      description: "ILSC is a globally recognized English language school with 4 campuses in Australia, offering flexible schedules, university pathway agreements, and vocational training options."
    },

    {
      id: "nzlc",
      name: "New Zealand Language Centres (NZLC)",
      shortName: "NZLC",
      type: "language",
      country: "New Zealand",
      state: "Auckland / Wellington",
      city: "Auckland, Wellington",
      providerCode: "NZQA: 7629",
      isElite: false,
      eliteGroup: "Language School",
      worldRank: null,
      acceptanceRate: 95.0,
      minGpa: null,
      minIelts: 3.0,
      minPte: null,
      atarEquivalent: null,
      tuitionLocal: 430,
      tuitionCurrency: "NZD/week",
      image: "assets/images/language_school.png",
      tags: ["Award-Winning", "IELTS Official Centre", "NZ Language", "NZQA: 7629"],
      programs: ["General English", "IELTS Preparation", "Cambridge FCE/CAE", "Academic English (EAP)", "Business English"],
      intakes: ["Every Monday (year-round rolling entry)"],
      sem1Deadline: "Rolling admissions",
      sem2Deadline: "Rolling admissions",
      academicRequirements: {
        atar: "N/A",
        ib: "N/A",
        aLevels: "N/A",
        sat: "N/A",
        cbse: "N/A"
      },
      englishRequirements: {
        ielts: "No minimum — placement test on first day",
        pte: "N/A",
        toefl: "N/A",
        cambridge: "N/A",
        notes: "Official IELTS testing centre. All levels from Beginner to Advanced."
      },
      applicationPortal: {
        portalName: "NZLC Direct Online Application",
        fee: "NZD $250 enrollment fee",
        deposit: "NZD $1,500 (4-week minimum booking)"
      },
      coursePrerequisites: [
        "Minimum age 16+ (adult courses), 13+ (young learner programs)",
        "No prior English level required"
      ],
      requiredDocuments: [
        { id: "passport", label: "Passport Copy", type: "pdf,image", required: true },
        { id: "enrollment_form", label: "NZLC Application Form", type: "pdf", required: true },
        { id: "financial_proof", label: "Proof of Funds (for student visa if studying 14+ weeks)", type: "pdf", required: false },
        { id: "insurance", label: "Medical & Travel Insurance", type: "pdf", required: true }
      ],
      description: "Multiple award-winning English language school with campuses in Auckland and Wellington. Official IELTS and Cambridge test centre with outstanding student satisfaction ratings."
    },

    {
      id: "els-au",
      name: "ELS Universal English College",
      shortName: "ELS",
      type: "language",
      country: "Australia",
      state: "New South Wales",
      city: "Sydney, NSW",
      providerCode: "CRICOS: 00053J",
      isElite: false,
      eliteGroup: "Language School",
      worldRank: null,
      acceptanceRate: 95.0,
      minGpa: null,
      minIelts: 3.0,
      minPte: null,
      atarEquivalent: null,
      tuitionLocal: 395,
      tuitionCurrency: "AUD/week",
      image: "assets/images/language_school.png",
      tags: ["Sydney CBD", "University Pathway", "50+ Years", "CRICOS: 00053J"],
      programs: ["General English", "Academic English", "IELTS Preparation", "English for Business", "High School Preparation"],
      intakes: ["Every Monday (continuous enrollment)"],
      sem1Deadline: "Rolling admissions",
      sem2Deadline: "Rolling admissions",
      academicRequirements: {
        atar: "N/A",
        ib: "N/A",
        aLevels: "N/A",
        sat: "N/A",
        cbse: "N/A"
      },
      englishRequirements: {
        ielts: "No minimum — entry via ELS placement test",
        pte: "N/A",
        toefl: "N/A",
        cambridge: "N/A",
        notes: "Academic English completion recognized by 30+ Australian universities for direct entry."
      },
      applicationPortal: {
        portalName: "ELS Online Application",
        fee: "AUD $250 enrollment fee",
        deposit: "AUD $2,500 first term fees"
      },
      coursePrerequisites: [
        "Minimum age 16+",
        "No prior English knowledge required"
      ],
      requiredDocuments: [
        { id: "passport", label: "Passport Copy", type: "pdf,image", required: true },
        { id: "enrollment_form", label: "ELS Application Form", type: "pdf", required: true },
        { id: "financial_proof", label: "Financial Evidence (if applying for student visa)", type: "pdf", required: true },
        { id: "insurance", label: "OSHC Health Insurance Certificate", type: "pdf", required: false }
      ],
      description: "Operating for over 50 years in Sydney's CBD, ELS Universal English College offers quality English programs with direct university pathway agreements with 30+ institutions."
    }
  ],

  // ════════════════════════════════════════════════════════════════
  //  SCHOLARSHIPS — Australia + New Zealand
  // ════════════════════════════════════════════════════════════════
  scholarships: [
    {
      id: "sch-aus-awards",
      name: "Australia Awards Scholarships",
      institution: "Participating Australian Universities (Go8 & National)",
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
      institution: "The University of Melbourne",
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
      institution: "The University of Sydney",
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
      institution: "UNSW Sydney",
      country: "Australia",
      coverage: "$15,000 per year towards tuition fees",
      type: "Merit & Leadership",
      deadline: "2026-11-30",
      eligibility: "International students commencing full-time coursework degrees at UNSW Sydney.",
      description: "Offers financial support to high-caliber international students undertaking undergraduate study."
    },
    {
      id: "sch-nz-excellence",
      name: "New Zealand Excellence Awards (NZEA)",
      institution: "Participating NZ Universities",
      country: "New Zealand",
      coverage: "NZD $5,000 - $10,000 tuition fee waiver",
      type: "Merit-Based",
      deadline: "2026-03-31",
      eligibility: "International students from select countries commencing study at participating NZ universities.",
      description: "Education New Zealand funded scholarships to attract high-caliber international students to NZ institutions."
    },
    {
      id: "sch-auckland-intl",
      name: "University of Auckland International Student Excellence Scholarship",
      institution: "University of Auckland",
      country: "New Zealand",
      coverage: "NZD $10,000 per year (up to 3 years)",
      type: "Academic Merit",
      deadline: "2026-12-08",
      eligibility: "Outstanding international students commencing undergraduate degrees at UoA with strong academic records.",
      description: "Recognizes academic excellence among incoming international undergraduates at New Zealand's top-ranked university."
    },
    {
      id: "sch-otago-intl",
      name: "Otago International Excellence Scholarship",
      institution: "University of Otago",
      country: "New Zealand",
      coverage: "NZD $10,000 per year",
      type: "Academic Merit",
      deadline: "2026-10-15",
      eligibility: "High-achieving international students with strong academic records applying to Otago.",
      description: "Merit-based award for outstanding international students to study at New Zealand's oldest university."
    },
    {
      id: "sch-nz-govt",
      name: "New Zealand Government Scholarships (Manaaki)",
      institution: "All NZ Universities",
      country: "New Zealand",
      coverage: "Full Tuition + Living Allowance + Airfare + Insurance",
      type: "Government Full Ride",
      deadline: "2026-02-28",
      eligibility: "Citizens of eligible Pacific, ASEAN, and developing countries pursuing postgraduate study in NZ.",
      description: "Fully-funded government scholarships for students from developing nations to pursue postgraduate studies in New Zealand."
    }
  ]
};

// Backwards compatibility — map old references
window.UniData.universities = window.UniData.institutions.filter(i => i.type === 'university');
