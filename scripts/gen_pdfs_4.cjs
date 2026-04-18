const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────
// HELPERS — make things hard to parse
// ─────────────────────────────────────────────────────────────

function drawWatermark(doc, text, opts = {}) {
  const { angle = -40, opacity = 0.06, fontSize = 48 } = opts;
  doc.save();
  doc.opacity(opacity);
  doc.font('Helvetica').fontSize(fontSize).fillColor('#888');
  doc.rotate(angle, { origin: [300, 400] });
  for (let wy = -300; wy < 1200; wy += 110) {
    doc.text(text, -100, wy, { lineBreak: false });
  }
  doc.restore();
}

function drawNoise(doc, count = 40) {
  doc.save();
  doc.opacity(0.04);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 600;
    const y = Math.random() * 800;
    const r = Math.random() * 3 + 0.5;
    doc.circle(x, y, r).fill('#888');
  }
  doc.restore();
}

function hrLine(doc, y, opts = {}) {
  const { width = 500, dash = null, color = '#999' } = opts;
  doc.save();
  doc.strokeColor(color).lineWidth(0.5);
  if (dash) doc.dash(dash, { space: dash });
  doc.moveTo(50, y).lineTo(50 + width, y).stroke();
  doc.undash();
  doc.restore();
}

function sidewaysText(doc, text, x, y, fontSize = 7) {
  doc.save();
  doc.fontSize(fontSize).fillColor('#bbb');
  doc.rotate(-90, { origin: [x, y] });
  doc.text(text, x, y, { lineBreak: false });
  doc.restore();
}

// overlapping grey box to confuse OCR / text extraction
function greyOverlay(doc, x, y, w, h, opacity = 0.03) {
  doc.save();
  doc.opacity(opacity);
  doc.rect(x, y, w, h).fill('#000');
  doc.restore();
}

// Write text with random kerning jitter
function jitteryText(doc, text, x, y, opts = {}) {
  const { fontSize = 10, font = 'Helvetica', color = '#222' } = opts;
  doc.font(font).fontSize(fontSize).fillColor(color);
  let cx = x;
  for (const ch of text) {
    doc.text(ch, cx, y, { lineBreak: false });
    cx += doc.widthOfString(ch) + (Math.random() * 1.2 - 0.4);
  }
}

// ─────────────────────────────────────────────────────────────
// PDF 1 — Pharma / Biotech Directory
// ─────────────────────────────────────────────────────────────

function genPharmaDirectory() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 60, bottom: 60, left: 55, right: 55 },
    info: {
      Title: 'FR Pharma & Biotech Directory — H2 2024 (DRAFT)',
      Author: 'HealthTech Insights SARL',
      Subject: 'Pharma Biotech Companies France',
      Keywords: 'pharma,biotech,directory,france',
      CreationDate: new Date('2024-09-15'),
    },
  });
  const stream = fs.createWriteStream(path.join(OUT_DIR, '10_pharma_biotech_directory.pdf'));
  doc.pipe(stream);

  // ── Title page (messy) ──
  drawWatermark(doc, 'CONFIDENTIAL — DO NOT DISTRIBUTE');
  drawNoise(doc, 60);
  doc.fontSize(8).fillColor('#ccc').text('Document ID: PHDIR-2024-H2-DRAFT-v0.3r7', 55, 60, { align: 'right' });
  doc.fontSize(6).fillColor('#ddd').text('Auto-generated ' + new Date().toISOString() + ' — formatting may vary', 55, 72, { align: 'right' });

  doc.moveDown(4);
  doc.fontSize(22).fillColor('#1a1a5e').font('Helvetica-Bold')
    .text('FRENCH PHARMA & BIOTECH', { align: 'center' });
  doc.fontSize(18).fillColor('#444').font('Helvetica')
    .text('COMPANY DIRECTORY', { align: 'center' });
  doc.moveDown(0.4);
  doc.fontSize(11).fillColor('#888').text('Second Half 2024  |  DRAFT — INTERNAL USE', { align: 'center' });

  // random "scan artifacts"
  greyOverlay(doc, 30, 200, 535, 3);
  greyOverlay(doc, 200, 300, 2, 200, 0.05);

  doc.moveDown(3);
  doc.fontSize(7).fillColor('#aaa')
    .text('Compiled by HealthTech Insights SARL for internal evaluation. Data sourced from public filings, press releases, and third-party databases. Accuracy not guaranteed. Fields may be incomplete. Do not redistribute. Formatting generated automatically — some entries may appear truncated or re-ordered due to ingestion pipeline variations. See appendix for methodology notes (not included in this excerpt).', {
      width: 420, align: 'justify', lineGap: 1
    });

  // footer noise
  sidewaysText(doc, 'PHDIR-2024-H2-DRAFT // page 1 of 4 // CONFIDENTIAL', 30, 780, 6);

  // ── Page 2: Sanofi entry ──
  doc.addPage();
  drawNoise(doc, 35);
  greyOverlay(doc, 40, 55, 510, 18, 0.04);

  // Header bar
  doc.rect(45, 55, 505, 18).fill('#1a1a5e');
  doc.fontSize(9).fillColor('#fff').font('Helvetica-Bold')
    .text('DIRECTORY ENTRY — PHARMA/BIOTECH', 55, 59);
  doc.fillColor('#ddd').fontSize(7).font('Helvetica')
    .text('Page 2', 500, 59, { align: 'right', width: 40 });

  let y = 90;
  // Sanofi — fields in a particular order
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#1a1a5e')
    .text('Sanofi S.A.', 55, y);
  y += 22;

  // Deliberately mix field formatting: some bold labels, some not, inconsistent separators
  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Sector/Industry: Pharmaceuticals, Healthcare, Life Sciences', 55, y); y += 14;
  doc.font('Helvetica-Bold').text('HQ:', 55, y, { continued: true })
    .font('Helvetica').text('  54 rue La Boétie, 75008 Paris, France', { continued: false }); y += 14;
  doc.text('Headcount (approx.) .......... 91,000 employees worldwide', 55, y); y += 14;
  doc.text('Revenue:  EUR 43 billion (FY 2023, IFRS reported)', 55, y); y += 14;

  // Now a block of free-form text to confuse structured extraction
  doc.fontSize(8).fillColor('#555');
  doc.text('Sanofi is a global pharmaceutical & healthcare company headquartered in Paris. Core therapeutic areas include immunology, oncology, rare diseases, and vaccines (Sanofi Pasteur). The company operates extensive R&D facilities across France (Vitry-sur-Seine, Montpellier, Strasbourg) and internationally.', 55, y, { width: 480, lineGap: 1.5 }); y += 52;

  hrLine(doc, y, { dash: 3, color: '#ccc' }); y += 8;

  // Compliance / regulatory block — different format
  doc.font('Courier').fontSize(7).fillColor('#666');
  doc.text('REGULATORY NOTES:', 55, y); y += 11;
  doc.text('  - Phase III clinical trials (multiple active programs)', 55, y); y += 10;
  doc.text('  - GxP validation requirements across manufacturing sites', 55, y); y += 10;
  doc.text('  - 21 CFR Part 11 compliance (electronic records/signatures)', 55, y); y += 10;
  doc.text('  - EMA/ANSM oversight; subject to GDPR + HDS requirements', 55, y); y += 10;
  doc.text('  - CSV (Computer System Validation) mandatory for production systems', 55, y); y += 16;

  hrLine(doc, y, { width: 480 }); y += 6;

  // Overlap some light grey text as "redacted" noise
  doc.save();
  doc.opacity(0.08).fontSize(11).fillColor('#000');
  doc.text('[INTERNAL SCORING: A+ // priority target // decision-maker TBD]', 80, y);
  doc.restore();
  y += 22;

  // ── Servier entry — deliberately different field order, some missing ──
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a5e')
    .text('Les Laboratoires Servier', 55, y);
  y += 20;

  // Start with revenue instead of sector
  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Annual Revenue:  approx. 5.9 billion EUR', 55, y); y += 13;
  doc.text('Employees: ~21,000', 55, y); y += 13;
  doc.text('Type: Pharmaceutical (private, family-owned group)', 55, y); y += 13;
  doc.font('Helvetica-Oblique').fontSize(8).fillColor('#666')
    .text('Headquarters: Suresnes (Hauts-de-Seine), near Paris', 55, y); y += 18;

  // Free text paragraph
  doc.font('Helvetica').fontSize(8).fillColor('#444');
  doc.text('Servier is the second-largest French pharmaceutical group. The company is undergoing a significant digital transformation initiative, investing in data science, AI-driven drug discovery, and cloud migration. They are actively hiring data scientists, ML engineers, and IT consultants for transformation programs. Therapeutic focus: cardiology, oncology, neuropsychiatry, immuno-inflammation, diabetes.', 55, y, { width: 475, lineGap: 1.2 }); y += 58;

  // Stray metadata line
  doc.font('Courier').fontSize(6).fillColor('#bbb');
  doc.text('src: crunchbase+societe.com | last_verified: 2024-06-12 | confidence: MEDIUM', 55, y); y += 14;

  hrLine(doc, y, { dash: 6, color: '#aaa', width: 480 }); y += 10;

  // ── Page 3: BioMérieux entry ──
  doc.addPage();
  drawNoise(doc, 45);
  drawWatermark(doc, 'DRAFT v0.3');

  // Repeat header (slightly different styling to be annoying)
  doc.rect(45, 55, 505, 16).fill('#2a2a6e');
  doc.fontSize(8).fillColor('#eee').font('Helvetica-Bold')
    .text('FR PHARMA/BIOTECH DIRECTORY — CONTINUED', 55, 58);
  doc.fillColor('#ccc').fontSize(6).font('Helvetica')
    .text('p. 3', 510, 58, { align: 'right', width: 30 });

  y = 88;
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#1a1a5e')
    .text('bioMérieux S.A.', 55, y);
  // Note: deliberate lowercase 'b' in name
  y += 20;

  // Yet another field order and format
  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Industry ..... In Vitro Diagnostics (IVD), Microbiology, Clinical Diagnostics', 55, y); y += 14;
  doc.text('Locations: Lyon (HQ — Marcy-l\'Étoile), Grenoble, La Balme-les-Grottes, + international', 55, y); y += 14;

  // Table-like but not actually a table
  doc.font('Courier').fontSize(8).fillColor('#333');
  doc.text('Employees       |  ~14,000', 55, y); y += 12;
  doc.text('Revenue (2023)  |  EUR 3.7 billion', 55, y); y += 12;
  doc.text('Listed          |  Euronext Paris (BIM)', 55, y); y += 12;
  doc.text('Founded         |  1963 (Mérieux family)', 55, y); y += 18;

  doc.font('Helvetica').fontSize(8).fillColor('#555');
  doc.text('bioMérieux specializes in in vitro diagnostics — systems and reagents for clinical and industrial microbiology. Regulatory environment is intense: facing significant compliance pressure from EU MDR (Medical Device Regulation) and IVDR (In Vitro Diagnostic Regulation) transition deadlines. This drives demand for regulatory affairs consultants, quality system overhauls, and validation/verification projects.', 55, y, { width: 475, lineGap: 1.3 }); y += 62;

  // Random "stamped" note
  doc.save();
  doc.rotate(-8, { origin: [300, y + 20] });
  doc.fontSize(16).fillColor('#cc0000').opacity(0.12);
  doc.text('NEEDS REVIEW — DATA UNVERIFIED', 120, y + 10);
  doc.restore();
  y += 50;

  hrLine(doc, y, { color: '#666' }); y += 12;

  // Fake "end of section" noise
  doc.font('Helvetica').fontSize(7).fillColor('#aaa');
  doc.text('--- END OF EXCERPT --- Full directory contains 47 entries. Contact insights@healthtech-insights.example for access. ---', 55, y, { width: 480, align: 'center' });

  // Footer
  y = 750;
  doc.fontSize(5).fillColor('#ccc');
  doc.text('© 2024 HealthTech Insights SARL. All rights reserved. Unauthorized reproduction prohibited. Auto-generated document; layout inconsistencies are expected.', 55, y, { width: 480 });
  sidewaysText(doc, 'PHDIR-2024-H2-DRAFT // CONFIDENTIAL // page 3', 32, 780, 5);

  doc.end();
  return new Promise(resolve => stream.on('finish', resolve));
}

// ─────────────────────────────────────────────────────────────
// PDF 2 — Startup Funding Roundup (Newsletter style)
// ─────────────────────────────────────────────────────────────

function genStartupFunding() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    info: {
      Title: 'FrenchTech Weekly #237 — Funding Roundup',
      Author: 'FrenchTech Weekly',
      Subject: 'Startup Funding News',
      Keywords: 'startups,funding,french tech,venture capital',
      CreationDate: new Date('2024-11-02'),
    },
  });
  const stream = fs.createWriteStream(path.join(OUT_DIR, '11_startup_funding_roundup.pdf'));
  doc.pipe(stream);

  // ── PAGE 1 ──
  drawNoise(doc, 50);

  // Top banner
  doc.rect(0, 0, 600, 42).fill('#0a0a2e');
  doc.fontSize(7).fillColor('#6a6aee').font('Helvetica')
    .text('frenchtech-weekly.example  |  Subscribe  |  Advertise  |  Archive  |  RSS', 55, 12, { width: 490 });
  doc.fontSize(5).fillColor('#555')
    .text('Follow us: twitter.com/ftwkly • linkedin.com/company/ftwkly • mastodon.social/@ftwkly • newsletter@frenchtech-weekly.example', 55, 26, { width: 490 });

  let y = 55;
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#0a0a2e')
    .text('FrenchTech Weekly', 55, y);
  y += 26;
  doc.font('Helvetica').fontSize(9).fillColor('#888')
    .text('Issue #237 — November 2, 2024  |  Your weekly dose of French startup news', 55, y);
  y += 20;

  hrLine(doc, y, { width: 490, color: '#ddd' }); y += 12;

  // SPONSORED section (mixed in)
  doc.save();
  doc.rect(55, y, 490, 40).fill('#fffbe6');
  doc.fontSize(6).fillColor('#cc9900').font('Helvetica-Bold')
    .text('SPONSORED', 60, y + 4);
  doc.font('Helvetica').fontSize(7).fillColor('#666')
    .text('CloudForce ERP — The #1 cloud ERP for fast-growing startups. Trusted by 2,000+ companies. Try free for 30 days → cloudforce-erp.example/frenchtech', 60, y + 14, { width: 475 });
  doc.restore();
  y += 50;

  // ── Exotec ──
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#111')
    .text('Exotec Raises EUR 335M to Scale Warehouse Robotics', 55, y);
  y += 22;
  doc.font('Helvetica').fontSize(8).fillColor('#888')
    .text('ROBOTICS  •  LOGISTICS  •  SERIES D  •  LILLE, FRANCE', 55, y);
  y += 16;

  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Exotec, the Lille-based warehouse robotics company, has secured a massive EUR 335 million in its latest funding round, valuing the company at over EUR 2 billion. The company, which now employs roughly 1,000 people, designs and manufactures the Skypod robotic system for warehouse automation. Clients include major retailers and logistics providers across Europe and North America.', 55, y, { width: 340, lineGap: 2 }); y += 68;

  doc.font('Helvetica-Oblique').fontSize(8).fillColor('#555');
  doc.text('"We are building the next generation of warehouse infrastructure," said CEO Romain Moulin. "Our technology reduces picking time by 5x while improving accuracy to 99.99%."', 55, y, { width: 340, lineGap: 1.5 }); y += 42;

  // Sidebar (right column) — ads and junk
  const sideX = 420;
  doc.save();
  doc.rect(sideX, 150, 130, 380).fill('#f5f5f5');
  doc.fontSize(6).fillColor('#aaa').font('Helvetica-Bold')
    .text('SPONSORED LINKS', sideX + 8, 158);
  doc.font('Helvetica').fontSize(7).fillColor('#666');
  doc.text('» TalentPool.io — Hire senior devs in 48h', sideX + 8, 175, { width: 115 });
  doc.text('» ScaleUp Legal — Startup lawyers from €99/mo', sideX + 8, 200, { width: 115 });
  doc.text('» DataCenter.fr — GPU clusters on demand', sideX + 8, 225, { width: 115 });
  doc.text('» FrenchTech Visa — Relocate to France', sideX + 8, 250, { width: 115 });

  // Fake social sharing buttons as text
  doc.fontSize(6).fillColor('#999');
  doc.text('Share: [Twitter] [LinkedIn] [Email] [Copy Link]', sideX + 8, 290, { width: 115 });

  // "Trending" sidebar
  doc.fontSize(7).fillColor('#0a0a2e').font('Helvetica-Bold');
  doc.text('TRENDING THIS WEEK', sideX + 8, 320);
  doc.font('Helvetica').fontSize(6.5).fillColor('#555');
  doc.text('1. AI regulation debate heats up', sideX + 8, 336, { width: 115 });
  doc.text('2. Paris office rents hit record', sideX + 8, 350, { width: 115 });
  doc.text('3. Crypto winter: who survived?', sideX + 8, 364, { width: 115 });
  doc.text('4. Deep tech VC funding Q3 report', sideX + 8, 378, { width: 115 });
  doc.text('5. Station F expanding to Lyon', sideX + 8, 392, { width: 115 });
  doc.restore();

  // Key facts box for Exotec (overlapping main text area)
  doc.save();
  doc.roundedRect(55, y, 340, 55, 3).fill('#f0f4ff');
  doc.fontSize(7).fillColor('#333').font('Helvetica-Bold');
  doc.text('KEY FACTS:', 62, y + 6);
  doc.font('Helvetica').fontSize(7).fillColor('#444');
  doc.text('Founded: 2015  |  Employees: ~1,000  |  HQ: Croix (Lille metro)', 62, y + 18, { width: 320 });
  doc.text('Total raised: EUR 335M+  |  Valuation: >EUR 2B  |  Sector: Warehouse Automation / Robotics', 62, y + 30, { width: 320 });
  doc.text('Key clients: Uniqlo, Carrefour, Decathlon, Gap  |  Skypod system deployed in 20+ countries', 62, y + 42, { width: 320 });
  doc.restore();
  y += 68;

  hrLine(doc, y, { width: 340, dash: 2, color: '#ddd' }); y += 12;

  // ── Doctolib ──
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#111')
    .text('Doctolib Expands Beyond Booking — But Is It Tech?', 55, y);
  y += 18;
  doc.font('Helvetica').fontSize(8).fillColor('#888')
    .text('HEALTHTECH  •  SAAS  •  PARIS', 55, y);
  y += 14;

  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Doctolib, the Paris-based health appointment platform with 2,800 employees, continues to expand its suite of tools for healthcare practitioners. While technically a tech company, its focus remains firmly on the healthcare/medical vertical — building scheduling, teleconsultation, and practice management software for doctors and clinics. The company is not a typical engineering/IT consulting target, as its tech stack is deeply specialized for the healthcare domain.', 55, y, { width: 340, lineGap: 1.8 }); y += 78;

  // deliberately confusing: a small note in different color
  doc.fontSize(6).fillColor('#999');
  doc.text('Editor\'s note: Doctolib is included for completeness but is not a traditional IT services buyer. Their engineering is largely in-house.', 55, y, { width: 340 }); y += 22;

  // ── Page 2 ──
  doc.addPage();
  drawNoise(doc, 55);
  drawWatermark(doc, 'FrenchTech Weekly #237');

  // Repeat top banner (slightly different — newsletters do this)
  doc.rect(0, 0, 600, 30).fill('#0a0a2e');
  doc.fontSize(6).fillColor('#6a6aee')
    .text('FrenchTech Weekly #237  |  Nov 2, 2024  |  frenchtech-weekly.example', 55, 10);

  y = 45;

  // ANOTHER sponsored block
  doc.save();
  doc.rect(55, y, 490, 35).fill('#f0fff0');
  doc.fontSize(6).fillColor('#339933').font('Helvetica-Bold')
    .text('PARTNER CONTENT', 60, y + 4);
  doc.font('Helvetica').fontSize(7).fillColor('#555')
    .text('GreenCloud Hosting — Carbon-neutral cloud infrastructure for startups. Certified ISO 14001. Free migration assessment → greencloud.example/free', 60, y + 15, { width: 475 });
  doc.restore();
  y += 45;

  // ── Mistral AI ──
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#111')
    .text('Mistral AI: The Hottest (and Most Debated) French Startup', 55, y);
  y += 22;
  doc.font('Helvetica').fontSize(8).fillColor('#888')
    .text('ARTIFICIAL INTELLIGENCE  •  LLM  •  PARIS  •  MEGA-ROUND', 55, y);
  y += 16;

  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Mistral AI, the Paris-based AI research company founded by former Meta and DeepMind researchers, has raised a massive funding round bringing its total to over EUR 1 billion. With approximately 600 employees, the company is focused exclusively on developing large language models and AI infrastructure. While the funding numbers are eye-catching, Mistral\'s needs are very specific: AI researchers, ML infrastructure engineers, and GPU compute. The company is unlikely to be a significant buyer of traditional IT consulting or engineering services, though they may need specialized cloud/infrastructure support.', 55, y, { width: 490, lineGap: 2 }); y += 100;

  // Confusing inline "tag cloud"
  doc.fontSize(6).fillColor('#aaa');
  doc.text('Tags: #AI #LLM #FrenchTech #DeepTech #VentureCapital #Paris #OpenSource #Mixtral #funding #unicorn #GenerativeAI #foundation-models', 55, y, { width: 490 }); y += 18;

  hrLine(doc, y, { width: 490, color: '#eee' }); y += 14;

  // ── Ynsect ──
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#111')
    .text('Ynsect Pivots Again — Insect Protein Startup Struggles', 55, y);
  y += 18;
  doc.font('Helvetica').fontSize(8).fillColor('#888')
    .text('BIOTECH  •  AGRITECH  •  AMIENS  •  SERIES C', 55, y);
  y += 14;

  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Ynsect, the Amiens-based insect protein startup with roughly 400 employees, continues to face challenges scaling its mealworm farming operations. The company has raised significant venture capital but has yet to achieve profitability. While innovative, the company is too small and too far outside the IT/engineering consulting sector to be a relevant prospect. Their technology is in bioprocessing and agricultural automation, not enterprise IT.', 55, y, { width: 490, lineGap: 1.8 }); y += 82;

  // More newsletter junk at the bottom
  hrLine(doc, y, { width: 490, dash: 4, color: '#ddd' }); y += 14;

  doc.save();
  doc.rect(55, y, 490, 80).fill('#fafafa');
  doc.fontSize(8).fillColor('#333').font('Helvetica-Bold')
    .text('YOU MIGHT ALSO LIKE:', 62, y + 8);
  doc.font('Helvetica').fontSize(7).fillColor('#555');
  doc.text('• Why French Deep Tech Is Beating Silicon Valley (Issue #234)', 62, y + 22, { width: 470 });
  doc.text('• The Complete Guide to FrenchTech Visa (Issue #230)', 62, y + 34, { width: 470 });
  doc.text('• How Qonto Became Europe\'s Favorite Business Bank (Issue #228)', 62, y + 46, { width: 470 });
  doc.text('• Interview: BPI France on Deep Tech Investment Strategy (Issue #225)', 62, y + 58, { width: 470 });
  doc.restore();
  y += 100;

  // Footer
  doc.fontSize(5).fillColor('#bbb');
  doc.text('FrenchTech Weekly is published by FTW Media SAS, 12 rue de Turbigo, 75003 Paris. ISSN 2847-XXXX. To unsubscribe: frenchtech-weekly.example/unsub?token=a8f3d. This email was sent to {subscriber_email}. Privacy policy: frenchtech-weekly.example/privacy. © 2024 FTW Media SAS. All rights reserved.', 55, y, { width: 490, lineGap: 0.5 });

  doc.end();
  return new Promise(resolve => stream.on('finish', resolve));
}

// ─────────────────────────────────────────────────────────────
// PDF 3 — Paris Air Show Exhibitor Catalog
// ─────────────────────────────────────────────────────────────

function genSalonBourget() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 45, bottom: 40, left: 40, right: 40 },
    info: {
      Title: 'SIAE 2025 — Salon International de l\'Aéronautique et de l\'Espace — Exhibitor Catalog (Partial)',
      Author: 'SIAE / GIFAS',
      Subject: 'Paris Air Show Exhibitor List',
      Keywords: 'paris air show,salon du bourget,aerospace,defense,exhibitors',
      CreationDate: new Date('2025-05-20'),
    },
  });
  const stream = fs.createWriteStream(path.join(OUT_DIR, '12_salon_bourget_exhibitors.pdf'));
  doc.pipe(stream);

  const colW = 240;
  const col1X = 40;
  const col2X = 295;
  const pageW = 515;

  function pageHeader(pageNum) {
    // Dense header bar
    doc.rect(0, 0, 600, 38).fill('#002244');
    doc.fontSize(8).fillColor('#fff').font('Helvetica-Bold')
      .text('SIAE 2025 — SALON INTERNATIONAL DE L\'AÉRONAUTIQUE ET DE L\'ESPACE', 45, 8, { width: 400 });
    doc.fontSize(6).fillColor('#88bbee')
      .text('LE BOURGET, 16–22 JUIN 2025', 45, 22);
    doc.fontSize(6).fillColor('#88bbee').font('Helvetica')
      .text(`EXHIBITOR CATALOG — p. ${pageNum}`, 460, 14, { width: 80, align: 'right' });

    // Sub-header line
    doc.rect(0, 38, 600, 12).fill('#eef2f7');
    doc.fontSize(5).fillColor('#666')
      .text('Hall assignments subject to change  |  [LOGO] GIFAS  |  [LOGO] SIAE  |  Catalogue officiel des exposants — Extrait', 45, 40);
  }

  // ── PAGE 1 ──
  pageHeader(1);
  drawNoise(doc, 30);

  let y = 62;

  // Title section
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#002244')
    .text('AEROSPACE & DEFENSE — EXHIBITORS (A–L)', col1X, y, { width: pageW });
  y += 16;
  doc.font('Helvetica').fontSize(6).fillColor('#999')
    .text('Sorted alphabetically. Booth assignments as of May 2025. Subject to change. [LOGO] indicates company logo placement in print edition.', col1X, y, { width: pageW });
  y += 18;

  hrLine(doc, y, { width: pageW, color: '#002244' }); y += 8;

  // ── LEFT COLUMN: Dassault Aviation ──
  let ly = y;
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#002244')
    .text('[LOGO] DASSAULT AVIATION', col1X, ly);
  ly += 14;
  doc.font('Courier').fontSize(6).fillColor('#555')
    .text('Hall 2A — Booth #2A-117 — CHALET C-04', col1X, ly);
  ly += 10;

  doc.font('Helvetica').fontSize(7).fillColor('#333');
  doc.text('Military & civil aviation OEM. Rafale multirole combat aircraft, Falcon business jets (7X/8X/6X/900), nEUROn UCAV demonstrator program.', col1X, ly, { width: colW, lineGap: 1 }); ly += 32;

  // Dense specs
  doc.font('Courier').fontSize(5.5).fillColor('#444');
  const dassaultSpecs = [
    'Type:        Aerospace & Defense OEM',
    'HQ:          Saint-Cloud (92), France',
    'Employees:   12,700 (group)',
    'Revenue:     EUR 7.5B (FY23)',
    'CEO:         E. Trappier',
    'Founded:     1929 (M. Dassault)',
    'Euronext:    AM.PA',
    'Programs:    Rafale F4, Falcon 10X,',
    '             nEUROn drone, FCAS/SCAF',
    'Standards:   DO-178C, DO-254, EN 9100',
    '             MIL-STD-810, ITAR controlled',
    'Exhibiting:  Rafale F4 (static + demo),',
    '             Falcon 10X mockup,',
    '             nEUROn 1:1 model',
    'Contact:     expo@dassault-aviation.example',
  ];
  for (const line of dassaultSpecs) {
    doc.text(line, col1X, ly, { width: colW }); ly += 8;
  }
  ly += 4;

  // Tiny footnote text
  doc.font('Helvetica').fontSize(5).fillColor('#aaa');
  doc.text('* Dassault Aviation is a subsidiary of Groupe Industriel Marcel Dassault (GIMD). Not to be confused with Dassault Systèmes (3DS/software).', col1X, ly, { width: colW }); ly += 16;

  hrLine(doc, ly, { width: colW - 10, dash: 2, color: '#ccc' }); ly += 8;

  // A few filler/noise entries in left column
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#002244');
  doc.text('[LOGO] AIRBUS DEFENCE & SPACE', col1X, ly); ly += 10;
  doc.font('Courier').fontSize(5.5).fillColor('#555');
  doc.text('Hall 1 — Booth #1-001 — CHALET A-01', col1X, ly); ly += 8;
  doc.font('Helvetica').fontSize(6).fillColor('#666');
  doc.text('See separate Airbus group entry. A400M, Eurofighter, space systems, secure comms.', col1X, ly, { width: colW }); ly += 22;

  doc.font('Helvetica-Bold').fontSize(7).fillColor('#002244');
  doc.text('[LOGO] ARIANEGROUP', col1X, ly); ly += 10;
  doc.font('Courier').fontSize(5.5).fillColor('#555');
  doc.text('Hall 3 — Booth #3-200', col1X, ly); ly += 8;
  doc.font('Helvetica').fontSize(6).fillColor('#666');
  doc.text('Ariane 6 launcher, space propulsion, missile systems. JV Airbus/Safran. Les Mureaux (78).', col1X, ly, { width: colW }); ly += 22;

  doc.font('Helvetica-Bold').fontSize(7).fillColor('#002244');
  doc.text('[LOGO] DAHER', col1X, ly); ly += 10;
  doc.font('Courier').fontSize(5.5).fillColor('#555');
  doc.text('Hall 2B — Booth #2B-044', col1X, ly); ly += 8;
  doc.font('Helvetica').fontSize(6).fillColor('#666');
  doc.text('Aerostructures, logistics, TBM aircraft. 14,000 emp. Toulouse/Paris.', col1X, ly, { width: colW }); ly += 18;

  // ── RIGHT COLUMN: Safran entry ──
  let ry = y;
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#002244')
    .text('[LOGO] SAFRAN ELECTRONICS & DEFENSE', col2X, ry);
  ry += 14;
  doc.font('Courier').fontSize(6).fillColor('#555')
    .text('Hall 4 — Booth #4-301 / 4-302', col2X, ry);
  ry += 10;
  doc.font('Helvetica').fontSize(6.5).fillColor('#888')
    .text('(Subsidiary of SAFRAN Group)', col2X, ry);
  ry += 12;

  doc.font('Helvetica').fontSize(7).fillColor('#333');
  doc.text('Avionics, optronics, inertial navigation systems (INS), optronic pods, self-protection systems for military platforms. Part of Safran group (83,000 emp., EUR 23.2B rev.).', col2X, ry, { width: colW, lineGap: 1 }); ry += 38;

  doc.font('Courier').fontSize(5.5).fillColor('#444');
  const safranSpecs = [
    'Division:    Electronics & Defense',
    'HQ:          Massy (91), France',
    'Parent:      Safran S.A. (SAF.PA)',
    'Specialties: INS, FELIN soldier sys,',
    '             Euroflir, Paseo, Patroller',
    '             drone sensors, sighting sys',
    'Standards:   DO-178C, DO-254, MIL-STD,',
    '             ITAR/EAR, NATO STANAG',
    'Exhibiting:  Euroflir 410 (new!),',
    '             Patroller UAS sensors,',
    '             AASM Hammer guidance kit',
  ];
  for (const line of safranSpecs) {
    doc.text(line, col2X, ry, { width: colW }); ry += 8;
  }
  ry += 8;

  hrLine(doc, ry, { width: colW - 10, dash: 2, color: '#ccc' }); ry += 8;

  // ── Liebherr Aerospace in right column ──
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#002244')
    .text('[LOGO] LIEBHERR-AEROSPACE', col2X, ry);
  ry += 14;
  doc.font('Courier').fontSize(6).fillColor('#555')
    .text('Hall 2B — Booth #2B-210', col2X, ry);
  ry += 10;
  doc.font('Helvetica').fontSize(6.5).fillColor('#888')
    .text('(Liebherr-Aerospace & Transportation SAS)', col2X, ry);
  ry += 12;

  doc.font('Helvetica').fontSize(7).fillColor('#333');
  doc.text('Aircraft systems: air management (bleed air, packs), flight control actuation, landing gear, hydraulic & pneumatic systems. Tier 1 supplier to Airbus, Boeing, Embraer, Dassault.', col2X, ry, { width: colW, lineGap: 1 }); ry += 38;

  doc.font('Courier').fontSize(5.5).fillColor('#444');
  const liebherrSpecs = [
    'HQ:          Toulouse (31), France',
    'Employees:   ~5,000 (aero division)',
    'Parent:      Liebherr Group (CH/DE)',
    'Specialties: Hydraulic systems, ECS,',
    '             pneumatic, landing gear,',
    '             flight ctrl actuators',
    'Platforms:   A350, A320neo, A220,',
    '             737 MAX, E-Jets E2, F7X',
    'Certs:       EN 9100, EASA Part 21/145',
    'Contact:     airshow@liebherr.example',
  ];
  for (const line of liebherrSpecs) {
    doc.text(line, col2X, ry, { width: colW }); ry += 8;
  }
  ry += 8;

  // More filler entries in right column
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#002244');
  doc.text('[LOGO] LATECOERE', col2X, ry); ry += 10;
  doc.font('Courier').fontSize(5.5).fillColor('#555');
  doc.text('Hall 2B — Booth #2B-088', col2X, ry); ry += 8;
  doc.font('Helvetica').fontSize(6).fillColor('#666');
  doc.text('Aerostructures (doors, fuselage), interconnection systems. Toulouse. 5,500 emp. LiDAR division.', col2X, ry, { width: colW }); ry += 20;

  // ── PAGE 2 ──
  doc.addPage();
  pageHeader(2);
  drawNoise(doc, 40);
  drawWatermark(doc, 'SIAE 2025 EXHIBITOR CATALOG');

  y = 62;
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#002244')
    .text('AEROSPACE & DEFENSE — EXHIBITORS (M–Z)', col1X, y, { width: pageW });
  y += 16;
  doc.font('Helvetica').fontSize(6).fillColor('#999')
    .text('Continued from previous page. Abbreviations: OEM=Original Equipment Mfr, MRO=Maintenance/Repair/Overhaul, ECS=Environmental Control System, INS=Inertial Navigation System, UCAV=Unmanned Combat Aerial Vehicle', col1X, y, { width: pageW });
  y += 20;

  hrLine(doc, y, { width: pageW, color: '#002244' }); y += 8;

  // More filler entries to make it look like a real catalog
  ly = y;
  const fillerEntries = [
    { name: 'MBDA', booth: 'Hall 3 — #3-100 — CHALET D-01', desc: 'European missile systems. Meteor, MICA NG, Aster, SCALP/Storm Shadow. JV Airbus/BAE/Leonardo. Suresnes (92). 14,000 emp.' },
    { name: 'NAVAL GROUP', booth: 'Hall 5 — #5-001', desc: 'Naval defense & energy. Submarines (Barracuda-class), frigates (FDI), underwater drones. Ollioules/Paris. 16,000 emp.' },
    { name: 'RAFAEL (NOT DASSAULT)', booth: 'Outdoor — OD-15', desc: 'Israeli defense electronics. Iron Dome, Trophy APS, Litening pod. [International exhibitor — Israel pavilion].' },
    { name: 'SABENA TECHNICS', booth: 'Hall 6 — #6-044', desc: 'MRO services, aircraft maintenance, modifications, painting. Bordeaux-Mérignac. 3,000 emp. Part of TAT Group.' },
    { name: 'SAFRAN (GROUP)', booth: 'Hall 4 — #4-001 thru 4-310', desc: 'Full-spectrum aerospace: engines (LEAP, M88, Arriel), landing gear, wiring, nacelles, avionics. 83,000 emp. EUR 23.2B. SAF.PA.' },
    { name: 'STELIA AEROSPACE', booth: 'Hall 2A — #2A-200', desc: 'Note: Now Airbus Atlantic (renamed 2022). Aerostructures, pilot seats, A350 fuselage sections. Rochefort/Saint-Nazaire.' },
    { name: 'THALES', booth: 'Hall 4 — #4-100 — CHALET E-02', desc: 'Defense electronics, avionics, radar (RBE2 AESA), secure comms, cybersecurity, space. 81,000 emp. EUR 18.4B. Massy/Paris.' },
    { name: 'THALES ALENIA SPACE', booth: 'Hall 3 — #3-250', desc: 'Satellites, space exploration (ExoMars), telecom payloads. JV Thales 67%/Leonardo 33%. Cannes/Toulouse. 8,500 emp.' },
  ];

  // Left column entries
  for (let i = 0; i < 4 && ly < 680; i++) {
    const e = fillerEntries[i];
    doc.font('Helvetica-Bold').fontSize(7).fillColor('#002244')
      .text(`[LOGO] ${e.name}`, col1X, ly); ly += 10;
    doc.font('Courier').fontSize(5.5).fillColor('#555')
      .text(e.booth, col1X, ly); ly += 8;
    doc.font('Helvetica').fontSize(6).fillColor('#666')
      .text(e.desc, col1X, ly, { width: colW }); ly += 30;
    hrLine(doc, ly, { width: colW - 20, dash: 1, color: '#ddd' }); ly += 6;
  }

  // Right column entries
  ry = y;
  for (let i = 4; i < 8 && ry < 680; i++) {
    const e = fillerEntries[i];
    doc.font('Helvetica-Bold').fontSize(7).fillColor('#002244')
      .text(`[LOGO] ${e.name}`, col2X, ry); ry += 10;
    doc.font('Courier').fontSize(5.5).fillColor('#555')
      .text(e.booth, col2X, ry); ry += 8;
    doc.font('Helvetica').fontSize(6).fillColor('#666')
      .text(e.desc, col2X, ry, { width: colW }); ry += 30;
    hrLine(doc, ry, { width: colW - 20, dash: 1, color: '#ddd' }); ry += 6;
  }

  // Bottom of page: dense footer
  y = 720;
  doc.font('Helvetica').fontSize(4.5).fillColor('#aaa');
  doc.text('SIAE 2025 — 54ème Salon International de l\'Aéronautique et de l\'Espace — Paris-Le Bourget — 16-22 juin 2025. Organisé par le GIFAS (Groupement des Industries Françaises Aéronautiques et Spatiales). Catalogue officiel, extrait. Toute reproduction interdite. Données au 20/05/2025. Les informations contenues dans ce document sont fournies à titre indicatif. Les organisateurs déclinent toute responsabilité en cas d\'erreur. [LOGO] GIFAS [LOGO] SIAE [LOGO] République Française [LOGO] Île-de-France', col1X, y, { width: pageW, lineGap: 0.5 });

  // Overlay scan-like artifacts
  greyOverlay(doc, 100, 100, 3, 500, 0.02);
  greyOverlay(doc, 280, 60, 2, 600, 0.03);

  doc.end();
  return new Promise(resolve => stream.on('finish', resolve));
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('Generating PDFs...');
  await Promise.all([
    genPharmaDirectory(),
    genStartupFunding(),
    genSalonBourget(),
  ]);
  console.log('Done. Files written to:', OUT_DIR);
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.pdf'));
  files.sort();
  for (const f of files) {
    const stat = fs.statSync(path.join(OUT_DIR, f));
    console.log(`  ${f}  (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
