const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT, { recursive: true });

// ─── helpers ────────────────────────────────────────────────────────
function pipePDF(doc, filename) {
  const ws = fs.createWriteStream(path.join(OUT, filename));
  doc.pipe(ws);
  return new Promise((resolve, reject) => {
    ws.on('finish', resolve);
    ws.on('error', reject);
  });
}
function endPDF(doc) { doc.end(); }

// Renders text with inline superscript numbers like "some text¹²" —
// we break the string on patterns like [1], [2] etc and render the
// number in a tiny raised font so parsers have a hard time.
function richText(doc, text, opts = {}) {
  const x = opts.x || doc.x;
  let y = opts.y || doc.y;
  const fontSize = opts.fontSize || 9;
  const font = opts.font || 'Helvetica';
  const width = opts.width || 440;
  const lineHeight = opts.lineHeight || 1.25;
  const color = opts.color || '#1a1a1a';

  // Split into chunks: normal text and footnote refs like [1]
  const parts = text.split(/(\[\d+\])/g);
  doc.font(font).fontSize(fontSize).fillColor(color);

  // We'll just use doc.text for the whole thing but inject footnote
  // markers as tiny superscript fragments via a continued approach
  let first = true;
  for (const part of parts) {
    const fnMatch = part.match(/^\[(\d+)\]$/);
    if (fnMatch) {
      doc.font('Helvetica').fontSize(6).fillColor('#666666');
      doc.text(fnMatch[1], { continued: true, baseline: 'superscript' });
      doc.font(font).fontSize(fontSize).fillColor(color);
    } else if (part.length > 0) {
      const isLast = parts.indexOf(part) === parts.length - 1;
      doc.text(part, { continued: !isLast, width, lineGap: fontSize * (lineHeight - 1) });
    }
  }
}

// Adds a messy table with inconsistent borders
function messyTable(doc, headers, rows, opts = {}) {
  const x = opts.x || 60;
  let y = opts.y || doc.y + 8;
  const colWidths = opts.colWidths || headers.map(() => 110);
  const rowHeight = opts.rowHeight || 16;
  const fontSize = opts.fontSize || 7;

  // header row — filled background but slightly misaligned
  doc.save();
  let cx = x;
  headers.forEach((h, i) => {
    doc.rect(cx - 0.5, y - 1, colWidths[i] + 1, rowHeight + 2)
      .fillAndStroke('#d0d0d0', '#888888');
    doc.fillColor('#000000').font('Helvetica-Bold').fontSize(fontSize);
    doc.text(h, cx + 2, y + 2, { width: colWidths[i] - 4, lineBreak: false });
    cx += colWidths[i];
  });
  y += rowHeight + 2;

  // data rows — alternate incomplete borders
  rows.forEach((row, ri) => {
    cx = x;
    row.forEach((cell, ci) => {
      // Sometimes draw border, sometimes don't — visual noise
      if ((ri + ci) % 3 !== 0) {
        doc.rect(cx, y, colWidths[ci], rowHeight).stroke('#cccccc');
      }
      doc.fillColor('#1a1a1a').font('Helvetica').fontSize(fontSize);
      doc.text(String(cell), cx + 2, y + 3, {
        width: colWidths[ci] - 4,
        lineBreak: false,
      });
      cx += colWidths[ci];
    });
    y += rowHeight;
  });
  doc.restore();
  doc.y = y + 6;
  doc.x = x;
}

// Watermark-style diagonal background text (messes up OCR/text extraction)
function watermark(doc, text) {
  doc.save();
  doc.rotate(-40, { origin: [300, 500] });
  doc.fontSize(72).fillColor('#f0f0f0').font('Helvetica-Bold');
  doc.text(text, 50, 400, { width: 700 });
  doc.restore();
}

// Random legal-looking reference number
function refNum(prefix) {
  const n = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
  return `${prefix}-${n}`;
}

// ═══════════════════════════════════════════════════════════════════
// PDF 1: Telecom Market Study
// ═══════════════════════════════════════════════════════════════════
async function genTelecom() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 55, bottom: 50, left: 58, right: 55 },
    bufferPages: true,
  });
  const promise = pipePDF(doc, '16_telecom_market_study.pdf');

  // ── cover page ──
  watermark(doc, 'CONFIDENTIEL');
  doc.fontSize(11).fillColor('#888888').font('Helvetica');
  doc.text('Réf.: ETU-TEL-2025-FR-0042', 58, 55, { align: 'right' });
  doc.text('Classification: Diffusion Restreinte', { align: 'right' });
  doc.moveDown(5);
  doc.fontSize(26).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("ÉTUDE DE MARCHÉ", { align: 'center' });
  doc.fontSize(18).fillColor('#1a3f6f');
  doc.text("Secteur des Télécommunications en France", { align: 'center' });
  doc.text("Analyse Concurrentielle & Perspectives 2025-2030", { align: 'center' });
  doc.moveDown(3);
  doc.fontSize(10).fillColor('#555555').font('Helvetica');
  doc.text("Préparé par : Direction de la Stratégie & Veille Concurrentielle", { align: 'center' });
  doc.text("Date de publication : 18 avril 2025", { align: 'center' });
  doc.text("Version 3.2 — Révision finale", { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(7).fillColor('#999999');
  doc.text("Ce document contient des informations confidentielles et propriétaires. Toute reproduction, même partielle, est interdite sans l'accord préalable écrit de l'éditeur. Les données présentées proviennent de sources jugées fiables mais ne sauraient engager la responsabilité des auteurs.", { align: 'center', width: 350, indent: 75 });

  // ── Table of Contents ──
  doc.addPage();
  doc.fontSize(16).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("TABLE DES MATIÈRES", 58, 60);
  doc.moveDown(0.8);
  const tocEntries = [
    ['1.', 'Résumé Exécutif', '3'],
    ['2.', 'Méthodologie et Sources', '4'],
    ['  2.1', 'Approche quantitative', '4'],
    ['  2.2', 'Limites de l\'étude', '5'],
    ['3.', 'Vue d\'ensemble du marché français des télécoms', '6'],
    ['4.', 'Profils des acteurs majeurs', '7'],
    ['  4.1', 'Orange SA', '7'],
    ['  4.2', 'Nokia France', '9'],
    ['  4.3', 'Bouygues Telecom', '10'],
    ['5.', 'Analyse SWOT croisée', '12'],
    ['6.', 'Tendances et perspectives', '13'],
    ['7.', 'Bibliographie et sources', '14'],
    ['', 'Annexe A — Glossaire technique', '15'],
    ['', 'Annexe B — Données financières détaillées', '16'],
  ];
  tocEntries.forEach(([num, title, page]) => {
    doc.font('Helvetica').fontSize(9).fillColor('#333333');
    const leader = '.'.repeat(Math.max(2, 60 - title.length - num.length));
    doc.text(`${num} ${title} ${leader} ${page}`, { indent: num.startsWith(' ') ? 20 : 0 });
  });

  // ── Executive Summary ──
  doc.addPage();
  doc.fontSize(14).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("1. RÉSUMÉ EXÉCUTIF");
  doc.moveDown(0.6);
  richText(doc, "Le marché français des télécommunications représente un secteur stratégique en pleine mutation, porté par le déploiement massif de la 5G et la fibre optique (FTTH). Avec un chiffre d'affaires combiné supérieur à 55 milliards d'euros pour les principaux opérateurs[1], le secteur emploie directement plus de 200 000 personnes et génère un effet multiplicateur significatif sur l'ensemble de l'économie numérique[2]. Les investissements cumulés dans les infrastructures de réseau ont dépassé 14 milliards d'euros en 2024, un niveau historique soutenu par les obligations réglementaires de l'ARCEP et les ambitions du Plan France Très Haut Débit[3].");
  doc.moveDown(0.6);
  richText(doc, "Cette étude analyse en détail les trois acteurs clés identifiés — Orange SA, Nokia France et Bouygues Telecom — en examinant leurs positionnements stratégiques, leurs investissements en R&D, leurs politiques de recrutement et leurs perspectives de croissance à l'horizon 2030. Les données présentées sont issues de sources publiques (rapports annuels, publications ARCEP, données INSEE) et d'entretiens qualitatifs avec des experts du secteur (cf. section 2 pour la méthodologie détaillée)[4].");

  // ── Methodology (boring filler) ──
  doc.addPage();
  doc.fontSize(14).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("2. MÉTHODOLOGIE ET SOURCES");
  doc.moveDown(0.5);
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a3f6f');
  doc.text("2.1 Approche quantitative");
  doc.moveDown(0.4);
  richText(doc, "L'approche méthodologique retenue pour cette étude repose sur un cadre d'analyse mixte combinant des données quantitatives issues de sources primaires et secondaires. Les données financières ont été extraites des rapports annuels et documents de référence déposés auprès de l'Autorité des Marchés Financiers (AMF) pour les exercices 2022, 2023 et 2024. Les données relatives à l'emploi proviennent des Déclarations Annuelles de Données Sociales (DADS) croisées avec les informations publiées par les entreprises dans leurs rapports RSE. Les données de couverture réseau sont celles publiées par l'ARCEP dans le cadre de l'Observatoire du Haut et du Très Haut Débit[5].");
  doc.moveDown(0.4);
  richText(doc, "Les projections à l'horizon 2030 s'appuient sur un modèle économétrique intégrant les variables suivantes : taux de pénétration de la fibre (actuellement à 67% des locaux raccordables), rythme de déploiement de la 5G (27 500 sites actifs à fin 2024), évolution du revenu moyen par abonné (ARPU), et investissements prévisionnels communiqués par les opérateurs[6]. Le modèle a été calibré sur les données historiques 2015-2024 avec un coefficient de détermination R² de 0.94.");
  doc.moveDown(0.4);
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#1a3f6f');
  doc.text("2.2 Limites de l'étude");
  doc.moveDown(0.4);
  richText(doc, "Il convient de noter que les données relatives aux sous-traitants et aux emplois indirects ne sont pas exhaustives, ces informations n'étant pas systématiquement publiées par les entreprises concernées. Par ailleurs, l'évolution réglementaire rapide du secteur (enchères 5G, régulation des marchés de gros, obligations de couverture des zones blanches) introduit une incertitude structurelle dans les projections de moyen terme. Les résultats doivent donc être interprétés comme des scénarios indicatifs et non des prévisions déterministes[7].");

  // Filler paragraph with cross-references
  doc.moveDown(0.4);
  richText(doc, "Note méthodologique complémentaire : les taux de change utilisés pour les comparaisons internationales sont ceux de la BCE au 31 décembre 2024 (1 EUR = 1.08 USD). Les classifications sectorielles suivent la nomenclature NAF rév. 2 de l'INSEE, code 61 « Télécommunications ». Les données de brevets sont issues de la base PATSTAT de l'Office Européen des Brevets (OEB), interrogée en mars 2025[8].");

  // ── Market overview with a messy table ──
  doc.addPage();
  doc.fontSize(14).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("3. VUE D'ENSEMBLE DU MARCHÉ");
  doc.moveDown(0.5);
  richText(doc, "Le tableau ci-dessous présente une synthèse des indicateurs clés pour les principaux acteurs analysés. Les données sont exprimées en millions d'euros sauf indication contraire. (Source : rapports annuels 2024, retraités par les auteurs.)[9]");
  doc.moveDown(0.8);

  messyTable(doc,
    ['Entreprise', 'Secteur', 'Siège', 'Effectifs', 'CA (M€)', 'Investissements 5G'],
    [
      ['Orange SA', 'Opérateur intégré', 'Paris (75)', '~136 000', '43 500', '3 200 (est.)'],
      ['Nokia France', 'Équipementier', 'Nozay / Paris-Saclay', '~4 500', 'N/C (filiale)', '850 (R&D)'],
      ['Bouygues Telecom', 'Opérateur mobile/fixe', 'Paris (75)', '~9 700', '7 800', '1 100'],
    ],
    { colWidths: [85, 75, 80, 65, 65, 85], rowHeight: 22 }
  );

  doc.moveDown(0.4);
  doc.fontSize(7).fillColor('#888888').font('Helvetica');
  doc.text("Note : Les effectifs sont donnés en équivalent temps plein (ETP). N/C = non communiqué séparément. Les investissements 5G incluent CAPEX réseau et R&D associée.", { width: 440 });

  // ── Company profiles ──
  // -- Orange --
  doc.addPage();
  watermark(doc, 'DRAFT');
  doc.fontSize(14).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("4. PROFILS DES ACTEURS MAJEURS");
  doc.moveDown(0.3);
  doc.fontSize(12).fillColor('#e05200').font('Helvetica-Bold');
  doc.text("4.1 Orange SA");
  doc.moveDown(0.3);

  // Mini info box with overlapping fields
  doc.save();
  doc.rect(58, doc.y, 460, 80).fillAndStroke('#faf5ee', '#d4a574');
  doc.fillColor('#333333').font('Helvetica').fontSize(8);
  const boxy = doc.y + 6;
  doc.text("Raison sociale : Orange SA", 65, boxy);
  doc.text("Forme juridique : SA à Conseil d'Administration | RCS Paris 380 129 866", 65, boxy + 11);
  doc.text("Siège social : 111, quai du Président Roosevelt – 92130 Issy-les-Moulineaux", 65, boxy + 22);
  doc.text("Secteur d'activité : Télécommunications (NAF 61.10Z) | Opérateur de réseau intégré", 65, boxy + 33);
  doc.text("Effectifs monde : ~136 000 collaborateurs (dont ~75 000 en France) | CA 2024 : 43,5 Mds EUR", 65, boxy + 44);
  doc.text("Président-Directeur Général : Christel Heydemann (depuis avril 2022)", 65, boxy + 55);
  doc.restore();
  doc.y = boxy + 85;

  doc.moveDown(0.4);
  richText(doc, "Orange est le premier opérateur de télécommunications en France et l'un des principaux en Europe, avec des opérations dans 26 pays. Le groupe est issu de la privatisation de France Télécom et a adopté la marque Orange en 2013. Son chiffre d'affaires 2024 s'établit à 43,5 milliards d'euros[10], en croissance organique de 2,1% par rapport à 2023. Le résultat d'exploitation (EBITDAaL) atteint 13,3 milliards d'euros, confirmant la trajectoire de marge ascendante initiée par le plan stratégique « Lead the Future 2030 »[11].");
  doc.moveDown(0.4);
  richText(doc, "Le déploiement de la 5G constitue un axe stratégique majeur pour Orange, qui a investi massivement dans l'acquisition de fréquences (3,5 GHz, 700 MHz) et le déploiement d'un réseau 5G standalone (5G SA) depuis 2024. À fin mars 2025, Orange couvre 85% de la population française en 5G et prévoit d'atteindre 95% fin 2026[12]. Le rollout 5G s'accompagne d'un programme ambitieux de fiber optic deployment : 35 millions de prises raccordables à fin 2024, avec l'objectif de 38 millions à fin 2026, incluant les zones rurales couvertes par les Réseaux d'Initiative Publique (RIP)[13].");
  doc.moveDown(0.4);
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#0d2b52');
  doc.text("Politique de recrutement et compétences clés");
  doc.moveDown(0.3);
  richText(doc, "Orange poursuit une politique active de recrutement, en particulier pour accompagner le déploiement de la 5G et de la fibre. Le groupe prévoit d'embaucher environ 5 000 personnes en France en 2025, dont une proportion significative de network engineers (ingénieurs réseau). Les profils les plus recherchés incluent : ingénieurs en planification radio, experts en cœur de réseau 5G (5GC), architectes NFV/SDN, data scientists spécialisés en optimisation de réseau, et techniciens d'intervention fibre optique. Orange a par ailleurs renforcé ses partenariats avec les écoles d'ingénieurs (Télécom Paris, INSA Lyon, ENSEA) et lance en 2025 la « Orange Digital Academy » pour former 2 000 reconversions internes en compétences cloud et cybersécurité[14].");

  // -- Nokia France --
  doc.addPage();
  doc.fontSize(12).fillColor('#124191').font('Helvetica-Bold');
  doc.text("4.2 Nokia France SAS");
  doc.moveDown(0.3);

  doc.save();
  doc.rect(58, doc.y, 460, 68).fillAndStroke('#eef2f8', '#7a9cc6');
  doc.fillColor('#333333').font('Helvetica').fontSize(8);
  const nky = doc.y + 6;
  doc.text("Raison sociale : Nokia France SAS (ex-Alcatel-Lucent France)", 65, nky);
  doc.text("Siège : Centre de Paris-Saclay — Route de Villejust, 91620 Nozay", 65, nky + 11);
  doc.text("Effectifs France : ~4 500 salariés | Activité : Équipements de réseaux télécoms, R&D", 65, nky + 22);
  doc.text("Maison mère : Nokia Corporation (Helsinki) | CA groupe : 22,3 Mds EUR (2024)", 65, nky + 33);
  doc.text("Centre R&D : Bell Labs France (Nozay) — 1 200+ chercheurs et ingénieurs", 65, nky + 44);
  doc.restore();
  doc.y = nky + 72;

  doc.moveDown(0.4);
  richText(doc, "Nokia France, héritière d'Alcatel-Lucent, constitue l'un des principaux centres de R&D du groupe Nokia au niveau mondial. Le site de Nozay/Paris-Saclay héberge les Bell Labs France, laboratoire de recherche de renommée internationale qui a contribué à de nombreuses avancées dans le domaine des télécommunications[15]. Les activités françaises couvrent principalement le développement d'équipements 5G (stations de base AirScale, solutions de transport optique, plateformes de gestion de réseau), ainsi que la recherche fondamentale en photonique, intelligence artificielle appliquée aux réseaux, et technologies 6G[16].");
  doc.moveDown(0.4);
  richText(doc, "Nokia France emploie environ 4 500 personnes, essentiellement des ingénieurs et chercheurs de haut niveau. Le centre de Nozay est spécialisé dans la R&D 5G equipment et les systèmes de réseau optique, tandis que les sites de Lannion (Côtes-d'Armor) et Villarceaux (Essonne) contribuent respectivement aux solutions d'accès fixe et aux plateformes de routage IP[17]. Malgré les restructurations successives (plan de réduction de 14 000 postes mondial annoncé fin 2023), le site français reste considéré comme stratégique par la direction du groupe, bénéficiant du Crédit Impôt Recherche (CIR) et de subventions au titre de France 2030[18].");

  // -- Bouygues Telecom --
  doc.addPage();
  doc.fontSize(12).fillColor('#003da5').font('Helvetica-Bold');
  doc.text("4.3 Bouygues Telecom SA");
  doc.moveDown(0.3);

  doc.save();
  doc.rect(58, doc.y, 460, 56).fillAndStroke('#eef5ff', '#6699cc');
  doc.fillColor('#333333').font('Helvetica').fontSize(8);
  const bty = doc.y + 6;
  doc.text("Filiale à 90,5% du groupe Bouygues | Siège : 37-39 rue Boissière, 75116 Paris", 65, bty);
  doc.text("Effectifs : ~9 700 collaborateurs | CA 2024 : 7,8 Mds EUR (+4% vs 2023)", 65, bty + 11);
  doc.text("Activité : Opérateur mobile (5G/4G), fixe (fibre, xDSL), B2B, entreprises", 65, bty + 22);
  doc.text("Réseau : 28 000 sites mobiles, accords de mutualisation avec SFR (zones rurales)", 65, bty + 33);
  doc.restore();
  doc.y = bty + 60;

  doc.moveDown(0.4);
  richText(doc, "Bouygues Telecom, troisième opérateur mobile français, s'est positionné comme un acteur dynamique de la network modernization ces dernières années. Le chiffre d'affaires 2024 atteint 7,8 milliards d'euros[19], en progression de 4% sur un an, porté par la croissance du fixe (fibre) et les services aux entreprises. Le groupe emploie 9 700 personnes et bénéficie de synergies industrielles avec les autres filiales du groupe Bouygues (Bouygues Construction, Colas, TF1)[20].");
  doc.moveDown(0.4);
  richText(doc, "La stratégie de modernisation réseau de Bouygues Telecom repose sur trois piliers : (i) le déploiement accéléré de la 5G avec un objectif de couverture de 80% de la population à fin 2025, (ii) la migration vers un cœur de réseau virtualisé (cloud-native 5G core) développé en partenariat avec Ericsson, et (iii) le renforcement du réseau fixe fibre dans le cadre des co-investissements avec Orange et les opérateurs d'infrastructures comme Axione et Altitude Infrastructure[21]. Bouygues Telecom a par ailleurs acquis une part significative du spectre 3,5 GHz lors des enchères de l'ARCEP, pour un montant de 602 millions d'euros[22].");

  // ── SWOT ──
  doc.addPage();
  doc.fontSize(14).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("5. ANALYSE SWOT CROISÉE");
  doc.moveDown(0.6);
  // Render a messy SWOT as overlapping boxes
  messyTable(doc,
    ['', 'Orange SA', 'Nokia France', 'Bouygues Telecom'],
    [
      ['Forces', 'Taille critique, 136k ETP, marque forte', 'Bell Labs R&D, brevets 5G', 'Agilité, synergie groupe'],
      ['Faiblesses', 'Lourdeur organisationnelle, dette', 'Dépendance aux CAPEX opérateurs', 'Taille limitée, couverture rurale'],
      ['Opportunités', '5G rollout, fibre FTTH, cybersécurité', 'Open RAN, 6G, réseaux privés', 'Convergence fixe-mobile, B2B'],
      ['Menaces', 'OTT, guerre des prix, régulation', 'Concurrence Huawei/Samsung', 'Consolidation marché, MNO debt'],
    ],
    { colWidths: [75, 135, 130, 120], rowHeight: 28, fontSize: 6.5 }
  );

  // ── Bibliography / footnotes ──
  doc.addPage();
  doc.fontSize(14).fillColor('#0d2b52').font('Helvetica-Bold');
  doc.text("7. BIBLIOGRAPHIE ET SOURCES");
  doc.moveDown(0.5);
  const refs = [
    "[1] ARCEP, Observatoire des marchés des communications électroniques, T4 2024.",
    "[2] Fédération Française des Télécoms, Étude d'impact économique du secteur, mars 2025.",
    "[3] Mission France Très Haut Débit, Rapport annuel d'avancement, février 2025.",
    "[4] Entretiens qualitatifs réalisés entre janvier et mars 2025 (n=12 experts).",
    "[5] ARCEP, Tableaux de bord du très haut débit, données au 31/12/2024.",
    "[6] Orange SA, Document d'enregistrement universel 2024, pp. 87-92.",
    "[7] Avis du comité scientifique de l'étude, annexe méthodologique, p. 42.",
    "[8] European Patent Office, PATSTAT Global, extraction du 15/03/2025.",
    "[9] Compilation des auteurs à partir des rapports annuels 2024 des entreprises.",
    "[10] Orange SA, Communiqué de presse — Résultats annuels 2024, 13/02/2025.",
    "[11] Orange SA, Plan stratégique « Lead the Future 2030 », présentation investisseurs, juin 2024.",
    "[12] ANFR, Observatoire 5G, données au 31/03/2025.",
    "[13] Orange SA, Document d'enregistrement universel 2024, section 5.3 « Déploiement fibre ».",
    "[14] Orange SA, Rapport RSE 2024, section « Capital humain », pp. 34-39.",
    "[15] Nokia Corporation, Annual Report 2024, R&D section.",
    "[16] Bell Labs, Research Publications Index, 2024.",
    "[17] Nokia France, Bilan social 2024, déposé au greffe du tribunal de commerce d'Évry.",
    "[18] France 2030, Liste des projets soutenus, catégorie « Réseaux du futur », MàJ 01/2025.",
    "[19] Bouygues SA, Document d'enregistrement universel 2024, comptes consolidés.",
    "[20] Bouygues Telecom, Rapport social 2024.",
    "[21] Bouygues Telecom, Communiqué de presse — Stratégie réseau 2025-2028, sept. 2024.",
    "[22] ARCEP, Résultats des enchères 3,5 GHz, décision n°2020-1081.",
  ];
  refs.forEach(r => {
    doc.font('Helvetica').fontSize(7).fillColor('#444444');
    doc.text(r, { width: 440, lineGap: 2 });
  });

  endPDF(doc); await promise;
  console.log('  => 16_telecom_market_study.pdf');
}


// ═══════════════════════════════════════════════════════════════════
// PDF 2: Rail Transport Tenders
// ═══════════════════════════════════════════════════════════════════
async function genRail() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 45, left: 55, right: 50 },
    bufferPages: true,
  });
  const promise = pipePDF(doc, '17_rail_transport_tenders.pdf');

  // ── Header block with multiple overlapping identifiers ──
  doc.save();
  doc.rect(0, 0, 595, 95).fill('#002855');
  doc.fontSize(9).fillColor('#ffffff').font('Helvetica');
  doc.text("RÉPUBLIQUE FRANÇAISE", 55, 14, { align: 'center' });
  doc.fontSize(7).fillColor('#bbbbbb');
  doc.text("Liberté • Égalité • Fraternité", { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(14).fillColor('#ffffff').font('Helvetica-Bold');
  doc.text("AVIS D'APPEL PUBLIC À LA CONCURRENCE", { align: 'center' });
  doc.fontSize(8).fillColor('#cccccc').font('Helvetica');
  doc.text("Marchés publics de fournitures et services — Secteur Ferroviaire", { align: 'center' });
  doc.restore();

  doc.y = 105;
  doc.x = 55;

  // Reference box — overlapping fields, mixed date formats
  doc.save();
  doc.rect(55, 105, 480, 70).fillAndStroke('#f7f7f7', '#999999');
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("N° de marché :", 62, 112);
  doc.font('Courier').fontSize(8).fillColor('#000000');
  doc.text("AO-2025-SNCF-SIG-042", 140, 112);
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("Réf. interne :", 300, 112);
  doc.font('Courier').fontSize(7);
  doc.text("SNCFR/DSI/MOD/2025/042-A", 370, 112);

  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("Date de publication :", 62, 125);
  doc.font('Helvetica').fontSize(7).fillColor('#000000');
  doc.text("18/04/2025", 155, 125);
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("Date limite de réception :", 300, 125);
  doc.font('Helvetica').fontSize(7);
  doc.text("2025-06-30 à 12:00 (heure de Paris)", 420, 125);

  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("Pouvoir adjudicateur :", 62, 138);
  doc.font('Helvetica').fontSize(7).fillColor('#000000');
  doc.text("SNCF Réseau — Direction de la Signalisation Ferroviaire", 165, 138);
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("SIRET :", 62, 150);
  doc.font('Courier').fontSize(7);
  doc.text("412 280 737 00013", 100, 150);
  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("Code CPV :", 300, 150);
  doc.font('Courier').fontSize(7);
  doc.text("34632000-6 (Équipement de signalisation ferroviaire)", 355, 150);

  doc.font('Helvetica-Bold').fontSize(7).fillColor('#333333');
  doc.text("Procédure :", 62, 162);
  doc.font('Helvetica').fontSize(7);
  doc.text("Appel d'offres ouvert (art. L2124-2 du Code de la commande publique)", 115, 162);
  doc.restore();

  doc.y = 185;

  // ── Legal boilerplate ──
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 1 — OBJET DU MARCHÉ", 55, doc.y);
  doc.moveDown(0.3);
  richText(doc, "1.1. Le présent marché a pour objet la fourniture, l'installation, les essais et la mise en service de systèmes de signalisation ferroviaire conformes à la spécification ERTMS (European Rail Traffic Management System) niveau 2, incluant les sous-systèmes ETCS (European Train Control System) embarqué et sol, ainsi que les composants GSM-R/FRMCS associés, pour le programme de modernisation de la signalisation du réseau ferré national français[1].");
  doc.moveDown(0.3);
  richText(doc, "1.2. Le périmètre géographique couvre les lignes suivantes : LGV Sud-Est (Paris—Lyon, 409 km), LGV Atlantique (Paris—Tours, 302 km), et la section Paris—Lille de la LGV Nord (214 km). Le calendrier prévisionnel s'étend de janvier 2026 à décembre 2030, avec une phase pilote sur la section Pasilly—Aisy (LGV Sud-Est) prévue au S1 2026[2].");
  doc.moveDown(0.3);
  richText(doc, "1.3. La valeur estimée du marché, hors options et reconductions, est comprise entre 800 000 000 EUR et 1 200 000 000 EUR HT. Le marché est décomposé en 4 lots (cf. Article 3).");

  // ── More legal clauses ──
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 2 — CONDITIONS DE PARTICIPATION");
  doc.moveDown(0.3);
  richText(doc, "2.1. Peuvent soumissionner les opérateurs économiques, y compris les groupements d'entreprises (conjoints ou solidaires), justifiant des capacités techniques et financières requises. Les candidats doivent démontrer :");
  doc.moveDown(0.2);
  richText(doc, "   a) Une expérience vérifiable dans la réalisation de projets ERTMS niveau 2 d'une valeur minimale de 100 M EUR chacun, sur au moins 3 références au cours des 8 dernières années ;");
  richText(doc, "   b) La certification SIL 4 (Safety Integrity Level) selon la norme EN 50129 pour les équipements de signalisation proposés ;");
  richText(doc, "   c) Un chiffre d'affaires annuel moyen sur les 3 derniers exercices supérieur ou égal à 500 M EUR dans le domaine de la signalisation ferroviaire ;");
  richText(doc, "   d) La conformité aux normes ASPICE (Automotive SPICE) niveau 3 ou équivalent pour les processus de développement logiciel embarqué.");

  // ── Lots table ──
  doc.addPage();
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 3 — ALLOTISSEMENT", 55, 55);
  doc.moveDown(0.5);

  messyTable(doc,
    ['Lot', 'Désignation', 'Estimation HT', 'Durée'],
    [
      ['1', 'ETCS sol — Équipements fixes (balises, LEU, RBC)', '350-500 M EUR', '48 mois'],
      ['2', 'ETCS embarqué — Équipements véhicules (EVC, ODO, DMI)', '200-350 M EUR', '42 mois'],
      ['3', 'Télécommunications GSM-R/FRMCS — Infrastructure radio', '150-200 M EUR', '36 mois'],
      ['4', 'Intégration système, essais et mise en service', '100-150 M EUR', '54 mois'],
    ],
    { colWidths: [35, 200, 100, 65], rowHeight: 24, fontSize: 7 }
  );

  // ── Company context blocks (embedded in tender) ──
  doc.moveDown(0.6);
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 4 — CONTEXTE TECHNIQUE ET INTERVENANTS IDENTIFIÉS");
  doc.moveDown(0.3);
  richText(doc, "4.1. À titre d'information, le pouvoir adjudicateur signale que les études préliminaires ont été menées en concertation avec les acteurs industriels suivants, qui sont susceptibles de soumissionner (liste non exhaustive, fournie à titre indicatif et sans préjudice de la mise en concurrence) :");

  // -- SNCF Réseau --
  doc.moveDown(0.4);
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#003366');
  doc.text("4.1.1 SNCF Réseau (Pouvoir adjudicateur)");
  doc.moveDown(0.2);
  richText(doc, "SNCF Réseau, établissement public à caractère industriel et commercial (EPIC), est le gestionnaire de l'infrastructure ferroviaire nationale. Avec environ 50 000 collaborateurs, l'établissement est responsable de l'entretien, de la modernisation et du développement des 28 000 km de lignes du réseau ferré national, dont 2 800 km de lignes à grande vitesse[3]. Le programme de modernisation de la signalisation ERTMS constitue l'un des investissements les plus importants de SNCF Réseau pour la décennie 2025-2035, avec un budget global estimé à 4,5 milliards d'euros. SNCF Réseau recrute activement plus de 300 ingénieurs spécialisés en signalisation ferroviaire, systèmes embarqués, safety engineering (CENELEC), et gestion de projet pour accompagner ce programme[4].");

  // -- Alstom --
  doc.moveDown(0.5);
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#003366');
  doc.text("4.1.2 Alstom SA");
  doc.moveDown(0.2);

  doc.save();
  doc.rect(55, doc.y, 480, 52).fillAndStroke('#f0f4f7', '#8899aa');
  doc.fillColor('#333333').font('Helvetica').fontSize(7);
  const ay = doc.y + 5;
  doc.text("Siège social : 48 rue Albert Dhalenne, 93400 Saint-Ouen-sur-Seine | SIREN 389 058 447", 62, ay);
  doc.text("Effectifs monde : ~80 000 | CA 2024/25 : 17,6 Mds EUR | Carnet de commandes : 91,9 Mds EUR", 62, ay + 11);
  doc.text("Activités clés : Matériel roulant (TGV M, Avelia, Coradia), Signalisation (ERTMS/ETCS, CBTC), Services", 62, ay + 22);
  doc.text("Certifications : IRIS/ISO 22163, ASPICE Level 3, EN 50128/50129/50126 (SIL 4), ISO 9001, ISO 14001", 62, ay + 33);
  doc.restore();
  doc.y = ay + 58;

  doc.moveDown(0.3);
  richText(doc, "Alstom, leader mondial de la mobilité ferroviaire dont le siège est à Saint-Ouen, est un candidat naturel pour ce marché. Avec un chiffre d'affaires de 17,6 milliards d'euros et environ 80 000 collaborateurs dans le monde[5], Alstom dispose d'une expertise reconnue en signalisation ERTMS, notamment grâce à la plateforme Atlas (ETCS sol et embarqué) déployée sur plus de 40 projets dans 20 pays. En France, Alstom est le fournisseur historique de la signalisation TGV et conduit actuellement le programme TGV M (TGV du futur) qui intègre nativement l'ERTMS niveau 2[6]. Le groupe développe par ailleurs des solutions de trains à hydrogène (Coradia iLint, en service commercial en Allemagne depuis 2022, essais en France prévus sur la ligne Montréjeau—Luchon en 2026)[7]. Alstom détient la certification ASPICE niveau 3 pour l'ensemble de ses processus de développement logiciel embarqué de sécurité.");

  // -- Keolis --
  doc.addPage();
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#003366');
  doc.text("4.1.3 Keolis SA", 55, 55);
  doc.moveDown(0.2);
  richText(doc, "Keolis, filiale à 70% de SNCF Voyageurs, est le deuxième opérateur mondial de transport public, avec environ 68 000 collaborateurs dans 13 pays. Si Keolis n'est pas un fournisseur de signalisation per se, le groupe est un utilisateur final majeur des systèmes ERTMS en tant qu'exploitant de services ferroviaires (trains régionaux, tramways, métros automatiques). Keolis est particulièrement impliqué dans le développement de solutions IoT de fleet management pour la gestion prédictive de la maintenance de ses flottes (projet « Smart Fleet » déployé sur 15 réseaux, collectant 3,5 millions de points de données par jour)[8]. L'intégration de l'ERTMS dans les véhicules exploités par Keolis constitue un enjeu opérationnel majeur, le calendrier de migration devant être coordonné avec celui de SNCF Réseau[9].");

  // ── More administrative clauses (noise) ──
  doc.moveDown(0.6);
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 5 — CRITÈRES D'ATTRIBUTION");
  doc.moveDown(0.3);
  richText(doc, "5.1. L'offre économiquement la plus avantageuse sera déterminée sur la base des critères pondérés suivants :");
  doc.moveDown(0.2);
  richText(doc, "   Critère 1 — Valeur technique de l'offre : 60%, décomposé en :");
  richText(doc, "      1a. Conformité à la spécification ERTMS Baseline 3 Release 2 (B3R2) ......... 20%");
  richText(doc, "      1b. Performance et fiabilité (MTBF, disponibilité, temps de basculement) .... 15%");
  richText(doc, "      1c. Plan de migration et gestion de la coexistence ancien/nouveau système ... 15%");
  richText(doc, "      1d. Méthodologie de safety assurance (conformité EN 50126/50128/50129) ...... 10%");
  doc.moveDown(0.2);
  richText(doc, "   Critère 2 — Prix : 30%");
  doc.moveDown(0.2);
  richText(doc, "   Critère 3 — Délai d'exécution et planning détaillé : 10%");
  doc.moveDown(0.4);
  richText(doc, "5.2. En cas d'offres jugées équivalentes, une préférence sera accordée aux candidats démontrant un engagement vérifiable en matière de responsabilité sociale et environnementale (RSE), notamment : politique de formation et d'emploi local, réduction de l'empreinte carbone des équipements, recours à l'économie circulaire pour le recyclage des anciens systèmes de signalisation déposés.");

  // ── Article 6 — Administrative noise ──
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 6 — MODALITÉS DE REMISE DES OFFRES");
  doc.moveDown(0.3);
  richText(doc, "6.1. Les offres devront être transmises exclusivement par voie électronique via la plateforme de dématérialisation PLACE (www.marches-publics.gouv.fr), profil acheteur de SNCF Réseau. Aucune offre transmise par voie postale ou remise en main propre ne sera acceptée, conformément aux dispositions de l'article R2132-7 du Code de la commande publique.");
  doc.moveDown(0.3);
  richText(doc, "6.2. Le dossier de candidature comprendra les pièces suivantes : formulaire DC1 (lettre de candidature), formulaire DC2 (déclaration du candidat), attestations fiscales et sociales en cours de validité, attestation d'assurance responsabilité civile professionnelle, certificats de qualification (cf. art. 2), pouvoir de la personne habilitée à engager le candidat, et le cas échéant la convention de groupement.");
  doc.moveDown(0.3);
  richText(doc, "6.3. L'offre technique comprendra : un mémoire technique détaillé répondant point par point au Cahier des Clauses Techniques Particulières (CCTP), le planning d'exécution au format Gantt (fichier MS Project ou Primavera P6 accepté), les fiches techniques des équipements proposés, les certificats de conformité EN 50128/50129, et un plan de management de la sécurité (Safety Plan) conforme à la norme EN 50126.");

  // Another reference block with different format
  doc.addPage();
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 7 — RENSEIGNEMENTS COMPLÉMENTAIRES", 55, 55);
  doc.moveDown(0.3);
  richText(doc, "7.1. Les candidats peuvent obtenir des renseignements complémentaires en adressant une demande écrite via la plateforme PLACE au plus tard 21 jours avant la date limite de réception des offres. Réf. : AO-2025-SNCF-SIG-042. Contact technique : Direction de la Signalisation Ferroviaire, Tour Séquoia, 1 place Carpeaux, 92800 Puteaux. Contact administratif : Direction des Achats, même adresse. Tel. : +33 (0)1 xx xx xx xx (standard).");
  doc.moveDown(0.3);
  richText(doc, "7.2. Une visite de site (non obligatoire mais recommandée) sera organisée le 15 mai 2025 sur la section pilote Pasilly—Aisy. Les candidats souhaitant y participer devront s'inscrire avant le 05/05/2025 via la plateforme PLACE.");
  doc.moveDown(0.3);
  doc.fontSize(11).fillColor('#002855').font('Helvetica-Bold');
  doc.text("ARTICLE 8 — VOIES DE RECOURS");
  doc.moveDown(0.3);
  richText(doc, "8.1. Instance chargée des procédures de recours : Tribunal administratif de Paris, 7 rue de Jouy, 75181 Paris Cedex 04. Tél. : +33 (0)1 44 59 44 00. Courriel : greffe.ta-paris@juradm.fr.");
  doc.moveDown(0.2);
  richText(doc, "8.2. Référé précontractuel : articles L551-1 à L551-12 du Code de justice administrative. Référé contractuel : articles L551-13 à L551-23 du même code. Recours en contestation de la validité du contrat : dans un délai de 2 mois à compter de l'accomplissement des mesures de publicité (CE, Ass., 4 avril 2014, Département de Tarn-et-Garonne, n° 358994).");

  // ── footnotes area ──
  doc.moveDown(1);
  doc.fontSize(6.5).fillColor('#666666').font('Helvetica');
  const fnotes = [
    "[1] Cf. Règlement (UE) 2016/919 (spécification technique d'interopérabilité — CCS).",
    "[2] SNCF Réseau, Schéma directeur de la signalisation, version 4.1, déc. 2024.",
    "[3] SNCF Réseau, Rapport financier annuel 2024.",
    "[4] SNCF Réseau, Plan de recrutement 2025, publié le 15/01/2025.",
    "[5] Alstom, Document d'enregistrement universel 2024/25, déposé auprès de l'AMF.",
    "[6] Alstom, Communiqué de presse « TGV M : première rame d'essai », oct. 2024.",
    "[7] Alstom, Fiche produit Coradia iLint, mise à jour mars 2025.",
    "[8] Keolis, Rapport annuel 2024, section « Innovation digitale ».",
    "[9] EPSF (Établissement public de sécurité ferroviaire), Avis technique AT-2024-SIG-017.",
  ];
  fnotes.forEach(fn => {
    doc.text(fn, 55, undefined, { width: 480 });
  });

  // ── Legal footer ──
  doc.moveDown(1);
  doc.fontSize(6).fillColor('#aaaaaa');
  doc.text("Avis envoyé au JOUE le 18/04/2025 — Publication au BOAMP le 19/04/2025 — Réf. BOAMP n° 25-XXXXX", 55, undefined, { align: 'center', width: 480 });
  doc.text("Le pouvoir adjudicateur se réserve le droit de déclarer la procédure sans suite conformément aux dispositions de l'article L2152-4 du CCP.", { align: 'center', width: 480 });

  endPDF(doc); await promise;
  console.log('  => 17_rail_transport_tenders.pdf');
}


// ═══════════════════════════════════════════════════════════════════
// PDF 3: Semiconductor Ecosystem
// ═══════════════════════════════════════════════════════════════════
async function genSemiconductor() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 60, right: 55 },
    bufferPages: true,
  });
  const promise = pipePDF(doc, '18_semiconductor_ecosystem.pdf');

  // ── Academic header ──
  doc.fontSize(8).fillColor('#888888').font('Helvetica');
  doc.text("Preprint — Submitted to Journal of European Semiconductor Research, April 2025", 60, 40, { align: 'center', width: 420 });
  doc.text("DOI: 10.xxxx/jesr.2025.04.018 (pending)", { align: 'center', width: 420 });
  doc.moveDown(1.5);

  doc.fontSize(17).fillColor('#111111').font('Helvetica-Bold');
  doc.text("The French Semiconductor Ecosystem:", { align: 'center' });
  doc.text("Technology Nodes, Industrial Actors, and the France 2030 Strategy", { align: 'center' });
  doc.moveDown(0.8);
  doc.fontSize(10).fillColor('#333333').font('Helvetica');
  doc.text("Jean-Pierre Durand¹, Marie-Claire Lefebvre², Hiroshi Tanaka³", { align: 'center' });
  doc.moveDown(0.3);
  doc.fontSize(7.5).fillColor('#666666');
  doc.text("¹ CEA-Leti, Université Grenoble Alpes, 17 av. des Martyrs, 38054 Grenoble, France", { align: 'center' });
  doc.text("² CNRS-LTM, Grenoble INP, Minatec Campus, 38054 Grenoble, France", { align: 'center' });
  doc.text("³ IMEC, Kapeldreef 75, 3001 Leuven, Belgium (visiting researcher at CEA-Leti)", { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(7).fillColor('#999999');
  doc.text("Corresponding author: jp.durand@cea.fr | Received: 2025-02-15 | Revised: 2025-03-28 | Accepted: 2025-04-10", { align: 'center' });

  // ── Abstract ──
  doc.moveDown(1);
  doc.save();
  doc.rect(60, doc.y, 465, 130).fillAndStroke('#f9f9f9', '#dddddd');
  const absy = doc.y + 8;
  doc.fontSize(9).font('Helvetica-Bold').fillColor('#222222');
  doc.text("Abstract", 70, absy);
  doc.fontSize(8).font('Helvetica').fillColor('#333333');
  doc.text(
    "The French semiconductor ecosystem has undergone a remarkable transformation driven by the France 2030 investment plan, which allocated EUR 2.9 billion in subsidies to the sector. This paper provides a comprehensive analysis of the key industrial actors — STMicroelectronics, Soitec, GlobalFoundries (through its Crolles partnership), and X-FAB — examining their technology roadmaps, manufacturing capabilities, and strategic positioning within the European Chips Act framework. We present a detailed comparison of FD-SOI (Fully Depleted Silicon-On-Insulator) and FinFET technology approaches at the 28nm and 18nm nodes, arguing that the Grenoble/Crolles cluster has established a globally competitive position in FD-SOI technology that offers compelling advantages for automotive, IoT, and RF applications. Our analysis draws on publicly available financial data, patent filings, and technical publications from 2020-2025, supplemented by interviews with industry executives and policy makers (n=23). We conclude that sustained public investment, combined with the unique CEA-Leti/industry collaboration model, positions France as a critical node in the European semiconductor sovereignty agenda.",
    70, absy + 14, { width: 440, lineGap: 1.5 }
  );
  doc.restore();
  doc.y = absy + 140;

  // ── Keywords ──
  doc.moveDown(0.3);
  doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#444444');
  doc.text("Keywords: ", 60, doc.y, { continued: true });
  doc.font('Helvetica').fillColor('#555555');
  doc.text("FD-SOI; FinFET; STMicroelectronics; Soitec; France 2030; European Chips Act; 28nm; 18nm; semiconductor manufacturing; Grenoble; Crolles");

  // ── 1. Introduction ──
  doc.addPage();
  doc.fontSize(12).fillColor('#111111').font('Helvetica-Bold');
  doc.text("1. Introduction", 60, 55);
  doc.moveDown(0.4);
  richText(doc, "The global semiconductor industry, valued at approximately USD 580 billion in 2024 [1], has become a focal point of industrial policy worldwide. The COVID-19 pandemic exposed critical supply chain vulnerabilities, prompting unprecedented government interventions: the US CHIPS Act (USD 52.7 billion), the European Chips Act (EUR 43 billion), and national programs such as France 2030 (EUR 2.9 billion specifically allocated to semiconductor manufacturing) [2,3]. Within this context, the French semiconductor ecosystem — historically anchored in the Grenoble/Isère cluster — has emerged as a strategically important node in the European effort to achieve semiconductor sovereignty.");
  doc.moveDown(0.3);
  richText(doc, "France's semiconductor heritage traces back to the 1970s with the establishment of CNET (Centre National d'Études des Télécommunications) and the subsequent growth of Thomson Semiconductors, which evolved through SGS-Thomson into today's STMicroelectronics [4]. The co-location of the CEA-Leti research institute with major industrial fabs in the Grenoble area has created a uniquely integrated innovation ecosystem, often compared to the Hsinchu Science Park model in Taiwan or the Albany/GlobalFoundries cluster in New York State [5].");
  doc.moveDown(0.3);
  richText(doc, "This paper is structured as follows: Section 2 presents the key industrial actors and their manufacturing capabilities. Section 3 provides a technical comparison of FD-SOI and FinFET technologies at relevant process nodes. Section 4 analyzes the impact of France 2030 subsidies. Section 5 discusses the role of X-FAB and specialty foundries. Section 6 concludes with policy recommendations and future outlook.");

  // ── 2. Key Industrial Actors ──
  doc.addPage();
  doc.fontSize(12).fillColor('#111111').font('Helvetica-Bold');
  doc.text("2. Key Industrial Actors", 60, 55);
  doc.moveDown(0.4);

  // -- 2.1 STMicroelectronics --
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#222222');
  doc.text("2.1 STMicroelectronics (Grenoble/Crolles)");
  doc.moveDown(0.3);

  doc.save();
  doc.rect(60, doc.y, 465, 60).fillAndStroke('#f5f5f5', '#cccccc');
  const sty = doc.y + 5;
  doc.fontSize(7).font('Helvetica').fillColor('#333333');
  doc.text("Headquarters: Geneva, Switzerland | Major French sites: Crolles (300mm fab), Grenoble (R&D, 200mm), Rousset (200mm), Tours (200mm)", 68, sty, { width: 445 });
  doc.text("Global employees: ~50,000 | French employees: ~12,500 | Revenue FY2024: USD 17.3B (EUR ~16.0B)", 68, sty + 13, { width: 445 });
  doc.text("Key products: Automotive MCUs (Stellar), MEMS sensors, STM32 family, SiC power devices, FD-SOI mixed-signal", 68, sty + 26, { width: 445 });
  doc.text("France 2030 subsidy: EUR 2.9B (shared with GlobalFoundries) for new 300mm fab expansion at Crolles (announced June 2023)", 68, sty + 39, { width: 445 });
  doc.restore();
  doc.y = sty + 68;

  doc.moveDown(0.3);
  richText(doc, "STMicroelectronics is the largest semiconductor manufacturer in France and ranks among the top 10 globally by revenue [6]. The company's Crolles site, located approximately 25 km northeast of Grenoble in the Isère valley, hosts a state-of-the-art 300mm wafer fabrication facility that currently produces chips at the 28nm FD-SOI node, with ongoing qualification of 18nm FD-SOI technology [7]. The site employs approximately 5,500 people (as of Q1 2025), a figure expected to grow to over 7,000 with the completion of the new fab expansion, partially funded by the France 2030 program with subsidies totaling EUR 2.9 billion — the largest single industrial subsidy in French history [8].");
  doc.moveDown(0.3);
  richText(doc, "ST's revenue for fiscal year 2024 reached USD 17.3 billion, reflecting a 3.8% year-over-year decline attributed to inventory corrections in the automotive and industrial segments [9]. However, the company's long-term positioning remains strong, particularly in automotive microcontrollers (the Stellar platform for next-generation vehicle architectures), silicon carbide (SiC) power devices for electric vehicles, and IoT-optimized FD-SOI products. The Crolles 300mm fab is a joint venture with GlobalFoundries (cf. Section 2.3), operating under the 'Crolles 2 Alliance' framework established in 2002 [10].");

  // -- 2.2 Soitec --
  doc.addPage();
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#222222');
  doc.text("2.2 Soitec (Bernin/Grenoble)", 60, 55);
  doc.moveDown(0.3);

  doc.save();
  doc.rect(60, doc.y, 465, 52).fillAndStroke('#f5f5f5', '#cccccc');
  const soy = doc.y + 5;
  doc.fontSize(7).font('Helvetica').fillColor('#333333');
  doc.text("Headquarters: Bernin (Isère), France — Parc Technologique des Fontaines | Listed: Euronext Paris (SOI)", 68, soy, { width: 445 });
  doc.text("Employees: ~2,100 (FY2024) | Revenue FY2024: EUR ~800M | Founded: 1992 (CEA-Leti spin-off)", 68, soy + 13, { width: 445 });
  doc.text("Core technology: Smart Cut™ (proprietary SOI wafer manufacturing) | Products: SOI wafers (FD-SOI, PD-SOI, RF-SOI, Power-SOI)", 68, soy + 26, { width: 445 });
  doc.text("Key customers: STMicroelectronics, GlobalFoundries, Samsung, NXP, TSMC (for specialized substrates)", 68, soy + 39, { width: 445 });
  doc.restore();
  doc.y = soy + 58;

  doc.moveDown(0.3);
  richText(doc, "Soitec occupies a unique and strategically critical position in the global semiconductor supply chain as the world's leading manufacturer of SOI (Silicon-On-Insulator) wafers. The company's proprietary Smart Cut™ technology, originally developed at CEA-Leti in the early 1990s, enables the production of ultra-thin silicon layers bonded onto insulating substrates — the foundational material for FD-SOI chip manufacturing [11]. With approximately 2,100 employees and annual revenue of EUR 800 million, Soitec is significantly smaller than its major customers, yet its near-monopoly position in high-quality SOI wafer supply makes it an indispensable link in the value chain [12].");
  doc.moveDown(0.3);
  richText(doc, "Soitec's Bernin facility, situated less than 10 km from STMicroelectronics' Crolles fab, produces 200mm and 300mm SOI wafers for multiple technology applications: FD-SOI for ultra-low-power IoT and automotive, RF-SOI for 5G front-end modules (the dominant substrate for mobile RF switches and LNAs), and Power-SOI for smart power management ICs [13]. The company has invested EUR 450 million in capacity expansion over 2023-2025 to meet growing demand driven by 5G, automotive electrification, and the broader adoption of FD-SOI technology by multiple foundries. Soitec's Singapore facility (acquired from Shin-Etsu Handotai in 2021) provides geographic diversification and serves Asia-Pacific customers [14].");

  // -- 2.3 GlobalFoundries --
  doc.addPage();
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#222222');
  doc.text("2.3 GlobalFoundries (Crolles Partnership)", 60, 55);
  doc.moveDown(0.3);

  doc.save();
  doc.rect(60, doc.y, 465, 48).fillAndStroke('#f5f5f5', '#cccccc');
  const gfy = doc.y + 5;
  doc.fontSize(7).font('Helvetica').fillColor('#333333');
  doc.text("Headquarters: Malta, NY, USA | Primary fab: Fab 1 (Dresden, Germany) | French operations: Crolles partnership with ST", 68, gfy, { width: 445 });
  doc.text("Global employees: ~13,000 | Revenue FY2024: USD ~7.4B | Key technology: 22FDX® (22nm FD-SOI)", 68, gfy + 13, { width: 445 });
  doc.text("Crolles connection: Joint R&D with ST since 2002 (Crolles 2 Alliance) | FD-SOI technology co-development", 68, gfy + 26, { width: 445 });
  doc.text("France 2030: Co-beneficiary (with ST) of EUR 2.9B subsidy for Crolles fab expansion", 68, gfy + 39, { width: 445 });
  doc.restore();
  doc.y = gfy + 55;

  doc.moveDown(0.3);
  richText(doc, "GlobalFoundries (GF), the world's third-largest pure-play foundry, does not operate a fabrication facility in France per se, but maintains a significant technological partnership with STMicroelectronics at the Crolles site. This collaboration, originating from the Crolles 2 Alliance formed in 2002 (initially including Philips/NXP, Freescale/NXP, and STMicroelectronics), has been instrumental in the development and commercialization of FD-SOI technology [15]. GlobalFoundries' flagship 22FDX® platform, manufactured at its Dresden Fab 1, was co-developed with technology IP generated at Crolles in partnership with CEA-Leti [16].");
  doc.moveDown(0.3);
  richText(doc, "The FD-SOI technology roadmap at Crolles encompasses multiple nodes: 28nm FD-SOI (in volume production at ST since 2018), 22nm FD-SOI (GF's 22FDX, in production at Dresden), and the next-generation 18nm FD-SOI node currently in advanced development. GlobalFoundries is a co-beneficiary, alongside ST, of the EUR 2.9 billion France 2030 subsidy package, which will finance the construction of a new cleanroom at Crolles capable of processing an additional 15,000-20,000 wafer starts per month at the 18nm FD-SOI node [17]. This expansion is expected to create approximately 1,000 direct jobs and represents the largest foreign-linked semiconductor investment on French soil.");

  // ── 3. FD-SOI vs FinFET ──
  doc.addPage();
  doc.fontSize(12).fillColor('#111111').font('Helvetica-Bold');
  doc.text("3. Technology Comparison: FD-SOI vs FinFET", 60, 55);
  doc.moveDown(0.4);
  richText(doc, "The semiconductor industry's technology roadmap has historically been driven by Moore's Law scaling through successive CMOS nodes. At the 28nm generation, however, the industry diverged into two distinct architectural paths: FinFET (adopted by TSMC, Samsung, and Intel for leading-edge logic) and FD-SOI (championed by STMicroelectronics, GlobalFoundries, and Samsung for specific applications) [18]. This section examines the technical trade-offs between these approaches.");
  doc.moveDown(0.3);

  doc.fontSize(10).font('Helvetica-Bold').fillColor('#333333');
  doc.text("3.1 Architectural Overview");
  doc.moveDown(0.3);
  richText(doc, "In a FinFET (Fin Field-Effect Transistor) architecture, the gate wraps around a thin vertical silicon fin, providing superior electrostatic control and enabling continued Vth scaling below 20nm. TSMC's N7 and N5 FinFET nodes have become the de facto standard for high-performance computing, mobile application processors, and AI accelerators [19]. However, FinFET processes require complex multi-patterning lithography (SADP, SAQP, or EUV), resulting in significantly higher wafer processing costs — typically 2-3x that of a comparable FD-SOI node [20].");
  doc.moveDown(0.3);
  richText(doc, "FD-SOI, by contrast, uses a planar transistor architecture fabricated on a thin silicon film (~6-7nm) sitting atop a buried oxide (BOX) layer (~25nm). The ultra-thin body provides electrostatic control comparable to FinFET at the same nominal gate length, while the planar process requires fewer lithography steps and avoids multi-patterning at the 28nm and 22nm nodes [21]. A distinctive feature of FD-SOI is back-biasing (body-biasing via the substrate beneath the BOX layer), which enables post-fabrication dynamic tuning of transistor threshold voltage (Vth) over a range of ~300mV — a capability with no equivalent in FinFET [22].");
  doc.moveDown(0.3);

  // Dense comparison table
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#333333');
  doc.text("3.2 Quantitative Comparison at 28nm/22nm");
  doc.moveDown(0.4);

  messyTable(doc,
    ['Parameter', '28nm Bulk CMOS', '28nm FD-SOI (ST)', '22nm FD-SOI (GF 22FDX)', '16/14nm FinFET'],
    [
      ['Gate length (nm)', '28', '28', '22', '16/14'],
      ['Transistor type', 'Planar bulk', 'Planar FD-SOI', 'Planar FD-SOI', '3D FinFET'],
      ['Vdd nominal (V)', '0.9', '0.8', '0.75', '0.8'],
      ['Body biasing', 'N/A', '±1.3V (FBB/RBB)', '±2.0V (FBB/RBB)', 'N/A'],
      ['Min Vdd (mV)', '~650', '~400 (with FBB)', '~350 (with FBB)', '~500'],
      ['Wafer cost (rel.)', '1.0x', '1.10-1.15x', '1.15-1.20x', '2.0-2.5x'],
      ['Mask count', '~40', '~42', '~44', '~60-70'],
      ['EUV required', 'No', 'No', 'No', 'No (DUV MP)'],
      ['Best for', 'Legacy digital', 'Low-power, IoT, auto', 'RF, mmWave, auto', 'High-perf logic'],
    ],
    { colWidths: [85, 75, 85, 95, 80], rowHeight: 18, fontSize: 6 }
  );

  doc.moveDown(0.5);
  doc.fontSize(7.5).fillColor('#888888').font('Helvetica');
  doc.text("Table 1. Comparative parameters for CMOS technology options at the 28nm/22nm generation. FBB = Forward Body Biasing. RBB = Reverse Body Biasing. MP = Multi-Patterning. Data compiled from [18-22] and ST/GF product datasheets.", { width: 440 });

  // -- 3.3 18nm FD-SOI --
  doc.addPage();
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#333333');
  doc.text("3.3 The 18nm FD-SOI Node: Next-Generation Capabilities", 60, 55);
  doc.moveDown(0.3);
  richText(doc, "The 18nm FD-SOI node, currently under development at Crolles by STMicroelectronics and GlobalFoundries with CEA-Leti support, represents the next inflection point for the technology. Expected to enter risk production in late 2026 and volume production in 2028, the 18nm FD-SOI node targets a 30% improvement in power-performance-area (PPA) compared to 22nm FD-SOI, while maintaining the fundamental cost advantage of the planar FD-SOI approach [23].");
  doc.moveDown(0.3);
  richText(doc, "Key technology elements of the 18nm FD-SOI node include: (i) an ultra-thin silicon channel reduced to ~5nm (from ~6nm at 28/22nm), (ii) introduction of strained silicon (sGe S/D) for PMOS performance enhancement, (iii) first use of immersion EUV (high-NA EUV not required) for critical patterning layers, reducing mask count relative to a hypothetical FinFET equivalent, and (iv) enhanced back-biasing range extending to ±2.5V for even greater post-fabrication tuning flexibility [24]. The process is designed to be particularly competitive for automotive, edge AI inference, and 5G/6G RF applications where the combination of low power, analog/RF performance, and radiation hardness (inherent to the BOX layer) are valued over raw digital transistor density.");

  // ── 4. France 2030 Impact ──
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#111111').font('Helvetica-Bold');
  doc.text("4. France 2030 Subsidies and European Chips Act");
  doc.moveDown(0.4);
  richText(doc, "The France 2030 investment plan, announced by President Macron in October 2021, allocated a total of EUR 54 billion across multiple strategic sectors, with EUR 5.5 billion earmarked for digital technologies including semiconductors. Of this amount, EUR 2.9 billion in subsidies was specifically directed to the STMicroelectronics/GlobalFoundries Crolles expansion project — a figure that was subsequently approved by the European Commission under the European Chips Act's Important Project of Common European Interest (IPCEI) framework in June 2023 [25].");
  doc.moveDown(0.3);
  richText(doc, "The subsidy supports the construction of a new 300mm cleanroom facility at Crolles with an estimated total investment cost (including private contributions from ST and GF) of EUR 7.5 billion. The project is expected to generate approximately 1,000 direct manufacturing jobs and 2,000-3,000 indirect jobs in the Grenoble ecosystem, including at suppliers, subcontractors, and the Soitec wafer supply chain. The first phase of the expansion (targeting 5,000 WSPM at 18nm FD-SOI) is scheduled for completion in Q4 2027, with full ramp to 15,000-20,000 WSPM by 2030 [26].");

  // ── 5. X-FAB ──
  doc.addPage();
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#222222');
  doc.text("5. Specialty Foundries: The Role of X-FAB", 60, 55);
  doc.moveDown(0.3);

  doc.save();
  doc.rect(60, doc.y, 465, 42).fillAndStroke('#f5f5f5', '#cccccc');
  const xfy = doc.y + 5;
  doc.fontSize(7).font('Helvetica').fillColor('#333333');
  doc.text("X-FAB Silicon Foundries SE | HQ: Tessenderlo, Belgium | French operations: limited (design center, sales office)", 68, xfy, { width: 445 });
  doc.text("Specialty: analog/mixed-signal foundry services | Process nodes: 180nm to 1µm | Key markets: automotive, medical, industrial", 68, xfy + 13, { width: 445 });
  doc.text("Revenue FY2024: EUR ~780M | Employees: ~4,500 globally | 6\" and 8\" wafer fabs (Erfurt, Dresden, Itzehoe, Corbeil-Essonnes, Lubbock TX, Sarawak MY)", 68, xfy + 26, { width: 445 });
  doc.restore();
  doc.y = xfy + 48;

  doc.moveDown(0.3);
  richText(doc, "While the Grenoble cluster focuses on advanced FD-SOI nodes, the broader French semiconductor ecosystem also benefits from the presence of specialty foundries serving the analog/mixed-signal market. X-FAB, a Belgian-headquartered group with a small French footprint (design center and sales operations), provides an important complementary capability in mature process nodes (180nm to 1µm) that remain critical for automotive sensors, power management ICs, medical devices, and industrial control systems [27]. X-FAB's Corbeil-Essonnes site near Paris (inherited from the former MATRA-MHS foundry) has limited wafer production but serves as a customer interface and design support center for French fabless companies [28].");
  doc.moveDown(0.3);
  richText(doc, "The coexistence of advanced (sub-28nm FD-SOI) and mature (>100nm analog) manufacturing capabilities within the French ecosystem is significant because modern automotive and industrial systems require chips fabricated at multiple technology nodes. A typical electric vehicle, for example, contains 2,000-3,000 semiconductor devices spanning process nodes from 5nm (infotainment SoC) to 350nm (discrete power transistors), with the majority of content by chip count (though not by value) at mature nodes above 65nm [29]. This 'full-stack' capability distinguishes the broader European ecosystem from the Asian clusters, which have increasingly focused on leading-edge digital logic.");

  // ── 6. Conclusion ──
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#111111').font('Helvetica-Bold');
  doc.text("6. Conclusion");
  doc.moveDown(0.3);
  richText(doc, "The French semiconductor ecosystem, anchored by STMicroelectronics' 50,000-strong global workforce and the unique Grenoble/Crolles innovation cluster, is at an inflection point. The EUR 2.9 billion France 2030 subsidy — the largest directed at a single industrial project in French history — is catalyzing a new phase of growth that will bring 18nm FD-SOI manufacturing to volume production by the end of the decade. Soitec's strategic position as the near-sole supplier of SOI wafers, combined with Crolles-based R&D in partnership with CEA-Leti and GlobalFoundries, creates a vertically integrated value chain with few parallels globally [30].");
  doc.moveDown(0.3);
  richText(doc, "Looking ahead, the key challenge for the French ecosystem is to ensure that the FD-SOI technology advantage translates into sustained market share gains. While FD-SOI will not compete with FinFET/GAA (Gate-All-Around) at the leading edge of digital logic (below 10nm), its sweet spot — low-power IoT, automotive MCUs, 5G/6G RF, edge AI, and rad-hard space applications — represents a rapidly growing market estimated at USD 65-80 billion by 2030 [31]. If STMicroelectronics and its partners can maintain their current technology lead and deliver the 18nm FD-SOI node on schedule, France's position as a critical semiconductor manufacturing hub in Europe will be secured for the next decade.");

  // ── References ──
  doc.addPage();
  doc.fontSize(12).fillColor('#111111').font('Helvetica-Bold');
  doc.text("References", 60, 55);
  doc.moveDown(0.4);
  const academicRefs = [
    "[1] SIA, \"2024 State of the U.S. Semiconductor Industry,\" Semiconductor Industry Association, Washington DC, 2024.",
    "[2] European Commission, \"European Chips Act — Regulation (EU) 2023/1781,\" OJ L 229, 2023.",
    "[3] Gouvernement français, \"Plan France 2030 — Volet semi-conducteurs,\" Secrétariat général pour l'investissement, 2023.",
    "[4] Lecler, Y. and Yoshimoto, T., \"The Semiconductor Industry in France: From National Champions to European Integration,\" in Asian Development Perspectives, Springer, 2022, pp. 189-215.",
    "[5] Macher, J.T. and Mowery, D.C., \"Innovation in Semiconductors,\" in Handbook of Economics of Innovation, North-Holland, 2020, vol. 1, pp. 671-712.",
    "[6] STMicroelectronics, \"Annual Report 2024,\" Geneva, 2025.",
    "[7] Planes, N. et al., \"28nm FD-SOI Technology Platform for Ultra-Low Power Applications,\" in Proc. VLSI Technology Symposium, 2012, pp. 133-134.",
    "[8] Gouvernement français, \"Communiqué: Investissement historique de 7,5 milliards d'euros dans les semi-conducteurs à Crolles,\" Élysée, 5 juin 2023.",
    "[9] STMicroelectronics, \"Q4 2024 Earnings Release,\" 30 January 2025.",
    "[10] Matheron, G., \"The Crolles 2 Alliance: A Model for Collaborative Semiconductor R&D,\" IEEE Spectrum, vol. 42, no. 3, 2005, pp. 34-40.",
    "[11] Bruel, M., \"Silicon on insulator material technology,\" Electronics Letters, vol. 31, no. 14, 1995, pp. 1201-1202.",
    "[12] Soitec, \"Document d'enregistrement universel FY2024,\" Bernin, 2024.",
    "[13] Maleville, C. et al., \"Smart Cut Technology: From 200mm SOI to Advanced Substrates,\" in Proc. IEEE SOI-3D-Subthreshold Microelectronics Unified Conf., 2023.",
    "[14] Soitec, \"Capital Markets Day 2024 Presentation,\" Paris, November 2024.",
    "[15] Skotnicki, T. et al., \"Innovative Materials, Devices, and CMOS Technologies for Low-Power Mobile Multimedia,\" IEEE Trans. Electron Devices, vol. 55, no. 1, 2008, pp. 96-130.",
    "[16] GlobalFoundries, \"22FDX Technology Platform Datasheet,\" rev. 3.2, 2024.",
    "[17] Reuters, \"France approves €2.9 billion subsidy for STMicro-GlobalFoundries chip plant,\" 5 June 2023.",
    "[18] Arnaud, F. et al., \"Competitive and Mature 28nm Low-Power FD-SOI Technology,\" in Proc. IEEE International Electron Devices Meeting (IEDM), 2014.",
    "[19] TSMC, \"N7 and N5 Technology Overview,\" Technology Symposium, 2020.",
    "[20] IC Knowledge, \"Semiconductor Fabrication Cost Model,\" 2024 edition.",
    "[21] Weber, O. et al., \"14nm FD-SOI Upgraded to 18nm for Automotive Applications,\" in Proc. VLSI Technology Symposium, 2018.",
    "[22] Jacquet, F. et al., \"28nm FD-SOI Body Biasing for Ultra-Low Voltage Operation,\" in Proc. IEEE A-SSCC, 2016.",
    "[23] Le Royer, C. et al., \"18nm FD-SOI Technology for Automotive and IoT Applications: A Pathfinding Study,\" in Proc. ESSCIRC, 2024.",
    "[24] CEA-Leti, \"2024 Annual Report — Advanced CMOS Program,\" Grenoble, 2025.",
    "[25] European Commission, \"State Aid SA.100971 — France — IPCEI Microelectronics and Communication Technologies,\" Decision C(2023) 3803, 2023.",
    "[26] STMicroelectronics, \"Crolles Expansion Program — Investor Update,\" Capital Markets Day, November 2024.",
    "[27] X-FAB, \"Annual Report 2024,\" Tessenderlo, 2025.",
    "[28] Baron, T., \"French Semiconductor Manufacturing: A Historical Perspective on the Corbeil-Essonnes Site,\" Revue d'Histoire des Sciences et Techniques, vol. 18, 2023.",
    "[29] McKinsey & Company, \"Semiconductor content in electric vehicles: Trends to 2030,\" Advanced Industries Report, 2024.",
    "[30] ESIA, \"European Semiconductor Industry: Strategic Position and Outlook,\" European Semiconductor Industry Association, 2024.",
    "[31] Yole Intelligence, \"FD-SOI Market and Technology Report,\" Lyon, 2024.",
  ];
  academicRefs.forEach(r => {
    doc.font('Helvetica').fontSize(6.5).fillColor('#333333');
    doc.text(r, 60, undefined, { width: 450, lineGap: 1.5 });
    doc.moveDown(0.1);
  });

  endPDF(doc); await promise;
  console.log('  => 18_semiconductor_ecosystem.pdf');
}


// ═══════════════════════════════════════════════════════════════════
// Run all
// ═══════════════════════════════════════════════════════════════════
(async () => {
  console.log('Generating PDFs...');
  await genTelecom();
  await genRail();
  await genSemiconductor();
  console.log('Done — 3 PDFs created in', OUT);
})();
