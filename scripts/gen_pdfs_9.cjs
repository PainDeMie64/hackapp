const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT, { recursive: true });

// ─────────────────────────────────────────────────────────────────────
//  Helpers to make PDFs hard to parse
// ─────────────────────────────────────────────────────────────────────

function addWatermark(doc, text, opts = {}) {
  const saved = doc.save();
  doc.opacity(opts.opacity || 0.04);
  doc.fontSize(opts.size || 62);
  doc.font('Helvetica-Bold');
  doc.rotate(opts.angle || -38, { origin: [306, 420] });
  doc.fillColor(opts.color || '#888888');
  doc.text(text, 40, 300, { width: 900 });
  doc.restore();
}

function drawGridBackground(doc, x, y, w, h, cellSize) {
  doc.save();
  doc.opacity(0.06);
  doc.strokeColor('#999');
  doc.lineWidth(0.25);
  for (let gx = x; gx <= x + w; gx += cellSize) {
    doc.moveTo(gx, y).lineTo(gx, y + h).stroke();
  }
  for (let gy = y; gy <= y + h; gy += cellSize) {
    doc.moveTo(x, gy).lineTo(x + w, gy).stroke();
  }
  doc.restore();
}

function addMarginNotes(doc, notes, startY, x, fontSize) {
  doc.save();
  doc.font('Helvetica').fontSize(fontSize || 5.5).fillColor('#777');
  let ny = startY;
  notes.forEach(n => {
    doc.text(n, x, ny, { width: 52 });
    ny += 28;
  });
  doc.restore();
}

function drawSidebar(doc, x, y, w, h, entries, opts = {}) {
  doc.save();
  doc.rect(x, y, w, h).fill(opts.bg || '#f0f0f0');
  doc.fillColor(opts.titleColor || '#222').font('Helvetica-Bold').fontSize(opts.titleSize || 7);
  let cy = y + 6;
  if (opts.title) {
    doc.text(opts.title, x + 4, cy, { width: w - 8 });
    cy += 12;
  }
  doc.font('Helvetica').fontSize(opts.fontSize || 5.5).fillColor(opts.textColor || '#444');
  entries.forEach(e => {
    doc.text(e, x + 4, cy, { width: w - 8, lineGap: 0.5 });
    cy += doc.heightOfString(e, { width: w - 8 }) + 3;
  });
  doc.restore();
}

function overlappingText(doc, text1, text2, x, y, opts = {}) {
  doc.save();
  doc.font(opts.font1 || 'Helvetica').fontSize(opts.size1 || 8).fillColor(opts.color1 || '#333');
  doc.text(text1, x, y, { width: opts.width || 250, continued: false });
  doc.font(opts.font2 || 'Courier').fontSize(opts.size2 || 6.5).fillColor(opts.color2 || '#666').opacity(0.7);
  doc.text(text2, x + (opts.offsetX || 1), y + (opts.offsetY || 1.5), { width: opts.width || 250 });
  doc.restore();
}

function addFootnoteClutter(doc, pageNum, totalFootnotes) {
  doc.save();
  const baseY = 740;
  doc.moveTo(40, baseY).lineTo(555, baseY).lineWidth(0.3).strokeColor('#bbb').stroke();
  doc.font('Helvetica').fontSize(4.5).fillColor('#999');
  for (let i = 0; i < totalFootnotes; i++) {
    const fnY = baseY + 5 + i * 8;
    const fnNum = pageNum * 10 + i + 1;
    doc.text(`${fnNum}. Cf. supra, Section ${Math.floor(Math.random()*12)+1}.${Math.floor(Math.random()*9)+1}, para. ${Math.floor(Math.random()*40)+1}; see also Annex ${String.fromCharCode(65+i)} ref. ${1000+fnNum}/${2024+Math.floor(Math.random()*3)}-EU`, 42, fnY, { width: 510 });
  }
  doc.restore();
}

function tinyHeader(doc, left, right) {
  doc.save();
  doc.font('Helvetica').fontSize(5).fillColor('#aaa');
  doc.text(left, 40, 20, { width: 300 });
  doc.text(right, 300, 20, { width: 255, align: 'right' });
  doc.moveTo(40, 30).lineTo(555, 30).lineWidth(0.2).strokeColor('#ddd').stroke();
  doc.restore();
}

// ─────────────────────────────────────────────────────────────────────
//  PDF 1: Medical Devices Regulation (MDR/IVDR)
// ─────────────────────────────────────────────────────────────────────
function generateMedicalDevicesPDF() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 35, bottom: 40, left: 40, right: 40 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(OUT, '25_medical_devices_regulation.pdf'));
  doc.pipe(stream);

  // --- PAGE 1: Title + dense intro ---
  drawGridBackground(doc, 0, 0, 595, 842, 8);
  addWatermark(doc, 'MDR 2017/745 — CONFIDENTIAL DRAFT — DO NOT DISTRIBUTE — REV. 7.3.1', { opacity: 0.035, size: 48, angle: -42 });
  tinyHeader(doc, 'DOC-REF: MDR-COMP-FR-2025-Q4/Rev7.3.1-DRAFT', 'Classification: RESTRICTED — Internal Use Only');

  doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a6e');
  doc.text('RAPPORT DE CONFORMITE REGLEMENTAIRE', 40, 45, { align: 'center', width: 515 });
  doc.fontSize(10).fillColor('#333');
  doc.text('Regulation (EU) 2017/745 (MDR) & Regulation (EU) 2017/746 (IVDR)', 40, 63, { align: 'center', width: 515 });
  doc.fontSize(7).fillColor('#666');
  doc.text('Annex I — General Safety and Performance Requirements | Annex II — Technical Documentation', 40, 78, { align: 'center', width: 515 });
  doc.text('Annex XIV — Clinical Evaluation | Annex XV — Clinical Investigations', 40, 87, { align: 'center', width: 515 });

  // Dense meta block
  doc.moveTo(40, 100).lineTo(555, 100).lineWidth(0.5).strokeColor('#1a1a6e').stroke();
  doc.font('Courier').fontSize(5).fillColor('#555');
  const metaLines = [
    'Prepared by: Bureau Veritas Medical Division | Notified Body 0459 | BSI Group NB 2797 backup ref.',
    'Date: 2025-10-15 | Revision: 7.3.1-DRAFT | Previous: 6.2.0 (2024-07-22) | EUDAMED SRN: FR-MF-000012345',
    'Scope: Class III implantable devices (Rule 8), Class IIb active devices (Rule 12), IVD Class D (Annex VIII Ch.III)',
    'Standards referenced: EN ISO 13485:2016+A11:2021, EN ISO 14971:2019+A11:2021, IEC 62304:2006+AMD1:2015, IEC 60601-1:2005+AMD2:2020',
    'MDCG Guidance: 2020-5 Rev.2, 2021-24 Rev.1, 2022-14, 2019-16 Rev.2, 2020-1 Rev.1 | Transition deadline: 26 May 2026 (extended)',
  ];
  metaLines.forEach((line, i) => {
    doc.text(line, 42, 105 + i * 7, { width: 510 });
  });

  // Two-column layout with sidebar
  const col1X = 42, col2X = 290, colW = 230, sideW = 65;

  // Left column
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a1a6e');
  doc.text('1. MEDTRONIC FRANCE SAS', col1X, 150);
  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const medtronicText = `Medtronic France SAS (SIREN 328 536 792), headquartered at 26-28 Av. Tony Garnier, 69007 Lyon (formerly Boulogne-Billancourt, relocated Q3 2024), employs approximately 3,200 personnel across 4 sites in metropolitan France. The entity operates as a wholly-owned subsidiary of Medtronic plc (Dublin, IE), with manufacturing delegated to Medtronic Sofamor Danek (Memphis, TN) and Medtronic Vascular (Santa Rosa, CA).

Primary product portfolio under MDR scope:
  — CoreValve Evolut PRO+ (TAVR system, Class III Rule 8, UDI-DI 00846721050139)
  — Hugo RAS surgical robot platform (Class IIb Rule 12, pending EUDAMED registration)
  — SynchroMed II intrathecal pump (Class III implantable, Rule 8)
  — Mazor X Stealth robotics (Class IIb, Rule 11, integration w/ StealthStation S8)

Re-certification status: Medtronic submitted consolidated Technical Documentation (TD) per Annex II/III to BSI NB 2797 on 2025-03-15. The Notified Body audit (Stage 2) completed 2025-06-20 with 3 major nonconformities (NC-2025-0891, NC-2025-0892, NC-2025-0893) relating to:
  (a) insufficient post-market clinical follow-up (PMCF) data for CoreValve in patients >90 yrs;
  (b) software lifecycle documentation gaps for Hugo RAS per IEC 62304 Class C;
  (c) biocompatibility re-evaluation under ISO 10993-1:2018 not completed for SynchroMed reservoir.

CAPA responses due: 2025-09-15 (extended to 2025-11-30 per NB decision D-2025-447).

Employment note: Active recruitment for 45 regulatory affairs specialists (CRA, QARA) and 28 software validation engineers (V&V per IEC 62304/GAMP 5) across Lyon and Toulouse sites. Median offered salary: 48-62k EUR gross/yr for senior RA, 55-72k EUR for SW V&V leads.`;
  doc.text(medtronicText, col1X, 163, { width: colW, lineGap: 0.8 });

  // Right column — Essilor
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a1a6e');
  doc.text('2. ESSILORLUXOTTICA SA', col2X, 150);
  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const essilorText = `EssilorLuxottica SA (SIREN 712 049 618), registered at 147 Rue de Paris, 94220 Charenton-le-Pont. Global workforce: ~190,000 (FY2024 annual report, p. 47). Consolidated revenue: EUR 25.4 billion (FY2024). French entities include Essilor International SAS, BBGR SAS, Nikon Optical France.

MDR relevance: LIMITED. The majority of Essilor products are classified as personal protective equipment (PPE Regulation 2016/425) or consumer optics. However, specific product lines fall under MDR:
  — Stellest myopia management lenses → potential Class IIa (Rule 1, therapeutic claim)
  — Crizal Prevencia → blue-light filtering with medical claims in certain markets
  — Custom surgical loupes (Essilor Instruments division)

Assessment: EssilorLuxottica's regulatory exposure to MDR is minimal relative to revenue. Less than 2% of product lines require CE marking under MDR. Primary regulatory burden is PPE Reg. 2016/425 and consumer product safety (Directive 2001/95/EC).

Note: EssilorLuxottica is included in this report per the broader mandate covering all French entities with ANY medical device classification. The company's engineering workforce is predominantly optical design (>4,000 engineers at R&D centres in Croissy-sur-Seine and Singapore), not medical device regulatory.

Revenue breakdown (FR operations, est.): Ophthalmic lenses 68%, Frames/Sunglasses 22%, Instruments/Equipment 7%, Other 3%.`;
  doc.text(essilorText, col2X, 163, { width: colW, lineGap: 0.8 });

  // Sidebar definitions (hard to parse: overlapping area)
  drawSidebar(doc, 500, 155, sideW, 320, [
    'MDR Art. 2(1): "medical device" means any instrument, apparatus, appliance, software...',
    'Class III: highest risk devices requiring conformity assessment per Annex IX+X or IX+XI',
    'NB: Notified Body designated under Art. 42',
    'PMCF: Post-Market Clinical Follow-up per Annex XIV Part B',
    'GSPR: General Safety & Performance Requirements, Annex I',
    'SRN: Single Registration Number in EUDAMED',
    'UDI-DI: Unique Device Identification - Device Identifier (AIDC/HRI)',
    'CAPA: Corrective and Preventive Action per ISO 13485 cl. 8.5.2/8.5.3',
    'TD: Technical Documentation per Art. 10(4), Annex II/III',
  ], { bg: '#eef0f8', titleColor: '#1a1a6e', title: 'DEFINITIONS & ABBREVIATIONS', fontSize: 4.5, titleSize: 5.5 });

  addMarginNotes(doc, [
    'Ref: MDR Art.120(3c)',
    'MDCG 2020-5 Rev.2',
    'NB OpGuide §4.3',
    'ISO 13485 cl. 7.3.9',
    'EN 62304 cl. 5.1-5.8',
    'Annex XIV §1(a)',
    'EUDAMED Art.33',
  ], 500, 6, 4);

  addFootnoteClutter(doc, 1, 4);

  // --- PAGE 2: BioMerieux + tables ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 8);
  addWatermark(doc, 'IVDR 2017/746 — CONFIDENTIAL — DO NOT CIRCULATE', { opacity: 0.03, size: 50, angle: -35 });
  tinyHeader(doc, 'DOC-REF: MDR-COMP-FR-2025-Q4/Rev7.3.1 — Section 3: IVD Manufacturers', 'Page 2 of 8');

  doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a1a6e');
  doc.text('3. BIOMERIEUX SA — IVDR COMPLIANCE ASSESSMENT', 42, 38);

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const bmxText = `bioMerieux SA (SIREN 673 620 399), Chemin de l'Orme, 69280 Marcy-l'Etoile. Global headcount: ~14,800 (FY2024). Revenue: EUR 3.9 billion (FY2024 annual report). CEO: Pierre BOULUD (since Sept 2024).

IVDR Transition Status: bioMerieux is one of the largest IVD manufacturers globally and faces significant regulatory burden under IVDR 2017/746. The company's product portfolio spans all IVDR risk classes:

  Class D (highest risk, Annex VIII Ch.III):
    — VIDAS HIV DUO Ultra (HIV 1/2 Ag/Ab combination) → Legacy device, IVDD List A
    — VIDAS HBs Ag Ultra → Hepatitis B surface antigen, blood screening
    — VIDAS BRAHMS PCT → Procalcitonin, sepsis diagnosis (reclassified under IVDR Rule 3(a))

  Class C:
    — BioFire FilmArray 2.0 System + Panels (BCID2, Pneumonia, GI, RP2.1)
    — FilmArray Torch system (high-throughput molecular diagnostics)
    — VITEK 2 systems (microbial identification, AST)
    — VITEK MS PRIME (MALDI-TOF mass spectrometry)

  Class B: VIDAS routine immunoassay panels, chromID culture media
  Class A (self-declaration): General purpose reagents, sample preparation consumables

Software lifecycle (IEC 62304) compliance:
bioMerieux has adopted a SOUP (Software of Unknown Provenance) management framework per IEC 62304:2006+AMD1:2015, Clause 8. All embedded software in BioFire and VITEK platforms is classified as SW Safety Class C (highest). The company maintains dedicated software V&V teams in:
  — Marcy-l'Etoile (HQ): 120 SW engineers, 45 V&V specialists
  — Salt Lake City, UT: 85 SW engineers (BioFire origin)
  — Grenoble: 30 algorithm/AI engineers (AMR prediction models)

Current hiring: 22 validation engineer positions open (IEC 62304, IEC 62366 usability, ISO 14971 risk), salary range 42-58k EUR. 15 regulatory affairs positions (IVDR submission specialists), salary range 45-65k EUR.`;
  doc.text(bmxText, 42, 52, { width: 510, lineGap: 0.8 });

  // Dense table — overlapping borders
  const tableY = 355;
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#1a1a6e');
  doc.text('TABLE 3.1: IVDR TRANSITION TIMELINE — BIOMERIEUX KEY PRODUCTS', 42, tableY);

  const headers = ['Product/System', 'IVDR Class', 'Legacy Class', 'NB Req?', 'TD Submitted', 'Cert. ETA', 'Status'];
  const colWidths = [115, 45, 50, 35, 60, 50, 80];
  const rows = [
    ['VIDAS HIV DUO Ultra', 'D', 'List A', 'Yes (0459)', '2024-11-20', '2026-Q1', 'Stage 2 audit scheduled'],
    ['VIDAS HBs Ag Ultra', 'D', 'List A', 'Yes (0459)', '2024-12-05', '2026-Q2', 'Under NB review'],
    ['BioFire BCID2 Panel', 'C', 'Self-cert', 'Yes (0459)', '2025-02-18', '2025-Q4', 'Minor NC open (NC-25-114)'],
    ['BioFire RP2.1 Panel', 'C', 'Self-cert', 'Yes (0459)', '2025-03-01', '2025-Q4', 'Pending CAPA closure'],
    ['VITEK 2 Compact', 'C', 'IVD-Other', 'Yes (0459)', '2025-01-10', '2026-Q1', 'Stage 1 complete'],
    ['VITEK MS PRIME', 'C', 'IVD-Other', 'Yes (0459)', '2025-04-22', '2026-Q2', 'TD in preparation'],
    ['VIDAS B·R·A·H·M·S PCT', 'C*', 'Self-cert', 'Yes (0459)', '2024-09-30', '2025-Q3', 'Cert issued 2025-08-14'],
    ['chromID CPS Elite', 'B', 'IVD-Other', 'No', 'N/A (self)', '2026-05', 'DoC in preparation'],
    ['General reagents', 'A', 'IVD-GEN', 'No', 'N/A (self)', '2026-05', 'Compliant (DoC filed)'],
  ];

  let ty = tableY + 14;
  // Header row
  doc.rect(42, ty, 510, 10).fill('#1a1a6e');
  doc.font('Helvetica-Bold').fontSize(5).fillColor('#fff');
  let tx = 44;
  headers.forEach((h, i) => {
    doc.text(h, tx, ty + 2.5, { width: colWidths[i] });
    tx += colWidths[i] + 2;
  });
  ty += 10;

  // Data rows with alternating backgrounds
  doc.font('Courier').fontSize(4.8).fillColor('#333');
  rows.forEach((row, ri) => {
    if (ri % 2 === 0) {
      doc.save().rect(42, ty, 510, 9).fill('#f5f5fa').restore();
    }
    tx = 44;
    row.forEach((cell, ci) => {
      doc.fillColor(ci === 6 && cell.includes('NC') ? '#993300' : '#333');
      doc.text(cell, tx, ty + 2, { width: colWidths[ci] });
      tx += colWidths[ci] + 2;
    });
    ty += 9;

    // Random hairline separator that overlaps text
    if (ri % 3 === 1) {
      doc.save().opacity(0.15).moveTo(42, ty - 1).lineTo(552, ty - 1).lineWidth(0.3).strokeColor('#000').stroke().restore();
    }
  });

  // Cross-reference sidebar on page 2
  drawSidebar(doc, 42, ty + 20, 240, 140, [
    'IVDR Annex VIII Classification Rules:',
    'Rule 1: Products for blood group typing → Class D',
    'Rule 2: Products for detection of transmissible agents in blood/tissues → Class D',
    'Rule 3(a): Companion diagnostics, high-risk → Class C',
    'Rule 3(b): Other CDx → Class C',
    'Rule 4: Self-testing devices → up-classified by one class',
    'Rule 5: Near-patient testing → up-classified by one class',
    'Rule 6: Instruments → Class per connected IVD',
    'Rule 7: All other devices → Class A (default)',
    '',
    '* BRAHMS PCT reclassified from self-cert to Class C under Rule 3(a) due to sepsis diagnostic claim (critical care decision support). NB involvement now mandatory.',
  ], { bg: '#f8f0e8', titleColor: '#663300', title: 'IVDR CLASSIFICATION CROSS-REFERENCE', fontSize: 5, titleSize: 6 });

  drawSidebar(doc, 300, ty + 20, 252, 140, [
    'IEC 62304:2006+AMD1:2015 — SW Lifecycle for Medical Devices:',
    'Cl. 5.1: Software development planning',
    'Cl. 5.2: Software requirements analysis',
    'Cl. 5.3: Software architectural design',
    'Cl. 5.4: Software detailed design',
    'Cl. 5.5: Software unit implementation',
    'Cl. 5.6: Software integration and integration testing',
    'Cl. 5.7: Software system testing',
    'Cl. 5.8: Software release',
    'Cl. 6: Software maintenance process',
    'Cl. 7: Software risk management (ref ISO 14971)',
    'Cl. 8: Software configuration management (incl. SOUP)',
    'Cl. 9: Software problem resolution process',
    '',
    'Safety classification: Class A (no injury), Class B (non-serious), Class C (death/serious injury)',
    'bioMerieux BioFire SW: Class C | VITEK SW: Class C | VIDAS SW: Class B',
  ], { bg: '#e8f0e8', titleColor: '#006633', title: 'IEC 62304 LIFECYCLE REQUIREMENTS', fontSize: 4.8, titleSize: 6 });

  addFootnoteClutter(doc, 2, 5);

  // --- PAGE 3: Summary matrix with overlapping elements ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 6);
  addWatermark(doc, 'DRAFT — NOT FOR REGULATORY SUBMISSION', { opacity: 0.04, size: 55, angle: -30 });
  tinyHeader(doc, 'DOC-REF: MDR-COMP-FR-2025-Q4/Rev7.3.1 — CONSOLIDATED MATRIX', 'Page 3 of 8');

  doc.font('Helvetica-Bold').fontSize(9).fillColor('#1a1a6e');
  doc.text('CONSOLIDATED COMPLIANCE MATRIX — ALL ENTITIES', 42, 38, { align: 'center', width: 510 });

  // Massive comparison table
  const mHeaders = ['Criterion', 'Medtronic FR', 'EssilorLuxottica', 'bioMerieux'];
  const mColW = [130, 130, 120, 130];
  const mRows = [
    ['Applicable Regulation', 'MDR 2017/745', 'MDR 2017/745 (limited)\nPPE 2016/425 (primary)', 'IVDR 2017/746'],
    ['Highest Device Class', 'Class III (Rule 8)', 'Class IIa (Rule 1)', 'Class D (Annex VIII)'],
    ['No. Products in Scope', '47 product families', '~8 product lines (<2%)', '340+ product references'],
    ['Notified Body', 'BSI NB 2797', 'TUV SUD NB 0123 (if needed)', 'LNE/G-MED NB 0459'],
    ['TD Submission Status', '60% submitted (FY2025)', 'Not yet initiated', '45% submitted (FY2025)'],
    ['Major NCs Outstanding', '3 (NC-2025-089x)', '0', '1 (NC-25-114)'],
    ['CAPA Deadline', '2025-11-30', 'N/A', '2025-10-15'],
    ['QMS Standard', 'ISO 13485:2016', 'ISO 9001:2015 + ISO 13485 (partial)', 'ISO 13485:2016'],
    ['SW Lifecycle (62304)', 'Yes — Class C (Hugo RAS)', 'No (no SAMD)', 'Yes — Class B/C'],
    ['Risk Mgmt (14971)', 'Full implementation', 'Partial (PPE risk assess.)', 'Full implementation'],
    ['Clinical Evaluation', 'Annex XIV + PMCF plans', 'Literature review only', 'Performance evaluation (IVDR Art. 56-58)'],
    ['EUDAMED Registration', 'Partial (SRN active)', 'Pending', 'Partial (SRN active)'],
    ['Estimated Compliance Cost', 'EUR 12-15M (2025-2027)', 'EUR 0.8-1.2M', 'EUR 18-22M (2025-2027)'],
    ['FTE Dedicated to RA/QA', '~180', '~12', '~220'],
    ['Hiring Needs (RA/QA/SW)', '73 positions', '5-8 positions', '37 positions'],
  ];

  let my = 55;
  doc.rect(42, my, 510, 12).fill('#1a1a6e');
  doc.font('Helvetica-Bold').fontSize(5.5).fillColor('#fff');
  let mx = 44;
  mHeaders.forEach((h, i) => {
    doc.text(h, mx, my + 3, { width: mColW[i] });
    mx += mColW[i];
  });
  my += 12;

  doc.font('Courier').fontSize(4.5);
  mRows.forEach((row, ri) => {
    const rowH = 20;
    if (ri % 2 === 0) {
      doc.save().rect(42, my, 510, rowH).fill('#f5f5fa').restore();
    }
    // Intentional: draw very faint vertical separators that merge with text
    doc.save().opacity(0.08).strokeColor('#000').lineWidth(0.5);
    let sepX = 44;
    mColW.forEach(w => { sepX += w; doc.moveTo(sepX, my).lineTo(sepX, my + rowH).stroke(); });
    doc.restore();

    mx = 44;
    row.forEach((cell, ci) => {
      doc.fillColor(ci === 0 ? '#1a1a6e' : '#333');
      doc.font(ci === 0 ? 'Helvetica-Bold' : 'Courier').fontSize(ci === 0 ? 5.2 : 4.5);
      doc.text(cell, mx, my + 2, { width: mColW[ci] - 4 });
      mx += mColW[ci];
    });
    my += rowH;
  });

  // Overlapping regulatory timeline at bottom
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#1a1a6e');
  doc.text('REGULATORY TIMELINE — KEY MDR/IVDR MILESTONES', 42, my + 15);

  const timeline = [
    { date: '2024-03-20', event: 'MDR Corrigendum 2024/C/1234 published — extends Art.120(3c) legacy devices to May 2028' },
    { date: '2024-05-26', event: 'Original MDR DoA for all classes (extended for legacy devices with valid cert/declaration)' },
    { date: '2024-09-01', event: 'EUDAMED Module 3 (Certificates & NB) mandatory registration begins' },
    { date: '2025-01-01', event: 'IVDR full application (no more transitional provisions for Class D legacy)' },
    { date: '2025-05-26', event: 'Extended transition deadline for Class III custom-made implantable (MDR Art.120(3d))' },
    { date: '2025-09-30', event: 'EUDAMED Module 5 (Market Surveillance) pilot phase ends' },
    { date: '2026-05-26', event: 'IVDR extended transition for Class D (with conditions met per Reg. 2024/1860)' },
    { date: '2027-05-26', event: 'IVDR extended transition for Class C (with conditions met)' },
    { date: '2028-05-26', event: 'MDR final deadline — ALL legacy devices must hold MDR certificate or withdraw from market' },
  ];

  let tly = my + 28;
  doc.font('Courier').fontSize(5).fillColor('#333');
  timeline.forEach((t, i) => {
    doc.save();
    doc.rect(42, tly, 4, 4).fill(i < 4 ? '#cc3333' : i < 7 ? '#cc9900' : '#339933');
    doc.restore();
    doc.font('Courier-Bold').fontSize(5).fillColor('#333');
    doc.text(t.date, 50, tly, { continued: true });
    doc.font('Courier').text('  ' + t.event, { width: 490 });
    tly += 12;
  });

  addFootnoteClutter(doc, 3, 6);

  doc.end();
  return new Promise(r => stream.on('finish', r));
}

// ─────────────────────────────────────────────────────────────────────
//  PDF 2: Cloud Migration Case Studies
// ─────────────────────────────────────────────────────────────────────
function generateCloudMigrationPDF() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 35, bottom: 40, left: 40, right: 40 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(OUT, '26_cloud_migration_case_studies.pdf'));
  doc.pipe(stream);

  // --- PAGE 1: SocGen ---
  drawGridBackground(doc, 0, 0, 595, 842, 10);
  addWatermark(doc, 'CASE STUDY — DRAFT FOR INTERNAL REVIEW — v3.2.1-RC', { opacity: 0.03, size: 44, angle: -40 });
  tinyHeader(doc, 'CS-CLOUD-FR-2025-003 | Classification: Internal — Pre-publication Draft', 'Accenture x AWS | Rev 3.2.1');

  // Decorative bar
  doc.rect(40, 32, 515, 3).fill('#FF9900');
  doc.rect(40, 36, 515, 1).fill('#232F3E');

  doc.font('Helvetica-Bold').fontSize(14).fillColor('#232F3E');
  doc.text('CLOUD MIGRATION CASE STUDIES', 40, 45, { align: 'center', width: 515 });
  doc.fontSize(9).fillColor('#666');
  doc.text('French Financial Services Sector — Multi-Cloud Transformation Programs 2023-2026', 40, 63, { align: 'center', width: 515 });

  doc.moveTo(40, 80).lineTo(555, 80).lineWidth(0.5).strokeColor('#FF9900').stroke();

  // Case Study 1: SocGen
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#232F3E');
  doc.text('CASE STUDY 1: SOCIETE GENERALE — "CLOUD@SCALE" PROGRAM', 42, 90);
  doc.moveTo(42, 104).lineTo(400, 104).lineWidth(0.3).strokeColor('#FF9900').stroke();

  // Before/After boxes side by side
  const boxW = 245, boxH = 130;
  // BEFORE box
  doc.rect(42, 112, boxW, boxH).lineWidth(0.5).strokeColor('#cc3333').stroke();
  doc.rect(42, 112, boxW, 14).fill('#cc3333');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#fff');
  doc.text('BEFORE: Legacy State (Pre-2023)', 46, 115, { width: boxW - 8 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  const beforeText = `• 3 on-premise data centres (Fontenay-sous-Bois, Val-de-Fontenay, London)
• 12,000+ physical servers, avg. age 7.2 years
• 85% monolithic Java/COBOL applications
• Deployment cycle: 6-8 weeks average
• Infrastructure cost: EUR 890M/year (FY2022)
• 2,400 IT ops staff managing legacy estate
• MTTR (Mean Time to Recovery): 4.2 hours
• Security: perimeter-based, 340 firewall rules avg/app
• Compliance: manual audit processes (ACPR/BCE)
• Vendor lock-in: IBM mainframe (z15), Oracle DB licensing EUR 120M/yr
• Technical debt score: 8.4/10 (critical)
• Change failure rate: 23%`;
  doc.text(beforeText, 46, 130, { width: boxW - 8, lineGap: 0.5 });

  // AFTER box
  doc.rect(42 + boxW + 10, 112, boxW, boxH).lineWidth(0.5).strokeColor('#339933').stroke();
  doc.rect(42 + boxW + 10, 112, boxW, 14).fill('#339933');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#fff');
  doc.text('AFTER: Target State (End 2026)', 46 + boxW + 10, 115, { width: boxW - 8 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  const afterText = `• AWS (primary): 3 regions (eu-west-1, eu-west-3, eu-central-1)
• Azure (secondary): compliance workloads, M365 integration
• 78% containerized (EKS), 15% serverless (Lambda), 7% EC2
• Deployment frequency: 12x/day (target: 50x/day by 2026)
• Infrastructure cost: EUR 540M/year (target, -39%)
• Cloud-native team: 1,800 engineers (retrained + new hires)
• MTTR: 18 minutes (target)
• Security: zero-trust, AWS GuardDuty + Prisma Cloud
• Compliance: automated via AWS Config + custom rules
• Database: Aurora PostgreSQL, DynamoDB, Redis ElastiCache
• Technical debt score: 3.1/10 (target)
• Change failure rate: 5% (target)`;
  doc.text(afterText, 46 + boxW + 10, 130, { width: boxW - 8, lineGap: 0.5 });

  // Body text with embedded quotes
  let by = 250;
  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const sgBody1 = `Societe Generale SA (SIREN 552 120 222), headquartered at 29 Boulevard Haussmann, 75009 Paris, with IT operations centered at Les Dunes campus, Fontenay-sous-Bois (Val-de-Marne). Total global workforce: ~117,000 employees (FY2024). Net banking income: EUR 26.6 billion (FY2024). The group's IT division (RESG/GTS) employs approximately 25,000 personnel worldwide, of which ~15,000 are based in France.`;
  doc.text(sgBody1, 42, by, { width: 510, lineGap: 0.8 });
  by += doc.heightOfString(sgBody1, { width: 510 }) + 5;

  // Testimonial — italic, indented, different font size — hard to distinguish from body
  doc.font('Helvetica-Oblique').fontSize(6.2).fillColor('#555');
  const quote1 = `"La migration cloud n'est pas un projet IT, c'est une transformation business. Nous avons redéfini notre modèle opérationnel autour du cloud, avec l'objectif de déployer 80% de nos workloads critiques sur AWS d'ici fin 2026. Cela représente un investissement de plus de 700 millions d'euros sur 4 ans, mais le ROI est évident: réduction des coûts d'infrastructure de 39%, time-to-market divisé par 10." — Philippe VALLEE, Directeur des Systèmes d'Information, Societe Generale (interview Le Monde Informatique, Sept. 2025)`;
  doc.text(quote1, 55, by, { width: 490, lineGap: 0.6 });
  by += doc.heightOfString(quote1, { width: 490 }) + 6;

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const sgBody2 = `Hiring initiative: SocGen has announced plans to recruit 400 cloud and DevOps engineers between 2025-2026, with positions split across Paris (La Defense tower), Fontenay (Les Dunes), and Bangalore (IT shared services). Key roles include:
  — AWS Solutions Architects (x45): Design multi-account landing zone, AWS Organizations, Control Tower. Salary: 65-95k EUR.
  — Platform Engineers / SRE (x80): Terraform, Crossplane, ArgoCD, EKS management. Salary: 55-80k EUR.
  — Cloud Security Engineers (x35): AWS SecurityHub, GuardDuty, IAM policies, CSPM. Salary: 60-85k EUR.
  — Data Engineers (x60): AWS Glue, EMR, Redshift, Lake Formation, Kafka/MSK. Salary: 55-85k EUR.
  — DevOps / CI-CD Specialists (x50): Jenkins→GitLab CI migration, artifact management, quality gates. Salary: 50-70k EUR.
  — Cloud FinOps Analysts (x15): AWS Cost Explorer, Kubecost, Reserved Instances optimization. Salary: 50-65k EUR.
  — Remaining ~115 positions: project managers, Scrum masters, change management, training.

Technology stack detail (Architecture Decision Records — ADR-2024-037 through ADR-2024-089):
  Compute: Amazon EKS (Kubernetes 1.28+), AWS Lambda, AWS Fargate
  Networking: AWS Transit Gateway, PrivateLink, Direct Connect (2x 100Gbps to Fontenay DC)
  Storage: S3 (IA/Glacier for compliance archives), EFS, FSx for Lustre (quant models)
  Database: Aurora PostgreSQL 15, DynamoDB, ElastiCache Redis 7, Amazon Timestream (market data)
  Messaging: Amazon MSK (Kafka), SQS, SNS, EventBridge
  Observability: Datadog (primary), AWS CloudWatch, OpenTelemetry, Jaeger traces
  Security: AWS KMS (BYOK), Secrets Manager, WAF, Shield Advanced, CrowdStrike Falcon
  IaC: Terraform 1.6+ (modules registry), Crossplane for K8s-native resources
  CI/CD: GitLab CI (self-hosted runners on EKS), ArgoCD, Flux for GitOps
  Compliance: AWS Config conformance packs, custom Lambda rules, Qualys VMDR`;
  doc.text(sgBody2, 42, by, { width: 510, lineGap: 0.7 });

  addFootnoteClutter(doc, 1, 3);

  // Overlapping architecture text block (intentionally hard to parse)
  doc.save();
  doc.opacity(0.08);
  doc.font('Courier').fontSize(4).fillColor('#000');
  doc.text(`┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Internet    │──▶│  CloudFront  │──▶│  WAF/Shield  │
└─────────────┘   └──────┬──────┘   └──────┬──────┘
                         │                  │
                  ┌──────▼──────┐   ┌──────▼──────┐
                  │  ALB / NLB  │   │  API Gateway │
                  └──────┬──────┘   └──────┬──────┘
                         │                  │
                  ┌──────▼──────────────────▼──────┐
                  │        Amazon EKS Cluster       │
                  │  ┌────────┐ ┌────────┐ ┌─────┐ │
                  │  │Frontend│ │Backend │ │ Jobs │ │
                  │  │(React) │ │(Java)  │ │(Py) │ │
                  │  └────────┘ └────────┘ └─────┘ │
                  └────────────────┬────────────────┘`, 42, 650, { width: 510 });
  doc.restore();

  // --- PAGE 2: AXA ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 10);
  addWatermark(doc, 'AXA CLOUD — CONFIDENTIAL — DO NOT DISTRIBUTE', { opacity: 0.03, size: 48, angle: -38 });
  tinyHeader(doc, 'CS-CLOUD-FR-2025-003 | Case Study 2: AXA Group', 'Page 2 of 6');

  doc.rect(40, 32, 515, 3).fill('#00008F');

  doc.font('Helvetica-Bold').fontSize(11).fillColor('#00008F');
  doc.text('CASE STUDY 2: AXA GROUP — "ONE CLOUD" KUBERNETES TRANSFORMATION', 42, 42);
  doc.moveTo(42, 56).lineTo(555, 56).lineWidth(0.3).strokeColor('#00008F').stroke();

  // Before / After
  doc.rect(42, 62, boxW, boxH).lineWidth(0.5).strokeColor('#cc3333').stroke();
  doc.rect(42, 62, boxW, 14).fill('#cc3333');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#fff');
  doc.text('BEFORE: Pre-transformation (2022)', 46, 65, { width: boxW - 8 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  doc.text(`• 4 private clouds (AXA Technology Services legacy)
• VMware-based virtualization (8,000 VMs)
• Siloed per-entity infrastructure (AXA France, AXA XL, AXA IM)
• 200+ distinct monitoring tools across entities
• Average provisioning time: 3 weeks
• Security: traditional SOC, SIEM (QRadar)
• Compliance: manual processes, Excel-based tracking
• 18 months average for new product launch
• Annual IT spend: EUR 4.8B globally
• Staffing: 12,000 IT FTEs, 60% outsourced`, 46, 80, { width: boxW - 8, lineGap: 0.5 });

  doc.rect(42 + boxW + 10, 62, boxW, boxH).lineWidth(0.5).strokeColor('#339933').stroke();
  doc.rect(42 + boxW + 10, 62, boxW, 14).fill('#339933');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#fff');
  doc.text('AFTER: "ONE CLOUD" Target (2026)', 46 + boxW + 10, 65, { width: boxW - 8 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  doc.text(`• GCP (primary) + Azure (M365/identity) + AWS (AXA XL)
• 95% containerized on GKE/Anthos (target)
• Unified platform: "AXA Cloud Platform" (ACP) — internal PaaS
• Single observability: Dynatrace + Grafana/Loki/Tempo
• Provisioning: <15 minutes (self-service portal)
• Zero-trust: BeyondCorp, Zscaler, Palo Alto Prisma
• Compliance: Policy-as-Code (OPA/Gatekeeper)
• 6 weeks new product launch (target)
• IT spend reduction: -25% by 2027
• In-house ratio: 70% internal by 2026`, 46 + boxW + 10, 80, { width: boxW - 8, lineGap: 0.5 });

  by = 200;
  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const axaBody = `AXA SA (SIREN 572 093 920), 25 Avenue Matignon, 75008 Paris. Global workforce: ~145,000 employees (FY2024). Total revenue: EUR 102.7 billion (GWP). CTO: Guillaume BESSE (AXA Group Operations).

AXA's cloud journey represents one of the most ambitious Kubernetes adoption programs in European financial services. The "ONE CLOUD" initiative, launched in Q1 2023, aims to consolidate 40+ distinct infrastructure environments across 50 countries onto a unified cloud-native platform built primarily on Google Cloud Platform (GKP) with Google Kubernetes Engine (GKE) and Anthos for hybrid management.`;
  doc.text(axaBody, 42, by, { width: 510, lineGap: 0.8 });
  by += doc.heightOfString(axaBody, { width: 510 }) + 5;

  doc.font('Helvetica-Oblique').fontSize(6.2).fillColor('#444');
  const quote2 = `"Kubernetes est devenu le système d'exploitation de l'entreprise. Avec plus de 2,500 clusters GKE en production et 180,000 pods actifs, nous opérons l'une des plus grandes installations Kubernetes du secteur financier mondial. Notre objectif est d'atteindre 95% de containerisation d'ici 2026, ne conservant que les mainframes legacy en bare-metal." — Guillaume BESSE, CTO AXA Group Operations (KubeCon EU 2025 keynote, London)`;
  doc.text(quote2, 55, by, { width: 490, lineGap: 0.6 });
  by += doc.heightOfString(quote2, { width: 490 }) + 6;

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const axaBody2 = `Zero-Trust Security Architecture:
AXA has implemented a comprehensive zero-trust security model across its cloud estate, one of the first insurers globally to achieve this at scale. Key components:

  Identity & Access: Okta (workforce identity), Auth0 (customer identity), GCP IAM with Workload Identity Federation
  Network: Zscaler ZIA/ZPA (replacing all VPNs by Q2 2026), GCP VPC Service Controls, Private Service Connect
  Endpoint: CrowdStrike Falcon, Microsoft Defender for Endpoint, Jamf (Mac fleet)
  Application: Istio service mesh (mutual TLS), OPA/Gatekeeper admission control, Trivy vulnerability scanning
  Data: Google CMEK (Customer-Managed Encryption Keys), Thales CipherTrust for key management, DLP API
  Monitoring: Chronicle SIEM (Google), Cortex XSOAR (Palo Alto) for SOAR, custom detection rules (2,400+ active)

Compliance & Regulatory: ACPR/BCE supervision, DORA (Digital Operational Resilience Act) compliance program launched Q3 2024. AXA has allocated EUR 45M specifically for DORA readiness, including ICT risk management framework, third-party risk management for cloud providers, digital operational resilience testing (TLPT per ECB framework).

Hiring: AXA is actively recruiting across its technology division with 850+ open positions globally in cloud/platform engineering. France-specific: ~280 positions including:
  — Kubernetes Platform Engineers (x55): GKE, Anthos, Istio, ArgoCD. Paris + Nantes.
  — SRE / Observability Engineers (x30): Dynatrace, Grafana stack, SLO/SLI design.
  — Cloud Security Architects (x25): Zero-trust design, GCP security, Zscaler.
  — ML Engineers (x40): Vertex AI, TensorFlow, claims automation models.
  — Data Platform Engineers (x35): BigQuery, Dataflow, Pub/Sub, dbt.`;
  doc.text(axaBody2, 42, by, { width: 510, lineGap: 0.7 });

  addFootnoteClutter(doc, 2, 4);

  // --- PAGE 3: Credit Agricole ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 10);
  addWatermark(doc, 'CREDIT AGRICOLE — INTERNAL USE ONLY — PRE-DECISIONAL', { opacity: 0.035, size: 46, angle: -36 });
  tinyHeader(doc, 'CS-CLOUD-FR-2025-003 | Case Study 3: Credit Agricole Group', 'Page 3 of 6');

  doc.rect(40, 32, 515, 3).fill('#006A4E');

  doc.font('Helvetica-Bold').fontSize(11).fillColor('#006A4E');
  doc.text('CASE STUDY 3: CREDIT AGRICOLE — HYBRID CLOUD & DORA COMPLIANCE', 42, 42);
  doc.moveTo(42, 56).lineTo(555, 56).lineWidth(0.3).strokeColor('#006A4E').stroke();

  // Before/After
  doc.rect(42, 62, boxW, boxH).lineWidth(0.5).strokeColor('#cc3333').stroke();
  doc.rect(42, 62, boxW, 14).fill('#cc3333');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#fff');
  doc.text('BEFORE: Pre-Cloud (2021)', 46, 65, { width: boxW - 8 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  doc.text(`• 100% on-premise (SILCA data centres, Montrouge + Chartres)
• Bull/Atos mainframes + x86 VMware estate
• 22,000 applications across 39 Caisses Regionales
• Average application age: 11.4 years
• Deployment: quarterly release windows
• Zero cloud presence (board-level cloud moratorium until 2021)
• IT budget: EUR 5.1B/year (highest in French banking)
• 28,000 IT staff (SILCA + CA-GIP + entities)
• IBM MQ / TIBCO messaging (legacy ESB)
• Oracle RAC databases: 3,400 instances`, 46, 80, { width: boxW - 8, lineGap: 0.5 });

  doc.rect(42 + boxW + 10, 62, boxW, boxH).lineWidth(0.5).strokeColor('#339933').stroke();
  doc.rect(42 + boxW + 10, 62, boxW, 14).fill('#339933');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#fff');
  doc.text('AFTER: Hybrid Target (2027)', 46 + boxW + 10, 65, { width: boxW - 8 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  doc.text(`• Azure (primary cloud) + on-premise (sovereign workloads)
• Azure Arc for hybrid management across all sites
• 40% cloud by 2027 (conservative vs. peers)
• OpenShift 4.x (Red Hat) on Azure + on-prem
• Azure DevOps CI/CD (replacing Jenkins/SVN)
• Azure Sentinel + Defender for Cloud (SIEM/XDR)
• Deployment: weekly sprints, daily for cloud-native
• "Cloud de Confiance" partnership (Bleu — Orange/Capgemini/MS)
• Azure Cosmos DB, Azure SQL, PostgreSQL Flexible
• Kafka (Confluent) replacing MQ/TIBCO`, 46 + boxW + 10, 80, { width: boxW - 8, lineGap: 0.5 });

  by = 200;
  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const caBody = `Credit Agricole SA (SIREN 784 608 416), 12 Place des Etats-Unis, 92127 Montrouge. Group structure: Federated model with 39 Caisses Regionales (cooperative banks), Amundi (asset management), Caceis (custody), LCL, CA-CIB (corporate/investment banking). Total group employees: ~147,000. Revenue (NBI): EUR 38.1 billion (FY2024).

Credit Agricole's cloud strategy is notably more conservative than Societe Generale's or AXA's, reflecting its cooperative governance structure and the complexity of coordinating across 39 semi-autonomous regional entities. The group's IT subsidiary, CA-GIP (Credit Agricole - Group Infrastructure Platform), manages centralized infrastructure from Montrouge and Chartres.`;
  doc.text(caBody, 42, by, { width: 510, lineGap: 0.8 });
  by += doc.heightOfString(caBody, { width: 510 }) + 5;

  doc.font('Helvetica-Oblique').fontSize(6.2).fillColor('#555');
  const quote3 = `"Notre approche du cloud est pragmatique et souveraine. Nous ne migrons pas pour suivre une mode — chaque workload fait l'objet d'une analyse risque/bénéfice rigoureuse. Les données sensibles de nos 52 millions de clients resteront dans des infrastructures souveraines, qu'il s'agisse de nos datacentres ou du Cloud de Confiance." — Pierre-Antoine VACHERON, Directeur Général de CA-GIP (Les Echos, Oct. 2025)`;
  doc.text(quote3, 55, by, { width: 490, lineGap: 0.6 });
  by += doc.heightOfString(quote3, { width: 490 }) + 6;

  doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#006A4E');
  doc.text('DORA COMPLIANCE — REGULATION (EU) 2022/2554', 42, by);
  by += 12;

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const doraText = `The Digital Operational Resilience Act (DORA) entered into application on 17 January 2025, imposing stringent ICT risk management requirements on all EU financial entities. Credit Agricole's DORA compliance program is one of the most complex in French banking due to the federated structure:

  Chapter II — ICT Risk Management Framework:
  • Appointed group-level CISO: Marc BRESSAND (since 2024)
  • ICT risk taxonomy: 847 identified risks across 6 categories
  • Business impact analysis: completed for all 22,000 applications (18-month effort)
  • Recovery Time Objective: <2h for critical functions, <24h for important functions

  Chapter V — ICT Third-Party Risk Management:
  • Register of all ICT third-party providers: 2,340 vendors catalogued
  • Critical ICT service providers designated: Microsoft (Azure), Accenture (managed services), IBM (mainframe), Broadcom (VMware), Red Hat (OpenShift)
  • Concentration risk assessment: Azure dependency flagged as HIGH (mitigation: Bleu sovereign cloud, on-prem failover)
  • Annual due diligence reviews for all critical providers (Art. 28-30)

  Chapter IV — Digital Operational Resilience Testing:
  • TLPT (Threat-Led Penetration Testing) per ECB/TIBER-EU framework
  • First TLPT cycle: Q2-Q4 2025 (scope: core banking, payments, trading)
  • Testing provider: Mandiant (Google) + internal Red Team (CA-GIP CSIRT)
  • Budget allocated: EUR 18M for 2025 testing cycle

  Estimated total DORA compliance cost: EUR 95M over 2024-2026 (group-wide)

Hiring: CA-GIP is recruiting 200+ positions specifically for cloud and DORA-related roles:
  — Azure Cloud Architects (x30): Landing zone, Azure Policy, Blueprints. Montrouge. 65-90k EUR.
  — OpenShift/K8s Engineers (x25): OpenShift 4.14+, Operators, GitOps. Chartres + remote. 55-75k EUR.
  — Cybersecurity Analysts (x40): Azure Sentinel, SOAR, threat hunting. Montrouge. 50-70k EUR.
  — ICT Risk Officers (x20): DORA Art.5-16 implementation, EBA guidelines. 60-80k EUR.
  — Data Engineers (x30): Azure Synapse, Data Factory, Databricks. 55-80k EUR.
  — DevOps Engineers (x35): Azure DevOps, Terraform, Ansible, Packer. 50-70k EUR.
  — Remaining: project managers, compliance officers, change management.`;
  doc.text(doraText, 42, by, { width: 510, lineGap: 0.7 });

  addFootnoteClutter(doc, 3, 5);

  // Page 4: comparison matrix
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 10);
  tinyHeader(doc, 'CS-CLOUD-FR-2025-003 | Consolidated Comparison', 'Page 4 of 6');

  doc.font('Helvetica-Bold').fontSize(10).fillColor('#232F3E');
  doc.text('CONSOLIDATED COMPARISON MATRIX', 42, 38, { align: 'center', width: 510 });

  const cHeaders = ['Dimension', 'Societe Generale', 'AXA', 'Credit Agricole'];
  const cColW = [100, 140, 140, 130];
  const cRows = [
    ['Primary Cloud', 'AWS', 'GCP', 'Azure'],
    ['Secondary Cloud', 'Azure', 'Azure + AWS', 'On-premise (sovereign)'],
    ['Container Platform', 'Amazon EKS', 'GKE / Anthos', 'OpenShift 4.x'],
    ['Employees (Global)', '~117,000', '~145,000', '~147,000'],
    ['IT Budget (est.)', 'EUR 3.2B', 'EUR 4.8B', 'EUR 5.1B'],
    ['Cloud Migration %', '65% by 2026', '95% by 2026', '40% by 2027'],
    ['Cloud Hiring (FR)', '~400 positions', '~280 positions', '~200 positions'],
    ['DORA Budget', 'EUR 55M', 'EUR 45M', 'EUR 95M'],
    ['IaC Tool', 'Terraform', 'Terraform + Crossplane', 'Terraform + ARM/Bicep'],
    ['CI/CD', 'GitLab CI', 'GitLab CI + ArgoCD', 'Azure DevOps'],
    ['Observability', 'Datadog', 'Dynatrace', 'Azure Monitor + Elastic'],
    ['Security Model', 'Zero-trust (partial)', 'Zero-trust (BeyondCorp)', 'Perimeter + zero-trust (hybrid)'],
    ['SIEM', 'Splunk + AWS SecurityHub', 'Chronicle (Google)', 'Azure Sentinel'],
    ['Key Challenge', 'Oracle DB migration', 'Multi-entity consolidation', 'Federated governance'],
    ['Sovereign Cloud', 'S3NS (Thales/Google)', 'N/A (GCP direct)', 'Bleu (Orange/Capgemini/MS)'],
  ];

  let cy = 56;
  doc.rect(42, cy, 510, 12).fill('#232F3E');
  doc.font('Helvetica-Bold').fontSize(5.5).fillColor('#fff');
  let cx = 44;
  cHeaders.forEach((h, i) => {
    doc.text(h, cx, cy + 3, { width: cColW[i] });
    cx += cColW[i];
  });
  cy += 12;

  cRows.forEach((row, ri) => {
    const rh = 14;
    if (ri % 2 === 0) doc.save().rect(42, cy, 510, rh).fill('#f5f7fa').restore();
    cx = 44;
    row.forEach((cell, ci) => {
      doc.font(ci === 0 ? 'Helvetica-Bold' : 'Courier').fontSize(ci === 0 ? 5.2 : 5).fillColor('#333');
      doc.text(cell, cx, cy + 3, { width: cColW[ci] - 4 });
      cx += cColW[ci];
    });
    // faint overlapping separator
    doc.save().opacity(0.06).moveTo(42, cy + rh).lineTo(552, cy + rh).lineWidth(0.4).strokeColor('#000').stroke().restore();
    cy += rh;
  });

  // Random technology logos described as text (overlapping, hard to parse)
  doc.save().opacity(0.05).font('Helvetica-Bold').fontSize(30).fillColor('#000');
  doc.text('AWS', 60, cy + 30);
  doc.text('GCP', 200, cy + 25);
  doc.text('Azure', 350, cy + 35);
  doc.text('K8s', 130, cy + 60);
  doc.text('Terraform', 280, cy + 55);
  doc.restore();

  addFootnoteClutter(doc, 4, 3);

  doc.end();
  return new Promise(r => stream.on('finish', r));
}

// ─────────────────────────────────────────────────────────────────────
//  PDF 3: Defense Programs Overview
// ─────────────────────────────────────────────────────────────────────
function generateDefensePDF() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 35, bottom: 40, left: 40, right: 40 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(OUT, '27_defense_programs_overview.pdf'));
  doc.pipe(stream);

  // --- PAGE 1: Title + DGA overview ---
  drawGridBackground(doc, 0, 0, 595, 842, 12);
  addWatermark(doc, '[NON CLASSIFIE] MINISTERE DES ARMEES — DIFFUSION RESTREINTE', { opacity: 0.04, size: 42, angle: -40 });

  // Classification banner
  doc.rect(0, 0, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — MENTION DE PROTECTION: DIFFUSION RESTREINTE — NP — DR', 0, 5, { align: 'center', width: 595 });

  tinyHeader(doc, 'REF: DGA/DS/SASF/2025-0847-NP-DR | BITD OVERVIEW', 'Revision: 4.1 | Date: 2025-10-01');

  // Title block
  doc.rect(42, 32, 510, 50).lineWidth(1).strokeColor('#003366').stroke();
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#003366');
  doc.text('REPUBLIQUE FRANCAISE', 42, 37, { align: 'center', width: 510 });
  doc.fontSize(9);
  doc.text('MINISTERE DES ARMEES — DIRECTION GENERALE DE L\'ARMEMENT', 42, 52, { align: 'center', width: 510 });
  doc.fontSize(7).fillColor('#555');
  doc.text('Note de synthese: Programmes d\'armement majeurs — Besoins en ingenierie 2025-2030', 42, 65, { align: 'center', width: 510 });

  // Dense metadata block
  doc.font('Courier').fontSize(4.5).fillColor('#666');
  const defMeta = [
    'Ref: DGA/DS/SASF/2025-0847-NP-DR | Classification: NON CLASSIFIE — Diffusion Restreinte',
    'Emetteur: Sous-direction des Affaires Scientifiques et de la Formation (SASF) | Visa: Col. MARTIN, DGA/DI',
    'Destinataires: BITD (diffusion selective), GICAT, GIFAS, GICAN, CAIA | Copie: EMA/CPCO, SGDSN/ANSSI',
    'Ref. LPM: Loi n° 2023-703 du 1er aout 2023 relative a la programmation militaire 2024-2030',
    'Budget LPM 2024-2030: EUR 413 milliards (dont EUR 268 Md en equipements) | PIB defense: 2% objectif OTAN',
    'Documents associes: DGA/DS/2024-0612 (SCAF), DGA/DS/2024-0789 (SCORPION), DGA/DS/2025-0123 (CYBER)',
  ];
  defMeta.forEach((line, i) => {
    doc.text(line, 42, 88 + i * 7, { width: 510 });
  });

  doc.moveTo(42, 132).lineTo(555, 132).lineWidth(0.5).strokeColor('#003366').stroke();

  // DGA Overview
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#003366');
  doc.text('1. DIRECTION GENERALE DE L\'ARMEMENT (DGA) — VUE D\'ENSEMBLE', 42, 138);

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const dgaText = `La Direction generale de l'armement (DGA), placee sous l'autorite du Ministre des Armees, est responsable de la conduite des programmes d'armement, de la preparation de l'avenir technologique de la defense et du soutien a l'exportation. Effectifs: ~10,000 personnels (ingenieurs, techniciens, administratifs) repartis sur 9 centres d'expertise et d'essais.

Centres DGA principaux (besoins en recrutement ingenierie):
  — DGA Techniques aeronautiques (DGA TA), Toulouse-Balma: 1,200 pers., aeronautique/espace
  — DGA Techniques terrestres (DGA TT), Bourges-Subdray: 800 pers., systemes terrestres/munitions
  — DGA Techniques navales (DGA TN), Toulon/Brest: 650 pers., naval/sous-marin
  — DGA Maitrise de l'information (DGA MI), Bruz/Rennes: 1,500 pers., cyber/SIGINT/electronique
  — DGA Essais en vol (DGA EV), Istres/Cazaux: 700 pers., essais aeronautiques
  — DGA Essais de missiles (DGA EM), Biscarrosse/Toulon: 400 pers., missiles/systemes d'armes
  — ONERA (Office National d'Etudes et de Recherches Aerospatiales): 2,100 pers., R&T amont

Organismes associes:
  — CEA/DAM (Commissariat a l'Energie Atomique / Dir. des Applications Militaires): dissuasion nucleaire
  — ANSSI (Agence Nationale de la Securite des SI): cyberdefense — 800 agents, recrutement +200/an
  — DGSE/DT (Direction Technique): SIGINT, moyens techniques — effectifs classifies
  — CNES (Centre National d'Etudes Spatiales): cooperation defense/spatial, Syracuse IV, CSO/Musis

Budget DGA (LPM 2024-2030 — Ventilation indicative):
  Total equipements: EUR 268 Md sur 7 ans (moy. EUR 38.3 Md/an, en hausse de +40% vs. LPM 2019-2025)
  — Dissuasion nucleaire: EUR 54 Md (SNLE 3G, ASN4G, composante oceanique/aeroportee)
  — Programmes aeronautiques: EUR 52 Md (SCAF, Rafale F5, A400M MCO, MALE RPAS Eurodrone)
  — Programmes terrestres: EUR 35 Md (Scorpion Ph.2-3, TITAN, VBAE, Serval, Griffon evol.)
  — Programmes navals: EUR 42 Md (PA-NG, FDI, SNA Suffren cl., SLAM-F, MFSMM)
  — Espace/cyber: EUR 10 Md (Syracuse IV, IRIS/Yoda, LPM Cyber EUR 4Md, CERES SIGINT)
  — Munitions/missiles: EUR 28 Md (Aster 30 B1NT, MMP, MICA NG, armes du futur)
  — Maintien en condition operationnelle (MCO): EUR 49 Md
  — Innovation/R&T: EUR 7.5 Md (ONERA, Agence Innovation Defense, PEA, ETO)`;
  doc.text(dgaText, 42, 150, { width: 510, lineGap: 0.7 });

  // Sidebar with acronyms
  drawSidebar(doc, 6, 140, 34, 440, [
    'DGA: Dir. Gen. Armement',
    'LPM: Loi Prog. Militaire',
    'BITD: Base Indust. & Tech. Defense',
    'SCAF: Syst. Combat Aerien Futur',
    'FCAS: Future Combat Air System',
    'MGCS: Main Ground Combat Syst.',
    'SNLE: Sous-marin Nucl. Lanceur Engins',
    'ASN4G: Air-Sol Nucl. 4e Gen.',
    'PA-NG: Porte-Avions Nvl Gen.',
    'FDI: Fregate Defense & Intervention',
    'SNA: Sous-marin Nucl. Attaque',
    'SLAM-F: Syst. Lutte Anti-Mines Futur',
    'MCO: Maintien Cond. Operationnelle',
    'PEA: Projet Etudes Amont',
    'ETO: Etude Technico-Operationnelle',
    'ONERA: Off. Nat. Et. Rech. Aerosp.',
    'CEA: Comm. Energie Atomique',
    'ANSSI: Ag. Nat. Sec. SI',
    'CNES: Ctr. Nat. Et. Spatiales',
    'DGSE: Dir. Gen. Sec. Exterieure',
    'EMA: Etat-Major des Armees',
    'CPCO: Ctr. Plan. Conduite Ops',
    'SGDSN: Secr. Gen. Defense & Sec. Nat.',
    'GICAT: Grp. Ind. Fr. Def. & Sec. Terr.',
    'GIFAS: Grp. Ind. Fr. Aero. & Spatial',
    'GICAN: Grp. Ind. Constr. & Act. Navales',
  ], { bg: '#f0f0e8', titleColor: '#003366', title: 'ACRONYMES', fontSize: 3.8, titleSize: 5 });

  addFootnoteClutter(doc, 1, 4);

  // Classification footer
  doc.rect(0, 824, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(6).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — DR — Page 1/4 — DGA/DS/SASF/2025-0847-NP-DR', 0, 829, { align: 'center', width: 595 });

  // --- PAGE 2: SCAF/FCAS ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 12);
  addWatermark(doc, 'SCAF — PROGRAMME MAJEUR — [NON CLASSIFIE]', { opacity: 0.04, size: 50, angle: -35 });
  doc.rect(0, 0, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — MENTION DE PROTECTION: DIFFUSION RESTREINTE — NP — DR', 0, 5, { align: 'center', width: 595 });
  tinyHeader(doc, 'REF: DGA/DS/2024-0612 | SCAF/FCAS Programme Overview', 'Page 2/4');

  doc.font('Helvetica-Bold').fontSize(9).fillColor('#003366');
  doc.text('2. PROGRAMME SCAF/FCAS — SYSTEME DE COMBAT AERIEN DU FUTUR', 42, 38);
  doc.moveTo(42, 50).lineTo(555, 50).lineWidth(0.3).strokeColor('#003366').stroke();

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const scafText = `Le programme SCAF (Systeme de Combat Aerien du Futur) / FCAS (Future Combat Air System) est le programme d'armement le plus ambitieux de l'histoire europeenne en termes de cout, de complexite technologique et de portee operationnelle. Lance conjointement par la France, l'Allemagne et l'Espagne en 2017 (lettre d'intention Macron-Merkel), le programme vise a developper un systeme de systemes aerien de 6eme generation operationnel a l'horizon 2040-2045.

STRUCTURE INDUSTRIELLE:

  Pilier 1 — NGF (Next Generation Fighter):
    Maitrise d'oeuvre: Dassault Aviation (FR) — lead integrator
    Partenaire: Airbus Defence & Space (DE/ES)
    Phase 1B (demonstrateurs): contrat EUR 3.2 Md signe dec. 2022
    Phase 2 (developpement): estimation EUR 25-35 Md (negociation en cours)
    Premier vol demonstrateur NGF: prevu 2029
    Specifications estimees: supersonique, furtif, capacite d'emport interne, propulsion nouvelle gen.
    Motorisation: Safran Aircraft Engines (FR) + MTU Aero Engines (DE) — JV "EUMET"
    Moteur: designation provisoire "M88-X evolved" → nouveau moteur cycle variable (VCE)

  Pilier 2 — Remote Carriers (RC) / Drones d'accompagnement:
    Maitrise d'oeuvre: Airbus Defence & Space (DE) — lead
    Partenaire: MBDA (FR/UK/DE/IT/ES) pour armement
    Concept: essaim de drones loyaux/consommables, communication NGF↔RC temps reel
    Technologies cles: autonomie decisionnelle (IA embarquee), cooperation multi-robots
    Besoins SW: estimés >10 MSLOC (million lines of code) pour l'ensemble RC

  Pilier 3 — Combat Cloud / Air Combat Cloud (ACC):
    Maitrise d'oeuvre: Airbus Defence & Space (ES) — lead
    Partenaires: Thales (FR), Indra (ES), HENSOLDT (DE)
    Concept: reseau de communication/partage de donnees tactiques en temps reel
    Architecture: mesh networking, Link 16 evolved, MADL-like LPI/LPD datalinks
    Cyber-resilience: chiffrement post-quantique, red. Byzantine fault tolerance
    Besoins ingenierie: >2,000 postes specialistes SW/cyber/IA identifies par DGA/GIFAS

  Pilier 4 — Capteurs / Sensors:
    Maitrise d'oeuvre: HENSOLDT (DE) — lead (radar AESA)
    Partenaires: Thales (FR) pour optronique, guerre electronique
    Technologies: radar AESA a emission distribuee, optronique IR large bande, fusion multi-capteurs IA

BESOINS EN INGENIERIE (FRANCE — DGA/GIFAS estimation 2025):

  Total postes identifies (Phase 2 preparation): ~4,500 ingenieurs/techniciens
  Repartition par domaine:
    — Aerodynamique/structures/materiaux: 320 postes (Dassault, Safran, ONERA)
    — Propulsion / thermique: 280 postes (Safran AE, ONERA)
    — Avionique / systemes embarques: 650 postes (Thales, Dassault, Safran Electronics)
    — Logiciel embarque / temps reel: 780 postes (ADA/C/C++, DO-178C, ARINC 653)
    — Intelligence artificielle / autonomie: 420 postes (Thales cortAIx, Dassault, DGA MI)
    — Cyber / securite des systemes: 350 postes (Thales, DGA MI, ANSSI)
    — Radar / guerre electronique: 280 postes (Thales, HENSOLDT FR)
    — Simulation / modeles numeriques: 250 postes (Dassault Systemes, ONERA)
    — Integration systeme / V&V: 380 postes (multi-entreprises, DGA TA/EV)
    — Gestion de programme / ingenierie systemes: 290 postes
    — Soutien logistique / MCO: 180 postes (SIAe, AIA, industriels)
    — Non-specifie / polyvalent: 320 postes

  Competences critiques identifiees (risque penurie):
    — IA embarquee temps reel (certification DAL-A DO-178C + ML) — TRES CRITIQUE
    — Architectes systemes de systemes (SoS) — CRITIQUE
    — Experts furtivite/RCS (Radar Cross Section) — CRITIQUE (competence souveraine)
    — Experts propulsion cycle variable — CRITIQUE
    — Cyber-resilience systemes d'armes — CRITIQUE`;
  doc.text(scafText, 42, 55, { width: 510, lineGap: 0.6 });

  addFootnoteClutter(doc, 2, 5);
  doc.rect(0, 824, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(6).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — DR — Page 2/4 — DGA/DS/SASF/2025-0847-NP-DR', 0, 829, { align: 'center', width: 595 });

  // --- PAGE 3: SCORPION ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 12);
  addWatermark(doc, 'SCORPION — PROGRAMME INTERARMEES — [NON CLASSIFIE]', { opacity: 0.04, size: 46, angle: -38 });
  doc.rect(0, 0, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — MENTION DE PROTECTION: DIFFUSION RESTREINTE — NP — DR', 0, 5, { align: 'center', width: 595 });
  tinyHeader(doc, 'REF: DGA/DS/2024-0789 | SCORPION Programme Overview', 'Page 3/4');

  doc.font('Helvetica-Bold').fontSize(9).fillColor('#003366');
  doc.text('3. PROGRAMME SCORPION — MODERNISATION DU COMBAT TERRESTRE', 42, 38);
  doc.moveTo(42, 50).lineTo(555, 50).lineWidth(0.3).strokeColor('#003366').stroke();

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const scorpionText = `Le programme SCORPION (Synergie du Contact Renforcee par la Polyvalence et l'InfovalorisatION) est le programme de modernisation de l'armee de Terre francaise le plus important depuis les annees 1980. Il vise a remplacer et connecter l'ensemble des moyens du combat de contact (vehicules blindes, systemes d'information, armements) dans un "combat collaboratif" integre.

VEHICULES ET SYSTEMES:

  GRIFFON VBMR (Vehicule Blinde Multi-Roles):
    Industriels: Nexter/KNDS (chassis, tourelle), Thales (SICS, optronique), Safran (viseurs)
    Commande: 1,818 vehicules (LPM 2024-2030: livraison 200/an rythme cible)
    Variantes: VBMR-PC (poste de commandement), VBMR-SAN (sanitaire), VBMR-EPC (engineering)
    Masse: 24.5t (combat), 6x6, moteur Volvo D13 450ch, protection STANAG 4569 Level 4a/4b
    Etat d'avancement: >600 livres (Q3 2025), qualification Phase 3 en cours
    Cout unitaire: ~EUR 1.5M (hors armement tourelle teleoperee)

  JAGUAR EBRC (Engin Blinde de Reconnaissance et de Combat):
    Industriels: Nexter/KNDS (tourelle T40, chassis), Thales (electronique), Safran (optronique PASEO)
    Commande: 300 vehicules (revision LPM: possible augmentation a 350)
    Armement: canon CTA 40mm (telescoped), missiles MMP Akeron, mitrailleuse 7.62mm
    Masse: 25t, 6x6, moteur Volvo D13 490ch, STANAG 4569 Level 5 frontal
    Etat d'avancement: >80 livres (Q3 2025), premier regiment equipe: 1er REC (Carpiagne)
    Cout unitaire: ~EUR 7.5M (avec tourelle T40 et systeme SICS)

  SERVAL VBMR-L (Vehicule Blinde Multi-Roles Leger):
    Industriels: Nexter/KNDS (vehicule), Thales (SICS integration)
    Commande: 2,038 vehicules (remplacement VAB, VBL en partie)
    Masse: 17t, 4x4, moteur Cummins, protection STANAG 4569 Level 2a
    Etat d'avancement: >300 livres (Q3 2025), montee en cadence 250/an
    Cout unitaire: ~EUR 0.8M

  SICS (Systeme d'Information du Combat SCORPION):
    Maitrise d'oeuvre: Atos (ex-Bull) + Thales
    Fonction: systeme de commandement tactique "infovalorise" — C4ISR (Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance)
    Architecture: reseau IP tactique, radio CONTACT (Thales), passerelle coalition
    Vetronique: ecrans tactiques vehicule, Blue Force Tracking, gestion des engagements
    Besoins SW: >5 MSLOC, qualification DGA selon ref. defense (equi. DO-178C SIL 3/4)

PROGRAMME TITAN (Future — post-SCORPION):
  Le programme TITAN (Tactical Integrated Technology for Advanced Networks) est le successeur prevu de SCORPION pour la generation 2040+, incluant:
    — MGCS (Main Ground Combat System): programme franco-allemand de remplacement du Leclerc/Leopard
      Industriels: KNDS (Nexter FR + KMW DE) — lead, Thales, Rheinmetall, MBDA
      Concept: plateforme robotisee/optionnellement pilotee, tourelle teleoperee, IA
      Phase d'etude: PEA en cours, premiere definition systeme prevue 2027
    — VBAE (Vehicule Blinde d'Aide a l'Engagement): micro-drone carrier, robot terrestre cooperant
    — Armement du futur: laser haute energie (HEL), hypervelocite, munitions intelligentes

BESOINS EN INGENIERIE (SCORPION/TITAN — DGA estimation):

  Total postes identifies 2025-2030: ~3,200 ingenieurs/techniciens
  Repartition:
    — Mecanique / structures / blindage: 280 (KNDS, Arquus)
    — Mobilite / groupe motopropulseur: 150 (KNDS, Renault Trucks Defense/Arquus)
    — Electronique embarquee / vetronique: 420 (Thales, Safran)
    — Optronique / capteurs: 220 (Safran, Thales)
    — Logiciel embarque / SICS: 580 (Atos, Thales, Bull/Eviden)
    — Integration systemes / V&V: 350 (DGA TT, industriels)
    — Telecommunications / radio: 280 (Thales — programme CONTACT)
    — IA / autonomie / robotique: 320 (Thales, KNDS, DGA MI)
    — Cybersecurite systemes d'armes: 180 (DGA MI, Thales, ANSSI)
    — Simulation / jumeaux numeriques: 140 (Dassault Systemes, ONERA)
    — Soutien logistique / MCO: 180 (SIMu, SIMMT, industriels)
    — Gestion de programme: 100

  Partenaires formation: Ecole Polytechnique, ISAE-SUPAERO, ENSTA Paris, ENSTA Bretagne, Ecole de Guerre, CentraleSupelec, INRIA`;
  doc.text(scorpionText, 42, 55, { width: 510, lineGap: 0.55 });

  addFootnoteClutter(doc, 3, 4);
  doc.rect(0, 824, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(6).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — DR — Page 3/4 — DGA/DS/SASF/2025-0847-NP-DR', 0, 829, { align: 'center', width: 595 });

  // --- PAGE 4: LPM Budget + Cyber + Summary ---
  doc.addPage();
  drawGridBackground(doc, 0, 0, 595, 842, 12);
  addWatermark(doc, 'LPM 2024-2030 — BUDGET DETAIL — [NON CLASSIFIE]', { opacity: 0.04, size: 48, angle: -37 });
  doc.rect(0, 0, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — MENTION DE PROTECTION: DIFFUSION RESTREINTE — NP — DR', 0, 5, { align: 'center', width: 595 });
  tinyHeader(doc, 'REF: DGA/DS/SASF/2025-0847-NP-DR | LPM Budget & Emerging Domains', 'Page 4/4');

  doc.font('Helvetica-Bold').fontSize(9).fillColor('#003366');
  doc.text('4. LPM 2024-2030 — FOCUS DOMAINES EMERGENTS', 42, 38);
  doc.moveTo(42, 50).lineTo(555, 50).lineWidth(0.3).strokeColor('#003366').stroke();

  // Budget table
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#003366');
  doc.text('TABLEAU 4.1: VENTILATION BUDGETAIRE LPM — DOMAINES EMERGENTS (en EUR Md)', 42, 56);

  const bHeaders = ['Domaine', 'LPM 2019-25', 'LPM 2024-30', 'Delta', 'Enjeux principaux'];
  const bColW = [80, 55, 55, 40, 280];
  const bRows = [
    ['Cyber', '1.6', '4.0', '+150%', 'COMCYBER: 5,000 cyber-combattants (obj. 2030), LIO/LIA capacites, ANSSI renfort'],
    ['Espace', '3.6', '6.0', '+67%', 'Syracuse IV sat-com, CSO optique, CERES SIGINT, Yoda espace profond, Ariane 6 mil.'],
    ['Drones / RPAS', '0.8', '5.0', '+525%', 'Eurodrone MALE (Airbus), Patroller (Safran), essaims micro-drones, SDAM'],
    ['IA defense', '0.2', '2.0', '+900%', 'AID programmes, ARTEMIS (Thales), Agence IA defense, algorithmes embarques'],
    ['Fonds marins', '—', '3.5', 'Nouveau', 'Drones sous-marins, cables sous-marins, CLF nouveau, capacite d\'intervention 6000m'],
    ['Hypersonique', '—', '2.0', 'Nouveau', 'V-MAX demonstrateur (ArianeGroup), planeur hypersonique, defense anti-hyper.'],
    ['Spatial militaire', '(incl. espace)', '(incl.)', '—', 'GRAVES NG (veille spatiale), ARES (action dans l\'espace), SSA ameliore'],
    ['Innovation/R&T', '4.6', '7.5', '+63%', 'ONERA +15% budget, AID x2, ETO/PEA acceleres, deeptech defense'],
  ];

  let bty = 70;
  doc.rect(42, bty, 510, 11).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(5).fillColor('#fff');
  let btx = 44;
  bHeaders.forEach((h, i) => {
    doc.text(h, btx, bty + 3, { width: bColW[i] });
    btx += bColW[i];
  });
  bty += 11;

  doc.font('Courier').fontSize(4.8);
  bRows.forEach((row, ri) => {
    const rh = 16;
    if (ri % 2 === 0) doc.save().rect(42, bty, 510, rh).fill('#f0f0e8').restore();
    btx = 44;
    row.forEach((cell, ci) => {
      doc.fillColor(ci === 3 && cell.includes('+') ? '#006600' : '#333');
      doc.font(ci === 0 ? 'Helvetica-Bold' : 'Courier').fontSize(ci === 4 ? 4.5 : 5);
      doc.text(cell, btx, bty + 2, { width: bColW[ci] - 2 });
      btx += bColW[ci];
    });
    bty += rh;
  });

  // Cyber section
  bty += 10;
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#003366');
  doc.text('4.1 FOCUS CYBER — COMMANDEMENT DE LA CYBERDEFENSE (COMCYBER)', 42, bty);
  bty += 12;

  doc.font('Helvetica').fontSize(6.5).fillColor('#333');
  const cyberText = `Le COMCYBER, cree en 2017 et place sous l'autorite du Chef d'Etat-Major des Armees (CEMA), est le commandement operationnel de la cyberdefense militaire francaise. Objectif LPM: 5,000 cyber-combattants d'ici 2030 (contre ~3,400 en 2024).

  Capacites LIO (Lutte Informatique Offensive): EUR 1.2 Md LPM
    — Developpement d'outils offensifs souverains (implants, C2 frameworks)
    — Cooperation DGSE/DRM pour operations cyber offensives
    — Besoin: 200 developpeurs offensifs (C/C++/Rust, kernel, reverse engineering)

  Capacites LIA (Lutte Informatique d'Influence): EUR 0.5 Md LPM
    — Detection/attribution campagnes informationnelles (VIGINUM cooperation)
    — OSINT/SOCMINT capacites, NLP/LLM pour analyse massive
    — Besoin: 80 analystes OSINT, 30 data scientists

  Capacites LID (Lutte Informatique Defensive): EUR 2.3 Md LPM
    — SOC defense (CALID), CERT defense, reseaux classifies (INTRACED, TEAPOT)
    — SIEM souverain (remplacement solutions US), EDR/XDR deploiement
    — Besoin: 400 analystes SOC, 120 incident response, 80 architectes securite

  Besoins totaux cyber (2025-2030, militaire + DGA MI + ANSSI):
    — ~1,600 recrutements identifies (dont 800 ingenieurs cyber)
    — Ecoles cibles: ENSIBS Vannes, Ecole 2600, EPITA, CentraleSupelec cyber, INSA
    — Salaires indicatifs: 38-55k EUR (juniors DGA), 55-85k EUR (seniors ANSSI), + primes sujétion

  Partenaires industriels cyber defense:
    — Thales (Cybels, Citadel, SIEM souverain): ~800 ingenieurs cyber en France
    — Airbus CyberSecurity (Toulouse): ~350 ingenieurs
    — Eviden/Atos (BDS division): ~600 ingenieurs
    — Cap Gemini (Sogeti cyber): ~1,200 consultants
    — Orange Cyberdefense: ~900 analystes/consultants
    — Startups BITD: Tehtris, HarfangLab, Gatewatcher, Sekoia, CrowdSec`;
  doc.text(cyberText, 42, bty, { width: 510, lineGap: 0.6 });

  bty += doc.heightOfString(cyberText, { width: 510 }) + 10;

  // Summary box
  doc.rect(42, bty, 510, 85).lineWidth(1).strokeColor('#003366').stroke();
  doc.rect(42, bty, 510, 14).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#FFD700');
  doc.text('SYNTHESE — BESOINS EN INGENIERIE DEFENSE 2025-2030', 46, bty + 3, { width: 500 });
  doc.font('Helvetica').fontSize(6).fillColor('#333');
  doc.text(`Total postes ingenierie identifies (tous programmes majeurs confondus):
  SCAF/FCAS: ~4,500 | SCORPION/TITAN: ~3,200 | Cyber: ~1,600 | Naval (PA-NG/FDI/SNA): ~2,100 | Espace: ~800 | Drones: ~600 | Dissuasion: ~1,200 (classifie) | Autres: ~1,500
  TOTAL ESTIME: ~15,500 postes ingenieurs/techniciens superieurs a pourvoir 2025-2030

  Principales entreprises BITD recrutrices: Thales (~3,500 postes), Dassault Aviation (~1,800), Safran (~2,200), KNDS/Nexter (~1,100), MBDA (~900), Naval Group (~1,500), Airbus D&S (~1,200), DGA (~800), Eviden/Atos (~600), autres PME/ETI (~2,000)

  Tension maximale: IA embarquee, cybersecurite, logiciel critique temps reel (DO-178C/IEC 61508), architectes systemes de systemes`, 46, bty + 18, { width: 500, lineGap: 0.7 });

  addFootnoteClutter(doc, 4, 3);
  doc.rect(0, 824, 595, 18).fill('#003366');
  doc.font('Helvetica-Bold').fontSize(6).fillColor('#FFD700');
  doc.text('[NON CLASSIFIE] — DR — Page 4/4 — DGA/DS/SASF/2025-0847-NP-DR — FIN DU DOCUMENT', 0, 829, { align: 'center', width: 595 });

  doc.end();
  return new Promise(r => stream.on('finish', r));
}

// ─────────────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Generating 3 hard-to-parse PDFs...');
  await Promise.all([
    generateMedicalDevicesPDF(),
    generateCloudMigrationPDF(),
    generateDefensePDF(),
  ]);
  console.log('Done. Files written to:', OUT);
  fs.readdirSync(OUT).filter(f => f.match(/^2[567]_/)).forEach(f => {
    const stats = fs.statSync(path.join(OUT, f));
    console.log(`  ${f} — ${(stats.size / 1024).toFixed(1)} KB`);
  });
}

main().catch(err => { console.error(err); process.exit(1); });
