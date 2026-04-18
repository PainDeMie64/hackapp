const PDFDocument = require('pdfkit');
const fs = require('fs');

const OUT = '/home/alex/hackapp/data/pdfs';

// ============================================================
// 1. 19_erp_migration_whitepaper.pdf
// ============================================================
function genERP() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    info: {
      Title: 'SAP S/4HANA Migration Whitepaper - Enterprise Transformation Insights',
      Author: 'DigitalEdge Consulting Group',
      Subject: 'ERP Migration',
      Keywords: 'SAP S4HANA ECC migration digital transformation',
      CreationDate: new Date('2025-11-15'),
    },
  });
  const ws = fs.createWriteStream(`${OUT}/19_erp_migration_whitepaper.pdf`);
  doc.pipe(ws);

  // -- Helper: draw a shaded box with text inside (case study style)
  function caseStudyBox(x, y, w, h, bgColor, borderColor, content) {
    doc.save();
    doc.roundedRect(x, y, w, h, 4).fill(bgColor);
    doc.roundedRect(x, y, w, h, 4).lineWidth(1.5).stroke(borderColor);
    doc.restore();
    // content callback positions text inside
    content(x + 12, y + 10, w - 24);
  }

  // -- Helper: pull quote
  function pullQuote(x, y, w, text, attr) {
    doc.save();
    doc.rect(x, y, 4, 60).fill('#1a5276');
    doc.fontSize(11).fillColor('#1a5276').font('Helvetica-BoldOblique')
      .text(`\u201C${text}\u201D`, x + 14, y + 4, { width: w - 20 });
    doc.fontSize(8).fillColor('#555').font('Helvetica')
      .text(`\u2014 ${attr}`, x + 14, y + 48, { width: w - 20 });
    doc.restore();
  }

  // -- COVER PAGE --
  doc.rect(0, 0, 595, 842).fill('#0b2545');
  doc.fontSize(10).fillColor('#ffffff').font('Helvetica')
    .text('WHITEPAPER  |  Q4 2025  |  CONFIDENTIAL', 50, 60, { align: 'left', characterSpacing: 2 });

  doc.fontSize(32).fillColor('#e8c547').font('Helvetica-Bold')
    .text('Accelerating Enterprise\nTransformation:', 50, 200, { width: 400 });
  doc.fontSize(24).fillColor('#ffffff').font('Helvetica')
    .text('SAP S/4HANA Migration\nStrategies for European\nIndustrial Leaders', 50, 300, { width: 420, lineGap: 4 });

  doc.fontSize(9).fillColor('#aaa').font('Helvetica')
    .text('Prepared by DigitalEdge Consulting Group in partnership with SAP SE', 50, 520, { width: 400 });
  doc.fontSize(9).text('Research Period: Jan 2024 \u2013 Oct 2025 | 47 enterprises surveyed across EMEA', 50, 540);

  // Deliberately confusing: add rotated watermark text across cover
  doc.save();
  doc.translate(300, 600);
  doc.rotate(-35);
  doc.fontSize(72).fillColor('#ffffff').opacity(0.03).font('Helvetica-Bold')
    .text('DRAFT COPY', -200, -40);
  doc.restore();

  // CTA block on cover
  doc.roundedRect(50, 620, 250, 45, 3).fill('#e8c547');
  doc.fontSize(10).fillColor('#0b2545').font('Helvetica-Bold')
    .text('DOWNLOAD THE FULL 120-PAGE REPORT \u2192', 62, 633, { width: 230 });
  doc.fontSize(7).fillColor('#0b2545').font('Helvetica')
    .text('digitaledge-consulting.eu/sap-whitepaper-2025', 62, 650);

  // -- PAGE 2: TOC + Intro --
  doc.addPage();
  doc.fillColor('#0b2545').opacity(1);
  doc.fontSize(18).font('Helvetica-Bold').text('Table of Contents', 50, 50);
  doc.moveTo(50, 75).lineTo(545, 75).lineWidth(0.5).stroke('#0b2545');

  const toc = [
    ['1', 'Executive Summary', '3'],
    ['2', 'Market Context: The Urgency of ERP Modernization', '5'],
    ['3', 'Case Study: Michelin \u2014 From SAP ECC to S/4HANA', '8'],
    ['4', 'Case Study: L\u2019Or\u00e9al \u2014 Digital Supply Chain at Scale', '14'],
    ['5', 'Case Study: Saint-Gobain \u2014 PLM/ERP Convergence', '19'],
    ['6', 'Migration Framework & Best Practices', '24'],
    ['7', 'ROI Analysis & Total Cost of Ownership', '28'],
    ['8', 'Conclusion & Next Steps', '32'],
  ];
  let tocY = 90;
  toc.forEach(([num, title, pg]) => {
    doc.fontSize(9).font('Helvetica').fillColor('#333')
      .text(`${num}.`, 55, tocY, { continued: true, width: 20 })
      .text(`  ${title}`, { continued: true, width: 350 });
    // Dots
    doc.text('  ' + '.'.repeat(60 - title.length), { continued: true, width: 200 });
    doc.text(pg, 520, tocY, { width: 30, align: 'right' });
    tocY += 18;
  });

  // Intro paragraph - marketing fluff deliberately mixed with data
  tocY += 25;
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#0b2545')
    .text('Executive Summary', 50, tocY);
  tocY += 25;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'In today\u2019s rapidly evolving digital landscape, enterprises across Europe face an unprecedented imperative ' +
    'to modernize their core business systems. With SAP\u2019s announced end-of-maintenance for ECC 6.0 by 2027, ' +
    'organizations managing billions in annual revenue must navigate complex migration paths while maintaining ' +
    'operational continuity. Our research, encompassing 47 enterprises across 12 EMEA countries with combined ' +
    'revenues exceeding \u20AC2.1 trillion, reveals that successful S/4HANA transitions require not merely technical ' +
    'upgrades but fundamental reimagining of business processes, data governance frameworks, and organizational ' +
    'change management strategies.',
    50, tocY, { width: 495, lineGap: 3, align: 'justify' }
  );
  tocY += 100;

  // Key stats in colored boxes (hard to parse: overlapping text blocks)
  const statsX = [50, 185, 320, 455];
  const statsLabels = ['Avg Migration\nDuration', 'Cost Overrun\nRate', 'Productivity\nGain (Y2)', 'Data Quality\nIssues'];
  const statsValues = ['26 months', '34%', '+18%', '67% of firms'];
  statsX.forEach((x, i) => {
    doc.roundedRect(x, tocY, 120, 65, 3).fill('#f0f4f8');
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#0b2545')
      .text(statsValues[i], x + 8, tocY + 8, { width: 104 });
    doc.fontSize(7).font('Helvetica').fillColor('#666')
      .text(statsLabels[i], x + 8, tocY + 38, { width: 104 });
  });

  // -- PAGE 3: MICHELIN CASE STUDY --
  doc.addPage();
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#0b2545')
    .text('Case Study: Michelin \u2014 Tire Industry Leader', 50, 50);
  doc.fontSize(9).font('Helvetica').fillColor('#888')
    .text('SAP ECC 6.0 to S/4HANA Migration | 3-Year Transformation Program', 50, 72);
  doc.moveTo(50, 88).lineTo(545, 88).lineWidth(0.5).stroke('#ccc');

  // Company profile box
  caseStudyBox(50, 100, 240, 145, '#f7f9fc', '#1a5276', (x, y, w) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#1a5276').text('Company Profile', x, y, { width: w });
    doc.fontSize(8).font('Helvetica').fillColor('#333');
    const items = [
      ['Company:', 'Michelin (Compagnie G\u00e9n\u00e9rale des \u00c9tablissements Michelin SCA)'],
      ['Sector:', 'Tire Manufacturing & Mobility Solutions'],
      ['HQ:', 'Clermont-Ferrand, Auvergne-Rh\u00f4ne-Alpes, France'],
      ['Employees:', '132,000 (as of FY2024)'],
      ['Revenue:', '\u20AC28.3 billion (FY2024)'],
      ['ERP Legacy:', 'SAP ECC 6.0 (deployed 2009, customized heavily)'],
      ['Target:', 'SAP S/4HANA 2023 FPS02 on Azure'],
    ];
    let iy = y + 16;
    items.forEach(([k, v]) => {
      doc.font('Helvetica-Bold').text(k, x, iy, { continued: true, width: w }).font('Helvetica').text(` ${v}`);
      iy += 14;
    });
  });

  // Migration details box
  caseStudyBox(305, 100, 240, 145, '#fef9e7', '#b7950b', (x, y, w) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#7d6608').text('Migration Details', x, y, { width: w });
    doc.fontSize(8).font('Helvetica').fillColor('#333');
    const items = [
      ['Program Name:', 'Project ATLAS'],
      ['Duration:', '3-year phased program (2023\u20132026)'],
      ['Budget:', '\u20AC180M (initial), \u20AC215M (revised Q2-2024)'],
      ['Approach:', 'Selective Data Transition (Brownfield+)'],
      ['Integrator:', 'Accenture (lead) + Capgemini (data track)'],
      ['Modules:', 'MM, PP, SD, FI/CO, QM, PM, EWM, IBP'],
      ['Go-Live:', 'Wave 1: Europe (completed), Wave 2: Asia (in progress)'],
    ];
    let iy = y + 16;
    items.forEach(([k, v]) => {
      doc.font('Helvetica-Bold').text(k, x, iy, { continued: true, width: w }).font('Helvetica').text(` ${v}`);
      iy += 14;
    });
  });

  // Pull quote
  pullQuote(50, 265, 495,
    'The migration to S/4HANA is not just an IT project\u2014it is a business transformation that touches every corner of our global operations.',
    'Jean-Philippe Duval, Group CIO, Michelin');

  // Body text - deliberately dense, marketing + technical mix
  let bY = 340;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Michelin\u2019s migration journey began in late 2022 with a comprehensive landscape assessment spanning 68 SAP instances ' +
    'across 26 countries. The Clermont-Ferrand-based tire manufacturer, with 132,000 employees and \u20AC28.3 billion in annual ' +
    'revenue, had accumulated over 14 years of customizations on its ECC 6.0 platform\u2014including 12,400 custom ABAP objects, ' +
    '3,200 custom reports, and 847 interfaces to non-SAP systems. The scope of technical debt was, as one architect described it, ' +
    '\u201Cmonumental but not insurmountable.\u201D',
    50, bY, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  bY += 75;
  doc.fontSize(9).text(
    'Phase 1 of Project ATLAS focused on the European manufacturing footprint: 14 plants in France, Germany, Spain, Italy, ' +
    'Poland, and Romania. The team adopted a Selective Data Transition approach\u2014sometimes called \u201CBrownfield+\u201D\u2014allowing ' +
    'Michelin to preserve critical historical data (7 years of financial transactions, 4.2 billion material movement records) ' +
    'while simultaneously redesigning processes around S/4HANA\u2019s simplified data model. Key wins included a 40% reduction in ' +
    'month-end close time (from 8 days to 4.8 days) and real-time inventory visibility across all European warehouses for the ' +
    'first time in the company\u2019s 135-year history.',
    50, bY, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  bY += 85;

  // Sneaky: add a "sidebar" that overlaps slightly with main text area
  doc.save();
  doc.rect(400, bY - 5, 148, 120).fill('#eaf2f8');
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#1a5276')
    .text('KEY METRICS', 408, bY + 2, { width: 130 });
  doc.fontSize(7).font('Helvetica').fillColor('#333');
  const metrics = [
    'Custom objects retired: 4,800',
    'Custom objects refactored: 5,100',
    'Fiori apps deployed: 340',
    'Training hours delivered: 82,000',
    'Parallel run duration: 6 weeks',
    'Data migration records: 4.2B',
    'Post go-live P1 tickets: 23',
    'User satisfaction (6mo): 72%',
  ];
  let mY = bY + 16;
  metrics.forEach(m => {
    doc.text(`\u2022 ${m}`, 408, mY, { width: 130 });
    mY += 12;
  });
  doc.restore();

  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'However, the journey was not without challenges. Budget overruns of approximately 19% (\u20AC35M above initial estimates) ' +
    'were driven primarily by unexpected data quality issues in the material master (23% of records required cleansing) and ' +
    'the complexity of integrating Michelin\u2019s proprietary tire-simulation software (MFEM/TireSim) with S/4HANA\u2019s embedded ' +
    'analytics. The program team, led jointly by Accenture (350 consultants at peak) and Capgemini (120 on the data track), ' +
    'implemented a novel \u201Cdata quality firewall\u201D approach that became a reference architecture for subsequent waves.',
    50, bY, { width: 340, lineGap: 2.5, align: 'justify' }
  );

  // CTA banner
  bY += 110;
  doc.roundedRect(50, bY, 495, 35, 3).fill('#0b2545');
  doc.fontSize(9).fillColor('#e8c547').font('Helvetica-Bold')
    .text('Want the full 18-page Michelin case study?  Download at digitaledge-consulting.eu/michelin-sap', 65, bY + 10, { width: 460 });

  // -- PAGE 4: L'OREAL --
  doc.addPage();
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#0b2545')
    .text('Case Study: L\u2019Or\u00e9al \u2014 Beauty & Digital Supply Chain', 50, 50);
  doc.fontSize(9).font('Helvetica').fillColor('#888')
    .text('Digital Supply Chain Transformation | SAP IBP + S/4HANA', 50, 72);
  doc.moveTo(50, 88).lineTo(545, 88).lineWidth(0.5).stroke('#ccc');

  caseStudyBox(50, 100, 495, 120, '#fdf2f8', '#922b6e', (x, y, w) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#922b6e').text('L\u2019Or\u00e9al Group \u2014 At a Glance', x, y, { width: w });
    doc.fontSize(8).font('Helvetica').fillColor('#333');
    // Two column layout to confuse parsers
    const col1 = [
      'HQ: Clichy, \u00cele-de-France',
      'Employees: 87,000 worldwide',
      'Revenue: \u20AC41.2B (FY2024)',
      'Brands: 37 global brands',
      'Factories: 44 worldwide',
    ];
    const col2 = [
      'Sector: Cosmetics & Personal Care',
      'Divisions: 4 (Luxe, Consumer, Pro, Derma)',
      'SKUs: 130,000+ active',
      'Markets: 150+ countries',
      'Digital Budget: \u20AC2.1B (2024)',
    ];
    let iy = y + 18;
    col1.forEach((c, i) => {
      doc.text(`\u2022 ${c}`, x, iy + i * 13, { width: w / 2 - 10 });
      if (col2[i]) doc.text(`\u2022 ${col2[i]}`, x + w / 2, iy + i * 13, { width: w / 2 - 10 });
    });
  });

  let lY = 235;
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#0b2545')
    .text('The Transformation Imperative', 50, lY);
  lY += 20;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'L\u2019Or\u00e9al\u2019s digital supply chain transformation, internally branded \u201CBeauty Tech Supply Chain 2.0,\u201D represents ' +
    'one of the most ambitious ERP-adjacent programs in the consumer goods industry. With 87,000 employees, operations in ' +
    '150+ countries, and annual revenue of \u20AC41.2 billion, the Clichy-headquartered cosmetics giant needed to fundamentally ' +
    'reimagine how it plans, produces, and distributes 130,000+ SKUs across its four divisions: L\u2019Or\u00e9al Luxe, Consumer ' +
    'Products, Professional Products, and Active Cosmetics (now L\u2019Or\u00e9al Dermatological Beauty). The program encompasses ' +
    'SAP S/4HANA deployment, SAP IBP for demand sensing, and a custom AI/ML layer built on Google Cloud Vertex AI for ' +
    'demand forecasting at the SKU-channel-country level.',
    50, lY, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  lY += 100;

  pullQuote(50, lY, 495,
    'We don\u2019t just predict demand\u2014we shape it. Our supply chain is now a competitive advantage, not a cost center.',
    'Isabelle Martin-Chauvel, VP Supply Chain Digital, L\u2019Or\u00e9al');

  lY += 80;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Results after 18 months of phased rollout: forecast accuracy improved from 62% to 81% (at weekly granularity), ' +
    'stock-outs reduced by 28%, and working capital freed up by \u20AC340M across European operations. The total investment ' +
    'of \u20AC290M over 4 years is expected to deliver \u20AC1.2B in cumulative benefits by 2028, driven primarily by inventory ' +
    'optimization (\u20AC480M), logistics efficiency (\u20AC320M), and waste reduction (\u20AC210M) aligned with L\u2019Or\u00e9al\u2019s \u201CL\u2019Or\u00e9al for ' +
    'the Future\u201D sustainability commitments. Third-party validation by McKinsey confirmed the program as \u201Ctop-quartile ' +
    'in FMCG digital supply chain maturity.\u201D',
    50, lY, { width: 495, lineGap: 2.5, align: 'justify' }
  );

  lY += 95;
  // Another CTA
  doc.roundedRect(50, lY, 495, 35, 3).fill('#922b6e');
  doc.fontSize(9).fillColor('#fff').font('Helvetica-Bold')
    .text('See how L\u2019Or\u00e9al achieved 81% forecast accuracy \u2014 Request the detailed case study \u2192', 65, lY + 10, { width: 460 });

  // -- PAGE 5: SAINT-GOBAIN --
  doc.addPage();
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#0b2545')
    .text('Case Study: Saint-Gobain \u2014 Materials & Construction', 50, 50);
  doc.fontSize(9).font('Helvetica').fillColor('#888')
    .text('PLM/ERP Convergence Project | Siemens Teamcenter + SAP S/4HANA', 50, 72);
  doc.moveTo(50, 88).lineTo(545, 88).lineWidth(0.5).stroke('#ccc');

  caseStudyBox(50, 100, 495, 105, '#f0faf0', '#1e7e34', (x, y, w) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#1e7e34').text('Saint-Gobain \u2014 Company Overview', x, y, { width: w });
    doc.fontSize(8).font('Helvetica').fillColor('#333');
    const lines = [
      'Headquarters: Tour Saint-Gobain, Courbevoie (La D\u00e9fense), France  |  Founded: 1665 (one of the world\u2019s oldest companies)',
      'Employees: 160,000 across 76 countries  |  Revenue: \u20AC51.2 billion (FY2024)  |  Segments: 5 business sectors',
      'Sector: Construction Materials, High-Performance Materials, Glass  |  Plants: 750+ industrial sites worldwide',
      'Legacy ERP: SAP ECC 6.0 (fragmented: 23 separate instances across regions)  |  PLM: Siemens Teamcenter + PTC Windchill (partial)',
      'Strategic Initiative: \u201CGrow & Impact\u201D plan targets \u20AC5B+ in innovation-led revenue by 2028',
    ];
    let iy = y + 18;
    lines.forEach(l => {
      doc.text(l, x, iy, { width: w });
      iy += 14;
    });
  });

  let sY = 220;
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#0b2545')
    .text('PLM/ERP Convergence: Breaking Down Silos', 50, sY);
  sY += 20;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Saint-Gobain\u2019s \u201CProject Horizon\u201D addresses one of the most complex integration challenges in manufacturing: ' +
    'converging Product Lifecycle Management (PLM) and Enterprise Resource Planning (ERP) into a unified digital thread. ' +
    'With 160,000 employees, 750+ manufacturing sites, and annual revenue of \u20AC51.2 billion, the Courbevoie-headquartered ' +
    'materials giant operates across extraordinarily diverse product lines\u2014from flat glass and gypsum boards to advanced ' +
    'ceramics and 3D-printed components. The legacy landscape included 23 separate SAP ECC instances (some dating to R/3 ' +
    'era), two competing PLM platforms (Siemens Teamcenter and PTC Windchill), and over 300 disconnected spreadsheet-based ' +
    'planning tools that different business units had built up over decades.',
    50, sY, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  sY += 95;

  doc.fontSize(9).text(
    'The convergence project, budgeted at \u20AC420M over 5 years (2023\u20132028), aims to consolidate all 23 SAP instances into ' +
    'a single S/4HANA Cloud Private Edition deployment, standardize on Siemens Teamcenter as the sole PLM platform, and ' +
    'establish a real-time bidirectional data flow between PLM and ERP via SAP Integration Suite. Early results from the ' +
    'pilot region (Benelux, 12 plants) show: 35% reduction in new product introduction (NPI) cycle time, 22% improvement ' +
    'in first-pass yield for specification-driven products, and a \u20AC45M reduction in obsolete inventory. The program is ' +
    'led by a joint team of 480 people from TCS (systems integrator), Siemens Digital Industries Software, and ' +
    'Saint-Gobain\u2019s internal IT organization.',
    50, sY, { width: 495, lineGap: 2.5, align: 'justify' }
  );

  sY += 95;
  pullQuote(50, sY, 495,
    'For the first time, our product designers and plant operators are looking at the same data, in real time. That changes everything.',
    'Marc Verdonck, Group CDO, Saint-Gobain');

  // Confusing: a table rendered as overlapping text blocks
  sY += 80;
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#0b2545').text('Regional Rollout Timeline', 50, sY);
  sY += 18;
  const headers = ['Region', 'Plants', 'Go-Live', 'Status'];
  const rows = [
    ['Benelux (Pilot)', '12', 'Q1 2024', 'Complete'],
    ['France', '38', 'Q3 2024', 'In Progress'],
    ['DACH (Germany/Austria/CH)', '27', 'Q1 2025', 'Planned'],
    ['Southern Europe', '22', 'Q3 2025', 'Planned'],
    ['Americas', '45', 'Q1 2026', 'Scoping'],
    ['APAC', '31', 'Q3 2026', 'Scoping'],
  ];
  // Draw as positioned text (not a real table) to confuse parsers
  const colX = [55, 200, 310, 430];
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#0b2545');
  headers.forEach((h, i) => doc.text(h, colX[i], sY, { width: 100 }));
  doc.moveTo(50, sY + 13).lineTo(545, sY + 13).lineWidth(0.3).stroke('#999');
  sY += 18;
  doc.font('Helvetica').fillColor('#333');
  rows.forEach(row => {
    row.forEach((cell, i) => doc.text(cell, colX[i], sY, { width: 120 }));
    sY += 14;
  });

  // Final page: conclusion with CTA-heavy ending
  doc.addPage();
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#0b2545')
    .text('Conclusion: The Transformation Imperative', 50, 50);
  doc.moveTo(50, 73).lineTo(545, 73).lineWidth(0.5).stroke('#ccc');

  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'The experiences of Michelin (\u20AC28.3B revenue, 132,000 employees, Clermont-Ferrand), L\u2019Or\u00e9al (\u20AC41.2B, 87,000 employees, Clichy), ' +
    'and Saint-Gobain (\u20AC51.2B, 160,000 employees, Courbevoie) collectively demonstrate that SAP S/4HANA migration is far more than a ' +
    'technical upgrade. These three French industrial champions\u2014representing combined revenues of over \u20AC120 billion and nearly 380,000 ' +
    'employees\u2014have each navigated unique challenges that reflect broader patterns we observe across our 47-enterprise research base.',
    50, 90, { width: 495, lineGap: 3, align: 'justify' }
  );

  doc.fontSize(9).text(
    'Common success factors include: executive sponsorship at C-1 level or above, dedicated change management teams (averaging 15% of ' +
    'total program headcount), early investment in data quality remediation (firms that invested >5% of budget in data prep saw 40% ' +
    'fewer post-go-live defects), and a phased regional rollout approach. Conversely, the most common pitfalls were underestimating ' +
    'custom code remediation effort, insufficient testing of cross-module integration scenarios, and organizational resistance from ' +
    'power users comfortable with legacy transactions.',
    50, 160, { width: 495, lineGap: 3, align: 'justify' }
  );

  // Three CTA boxes
  const ctaY = 270;
  [[50, '#0b2545', 'Request Full Report\n(120 pages, \u20AC0)\ndigitaledge.eu/report'],
   [210, '#1a5276', 'Schedule a Briefing\nwith Our SAP Practice\ncalendar.digitaledge.eu'],
   [370, '#922b6e', 'Join Our Webinar\nDec 12, 2025 | 14:00 CET\ndigitaledge.eu/webinar']
  ].forEach(([x, color, txt]) => {
    doc.roundedRect(x, ctaY, 150, 70, 4).fill(color);
    doc.fontSize(9).fillColor('#fff').font('Helvetica-Bold')
      .text(txt, x + 12, ctaY + 12, { width: 126 });
  });

  // Disclaimer in tiny text
  doc.fontSize(5).fillColor('#999').font('Helvetica').text(
    'This whitepaper is provided for informational purposes only. DigitalEdge Consulting Group makes no warranties regarding the accuracy ' +
    'or completeness of the information contained herein. The company names, figures, and data points referenced are based on publicly ' +
    'available information and proprietary research. Any resemblance to confidential or proprietary data is coincidental. SAP, S/4HANA, ' +
    'and related marks are trademarks of SAP SE. \u00A9 2025 DigitalEdge Consulting Group. All rights reserved. Reproduction prohibited ' +
    'without written consent. Document ID: WP-2025-SAP-EMEA-047. Classification: CONFIDENTIAL.',
    50, 760, { width: 495, lineGap: 1 }
  );

  doc.end();
  return new Promise(resolve => ws.on('finish', resolve));
}

// ============================================================
// 2. 20_ce_nantes_hackathon_brief.pdf
// ============================================================
function genHackathon() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 35, bottom: 30, left: 45, right: 45 },
    info: {
      Title: 'Hackathon Brief - CE Nantes x ALTEN Innovation Challenge 2026',
      Author: 'CE Nantes / ALTEN Group',
      CreationDate: new Date('2026-03-01'),
    },
  });
  const ws = fs.createWriteStream(`${OUT}/20_ce_nantes_hackathon_brief.pdf`);
  doc.pipe(ws);

  // Deliberately ugly cover
  doc.rect(0, 0, 595, 180).fill('#1a1a2e');
  doc.fontSize(10).fillColor('#aaa').font('Helvetica')
    .text('CENTRALE NANTES  x  ALTEN GROUP', 45, 30, { characterSpacing: 3 });
  doc.fontSize(28).fillColor('#e94560').font('Helvetica-Bold')
    .text('INNOVATION\nHACKATHON 2026', 45, 55, { lineGap: -2 });
  doc.fontSize(11).fillColor('#fff').font('Helvetica')
    .text('Challenge Brief  |  Edition 4  |  April 25\u201327, 2026  |  Nantes, France', 45, 135);
  doc.fontSize(8).fillColor('#666')
    .text('DOCUMENT VERSION 2.3-DRAFT \u2014 NOT FOR DISTRIBUTION \u2014 LAST MODIFIED 2026-03-14T22:47:00Z', 45, 158);

  // Page 1 body - deliberately poorly formatted
  let y = 200;
  doc.fontSize(13).font('Helvetica-Bold').fillColor('#1a1a2e').text('1. CONTEXT & SPONSOR OVERVIEW', 45, y);
  y += 22;

  // Run-on paragraph with missing spaces and bad formatting
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    'ALTEN Group(founded 1988,HQ:Boulogne-Billancourt,France) is one of the world\u2019s leading engineering and technology ' +
    'consulting firms with approximately 33,000 employees in France alone(57,000+ globally) and consolidated revenue of ' +
    'approximately \u20AC4 billion(FY2025).ALTEN operates as an ESN (Entreprise de Services du Num\u00e9rique) and consulting firm ' +
    'providing engineering services across multiple verticals including automotive OEMs,aerospace primes,energy utilities,' +
    'telecommunications operators,financial services,and life sciences.The company\u2019s client portfolio in France includes ' +
    'major accounts such as Airbus,Safran,Renault,Stellantis,EDF,TotalEnergies,Thales,and Dassault Syst\u00e8mes.ALTEN sponsors ' +
    'this hackathon as part of its \u201CInnovation & Talent Pipeline\u201D strategy targeting top engineering graduates from ' +
    'Grandes \u00c9coles.',
    45, y, { width: 505, lineGap: 2 }
  );
  y += 90;

  // More badly formatted sections
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('1.1 CONSULTING MARKET CONTEXT', 45, y);
  y += 16;
  // No line breaks between bullet points
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    '\u2022French IT/engineering consulting market: \u20AC72B(2025),growing 5.2% CAGR ' +
    '\u2022Talent shortage:estimated 80,000 unfilled engineering positions in France(2025) ' +
    '\u2022ESN sector consolidation:top 10 firms hold 35% market share ' +
    '\u2022Key growth drivers:AI/ML integration(+23% YoY),cybersecurity(+18%),cloud migration(+15%),Industry 4.0/IoT(+12%) ' +
    '\u2022ALTEN positioning:ranked #2 ESN by revenue in France(behind Capgemini),#1 in pure engineering consulting ' +
    '\u2022Average consultant utilization rate in sector:87%(ALTEN:91%,above market) ' +
    '\u2022Client retention rate:94%(ALTEN),vs industry average of 88% ' +
    '\u2022Revenue per consultant:\u20AC95K(ALTEN) vs \u20AC82K(sector avg)',
    45, y, { width: 505, lineGap: 1.5 }
  );
  y += 80;

  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('1.2 TARGET CLIENT SECTORS', 45, y);
  y += 16;
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    'Automotive OEMs: Renault,Stellantis(ex-PSA),Toyota France,BMW France.Key challenges:electrification(BEV/PHEV platforms),' +
    'ADAS Level 3+,software-defined vehicles(SDV),AUTOSAR Adaptive,OTA updates.Market size:\u20AC48B French automotive sector.' +
    'Aerospace Primes: Airbus(Toulouse+Nantes),Safran(multiple sites),Thales,Dassault Aviation.Challenges:single-aisle ' +
    'production rate increase(A320 family:75/month target),sustainable aviation fuel(SAF) certification,Model-Based ' +
    'Systems Engineering(MBSE),DO-178C compliance for next-gen avionics.' +
    'Energy Utilities: EDF(\u20AC130B revenue,nuclear fleet lifecycle extension),TotalEnergies(multi-energy transition),' +
    'Engie(green hydrogen+renewables).Challenges:EPR2 reactor program,offshore wind farm digitalization,smart grid ' +
    'deployment(Linky 2.0),hydrogen production cost reduction(<\u20AC2/kg target by 2030).',
    45, y, { width: 505, lineGap: 1.5 }
  );

  // Page 2
  doc.addPage();
  y = 40;
  doc.fontSize(13).font('Helvetica-Bold').fillColor('#1a1a2e').text('2. HACKATHON CHALLENGE DEFINITION', 45, y);
  y += 25;

  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('2.1 OBJECTIVES', 45, y);
  y += 16;
  // Poorly formatted objectives
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    'Primary objective:Design and prototype an AI-powered solution that addresses a real client challenge in one of ALTEN\u2019s ' +
    'three priority sectors(automotive,aerospace,energy).The solution must demonstrate: ' +
    '(a)technical feasibility through a working prototype ' +
    '(b)business value quantification with ROI estimation ' +
    '(c)scalability potential across multiple client accounts ' +
    '(d)integration capability with existing enterprise systems(SAP,PLM,MES,SCADA) ' +
    'Secondary objectives:Teams should also consider data privacy(GDPR compliance),edge deployment constraints ' +
    '(limited compute at plant floor),and explainability requirements(critical for aerospace/automotive safety certification). ' +
    'Bonus consideration given to solutions addressing sustainability metrics(carbon footprint reduction,circular economy enablement).',
    45, y, { width: 505, lineGap: 1.5 }
  );
  y += 95;

  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('2.2 CONSTRAINTS', 45, y);
  y += 16;
  // Missing line breaks between constraints
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    'C1:Team size 3-5 members(at least 1 from each:engineering,CS/data,business/design) ' +
    'C2:48-hour time limit(Fri 18:00 \u2192 Sun 18:00) ' +
    'C3:Must use at least one of the provided APIs(see appendix A):ALTEN Industrial IoT Sandbox,' +
    'SAP BTP Trial,Azure OpenAI Service(GPT-4o),AWS SageMaker endpoint ' +
    'C4:Solution must run on provided infrastructure(no external cloud spend) ' +
    'C5:Final demo must be max 7 minutes + 3 minutes Q&A ' +
    'C6:All code must be original(no pre-existing projects),open-source libs OK ' +
    'C7:Deliverables:working demo,3-slide business case,1-page technical architecture ' +
    'C8:Code repository must be on provided GitLab instance ' +
    'C9:No use of proprietary client data(synthetic datasets provided)',
    45, y, { width: 505, lineGap: 1.5 }
  );
  y += 85;

  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('2.3 EVALUATION CRITERIA', 45, y);
  y += 16;
  // Render as a "table" but with inconsistent spacing
  const criteria = [
    ['Innovation & Creativity', '25%', 'Novelty of approach,creative use of technology,originality'],
    ['Technical Execution', '30%', 'Code quality,architecture,robustness,use of APIs'],
    ['Business Value', '20%', 'ROI estimation,market sizing,client relevance,scalability'],
    ['Presentation Quality', '15%', 'Clarity,demo effectiveness,storytelling,Q&A handling'],
    ['Sustainability Impact', '10%', 'Environmental/social benefit,alignment with CSR goals'],
  ];
  // Headers
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#1a1a2e');
  doc.text('CRITERION', 50, y); doc.text('WEIGHT', 220, y); doc.text('DESCRIPTION', 290, y);
  y += 14;
  doc.font('Helvetica').fillColor('#333');
  criteria.forEach(([crit, weight, desc]) => {
    doc.text(crit, 50, y, { width: 160 });
    doc.text(weight, 220, y, { width: 50 });
    doc.text(desc, 290, y, { width: 255 });
    y += 16;
  });

  y += 15;
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('2.4 TIMELINE', 45, y);
  y += 16;
  const timeline = [
    ['Fri 25 Apr, 17:00', 'Registration & Check-in(Bldg E,Room 101-103)'],
    ['Fri 25 Apr, 18:00', 'Opening ceremony,sponsor keynote(ALTEN CTO),challenge reveal'],
    ['Fri 25 Apr, 19:00', 'Team formation finalized,API access distributed,hacking begins'],
    ['Fri 25 Apr, 21:00', 'Dinner + mentor office hours(ALTEN senior consultants available)'],
    ['Sat 26 Apr, 08:00', 'Breakfast,checkpoint #1(mandatory 2-min progress update)'],
    ['Sat 26 Apr, 14:00', 'Checkpoint #2(architecture review with mentors)'],
    ['Sat 26 Apr, 20:00', 'Dinner,optional workshops(MLOps,SAP BTP,pitch coaching)'],
    ['Sun 27 Apr, 10:00', 'Code freeze(hard deadline,no commits after this)'],
    ['Sun 27 Apr, 12:00', 'Lunch,presentation prep time'],
    ['Sun 27 Apr, 14:00', 'Final presentations(7+3 min per team,all teams present)'],
    ['Sun 27 Apr, 17:00', 'Jury deliberation'],
    ['Sun 27 Apr, 18:00', 'Award ceremony,networking,closing(prizes:\u20AC5K/\u20AC3K/\u20AC1K + ALTEN internship offers)'],
  ];
  doc.fontSize(7.5).font('Helvetica').fillColor('#222');
  timeline.forEach(([time, desc]) => {
    doc.font('Helvetica-Bold').text(time, 50, y, { continued: true, width: 140 });
    doc.font('Helvetica').text(`  ${desc}`, { width: 355 });
    y += 13;
  });

  // Page 3 - more poorly formatted content
  doc.addPage();
  y = 40;
  doc.fontSize(13).font('Helvetica-Bold').fillColor('#1a1a2e').text('3. RESOURCES & DATA', 45, y);
  y += 25;

  // Wall of text with no formatting
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    'Provided datasets(available on GitLab repo /hackathon-2026/datasets):' +
    'DS-01:Synthetic automotive telemetry data(500K records,15 vehicle models,CAN bus signals,' +
    'GPS traces,OBD-II codes,generated using CARLA simulator+custom noise injection).' +
    'DS-02:Anonymized aerospace manufacturing quality data(200K inspection records from Airbus-like' +
    'production process,includes NDT results,dimensional measurements,defect classifications,' +
    'treatment applied,8 months of data with seasonal patterns).' +
    'DS-03:Smart grid energy consumption data(1M time series data points,5-min intervals,3 months,' +
    'industrial+residential+commercial consumers,weather correlation data included,' +
    'Enedis-format meter readings with some deliberately corrupted entries).' +
    'DS-04:NLP corpus of 50K technical documents(maintenance manuals,specifications,incident reports' +
    'in French and English,pre-tokenized and raw formats,includes domain-specific vocabulary lists).' +
    'All data synthetic or fully anonymized.No real PII or proprietary information.CC-BY-4.0 license for hackathon use.',
    45, y, { width: 505, lineGap: 1.5 }
  );

  y += 120;
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('4. JURY COMPOSITION', 45, y);
  y += 16;
  doc.fontSize(8.5).font('Helvetica').fillColor('#222').text(
    '\u2022Dr. Sophie Langlois \u2013 ALTEN France CTO(15 years in automotive embedded systems,X-Mines graduate)' +
    '\u2022Prof. Yannick Bertrand \u2013 Centrale Nantes,Dept. Computer Science(AI/ML research,H-index 34)' +
    '\u2022Marie-Claire Dubois \u2013 VP Digital Innovation,Airbus Atlantic(ex-Thales,drone systems expert)' +
    '\u2022Thomas Reiter \u2013 Senior Partner,McKinsey Paris(manufacturing & operations practice lead)' +
    '\u2022Cl\u00e9ment Faure \u2013 Head of R&D,EDF Renewables(energy storage,smart grid optimization)' +
    '\u2022Student representative:TBD(elected by participant vote on Friday evening)',
    45, y, { width: 505, lineGap: 1.5 }
  );

  y += 70;
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#e94560').text('5. LEGAL & IP', 45, y);
  y += 16;
  // Tiny dense legal text
  doc.fontSize(6.5).font('Helvetica').fillColor('#555').text(
    'By participating in this hackathon,all team members agree that:(1)all intellectual property created during the event ' +
    'remains the property of the team members;(2)ALTEN Group and Centrale Nantes retain a non-exclusive,royalty-free license ' +
    'to use,display,and reference all submissions for marketing and recruitment purposes for a period of 24 months following ' +
    'the event;(3)teams may not incorporate code or assets subject to copyleft licenses(GPL,AGPL)without prior written approval ' +
    'from the organizing committee;(4)all participants must sign the NDA regarding ALTEN\u2019s proprietary APIs and sandbox ' +
    'environments;(5)winning teams agree to participate in at least one post-event communication(blog post,video interview,' +
    'or social media feature);(6)ALTEN reserves the right to offer internship or employment contracts to individual participants ' +
    'regardless of team ranking;(7)disputes shall be resolved under French law,jurisdiction of Nantes commercial court.' +
    'Personal data processing:participants\u2019 personal data(name,email,school,CV) is processed by ALTEN Group as data controller ' +
    'for the purposes of event management,recruitment,and communication,in accordance with GDPR.Data retention:24 months ' +
    'post-event.Contact DPO:dpo@alten.com.Right of access,rectification,and erasure:privacy@alten.com.',
    45, y, { width: 505, lineGap: 1 }
  );

  // Footer
  doc.fontSize(6).fillColor('#aaa').text(
    'Document: HCK-2026-BRIEF-v2.3-DRAFT | Classification: INTERNAL | Generated: 2026-03-14 | Contact: hackathon@ec-nantes.fr | ALTEN ref: FR-INN-2026-042',
    45, 780, { width: 505, align: 'center' }
  );

  doc.end();
  return new Promise(resolve => ws.on('finish', resolve));
}

// ============================================================
// 3. 21_mixed_language_report.pdf
// ============================================================
function genMixedLang() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    info: {
      Title: 'Rapport Industriel / Industrial Report / Industriebericht 2025',
      Author: 'Franco-German Industry Observatory',
      CreationDate: new Date('2025-12-01'),
    },
  });
  const ws = fs.createWriteStream(`${OUT}/21_mixed_language_report.pdf`);
  doc.pipe(ws);

  // -- COVER: mixed languages --
  doc.rect(0, 0, 595, 842).fill('#0d1b2a');

  // Title in 3 languages stacked
  doc.fontSize(9).fillColor('#778da9').font('Helvetica')
    .text('OBSERVATOIRE FRANCO-ALLEMAND DE L\u2019INDUSTRIE', 50, 50, { characterSpacing: 2 });
  doc.fontSize(9).fillColor('#778da9')
    .text('FRANCO-GERMAN INDUSTRY OBSERVATORY', 50, 65, { characterSpacing: 2 });
  doc.fontSize(9).fillColor('#778da9')
    .text('DEUTSCH-FRANZ\u00d6SISCHES INDUSTRIEOBSERVATORIUM', 50, 80, { characterSpacing: 2 });

  doc.fontSize(28).fillColor('#e0e1dd').font('Helvetica-Bold')
    .text('Rapport Annuel\n/ Annual Report\n/ Jahresbericht', 50, 180, { lineGap: 2 });

  doc.fontSize(18).fillColor('#415a77').font('Helvetica')
    .text('Transformation Industrielle en Europe\nIndustrial Transformation in Europe\nIndustrielle Transformation in Europa', 50, 310, { lineGap: 4 });

  doc.fontSize(11).fillColor('#778da9').font('Helvetica')
    .text('2025 Edition | \u00c9dition 2025 | Ausgabe 2025', 50, 420);

  // Logos placeholder text (deliberately placed at odd positions)
  doc.fontSize(7).fillColor('#415a77')
    .text('Avec le soutien de / Supported by / Unterst\u00fctzt von:', 50, 700);
  doc.fontSize(7)
    .text('Minist\u00e8re de l\u2019\u00c9conomie  |  BMWK  |  BPI France  |  KfW  |  Business France  |  GTAI', 50, 712);

  // -- PAGE 2: Siemens Energy France -- German header, French body, English footnotes
  doc.addPage();

  // German header
  doc.fontSize(7).fillColor('#999').font('Helvetica')
    .text('KAPITEL 1 \u2014 ENERGIEWIRTSCHAFT UND TRANSFORMATION', 50, 40, { characterSpacing: 1.5 });

  doc.fontSize(16).font('Helvetica-Bold').fillColor('#1b263b')
    .text('Siemens Energy France: Energiewende\nim Herzen der Alpen', 50, 60);

  doc.fontSize(8).fillColor('#888').font('Helvetica')
    .text('Sektion verfasst auf Franz\u00f6sisch | Section r\u00e9dig\u00e9e en fran\u00e7ais | Body written in French', 50, 100);
  doc.moveTo(50, 115).lineTo(545, 115).lineWidth(0.5).stroke('#ccc');

  // French body about Siemens Energy
  let y = 125;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Siemens Energy France, filiale du groupe allemand Siemens Energy AG (Munich), ' +
    'emploie environ 3 000 collaborateurs r\u00e9partis sur plusieurs sites en France, dont le principal ' +
    'se situe \u00e0 Grenoble (Is\u00e8re, r\u00e9gion Auvergne-Rh\u00f4ne-Alpes). Le site grenoblois, h\u00e9ritier ' +
    'de la tradition Alstom Power (rachet\u00e9 par GE puis c\u00e9d\u00e9 \u00e0 Siemens Energy en 2020), est ' +
    'sp\u00e9cialis\u00e9 dans la conception et la fabrication de turbines \u00e0 gaz de grande puissance ' +
    '(gamme SGT-800 et SGT-8000H, jusqu\u2019\u00e0 593 MW en cycle combin\u00e9), ainsi que dans les ' +
    'solutions de d\u00e9carbonation pour le secteur \u00e9nerg\u00e9tique.',
    50, y, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  y += 85;

  // Place a text block out of reading order (top-right corner, different topic)
  doc.save();
  doc.rect(380, 125, 165, 80).fill('#f0f4f8');
  doc.fontSize(7).font('Helvetica-Bold').fillColor('#1b263b')
    .text('Schl\u00fcsselzahlen / Chiffres cl\u00e9s', 388, 130, { width: 150 });
  doc.fontSize(6.5).font('Helvetica').fillColor('#333')
    .text('Mitarbeiter / Effectif: ~3 000\nStandort / Site: Grenoble\nUmsatz / CA: n.c. (filiale)\nProdukte / Produits: Gasturbinen\nGr\u00fcndung / Fond\u00e9: 2020 (transfer)\nMutterkonzern: Siemens Energy AG\nB\u00f6rse: XETRA (ENR)', 388, 145, { width: 150, lineGap: 2 });
  doc.restore();

  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Dans le cadre de la transition \u00e9nerg\u00e9tique europ\u00e9enne (European Green Deal, objectif de ' +
    'neutralit\u00e9 carbone 2050), Siemens Energy France joue un r\u00f4le strat\u00e9gique dans le d\u00e9veloppement ' +
    'de technologies cl\u00e9s : turbines \u00e0 gaz capables de fonctionner avec un m\u00e9lange hydrog\u00e8ne ' +
    'jusqu\u2019\u00e0 75% (programme \u00ab H2-Ready \u00bb, certification pr\u00e9vue 2027), solutions de capture ' +
    'de carbone post-combustion (partenariat avec Aker Carbon Capture), et digitalisation ' +
    'de la maintenance pr\u00e9dictive via la plateforme Siemens Xcelerator. Le carnet de commandes ' +
    'pour les activit\u00e9s fran\u00e7aises a augment\u00e9 de 22% en 2025, port\u00e9 par les contrats de ' +
    'modernisation du parc thermique fran\u00e7ais et les projets export vers l\u2019Afrique du Nord.',
    50, y, { width: 320, lineGap: 2.5, align: 'justify' }
  );
  y += 110;

  // English footnotes
  doc.fontSize(6.5).fillColor('#666').font('Helvetica')
    .text('1. Siemens Energy AG reported global revenue of \u20AC31.1B (FY2024). France operations are not separately disclosed.', 50, y);
  doc.text('2. The SGT-8000H turbine series achieves >63% efficiency in combined cycle configuration, per Siemens Energy technical documentation.', 50, y + 10);
  doc.text('3. Hydrogen co-firing capabilities verified at 30% vol. concentration as of Q3 2025. 75% target contingent on burner redesign program.', 50, y + 20);
  doc.text('4. Source: Observatoire analysis based on Siemens Energy AG Annual Report 2024, p.147-152, and interviews with local management (Oct 2025).', 50, y + 30);

  y += 55;
  // German paragraph thrown in
  doc.fontSize(8).font('Helvetica-BoldOblique').fillColor('#1b263b')
    .text('Zusammenfassung der Redaktion:', 50, y);
  y += 14;
  doc.fontSize(8).font('Helvetica').fillColor('#444').text(
    'Siemens Energy France positioniert sich als Schl\u00fcsselakteur der europ\u00e4ischen Energiewende. ' +
    'Mit dem Standort Grenoble als Kompetenzzentrum f\u00fcr Gasturbinentechnologie und einem wachsenden ' +
    'Auftragsbestand im Bereich Wasserstoff-f\u00e4higer Turbinen tr\u00e4gt das Unternehmen wesentlich zur ' +
    'Dekarbonisierung des franz\u00f6sischen und europ\u00e4ischen Energiesektors bei.',
    50, y, { width: 495, lineGap: 2 }
  );

  // -- PAGE 3: ArcelorMittal -- French header, English body, German footnotes
  doc.addPage();

  // French header
  doc.fontSize(7).fillColor('#999').font('Helvetica')
    .text('CHAPITRE 2 \u2014 SID\u00c9RURGIE ET D\u00c9CARBONATION INDUSTRIELLE', 50, 40, { characterSpacing: 1.5 });

  doc.fontSize(16).font('Helvetica-Bold').fillColor('#1b263b')
    .text('ArcelorMittal : L\u2019acier d\u00e9carbon\u00e9\net l\u2019Industrie 4.0', 50, 60);

  doc.fontSize(8).fillColor('#888').font('Helvetica')
    .text('Section r\u00e9dig\u00e9e en anglais | Sektion auf Englisch verfasst | Body written in English', 50, 100);
  doc.moveTo(50, 115).lineTo(545, 115).lineWidth(0.5).stroke('#ccc');

  y = 125;

  // English body - placed in two columns (non-standard layout)
  const colW = 235;
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'ArcelorMittal, the world\u2019s second-largest steel producer by volume, maintains a significant ' +
    'industrial presence in France through its subsidiary ArcelorMittal France. The company\u2019s ' +
    'French operations are anchored by two major integrated steelmaking sites: Dunkirk ' +
    '(Nord, Hauts-de-France)\u2014one of Europe\u2019s largest blast furnace complexes with annual ' +
    'capacity of 6.5 million tonnes\u2014and Fos-sur-Mer (Bouches-du-Rh\u00f4ne, Provence-Alpes-C\u00f4te ' +
    'd\u2019Azur), specializing in flat carbon steel products for automotive and packaging ' +
    'applications. Globally, ArcelorMittal employs approximately 155,000 people across ' +
    '60 countries, with consolidated revenue of \u20AC68.3 billion (FY2024) and crude steel ' +
    'production of 58.1 million tonnes.',
    50, y, { width: colW, lineGap: 2, align: 'justify' }
  );

  // Second column - deliberately placed to create parsing confusion
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'The company\u2019s decarbonization strategy in France centers on two groundbreaking ' +
    'hydrogen-based Direct Reduced Iron (DRI) projects: the \u201CSmart Carbon\u201D initiative ' +
    'at Dunkirk (\u20AC1.7B investment, supported by \u20AC850M in French state aid and EU Innovation ' +
    'Fund grants) and the Fos-sur-Mer DRI-EAF conversion project (\u20AC1.1B). Together, these ' +
    'projects aim to reduce CO\u2082 emissions from French steelmaking by 8 million tonnes per ' +
    'year by 2030\u2014equivalent to approximately 20% of France\u2019s total industrial emissions. ' +
    'The Dunkirk project will replace two of three existing blast furnaces with a 2.5 Mtpa ' +
    'DRI shaft furnace (Midrex technology, licensed from Kobe Steel) fed by green hydrogen ' +
    'produced via 300 MW of dedicated electrolysis capacity (partnership with Air Liquide).',
    310, y, { width: colW, lineGap: 2, align: 'justify' }
  );

  y += 145;

  // Box placed between columns
  doc.save();
  doc.rect(50, y, 495, 55).fill('#f8f0f0');
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#8b0000')
    .text('Industry 4.0 Implementation at ArcelorMittal France', 60, y + 6, { width: 475 });
  doc.fontSize(7.5).font('Helvetica').fillColor('#333').text(
    'ArcelorMittal\u2019s French sites have deployed an extensive Industry 4.0 technology stack: predictive maintenance (Siemens MindSphere + ' +
    'custom ML models, covering 2,400 critical assets), digital twin of blast furnace operations (developed with Dassault Syst\u00e8mes ' +
    '3DEXPERIENCE), computer vision quality inspection (98.2% defect detection rate on hot-rolled coil surface), and an integrated ' +
    'MES/ERP backbone (SAP S/4HANA + AVEVA MES). Total Industry 4.0 investment in France: \u20AC180M over 2022\u20132026.',
    60, y + 20, { width: 475, lineGap: 1.5 }
  );
  doc.restore();

  y += 70;

  // More English text
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'The talent implications are significant: ArcelorMittal France is recruiting 1,200 new engineers and technicians ' +
    'over 2024\u20132027 to support the technology transition, with particular demand for data scientists (40 positions), ' +
    'hydrogen process engineers (25), environmental engineers (35), and automation/robotics specialists (60). The company ' +
    'has established partnerships with \u00c9cole des Mines de Douai, ENSAM, and Universit\u00e9 de Lille for dedicated training ' +
    'programs. Average employee age at French sites has decreased from 47.2 to 43.8 years over the past three years, ' +
    'reflecting an accelerated generational renewal driven by the decarbonization roadmap.',
    50, y, { width: 495, lineGap: 2.5, align: 'justify' }
  );

  y += 80;

  // German footnotes (Fussnoten)
  doc.fontSize(7).font('Helvetica-Bold').fillColor('#1b263b').text('Fu\u00dfnoten / Notes de bas de page:', 50, y);
  y += 12;
  doc.fontSize(6.5).font('Helvetica').fillColor('#666');
  doc.text('1. ArcelorMittal S.A. Gesch\u00e4ftsbericht 2024: Gesamtumsatz \u20AC68,3 Mrd., Rohstahlproduktion 58,1 Mio. t, 155.000 Besch\u00e4ftigte weltweit.', 50, y);
  doc.text('2. Investitionssumme \u201eSmart Carbon\u201c Dunkerque: \u20AC1,7 Mrd., davon \u20AC850 Mio. staatliche Beihilfen (Frankreich + EU Innovation Fund).', 50, y + 10);
  doc.text('3. CO\u2082-Reduktionsziel: 8 Mio. t/Jahr bis 2030 (Quelle: ArcelorMittal Climate Action Report 2025, S. 34).', 50, y + 20);
  doc.text('4. Industrie-4.0-Investitionen Frankreich: \u20AC180 Mio. \u00fcber Zeitraum 2022\u20132026 (Quelle: Interview Werksdirektor Dunkerque, Nov. 2025).', 50, y + 30);

  // Random text block placed at bottom-right (out of reading order)
  doc.save();
  doc.rect(350, y + 50, 195, 70).fill('#f0f4f8');
  doc.fontSize(6.5).font('Helvetica-BoldOblique').fillColor('#1b263b')
    .text('Encadr\u00e9 : Chiffres cl\u00e9s ArcelorMittal', 358, y + 55, { width: 180 });
  doc.fontSize(6).font('Helvetica').fillColor('#333')
    .text('CA mondial: \u20AC68,3 Mrd\nEffectif: 155 000\nProduction acier: 58,1 Mt\nSites France: Dunkerque, Fos\nInvest. d\u00e9carb.: \u20AC2,8 Mrd\nR\u00e9duction CO\u2082: -8 Mt/an (2030)', 358, y + 68, { width: 180, lineGap: 2 });
  doc.restore();

  // -- PAGE 4: Bosch France -- English header, French body, German summary
  doc.addPage();

  // English header
  doc.fontSize(7).fillColor('#999').font('Helvetica')
    .text('CHAPTER 3 \u2014 AUTOMOTIVE TECHNOLOGY & CONNECTED VEHICLES', 50, 40, { characterSpacing: 1.5 });

  doc.fontSize(16).font('Helvetica-Bold').fillColor('#1b263b')
    .text('Bosch France: Automotive Innovation\n& IoT Ecosystem', 50, 60);

  doc.fontSize(8).fillColor('#888').font('Helvetica')
    .text('Section r\u00e9dig\u00e9e en fran\u00e7ais | Sektion auf Franz\u00f6sisch verfasst | Body written in French', 50, 100);
  doc.moveTo(50, 115).lineTo(545, 115).lineWidth(0.5).stroke('#ccc');

  y = 125;

  // French body about Bosch
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Robert Bosch France SAS, filiale du groupe allemand Robert Bosch GmbH (Stuttgart, ' +
    'Bade-Wurtemberg), constitue l\u2019un des plus importants employeurs industriels \u00e9trangers ' +
    'en France avec environ 5 500 collaborateurs r\u00e9partis sur 10 sites \u00e0 travers le territoire. ' +
    'Les principaux \u00e9tablissements comprennent le centre de R&D de Sophia Antipolis (Alpes-Maritimes, ' +
    '800 ing\u00e9nieurs, sp\u00e9cialis\u00e9 en logiciel embarqu\u00e9 automobile et AUTOSAR), l\u2019usine de ' +
    'Rodez (Aveyron, 1 200 salari\u00e9s, production de bougies d\u2019allumage et injecteurs diesel/essence), ' +
    'le site de Mondeville (Calvados, 750 salari\u00e9s, syst\u00e8mes \u00e9lectroniques pour l\u2019automobile), ' +
    'et le centre logistique de Drancy (Seine-Saint-Denis).',
    50, y, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  y += 95;

  // Text block placed at weird position (mid-page, offset)
  doc.save();
  doc.rect(300, y, 245, 130).fill('#f4f8f0');
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#2d6a2d')
    .text('AUTOSAR & Connected Vehicles', 308, y + 6, { width: 230 });
  doc.fontSize(7).font('Helvetica').fillColor('#333').text(
    'Le centre de Sophia Antipolis est ' +
    'un contributeur majeur au standard ' +
    'AUTOSAR (AUTomotive Open System ' +
    'ARchitecture), notamment pour les ' +
    'plateformes AUTOSAR Adaptive ' +
    'd\u00e9di\u00e9es aux v\u00e9hicules d\u00e9finis par ' +
    'logiciel (SDV). Les \u00e9quipes fran\u00e7aises ' +
    'contribuent aux couches middleware, ' +
    'communication V2X (Vehicle-to-' +
    'Everything) et cybersecurity. Bosch ' +
    'France est \u00e9galement impliqu\u00e9 dans ' +
    'le programme europ\u00e9en GAIA-X pour ' +
    'l\u2019infrastructure de donn\u00e9es des ' +
    'v\u00e9hicules connect\u00e9s.',
    308, y + 20, { width: 225, lineGap: 1.5 }
  );
  doc.restore();

  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Bosch France g\u00e9n\u00e8re un chiffre d\u2019affaires estim\u00e9 \u00e0 environ 1,8 milliard d\u2019euros (le groupe ' +
    'ne publie pas de comptes s\u00e9par\u00e9s pour la France). Les activit\u00e9s se r\u00e9partissent en quatre ' +
    'divisions : Mobility Solutions (65% du CA France, syst\u00e8mes de freinage, injection, ' +
    'ADAS, logiciel embarqu\u00e9), Industrial Technology (15%, automatisation industrielle, ' +
    'Industry 4.0), Consumer Goods (12%, \u00e9lectrom\u00e9nager sous marque Bosch et Siemens Home ' +
    'Appliances), Energy & Building Technology (8%, pompes \u00e0 chaleur, syst\u00e8mes de s\u00e9curit\u00e9). ' +
    'Le site de Sophia Antipolis est particuli\u00e8rement strat\u00e9gique pour le d\u00e9veloppement ' +
    'des logiciels AUTOSAR et des plateformes de v\u00e9hicules connect\u00e9s.',
    50, y, { width: 240, lineGap: 2.5, align: 'justify' }
  );

  y += 155;

  // English paragraph thrown in
  doc.fontSize(8).font('Helvetica-BoldOblique').fillColor('#1b263b')
    .text('Editor\u2019s Note (EN):', 50, y);
  y += 14;
  doc.fontSize(8).font('Helvetica').fillColor('#444').text(
    'Bosch France\u2019s 5,500 employees across 10 sites represent a critical node in the Robert Bosch GmbH global network. ' +
    'The Sophia Antipolis R&D center\u2019s work on AUTOSAR Adaptive and connected vehicle platforms positions France as a ' +
    'key contributor to Bosch\u2019s software-defined vehicle strategy. With the automotive industry\u2019s shift toward SDV ' +
    'architectures, the French operations\u2019 expertise in middleware, V2X communication, and cybersecurity creates ' +
    'significant strategic value within the broader Bosch ecosystem.',
    50, y, { width: 495, lineGap: 2 }
  );

  y += 60;

  // German summary
  doc.fontSize(8).font('Helvetica-BoldOblique').fillColor('#1b263b')
    .text('Zusammenfassung (DE):', 50, y);
  y += 14;
  doc.fontSize(8).font('Helvetica').fillColor('#444').text(
    'Bosch Frankreich besch\u00e4ftigt rund 5.500 Mitarbeiter an 10 Standorten und ist ein wichtiger Akteur im ' +
    'Bereich Automobilelektronik, IoT und vernetzte Fahrzeuge. Der Standort Sophia Antipolis mit 800 Ingenieuren ' +
    'ist eines der f\u00fchrenden AUTOSAR-Entwicklungszentren des Konzerns. Die franz\u00f6sischen Aktivit\u00e4ten tragen ' +
    'ma\u00dfgeblich zur Strategie der softwaredefinierten Fahrzeuge (SDV) bei und unterst\u00fctzen die Dekarbonisierung ' +
    'des Transportsektors durch Entwicklungen in den Bereichen Elektromobilit\u00e4t, Wasserstoff-Brennstoffzellen ' +
    'und intelligente Verkehrssysteme.',
    50, y, { width: 495, lineGap: 2 }
  );

  y += 65;

  // Mixed-language footnotes
  doc.fontSize(6.5).font('Helvetica').fillColor('#666');
  doc.text('1. (FR) Source : estimations de l\u2019Observatoire sur la base des comptes sociaux Robert Bosch France SAS d\u00e9pos\u00e9s au greffe.', 50, y);
  doc.text('2. (EN) AUTOSAR Adaptive Platform specification v22-11. Bosch is a premium member of the AUTOSAR consortium since founding in 2003.', 50, y + 10);
  doc.text('3. (DE) Quelle: Robert Bosch GmbH Gesch\u00e4ftsbericht 2024, S. 89\u201394. Weltweiter Konzernumsatz: \u20AC91,6 Mrd., 428.000 Besch\u00e4ftigte.', 50, y + 20);
  doc.text('4. (FR) Le programme GAIA-X vise \u00e0 cr\u00e9er une infrastructure europ\u00e9enne souveraine de donn\u00e9es. Bosch co-pr\u00e9side le comit\u00e9 mobilit\u00e9.', 50, y + 30);

  // -- PAGE 5: Comparative analysis -- all three languages mixed
  doc.addPage();

  doc.fontSize(7).fillColor('#999').font('Helvetica')
    .text('SYNTHESE COMPARATIVE / COMPARATIVE SYNTHESIS / VERGLEICHENDE SYNTHESE', 50, 40, { characterSpacing: 1.5 });

  doc.fontSize(14).font('Helvetica-Bold').fillColor('#1b263b')
    .text('Analyse Transversale des Trois Entreprises', 50, 60);
  doc.fontSize(10).fillColor('#778da9').font('Helvetica')
    .text('Cross-cutting Analysis | Quer\u00fcbergreifende Analyse', 50, 82);
  doc.moveTo(50, 98).lineTo(545, 98).lineWidth(0.5).stroke('#ccc');

  // Comparison table with headers in German, data labels in French, values in English
  y = 110;
  doc.fontSize(9).font('Helvetica-Bold').fillColor('#1b263b').text('Vergleichstabelle / Tableau comparatif', 50, y);
  y += 18;

  // Column headers in German
  const compHeaders = ['Unternehmen', 'Standort(e)', 'Besch\u00e4ftigte', 'Umsatz', 'Schwerpunkt'];
  const compColX = [50, 140, 260, 340, 420];
  const compColW = [85, 115, 75, 75, 125];
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#1b263b');
  compHeaders.forEach((h, i) => doc.text(h, compColX[i], y, { width: compColW[i] }));
  doc.moveTo(50, y + 12).lineTo(545, y + 12).lineWidth(0.3).stroke('#999');
  y += 17;

  // Row data in mixed languages
  const compRows = [
    ['Siemens Energy\nFrance', 'Grenoble\n(Is\u00e8re)', '~3 000', 'n.d.\n(filiale)', 'Gas turbines,\nenergy transition,\nH2-Ready'],
    ['ArcelorMittal\nFrance', 'Dunkerque,\nFos-sur-Mer', '155 000\n(mondial)', '\u20AC68.3B\n(global)', 'Steel, d\u00e9carbonation,\nDRI hydrogen,\nIndustry 4.0'],
    ['Bosch\nFrance', '10 sites\n(Sophia Antipolis\nprincipal R&D)', '5 500', '~\u20AC1.8B\n(estim\u00e9)', 'AUTOSAR,\nconnected vehicles,\nIoT, SDV'],
  ];
  doc.fontSize(7).font('Helvetica').fillColor('#333');
  compRows.forEach(row => {
    const startY = y;
    row.forEach((cell, i) => doc.text(cell, compColX[i], startY, { width: compColW[i], lineGap: 1 }));
    y += 40;
    doc.moveTo(50, y - 5).lineTo(545, y - 5).lineWidth(0.15).stroke('#ddd');
  });

  y += 10;

  // French analysis paragraph
  doc.fontSize(9).font('Helvetica').fillColor('#222').text(
    'Les trois entreprises \u00e9tudi\u00e9es illustrent des facettes compl\u00e9mentaires de la transformation ' +
    'industrielle en France. Siemens Energy France (\u00e9nergie, Grenoble) incarne la transition ' +
    '\u00e9nerg\u00e9tique avec ses turbines compatibles hydrog\u00e8ne. ArcelorMittal (sid\u00e9rurgie, Dunkerque/Fos, ' +
    '155 000 salari\u00e9s mondiaux, \u20AC68,3 Mrd CA) repr\u00e9sente le d\u00e9fi de la d\u00e9carbonation de l\u2019industrie ' +
    'lourde. Bosch France (automobile/IoT, 5 500 salari\u00e9s, 10 sites) symbolise la convergence ' +
    'entre mobilit\u00e9, logiciel et connectivit\u00e9.',
    50, y, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  y += 70;

  // English paragraph
  doc.fontSize(9).text(
    'All three companies share common themes: the centrality of hydrogen in their decarbonization ' +
    'strategies, the critical importance of software and data in traditional industrial sectors, ' +
    'and the challenge of recruiting and retaining specialized engineering talent in a competitive ' +
    'French labor market. Together, they employ over 160,000 people in France and represent ' +
    'strategic assets for European industrial sovereignty.',
    50, y, { width: 495, lineGap: 2.5, align: 'justify' }
  );
  y += 60;

  // German closing
  doc.fontSize(9).font('Helvetica-BoldOblique').fillColor('#1b263b')
    .text('Schlussfolgerung:', 50, y);
  y += 14;
  doc.fontSize(9).font('Helvetica').fillColor('#444').text(
    'Die drei untersuchten Unternehmen verdeutlichen die Komplexit\u00e4t und Vielfalt der industriellen ' +
    'Transformation in Frankreich. Ob im Bereich Energie (Siemens Energy, Grenoble, 3.000 Mitarbeiter), ' +
    'Stahl (ArcelorMittal, Dunkerque/Fos, 155.000 Mitarbeiter weltweit, \u20AC68,3 Mrd. Umsatz) oder ' +
    'Automobiltechnologie (Bosch France, 5.500 Mitarbeiter, 10 Standorte) \u2014 die Herausforderungen ' +
    'der Dekarbonisierung, Digitalisierung und des Fachkr\u00e4ftemangels erfordern massive Investitionen ' +
    'und eine enge deutsch-franz\u00f6sische industrielle Zusammenarbeit.',
    50, y, { width: 495, lineGap: 2.5, align: 'justify' }
  );

  // Tiny disclaimer at bottom in all 3 languages
  doc.fontSize(5).fillColor('#aaa').font('Helvetica').text(
    '\u00a9 2025 Observatoire Franco-Allemand de l\u2019Industrie. Tous droits r\u00e9serv\u00e9s. | All rights reserved. | Alle Rechte vorbehalten. ' +
    'Les donn\u00e9es contenues dans ce rapport proviennent de sources publiques et d\u2019entretiens. Aucune garantie d\u2019exactitude. ' +
    'Data sourced from public filings and interviews. No warranty of accuracy. ' +
    'Daten aus \u00f6ffentlichen Quellen und Interviews. Keine Gew\u00e4hr f\u00fcr Richtigkeit. ' +
    'Rapport ID: OBS-FR-DE-2025-ANN-003 | Classification: PUBLIC',
    50, 780, { width: 495, lineGap: 0.5 }
  );

  doc.end();
  return new Promise(resolve => ws.on('finish', resolve));
}

// ============================================================
// Run all three
// ============================================================
async function main() {
  await Promise.all([genERP(), genHackathon(), genMixedLang()]);
  console.log('Generated 3 PDFs in', OUT);
}

main().catch(err => { console.error(err); process.exit(1); });
