const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Helper: draw decorative noise lines
// ---------------------------------------------------------------------------
function drawNoiseLines(doc, count, pageW, pageH) {
  doc.save();
  for (let i = 0; i < count; i++) {
    const x1 = Math.random() * pageW;
    const y1 = Math.random() * pageH;
    const x2 = x1 + (Math.random() - 0.5) * 120;
    const y2 = y1 + (Math.random() - 0.5) * 4;
    doc
      .strokeColor('#e0e0e0')
      .lineWidth(0.25)
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();
  }
  doc.restore();
}

// ---------------------------------------------------------------------------
// 1) Airbus Annual Report
// ---------------------------------------------------------------------------
function createAirbusReport() {
  const filePath = path.join(OUT_DIR, '01_airbus_annual_report.pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  const W = doc.page.width;
  const H = doc.page.height;
  const M = 40;

  // --- decorative noise ---
  drawNoiseLines(doc, 30, W, H);

  // --- huge header ---
  doc.fontSize(22).font('Helvetica-Bold').fillColor('#003366');
  doc.text('AIRBUS SE -- Rapport Annuel / Annual Report 2025', M, M, {
    width: W - 2 * M,
    align: 'center',
  });

  doc.moveDown(0.3);
  doc.fontSize(10).font('Helvetica').fillColor('#666666');
  doc.text(
    'Leiden, Pays-Bas | Toulouse, France | Hamburg, Deutschland',
    { align: 'center' }
  );

  // thin rule
  doc
    .strokeColor('#003366')
    .lineWidth(1.5)
    .moveTo(M, doc.y + 6)
    .lineTo(W - M, doc.y + 6)
    .stroke();
  doc.moveDown(1.2);

  // --- Two-column intro: French left, English right ---
  const colW = (W - 2 * M - 20) / 2;
  const colTop = doc.y;

  // Left column - French
  doc.fontSize(9).font('Helvetica').fillColor('#222222');
  doc.text(
    "Airbus est un leader mondial de l'aeronautique, de l'espace et des services associes. " +
      "En 2025, le chiffre d'affaires consolide s'eleve a 75,1 milliards d'euros, soit une " +
      "hausse de 6 % par rapport a l'exercice precedent. Le groupe emploie environ 134 000 " +
      "collaborateurs a travers le monde, repartis sur plus de 180 sites dans 35 pays. " +
      "Les investissements en Recherche & Developpement atteignent 3,4 milliards d'euros, " +
      "renforCant la position d'Airbus dans les technologies de pointe, y compris " +
      "l'hydrogene, l'electrification et la fabrication additive.",
    M,
    colTop,
    { width: colW, lineGap: 1.5 }
  );

  // Right column - English
  doc.fontSize(9).font('Helvetica').fillColor('#222222');
  doc.text(
    'Airbus is a global leader in aeronautics, space and related services. ' +
      'In 2025 consolidated revenue reached EUR 75.1 billion, up 6% year-on-year. ' +
      'The Group employs approximately 134,000 people worldwide across 180+ sites ' +
      'in 35 countries. R&D investments totalled EUR 3.4 billion, strengthening ' +
      "Airbus's position in cutting-edge technologies including hydrogen propulsion, " +
      'electrification and additive manufacturing. The company announced plans to ' +
      'hire 13,000 engineers in 2026 to support ramp-up activities.',
    M + colW + 20,
    colTop,
    { width: colW, lineGap: 1.5 }
  );

  // vertical divider
  doc
    .strokeColor('#cccccc')
    .lineWidth(0.5)
    .moveTo(M + colW + 10, colTop)
    .lineTo(M + colW + 10, colTop + 120)
    .stroke();

  // --- Financial table header ---
  const tableTop = colTop + 140;
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#003366');
  doc.text('Key Financial Highlights / Chiffres-cles', M, tableTop, {
    width: W - 2 * M,
  });

  doc.moveDown(0.5);

  // Table rows - intentionally misaligned via manual positioning
  const rows = [
    ['Metric / Indicateur', 'FY 2025', 'FY 2024', 'Delta'],
    ['Revenue / Chiffre d\'affaires', 'EUR 75.1B', 'EUR 70.8B', '+6.1%'],
    ['EBIT Adjusted / EBIT Ajuste', 'EUR 7.9B', 'EUR 7.2B', '+9.7%'],
    ['Net Income / Resultat Net', 'EUR 4.2B', 'EUR 3.8B', '+10.5%'],
    ['R&D Expenditure', 'EUR 3.4B', 'EUR 3.1B', '+9.7%'],
    ['Employees / Effectifs', '134,000', '130,600', '+2.6%'],
    ['Order Backlog / Carnet cmdes', '8,749 aircraft', '8,598 aircraft', '+1.8%'],
    ['Free Cash Flow', 'EUR 4.5B', 'EUR 3.6B', '+25%'],
  ];

  let tY = doc.y;
  const colWidths = [190, 90, 90, 70];
  const colStarts = [M, M + 195, M + 290, M + 385];

  rows.forEach((row, ri) => {
    const isHeader = ri === 0;
    const fontSize = isHeader ? 8.5 : 8;
    const font = isHeader ? 'Helvetica-Bold' : 'Helvetica';
    const color = isHeader ? '#003366' : '#333333';

    // Alternate row background
    if (ri > 0 && ri % 2 === 0) {
      doc.save();
      doc.rect(M - 2, tY - 1, W - 2 * M + 4, 14).fill('#f5f5f5');
      doc.restore();
    }

    row.forEach((cell, ci) => {
      doc.fontSize(fontSize).font(font).fillColor(color);
      doc.text(cell, colStarts[ci], tY, { width: colWidths[ci] });
    });

    tY += 15;
    // Intentionally add inconsistent spacing on some rows
    if (ri === 3 || ri === 5) tY += 3;
  });

  // horizontal rule below table
  doc
    .strokeColor('#cccccc')
    .lineWidth(0.5)
    .moveTo(M, tY + 4)
    .lineTo(W - M, tY + 4)
    .stroke();

  // --- Programs section, very small font ---
  tY += 18;
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#003366');
  doc.text('Programmes & Technologies', M, tY);
  tY += 18;

  doc.fontSize(8).font('Helvetica').fillColor('#444444');
  const programsText =
    'A321XLR : First delivery scheduled Q3 2025 to Aer Lingus. ' +
    'Range 4,700 nm, single-aisle efficiency benchmark. EASA Type Certificate obtained March 2025. ' +
    'Certification achieved under CS-25 Amdt 27 with full DO-178C (DAL-A) avionics SW compliance. ' +
    'Wing manufactured in Broughton (UK), FAL in Hamburg and Toulouse. ' +
    '\n\n' +
    'A350F (Freighter) : Programme launch confirmed, 2027 EIS target. ' +
    'Digital twin developed in CATIA V6 / 3DEXPERIENCE platform (Dassault Systemes). ' +
    'PLM backbone: Teamcenter (Siemens) for legacy data, migration ongoing to 3DX. ' +
    'Structural analysis performed with NASTRAN and in-house FEM tools. ' +
    '\n\n' +
    'ZEROe Hydrogen Demonstrator : Ground tests completed at Nantes facility. ' +
    'Cryogenic tank supplied by Liebherr-Aerospace. ' +
    'Euro 7 automotive emission standards referenced for ground support equipment compatibility. ' +
    'Target: first hydrogen-powered commercial aircraft by 2035. ' +
    '\n\n' +
    'Hiring Plan 2026 : 13,000 new engineering positions across all divisions. ' +
    'Focus areas: aerostructures (Nantes, Saint-Nazaire), avionics (Toulouse, Elancourt), ' +
    'digital/PLM (Bangalore, Getafe), flight physics (Bremen, Filton). ' +
    'Graduate programme expanded, partnerships with ISAE-SUPAERO, TU Munich, Cranfield.';

  doc.text(programsText, M, tY, {
    width: W - 2 * M,
    lineGap: 1.0,
    columns: 2,
    columnGap: 15,
  });

  // --- Footer with tiny disclaimers ---
  doc.fontSize(6).font('Helvetica').fillColor('#999999');
  doc.text(
    'This document is for informational purposes only and does not constitute an offer or solicitation. ' +
      'Airbus SE, Mendelweg 30, 2333 CS Leiden, Netherlands. Registered Dutch Chamber of Commerce 24288945. ' +
      'ISIN: NL0000235190. (c) 2025 Airbus SE. All rights reserved. ' +
      'Rounding differences may occur. Figures subject to audit. Page 1 of 47.',
    M,
    H - 50,
    { width: W - 2 * M, align: 'center' }
  );

  // Page number
  doc.fontSize(8).font('Helvetica').fillColor('#aaaaaa');
  doc.text('- 1 -', W / 2 - 15, H - 30);

  // More noise
  drawNoiseLines(doc, 20, W, H);

  // ---- PAGE 2 ----
  doc.addPage();
  drawNoiseLines(doc, 25, W, H);

  doc.fontSize(11).font('Helvetica-Bold').fillColor('#003366');
  doc.text('Compliance, Governance & Sustainability', M, M);
  doc.moveDown(0.6);

  doc.fontSize(8.5).font('Helvetica').fillColor('#333333');
  doc.text(
    'EASA (European Union Aviation Safety Agency) oversight governs all Airbus civil aircraft programmes. ' +
      'Military programmes fall under OCCAR (Organisation for Joint Armament Cooperation) framework. ' +
      'Avionics software developed to DO-178C standards, hardware to DO-254. ' +
      '\n\n' +
      'Cybersecurity: NIS2 Directive compliance roadmap initiated across all EU entities. ' +
      'ISO 27001 certification maintained for Airbus CyberSecurity division (Elancourt, FR). ' +
      'SOC-2 Type II for Airbus Skywise cloud platform. ' +
      '\n\n' +
      'ESG Ratings (2025): MSCI AA, Sustainalytics 18.2 (Low Risk), CDP Climate A-. ' +
      'Science-Based Targets initiative (SBTi) approved 1.5 deg C pathway. ' +
      'Scope 1+2 emissions down 14% vs 2023 baseline. ' +
      '\n\n' +
      'Governance: Board of Directors 12 members, 42% female representation. ' +
      'CEO: Guillaume Faury (since April 2019). CFO: Thomas Toepfer (since 2023). ' +
      'Registered office: Leiden, NL. Operational HQ: Toulouse, FR.',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 2.0 }
  );

  // Another tiny footer
  doc.fontSize(6).font('Helvetica').fillColor('#aaaaaa');
  doc.text(
    'CONFIDENTIAL DRAFT -- Ne pas diffuser / Do not distribute -- Page 2 of 47',
    M,
    H - 45,
    { width: W - 2 * M, align: 'center' }
  );
  doc.fontSize(8).font('Helvetica').fillColor('#aaaaaa');
  doc.text('- 2 -', W / 2 - 15, H - 30);

  doc.end();
  return new Promise((resolve) => stream.on('finish', resolve));
}

// ---------------------------------------------------------------------------
// 2) Naval Group Press Release
// ---------------------------------------------------------------------------
function createNavalGroupPress() {
  const filePath = path.join(OUT_DIR, '02_naval_group_press.pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 35 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  const W = doc.page.width;
  const H = doc.page.height;
  const M = 35;

  // --- Watermark-like repeated background text ---
  doc.save();
  doc.fontSize(42).font('Helvetica-Bold').fillColor('#f0f0f0');
  for (let y = 60; y < H; y += 110) {
    doc.text('NAVAL GROUP CONFIDENTIEL', -20, y, {
      width: W + 80,
      align: 'center',
    });
  }
  doc.restore();

  // --- Huge header ---
  doc.fontSize(24).font('Helvetica-Bold').fillColor('#0a2463');
  doc.text('NAVAL GROUP', M, M + 10, { width: W - 2 * M, align: 'center' });

  doc.fontSize(11).font('Helvetica').fillColor('#555555');
  doc.text('Communique de Presse / Press Release', {
    align: 'center',
  });
  doc.moveDown(0.2);
  doc.fontSize(9).fillColor('#888888');
  doc.text('Ref: NG-PR-2025-0847 | Paris, le 14 mars 2025', {
    align: 'center',
  });

  // thick + thin double rule
  const ruleY = doc.y + 8;
  doc
    .strokeColor('#0a2463')
    .lineWidth(2)
    .moveTo(M, ruleY)
    .lineTo(W - M, ruleY)
    .stroke();
  doc
    .strokeColor('#0a2463')
    .lineWidth(0.5)
    .moveTo(M, ruleY + 4)
    .lineTo(W - M, ruleY + 4)
    .stroke();

  doc.y = ruleY + 20;

  // --- Title of press release ---
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#0a2463');
  doc.text(
    'Naval Group accelere son plan de recrutement et renforce ses capacites de cybersecurite',
    M,
    doc.y,
    { width: W - 2 * M }
  );
  doc.moveDown(0.8);

  // --- Body text, varying sizes and spacing ---
  doc.fontSize(10).font('Helvetica').fillColor('#222222');
  doc.text(
    'Naval Group, leader europeen du naval de defense, annonce le recrutement de plus de ' +
      "500 ingenieurs et techniciens specialises pour l'annee 2025-2026, dans le cadre du " +
      'programme SNLE 3G (Sous-marin Nucleaire Lanceur d\'Engins de 3eme Generation). ' +
      'Le groupe, dont le siege social est situe a Paris et les principaux sites industriels ' +
      'a Cherbourg-en-Cotentin et Nantes/Indret, emploie actuellement 16 000 collaborateurs ' +
      "et a realise un chiffre d'affaires de 4,8 milliards d'euros en 2024.",
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 3.5 }
  );
  doc.moveDown(0.4);

  // Switch to English mid-document with different spacing
  doc.fontSize(10).font('Helvetica').fillColor('#222222');
  doc.text(
    'Naval Group, European leader in naval defence, announces the recruitment of over ' +
      '500 engineers and specialized technicians for 2025-2026, as part of the SNLE 3G ' +
      '(3rd-Generation Nuclear Ballistic Missile Submarine) programme. The group, ' +
      'headquartered in Paris with main industrial sites in Cherbourg-en-Cotentin and ' +
      'Nantes/Indret, currently employs 16,000 people and achieved revenue of EUR 4.8 billion in 2024.',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.0 }  // different line gap!
  );
  doc.moveDown(0.8);

  // --- Partnership section, crammed together ---
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#0a2463');
  doc.text('Strategic Partnership with Thales', M, doc.y);
  doc.moveDown(0.3);

  doc.fontSize(9.5).font('Helvetica').fillColor('#333333');
  doc.text(
    'Naval Group a signe un accord-cadre avec Thales pour le developpement des systemes ' +
      'de combat de nouvelle generation. Le partenariat couvre les sonars, les systemes de ' +
      'management de combat (CMS) et les solutions de guerre electronique. Thales apportera ' +
      "son expertise en matiere d'optronique et de communications securisees, tandis que " +
      "Naval Group assurera l'integration systeme au niveau plateforme.",
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 2.0 }
  );
  doc.moveDown(0.6);

  // --- Cybersecurity section ---
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#0a2463');
  doc.text('Cybersecurite & Conformite / Cybersecurity & Compliance', M, doc.y);
  doc.moveDown(0.3);

  doc.fontSize(9.5).font('Helvetica').fillColor('#333333');
  doc.text(
    'In the context of the European NIS2 Directive (Network and Information Security), ' +
      'Naval Group has initiated a comprehensive cybersecurity upgrade across all facilities. ' +
      'The company is currently pursuing ISO 27001 certification for its Cherbourg and Lorient sites, ' +
      'with target completion by Q2 2026. A dedicated Cyber Operations Center (COC) has been ' +
      'established in Ollioules (Var), staffed with 45 cybersecurity analysts. ' +
      '\n\n' +
      "L'objectif est d'atteindre la certification ISO 27001 pour l'ensemble des sites d'ici 2027. " +
      'Le groupe investit 120 millions d\'euros sur la periode 2024-2027 dans la securisation ' +
      "de ses systemes d'information et de ses systemes industriels (OT).",
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.8 }
  );
  doc.moveDown(0.5);

  // --- Engineering positions detail in weird layout ---
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#0a2463');
  doc.text('500+ Open Engineering Positions — Detail', M, doc.y);
  doc.moveDown(0.3);

  const positions = [
    ['Hydrodynamics Engineer', 'Cherbourg', '35'],
    ['Sonar Systems Architect', 'Ollioules', '20'],
    ['Nuclear Propulsion Engineer', 'Nantes/Indret', '45'],
    ['Combat System Developer (C++/Ada)', 'Ollioules', '60'],
    ['Cybersecurity Analyst (SOC)', 'Ollioules', '25'],
    ['Structural FEA Engineer', 'Cherbourg', '30'],
    ['Embedded SW Engineer (DO-178C)', 'Nantes', '55'],
    ['Project Manager — SNLE 3G', 'Paris', '15'],
    ['Quality & Certification (ISO 9001)', 'Lorient', '20'],
    ['Welding & Materials Engineer', 'Cherbourg', '40'],
    ['Supply Chain / Logistics', 'Nantes', '35'],
    ['Data Scientist (Predictive Maint.)', 'Paris/Remote', '18'],
    ['SIGINT / ELINT Specialist', 'Ollioules', '12'],
    ['Various other technical roles', 'All sites', '90+'],
  ];

  let posY = doc.y;
  const pColStarts = [M, M + 230, M + 370];
  const pColWidths = [225, 135, 70];

  // header
  ['Position / Poste', 'Site', 'Headcount'].forEach((h, i) => {
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#0a2463');
    doc.text(h, pColStarts[i], posY, { width: pColWidths[i] });
  });
  posY += 13;

  positions.forEach((row, ri) => {
    if (ri % 2 === 0) {
      doc.save();
      doc.rect(M - 2, posY - 1, W - 2 * M + 4, 12).fill('#f0f4fa');
      doc.restore();
    }
    row.forEach((cell, ci) => {
      doc.fontSize(7.5).font('Helvetica').fillColor('#333333');
      doc.text(cell, pColStarts[ci], posY, { width: pColWidths[ci] });
    });
    posY += 12;
    // Inconsistent spacing
    if (ri === 4 || ri === 9) posY += 4;
  });

  // --- Tiny legal boilerplate in 7pt ---
  doc.fontSize(7).font('Helvetica').fillColor('#999999');
  doc.text(
    "A propos de Naval Group : Naval Group est un groupe industriel francais specialise dans " +
      "l'industrie navale de defense et les energies marines renouvelables. Actionnariat : " +
      "Etat francais 62,49%, Thales 35%, salaries 1,96%, autodetention 0,55%. " +
      "Siege social : 40-42 rue du Docteur Finlay, 75015 Paris. RCS Paris 441 133 808. " +
      "Ce communique peut contenir des declarations prospectives soumises a des risques et " +
      "incertitudes. Les resultats reels peuvent differer sensiblement des previsions. " +
      "Contact presse : press@naval-group.com | +33 1 40 59 55 69",
    M,
    H - 75,
    { width: W - 2 * M, lineGap: 0.5 }
  );

  // Page number
  doc.fontSize(8).font('Helvetica').fillColor('#aaaaaa');
  doc.text('Page 1/1', W / 2 - 20, H - 30);

  doc.end();
  return new Promise((resolve) => stream.on('finish', resolve));
}

// ---------------------------------------------------------------------------
// 3) VivaTech Conference Notes
// ---------------------------------------------------------------------------
function createVivaTechNotes() {
  const filePath = path.join(OUT_DIR, '03_vivatech_conference_notes.pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  const W = doc.page.width;
  const H = doc.page.height;
  const M = 40;

  // ---- PAGE 1 ----
  doc.fontSize(18).font('Helvetica-Bold').fillColor('#6c2dc7');
  doc.text('VIVATECH 2025 — CONFERENCE NOTES', M, M, {
    width: W - 2 * M,
    align: 'center',
  });
  doc.moveDown(0.2);
  doc.fontSize(9).font('Helvetica').fillColor('#777777');
  doc.text('Paris Expo Porte de Versailles | 11-14 June 2025', {
    align: 'center',
  });
  doc.text('Notes prises par / Notes taken by: J. Martin, Strategy Dept.', {
    align: 'center',
  });
  doc.moveDown(1.0);

  // --- Dassault Systemes ---
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1a1a2e');
  doc.text('DASSAULT SYSTEMES', M, doc.y);
  doc.moveDown(0.3);

  doc.fontSize(9.5).font('Helvetica').fillColor('#333333');
  doc.text(
    '  Headquarters: Velizy-Villacoublay (78), France\n' +
      '  Employees: ~23,000 worldwide\n' +
      '  Revenue 2024: EUR 6.0B\n' +
      '  Key Platform: 3DEXPERIENCE (cloud + on-premise)\n' +
      '  CEO: Pascal Daloz (since Jan 2024)',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 2.0 }
  );
  doc.moveDown(0.5);

  doc.fontSize(9).font('Helvetica').fillColor('#444444');
  doc.text(
    'Presentation highlights:\n' +
      '    - 3DEXPERIENCE platform adoption growing 22% YoY in aerospace/defense\n' +
      '    - Partnership with Airbus on digital twin for A350F programme\n' +
      '    - CATIA V6 + SIMULIA used for virtual certification workflows\n' +
      '    - New "Industrial Metaverse" offering demoed on stage\n' +
      '       -- combines CATIA, DELMIA, ENOVIA in unified VR environment\n' +
      '       -- early adopter: Safran (landing gear digital twin)\n' +
      '    - Acquisition of Medidata (life sciences) now fully integrated\n' +
      '    - Cloud revenue now 35% of total (up from 28% in 2023)',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.0 }
  );
  doc.moveDown(0.8);

  // --- ALL CAPS messy section ---
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1a1a2e');
  doc.text('>>> SCHNEIDER ELECTRIC <<<', M, doc.y);
  doc.text('    [KEYNOTE — HALL 1, STAGE A, 12 JUNE 14:00]', M, doc.y);
  doc.moveDown(0.4);

  doc.fontSize(9.5).font('Helvetica').fillColor('#333333');
  doc.text(
    'HQ: Rueil-Malmaison (officially), major R&D center in Grenoble\n' +
      'Employees: 128,000+\n' +
      'Revenue 2024: EUR 36.4B\n' +
      'Focus: energy management, industrial automation, IoT\n' +
      'CEO: Peter Herweck',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.5 }
  );
  doc.moveDown(0.4);

  doc.fontSize(9).font('Helvetica').fillColor('#444444');
  doc.text(
    '  * EcoStruxure platform — IoT-enabled energy monitoring\n' +
      '  * Announced "Schneider Electric AI Hub" in Grenoble — 200 data scientists\n' +
      '  * Major push on sustainability: aiming carbon-neutral operations by 2030\n' +
      '  * Partnership with Microsoft Azure for edge computing in factories\n' +
      '  * New offer: "Electricity 4.0" — electrification + digitization convergence\n' +
      '  * Mentioned Euro 7 readiness for EV charging infrastructure',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.0 }
  );
  doc.moveDown(0.8);

  // --- Valeo, starts on page 1, BREAKS mid-description to page 2 ---
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1a1a2e');
  doc.text('VALEO', M, doc.y);
  doc.moveDown(0.3);

  doc.fontSize(9.5).font('Helvetica').fillColor('#333333');
  doc.text(
    'Headquarters: Paris (75), France\n' +
      'Employees: ~103,000\n' +
      'Revenue 2024: EUR 22B\n' +
      'Key area: Automotive supplier — ADAS, electrification, lighting\n' +
      'CEO: Christophe Perillat',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.5 }
  );
  doc.moveDown(0.4);

  doc.fontSize(9).font('Helvetica').fillColor('#444444');
  doc.text(
    'Conference booth + presentation notes:\n' +
      '  - Valeo is the #1 patent filer in France (1,799 patents in 2024)\n' +
      '  - ADAS / autonomous driving: LiDAR (SCALA 3), cameras, radar fusion\n' +
      '  - Demonstrated Level 3 autonomous driving system (highway pilot)\n' +
      '  - Electric powertrain: 48V mild-hybrid systems, 800V inverters',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.0 }
  );

  // Force page break mid-description
  doc.addPage();

  doc.fontSize(9).font('Helvetica').fillColor('#444444');
  doc.text(
    '  [VALEO continued from previous page]\n' +
      '  - Thermal management for EVs — heat pump systems gaining traction\n' +
      '  - Software-defined vehicle: partnership with Qualcomm on SoC integration\n' +
      '  - Valeo.ai research lab: 300+ ML engineers, published at CVPR/NeurIPS\n' +
      '  - Hiring: 1,500+ R&D positions open globally, focus on SW engineers\n' +
      '  - Competition: Continental, Bosch, ZF — but Valeo claims ADAS market lead in EU\n' +
      '  - INTERESTING: mentioned exploring defense-adjacent applications (optronics for armored vehicles)',
    M,
    M,
    { width: W - 2 * M, lineGap: 1.5 }
  );
  doc.moveDown(1.0);

  // --- OVHcloud, small company, messy formatting ---
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a1a2e');
  doc.text('OVHcloud', M, doc.y);
  doc.fontSize(8).font('Helvetica').fillColor('#888888');
  doc.text('(smaller company — booth visit only, no main stage)', M, doc.y);
  doc.moveDown(0.3);

  doc.fontSize(9).font('Helvetica').fillColor('#333333');
  doc.text(
    'HQ: Roubaix (59), France\n' +
      'Employees: ~2,800 (SMALL compared to hyperscalers)\n' +
      'Revenue 2024: EUR 0.9B\n' +
      'Focus: European sovereign cloud, dedicated servers, public cloud\n' +
      'CEO: Michel Paulin',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.5 }
  );
  doc.moveDown(0.3);

  doc.fontSize(9).font('Helvetica').fillColor('#444444');
  doc.text(
    'Notes:\n' +
      '    * Positioning heavily on "European sovereignty" narrative\n' +
      '    * SecNumCloud qualification obtained (ANSSI)\n' +
      '    * New GPU cloud offer (NVIDIA H100) for AI workloads\n' +
      '    * Competing w/ AWS, Azure, GCP — but 10x smaller\n' +
      '    * Interesting for companies needing GDPR-compliant hosting\n' +
      '    * Water-cooling tech in Roubaix DC — PUE < 1.2\n' +
      '    * NIS2 compliance already achieved',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.0 }
  );
  doc.moveDown(1.0);

  // --- ALL CAPS transition ---
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#cc0000');
  doc.text(
    '*** COMPETITOR ALERT — CAPGEMINI ENGINEERING ***',
    M,
    doc.y,
    { width: W - 2 * M }
  );
  doc.moveDown(0.3);

  doc.fontSize(9.5).font('Helvetica').fillColor('#333333');
  doc.text(
    'Capgemini Engineering (formerly Altran) had a MASSIVE booth.\n' +
      'Key observations:\n' +
      '  >> 55,000 engineers globally (they claim largest pure-play engineering firm)\n' +
      '  >> Revenue: part of Capgemini Group (EUR 22.5B total), engineering ~EUR 7B\n' +
      '  >> Pushing "Intelligent Industry" — convergence of IT + OT + engineering\n' +
      '  >> Aerospace clients: Airbus, Safran, Thales, Dassault Aviation\n' +
      '  >> Auto clients: Stellantis, Renault, BMW, VW\n' +
      '  >> Actively recruiting: 8,000 positions in France alone\n' +
      '  >> Mentioned partnership with Naval Group on submarine simulation\n' +
      '  >> THIS IS A DIRECT COMPETITOR — monitor closely',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.0 }
  );
  doc.moveDown(1.0);

  // --- Messy summary section with mixed formatting ---
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#1a1a2e');
  doc.text('SUMMARY / KEY TAKEAWAYS', M, doc.y);
  doc.moveDown(0.3);

  doc.fontSize(9).font('Helvetica').fillColor('#444444');
  doc.text(
    '1. Dassault Systemes 3DEXPERIENCE is becoming de-facto standard in aero PLM\n' +
      '2. Schneider Electric IoT play is massive — 128k employees, EUR 36B+\n' +
      '3. Valeo very aggressive on ADAS, 103k employees, EUR 22B — watch defense pivot\n' +
      '4. OVHcloud SMALL (2.8k employees, <1B EUR) but interesting sovereign cloud angle\n' +
      '5. Capgemini Engineering is the 800-lb gorilla in engineering services — THREAT\n' +
      '\n' +
      'NEXT STEPS:\n' +
      '  - Schedule follow-up meetings with Dassault Systemes (PLM eval)\n' +
      '  - Get OVHcloud pricing for SecNumCloud hosting\n' +
      '  - Analyze Capgemini Engineering service overlap with our offering\n' +
      '  - Review Valeo ADAS patents (freedom-to-operate check)',
    M,
    doc.y,
    { width: W - 2 * M, lineGap: 1.5 }
  );

  // Random footer
  doc.fontSize(6.5).font('Helvetica').fillColor('#aaaaaa');
  doc.text(
    'INTERNAL USE ONLY — DO NOT DISTRIBUTE — VivaTech 2025 Trip Report Draft v0.3 — ' +
      'Classification: C2-Internal — Printed: 18/06/2025 09:14 CET',
    M,
    H - 45,
    { width: W - 2 * M, align: 'center' }
  );
  doc.fontSize(8).font('Helvetica').fillColor('#aaaaaa');
  doc.text('p. 2', W / 2 - 10, H - 30);

  doc.end();
  return new Promise((resolve) => stream.on('finish', resolve));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Generating PDFs...');

  await Promise.all([
    createAirbusReport(),
    createNavalGroupPress(),
    createVivaTechNotes(),
  ]);

  // Verify
  const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.pdf'));
  console.log(`\nCreated ${files.length} PDF(s) in ${OUT_DIR}:`);
  files.forEach((f) => {
    const stats = fs.statSync(path.join(OUT_DIR, f));
    console.log(`  ${f}  (${(stats.size / 1024).toFixed(1)} KB)`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
