const PDFDocument = require('/home/alex/hackapp/node_modules/pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = '/home/alex/hackapp/data/pdfs';
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── Helpers to make parsing HARD ───────────────────────────────────────────

function writePromise(doc, filePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

// Random invisible zero-width chars injected into text
function poisonText(text) {
  const zwc = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += text[i];
    if (Math.random() < 0.08) {
      result += zwc[Math.floor(Math.random() * zwc.length)];
    }
  }
  return result;
}

// Write text with random font size jitter and slight position offsets
function jitteryText(doc, text, x, y, opts = {}) {
  const baseSize = opts.fontSize || 10;
  const lines = text.split('\n');
  let curY = y;
  for (const line of lines) {
    // Split line into fragments with different sizes
    const fragments = line.match(/.{1,15}/g) || [''];
    let curX = x;
    for (const frag of fragments) {
      const sizeJitter = baseSize + (Math.random() * 1.2 - 0.6);
      doc.fontSize(sizeJitter);
      const poisoned = poisonText(frag);
      doc.text(poisoned, curX, curY, { continued: true, lineBreak: false });
      curX += doc.widthOfString(frag);
    }
    doc.text('', x, curY, { continued: false }); // line break
    curY += baseSize * 1.35;
  }
  return curY;
}

// Draw a fake table with misaligned columns and overlapping borders
function chaoticTable(doc, headers, rows, x, y, opts = {}) {
  const colWidth = opts.colWidth || 110;
  const rowHeight = opts.rowHeight || 18;
  const fontSize = opts.fontSize || 8;

  doc.save();

  // Draw headers with slight rotation
  headers.forEach((h, i) => {
    doc.save();
    const cx = x + i * colWidth + colWidth / 2;
    const cy = y + rowHeight / 2;
    const angle = (Math.random() - 0.5) * 0.03; // slight rotation in radians
    doc.translate(cx, cy);
    doc.rotate(angle * (180 / Math.PI));
    doc.fontSize(fontSize + 1).font('Helvetica-Bold');
    doc.text(poisonText(h), -colWidth / 2 + 3, -rowHeight / 2 + 3, {
      width: colWidth - 6,
      height: rowHeight,
      align: 'left',
      lineBreak: false
    });
    doc.restore();
  });

  // Header underline — but make it slightly off
  doc.moveTo(x - 2, y + rowHeight + 0.5)
    .lineTo(x + headers.length * colWidth + 3, y + rowHeight - 0.3)
    .lineWidth(0.4).stroke('#444444');

  // Draw rows
  rows.forEach((row, ri) => {
    const ry = y + (ri + 1.5) * rowHeight;
    // Alternating barely-visible background
    if (ri % 2 === 0) {
      doc.rect(x, ry - 2, headers.length * colWidth, rowHeight)
        .fill('#f9f9f9').fill('#000000');
    }
    row.forEach((cell, ci) => {
      const jitterX = x + ci * colWidth + (Math.random() * 2 - 1);
      const jitterY = ry + (Math.random() * 1.5 - 0.75);
      doc.fontSize(fontSize + (Math.random() * 0.8 - 0.4)).font('Helvetica');
      doc.text(poisonText(String(cell)), jitterX + 3, jitterY, {
        width: colWidth - 6,
        height: rowHeight,
        lineBreak: false
      });
    });
    // partial grid lines with gaps
    if (Math.random() > 0.3) {
      const startGap = Math.random() * 20;
      doc.moveTo(x + startGap, ry + rowHeight - 1)
        .lineTo(x + headers.length * colWidth - Math.random() * 15, ry + rowHeight - 1)
        .lineWidth(0.2).stroke('#cccccc');
    }
  });

  doc.restore();
  return y + (rows.length + 2) * rowHeight;
}

// Watermark / background noise
function addNoise(doc, pageWidth, pageHeight) {
  doc.save();
  doc.opacity(0.03);
  for (let i = 0; i < 40; i++) {
    const rx = Math.random() * pageWidth;
    const ry = Math.random() * pageHeight;
    doc.fontSize(6 + Math.random() * 14);
    const noiseTexts = ['CONFIDENTIEL', 'DRAFT', 'NE PAS DIFFUSER', '***', '---', '|||', 'COPIE'];
    doc.text(noiseTexts[Math.floor(Math.random() * noiseTexts.length)], rx, ry, { lineBreak: false });
  }
  doc.opacity(1);
  doc.restore();
}

// Insert text that looks like OCR artifacts
function ocrArtifacts(doc, x, y) {
  doc.save();
  doc.fontSize(4).opacity(0.06).font('Courier');
  const artifacts = [
    'l1I|0O ', 'rn→m ', '€→e ', 'fi→fl ', 'ﬀ→ff', '  .. .  ',
    ',,.,. ', 'ü→u ', 'ö→o ', 'à→a ', '\\n\\r\\t', 'NULL',
    '####', '____', '{{}}', '(())'
  ];
  let cx = x;
  for (const a of artifacts) {
    doc.text(a, cx, y, { lineBreak: false });
    cx += 35;
    if (cx > 500) { cx = x; y += 5; }
  }
  doc.opacity(1).font('Helvetica');
  doc.restore();
  return y + 10;
}

// Multi-column layout that confuses reading order
function twoColumnText(doc, leftText, rightText, x, y, width, opts = {}) {
  const gap = 15;
  const colW = (width - gap) / 2;
  const fontSize = opts.fontSize || 9;
  doc.fontSize(fontSize).font('Helvetica');
  // left
  doc.text(poisonText(leftText), x, y, { width: colW, align: 'justify' });
  const leftH = doc.heightOfString(leftText, { width: colW });
  // right
  doc.text(poisonText(rightText), x + colW + gap, y, { width: colW, align: 'justify' });
  const rightH = doc.heightOfString(rightText, { width: colW });
  return y + Math.max(leftH, rightH) + 10;
}

// ─── PDF 1: Bankruptcy Restructuring ────────────────────────────────────────

async function genBankruptcy() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 45, right: 45 },
    info: {
      Title: 'Proc\u00e9dures Collectives — Entreprises en Difficult\u00e9 2024',
      Author: 'Greffe du Tribunal de Commerce de Paris',
      Subject: 'Redressement Judiciaire',
      Keywords: 'faillite,redressement,sauvegarde,liquidation',
      CreationDate: new Date('2024-11-15'),
    },
    compress: true,
  });

  const filePath = path.join(OUT_DIR, '22_bankruptcy_restructuring.pdf');

  // --- Page 1 ---
  addNoise(doc, 595, 842);

  // Header with overlapping text layers
  doc.fontSize(7).font('Courier').opacity(0.15);
  doc.text('GREFFE DU TRIBUNAL DE COMMERCE DE PARIS — EXTRAIT K-BIS MODIFIE — INSCRIPTION MODIFICATIVE', 30, 25, { lineBreak: false });
  doc.opacity(1);

  doc.fontSize(14).font('Helvetica-Bold');
  doc.text('REPUBLIQUE FRAN\u00c7AISE', 45, 50, { align: 'center', width: 500 });
  doc.fontSize(10).font('Helvetica');
  doc.text('Tribunal de Commerce de Paris — Greffe', 45, 70, { align: 'center', width: 500 });
  doc.moveDown(0.3);
  doc.fontSize(8).text('Chambre des proc\u00e9dures collectives', { align: 'center' });

  doc.moveTo(45, 100).lineTo(550, 100).lineWidth(1.5).stroke();
  doc.moveTo(45, 102).lineTo(550, 102).lineWidth(0.3).stroke('#888888');

  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('AVIS DE JUGEMENT — PROC\u00c9DURES COLLECTIVES', 45, 115, { align: 'center', width: 500 });
  doc.fontSize(8).font('Helvetica').text('Bulletin Officiel des Annonces Civiles et Commerciales (BODACC)', 45, 135, { align: 'center', width: 500 });
  doc.text('Parution n\u00b0 2024-RC-4847 du 15/11/2024', 45, 148, { align: 'center', width: 500 });

  let curY = 170;

  // OCR noise
  curY = ocrArtifacts(doc, 50, curY);

  // Orpea section — dense legal French
  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('I. ORPEA S.A. — Redressement Judiciaire avec plan de sauvegarde acc\u00e9l\u00e9r\u00e9', 45, curY);
  curY += 18;

  doc.fontSize(7).font('Courier').opacity(0.12);
  doc.text('RCS: 401 251 566 | SIREN: 401251566 | NAF: 8710A', 45, curY, { lineBreak: false });
  doc.opacity(1);
  curY += 12;

  const orpeaLeft = `ORPEA S.A., soci\u00e9t\u00e9 anonyme au capital de 1.429.567.892 euros, si\u00e8ge social sis 12 rue Jean Jaur\u00e8s, 92813 Puteaux Cedex, immatricul\u00e9e au RCS de Nanterre sous le num\u00e9ro 401 251 566, repr\u00e9sent\u00e9e par son administrateur judiciaire Ma\u00eetre Laurent Le Guernevé, d\u00e9sign\u00e9 par jugement du Tribunal de Commerce de Nanterre en date du 24 juillet 2024.

ATTENDU QUE la soci\u00e9t\u00e9 ORPEA, op\u00e9rant dans le secteur des soins de sant\u00e9 et de l'h\u00e9bergement m\u00e9dicalis\u00e9 pour personnes \u00e2g\u00e9es d\u00e9pendantes (EHPAD), employant environ 70.000 salari\u00e9s \u00e0 travers 1.100 \u00e9tablissements dans 23 pays, a \u00e9t\u00e9 confront\u00e9e \u00e0 une situation de d\u00e9tresse financi\u00e8re majeure n\u00e9cessitant l'ouverture d'une proc\u00e9dure de redressement judiciaire;`;

  const orpeaRight = `La dette consolid\u00e9e s'\u00e9l\u00e8ve \u00e0 9,7 milliards d'euros au 30 juin 2024 (dont 3,8 Md EUR de dette bancaire senior, 2,1 Md EUR de Schuldschein, 1,4 Md EUR d'obligations non s\u00e9curis\u00e9es, et 2,4 Md EUR de dettes locatives IFRS 16). Le plan de restructuration pr\u00e9voit: (i) conversion de 3,9 Md EUR de cr\u00e9ances en capital, (ii) injection de 1,5 Md EUR de new money par la Caisse des D\u00e9p\u00f4ts et Consignations, consortium MAIF-CNP, (iii) dilution massive des actionnaires existants \u00e0 0,04%.

VU les articles L.626-1 et suivants du Code de commerce; VU le rapport de l'administrateur judiciaire en date du 15 octobre 2024; VU l'avis du minist\u00e8re public;`;

  curY = twoColumnText(doc, orpeaLeft, orpeaRight, 45, curY, 500, { fontSize: 8 });
  curY += 5;

  // Fake table fragment for Orpea financials — overlapping
  curY = chaoticTable(doc, ['Poste', 'Montant (M\u20ac)', 'Variation', 'Statut'], [
    ['CA 2023', '5.198', '-2,3% vs 2022', 'Audit\u00e9'],
    ['R\u00e9sultat net', '-4.012', 'N/A', 'D\u00e9pr\u00e9ciations'],
    ['Dette brute', '9.700', '+1.200', 'Restructuration'],
    ['Capitaux propres', '-2.890', 'N\u00e9gatif', 'ALERTE'],
    ['Effectifs', '70.000', '-3.000', 'PSE en cours'],
    ['Nb \u00e9tablissements', '1.100', '-47', 'Cessions'],
  ], 50, curY, { colWidth: 120, fontSize: 7.5 });

  curY += 15;

  // Second entity: Atos SE
  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('II. ATOS SE — Proc\u00e9dure de sauvegarde acc\u00e9l\u00e9r\u00e9e (art. L.628-1 C.com.)', 45, curY);
  curY += 18;

  // Fake stamp overlay
  doc.save();
  doc.translate(420, curY - 40);
  doc.rotate(-18);
  doc.fontSize(16).font('Helvetica-Bold').opacity(0.08);
  doc.text('COPIE CERTIFI\u00c9E CONFORME', 0, 0, { lineBreak: false });
  doc.opacity(1);
  doc.restore();

  const atosText = `ATOS SE (anciennement Atos Origin), soci\u00e9t\u00e9 europ\u00e9enne au capital de 111.345.618,30 euros, dont le si\u00e8ge social est sis 80 Quai Voltaire, 95870 Bezons, immatricul\u00e9e au RCS de Pontoise sous le num\u00e9ro 323 623 603, sp\u00e9cialis\u00e9e dans les services informatiques et l'int\u00e9gration de syst\u00e8mes (code NAF 6202A — Conseil en syst\u00e8mes et logiciels informatiques), employant pr\u00e8s de 95.000 collaborateurs dans 69 pays.

Par jugement du 24 octobre 2024, le Tribunal de Commerce sp\u00e9cialis\u00e9 de Nanterre a:
\u2022 Prononc\u00e9 l'ouverture d'une proc\u00e9dure de sauvegarde acc\u00e9l\u00e9r\u00e9e au b\u00e9n\u00e9fice d'ATOS SE;
\u2022 D\u00e9sign\u00e9 Ma\u00eetre Hélène Bourbouloux (FHBX) en qualit\u00e9 d'administrateur judiciaire;
\u2022 D\u00e9sign\u00e9 Ma\u00eetre Fr\u00e9d\u00e9ric Chieux en qualit\u00e9 de mandataire judiciaire;
\u2022 Fix\u00e9 la p\u00e9riode d'observation \u00e0 4 mois renouvelable.

SITUATION FINANCI\u00c8RE: Le groupe ATOS fait face \u00e0 une dette financi\u00e8re brute de 4,65 milliards d'euros, un r\u00e9sultat net d\u00e9ficitaire de -3,44 Md\u20ac en 2023, et un besoin urgent de refinancement. Le plan de restructuration financi\u00e8re pr\u00e9voit:
(a) Apurement de 2,9 Md\u20ac de dette par conversion en capital;
(b) New money de 1,675 Md\u20ac apport\u00e9 par un consortium (Onepoint, Butler Industries, Econocom);
(c) Cession des activit\u00e9s souveraines (BDS — Big Data & S\u00e9curit\u00e9) \u00e0 l'\u00c9tat fran\u00e7ais via un v\u00e9hicule d\u00e9di\u00e9;
(d) Dilution des actionnaires actuels sup\u00e9rieure \u00e0 99,99%.

NOTE: Les activit\u00e9s d'Atos incluent le calcul haute performance (HPC), la cybers\u00e9curit\u00e9 (Eviden), les services manag\u00e9s d'infrastructure, et le conseil digital. L'entreprise est un acteur strat\u00e9gique pour la d\u00e9fense nationale (contrats arm\u00e9es, supercalculateurs CEA).`;

  doc.fontSize(8).font('Helvetica');
  doc.text(poisonText(atosText), 45, curY, { width: 505, align: 'justify', lineGap: 1.2 });
  curY = doc.y + 10;

  // --- Page 2 ---
  doc.addPage();
  addNoise(doc, 595, 842);
  curY = 50;

  // Atos financial table
  curY = chaoticTable(doc, ['Indicateur', '2022', '2023', '2024 (est.)', 'Tendance'], [
    ['CA (Md\u20ac)', '11.341', '10.693', '9.800', '\u2193\u2193'],
    ['EBITDA', '1.012', '-289', '~150', 'Restructuration'],
    ['R\u00e9sultat net', '-993', '-3.440', 'N/C', '\u2193\u2193\u2193'],
    ['Dette nette', '3.120', '4.650', '1.750*', '*post-restruct.'],
    ['Effectifs', '111.000', '95.000', '~82.000', 'PSE + cessions'],
    ['Carnet commandes', '24.100', '21.800', '19.500', '\u2193'],
  ], 50, curY, { colWidth: 100, fontSize: 7 });

  curY += 25;

  // Casino Group — third entity
  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('III. CASINO, GUICHARD-PERRACHON — Redressement judiciaire converti en plan de cession', 45, curY);
  curY += 18;

  // Deliberately use mixed encoding-like characters
  const casinoText = `CASINO, GUICHARD-PERRACHON S.A. (ci-apr\u00e8s « Casino » ou « le Groupe »), soci\u00e9t\u00e9 anonyme au capital de 166.374.176,64 EUR, si\u00e8ge social: 1 Esplanade de France, 42000 Saint-\u00c9tienne, RCS Saint-\u00c9tienne 554 501 171, op\u00e9rant dans le secteur de la distribution alimentaire et non-alimentaire (code NAF: 4711D — Supermarch\u00e9s), employant environ 200.000 personnes \u00e0 travers ses filiales (Monoprix, Franprix, Leader Price, G\u00e9ant Casino, Cdiscount, Assai [Br\u00e9sil], \u00c9xito [Colombie]).

HISTORIQUE PROC\u00c9DURAL:
\u2014 18/06/2023: Ouverture proc\u00e9dure de conciliation (Pr\u00e9sident du TC de Paris)
\u2014 27/09/2023: Ouverture d'une proc\u00e9dure de sauvegarde acc\u00e9l\u00e9r\u00e9e
\u2014 26/10/2023: Conversion en redressement judiciaire (art. L.631-1 C.com.)
\u2014 01/03/2024: Arr\u00eat\u00e9 du plan de cession au profit du groupement Auchan/Les Mousquetaires/Rochefort & Associ\u00e9s
\u2014 15/04/2024: Cession effective des hypermarch\u00e9s et supermarch\u00e9s Casino (287 magasins \u00e0 Auchan, 288 \u00e0 Les Mousquetaires, 61 \u00e0 Carrefour)

PASSIF D\u00c9CLAR\u00c9: Le passif total d\u00e9clar\u00e9 s'\u00e9l\u00e8ve \u00e0 environ 6,4 milliards d'euros, dont:
\u2022 2,8 Md\u20ac de dette obligataire senior s\u00e9curis\u00e9e
\u2022 1,6 Md\u20ac de dette bancaire (RCF + term loans)
\u2022 0,9 Md\u20ac de dettes locatives (IFRS 16)
\u2022 1,1 Md\u20ac de dettes fournisseurs et autres passifs
\u2022 NB: Jean-Charles Naouri, PDG historique et actionnaire de r\u00e9f\u00e9rence via Rallye/Foncière Euris/Finatis, a vu l'int\u00e9gralit\u00e9 de la cha\u00eene de contr\u00f4le (4 holdings en cascade) plac\u00e9e en liquidation judiciaire.`;

  doc.fontSize(8).font('Helvetica');
  doc.text(poisonText(casinoText), 45, curY, { width: 505, align: 'justify', lineGap: 1 });
  curY = doc.y + 10;

  // Casino table
  curY = chaoticTable(doc, ['Entit\u00e9', 'Statut', 'Passif (M\u20ac)', 'Effectifs', 'Issue'], [
    ['Casino GPC', 'Redress. jud.', '6.400', '200.000', 'Plan de cession'],
    ['Rallye SA', 'Liquidation jud.', '3.200', '0 (holding)', 'Cl\u00f4ture insuf.'],
    ['Fonci\u00e8re Euris', 'Liquidation jud.', '1.800', '0 (holding)', 'Cl\u00f4ture insuf.'],
    ['Finatis', 'Liquidation jud.', '900', '0 (holding)', 'Cl\u00f4ture insuf.'],
    ['Cdiscount', 'Cession \u00e0 CTCL', '480', '1.800', 'Rep. partielle'],
  ], 50, curY, { colWidth: 100, fontSize: 7 });

  curY += 25;

  // Closing legal boilerplate in tiny font, multi-column
  const legalLeft = `Le pr\u00e9sent avis est publi\u00e9 conform\u00e9ment aux dispositions de l'article R.621-8 du Code de commerce. Les cr\u00e9anciers sont invit\u00e9s \u00e0 d\u00e9clarer leurs cr\u00e9ances aupr\u00e8s du mandataire judiciaire d\u00e9sign\u00e9 dans un d\u00e9lai de deux mois \u00e0 compter de la publication au BODACC (art. L.622-24 C.com.). Pass\u00e9 ce d\u00e9lai, les cr\u00e9ances non d\u00e9clar\u00e9es seront frapp\u00e9es de forclusion, sauf relev\u00e9 de forclusion accord\u00e9 par le juge-commissaire.`;

  const legalRight = `Nota Bene: Les entreprises mentionn\u00e9es dans le pr\u00e9sent bulletin font l'objet de proc\u00e9dures collectives en cours. Toute reprise d'activit\u00e9, cession d'actifs ou poursuite de contrats est soumise \u00e0 l'autorisation pr\u00e9alable du juge-commissaire ou du tribunal comp\u00e9tent. Les informations contenues dans ce document sont fournies \u00e0 titre indicatif et ne sauraient se substituer aux actes officiels d\u00e9pos\u00e9s au greffe.`;

  curY = twoColumnText(doc, legalLeft, legalRight, 45, curY, 505, { fontSize: 7 });

  // Footer bar
  doc.fontSize(6).font('Courier').opacity(0.4);
  doc.text('BODACC C n\u00b0 20240219 | Publication: 15/11/2024 | Greffe: TC Paris / TC Nanterre / TC Saint-\u00c9tienne', 45, 790, { lineBreak: false });
  doc.opacity(1);

  return writePromise(doc, filePath);
}

// ─── PDF 2: APEC Engineering Jobs Report ────────────────────────────────────

async function genAPEC() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    info: {
      Title: 'APEC — March\u00e9 de l\'emploi cadre dans l\'ing\u00e9nierie et le conseil en technologies',
      Author: 'APEC — Association Pour l\'Emploi des Cadres',
      Subject: '\u00c9tude sectorielle Ing\u00e9nierie 2024',
      Keywords: 'emploi,cadres,ing\u00e9nierie,recrutement,tension',
      CreationDate: new Date('2024-09-01'),
    },
    compress: true,
  });

  const filePath = path.join(OUT_DIR, '23_apec_engineering_jobs_report.pdf');

  // --- Page 1: Cover ---
  addNoise(doc, 595, 842);

  // APEC branding block
  doc.rect(0, 0, 595, 140).fill('#003366');
  doc.fontSize(22).font('Helvetica-Bold').fill('#FFFFFF');
  doc.text('APEC', 50, 35, { lineBreak: false });
  doc.fontSize(9).font('Helvetica').fill('#99BBDD');
  doc.text('Association Pour l\'Emploi des Cadres', 50, 62);
  doc.fontSize(8).fill('#7799BB');
  doc.text('Observatoire de l\'emploi cadre — D\u00e9partement \u00c9tudes et Recherche', 50, 78);

  doc.fill('#FFFFFF').fontSize(16).font('Helvetica-Bold');
  doc.text('MARCH\u00c9 DE L\'EMPLOI CADRE', 50, 105, { lineBreak: false });
  doc.fill('#FFFFFF');

  // Subtitle area
  doc.rect(0, 140, 595, 80).fill('#004488');
  doc.fontSize(18).font('Helvetica-Bold').fill('#FFFFFF');
  doc.text('Ing\u00e9nierie & Conseil en Technologies', 50, 155, { width: 500 });
  doc.fontSize(11).font('Helvetica').fill('#AACCEE');
  doc.text('\u00c9tude sectorielle — Barom\u00e8tre annuel 2024 — Donn\u00e9es collect\u00e9es T1-T3 2024', 50, 185, { width: 500 });

  let curY = 250;
  doc.fill('#000000');

  // Fake methodology box with tiny text
  doc.rect(50, curY, 495, 90).lineWidth(0.5).stroke('#cccccc');
  doc.fontSize(7).font('Helvetica').fill('#666666');
  doc.text(poisonText(`M\u00e9thodologie: Enqu\u00eate r\u00e9alis\u00e9e aupr\u00e8s de 4.800 entreprises du secteur de l'ing\u00e9nierie et du conseil en technologies (codes NAF 7112B, 7120B, 7022Z, 6202A) entre le 15 janvier et le 30 juin 2024. \u00c9chantillon repr\u00e9sentatif stratifi\u00e9 par taille d'entreprise (PME < 250 sal., ETI 250-4999, GE > 5000) et par r\u00e9gion (\u00cele-de-France, Auvergne-Rh\u00f4ne-Alpes, Occitanie, Nouvelle-Aquitaine, PACA, Bretagne, Pays de la Loire). Marge d'erreur: \u00b12,1% au seuil de confiance de 95%. Donn\u00e9es compl\u00e9t\u00e9es par l'analyse de 285.000 offres d'emploi cadre publi\u00e9es sur apec.fr. Champ: France m\u00e9tropolitaine + DOM.`), 55, curY + 8, { width: 485, align: 'justify' });

  curY += 105;

  // Key figures — big callout boxes with mixed formatting
  doc.fontSize(12).font('Helvetica-Bold').fill('#003366');
  doc.text('CHIFFRES CL\u00c9S 2024', 50, curY);
  curY += 22;

  const keyFigures = [
    { num: '35.200', label: 'postes ouverts en ing\u00e9nierie-conseil', delta: '+12% vs 2023' },
    { num: '68 jours', label: 'temps moyen de pourvoi (seniors)', delta: '+8j vs 2023' },
    { num: '45 jours', label: 'temps moyen de pourvoi (juniors)', delta: '+3j vs 2023' },
    { num: '82%', label: 'des recruteurs signalent des difficult\u00e9s', delta: '+5pts' },
  ];

  keyFigures.forEach((kf, i) => {
    const bx = 50 + (i % 2) * 250;
    const by = curY + Math.floor(i / 2) * 65;
    doc.rect(bx, by, 235, 55).lineWidth(0.3).stroke('#003366');
    doc.fontSize(20).font('Helvetica-Bold').fill('#003366');
    doc.text(poisonText(kf.num), bx + 10, by + 8, { lineBreak: false });
    doc.fontSize(8).font('Helvetica').fill('#333333');
    doc.text(poisonText(kf.label), bx + 10, by + 32, { lineBreak: false });
    doc.fontSize(7).fill('#cc0000').font('Helvetica-Bold');
    doc.text(poisonText(kf.delta), bx + 170, by + 10, { lineBreak: false });
  });

  curY += 145;

  // "Chart" described as text (parsing trap)
  doc.fontSize(9).font('Helvetica-Bold').fill('#003366');
  doc.text('[GRAPHIQUE 1: \u00c9volution des offres d\'emploi cadre en ing\u00e9nierie, 2019-2024]', 50, curY);
  curY += 15;

  doc.fontSize(7.5).font('Helvetica').fill('#444444');
  const chartDesc = `Axe X: Ann\u00e9es (2019, 2020, 2021, 2022, 2023, 2024)  |  Axe Y: Nombre d'offres (milliers)
2019: 28.400 (=100)  |  2020: 19.200 (-32%, COVID)  |  2021: 25.600 (+33%)  |  2022: 31.400 (+23%)  |  2023: 31.500 (+0,3%)  |  2024: 35.200 (+12%)
Courbe de tendance polynomiale (R\u00b2=0,89): reprise post-COVID suivie d'une acc\u00e9l\u00e9ration en 2024 li\u00e9e aux investissements d\u00e9fense/a\u00e9ronautique/transition \u00e9nerg\u00e9tique.
Note: Rupture m\u00e9thodologique en 2022 (int\u00e9gration LinkedIn + Indeed dans le p\u00e9rim\u00e8tre de collecte). Donn\u00e9es 2024 extrapol\u00e9es sur T4.`;
  doc.text(poisonText(chartDesc), 50, curY, { width: 495, align: 'justify' });
  curY = doc.y + 15;

  // --- Page 2: Hiring companies ---
  doc.addPage();
  addNoise(doc, 595, 842);
  curY = 50;

  doc.fontSize(12).font('Helvetica-Bold').fill('#003366');
  doc.text('2. PRINCIPAUX RECRUTEURS — Volume de postes ouverts 2024', 50, curY);
  curY += 25;

  // Overlapping header annotation
  doc.save();
  doc.fontSize(6).font('Courier').opacity(0.1);
  doc.text('src: apec.fr/statistiques/secteur-ingenierie | extraction: 2024-08-31T23:59:59Z | format: CSV>PDF | encoding: UTF-8-BOM', 50, curY - 8, { lineBreak: false });
  doc.opacity(1);
  doc.restore();

  curY = chaoticTable(doc, ['Entreprise', 'Secteur', 'Postes 2024', '\u00c9vol. N-1', 'Prof. recherch\u00e9s'], [
    ['Thales', 'D\u00e9fense/A\u00e9ro', '2.500', '+18%', 'Syst. embarqu\u00e9s, Cyber, IA'],
    ['Safran', 'A\u00e9ronautique', '1.800', '+22%', 'M\u00e9ca, Thermo, Mat\u00e9riaux'],
    ['Naval Group', 'D\u00e9fense navale', '1.200', '+15%', 'Hydro, SdF, Architecture'],
    ['Capgemini Eng.', 'Conseil techno', '3.100', '+8%', 'DevOps, Cloud, Data'],
    ['Alten', 'Conseil ing.', '4.200', '+11%', 'Polyvalent, Emb, V&V'],
    ['Assystem', 'Nucl\u00e9aire/Energ', '950', '+25%', 'S\u00fbret\u00e9, I&C, G\u00e9nie civil'],
    ['Akka / Akkodis', 'Conseil techno', '2.800', '+6%', 'Auto, Emb, Digital Twin'],
    ['Sopra Steria', 'Services IT', '1.600', '+9%', 'Cyber, Cloud, ERP'],
    ['Dassault Aviat.', 'A\u00e9ronautique', '800', '+30%', 'CATIA, Aerostruc, FEA'],
    ['EDF', '\u00c9nergie', '1.400', '+14%', 'Nucl\u00e9aire, R\u00e9seau, EnR'],
  ], 50, curY, { colWidth: 98, fontSize: 6.5 });

  curY += 20;

  // Skills demand section — multi-column
  doc.fontSize(11).font('Helvetica-Bold').fill('#003366');
  doc.text('3. COMP\u00c9TENCES LES PLUS RECHERCH\u00c9ES', 50, curY);
  curY += 20;

  const skillsLeft = `COMP\u00c9TENCES TECHNIQUES (% d'offres mentionnant):
\u2022 C/C++ embarqu\u00e9 (RTOS, AUTOSAR, MISRA): 34% (+4pts)
\u2022 Python (ML/Data Science, scripting): 41% (+7pts)
\u2022 CATIA V5/V6, ENOVIA: 18% (+2pts)
\u2022 ANSYS (m\u00e9canique, thermique, CFD): 12% (+1pt)
\u2022 Cybers\u00e9curit\u00e9 (ISO 27001, SOC, pentest): 22% (+6pts)
\u2022 DevOps/CI-CD (Jenkins, GitLab CI, Docker, K8s): 29% (+5pts)
\u2022 Cloud (AWS/Azure/GCP): 26% (+8pts)
\u2022 MBSE/SysML/UML: 15% (+3pts)
\u2022 Matlab/Simulink: 14% (stable)
\u2022 VHDL/FPGA: 8% (+2pts)`;

  const skillsRight = `SECTEURS EN TENSION (indice de tension* > 1,5):
\u2022 D\u00e9fense & S\u00e9curit\u00e9: indice 2,8 (offres: 8.200 / candidats: 2.900)
\u2022 A\u00e9ronautique civile: indice 2,3 (offres: 6.100 / candidats: 2.650)
\u2022 Nucl\u00e9aire (nouveau + d\u00e9mant\u00e8lement): indice 2,6 (offres: 3.800 / candidats: 1.460)
\u2022 Spatial: indice 3,1 (offres: 1.900 / candidats: 610)
\u2022 Ferroviaire / Mobilit\u00e9: indice 1,7 (offres: 2.400 / candidats: 1.410)
\u2022 \u00c9nergie renouvelable: indice 1,9 (offres: 2.900 / candidats: 1.520)

* Indice de tension = ratio offres/candidatures qualifi\u00e9es
  Source: APEC + P\u00f4le Emploi, donn\u00e9es crois\u00e9es T1-T2 2024`;

  curY = twoColumnText(doc, skillsLeft, skillsRight, 50, curY, 495, { fontSize: 7.5 });

  curY += 15;

  // Salary table
  doc.fontSize(11).font('Helvetica-Bold').fill('#003366');
  doc.text('4. R\u00c9MUN\u00c9RATIONS M\u00c9DIANES PAR PROFIL (brut annuel, k\u20ac)', 50, curY);
  curY += 18;

  curY = chaoticTable(doc, ['Profil', '0-2 ans', '3-5 ans', '6-10 ans', '10-15 ans', '15+ ans'], [
    ['Ing. m\u00e9canique', '33-36', '38-43', '45-52', '53-62', '63-75'],
    ['Ing. logiciel emb.', '35-38', '40-46', '48-56', '57-67', '68-82'],
    ['Ing. cyber', '38-42', '45-52', '55-65', '66-78', '80-100'],
    ['Data scientist', '37-41', '43-50', '52-62', '63-75', '76-95'],
    ['Chef projet tech.', '36-40', '42-48', '50-60', '62-75', '78-95'],
    ['Ing. nucl\u00e9aire', '35-39', '41-47', '49-58', '60-72', '73-90'],
    ['Archi. syst\u00e8mes', '36-40', '44-50', '53-64', '65-80', '82-105'],
  ], 50, curY, { colWidth: 82, fontSize: 7 });

  curY += 20;

  // Dense paragraph about regional distribution
  doc.fontSize(8).font('Helvetica').fill('#333333');
  const regionalText = `R\u00c9PARTITION G\u00c9OGRAPHIQUE: L'\u00cele-de-France concentre 42% des offres (soit ~14.800 postes), suivie par Auvergne-Rh\u00f4ne-Alpes (16%, port\u00e9e par le corridor Grenoble-Lyon-Saint-\u00c9tienne), Occitanie (12%, p\u00f4le a\u00e9ronautique Toulouse), Nouvelle-Aquitaine (8%, Bordeaux a\u00e9ro/d\u00e9fense + Poitiers m\u00e9ca), PACA (7%, Sophia Antipolis + Cadarache/ITER), Bretagne (6%, DGA/Naval Group + num\u00e9rique Rennes/Lannion), Pays de la Loire (5%, Nantes a\u00e9ro/naval + Le Mans auto). Les 4% restants se r\u00e9partissent entre Grand Est (2%, Strasbourg auto), Hauts-de-France (1,5%, Valenciennes ferroviaire) et autres r\u00e9gions. TENDANCE: croissance plus rapide en r\u00e9gions (+15%) qu'en \u00cele-de-France (+9%), li\u00e9e aux politiques de d\u00e9centralisation des sites industriels et au d\u00e9veloppement du t\u00e9l\u00e9travail hybride (2-3j/semaine accept\u00e9 par 71% des recruteurs du secteur).`;
  doc.text(poisonText(regionalText), 50, curY, { width: 495, align: 'justify' });

  // Footer
  doc.fontSize(6).font('Courier').fill('#999999');
  doc.text('APEC \u00a9 2024 | R\u00e9f\u00e9rence: APEC-OBS-2024-ING-042 | Diffusion: libre avec mention de la source | Contact: observatoire@apec.fr', 50, 790, { lineBreak: false });

  return writePromise(doc, filePath);
}

// ─── PDF 3: Hydrogen Ecosystem ──────────────────────────────────────────────

async function genHydrogen() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 45, bottom: 45, left: 45, right: 45 },
    info: {
      Title: 'Cartographie de l\'\u00e9cosyst\u00e8me hydrog\u00e8ne en France — Acteurs industriels et perspectives 2030',
      Author: 'France Hydrog\u00e8ne / ADEME / BPI France',
      Subject: 'Fili\u00e8re hydrog\u00e8ne France 2030',
      Keywords: 'hydrog\u00e8ne,\u00e9lectrolyseur,pile \u00e0 combustible,H2,d\u00e9carbonation',
      CreationDate: new Date('2024-10-01'),
    },
    compress: true,
  });

  const filePath = path.join(OUT_DIR, '24_hydrogen_ecosystem.pdf');

  // --- Page 1: Cover + Air Liquide ---
  addNoise(doc, 595, 842);

  // Green header bar
  doc.rect(0, 0, 595, 130).fill('#1a5c2a');
  doc.fontSize(20).font('Helvetica-Bold').fill('#FFFFFF');
  doc.text('\u00c9cosyst\u00e8me Hydrog\u00e8ne France', 50, 30, { width: 500 });
  doc.fontSize(12).font('Helvetica').fill('#b8e6c8');
  doc.text('Cartographie des acteurs industriels — Rapport de synth\u00e8se 2024', 50, 58);
  doc.fontSize(9).fill('#88cc99');
  doc.text('France Hydrog\u00e8ne | ADEME | Bpifrance | Strat\u00e9gie Nationale Hydrog\u00e8ne | France 2030', 50, 78);
  doc.fontSize(7).fill('#669977');
  doc.text('Document de travail — Version consolid\u00e9e — Octobre 2024 — Diffusion restreinte aux membres du CSFH', 50, 100);

  let curY = 145;
  doc.fill('#000000');

  // Infographic placeholder
  doc.rect(50, curY, 495, 50).lineWidth(0.5).stroke('#1a5c2a');
  doc.fontSize(8).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text(poisonText('[INFOGRAPHIE: Cha\u00eene de valeur hydrog\u00e8ne — Production (\u00e9lectrolyse, vaporeformage) > Stockage (comprim\u00e9 350/700 bar, liquide -253\u00b0C, LOHC) > Transport (pipelines, camions tube-trailers) > Distribution (stations HRS) > Usages finaux (mobilit\u00e9, industrie, injection r\u00e9seau gaz, power-to-X)]'), 55, curY + 10, { width: 485, align: 'center' });
  curY += 65;

  // Air Liquide — major entry
  doc.fontSize(12).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text('1. AIR LIQUIDE S.A. — Leader mondial des gaz industriels', 45, curY);
  curY += 20;

  // Fake watermark
  doc.save();
  doc.translate(300, curY + 80);
  doc.rotate(-35);
  doc.fontSize(48).font('Helvetica-Bold').opacity(0.03).fill('#1a5c2a');
  doc.text('H\u2082', 0, 0, { lineBreak: false });
  doc.opacity(1);
  doc.restore();

  const alLeft = `AIR LIQUIDE S.A.
Si\u00e8ge social: 75 Quai d'Orsay, 75007 Paris
RCS Paris 552 096 281 | SIREN: 552096281
Code NAF: 2011Z — Fabrication de gaz industriels
Pr\u00e9sident-Directeur G\u00e9n\u00e9ral: Fran\u00e7ois Jackow
Chiffre d'affaires 2023: 27,6 Md\u20ac (29,9 Md\u20ac en proforma*)
R\u00e9sultat net part du groupe: 3,1 Md\u20ac
Effectifs mondiaux: ~67.000 collaborateurs
Pr\u00e9sence: 73 pays | 400+ usines d'hydrog\u00e8ne

* Note: Le CA proforma de 29,9 Md\u20ac inclut la consolidation int\u00e9grale de la JV Siam Airgas (Tha\u00eflande) \u00e0 compter de T3 2023 et l'impact de change favorable USD/EUR (+1,2 Md\u20ac).`;

  const alRight = `STRAT\u00c9GIE HYDROG\u00c8NE — PLAN 2025-2035:
\u2022 Gigafactory d'\u00e9lectrolyseurs: site de B\u00e9cancour (Qu\u00e9bec, 2 GW/an) + site d'Oberhausen (Allemagne, 1 GW/an via JV Air Liquide/Siemens Energy)
\u2022 Pipeline H2 europ\u00e9en: partenaire du projet European Hydrogen Backbone (6.000 km d'ici 2030, dont 60% reconversion de gazoducs existants)
\u2022 Mobilit\u00e9 H2: r\u00e9seau de 200+ stations HRS (HysetCo Paris, HyVia Renault-JV, Clean H2 Infra Fund)
\u2022 D\u00e9carbonation industrielle: projet Normand'Hy (200 MW \u00e9lectrolyseur PEM au Havre, op\u00e9rationnel 2026, aliment\u00e9 par \u00e9olien offshore)
\u2022 Investissement cumul\u00e9 H2 2020-2035: ~8 Md\u20ac annonc\u00e9s

CAPACIT\u00c9 DE PRODUCTION H2 ACTUELLE:
~3 Mt H2/an (majoritairement gris via SMR), objectif 3 GW d'\u00e9lectrolyse d'ici 2030.`;

  curY = twoColumnText(doc, alLeft, alRight, 45, curY, 505, { fontSize: 7.5 });

  // Air Liquide financials table
  curY = chaoticTable(doc, ['Indicateur', '2021', '2022', '2023', 'Objectif 2030'], [
    ['CA total (Md\u20ac)', '23,3', '29,9', '27,6', '~35-40'],
    ['dont H2 (Md\u20ac)', '~2,5', '~3,1', '~3,4', '~8-10'],
    ['CAPEX H2 (Md\u20ac)', '0,4', '0,8', '1,2', '~1,5/an'],
    ['Capacit\u00e9 \u00e9lec. (MW)', '50', '120', '280', '3.000'],
    ['Effectifs monde', '66.400', '67.100', '67.000', '~72.000'],
    ['Stations HRS', '120', '160', '200', '600+'],
    ['Brevet H2 (cumul)', '450', '520', '610', '~1.000'],
  ], 50, curY, { colWidth: 98, fontSize: 6.5 });

  curY += 15;

  // McPhy section
  doc.fontSize(11).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text('2. McPHY ENERGY S.A. — Pure player \u00e9lectrolyseurs', 45, curY);
  curY += 18;

  ocrArtifacts(doc, 50, curY);
  curY += 12;

  const mcphyText = `McPHY ENERGY S.A., soci\u00e9t\u00e9 anonyme au capital de 47.214.478 euros, si\u00e8ge social: 39 rue du Dauphin\u00e9, Grenoble Alpes M\u00e9tropole, ZAC de Centr'Alp, 38430 Moirans, immatricul\u00e9e au RCS de Grenoble sous le n\u00b0 504 584 583, cot\u00e9e Euronext Paris (MCPHY, FR0011742329).

ACTIVIT\u00c9: Conception et fabrication d'\u00e9lectrolyseurs alcalins et PEM pour la production d'hydrog\u00e8ne vert. Gamme de 0,4 MW \u00e0 100+ MW.

EFFECTIFS: ~200 collaborateurs (au 31/12/2023), en croissance depuis l'introduction en bourse (80 employ\u00e9s en 2019).

DONN\u00c9ES FINANCI\u00c8RES 2023: CA: 18,2 M\u20ac (+45% vs 2022, mais base faible) | Perte nette: -42 M\u20ac (phase d'investissement) | Tr\u00e9sorerie: 95 M\u20ac (post augmentation de capital 2022 soutenue par EDF via sa filiale EDF Pulse Croissance) | Carnet de commandes: 68 M\u20ac.

PROJET PHARE: Gigafactory d'\u00e9lectrolyseurs de Belfort (France 2030) — capacit\u00e9 cible: 1 GW/an | Investissement: ~120 M\u20ac (dont ~55 M\u20ac de subventions France 2030 / ADEME / R\u00e9gion BFC) | Mise en service progressive: 2024-2025 | Cr\u00e9ation d'emplois: 500 postes directs \u00e0 terme.

QUALIFICATION: B\u00e9n\u00e9ficiaire du programme France 2030 — fili\u00e8re hydrog\u00e8ne d\u00e9carbon\u00e9. Partenariats: EDF (actionnaire), Engie (contrat d'approvisionnement), Total Energies (projets stations). ATTENTION: entreprise de petite taille (~200 employ\u00e9s) mais en forte croissance, positionn\u00e9e sur un march\u00e9 strat\u00e9gique.`;

  doc.fontSize(7.5).font('Helvetica').fill('#333333');
  doc.text(poisonText(mcphyText), 45, curY, { width: 505, align: 'justify', lineGap: 0.8 });
  curY = doc.y + 10;

  // --- Page 2: Lhyfe + HDF ---
  doc.addPage();
  addNoise(doc, 595, 842);
  curY = 50;

  // Lhyfe section
  doc.fontSize(11).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text('3. LHYFE S.A. — Producteur d\'hydrog\u00e8ne vert renouvelable', 45, curY);
  curY += 20;

  // Deliberate layout confusion: fake page number overlapping
  doc.save();
  doc.fontSize(42).font('Helvetica-Bold').opacity(0.04).fill('#000000');
  doc.text('3', 520, 40, { lineBreak: false });
  doc.opacity(1);
  doc.restore();

  const lhyfeLeft = `LHYFE S.A.
Si\u00e8ge social: 8 boulevard de la Loire, 44200 Nantes
RCS Nantes 850 415 290 | ISIN: FR0014009YQ1
Code NAF: 2011Z — Fabrication de gaz industriels
Fond\u00e9e en 2017 par Matthieu Guesné
Introduction en bourse: Euronext Paris, mai 2022 (\u00e0 8,75\u20ac/action, capitalisation initiale ~700 M\u20ac)
Cours au 30/09/2024: 2,85\u20ac (capitalisation ~220 M\u20ac)

EFFECTIFS: ~200 collaborateurs (167 fin 2022, 196 fin 2023)
CA 2023: 2,8 M\u20ac (en d\u00e9marrage, vs 0,8 M\u20ac en 2022)
Perte nette 2023: -48 M\u20ac
Tr\u00e9sorerie: 115 M\u20ac (lev\u00e9e IPO + AK subséquentes)`;

  const lhyfeRight = `MOD\u00c8LE D'AFFAIRES: Production d'hydrog\u00e8ne vert \u00e0 partir d'\u00e9nergies renouvelables (ENR) — \u00e9olien terrestre et offshore, solaire. Mod\u00e8le int\u00e9gr\u00e9: d\u00e9veloppement de sites de production + exploitation + commercialisation.

SITES OP\u00c9RATIONNELS ET EN CONSTRUCTION:
\u2022 Bouin (Vend\u00e9e): 1er site, 0,5 MW, op\u00e9rationnel 2021
\u2022 Buléon (Morbihan): 5 MW, op. 2023
\u2022 Schwäbisch Gmünd (Allemagne): 10 MW, op. 2024
\u2022 Delfzijl (Pays-Bas): 10 MW, op. 2024
\u2022 Projet offshore SEM-REV (Le Croisic): 1er \u00e9lectrolyseur offshore mondial, prototype 1 MW en partenariat avec \u00c9cole Centrale de Nantes
\u2022 Pipeline de projets: ~9,8 GW annonc\u00e9s \u00e0 horizon 2030 (dont ~3 GW en phase avanc\u00e9e de d\u00e9veloppement)

FRANCE 2030: Lhyfe est b\u00e9n\u00e9ficiaire de plusieurs appels \u00e0 projets (IPCEI Hy2Tech, IPCEI Hy2Use) pour un montant total de subventions estim\u00e9 \u00e0 ~45 M\u20ac.`;

  curY = twoColumnText(doc, lhyfeLeft, lhyfeRight, 45, curY, 505, { fontSize: 7.5 });
  curY += 15;

  // HDF Energy
  doc.fontSize(11).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text('4. HDF ENERGY S.A. — Centrales \u00e9lectriques hydrog\u00e8ne', 45, curY);
  curY += 20;

  const hdfText = `HDF ENERGY S.A. (Hydrog\u00e8ne de France), soci\u00e9t\u00e9 anonyme au capital de 1.245.600 euros, si\u00e8ge social: 24 rue Marc Sangnier, 33130 B\u00e8gles (m\u00e9tropole de Bordeaux), RCS Bordeaux 834 498 912, cot\u00e9e sur Euronext Paris depuis juin 2021 (HDF, FR0014003FE9).

ACTIVIT\u00c9: D\u00e9veloppement de centrales \u00e9lectriques de haute puissance utilisant l'hydrog\u00e8ne comme vecteur de stockage d'\u00e9nergie renouvelable (concept « Renewstable\u00ae »: ENR + \u00e9lectrolyseur + stockage H2 + pile \u00e0 combustible de forte puissance = fourniture d'\u00e9lectricit\u00e9 continue 24h/24, dispatchable, z\u00e9ro \u00e9mission).

EFFECTIFS: ~100 collaborateurs (au 31/12/2023). Note: entreprise de tr\u00e8s petite taille, en phase de d\u00e9veloppement pr\u00e9-industriel.

DONN\u00c9ES FINANCI\u00c8RES 2023: CA: 4,1 M\u20ac (principalement \u00e9tudes et d\u00e9veloppement) | Perte nette: -18 M\u20ac | Tr\u00e9sorerie: 42 M\u20ac | Valorisation boursi\u00e8re au 30/09/2024: ~65 M\u20ac (cours: 5,20\u20ac, en baisse de -72% depuis l'IPO \u00e0 18,75\u20ac)

PROJETS EN D\u00c9VELOPPEMENT:
\u2022 CEOG (Guyane fran\u00e7aise): 55 MW renouvelable + 16 MWh stockage H2, 1\u00e8re centrale Renewstable\u00ae au monde, construction en cours, op\u00e9rationnelle 2025, aliment\u00e9e par ferme solaire de 55 MWc, pile \u00e0 combustible de 3 MW
\u2022 Projet Mer de Chine (Australie): 800 MW — phase de faisabilit\u00e9
\u2022 Projet en Namibie: 1,2 GW — MoU sign\u00e9 avec le gouvernement
\u2022 Projet en Barbade: 16 MW — accord de gr\u00e9 \u00e0 gr\u00e9 sign\u00e9 avec BL&P

AVERTISSEMENT: HDF Energy est une micro-entreprise (\u22640,1k salari\u00e9s) avec un CA tr\u00e8s faible (<5 M\u20ac). Le pipeline de projets est ambitieux mais la capacit\u00e9 d'ex\u00e9cution reste \u00e0 d\u00e9montrer. Les projets internationaux sont soumis \u00e0 des risques pays et de financement \u00e9lev\u00e9s.`;

  doc.fontSize(7.5).font('Helvetica').fill('#333333');
  doc.text(poisonText(hdfText), 45, curY, { width: 505, align: 'justify', lineGap: 0.8 });
  curY = doc.y + 15;

  // Comparative table
  doc.fontSize(10).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text('5. TABLEAU COMPARATIF — Acteurs hydrog\u00e8ne France', 45, curY);
  curY += 16;

  curY = chaoticTable(doc, ['Entreprise', 'Si\u00e8ge', 'Effectifs', 'CA 2023', 'Sp\u00e9cialit\u00e9', 'Maturit\u00e9'], [
    ['Air Liquide', 'Paris', '67.000', '27,6 Md\u20ac', 'Gaz ind./H2 infra', 'Leader mondial'],
    ['McPhy Energy', 'Grenoble', '~200', '18 M\u20ac', '\u00c9lectrolyseurs', 'Scale-up'],
    ['Lhyfe', 'Nantes', '~200', '2,8 M\u20ac', 'Production H2 vert', 'D\u00e9marrage'],
    ['HDF Energy', 'Bordeaux', '~100', '4,1 M\u20ac', 'Centrales H2', 'Pr\u00e9-industriel'],
    ['Elogen (GTT)', 'Les Ulis', '~80', '8 M\u20ac', '\u00c9lectrolyseurs PEM', 'Scale-up'],
    ['Gen-Hy', 'Aix-en-Prov.', '~50', '2 M\u20ac', '\u00c9lectrolyseurs AEM', 'Start-up'],
    ['H2V Industry', 'Rouen', '~30', 'Pr\u00e9-CA', 'Prod. H2 grande \u00e9ch.', 'Projet'],
  ], 48, curY, { colWidth: 83, fontSize: 6 });

  curY += 15;

  // Second infographic description
  doc.fontSize(8).font('Helvetica-Bold').fill('#1a5c2a');
  doc.text(poisonText('[INFOGRAPHIE: R\u00e9partition g\u00e9ographique des projets hydrog\u00e8ne en France]'), 45, curY, { width: 505, align: 'center' });
  curY += 14;

  doc.fontSize(7).font('Helvetica').fill('#555555');
  const mapDesc = `Carte de France — Points d'implantation:
\u25cf \u00cele-de-France (3): Air Liquide (si\u00e8ge), Elogen/GTT (Les Ulis), Station HysetCo (Paris-Orly)
\u25cf Auvergne-Rh\u00f4ne-Alpes (4): McPhy (Grenoble), Atawey (Chambéry — stations), Symbio (Vénissieux — PàC auto), CEA-Liten (Grenoble — R&D)
\u25cf Pays de la Loire / Bretagne (2): Lhyfe (Nantes), Lhyfe offshore (Le Croisic / SEM-REV)
\u25cf Nouvelle-Aquitaine (2): HDF Energy (Bordeaux/Bègles), Hydrogène de France Guyane (Kourou — CEOG)
\u25cf Normandie (2): Air Liquide Normand'Hy (Le Havre, 200 MW PEM), H2V Normandy (Port-Jérôme)
\u25cf Bourgogne-Franche-Comté (2): McPhy Gigafactory (Belfort), FC Lab (Belfort — R&D piles à combustible)
\u25cf Occitanie (1): Genvia (Béziers — électrolyse haute température SOEC, JV CEA/Schlumberger)`;
  doc.text(poisonText(mapDesc), 45, curY, { width: 505, align: 'left' });
  curY = doc.y + 10;

  // Footer
  doc.fontSize(6).font('Courier').fill('#999999');
  doc.text(poisonText('France Hydrog\u00e8ne \u00a9 2024 | R\u00e9f: FH-CARTO-2024-v3.2 | Classification: Diffusion restreinte | Contact: secretariat@france-hydrogene.org'), 45, 790, { lineBreak: false });

  return writePromise(doc, filePath);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('Generating PDFs...');
  await Promise.all([
    genBankruptcy(),
    genAPEC(),
    genHydrogen(),
  ]);
  console.log('Done. Files:');
  const files = fs.readdirSync(OUT_DIR).filter(f => f.match(/^2[234]_/));
  files.forEach(f => {
    const stat = fs.statSync(path.join(OUT_DIR, f));
    console.log(`  ${f} — ${(stat.size / 1024).toFixed(1)} KB`);
  });
}

main().catch(err => { console.error(err); process.exit(1); });
