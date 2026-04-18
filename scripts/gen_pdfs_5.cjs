const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT, { recursive: true });

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Draw a manually-positioned table with overlapping cells, misaligned columns, and footnote refs */
function drawMessyTable(doc, headers, rows, x, y, colWidths, opts = {}) {
  const cellH = opts.cellH || 18;
  const fontSize = opts.fontSize || 7.5;
  const headerColor = opts.headerColor || '#1a2744';
  let curY = y;

  // Header row — dark bg, white text, slightly rotated labels
  doc.save();
  doc.rect(x, curY, colWidths.reduce((a, b) => a + b, 0), cellH + 4).fill(headerColor);
  let cx = x;
  headers.forEach((h, i) => {
    doc.save();
    doc.fillColor('#ffffff').fontSize(fontSize - 0.5).font('Helvetica-Bold');
    // Alternate: some headers slightly offset vertically to confuse parsers
    const yOff = i % 2 === 0 ? 3 : 6;
    doc.text(h, cx + 2, curY + yOff, { width: colWidths[i] - 4, align: 'center', lineBreak: false });
    doc.restore();
    cx += colWidths[i];
  });
  curY += cellH + 4;
  doc.restore();

  // Data rows — alternating subtle bg, some cells have superscript markers
  rows.forEach((row, ri) => {
    const bg = ri % 2 === 0 ? '#f4f6fa' : '#ffffff';
    doc.rect(x, curY, colWidths.reduce((a, b) => a + b, 0), cellH).fill(bg);
    let cx2 = x;
    row.forEach((cell, ci) => {
      doc.fillColor('#222222').fontSize(fontSize).font('Helvetica');
      // Randomly bold first column
      if (ci === 0) doc.font('Helvetica-Bold');
      const yOff2 = ci % 3 === 0 ? 4 : 5;
      doc.text(String(cell), cx2 + 2, curY + yOff2, { width: colWidths[ci] - 4, align: ci === 0 ? 'left' : 'center', lineBreak: false });
      cx2 += colWidths[ci];
    });
    // Draw grid lines (thin, some dashed to confuse OCR)
    let lx = x;
    colWidths.forEach((w) => {
      if (Math.random() > 0.3) {
        doc.save().strokeColor('#cccccc').lineWidth(0.25).moveTo(lx, curY).lineTo(lx, curY + cellH).stroke().restore();
      }
      lx += w;
    });
    curY += cellH;
  });

  // Outer border
  doc.save().strokeColor('#999999').lineWidth(0.5)
    .rect(x, y, colWidths.reduce((a, b) => a + b, 0), curY - y).stroke().restore();

  return curY;
}

/** Add a watermark-style diagonal text */
function addWatermark(doc, text) {
  doc.save();
  doc.fillColor('#e0e0e0').opacity(0.12).fontSize(54).font('Helvetica-Bold');
  doc.rotate(-35, { origin: [300, 420] });
  doc.text(text, 80, 350, { width: 600 });
  doc.restore();
  doc.opacity(1);
}

/** Add margin annotations (like handwritten notes) */
function marginNote(doc, text, x, y) {
  doc.save();
  doc.fillColor('#cc3333').fontSize(6).font('Helvetica-Oblique');
  doc.rotate(-2, { origin: [x, y] });
  doc.text(text, x, y, { width: 90 });
  doc.restore();
}

/** Dense footnote block */
function footnoteBlock(doc, notes, x, y, width) {
  doc.save();
  doc.strokeColor('#999999').lineWidth(0.3).moveTo(x, y).lineTo(x + width, y).stroke();
  let fy = y + 4;
  doc.fillColor('#666666').fontSize(5.5).font('Helvetica');
  notes.forEach((n) => {
    doc.text(n, x, fy, { width, lineBreak: true });
    fy += doc.heightOfString(n, { width }) + 1;
  });
  doc.restore();
  return fy;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF 1: Automotive Suppliers Benchmark
// ═══════════════════════════════════════════════════════════════════════════════
function genPDF1() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 45, right: 45 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(OUT, '13_automotive_suppliers_benchmark.pdf'));
  doc.pipe(stream);

  // ── Cover page ──
  doc.rect(0, 0, 595, 842).fill('#0d1b3e');
  // Decorative diagonal stripe
  doc.save().fillColor('#1a3a6e').rotate(-15, { origin: [297, 421] })
    .rect(-100, 300, 900, 80).fill().restore();
  doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold')
    .text('BENCHMARK FOURNISSEURS', 50, 200, { width: 495, align: 'center' });
  doc.fontSize(18).font('Helvetica')
    .text('INDUSTRIE AUTOMOBILE — FRANCE', 50, 245, { width: 495, align: 'center' });
  doc.fontSize(10).fillColor('#8899bb')
    .text('Rapport confidentiel — Distribution restreinte', 50, 300, { width: 495, align: 'center' });
  doc.fontSize(8).fillColor('#556688')
    .text('Réf: AUTO-BENCH-2024-Q3 | Version 4.2-RC | Classification: C2-Confidentiel', 50, 340, { width: 495, align: 'center' });
  doc.fillColor('#445577').fontSize(7)
    .text('Préparé par la Direction Stratégie & Intelligence Économique\nDate d\'émission: 15/09/2024 — Validité: 31/12/2024', 50, 700, { width: 495, align: 'center' });
  // Fake barcode-like element
  for (let i = 0; i < 40; i++) {
    const bw = Math.random() > 0.5 ? 2 : 1;
    doc.rect(200 + i * 5, 770, bw, 20).fill('#334466');
  }

  // ── Page 2: Methodology & Scope ──
  doc.addPage();
  addWatermark(doc, 'CONFIDENTIEL');
  doc.fillColor('#0d1b3e').fontSize(14).font('Helvetica-Bold').text('1. MÉTHODOLOGIE & PÉRIMÈTRE', 45, 50);
  doc.moveTo(45, 68).lineTo(300, 68).strokeColor('#cc2222').lineWidth(1.5).stroke();

  doc.fillColor('#333333').fontSize(8).font('Helvetica').text(
    'Le présent benchmark couvre trois acteurs majeurs de la filière automobile française, sélectionnés selon les critères suivants: (a) chiffre d\'affaires supérieur à 5Md€ ou positionnement stratégique sur la chaîne de valeur hydrogène/EV; (b) présence industrielle significative en France (>3 sites); (c) plan de transformation digitale en cours d\'exécution (horizon 2025-2030).\n\n' +
    'Sources: rapports annuels 2023, données INSEE T2-2024, entretiens semi-directifs (n=47 dirigeants, période mai-août 2024), base Orbis/BvD, filings AMF. Les données financières sont exprimées en EUR sauf mention contraire. Les variations YoY sont calculées à périmètre constant et taux de change constant (€1 = $1.08 au 30/06/2024).',
    45, 80, { width: 505, lineBreak: true, lineGap: 2 }
  );

  marginNote(doc, '* Voir annexe C pour la liste complète des 47 répondants', 500, 80);

  // Scope box — deliberately overlapping with text
  doc.save();
  doc.roundedRect(50, 200, 240, 120, 4).fillAndStroke('#f0f4fa', '#aabbcc');
  doc.fillColor('#0d1b3e').fontSize(7).font('Helvetica-Bold').text('PÉRIMÈTRE D\'ANALYSE', 60, 208, { width: 220 });
  doc.fillColor('#444444').fontSize(6.5).font('Helvetica');
  const scopeItems = [
    '■ Plastic Omnium SA — Équipementier Tier-1',
    '■ Continental AG (opérations France)',
    '■ Renault Group — Constructeur OEM',
    '▸ Filiales >50% consolidées uniquement',
    '▸ JVs exclues (cf. note méthodologique §3.2)',
    '▸ Ampere (spin-off Renault) traité séparément*',
    '▸ Périmètre géographique: France métropolitaine + DOM'
  ];
  scopeItems.forEach((item, i) => {
    doc.text(item, 60, 222 + i * 12, { width: 220 });
  });
  doc.restore();

  // Another overlapping box
  doc.save();
  doc.roundedRect(310, 195, 240, 135, 4).fillAndStroke('#faf4f0', '#ccbbaa');
  doc.fillColor('#3e1b0d').fontSize(7).font('Helvetica-Bold').text('INDICATEURS CLÉS RETENUS', 320, 203, { width: 220 });
  doc.fillColor('#444444').fontSize(6.5).font('Helvetica');
  const kpis = [
    '① CA consolidé (M€) & variation N/N-1',
    '② EBITDA ajusté & marge opérationnelle (%)',
    '③ Effectifs France (ETP) & taux de turnover',
    '④ Dépenses R&D (M€) — % du CA',
    '⑤ Indice de maturité digitale (échelle 1-5)',
    '⑥ Score ESG composite (S&P Global)',
    '⑦ Nb. brevets déposés (3 dernières années)',
    '⑧ Pipeline recrutement tech (postes ouverts)',
  ];
  kpis.forEach((k, i) => {
    doc.text(k, 320, 218 + i * 13, { width: 220 });
  });
  doc.restore();

  // ── Page 3: Plastic Omnium Profile ──
  doc.addPage();
  addWatermark(doc, 'DRAFT v4.2');
  doc.fillColor('#0d1b3e').fontSize(13).font('Helvetica-Bold').text('2. PROFIL — PLASTIC OMNIUM SA', 45, 45);
  doc.moveTo(45, 62).lineTo(350, 62).strokeColor('#cc2222').lineWidth(1).stroke();

  // Company header box
  doc.save();
  doc.rect(45, 72, 505, 55).fill('#f8f9fc');
  doc.fillColor('#222').fontSize(7).font('Helvetica-Bold');
  doc.text('Raison sociale:', 55, 80).font('Helvetica').text('Compagnie Plastic Omnium SE', 135, 80);
  doc.font('Helvetica-Bold').text('Siège social:', 55, 92).font('Helvetica').text('Lyon (69), France — 19 boulevard Jules Carteret', 135, 92);
  doc.font('Helvetica-Bold').text('Secteur:', 55, 104).font('Helvetica').text('Automobile — Équipementier Tier-1 (NACE 29.32Z)', 135, 104);
  doc.font('Helvetica-Bold').text('Effectifs monde:', 310, 80).font('Helvetica').text('~40 000 collaborateurs (12/2023)', 390, 80);
  doc.font('Helvetica-Bold').text('CA 2023:', 310, 92).font('Helvetica').text('11,4 Md€ (+8,2% vs 2022*)', 390, 92);
  doc.font('Helvetica-Bold').text('Cotation:', 310, 104).font('Helvetica').text('Euronext Paris — POM.PA | ISIN FR0000124570', 390, 104);
  doc.restore();

  // Narrative paragraphs with inline data that's hard to parse
  doc.fillColor('#333333').fontSize(7.5).font('Helvetica').text(
    'Plastic Omnium poursuit sa transformation stratégique autour de deux axes prioritaires: (1) le stockage hydrogène haute pression (objectif 40% du CA "Clean Energy" d\'ici 2030, contre ~12% en 2023) et (2) la transition vers l\'énergie propre dans la mobilité. Le groupe a investi 487M€ en R&D en 2023 (4,3% du CA), dont 180M€ spécifiquement alloués à l\'hydrogène et aux systèmes de stockage d\'énergie.\n\n' +
    'L\'acquisition d\'EKPO Fuel Cell Technologies (JV avec ElringKlinger) renforce le positionnement sur la pile à combustible. Le site de Compiègne (Oise) est le centre névralgique du développement hydrogène avec 320 ingénieurs dédiés. L\'objectif affiché: devenir le leader mondial du réservoir H₂ de Type IV d\'ici 2027.\n\n' +
    'Points d\'attention identifiés lors de l\'analyse: ▲ Forte dépendance au marché européen (67% du CA) dans un contexte de ralentissement des ventes automobiles en Europe (-3,1% au S1-2024). ▼ La montée en puissance de BYD et des équipementiers chinois sur le segment hydrogène crée une pression concurrentielle accrue. ▲ La clean energy transition reste fortement subventionnée — risque réglementaire si les aides EU (IPCEI Hydrogen) sont révisées post-élections 2024.',
    45, 140, { width: 505, lineBreak: true, lineGap: 2.5 }
  );

  marginNote(doc, 'Δ MAJ 09/2024: CA révisé +0.3Md€ vs draft v4.0', 2, 165);

  // Mini financial table crammed in
  const finHeaders = ['Indicateur', '2021', '2022', '2023', 'Δ 22/23', 'Cible 2025E'];
  const finRows = [
    ['CA (M€)', '8 149', '10 533*', '11 402', '+8,2%▲', '12 800E'],
    ['EBITDA adj. (M€)', '812', '998', '1 092', '+9,4%▲', '1 250E'],
    ['Marge EBITDA (%)', '9,97%', '9,48%', '9,58%', '+10bps', '9,8%E'],
    ['R&D (M€)', '401', '445', '487', '+9,4%▲', '520E'],
    ['R&D/CA (%)', '4,92%', '4,23%', '4,27%', '+4bps', '4,1%E'],
    ['Effectifs (ETP)', '33 400', '37 800', '~40 000', '+5,8%▲', '42 000E'],
    ['Dette nette (M€)', '1 230', '1 456', '1 380', '-5,2%▼', '1 200E'],
    ['Score ESG (S&P)', '52/100', '58/100', '63/100', '+5pts▲', '68E'],
  ];
  const cw1 = [100, 60, 65, 65, 55, 70];
  let ty = drawMessyTable(doc, finHeaders, finRows, 55, 320, cw1, { cellH: 16, fontSize: 6.5, headerColor: '#1a2744' });

  footnoteBlock(doc, [
    '* 2022 retraité suite à l\'application d\'IFRS 17. Les données antérieures n\'ont pas été retraitées.',
    '▲/▼ Indicateurs de tendance YoY. E = Estimation consensus analystes (Bloomberg, sept. 2024).',
    'Source: Rapport annuel POM 2023, Document d\'Enregistrement Universel (AMF D.24-0198), Bloomberg Terminal.',
  ], 55, ty + 8, 415);

  // ── Page 4: Continental AG ──
  doc.addPage();
  addWatermark(doc, 'CONFIDENTIEL');
  doc.fillColor('#0d1b3e').fontSize(13).font('Helvetica-Bold').text('3. PROFIL — CONTINENTAL AG (Opérations France)', 45, 45);
  doc.moveTo(45, 62).lineTo(400, 62).strokeColor('#eebb00').lineWidth(1.5).stroke();

  doc.save();
  doc.rect(45, 72, 505, 55).fill('#fffcf0');
  doc.fillColor('#222').fontSize(7).font('Helvetica-Bold');
  doc.text('Raison sociale:', 55, 80).font('Helvetica').text('Continental Aktiengesellschaft', 135, 80);
  doc.font('Helvetica-Bold').text('Siège mondial:', 55, 92).font('Helvetica').text('Hanovre, Allemagne — Présence FR: Toulouse (31), Rambouillet (78)', 135, 92);
  doc.font('Helvetica-Bold').text('Secteur:', 55, 104).font('Helvetica').text('Automobile/Technologie — Tier-1 Méga-fournisseur', 135, 104);
  doc.font('Helvetica-Bold').text('Effectifs monde:', 310, 80).font('Helvetica').text('~190 000 (12/2023)', 390, 80);
  doc.font('Helvetica-Bold').text('Effectifs France:', 310, 92).font('Helvetica').text('~2 800 (est.)', 390, 92);
  doc.font('Helvetica-Bold').text('CA monde 2023:', 310, 104).font('Helvetica').text('41,4 Md€', 390, 104);
  doc.restore();

  doc.fillColor('#333333').fontSize(7.5).font('Helvetica').text(
    'Continental AG, bien que de siège allemand, maintient des opérations significatives en France, principalement centrées sur les activités ADAS (Advanced Driver-Assistance Systems) et conduite autonome. Le site de Toulouse (zone Basso Cambo) emploie environ 1 200 ingénieurs spécialisés en perception environnementale, fusion de capteurs et algorithmes de décision temps-réel pour les niveaux SAE L2+ à L4.\n\n' +
    'Le centre de Rambouillet (Yvelines) héberge les équipes de validation et d\'homologation pour le marché européen, avec un focus sur la conformité UN-R157 (ALKS) et le cadre réglementaire EU pour la conduite automatisée. Environ 600 collaborateurs y sont basés, dont 180 en contrat CIFRE avec des laboratoires CNRS/INRIA.\n\n' +
    'Axe stratégique 2024-2028: Continental mise massivement sur la "Software-Defined Mobility". La division Autonomous Mobility (spin-off prévue courant 2025, nom de code "Project Aurora") devrait concentrer les investissements logiciels avec un budget R&D dédié de ~2,1Md€/an. Le site de Toulouse est pressenti comme l\'un des 5 "Global Software Hubs" du groupe.\n\n' +
    'Positionnement concurrentiel: Continental est en concurrence directe avec Valeo (Lidar 3e gén.), Mobileye (Intel) et les stacks logicielles chinoises (Horizon Robotics, Momenta) sur le segment ADAS/AD. L\'alliance technique avec Ambarella (processeurs CV3) vise à réduire la dépendance aux SoC NVIDIA.',
    45, 140, { width: 505, lineBreak: true, lineGap: 2.5 }
  );

  // Weird inline data table with merged cells effect
  const contHeaders = ['Site FR', 'Ville', 'Effectifs', 'Activité principale', 'Invest. 2024 (M€)', 'Statut'];
  const contRows = [
    ['Conti Toulouse', 'Toulouse (31)', '~1 200', 'ADAS / Conduite autonome L2+-L4', '45*', '▲ Croissance'],
    ['Conti Rambouillet', 'Rambouillet (78)', '~600', 'Homologation / Validation', '12', '→ Stable'],
    ['Conti Sarreguemines', 'Sarreguemines (57)', '~450', 'Électronique embarquée (PCB)', '8', '▼ Restructuration'],
    ['Conti Bourgoin', 'Bourgoin-J. (38)', '~350', 'Capteurs / Radar 77GHz', '22', '▲ Extension'],
    ['Continental Automotive FR (consolidé)', '—', '~2 800†', '—', '87 total', '—'],
  ];
  const cw2 = [95, 75, 50, 130, 60, 65];
  ty = drawMessyTable(doc, contHeaders, contRows, 45, 380, cw2, { cellH: 18, fontSize: 6, headerColor: '#444400' });

  footnoteBlock(doc, [
    '* Inclut co-financement BPI France "France 2030" (volet véhicule autonome). † Estimation interne, non confirmée par Continental.',
    'Sources: Sites web Continental, entretiens RH Continental FR (juin 2024), registres URSSAF (extraction partielle).',
  ], 45, ty + 6, 480);

  // ── Page 5: Renault Group ──
  doc.addPage();
  addWatermark(doc, 'DRAFT v4.2');
  doc.fillColor('#0d1b3e').fontSize(13).font('Helvetica-Bold').text('4. PROFIL — RENAULT GROUP', 45, 45);
  doc.moveTo(45, 62).lineTo(300, 62).strokeColor('#ffcc00').lineWidth(2).stroke();

  doc.save();
  doc.rect(45, 72, 505, 65).fill('#f5f5ff');
  doc.fillColor('#222').fontSize(7).font('Helvetica-Bold');
  doc.text('Raison sociale:', 55, 80).font('Helvetica').text('Renault SA (Renault Group)', 135, 80);
  doc.font('Helvetica-Bold').text('Siège social:', 55, 92).font('Helvetica').text('Boulogne-Billancourt (92), France — 13-15 Quai Alphonse Le Gallo', 135, 92);
  doc.font('Helvetica-Bold').text('Secteur:', 55, 104).font('Helvetica').text('Automobile — Constructeur OEM (NACE 29.10Z)', 135, 104);
  doc.font('Helvetica-Bold').text('Effectifs monde:', 55, 116).font('Helvetica').text('~170 000 (Groupe incl. Dacia, Alpine, Mobilize)', 135, 116);
  doc.font('Helvetica-Bold').text('CA 2023:', 310, 80).font('Helvetica').text('52,4 Md€ (56 Md€ incl. financement**)', 390, 80);
  doc.font('Helvetica-Bold').text('Cotation:', 310, 92).font('Helvetica').text('Euronext Paris — RNO.PA', 390, 92);
  doc.font('Helvetica-Bold').text('Alliances:', 310, 104).font('Helvetica').text('Nissan (15% croisé), Mitsubishi, Geely (Horse)', 390, 104);
  doc.font('Helvetica-Bold').text('Entités stratégiques:', 310, 116).font('Helvetica').text('Ampere (EV), Horse (ICE), Alpine, Mobilize', 390, 116);
  doc.restore();

  doc.fillColor('#333333').fontSize(7.5).font('Helvetica').text(
    'Renault Group est en phase avancée de sa transformation "Renaulution" (2021-2025), articulée autour de la transition vers le véhicule électrique (BEV) et le Software Defined Vehicle (SDV). La création d\'Ampere, entité dédiée aux véhicules électriques et au logiciel embarqué, marque un tournant industriel majeur. L\'introduction en bourse d\'Ampere, initialement prévue mi-2024, a été reportée sine die en raison des conditions de marché défavorables.\n\n' +
    '>> FOCUS RECRUTEMENT: Renault Group a annoncé un plan de recrutement massif de 500 ingénieurs logiciels en France pour 2024-2025, principalement pour Ampere et la plateforme SDV. Les profils recherchés couvrent: embedded software (AUTOSAR Adaptive, ROS2), cloud/data engineering (AWS/GCP), cybersécurité véhiculaire (ISO 21434), et IA embarquée (modèles de perception on-edge). Les sites ciblés sont: Guyancourt (Technocentre), Sophia-Antipolis, et le nouveau campus numérique de Boulogne-Billancourt.\n\n' +
    'Enjeux identifiés: ▲ La montée en puissance du Scenic E-Tech (plateforme CMF-EV) et du R5 E-Tech positionne Renault comme challenger crédible face à VW ID. et Tesla Model 3. ▼ L\'alliance Nissan reste fragile — la restructuration du cross-shareholding (passage de 43% à 15%) réduit les synergies. ▲ La JV "Horse Powertrain" avec Geely sécurise la base ICE (thermique) mais crée une dépendance stratégique envers un acteur chinois. ▼ Le pipeline SDV nécessite ~2Md€ d\'investissements sur 2024-2027, dans un contexte de marges sous pression.',
    45, 150, { width: 505, lineBreak: true, lineGap: 2.5 }
  );

  // Dense comparison table at bottom
  const compHeaders = ['Métrique', 'Plastic Omnium', 'Continental (FR)', 'Renault Group', 'Médiane secteur*'];
  const compRows = [
    ['CA 2023 (Md€)', '11,4', '~2,2 (FR only)', '52,4 (56 incl. fin.)', '8,7'],
    ['Marge EBITDA (%)', '9,6%', '~8,1% (est.)', '7,9%', '8,2%'],
    ['R&D / CA (%)', '4,3%', '~7,2% (FR)', '5,1%', '4,8%'],
    ['Effectifs FR (ETP)', '~8 500', '~2 800', '~46 000', '—'],
    ['Maturité digitale (1-5)', '3,2', '4,1', '3,8', '3,0'],
    ['Score ESG S&P', '63/100', '71/100', '68/100', '55/100'],
    ['Brevets (3 ans)', '892', '~350 (FR)', '3 241', '—'],
    ['Postes tech ouverts', '~180', '~90', '~500 (dont 500 SW§)', '—'],
  ];
  const cw3 = [95, 90, 90, 105, 80];
  ty = drawMessyTable(doc, compHeaders, compRows, 45, 435, cw3, { cellH: 17, fontSize: 6, headerColor: '#2a1a4e' });

  footnoteBlock(doc, [
    '* Médiane calculée sur panel de 28 équipementiers/constructeurs européens (source: S&P Capital IQ). § "500 SW" = plan spécifique "Software Engineers" annoncé 03/2024.',
    '** CA "incl. financement" = intègre RCI Banque (Mobilize Financial Services). Le CA automobile pur est de 52,4Md€.',
    'Note: Les données Continental concernent uniquement le périmètre France estimé. Continental ne publie pas de données segmentées par pays.',
    'Classification: C2 — Diffusion restreinte | Réf: AUTO-BENCH-2024-Q3-v4.2 | Page {PAGE} sur {TOTAL}',
  ], 45, ty + 6, 480);

  // ── Page 6: strategic synthesis — very dense ──
  doc.addPage();
  addWatermark(doc, 'CONFIDENTIEL');
  doc.fillColor('#0d1b3e').fontSize(13).font('Helvetica-Bold').text('5. SYNTHÈSE STRATÉGIQUE & RECOMMANDATIONS', 45, 45);
  doc.moveTo(45, 62).lineTo(420, 62).strokeColor('#cc2222').lineWidth(1).stroke();

  // Dense multi-column layout
  doc.fillColor('#333333').fontSize(7).font('Helvetica');

  // Left column
  doc.text(
    'AXES DE CONVERGENCE IDENTIFIÉS:\n\n' +
    '1. Transition énergétique: Les trois acteurs investissent massivement dans la décarbonation de la mobilité, avec des approches complémentaires — hydrogène (POM), efficience logicielle (Continental), BEV full-stack (Renault/Ampere).\n\n' +
    '2. Software-Defined Vehicle: Convergence vers l\'architecture "zone-based" E/E. Continental et Renault collaborent déjà sur des briques ADAS (contrat Mégane E-Tech). Plastic Omnium développe des modules "smart" intégrant capteurs et connectivité.\n\n' +
    '3. Guerre des talents tech: Les 3 groupes sont en concurrence directe sur le bassin d\'emploi Île-de-France / Toulouse pour les profils SW embarqué, data, cybersécurité. Le salaire médian proposé (ingénieur 5-8 ans XP): POM 58-65k€, Conti 62-72k€, Renault 55-68k€.',
    50, 78, { width: 230, lineBreak: true, lineGap: 2 }
  );

  // Right column
  doc.text(
    'RECOMMANDATIONS OPÉRATIONNELLES:\n\n' +
    'R1. [Priorité: HAUTE] Initier un partenariat tripartite sur la cybersécurité véhiculaire (ISO/SAE 21434) pour mutualiser les coûts de mise en conformité UN-R155/156.\n\n' +
    'R2. [Priorité: MOYENNE] Explorer les synergies sur la supply-chain hydrogène: POM (réservoirs) × Renault/Hyvia (véhicules utilitaires H₂) × Continental (capteurs H₂).\n\n' +
    'R3. [Priorité: HAUTE] Mettre en place un programme de mobilité inter-entreprises pour les ingénieurs logiciels — type "échange industriel" de 6-12 mois — afin de fidéliser les talents et créer un écosystème.\n\n' +
    'R4. [Priorité: BASSE] Veille concurrentielle renforcée sur les acteurs chinois (BYD, CATL, Horizon Robotics) via le réseau Business France / CCI FR-Chine.',
    310, 78, { width: 230, lineBreak: true, lineGap: 2 }
  );

  // Another overlapping visual element: risk matrix as text
  doc.save();
  doc.roundedRect(50, 350, 495, 120, 3).fillAndStroke('#fafafa', '#999');
  doc.fillColor('#0d1b3e').fontSize(8).font('Helvetica-Bold').text('MATRICE DE RISQUES — SYNTHÈSE (échelle: ●●●●● = critique)', 60, 358, { width: 475 });
  doc.fillColor('#444').fontSize(6.5).font('Helvetica');
  const risks = [
    'Risque réglementaire (EU/CSRD/CBAM)    | POM: ●●●○○  | Conti: ●●○○○  | Renault: ●●●●○  | Tendance: ▲ croissant',
    'Risque supply-chain (semi-conducteurs)  | POM: ●●○○○  | Conti: ●●●●○  | Renault: ●●●●●  | Tendance: ▼ décroissant',
    'Risque concurrentiel (Chine)            | POM: ●●●○○  | Conti: ●●●○○  | Renault: ●●●●●  | Tendance: ▲▲ forte hausse',
    'Risque talent/RH (pénurie SW)           | POM: ●●●●○  | Conti: ●●●○○  | Renault: ●●●●○  | Tendance: → stable',
    'Risque technologique (transition H₂/EV) | POM: ●●●●○  | Conti: ●●○○○  | Renault: ●●●○○  | Tendance: → stable',
    'Risque financier (endettement/marges)   | POM: ●●○○○  | Conti: ●●○○○  | Renault: ●●●○○  | Tendance: ▼ décroissant',
  ];
  risks.forEach((r, i) => {
    doc.text(r, 60, 374 + i * 13, { width: 475 });
  });
  doc.restore();

  // Final footnotes
  footnoteBlock(doc, [
    'Document généré automatiquement — Système BI CONFIDENTIEL v7.3. Dernière mise à jour des données: 14/09/2024 23:47 UTC.',
    'Tout destinataire de ce document s\'engage à respecter les obligations de confidentialité définies dans l\'accord-cadre NDA-2024-0147.',
    '© 2024 Direction Stratégie & Intelligence Économique. Reproduction interdite sans autorisation écrite préalable. Réf: AUTO-BENCH-2024-Q3-v4.2-FINAL.',
  ], 50, 490, 490);

  doc.end();
  return new Promise(r => stream.on('finish', r));
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF 2: Cybersecurity Incident Report
// ═══════════════════════════════════════════════════════════════════════════════
function genPDF2() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 35, bottom: 35, left: 40, right: 40 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(OUT, '14_cybersecurity_incident_report.pdf'));
  doc.pipe(stream);

  // ── Cover ──
  doc.rect(0, 0, 595, 842).fill('#111111');
  // Glitch-style decorative lines
  for (let i = 0; i < 30; i++) {
    const gy = 100 + Math.random() * 600;
    doc.save().strokeColor(`#${Math.random() > 0.5 ? '00ff41' : 'ff3333'}`).lineWidth(0.3).opacity(0.15 + Math.random() * 0.2)
      .moveTo(Math.random() * 200, gy).lineTo(595 - Math.random() * 200, gy).stroke().restore();
  }
  doc.fillColor('#00ff41').fontSize(10).font('Courier').text('> CLASSIFICATION: TLP:AMBER+STRICT', 50, 60);
  doc.fillColor('#ff3333').fontSize(32).font('Helvetica-Bold').text('RAPPORT D\'INCIDENTS', 50, 150, { width: 495 });
  doc.fillColor('#ffffff').fontSize(18).font('Helvetica').text('CYBERSÉCURITÉ — COMPILATION Q3 2024', 50, 195, { width: 495 });
  doc.fillColor('#888888').fontSize(9).text('Analyse multi-entités — Secteurs: Santé, Défense/Identité numérique, Services Cyber', 50, 240, { width: 495 });
  doc.fillColor('#00ff41').fontSize(7).font('Courier');
  doc.text('Réf: CSIRT-2024-Q3-COMPILATION-007', 50, 310);
  doc.text('Émetteur: SOC Central — Cellule Threat Intelligence', 50, 322);
  doc.text('Date: 2024-09-18T14:32:00Z', 50, 334);
  doc.text('Distribution: COMEX + RSSI uniquement', 50, 346);
  doc.text('Niv. confidentialité: C3-SECRET ENTREPRISE', 50, 358);
  // Fake hash
  doc.fillColor('#555555').fontSize(6).text('SHA-256 du document: a4f8e2c1...b7d903ef (vérification: pgp --verify rapport_q3.pdf.sig)', 50, 750);
  doc.text('Généré par SIEM Aggregator v3.8.1 — Horodatage certifié eIDAS', 50, 762);

  // ── Page 2: Executive Summary ──
  doc.addPage();
  addWatermark(doc, 'TLP:AMBER');
  doc.fillColor('#cc0000').fontSize(12).font('Helvetica-Bold').text('EXECUTIVE SUMMARY', 40, 40);
  doc.moveTo(40, 56).lineTo(250, 56).strokeColor('#cc0000').lineWidth(2).stroke();

  // Alert box
  doc.save();
  doc.roundedRect(40, 65, 515, 50, 3).fillAndStroke('#fff0f0', '#cc0000');
  doc.fillColor('#cc0000').fontSize(7.5).font('Helvetica-Bold')
    .text('⚠ ALERTE CRITIQUE: 3 incidents majeurs identifiés au cours du trimestre Q3-2024, dont 1 compromission confirmée avec exfiltration de données de santé (RGPD Art. 33 — notification CNIL effectuée dans les 72h). Impact financier estimé: 4,2M€ (coûts directs) + 12-18M€ (coûts indirects sur 24 mois).', 50, 73, { width: 495, lineBreak: true });
  doc.restore();

  doc.fillColor('#333333').fontSize(7.5).font('Helvetica').text(
    'Ce rapport compile les incidents cybersécurité significatifs survenus entre le 01/07/2024 et le 30/09/2024, affectant trois entités du périmètre de surveillance:\n\n' +
    '  • Entité A — Groupe Hospitalier Sainte-Marguerite (GHSM): Établissement de santé multi-sites, ~800 collaborateurs, secteur Healthcare.\n' +
    '       Incident: Ransomware (LockBit 3.0 variant) avec chiffrement partiel du SI clinique et exfiltration de 47 Go de données patients.\n' +
    '  • Entité B — Thales DIS (Digital Identity & Security): Division cybersécurité/identité numérique du groupe Thales.\n' +
    '       Contexte: Préparation conformité NIS2 (échéance transposition nationale: 17 octobre 2024). Audit de maturité cyber.\n' +
    '  • Entité C — Orange Cyberdefense (OCD): Filiale cybersécurité d\'Orange, ~3 000 collaborateurs, prestataire SOC/CERT.\n' +
    '       Rôle: Intervenant CERT sur l\'incident GHSM + benchmark concurrent sur le marché MSSP français.\n\n' +
    'Structure du rapport: §1 Executive Summary (ce chapitre) → §2 Chronologie détaillée → §3 Analyse technique (IOCs, TTPs MITRE ATT&CK) → §4 Impact et évaluation des dommages → §5 Recommandations et plan de remédiation → Annexes (A: IOCs complets, B: logs SIEM, C: communications de crise).',
    40, 130, { width: 515, lineBreak: true, lineGap: 2.5 }
  );

  marginNote(doc, 'DRAFT — validation RSSI en attente', 500, 145);

  // Dense stats box
  doc.save();
  doc.roundedRect(40, 360, 250, 150, 3).fillAndStroke('#f5f5ff', '#3333cc');
  doc.fillColor('#1a1a6e').fontSize(7.5).font('Helvetica-Bold').text('MÉTRIQUES SOC — Q3 2024', 50, 368, { width: 230 });
  doc.fillColor('#333333').fontSize(6.5).font('Courier');
  const socMetrics = [
    'Alertes SIEM traitées ............ 847 293',
    'Incidents qualifiés (L1→L2) .....   4 812',
    'Incidents confirmés (L2→L3) .....     287',
    'Incidents critiques (P1/P2) .....      11',
    'Incidents avec exfiltration .....       3',
    'MTTD (Mean Time To Detect) ...... 4h 23min',
    'MTTR (Mean Time To Respond) ..... 18h 47min',
    'Faux positifs (taux) ............ 94,3%',
    'Règles SIEM actives ............ 12 847',
    'Sources de logs intégrées ......    342',
    'Agents EDR déployés ............ 28 400',
  ];
  socMetrics.forEach((m, i) => {
    doc.text(m, 50, 384 + i * 11, { width: 230 });
  });
  doc.restore();

  // Right side: tech jargon box
  doc.save();
  doc.roundedRect(305, 360, 250, 150, 3).fillAndStroke('#f0fff0', '#33cc33');
  doc.fillColor('#0d3e0d').fontSize(7.5).font('Helvetica-Bold').text('STACK TECHNIQUE DÉPLOYÉE', 315, 368, { width: 230 });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  const techStack = [
    '• SIEM: Splunk Enterprise Security 7.3 + Elastic SIEM 8.11',
    '• EDR: CrowdStrike Falcon Insight (v6.58) / SentinelOne Singularity',
    '• XDR: Palo Alto Cortex XDR Pro (intégration XSOAR)',
    '• NDR: Vectra AI (Cognito Detect 8.x)',
    '• SOAR: Splunk SOAR (ex-Phantom) + TheHive 5',
    '• Threat Intel: MISP 2.4, OpenCTI 5.12, Anomali ThreatStream',
    '• Zero Trust: Zscaler ZPA + Okta Identity Engine',
    '• OT Security: Claroty xDome (IEC 62443 compliance)',
    '• Vuln Mgmt: Qualys VMDR + Tenable.io',
    '• Conformité NIS2: Plateforme propriétaire "NIS2-Ready™"',
  ];
  techStack.forEach((t, i) => {
    doc.text(t, 315, 384 + i * 12, { width: 230 });
  });
  doc.restore();

  footnoteBlock(doc, [
    'Les métriques SOC incluent les 3 entités surveillées. MTTD/MTTR calculés sur incidents P1-P3 uniquement.',
    'TLP:AMBER — Ce document ne doit pas être partagé en dehors des destinataires nommés.',
  ], 40, 530, 515);

  // ── Page 3: Incident Chronology ──
  doc.addPage();
  addWatermark(doc, 'TLP:AMBER');
  doc.fillColor('#cc0000').fontSize(12).font('Helvetica-Bold').text('§2. CHRONOLOGIE DÉTAILLÉE — INCIDENT GHSM', 40, 40);
  doc.moveTo(40, 56).lineTo(400, 56).strokeColor('#cc0000').lineWidth(1).stroke();

  // Timeline entries as dense monospace blocks with interleaved annotations
  doc.fillColor('#333333').fontSize(6.5).font('Courier');
  const timeline = [
    { ts: '2024-08-12 02:17:43 UTC', event: 'Première connexion RDP suspecte détectée sur GHSM-SRV-DC02 (10.42.1.12) depuis IP 185.220.101.xxx (TOR exit node). Alerte SIEM #847201 — auto-classée P4 (faible). Agent EDR en mode "detect-only" sur ce segment (erreur de config identifiée post-incident).', severity: 'P4/INFO' },
    { ts: '2024-08-12 03:44:12 UTC', event: 'Mouvement latéral détecté: GHSM-SRV-DC02 → GHSM-SRV-APP01 (10.42.2.5) via PsExec. Credential harvesting confirmé (Mimikatz variant — hash NTLM du compte svc_backup exfiltré). Alerte SIEM #847209 — escaladée P3 mais non traitée (équipe SOC en sous-effectif nuit du 11-12 août, période estivale).', severity: 'P3/WARN' },
    { ts: '2024-08-12 06:15:00 UTC', event: 'Début d\'exfiltration via tunnel DNS (iodine) vers C2 identifié: data-sync.healthcloud[.]xyz (résolu vers 91.215.85.xxx — hébergeur bulletproof, AS394711). Volume estimé: 47 Go sur 8h (données patients: DME, comptes-rendus opératoires, imagerie DICOM). Alerte NDR Vectra — score: 87/100 (critique).', severity: 'P1/CRITICAL' },
    { ts: '2024-08-12 08:30:00 UTC', event: 'SOC L2 prend connaissance des alertes accumulées. Escalade immédiate P1. Activation du plan de réponse à incident (PRI-GHSM-v3.1). Contact CERT-FR (ANSSI) à 09:15.', severity: 'P1/CRITICAL' },
    { ts: '2024-08-12 14:00:00 UTC', event: 'Déploiement ransomware LockBit 3.0 (variant custom, anti-EDR packer). Chiffrement de 340 VMs sur 812 (41,9%). Systèmes cliniques impactés: SIH (Système d\'Information Hospitalier), PACS (imagerie), GAM (gestion administrative). Note de rançon: 2.4M€ en BTC.', severity: 'P1/CRITICAL' },
    { ts: '2024-08-12 15:30:00 UTC', event: 'Orange Cyberdefense (CERT OCD) dépêché sur site. Équipe de 6 analystes (2 forensic, 2 malware RE, 1 CTI, 1 crisis comm). Début du confinement réseau — isolation des VLANs critiques.', severity: 'RESPONSE' },
    { ts: '2024-08-13 — 2024-08-19', event: 'Phase de remédiation: restauration depuis backups (RPO: -36h, RTO atteint en 7j vs SLA de 4h pour systèmes critiques). 12 VMs non restaurables — reconstruction complète nécessaire. Coût estimé phase 1: 1,8M€.', severity: 'REMEDIATION' },
  ];
  timeline.forEach((t, i) => {
    const sevColor = t.severity.includes('CRITICAL') ? '#cc0000' : t.severity.includes('WARN') ? '#cc8800' : '#336633';
    doc.save();
    // Severity badge
    doc.roundedRect(42, 72 + i * 80, 60, 12, 2).fill(sevColor);
    doc.fillColor('#ffffff').fontSize(5.5).font('Courier-Bold').text(t.severity, 44, 74 + i * 80, { width: 56, align: 'center' });
    doc.restore();
    // Timestamp
    doc.fillColor('#666666').fontSize(6).font('Courier-Bold').text(t.ts, 110, 74 + i * 80);
    // Event description
    doc.fillColor('#222222').fontSize(6).font('Courier').text(t.event, 110, 86 + i * 80, { width: 440, lineBreak: true });
    // Connector line
    if (i < timeline.length - 1) {
      doc.save().strokeColor('#cccccc').lineWidth(0.5).dash(2, { space: 2 })
        .moveTo(72, 84 + i * 80 + 12).lineTo(72, 72 + (i + 1) * 80).stroke().restore();
    }
  });

  // ── Page 4: Technical Analysis / MITRE ATT&CK ──
  doc.addPage();
  addWatermark(doc, 'TLP:AMBER');
  doc.fillColor('#cc0000').fontSize(12).font('Helvetica-Bold').text('§3. ANALYSE TECHNIQUE — MITRE ATT&CK MAPPING', 40, 40);
  doc.moveTo(40, 56).lineTo(420, 56).strokeColor('#cc0000').lineWidth(1).stroke();

  // MITRE table — dense and ugly
  const mitreHeaders = ['Tactic', 'Technique ID', 'Technique', 'Procedure (observée)', 'Détection'];
  const mitreRows = [
    ['Initial Access', 'T1133', 'External Remote Services', 'RDP brute-force via TOR (port 3389/tcp)', 'Alerte SIEM rule#4421'],
    ['Execution', 'T1059.001', 'PowerShell', 'Encoded PS commands (base64) for payload staging', 'EDR — process tree'],
    ['Persistence', 'T1053.005', 'Scheduled Task', 'Tâche planifiée "WindowsUpdate_Svc" — every 4h', 'Sysmon EventID 1'],
    ['Priv. Escalation', 'T1003.001', 'LSASS Memory', 'Mimikatz variant (custom packer, SHA256: a4f8...)', 'CrowdStrike detect'],
    ['Lateral Movement', 'T1021.002', 'SMB/Windows Admin', 'PsExec + pass-the-hash (NTLM svc_backup)', 'NDR Vectra score 87'],
    ['Exfiltration', 'T1048.003', 'Exfil Over DNS', 'iodine tunnel → healthcloud[.]xyz (47 Go)', 'NDR + DNS analytics'],
    ['Impact', 'T1486', 'Data Encrypted', 'LockBit 3.0 — 340/812 VMs chiffrées (41,9%)', 'Volume encryption alert'],
  ];
  const cw4 = [70, 55, 80, 160, 85];
  let ty2 = drawMessyTable(doc, mitreHeaders, mitreRows, 40, 70, cw4, { cellH: 30, fontSize: 5.5, headerColor: '#440000' });

  // IOC block
  doc.save();
  doc.roundedRect(40, ty2 + 15, 515, 130, 3).fillAndStroke('#111111', '#333333');
  doc.fillColor('#00ff41').fontSize(7).font('Courier-Bold').text('INDICATEURS DE COMPROMISSION (IOCs) — EXTRAIT', 50, ty2 + 23, { width: 495 });
  doc.fillColor('#00cc33').fontSize(5.5).font('Courier');
  const iocs = [
    '# IP Addresses (C2 infrastructure)',
    '185.220.101.34    | TOR exit node        | First seen: 2024-08-12T02:17Z | Confidence: HIGH',
    '91.215.85.142     | Bulletproof hosting   | C2 callback (DNS)             | Confidence: HIGH',
    '45.153.160.12     | VPS (NL)              | Secondary C2 (HTTPS)          | Confidence: MEDIUM',
    '',
    '# Domains',
    'data-sync.healthcloud[.]xyz     | C2 domain (DNS tunnel)        | Registered: 2024-07-28',
    'update-service.msftcloud[.]top  | Payload staging               | Registered: 2024-08-01',
    '',
    '# File Hashes (SHA-256)',
    'a4f8e2c1d7b3f9...48e2b7d903ef  | Mimikatz variant (packed)      | VT: 23/72',
    'c91b0ef23a7d84...f12e8c4a0b67  | LockBit 3.0 payload            | VT: 54/72',
    '7e2f1a8b3c4d56...9a0e1b2c3d4f  | iodine DNS tunnel client       | VT: 12/72',
    '',
    '# YARA Rule: rule LockBit3_Custom_Packer { meta: author="SOC-TI" ... strings: $mz="MZ" $s1={4C 6F 63 6B} ... }',
  ];
  iocs.forEach((line, i) => {
    doc.text(line, 50, ty2 + 36 + i * 8, { width: 495 });
  });
  doc.restore();

  // ── Page 5: Thales DIS NIS2 Context ──
  doc.addPage();
  addWatermark(doc, 'TLP:AMBER');
  doc.fillColor('#0d1b3e').fontSize(12).font('Helvetica-Bold').text('§4. CONTEXTE RÉGLEMENTAIRE — NIS2 & ACTEURS', 40, 40);
  doc.moveTo(40, 56).lineTo(380, 56).strokeColor('#0044cc').lineWidth(1.5).stroke();

  doc.fillColor('#333333').fontSize(7.5).font('Helvetica').text(
    'La directive NIS2 (Network and Information Security Directive 2, EU 2022/2555) impose des obligations renforcées de cybersécurité aux entités "essentielles" et "importantes" dans l\'UE. Date limite de transposition en droit national: 17 octobre 2024. En France, l\'ANSSI est désignée autorité compétente.\n\n' +
    'THALES DIS (Digital Identity & Security)\n' +
    '─────────────────────────────────────────\n' +
    'Division du groupe Thales spécialisée dans l\'identité numérique et la cybersécurité. Thales DIS est à la fois:\n' +
    '  (a) Soumise à NIS2 en tant qu\'entité essentielle (secteur "Digital Infrastructure")\n' +
    '  (b) Fournisseur de solutions de conformité NIS2 pour ses clients\n\n' +
    'Offre NIS2-pertinente de Thales DIS:\n' +
    '  • CipherTrust Data Security Platform — chiffrement, tokenisation, key management (FIPS 140-3)\n' +
    '  • SafeNet Trusted Access — IAM/MFA (zero-trust architecture)\n' +
    '  • Vormetric Transparent Encryption — chiffrement transparent fichiers/volumes\n' +
    '  • HSM (Hardware Security Modules) — Luna Network HSM 7 (CC EAL4+)\n' +
    '  • Consulting: audit de maturité NIS2, gap analysis, roadmap de conformité\n\n' +
    'Thales DIS est positionnée comme concurrente directe d\'Atos/Eviden (BDS division), de Airbus CyberSecurity, et partiellement d\'Orange Cyberdefense sur le segment "managed security + compliance".\n\n' +
    'ORANGE CYBERDEFENSE (OCD)\n' +
    '─────────────────────────────────────────\n' +
    'Filiale cybersécurité du groupe Orange. ~3 000 collaborateurs, répartis sur 13 SOCs mondiaux (dont 4 en France: Paris-La Défense, Lyon, Rennes, Nantes). CA estimé 2023: ~1,1Md€.\n\n' +
    'Positionnement: MSSP (Managed Security Service Provider) leader en Europe. Services: SOC-as-a-Service, CERT/CSIRT, pentesting, red teaming, threat intelligence, conseil en conformité (NIS2, DORA, IEC 62443).\n\n' +
    'Dans le cas de l\'incident GHSM, OCD est intervenu en tant que prestataire CERT externe (contrat-cadre UGAP lot 4 "Réponse à incident"). L\'intervention a mobilisé 6 analystes pendant 12 jours (coût: ~180k€ HT).\n\n' +
    'Benchmark concurrentiel OCD vs Thales DIS:\n' +
    '  — OCD: plus fort sur le SOC managé et la réponse à incident (volume + maturité opérationnelle)\n' +
    '  — Thales DIS: plus fort sur les produits de chiffrement et l\'identité numérique (HSM, PKI)\n' +
    '  — Chevauchement: consulting NIS2, audit de maturité, zero-trust advisory\n' +
    '  — Le marché français du MSSP est estimé à ~2,8Md€ en 2024 (croissance +14% YoY)',
    40, 70, { width: 515, lineBreak: true, lineGap: 2 }
  );

  // ── Page 6: Recommendations ──
  doc.addPage();
  addWatermark(doc, 'TLP:AMBER');
  doc.fillColor('#cc0000').fontSize(12).font('Helvetica-Bold').text('§5. RECOMMANDATIONS & PLAN DE REMÉDIATION', 40, 40);
  doc.moveTo(40, 56).lineTo(380, 56).strokeColor('#cc0000').lineWidth(1.5).stroke();

  // Numbered recommendations in a deliberately confusing layout
  doc.fillColor('#333333').fontSize(7).font('Helvetica');
  const recs = [
    { id: 'REC-001', prio: 'CRITIQUE', title: 'Reconstruction complète du SI GHSM', desc: 'Le SI du GHSM doit être considéré comme intégralement compromis. Recommandation: reconstruction from scratch selon architecture zero-trust. Budget estimé: 3,2M€ sur 18 mois. Prestataires short-listés: Orange Cyberdefense (CERT + rebuild), Capgemini (infrastructure), Thales DIS (HSM/PKI pour identités).', deadline: '2024-12-31' },
    { id: 'REC-002', prio: 'HAUTE', title: 'Déploiement EDR/XDR unifié (toutes entités)', desc: 'Remplacement de la mosaïque EDR actuelle par une plateforme XDR unifiée. Évaluation en cours: CrowdStrike Falcon Complete vs Palo Alto Cortex XDR Pro vs SentinelOne Singularity Complete. Critères: intégration SIEM Splunk, couverture OT (IEC 62443), capacité SOAR native.', deadline: '2025-03-31' },
    { id: 'REC-003', prio: 'HAUTE', title: 'Conformité NIS2 — audit gap analysis', desc: 'Mandater un audit NIS2 complet pour les 3 entités avant le 17/10/2024. L\'audit doit couvrir: gouvernance (Art. 20-21), notification d\'incidents (Art. 23), supply chain security (Art. 22), et les mesures techniques minimales (Annexe II). Prestataires qualifiés ANSSI (PASSI): Wavestone, Deloitte Cyber, Orange Cyberdefense.', deadline: '2024-10-17' },
    { id: 'REC-004', prio: 'MOYENNE', title: 'Exercice de crise cyber (tabletop + red team)', desc: 'Organiser un exercice de crise cyber tri-annuel impliquant COMEX + équipes opérationnelles. Scénario recommandé: attaque supply-chain via fournisseur Tier-2 compromis. Inclure simulation de communication de crise (RGPD/CNIL + médias + patients). Budget: ~120k€/exercice.', deadline: '2025-06-30' },
    { id: 'REC-005', prio: 'MOYENNE', title: 'Segmentation réseau OT/IT — IEC 62443', desc: 'Implémenter une segmentation stricte OT/IT conforme IEC 62443 (zones & conduits) pour les environnements hospitaliers (équipements biomédicaux connectés). Déployer Claroty xDome ou Nozomi Guardian pour la visibilité OT. Priorité: dispositifs médicaux classe IIb/III.', deadline: '2025-09-30' },
  ];
  let ry = 68;
  recs.forEach((rec) => {
    const prioColor = rec.prio === 'CRITIQUE' ? '#cc0000' : rec.prio === 'HAUTE' ? '#cc6600' : '#0066cc';
    doc.save();
    doc.roundedRect(42, ry, 50, 14, 2).fill(prioColor);
    doc.fillColor('#ffffff').fontSize(5.5).font('Helvetica-Bold').text(rec.prio, 44, ry + 3, { width: 46, align: 'center' });
    doc.restore();
    doc.fillColor('#111111').fontSize(7.5).font('Helvetica-Bold').text(`${rec.id}: ${rec.title}`, 100, ry + 2, { width: 440 });
    doc.fillColor('#666666').fontSize(6).font('Helvetica').text(`Échéance: ${rec.deadline}`, 100, ry + 14, { width: 440 });
    doc.fillColor('#333333').fontSize(6.5).font('Helvetica').text(rec.desc, 100, ry + 24, { width: 440, lineBreak: true });
    const descH = doc.heightOfString(rec.desc, { width: 440 });
    ry += 28 + descH + 15;
    doc.save().strokeColor('#eeeeee').lineWidth(0.3).moveTo(42, ry - 8).lineTo(555, ry - 8).stroke().restore();
  });

  // Appendix reference
  doc.save();
  doc.roundedRect(40, ry + 5, 515, 45, 3).fillAndStroke('#f8f8f8', '#cccccc');
  doc.fillColor('#666666').fontSize(6.5).font('Helvetica-Oblique').text(
    'ANNEXES (non incluses dans cette version — disponibles sur demande auprès du SOC):\n' +
    'Annexe A: Liste complète des IOCs (487 indicateurs) — format STIX 2.1 / OpenIOC\n' +
    'Annexe B: Logs SIEM bruts — période 2024-08-10 à 2024-08-20 (2,3 Go compressé)\n' +
    'Annexe C: Rapport forensique complet — Orange Cyberdefense CERT (147 pages)\n' +
    'Annexe D: Communications de crise — emails, communiqués presse, notifications CNIL/ANSSI',
    50, ry + 12, { width: 495, lineBreak: true }
  );
  doc.restore();

  footnoteBlock(doc, [
    'Ce document est soumis au protocole TLP:AMBER+STRICT. Toute diffusion non autorisée constitue une violation du RGPD et de la politique de sécurité de l\'information.',
    'Réf: CSIRT-2024-Q3-COMPILATION-007 | Classification: C3-SECRET ENTREPRISE | Émetteur: SOC Central | Date: 2024-09-18',
  ], 40, ry + 60, 515);

  doc.end();
  return new Promise(r => stream.on('finish', r));
}

// ═══════════════════════════════════════════════════════════════════════════════
// PDF 3: Regions France Innovation
// ═══════════════════════════════════════════════════════════════════════════════
function genPDF3() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 45, right: 45 }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(OUT, '15_regions_france_innovation.pdf'));
  doc.pipe(stream);

  // ── Cover ──
  doc.rect(0, 0, 595, 842).fill('#003366');
  // Decorative geometric shapes
  doc.save().fillColor('#004488').opacity(0.3);
  doc.circle(450, 200, 150).fill();
  doc.circle(150, 600, 120).fill();
  doc.rect(0, 380, 595, 3).fill('#ffffff');
  doc.restore();
  doc.opacity(1);

  doc.fillColor('#ffffff').fontSize(26).font('Helvetica-Bold')
    .text('PANORAMA DE L\'INNOVATION', 50, 180, { width: 495, align: 'center' });
  doc.fontSize(20).font('Helvetica')
    .text('RÉGIONS FRANÇAISES — FILIÈRES STRATÉGIQUES', 50, 220, { width: 495, align: 'center' });
  doc.fontSize(11).fillColor('#88bbee')
    .text('Aéronautique • Défense • Énergie • Semiconducteurs • Ferroviaire', 50, 265, { width: 495, align: 'center' });
  doc.fontSize(8).fillColor('#6699cc')
    .text('Édition 2024 — Observatoire Régional de l\'Innovation Industrielle (ORII)', 50, 310, { width: 495, align: 'center' });
  doc.text('Réf: ORII-2024-REG-015 | Version 2.1 | Diffusion: Publique (avec restrictions)', 50, 325, { width: 495, align: 'center' });

  // Map placeholder on cover
  doc.save();
  doc.roundedRect(150, 420, 295, 200, 5).fillAndStroke('#001a33', '#4488aa');
  doc.fillColor('#4488aa').fontSize(10).font('Helvetica-Bold')
    .text('[CARTE: Implantations industrielles majeures]', 160, 430, { width: 275, align: 'center' });
  doc.fillColor('#336699').fontSize(7).font('Helvetica')
    .text('[Données cartographiques IGN — Fond OpenStreetMap]', 160, 445, { width: 275, align: 'center' });
  // Fake map legend dots
  const legendItems = [
    { color: '#ff4444', label: 'Aéronautique/Spatial (23 sites)' },
    { color: '#44ff44', label: 'Défense/Sécurité (15 sites)' },
    { color: '#4444ff', label: 'Semiconducteurs (8 sites)' },
    { color: '#ffaa00', label: 'Énergie/Rail (12 sites)' },
  ];
  legendItems.forEach((item, i) => {
    doc.circle(175, 560 + i * 15, 4).fill(item.color);
    doc.fillColor('#aaccdd').fontSize(6.5).font('Helvetica').text(item.label, 185, 556 + i * 15);
  });
  doc.restore();

  // ── Page 2: Occitanie / Toulouse ── (LANDSCAPE)
  doc.addPage({ size: [842, 595], margins: { top: 35, bottom: 35, left: 40, right: 40 } });
  addWatermark(doc, 'ORII 2024');

  doc.fillColor('#003366').fontSize(14).font('Helvetica-Bold').text('RÉGION OCCITANIE — CLUSTER AÉRONAUTIQUE TOULOUSE', 40, 35);
  doc.moveTo(40, 54).lineTo(500, 54).strokeColor('#ff6600').lineWidth(2).stroke();

  // Map description box
  doc.save();
  doc.roundedRect(550, 35, 260, 160, 4).fillAndStroke('#f0f5fa', '#aabbcc');
  doc.fillColor('#003366').fontSize(8).font('Helvetica-Bold').text('[CARTE: Implantations', 560, 43, { width: 240, align: 'center' });
  doc.text('industrielles — Occitanie]', 560, 53, { width: 240, align: 'center' });
  doc.fillColor('#666666').fontSize(6).font('Helvetica');
  doc.text('● Toulouse — Airbus HQ, ATR, Collins', 565, 75);
  doc.text('● Blagnac — Airbus A320/A350 FAL', 565, 87);
  doc.text('● Colomiers — Airbus Defence & Space', 565, 99);
  doc.text('● Figeac — Figeac Aéro (usinages)', 565, 111);
  doc.text('● Tarbes — Daher, Safran Turbomeca', 565, 123);
  doc.text('● Toulouse-Labège — Liebherr Aerospace', 565, 135);
  doc.text('Nb. établissements aéro: 1 200+', 565, 155, { width: 240 });
  doc.text('Emplois directs filière: ~97 000', 565, 167, { width: 240 });
  doc.restore();

  // Company profiles — multi-column dense
  doc.fillColor('#333333').fontSize(7).font('Helvetica');

  // Left column — Airbus
  doc.save();
  doc.roundedRect(40, 70, 245, 230, 3).stroke('#dddddd');
  doc.fillColor('#003366').fontSize(8).font('Helvetica-Bold').text('AIRBUS SE — Toulouse', 50, 78, { width: 225 });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'Siège mondial: Toulouse-Blagnac (ex: Leiden, NL pour raisons juridiques)\n' +
    'Effectifs monde: ~150 000 | Effectifs Occitanie: ~30 000\n' +
    'CA 2023: 65,4 Md€ (+11% YoY) | Carnet de commandes: 8 598 avions\n\n' +
    'Sites majeurs Toulouse:\n' +
    '  • Jean-Luc Lagardère (A380/A350 FAL)\n' +
    '  • Saint-Martin-du-Touch (Engineering Centre)\n' +
    '  • Colomiers (A330neo/MRTT)\n' +
    '  • Airbus Defence & Space (satellites, Pléiades Neo)\n\n' +
    'Focus innovation 2024:\n' +
    '  ▸ ZEROe (avion hydrogène, horizon 2035)\n' +
    '  ▸ Wing of Tomorrow (composite next-gen)\n' +
    '  ▸ Skywise (plateforme data/analytics)\n' +
    '  ▸ CityAirbus NextGen (eVTOL — UAM)\n' +
    '  ▸ FCAS/SCAF (système de combat aérien futur, avec Dassault)\n\n' +
    'R&D 2023: ~3,4Md€ (5,2% du CA)',
    50, 92, { width: 225, lineBreak: true, lineGap: 1.5 }
  );
  doc.restore();

  // Middle column — ATR + Liebherr
  doc.save();
  doc.roundedRect(295, 70, 245, 230, 3).stroke('#dddddd');
  doc.fillColor('#003366').fontSize(8).font('Helvetica-Bold').text('ATR (Avions de Transport Régional)', 305, 78, { width: 225 });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'JV Airbus (50%) / Leonardo (50%) — Siège: Toulouse-Blagnac\n' +
    'Effectifs: ~1 400 | CA 2023: ~1,8Md€\n' +
    'Produit: ATR 42-600 / ATR 72-600 (turbopropulseurs)\n' +
    'Innovation: ATR EVO (2H2024), version à consommation -20%\n' +
    'Pipeline: étude ATR hydrogène régional (horizon 2030+)\n' +
    '──────────────────────────────────────\n',
    305, 92, { width: 225, lineBreak: true, lineGap: 1.5 }
  );
  doc.fillColor('#003366').fontSize(8).font('Helvetica-Bold').text('LIEBHERR AEROSPACE — Toulouse', 305, 172, { width: 225 });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'Filiale du groupe Liebherr (CH) — Site: Toulouse-Labège\n' +
    'Effectifs site: ~1 500 | Spécialité: systèmes d\'air\n' +
    'Activités: conditionnement d\'air (ECS), systèmes de\n' +
    'pressurisation, gestion thermique pour aéronefs civils\n' +
    'et militaires. Client principal: Airbus (A320/A350/A400M)\n' +
    'Innovation: systèmes électriques pour More Electric Aircraft\n' +
    '──────────────────────────────────────\n',
    305, 186, { width: 225, lineBreak: true, lineGap: 1.5 }
  );
  doc.fillColor('#003366').fontSize(7.5).font('Helvetica-Bold').text('COLLINS AEROSPACE (RTX)', 305, 258, { width: 225 });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'Toulouse & Figeac — ~2 500 employés en Occitanie\n' +
    'Systèmes avioniques, trains d\'atterrissage, nacelles',
    305, 270, { width: 225, lineBreak: true, lineGap: 1.5 }
  );
  doc.restore();

  // Stats boxes at bottom of landscape page
  doc.save();
  const statsY = 320;
  const statsBoxes = [
    { title: 'PIB Occitanie', value: '189 Md€', sub: '(2023, 5e région FR)' },
    { title: 'Emplois aéro', value: '97 000', sub: 'directs (+142k indirects)' },
    { title: 'Brevets/an', value: '3 200+', sub: '(INPI 2023, aéro+spatial)' },
    { title: 'Startups deep-tech', value: '480+', sub: '(incl. Aerospace Valley)' },
    { title: 'Export aéro', value: '42 Md€', sub: '(58% du total régional)' },
  ];
  statsBoxes.forEach((s, i) => {
    const bx = 40 + i * 155;
    doc.roundedRect(bx, statsY, 145, 55, 3).fillAndStroke('#f0f5fa', '#99aacc');
    doc.fillColor('#003366').fontSize(7).font('Helvetica-Bold').text(s.title, bx + 10, statsY + 8, { width: 125, align: 'center' });
    doc.fillColor('#cc3300').fontSize(14).font('Helvetica-Bold').text(s.value, bx + 10, statsY + 20, { width: 125, align: 'center' });
    doc.fillColor('#666666').fontSize(6).font('Helvetica').text(s.sub, bx + 10, statsY + 38, { width: 125, align: 'center' });
  });
  doc.restore();

  // Cluster ecosystem description
  doc.fillColor('#333333').fontSize(7).font('Helvetica').text(
    'L\'écosystème aéronautique toulousain est structuré autour du pôle de compétitivité Aerospace Valley (1er cluster aéro-spatial européen, 850+ membres). Le campus ISAE-SUPAERO, l\'ENAC, et le CNES (Centre Spatial) forment le socle académique. L\'IRT Saint Exupéry fédère 75 partenaires industriels et académiques sur les matériaux composites, l\'IA embarquée et la certification aéronautique. Le programme Corac (Conseil pour la Recherche Aéronautique Civile) finance les démonstrateurs technologiques du plan France 2030 (volet décarbonation aviation).',
    40, 395, { width: 760, lineBreak: true, lineGap: 2 }
  );

  footnoteBlock(doc, [
    'Sources: CCI Occitanie, Aerospace Valley (rapport annuel 2023), GIFAS, INSEE Occitanie, rapports annuels des sociétés citées.',
    'Réf: ORII-2024-REG-015 — Section Occitanie | [CARTE] = données cartographiques non incluses dans cette version numérique.',
  ], 40, 455, 760);

  // ── Page 3: Nouvelle-Aquitaine (back to portrait) ──
  doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 45, right: 45 } });
  addWatermark(doc, 'ORII 2024');

  doc.fillColor('#003366').fontSize(14).font('Helvetica-Bold').text('RÉGION NOUVELLE-AQUITAINE — DÉFENSE & HAUTES TECHNOLOGIES', 45, 45);
  doc.moveTo(45, 64).lineTo(500, 64).strokeColor('#336633').lineWidth(2).stroke();

  // Map placeholder
  doc.save();
  doc.roundedRect(350, 75, 200, 130, 4).fillAndStroke('#f0f5f0', '#669966');
  doc.fillColor('#336633').fontSize(8).font('Helvetica-Bold').text('[CARTE: Implantations', 360, 83, { width: 180, align: 'center' });
  doc.text('Nouvelle-Aquitaine]', 360, 93, { width: 180, align: 'center' });
  doc.fillColor('#666666').fontSize(6).font('Helvetica');
  doc.text('● Bordeaux/Mérignac — Dassault, Thales', 360, 112);
  doc.text('● Le Haillan — MBDA France', 360, 124);
  doc.text('● Le Barp — CEA CESTA (Laser Mégajoule)', 360, 136);
  doc.text('● Poitiers — Thales Avionics', 360, 148);
  doc.text('● Brive — Thales DMS', 360, 160);
  doc.text('Emplois défense région: ~35 000', 360, 178);
  doc.restore();

  // MBDA profile
  doc.fillColor('#333333').fontSize(7.5).font('Helvetica');
  doc.fillColor('#003366').fontSize(9).font('Helvetica-Bold').text('MBDA — Missiles & Systèmes de Défense', 45, 80);
  doc.fillColor('#333333').fontSize(7).font('Helvetica').text(
    'JV Airbus (37,5%) / BAE Systems (37,5%) / Leonardo (25%) — Siège: Le Plessis-Robinson (92)\n' +
    'Site majeur Nouvelle-Aquitaine: Le Haillan (33) — Centre de conception missiles tactiques\n' +
    'Effectifs France: ~6 000 | Effectifs monde: ~14 500\n' +
    'CA 2023: 4,5 Md€ (+18% YoY — effet réarmement européen post-Ukraine)\n\n' +
    'Programmes clés:\n' +
    '  • Aster 30 Block 2 (missile surface-air longue portée, programme SAMP/T NG)\n' +
    '  • Missile Moyenne Portée (MMP) — en service armée de Terre depuis 2018\n' +
    '  • METEOR (missile air-air BVR, intégré Rafale/Typhoon/Gripen)\n' +
    '  • SCALP/Storm Shadow (missile de croisière — usage confirmé Ukraine 2023-24)\n' +
    '  • CAMM-ER / Sea Ceptor (défense navale, export UK/IT)\n' +
    '  • TWISTER (program EU — intercepteur hypersonique, phase concept)\n\n' +
    'Le site du Haillan concentre les activités de R&D en guidage, navigation et contrôle (GNC), ainsi que les bancs d\'essai hardware-in-the-loop (HIL) pour la simulation de trajectoires.',
    45, 94, { width: 295, lineBreak: true, lineGap: 2 }
  );

  // CEA CESTA
  doc.fillColor('#003366').fontSize(9).font('Helvetica-Bold').text('CEA CESTA — Le Barp (33)', 45, 295);
  doc.fillColor('#333333').fontSize(7).font('Helvetica').text(
    'Centre d\'Études Scientifiques et Techniques d\'Aquitaine — Commissariat à l\'Énergie Atomique\n' +
    'Effectifs: ~1 500 (chercheurs, ingénieurs, techniciens) — Classification: site "Secret Défense"\n\n' +
    'Activités principales:\n' +
    '  • Simulation de la dissuasion nucléaire (programme Simulation, post-essais nucléaires 1996)\n' +
    '  • Laser Mégajoule (LMJ) — laser de puissance (176 faisceaux, 1,3 MJ) pour fusion par confinement inertiel\n' +
    '  • PETAL (PETawatt Aquitaine Laser) — laser PW couplé au LMJ\n' +
    '  • Expertise en détonique, matériaux sous pressions extrêmes, physique des plasmas\n' +
    '  • Collaboration NNSA (US) / AWE (UK) dans le cadre des accords de Stockpile Stewardship\n\n' +
    'Le CEA CESTA est un acteur central du programme de simulation de la dissuasion, garantissant la fiabilité des armes nucléaires françaises sans essais réels. Le supercalculateur TERA-1000-2 (Atos/Bull) supporte ces simulations.',
    45, 310, { width: 505, lineBreak: true, lineGap: 2 }
  );

  // Thales Avionics
  doc.fillColor('#003366').fontSize(9).font('Helvetica-Bold').text('THALES AVIONICS — Nouvelle-Aquitaine', 45, 465);
  doc.fillColor('#333333').fontSize(7).font('Helvetica').text(
    'Présence régionale: Bordeaux-Mérignac (avionique cockpit), Poitiers (systèmes de mission), Brive (maintenance)\n' +
    'Effectifs région: ~3 200 | Effectifs Groupe Thales monde: ~81 000\n\n' +
    'Spécialités NA:\n' +
    '  • Avionique de cockpit (Head-Up Display, systèmes de visualisation TopOwl pour NH90/Tigre)\n' +
    '  • Systèmes de mission pour Rafale (SPECTRA — guerre électronique, OSF — optronique secteur frontal)\n' +
    '  • Systèmes de navigation inertielle (INS) et centrales à composants liés\n' +
    '  • Intégration des systèmes de combat aérien (FCAS/SCAF — contribution au "combat cloud")\n\n' +
    'Thales est un acteur transversal présent dans les 3 régions couvertes par ce rapport (Occitanie, NA, AURA). Le groupe investit ~4Md€/an en R&D autofinancée (soit ~20% du CA), dont une part significative sur les sites de Nouvelle-Aquitaine.',
    45, 480, { width: 505, lineBreak: true, lineGap: 2 }
  );

  footnoteBlock(doc, [
    'Sources: rapports annuels MBDA/Thales 2023, CEA (rapport public d\'activité), DGA, CCI Nouvelle-Aquitaine.',
    'Note: les données relatives au CEA CESTA sont limitées aux informations publiquement disponibles (classification Défense).',
    '[CARTE: Implantations industrielles] — données IGN/OSM — la cartographie détaillée est disponible dans la version imprimée uniquement.',
  ], 45, 670, 505);

  // ── Page 4: Auvergne-Rhône-Alpes (LANDSCAPE again) ──
  doc.addPage({ size: [842, 595], margins: { top: 35, bottom: 35, left: 40, right: 40 } });
  addWatermark(doc, 'ORII 2024');

  doc.fillColor('#003366').fontSize(14).font('Helvetica-Bold').text('RÉGION AUVERGNE-RHÔNE-ALPES — ÉNERGIE, SEMICONDUCTEURS & FERROVIAIRE', 40, 35);
  doc.moveTo(40, 54).lineTo(600, 54).strokeColor('#cc6600').lineWidth(2).stroke();

  // Three-column layout for 3 companies

  // STMicroelectronics
  doc.save();
  doc.roundedRect(40, 65, 245, 270, 3).fillAndStroke('#fafafa', '#3333cc');
  doc.fillColor('#003366').fontSize(8.5).font('Helvetica-Bold').text('STMICROELECTRONICS', 50, 73, { width: 225, align: 'center' });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'Siège: Genève (CH) / Plan-les-Ouates\n' +
    'Sites AURA: Grenoble (Crolles — fab 300mm),\n' +
    'Grenoble (Polygone — R&D), Tours (200mm)\n' +
    'Effectifs monde: ~50 000 | France: ~12 000\n' +
    'CA 2023: 17,3 Md$ (+8% mais -7% au S2)\n' +
    '─────────────────────────────────────\n' +
    'Crolles 300mm: fab la plus avancée d\'Europe\n' +
    'pour semi analogiques/mixed-signal (28nm FD-SOI).\n' +
    'Extension Crolles 2 en cours (EU Chips Act,\n' +
    'subvention 2,9Md€ France + Italie combinés).\n' +
    'Partenariat GlobalFoundries sur site.\n\n' +
    'Produits stratégiques:\n' +
    '▸ SiC (carbure de silicium) — Catane (IT)\n' +
    '  + future fab 200mm SiC à Agrate/Catane\n' +
    '▸ STM32 (MCU #1 mondial en revenus)\n' +
    '▸ MEMS & capteurs (accéléromètres, gyros)\n' +
    '▸ Power semiconductors (auto: BEV/ADAS)\n' +
    '▸ Photonique sur silicium (datacom)\n\n' +
    'R&D 2023: 2,1Md$ (~12% du CA)\n' +
    'Brevets actifs: ~19 000 dans 9 600 familles',
    50, 87, { width: 225, lineBreak: true, lineGap: 1.5 }
  );
  doc.restore();

  // Schneider Electric
  doc.save();
  doc.roundedRect(298, 65, 245, 270, 3).fillAndStroke('#fafafa', '#33cc33');
  doc.fillColor('#003366').fontSize(8.5).font('Helvetica-Bold').text('SCHNEIDER ELECTRIC', 308, 73, { width: 225, align: 'center' });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'Siège: Rueil-Malmaison (92) — Racines AURA\n' +
    'Sites AURA: Grenoble (HQ historique, R&D),\n' +
    'Eybens, Le Vaudreuil, Carros, Angoulême\n' +
    'Effectifs monde: ~150 000 | France: ~14 000\n' +
    'CA 2023: 35,9 Md€ (+13% organique)\n' +
    '─────────────────────────────────────\n' +
    'Leader mondial de la gestion de l\'énergie\n' +
    'et de l\'automatisation industrielle.\n\n' +
    'Divisions:\n' +
    '▸ Energy Management (basse/moyenne tension,\n' +
    '  distribution électrique, smart grid)\n' +
    '▸ Industrial Automation (automates, SCADA,\n' +
    '  IoT industriel — plateforme EcoStruxure)\n\n' +
    'Innovation AURA:\n' +
    '▸ Grenoble = "Innovation Hub" mondial\n' +
    '  (600+ ingénieurs R&D)\n' +
    '▸ Usine du Vaudreuil = "Lighthouse Factory"\n' +
    '  (World Economic Forum — Industrie 4.0)\n' +
    '▸ Investissement massif dans le jumeau\n' +
    '  numérique (digital twin) et l\'IA\n' +
    '  opérationnelle (maintenance prédictive)\n\n' +
    'R&D 2023: ~1,8Md€ (5% du CA)\n' +
    'Score ESG: #1 mondial (S&P Global 2024)',
    308, 87, { width: 225, lineBreak: true, lineGap: 1.5 }
  );
  doc.restore();

  // Alstom
  doc.save();
  doc.roundedRect(556, 65, 252, 270, 3).fillAndStroke('#fafafa', '#cc6633');
  doc.fillColor('#003366').fontSize(8.5).font('Helvetica-Bold').text('ALSTOM — FERROVIAIRE', 566, 73, { width: 232, align: 'center' });
  doc.fillColor('#333333').fontSize(6.5).font('Helvetica');
  doc.text(
    'Siège: Saint-Ouen-sur-Seine (93)\n' +
    'Sites AURA: Villeurbanne (Lyon), Le Creusot,\n' +
    'Aix-en-Provence, Ornans, Belfort (Bourgogne-FC)\n' +
    'Effectifs monde: ~80 000 | France: ~12 500\n' +
    'CA 2023/24: 17,6 Md€ (+9,5%)\n' +
    '─────────────────────────────────────\n' +
    'N°2 mondial du ferroviaire (post-acquisition\n' +
    'Bombardier Transport 2021).\n\n' +
    'Sites AURA/adjacents:\n' +
    '▸ Villeurbanne: systèmes de signalisation\n' +
    '  (ERTMS/ETCS, CBTC) — ~800 ingénieurs\n' +
    '▸ Le Creusot: bogies (TGV, Coradia)\n' +
    '▸ Ornans: moteurs de traction électriques\n' +
    '▸ Belfort: intégration locomotives/trains\n\n' +
    'Innovation ferroviaire:\n' +
    '▸ Coradia iLint — train régional hydrogène\n' +
    '  (pile à combustible, autonomie 1 000km)\n' +
    '  Premiers déploiements: Basse-Saxe (DE)\n' +
    '  Commandes FR: Région AURA (12 rames)\n' +
    '▸ ATO (Automatic Train Operation) GoA2-4\n' +
    '▸ Mastria (signalisation digitale next-gen)\n\n' +
    'R&D 2023: ~700M€ (~4% du CA)\n' +
    'Carnet de commandes: 91Md€ (record)',
    566, 87, { width: 232, lineBreak: true, lineGap: 1.5 }
  );
  doc.restore();

  // Regional stats table across bottom
  const regHeaders = ['Indicateur', 'Occitanie', 'Nlle-Aquitaine', 'Auvergne-R-A', 'France métro.', 'Part AURA/FR'];
  const regRows = [
    ['PIB (Md€, 2023)', '189', '179', '283', '2 640', '10,7%'],
    ['Emplois industriels', '245 000', '218 000', '420 000', '3 150 000', '13,3%'],
    ['Brevets INPI (2023)', '3 200', '1 800', '5 100', '42 000', '12,1%'],
    ['Dépense R&D (Md€)', '5,2', '3,8', '8,4', '57', '14,7%'],
    ['Startups deep-tech', '480', '320', '710', '5 200', '13,7%'],
    ['Pôles de compétitivité', '6', '7', '9', '54', '—'],
    ['Investissements étrangers (nb projets)', '142', '118', '198', '1 815', '10,9%'],
  ];
  const cw5 = [120, 85, 85, 90, 85, 70];
  ty = drawMessyTable(doc, regHeaders, regRows, 40, 360, cw5, { cellH: 18, fontSize: 6, headerColor: '#003366' });

  footnoteBlock(doc, [
    'Sources: INSEE comptes régionaux 2023, INPI (statistiques brevets), MESRI (DIRD), Business France (bilan 2023 des investissements étrangers).',
    'Les données "Emplois industriels" incluent l\'intérim industriel (source: Dares/Pôle Emploi). Les startups deep-tech sont comptabilisées selon la définition BPI France.',
    'Note: AURA = Auvergne-Rhône-Alpes. Part AURA/FR calculée sur données disponibles — peut varier selon périmètre statistique.',
    'Réf: ORII-2024-REG-015 v2.1 — Données arrêtées au 30/06/2024. Prochaine mise à jour prévue: janvier 2025.',
  ], 40, ty + 8, 760);

  // ── Page 5: Cross-regional synthesis (portrait) ──
  doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 45, right: 45 } });
  addWatermark(doc, 'ORII 2024');

  doc.fillColor('#003366').fontSize(13).font('Helvetica-Bold').text('SYNTHÈSE INTER-RÉGIONALE & PERSPECTIVES', 45, 45);
  doc.moveTo(45, 62).lineTo(400, 62).strokeColor('#003366').lineWidth(1.5).stroke();

  doc.fillColor('#333333').fontSize(7.5).font('Helvetica').text(
    'Les trois régions analysées — Occitanie, Nouvelle-Aquitaine et Auvergne-Rhône-Alpes — représentent le cœur industriel de la France dans les filières stratégiques de souveraineté. Ensemble, elles concentrent:\n\n' +
    '  ● 38% de la dépense nationale de R&D industrielle\n' +
    '  ● 28% des emplois industriels qualifiés (ingénieurs & cadres techniques)\n' +
    '  ● 45% des brevets déposés dans les secteurs aéro/défense/énergie\n' +
    '  ● Les 4 plus grands donneurs d\'ordre industriels français (Airbus, Thales, Schneider Electric, Alstom)\n\n' +
    'DYNAMIQUES TRANSVERSALES IDENTIFIÉES:\n\n' +
    '1. Hydrogène — Fil rouge inter-régional: de Plastic Omnium (réservoirs, Lyon) à Airbus (ZEROe, Toulouse) en passant par Alstom (Coradia iLint, AURA) et le CEA (recherche fondamentale). La France vise une capacité de 6,5 GW d\'électrolyse d\'ici 2030 (plan France 2030, 7,2Md€ dédiés H₂). Les 3 régions hébergent 60% des projets pilotes nationaux.\n\n' +
    '2. Semiconducteurs & souveraineté numérique: STMicroelectronics (Crolles) est le seul fabricant européen de semi avancés en volume. Le EU Chips Act (43Md€) et le plan France 2030 (5,5Md€ volet semi) visent à porter la part européenne de la production mondiale de 8% à 20% d\'ici 2030. La région AURA concentre 70% de la R&D semi française.\n\n' +
    '3. Cybersécurité & NIS2: La transposition de NIS2 (oct. 2024) impacte l\'ensemble des acteurs industriels couverts. Thales DIS, Orange Cyberdefense et l\'ANSSI (bureau régional Lyon) structurent l\'offre d\'accompagnement. Le Campus Cyber de Lyon-Gerland (ouverture Q1-2025) fédérera l\'écosystème AURA.\n\n' +
    '4. Réindustrialisation & France 2030: Les 3 régions captent 42% des lauréats des appels à projets France 2030 (industrie verte, décarbonation, batteries, etc.). 54 Md€ de financements publics sont programmés sur 2022-2027, dont ~22Md€ pour les filières couvertes dans ce rapport.\n\n' +
    '5. Tensions RH & formation: Le déficit d\'ingénieurs dans les filières stratégiques est estimé à ~15 000 postes/an sur les 3 régions. Les grandes écoles régionales (ISAE, INP Grenoble, ENSEIRB-MATMECA) forment ~4 500 ingénieurs/an — insuffisant face à la demande. Les initiatives de reconversion (Pôle Emploi × industriels) et l\'attractivité internationale sont des leviers critiques.',
    45, 75, { width: 505, lineBreak: true, lineGap: 2.5 }
  );

  // Final box
  doc.save();
  doc.roundedRect(45, 560, 505, 70, 4).fillAndStroke('#f0f5fa', '#003366');
  doc.fillColor('#003366').fontSize(8).font('Helvetica-Bold').text('[CARTE: Synthèse des corridors industriels inter-régionaux]', 55, 568, { width: 485, align: 'center' });
  doc.fillColor('#666666').fontSize(6.5).font('Helvetica').text(
    'La cartographie complète des corridors industriels, incluant les flux logistiques (fret ferroviaire, axes autoroutiers A7/A61/A62/A89),\n' +
    'les bassins d\'emploi partagés et les infrastructures de recherche mutualisées (IRT, CEA, CNRS), est disponible dans l\'édition imprimée\n' +
    'et sur la plateforme SIG de l\'ORII (accès restreint — identifiants sur demande auprès du secrétariat général).',
    55, 585, { width: 485, align: 'center' }
  );
  doc.restore();

  footnoteBlock(doc, [
    '© 2024 Observatoire Régional de l\'Innovation Industrielle (ORII). Rapport publié sous licence CC BY-NC-ND 4.0.',
    'Les opinions exprimées n\'engagent que les auteurs et ne reflètent pas nécessairement la position des collectivités territoriales ou de l\'État.',
    'Réf: ORII-2024-REG-015 v2.1 | ISSN: 2678-XXXX (en cours d\'attribution) | Dépôt légal: BNF, septembre 2024.',
    'Prochaine édition: ORII-2025-REG-016 (publication prévue: mars 2025, focus additionnel: filière nucléaire & SMR).',
  ], 45, 650, 505);

  doc.end();
  return new Promise(r => stream.on('finish', r));
}

// ═══════════════════════════════════════════════════════════════════════════════
// Run all
// ═══════════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('Generating PDF 1: 13_automotive_suppliers_benchmark.pdf');
  await genPDF1();
  console.log('  ✓ Done');

  console.log('Generating PDF 2: 14_cybersecurity_incident_report.pdf');
  await genPDF2();
  console.log('  ✓ Done');

  console.log('Generating PDF 3: 15_regions_france_innovation.pdf');
  await genPDF3();
  console.log('  ✓ Done');

  console.log('\nAll 3 PDFs generated in:', OUT);
}

main().catch(err => { console.error(err); process.exit(1); });
