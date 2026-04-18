const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT, { recursive: true });

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────

/** Draw faint, slightly rotated watermark text across entire page */
function watermark(doc, text, opts = {}) {
  const { opacity = 0.04, fontSize = 54, angle = -35 } = opts;
  doc.save();
  doc.opacity(opacity);
  doc.fontSize(fontSize);
  doc.font('Courier');
  for (let y = -200; y < 900; y += 120) {
    for (let x = -100; x < 700; x += 320) {
      doc.save();
      doc.translate(x, y);
      doc.rotate(angle);
      doc.text(text, 0, 0, { lineBreak: false });
      doc.restore();
    }
  }
  doc.restore();
}

/** Random integer in [lo, hi] */
function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }

/** Fake SIREN (9 digits) */
function fakeSiren() {
  let s = '';
  for (let i = 0; i < 9; i++) s += randInt(0, 9);
  return s;
}

/** Fake NAF code like 2611Z */
function fakeNaf() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  return `${randInt(10, 99)}${randInt(10, 99)}${letters[randInt(0, letters.length - 1)]}`;
}


// =============================================================
// PDF 1 — 04_thales_job_listings.pdf
// =============================================================
function genThalesJobs() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 14, bottom: 10, left: 12, right: 12 },
    compress: true,
    info: {
      Title: 'Export_Offres_Thales_2026Q1_draft_v3_FINAL(2)',
      Author: 'RH-SI-Thales-Export-Bot',
      Creator: 'legacy-java-pdf-gen 1.4.2',
      Producer: 'legacy-java-pdf-gen 1.4.2',
      CreationDate: new Date('2026-03-14T08:22:00Z'),
    },
  });
  const ws = fs.createWriteStream(path.join(OUT, '04_thales_job_listings.pdf'));
  doc.pipe(ws);

  // --- Header gunk ---
  watermark(doc, 'THALES INTERNAL', { opacity: 0.03, fontSize: 48 });

  doc.font('Courier-Bold').fontSize(7.5);
  doc.text('THALES SA — Direction des Ressources Humaines — Extraction Offres Emploi', { align: 'center' });
  doc.moveDown(0.15);
  doc.font('Courier').fontSize(5.5);
  doc.text(
    'Groupe Thales | Defense & Securite | Aeronautique | Spatial | Identite & Securite Numerique | 81 000 collaborateurs | CA 18,4 Mds EUR (2025)',
    { align: 'center' }
  );
  doc.text(
    'Siege social: Tour Carpe Diem, 31 place des Corolles, 92400 Courbevoie | RCS Nanterre 552 059 024',
    { align: 'center' }
  );
  doc.moveDown(0.1);
  doc.text('Date extraction: 14/03/2026 08:22 UTC | Systeme: TalentLink v7.3.1-patch42 | Filtre: postes ouverts + pourvus < 30j', { align: 'center' });
  doc.text('AVERTISSEMENT: Ce document est confidentiel. Diffusion restreinte RH et management N-1. Ne pas transmettre en externe.', { align: 'center' });
  doc.moveDown(0.05);

  // Thin line
  doc.moveTo(12, doc.y).lineTo(583, doc.y).lineWidth(0.3).stroke('#888');
  doc.moveDown(0.15);

  // --- Column headers ---
  const cols = [
    { label: 'REF', x: 12, w: 42 },
    { label: 'INTITULE DU POSTE', x: 55, w: 175 },
    { label: 'ENTITE / BU', x: 232, w: 80 },
    { label: 'LOCALISATION', x: 314, w: 72 },
    { label: 'TYPE', x: 388, w: 32 },
    { label: 'DEPT', x: 422, w: 42 },
    { label: 'OUVERT', x: 466, w: 42 },
    { label: 'JOURS', x: 510, w: 25 },
    { label: 'STATUT', x: 537, w: 46 },
  ];

  const headerY = doc.y;
  doc.font('Courier-Bold').fontSize(5);
  cols.forEach(c => {
    doc.text(c.label, c.x, headerY, { width: c.w, lineBreak: false });
  });
  doc.moveDown(0.3);
  doc.moveTo(12, doc.y).lineTo(583, doc.y).lineWidth(0.2).stroke('#aaa');
  doc.moveDown(0.1);

  // --- Job data ---
  const jobs = [
    ['TH-2026-00412', 'Ingenieur Systemes Embarques C/C++ — Avionique', 'DMS / Avionics BU', 'Toulouse (31)', 'CDI', 'R&D Emb.', '12/01/26', '62', 'Ouvert'],
    ['TH-2026-00413', 'Architecte Cybersecurite ICS/SCADA', 'DIS / Cyber Defence', 'Paris La Defense', 'CDI', 'Cyber', '03/02/26', '39', 'Ouvert'],
    ['TH-2026-00455', 'Concepteur FPGA VHDL — Radar Bande X', 'DMS / Radar BU', 'Limours (91)', 'CDI', 'Hardware', '18/12/25', '86', 'Ouvert*'],
    ['TH-2026-00460', 'Verification DO-254 DAL A — Avionique critique', 'AVS / Safety', 'Toulouse (31)', 'CDI', 'V&V', '05/01/26', '68', 'Ouvert'],
    ['TH-2026-00478', 'Chef de Projet Regie — Systemes de Combat Naval', 'DMS / Naval', 'Brest (29)', 'Presta', 'PM Naval', '28/01/26', '45', 'Regie ext.'],
    ['TH-2026-00501', 'Developpeur Ada/SPARK — Calculateur de Vol', 'AVS / Flight Ctrl', 'Bordeaux (33)', 'CDI', 'R&D Safe', '15/02/26', '27', 'Ouvert'],
    ['TH-2026-00502', 'Data Scientist — Maintenance Predictive Rafale', 'DMS / Support', 'Merignac (33)', 'CDI', 'Data/IA', '10/02/26', '32', 'Ouvert'],
    ['TH-2026-00518', 'Ingenieur Integration Satellite — Observation', 'DMS / Space', 'Cannes (06)', 'CDI', 'Spatial', '22/02/26', '24', 'Ouvert'],
    ['TH-2026-00519', 'Responsable Equipe Test RF — Guerre Electronique', 'DMS / EW BU', 'Elancourt (78)', 'CDI', 'Test RF', '01/12/25', '103', 'Ouvert*'],
    ['TH-2026-00530', 'Architecte Logiciel Temps Reel VxWorks/INTEGRITY', 'DMS / Avionics BU', 'Toulouse (31)', 'CDI', 'Archi SW', '20/01/26', '53', 'Ouvert'],
    ['TH-2026-00534', 'Consultant Prestation Externe — Banc de Test ATE', 'SIX / Test Sys', 'Velizy (78)', 'Presta', 'Test ATE', '15/11/25', '119', 'Regie'],
    ['TH-2026-00540', 'Ingenieur Modelisation & Simulation — Optronique', 'DMS / Optronics', 'Elancourt (78)', 'CDI', 'M&S', '07/02/26', '35', 'Ouvert'],
    ['TH-2026-00548', 'Specialiste ILS/SdF — Soutien Logistique', 'DMS / Naval', 'Brest (29)', 'CDI', 'ILS', '03/03/26', '11', 'Ouvert'],
    ['TH-2026-00555', 'Tech Lead Java/Spring — Portail RH Interne', 'DIS / IT Corp', 'Meudon (92)', 'CDI', 'IT Corp', '12/02/26', '34', 'Ouvert'],
    ['TH-2026-00560', 'Ingenieur Qualification DO-178C — FMS', 'AVS / FMS BU', 'Toulouse (31)', 'CDI', 'Qualif', '25/01/26', '52', 'Ouvert'],
    ['TH-2026-00562', 'Ingenieur Surete de Fonctionnement — Ferroviaire', 'GTS / Transport', 'Paris (75)', 'CDI', 'SdF', '18/02/26', '28', 'Ouvert'],
    ['TH-2026-00568', 'Architecte Reseau Tactique — CONTACT Programme', 'DMS / C4I', 'Gennevilliers (92)', 'CDI', 'Reseau', '10/01/26', '67', 'Ouvert'],
    ['TH-2026-00575', 'Prestation Externe — Pilotage sous-traitance ASIC', 'DMS / Radar BU', 'Limours (91)', 'Presta', 'HW Mgmt', '08/12/25', '96', 'Regie ext.'],
    ['TH-2026-00580', 'Ingenieur DevSecOps — Plateforme Cloud Souverain', 'DIS / Cloud', 'Paris La Defense', 'CDI', 'DevOps', '01/03/26', '13', 'Ouvert'],
    ['TH-2026-00585', 'Concepteur Antennes — Satcom Ka/Ku', 'DMS / Space', 'Toulouse (31)', 'CDI', 'RF Ant.', '14/02/26', '32', 'Ouvert'],
    ['TH-2026-00590', 'Chef de Lot Logiciel — Systeme de Navigation', 'AVS / Navigation', 'Valence (26)', 'CDI', 'Nav SW', '28/02/26', '18', 'Ouvert'],
    ['TH-2026-00595', 'Ingenieur Signal Processing — Sonar ASM', 'DMS / Underwater', 'Sophia (06)', 'CDI', 'DSP', '06/01/26', '71', 'Ouvert'],
    ['TH-2026-00600', 'Responsable Cybersecurite OT — Infrastructures Critiques', 'DIS / Cyber OT', 'Paris (75)', 'CDI', 'Cyber OT', '19/02/26', '27', 'Ouvert'],
    ['TH-2026-00605', 'Ingenieur Banc Optique — Designation Laser', 'DMS / Optronics', 'Elancourt (78)', 'CDI', 'Test Opt', '22/01/26', '55', 'Ouvert'],
    ['TH-2026-00610', 'Consultant Regie — Migration Legacy Ada vers C++17', 'DMS / Avionics BU', 'Toulouse (31)', 'Presta', 'SW Migr', '30/11/25', '104', 'Regie'],
    ['TH-2026-00615', 'Ingenieur Machine Learning — Classification Cibles', 'DMS / ISR BU', 'Merignac (33)', 'CDI', 'ML/IA', '04/03/26', '10', 'Ouvert'],
    ['TH-2026-00620', 'Architecte Systeme — Drone Tactique MALE', 'DMS / UAV Prog', 'Bordeaux (33)', 'CDI', 'Sys Arch', '11/01/26', '62', 'Ouvert'],
    ['TH-2026-00625', 'Ingenieur Test Env — Simulation HIL/SIL', 'AVS / V&V', 'Toulouse (31)', 'CDI', 'Sim/Test', '17/02/26', '29', 'Ouvert'],
    ['TH-2026-00630', 'Product Owner — Cryptographie Post-Quantique', 'DIS / Crypto Lab', 'Gennevilliers (92)', 'CDI', 'PO Crypto', '26/02/26', '20', 'Ouvert'],
    ['TH-2026-00635', 'Ingenieur Obsolescence — Composants Electroniques', 'DMS / Comp. Eng', 'Cholet (49)', 'CDI', 'Obs Mgmt', '09/02/26', '37', 'Ouvert'],
    ['TH-2026-00640', 'Prestation Ext. — Developpement Middleware DDS', 'DMS / C4I', 'Gennevilliers (92)', 'Presta', 'MW DDS', '20/12/25', '84', 'Regie ext.'],
    ['TH-2026-00645', 'Ingenieur EMC/CEM — Compatibilite Electromagnetique', 'DMS / Radar BU', 'Limours (91)', 'CDI', 'CEM', '01/02/26', '41', 'Ouvert'],
    ['TH-2026-00650', 'Responsable Programme — Contrat Etatique DGA', 'DMS / Programs', 'Paris La Defense', 'CDI', 'Prog DGA', '23/01/26', '54', 'Ouvert'],
  ];

  // Render rows in monospace, tiny font, cramped
  doc.font('Courier').fontSize(4.8);
  let rowY = doc.y + 2;
  const lineH = 7.2;

  // Alternate shading to make parsing harder (thin grey bands)
  jobs.forEach((row, idx) => {
    if (rowY > 810) {
      doc.addPage();
      watermark(doc, 'THALES INTERNAL', { opacity: 0.03, fontSize: 48 });
      rowY = 14;
      // Re-draw header
      doc.font('Courier-Bold').fontSize(5);
      cols.forEach(c => doc.text(c.label, c.x, rowY, { width: c.w, lineBreak: false }));
      rowY += lineH;
      doc.moveTo(12, rowY).lineTo(583, rowY).lineWidth(0.2).stroke('#aaa');
      rowY += 2;
      doc.font('Courier').fontSize(4.8);
    }

    // Faint alternating band
    if (idx % 2 === 0) {
      doc.save().rect(12, rowY - 1, 571, lineH).fill('#f4f4f4').restore();
    }

    // Deliberately vary column alignment slightly on some rows to mess with parsers
    const jitter = (idx % 5 === 3) ? 1 : 0;

    doc.fillColor('#111');
    cols.forEach((c, ci) => {
      doc.text(row[ci] || '', c.x + jitter, rowY, { width: c.w - 1, lineBreak: false });
    });

    rowY += lineH;
  });

  // Footer noise
  doc.font('Courier').fontSize(4).fillColor('#888');
  rowY += 4;
  doc.text('* Poste ouvert depuis > 90 jours — escalade manager N+1 requise. Possibilite de basculement en prestation externe / regie si profil non identifie sous 30j.', 12, rowY, { width: 570 });
  rowY += 10;
  doc.text('--- FIN DE L\'EXTRACTION --- Lignes: ' + jobs.length + ' | Filtre: FR métropole + DOM-TOM | Exclu: stages, VIE, alternance | Contact: rh-si-support@thalesgroup.com', 12, rowY, { width: 570 });
  rowY += 8;
  doc.text('Ref systeme: TLINK-EXP-20260314-082200-batch47 | Checksum SHA-256: a3f1...d8e2 (tronque) | Retention: 90 jours puis archivage GED', 12, rowY, { width: 570 });

  // Hidden metadata-like text in white-on-white
  doc.fillColor('#ffffff').fontSize(1);
  doc.text('internal_tracking_id=TH-BATCH-47-CONFIDENTIAL export_class=C2 distribution=restricted sap_hr_link=0x4F3A thales_entity_code=FR-DMS-AV-001', 12, rowY + 14);

  doc.end();
  return new Promise(resolve => ws.on('finish', resolve));
}

// =============================================================
// PDF 2 — 05_pappers_financial_extract.pdf
// =============================================================
function genPappersFinancial() {
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margins: { top: 10, bottom: 8, left: 10, right: 10 },
    compress: true,
    info: {
      Title: 'pappers_export_financier_multi_20260401',
      Author: 'Pappers.fr',
      Creator: 'Pappers Export Module v2.8',
      Producer: 'wkhtmltopdf 0.12.6',
      CreationDate: new Date('2026-04-01T14:30:00Z'),
    },
  });
  const ws = fs.createWriteStream(path.join(OUT, '05_pappers_financial_extract.pdf'));
  doc.pipe(ws);

  watermark(doc, 'pappers.fr', { opacity: 0.025, fontSize: 60, angle: -30 });

  // Title bar
  doc.rect(10, 10, 822, 18).fill('#1a237e');
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#fff');
  doc.text('PAPPERS.FR — EXTRACTION DONNEES FINANCIERES — CONFIDENTIEL USAGE INTERNE', 20, 14, { lineBreak: false });
  doc.font('Helvetica').fontSize(5.5).fillColor('#ccc');
  doc.text('Date: 01/04/2026 | Licence: PRO-ENT-2026-4871 | Utilisateur: m.dupont@cabinet-xyz.fr', 450, 15, { lineBreak: false });

  let y = 34;

  // Companies data
  const companies = [
    {
      name: 'SAFRAN SA',
      siren: fakeSiren(),
      siret: null, // will compute
      naf: '3030Z',
      nafLabel: 'Construction aeronautique et spatiale',
      siege: '2 boulevard du General Martial Valin, 75015 Paris',
      forme: 'SA a conseil d\'administration',
      capital: '83 405 917,00 EUR',
      effectif: '~83 000 (tranche: 5000+)',
      sector: 'Aerospace & Defence — Propulsion, Equipements, Defence',
      rcs: 'RCS Paris 562 082 909',
      financials: [
        { year: '2025', ca: '27 316 000', res_net: '2 845 000', ebitda: '4 120 000', ebe: '3 980 000', capitaux: '12 450 000', dettes: '8 920 000', effectif: '83 200' },
        { year: '2024', ca: '23 985 000', res_net: '2 310 000', ebitda: '3 650 000', ebe: '3 480 000', capitaux: '11 200 000', dettes: '8 100 000', effectif: '79 800' },
        { year: '2023', ca: '21 450 000', res_net: '1 870 000', ebitda: '3 100 000', ebe: '2 950 000', capitaux: '10 800 000', dettes: '7 650 000', effectif: '76 500' },
      ],
      ratios: { croissance: '+13.9%', marge_nette: '10.4%', roe: '22.9%', leverage: '0.72', current: '1.18', quick: '0.87' },
      dirigeant: 'Olivier ANDRIES, Directeur General',
      cac: 'Ernst & Young / Mazars',
      comments: 'Leader mondial moteurs aeronautiques (CFM Intl JV avec GE). Forte croissance post-COVID portee par le backlog aeronautique. Acquisition Collins Aerospace rumored.',
    },
    {
      name: 'FORVIA (ex-FAURECIA SE)',
      siren: fakeSiren(),
      naf: '2932Z',
      nafLabel: 'Fabrication d\'autres equipements automobiles',
      siege: '23-27 avenue des Champs Pierreux, 92000 Nanterre',
      forme: 'SE (Societas Europaea)',
      capital: '1 379 837 396,00 EUR',
      effectif: '~150 000 (tranche: 5000+)',
      sector: 'Automotive — Seating, Interiors, Clean Mobility, Electronics, Lighting (via HELLA)',
      rcs: 'RCS Nanterre 542 005 376',
      financials: [
        { year: '2025', ca: '27 621 000', res_net: '312 000', ebitda: '2 890 000', ebe: '2 610 000', capitaux: '5 200 000', dettes: '14 800 000', effectif: '150 300' },
        { year: '2024', ca: '27 247 000', res_net: '210 000', ebitda: '2 720 000', ebe: '2 480 000', capitaux: '5 050 000', dettes: '14 400 000', effectif: '148 600' },
        { year: '2023', ca: '25 460 000', res_net: '-180 000', ebitda: '2 310 000', ebe: '2 100 000', capitaux: '4 800 000', dettes: '13 900 000', effectif: '145 200' },
      ],
      ratios: { croissance: '+1.4%', marge_nette: '1.1%', roe: '6.0%', leverage: '2.85', current: '0.92', quick: '0.61' },
      dirigeant: 'Patrick KOLLER, Directeur General',
      cac: 'Ernst & Young / Mazars',
      comments: 'Endettement eleve post-acquisition HELLA (2022). Pression sur marges automotive. Programme POWER25 de reduction couts. Risque de downgrade notation credit.',
    },
    {
      name: 'STMICROELECTRONICS NV',
      siren: fakeSiren(),
      naf: '2611Z',
      nafLabel: 'Fabrication de composants electroniques',
      siege: 'Geneva (CH) / 12 rue Jules Horowitz, 38019 Grenoble (FR ops)',
      forme: 'NV (droit neerlandais) — cotee Euronext Paris & NYSE',
      capital: '1 137 824 418,00 EUR (approx)',
      effectif: '~50 000 (tranche: 5000+)',
      sector: 'Semiconductors — Automotive MCU, Power (SiC/GaN), MEMS, Analog, Imaging',
      rcs: 'n/a (siege Amsterdam, NL) | Grenoble etab. SIRET ' + fakeSiren() + '00028',
      financials: [
        { year: '2025', ca: '17 286 000', res_net: '3 480 000', ebitda: '6 100 000', ebe: '5 800 000', capitaux: '16 700 000', dettes: '4 200 000', effectif: '50 400' },
        { year: '2024', ca: '17 286 000', res_net: '3 760 000', ebitda: '6 480 000', ebe: '6 100 000', capitaux: '15 900 000', dettes: '3 800 000', effectif: '51 100' },
        { year: '2023', ca: '16 128 000', res_net: '3 230 000', ebitda: '5 750 000', ebe: '5 400 000', capitaux: '14 200 000', dettes: '3 300 000', effectif: '49 800' },
      ],
      ratios: { croissance: '+0.0% (stable)', marge_nette: '20.1%', roe: '20.8%', leverage: '0.25', current: '2.34', quick: '1.72' },
      dirigeant: 'Jean-Marc CHERY, President Directeur General',
      cac: 'Ernst & Young / PricewaterhouseCoopers',
      comments: 'Cycle semi baissier 2025 apres pic 2023-24. Mega-fab Crolles 300mm en ramp-up. Forte exposition automotive (>35% CA). Investissements SiC Catania (Italie).',
    },
  ];

  // For each company, dump dense financial block
  companies.forEach((co, coIdx) => {
    if (coIdx > 0) {
      // NO page break — cram everything on same pages
      doc.moveTo(10, y).lineTo(832, y).lineWidth(0.5).dash(2, { space: 2 }).stroke('#666').undash();
      y += 4;
    }

    // Company header
    doc.font('Courier-Bold').fontSize(6.5).fillColor('#000');
    doc.text(`${co.name}`, 10, y, { lineBreak: false, continued: false });
    doc.font('Courier').fontSize(4.5).fillColor('#444');
    doc.text(`  SIREN: ${co.siren} | NAF: ${co.naf} (${co.nafLabel}) | ${co.rcs}`, 10 + doc.widthOfString(co.name, { font: 'Courier-Bold', fontSize: 6.5 }) + 5, y + 1, { lineBreak: false });
    y += 9;

    // Info lines — crammed together
    const infoLines = [
      `Siege: ${co.siege} | Forme: ${co.forme} | Capital: ${co.capital}`,
      `Effectif: ${co.effectif} | Secteur: ${co.sector}`,
      `Dirigeant principal: ${co.dirigeant} | CAC: ${co.cac}`,
    ];
    doc.font('Courier').fontSize(4.2).fillColor('#333');
    infoLines.forEach(line => {
      doc.text(line, 10, y, { width: 820 });
      y += 5.5;
    });
    y += 1;

    // Financial table headers
    const fCols = [
      { label: 'EXERCICE', x: 10, w: 55 },
      { label: 'CA (kEUR)', x: 67, w: 68 },
      { label: 'RES.NET (kEUR)', x: 137, w: 78 },
      { label: 'EBITDA (kEUR)', x: 217, w: 72 },
      { label: 'EBE (kEUR)', x: 291, w: 65 },
      { label: 'CAPITAUX P.', x: 358, w: 70 },
      { label: 'DETTES FIN.', x: 430, w: 68 },
      { label: 'EFFECTIF', x: 500, w: 52 },
    ];

    doc.font('Courier-Bold').fontSize(4).fillColor('#222');
    fCols.forEach(c => doc.text(c.label, c.x, y, { width: c.w, lineBreak: false }));
    y += 6;
    doc.moveTo(10, y).lineTo(555, y).lineWidth(0.15).stroke('#bbb');
    y += 1.5;

    doc.font('Courier').fontSize(4).fillColor('#111');
    co.financials.forEach(f => {
      const vals = [f.year, f.ca, f.res_net, f.ebitda, f.ebe, f.capitaux, f.dettes, f.effectif];
      fCols.forEach((c, ci) => {
        doc.text(vals[ci] || '', c.x, y, { width: c.w, lineBreak: false });
      });
      y += 5.5;
    });
    y += 1;

    // Ratios on one dense line
    doc.font('Courier').fontSize(3.8).fillColor('#555');
    const ratioStr = `Ratios (dernier exercice): Croiss.CA=${co.ratios.croissance} | Marge nette=${co.ratios.marge_nette} | ROE=${co.ratios.roe} | Leverage(D/E)=${co.ratios.leverage} | Current ratio=${co.ratios.current} | Quick ratio=${co.ratios.quick}`;
    doc.text(ratioStr, 10, y, { width: 820 });
    y += 5;

    // Comment / analyst note — tiny
    doc.font('Courier-Oblique').fontSize(3.5).fillColor('#666');
    doc.text(`Note analyste: ${co.comments}`, 10, y, { width: 820 });
    y += 9;

    // Random noise — fake previous-search terms, session ids embedded
    doc.font('Courier').fontSize(2).fillColor('#e0e0e0');
    doc.text(`session:${randInt(100000,999999)} query:"${co.name.toLowerCase()} bilan complet" cache:hit ts:${Date.now() - randInt(1000,9999)}`, 10, y, { width: 820 });
    y += 4;
  });

  // Bottom of page: dense disclaimer
  doc.font('Courier').fontSize(3).fillColor('#888');
  y += 4;
  const disclaimer = 'Source: Pappers.fr — Donnees issues des greffes des tribunaux de commerce, BODACC, INSEE, INPI. ' +
    'Les informations financieres proviennent des comptes annuels deposes. Pappers ne garantit pas l\'exactitude des donnees. ' +
    'Toute reproduction interdite sauf accord ecrit. Licence PRO-ENT valide jusqu\'au 31/12/2026. ' +
    'API endpoint: https://api.pappers.fr/v2/entreprise?siren=XXXXXXXXX&api_token=REDACTED ' +
    'Rate limit: 500 req/min | Format: PDF-EXPORT-v2.8 | Encoding: UTF-8 | Page 1/1';
  doc.text(disclaimer, 10, y, { width: 820 });

  // Hidden text
  doc.fillColor('#ffffff').fontSize(1);
  doc.text('pappers_internal_ref=EXP-20260401-143000 license_check=ok watermark_enabled=false pdf_gen=wkhtml compat_mode=legacy', 10, y + 15);

  doc.end();
  return new Promise(resolve => ws.on('finish', resolve));
}

// =============================================================
// PDF 3 — 06_usine_nouvelle_article.pdf
// =============================================================
function genUsineNouvelleArticle() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 20, bottom: 20, left: 45, right: 45 },
    compress: true,
    info: {
      Title: 'Stellantis mise sur Douvrin pour sa gigafactory batteries - L\'Usine Nouvelle',
      Author: 'L\'Usine Nouvelle — Marie-Aude Sevaux',
      Creator: 'CMS-LUN-WebToPDF 3.1',
      Producer: 'PrinceXML 15.2',
      CreationDate: new Date('2026-04-10T06:15:00Z'),
    },
  });
  const ws = fs.createWriteStream(path.join(OUT, '06_usine_nouvelle_article.pdf'));
  doc.pipe(ws);

  // ---- Page chrome / nav bar noise ----
  doc.rect(0, 0, 595, 28).fill('#c62828');
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#fff');
  doc.text("L'USINE NOUVELLE", 45, 8, { lineBreak: false });
  doc.font('Helvetica').fontSize(5.5).fillColor('#ffcdd2');
  doc.text('Accueil | Energie | Automobile | Aeronautique | Numerique | Emploi | Evenements | S\'abonner', 200, 12, { lineBreak: false });

  // Breadcrumb
  doc.font('Helvetica').fontSize(4.5).fillColor('#888');
  doc.text('usinenouvelle.com > Automobile > Vehicules electriques > Batteries', 45, 34);

  // ---- Ad banner noise ----
  doc.rect(45, 42, 505, 24).fill('#f5f5f5').stroke('#ddd');
  doc.font('Helvetica').fontSize(5).fillColor('#999');
  doc.text('[PUBLICITE] Decouvrez les solutions PLM Dassault Systemes pour l\'industrie automobile — 3DEXPERIENCE Platform — Demandez une demo', 50, 48, { width: 495 });
  doc.text('Annonceur: Dassault Systemes | Tracking: ADV-2026-04-LUN-8841 | Segment: manufacturing_decision_makers', 50, 56, { width: 495 });

  let y = 76;

  // ---- Article title ----
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#1a1a1a');
  doc.text('Stellantis mise gros sur Douvrin : une gigafactory batteries pour accelerer la transition electrique', 45, y, { width: 350 });
  y = doc.y + 6;

  // ---- Author / date line ----
  doc.font('Helvetica').fontSize(6).fillColor('#666');
  doc.text('Par Marie-Aude Sevaux | Publie le 10/04/2026 a 06:15 | Mis a jour le 10/04/2026 a 09:42 | Temps de lecture: 7 min', 45, y);
  y = doc.y + 3;
  doc.font('Helvetica').fontSize(4.5).fillColor('#999');
  doc.text('Tags: Stellantis, batteries, gigafactory, Douvrin, Hauts-de-France, vehicule electrique, BMS, ACC, emploi industrie', 45, y);
  y = doc.y + 8;

  // ---- Sidebar / pull-quote box (overlapping layout) ----
  // Draw a box on the right side
  const sideX = 400;
  const sideW = 150;
  doc.rect(sideX, y, sideW, 105).fill('#fafafa').stroke('#e0e0e0');
  doc.font('Helvetica-Bold').fontSize(5.5).fillColor('#c62828');
  doc.text('FICHE ENTREPRISE', sideX + 8, y + 5, { width: sideW - 16 });
  doc.font('Helvetica').fontSize(4.8).fillColor('#333');
  const ficheLines = [
    'Stellantis NV',
    'Siege: Amsterdam (NL)',
    'Operations FR: Poissy, Sochaux,',
    '  Rennes, Douvrin, Valenciennes',
    'PDG: Carlos Tavares (dem. 12/2024)',
    '  -> interim: comite executif',
    'Effectif monde: ~300 000',
    'CA 2025: ~189 Mds EUR',
    'Marques: Peugeot, Citroen, Fiat,',
    '  Opel, Jeep, Alfa Romeo, DS,',
    '  Maserati, Chrysler, Dodge, Ram',
    'Cote: Euronext Paris, BIT, NYSE',
    'SIREN (Peugeot SA): 552 100 554',
    'Secteur: Automobile — OEM',
    'Enjeu: transition EV 100% Europe',
    '  d\'ici 2035 (reg. UE)',
  ];
  let fy = y + 14;
  ficheLines.forEach(l => {
    doc.text(l, sideX + 8, fy, { width: sideW - 16, lineBreak: false });
    fy += 5.5;
  });

  // ---- Image placeholder ----
  doc.rect(45, y, 340, 55).fill('#e8e8e8').stroke('#ccc');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#aaa');
  doc.text('[IMAGE] Vue aerienne du site ACC de Douvrin-Billy-Berclau (Hauts-de-France)', 55, y + 18, { width: 320 });
  doc.font('Helvetica').fontSize(4).fillColor('#bbb');
  doc.text('Credit photo: Stellantis Media / ACC | Ref: IMG-2026-0410-001 | Res: 2400x1600 | Licence: editorial only', 55, y + 32, { width: 320 });
  y += 62;

  // ---- Article body ----
  const bodyFont = 'Helvetica';
  const bodySize = 7;
  doc.font(bodyFont).fontSize(bodySize).fillColor('#222');

  const paragraphs = [
    `Le groupe Stellantis a confirme jeudi 9 avril un investissement de 4,1 milliards d'euros dans l'extension de la gigafactory de Douvrin-Billy-Berclau, dans le Pas-de-Calais. Ce site, opere par Automotive Cells Company (ACC), la coentreprise formee avec TotalEnergies et Mercedes-Benz, doit atteindre une capacite de 67 GWh d'ici 2030, contre 13 GWh actuellement. L'annonce intervient alors que le constructeur, ne de la fusion PSA-FCA en 2021, cherche a securiser son approvisionnement en cellules pour tenir son engagement de 100% vehicules electriques en Europe d'ici 2035.`,

    `"Douvrin est strategique pour la souverainete industrielle europeenne", a declare le directeur de la strategie electrique de Stellantis lors d'une conference de presse a Lens. Le site, qui emploie deja 1 200 personnes, devrait voir ses effectifs tripler pour atteindre pres de 3 500 salaries d'ici fin 2028, dont environ 2 000 ingenieurs et techniciens specialises dans le developpement de cellules, le Battery Management System (BMS) et l'integration vehicule.`,

    // Ad-like noise paragraph
    `___\n[CONTENU SPONSORISE] Altair Engineering — Simulation electromagnetique et thermique pour le design de packs batteries. Optimisez vos architectures BMS avec Altair SimSolid. RDV au salon Vivatech, stand H4-320. www.altair.com/battery-simulation | Ref: SPO-LUN-2026-04-1192\n___`,

    `Parmi les profils recherches, Stellantis et ACC ciblent en priorite des ingenieurs en electrochimie, des specialistes du Battery Management System (BMS) maitrisant les normes ISO 26262 (securite fonctionnelle automobile) et des architectes logiciel embarque familiers du standard AUTOSAR. "La migration de nos stacks logiciels legacy vers AUTOSAR Adaptive est un chantier colossal", reconnait un responsable technique d'ACC. "Nous avons besoin d'ingenieurs capables de travailler sur du Classic AUTOSAR pour les controleurs bas niveau et sur Adaptive pour les fonctions connectees et le diagnostic OBD avance."`,

    `Le site de Douvrin represente un cas d'ecole de reindustrialisation. L'ancien bassin minier, durement frappe par la desindustrialisation, voit dans la gigafactory un relais de croissance majeur. La region Hauts-de-France a negocie un package d'aides de 320 millions d'euros, incluant des subventions IPCEI (Important Project of Common European Interest) et des allegements fiscaux sur dix ans. Xavier Bertrand, president de region, a salue "la plus grande implantation industrielle dans les Hauts-de-France depuis une generation".`,

    // Another noise block
    `---\n[NEWSLETTER] Recevez chaque mardi notre newsletter "Automobile & Mobilite" — Les dernieres actualites, analyses et donnees exclusives. Inscrivez-vous: usinenouvelle.com/newsletter | Desabonnement: footer | CNIL: traitement LUN-NL-004 | Responsable: Groupe Infopro Digital\n---`,

    `Sur le plan technique, les defis sont considerables. La conformite ISO 26262 jusqu'au niveau ASIL-D est requise pour les composants BMS critiques, ce qui impose des processus de developpement rigoureux avec des taux de couverture de test superieurs a 99%. "Chaque ligne de code embarque dans un calculateur BMS est potentiellement safety-critical", explique un ingenieur V&V chez ACC. La validation passe par des campagnes HIL (Hardware-in-the-Loop) et SIL (Software-in-the-Loop) qui s'etalent sur 18 a 24 mois.`,

    `Stellantis, qui a enregistre un chiffre d'affaires de 189 milliards d'euros en 2025 avec environ 300 000 collaborateurs dans le monde, fait face a une concurrence feroce des constructeurs chinois comme BYD et CATL sur le segment batteries. Le groupe a par ailleurs annonce la semaine derniere un partenariat avec CATL pour une seconde gigafactory en Espagne (Saragosse), d'une capacite prevue de 50 GWh. Au total, Stellantis vise 400 GWh de capacite batteries d'ici 2030 en Europe, un objectif juge "ambitieux mais necessaire" par les analystes de Morgan Stanley.`,

    `L'article complet est reserve aux abonnes de L'Usine Nouvelle.`,
  ];

  paragraphs.forEach((p, i) => {
    // Check if it is a noise/ad block
    if (p.startsWith('___') || p.startsWith('---') || p.startsWith('[CONTENU') || p.startsWith('[NEWSLETTER')) {
      doc.font('Helvetica').fontSize(4.5).fillColor('#777');
      doc.text(p, 45, y, { width: 340, lineGap: 1.5 });
      y = doc.y + 5;
      doc.font(bodyFont).fontSize(bodySize).fillColor('#222');
      return;
    }

    doc.text(p, 45, y, { width: 340, lineGap: 1.8 });
    y = doc.y + 6;

    // Check page overflow
    if (y > 760) {
      doc.addPage();
      watermark(doc, 'L\'USINE NOUVELLE', { opacity: 0.02, fontSize: 44 });
      // Re-draw top bar
      doc.rect(0, 0, 595, 20).fill('#c62828');
      doc.font('Helvetica-Bold').fontSize(8).fillColor('#fff');
      doc.text("L'USINE NOUVELLE", 45, 5, { lineBreak: false });
      y = 30;
      doc.font(bodyFont).fontSize(bodySize).fillColor('#222');
    }
  });

  // ---- Pull quote in body ----
  y += 4;
  doc.rect(55, y, 320, 28).fill('#fff8e1').stroke('#ffcc80');
  doc.font('Helvetica-Bold').fontSize(6.5).fillColor('#e65100');
  doc.text('"2 000 ingenieurs pour la batterie, c\'est un signal fort pour l\'emploi industriel en France"', 62, y + 5, { width: 300 });
  doc.font('Helvetica').fontSize(4.5).fillColor('#888');
  doc.text('— Xavier Bertrand, president de la region Hauts-de-France, sur BFM Business le 09/04/2026', 62, y + 20, { width: 300 });
  y += 38;

  // ---- Related articles noise ----
  doc.font('Helvetica-Bold').fontSize(5.5).fillColor('#333');
  doc.text('A LIRE AUSSI:', 45, y);
  y += 8;
  doc.font('Helvetica').fontSize(4.5).fillColor('#1565c0');
  const related = [
    '> ACC inaugure sa premiere ligne de production a Douvrin (12/2025) — usinenouvelle.com/article/acc-douvrin-inauguration.N2203847',
    '> Batteries: comment CATL et BYD menacent les constructeurs europeens (03/2026) — usinenouvelle.com/article/catl-byd-menace-europe.N2218456',
    '> ISO 26262 : le defi de la securite fonctionnelle pour les BMS (01/2026) — usinenouvelle.com/article/iso26262-bms-securite.N2210122',
    '> Stellantis supprime 4 000 postes en Italie: les syndicats reagissent (02/2026) — usinenouvelle.com/article/stellantis-italie-plans-sociaux.N2214789',
  ];
  related.forEach(r => {
    doc.text(r, 50, y, { width: 500 });
    y += 7;
  });

  // ---- Footer / legal noise ----
  y += 10;
  doc.moveTo(45, y).lineTo(550, y).lineWidth(0.3).stroke('#ccc');
  y += 4;
  doc.font('Helvetica').fontSize(3).fillColor('#aaa');
  const footer = 'Copyright 2026 L\'Usine Nouvelle — Groupe Infopro Digital. Tous droits reserves. ' +
    'La reproduction ou representation de cet article, meme partielle, est interdite sans autorisation prealable (art. L.122-4 du Code de la propriete intellectuelle). ' +
    'ISSN 0042-126X | CPPAP 0424T89419 | Directeur de publication: Pierre-Dominique Lucas | Redacteur en chef: Christophe Bys | ' +
    'Regie publicitaire: Infopro Digital Media | Siege: 10 place du General de Gaulle, 92160 Antony | ' +
    'Hebergement: OVHcloud, Roubaix (59) | DPO: dpo@infopro-digital.com | ' +
    'Ce PDF a ete genere automatiquement depuis la version web. Mise en page optimisee pour impression A4. ' +
    'Session: WEB2PDF-' + randInt(100000, 999999) + ' | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) | IP: 86.238.xxx.xxx (anonymise)';
  doc.text(footer, 45, y, { width: 505 });

  // Hidden text
  doc.fillColor('#ffffff').fontSize(1);
  doc.text('analytics_page_id=ART-2026-041001 ad_segment=industry_automotive_ev paywall_status=metered_3_of_5 user_tier=premium_trial abtesting=layout_v3b', 45, doc.y + 8);

  doc.end();
  return new Promise(resolve => ws.on('finish', resolve));
}


// ──────────────────────────────────────────
// RUN ALL
// ──────────────────────────────────────────
(async () => {
  console.log('Generating PDFs...');
  await Promise.all([
    genThalesJobs(),
    genPappersFinancial(),
    genUsineNouvelleArticle(),
  ]);
  console.log('Done. Files written to', OUT);
  fs.readdirSync(OUT).filter(f => f.endsWith('.pdf')).sort().forEach(f => {
    const stat = fs.statSync(path.join(OUT, f));
    console.log(`  ${f}  (${(stat.size / 1024).toFixed(1)} KB)`);
  });
})();
