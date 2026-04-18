const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function writePDF(filename, buildFn) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 40, left: 45, right: 45 },
      bufferPages: true,
      compress: true,
      info: {
        Title: filename,
        Author: 'automated-scrape-v3.1.7',
        CreationDate: new Date('2025-11-03T08:14:22Z'),
      },
    });
    const outPath = path.join(OUT_DIR, filename);
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);
    buildFn(doc);
    doc.end();
    stream.on('finish', () => {
      console.log(`  -> ${outPath}`);
      resolve();
    });
    stream.on('error', reject);
  });
}

// Garbled encoding artifacts
const APOS = '\u00e2\u0080\u0099'; // â€™ (UTF-8 bytes of right single quote decoded as latin-1)
const DASH = '\u00e2\u0080\u0093'; // â€"
const LDQUO = '\u00e2\u0080\u009c'; // â€œ
const RDQUO = '\u00e2\u0080\u009d'; // â€

// Weird bullet chars
const BULLETS = ['►', '◆', '●', '▸', '◉', '★', '⬥', '⊳', '⇒', '∎'];
function rb() { return BULLETS[Math.floor(Math.random() * BULLETS.length)]; }

// ─────────────────────────────────────────────────────────────────────────────
// PDF 1 — 07_linkedin_scrape_dump.pdf
// ─────────────────────────────────────────────────────────────────────────────

async function buildLinkedinDump() {
  await writePDF('07_linkedin_scrape_dump.pdf', (doc) => {
    // Random metadata noise at the top
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text('crawl-session: 8f3a2c91-bb47-4e1d-a5c7-0def93218877 | ts: 1699012462 | proxy: rotating-fr-3 | ua: Mozilla/5.0 (Windows NT 10.0; Win64; x64) rv:119.0', { align: 'left' });
    doc.text('parser-version: linkedin-scraper/3.1.7-beta | encoding: UTF-8(??) | dedup: off | normalize: NONE', { align: 'left' });
    doc.moveDown(0.3);
    doc.fontSize(5).fillColor('#cccccc');
    doc.text('WARNING: raw dump \u2014 encoding artifacts may be present. Data not validated. Do not redistribute. &copy; 2025 scrape pipeline.', { align: 'left' });
    doc.moveDown(0.5);

    // Divider
    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#dddddd').lineWidth(0.5).stroke();
    doc.moveDown(0.5);

    // ── ATOS ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0a66c2');
    doc.text('ATOS SE \u2014 Company Profile (LinkedIn Scrape)', { underline: false });
    doc.font('Helvetica').fontSize(7).fillColor('#666666');
    doc.text(`scraped: 15/11/2025 14:23:07 CET  |  src: linkedin.com/company/atos  |  confidence: 0.72  |  status: UNVERIFIED`);
    doc.moveDown(0.4);

    doc.font('Helvetica').fontSize(9).fillColor('#333333');
    doc.text(`${rb()} Industry: Information Technology &amp; Services / IT Consulting\n${rb()} Headquarters: Bezons, \u00cele-de-France, FR (prev. registered: Paris La D${APOS}fense)\n${rb()} Employees: ~95,000 (LinkedIn: 94,817 | source2: 95.3k | ${DASH} discrepancy noted)\n${rb()} Revenue: EUR 10.7B (FY2024 reported) \u2014 NOTE: under restructuring, figures UNRELIABLE\n${rb()} Founded: 1997 (as Atos Origin, merger Atos SA + Origin B.V.)`, {
      lineGap: 2,
    });
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8).fillColor('#cc0000');
    doc.text('!!! FINANCIAL DISTRESS FLAG !!!', { align: 'left' });
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Atos SE entered acc${APOS}l${APOS}rated safeguard proceedings (proc${DASH}dure de sauvegarde acc${APOS}l${APOS}r${APOS}e) in July 2024. Massive debt restructuring: EUR 4.8B debt converted. Share price collapsed >95% from 2021 peak. Multiple asset sales (Eviden cybersecurity unit, Worldgrid, etc.). Ongoing concerns re: viability as going concern. Kretinsky consortium involvement. STATUS: *** DISQUALIFY *** \u2014 financial instability, reputational risk, subcontracting reliability ZERO.`);
    doc.moveDown(0.2);

    // Garbled HTML artifacts
    doc.font('Courier').fontSize(6.5).fillColor('#888888');
    doc.text(`<div class=${LDQUO}company-description${RDQUO}>&lt;p&gt;Atos is a global leader in digital transformation with approximately 95,000 employees and annual revenue of circa &amp;euro;10.7 billion.&lt;/p&gt;&lt;p&gt;The Group is the worldwide leader in cybersecurity, cloud, and high-performance computing.&lt;/p&gt;</div><!-- end company-desc --><!-- analytics: li-tracking-pixel-7f832 -->`);
    doc.moveDown(0.4);

    // Fake JS artifact
    doc.fontSize(5.5).fillColor('#aaaaaa');
    doc.text(`window.__li_data.push({"companyId":1234,"name":"Atos SE","followersCount":487291,"staffCount":94817,"specialties":["IT","consulting","managed services","BPO"]});`);
    doc.moveDown(0.6);

    // Separator
    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#0a66c2').lineWidth(1).stroke();
    doc.moveDown(0.5);

    // ── SOPRA STERIA ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0a66c2');
    doc.text('Sopra Steria Group \u2014 Profil Entreprise');
    doc.font('Helvetica').fontSize(7).fillColor('#666666');
    doc.text(`scraped: November 15, 2025 02:47 PM | src: linkedin.com/company/soprasteria | confidence: 0.89`);
    doc.moveDown(0.4);

    doc.font('Helvetica').fontSize(9).fillColor('#333333');
    doc.text([
      `${rb()} Secteur: IT Services & Consulting / ESN (Entreprise de Services du Num${APOS}rique)`,
      `${rb()} Si${DASH}ge: Paris, FR (op${APOS}rational HQ: Annecy) &amp; multiple EU offices`,
      `${rb()} Effectifs: 56 000 collaborateurs (2024) \u2014 LinkedIn count: 55,847`,
      `${rb()} CA: 5.8 Mds EUR (chiffre d${APOS}affaires 2024, +4.2% organique)`,
      `${rb()} Capitalisation boursi${DASH}re: ~EUR 7.1B (Nov 2025)`,
      `${rb()} Fondation: 1968 (Sopra) / 1969 (Steria) \u2014 fusion 2014`,
    ].join('\n'), { lineGap: 2 });
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#006633');
    doc.text('Key Activity Signals (recent posts / job listings):');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `  ${rb()} Cloud Migration: ${LDQUO}Sopra Steria remporte contrat cadre cloud souverain minist${DASH}re Int${APOS}rieur${RDQUO} (post 03/10/2025)`,
      `  ${rb()} Hiring: 247 open positions tagged ${LDQUO}cloud${RDQUO} on careers page (checked 15/11/2025)`,
      `  ${rb()} Partnership: AWS Advanced Consulting Partner, Azure Expert MSP, GCP partner`,
      `  ${rb()} Defense/Govt: listed on UGAP catalog, habilitation Confidentiel D${APOS}fense confirmed`,
      `  ${rb()} Project ref: ${LDQUO}Transformation SI de la CNAV${RDQUO} ${DASH} cloud migration mainframe \u2192 hybrid (posted 22/09/2025)`,
      `  ${rb()} Note re: Gallia acquisition (Dec 2024) ${DASH} strengthens public sector consulting`,
    ].join('\n'), { lineGap: 1.5 });
    doc.moveDown(0.3);

    // Another garbled block
    doc.font('Courier').fontSize(6).fillColor('#999999');
    doc.text(`{"@type":"Organization","name":"Sopra Steria","url":"https://www.soprasteria.com","logo":"https://media.licdn.com/dms/image/...","sameAs":["https://twitter.com/sopaborasteria","https://www.facebook.com/SopraSteria"],"numberOfEmployees":{"@type":"QuantitativeValue","value":56000},"revenue":"5.8B EUR"} <!-- json-ld extracted -->`);
    doc.moveDown(0.6);

    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#0a66c2').lineWidth(1).stroke();
    doc.moveDown(0.5);

    // ── AKKA / AKKODIS ──
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0a66c2');
    doc.text('AKKA Technologies / Akkodis (Adecco Group)');
    doc.font('Helvetica').fontSize(7).fillColor('#666666');
    doc.text(`scraped: 2025-11-15T14:51:33+01:00 | merged profiles: akka-technologies + akkodis | DUPLICATE ALERT`);
    doc.moveDown(0.4);

    doc.font('Helvetica').fontSize(9).fillColor('#333333');
    doc.text([
      `${rb()} Industry: Engineering R&D Services / Technology Consulting`,
      `${rb()} Status: AKKA Technologies acquired by Adecco Group (2022), merged \u2192 Akkodis (Jan 2023)`,
      `${rb()} HQ: Zurich (Akkodis/Adecco) \u2014 prev. Brussels (AKKA) ${DASH} NOTE: multiple HQ claims in data`,
      `${rb()} Employees: ~50,000 (Akkodis global) | AKKA pre-merger: ~21,000`,
      `${rb()} Revenue: part of Adecco Group (CHF 22.7B group) ${DASH} Akkodis segment: ~EUR 4.5B est.`,
      `${rb()} Sp${APOS}cialisations: automotive R&D, a${APOS}ronautique, embedded systems, digital twin, MBD/MBSE`,
    ].join('\n'), { lineGap: 2 });
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#cc6600');
    doc.text('\u26a0 COMPETITOR FLAG:');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Akkodis (ex-AKKA) is a DIRECT COMPETITOR in engineering consulting / technology staffing. They bid on same DGA, Airbus, Safran, and Stellantis contracts. Active on UGAP and BPI frameworks. Approach with caution ${DASH} intelligence gathering ONLY, do not share pricing or capacity data. Competitive intel team notified (ref: CI-2025-0891).`);
    doc.moveDown(0.3);

    // Fake cookie/tracking junk
    doc.font('Courier').fontSize(5).fillColor('#bbbbbb');
    doc.text(`Set-Cookie: li_at=AQEDAQxxxxxx; Path=/; Secure; HttpOnly; SameSite=None\nSet-Cookie: JSESSIONID="ajax:1234567890"; Path=/; Secure\nX-Li-Fabric: prod-lva1\nX-Li-Pop: afd-prod-lva1-x\n<!-- page_instance: urn:li:page:company_profile;abc123== -->`);
    doc.moveDown(0.5);

    // Random encoding mess at the bottom
    doc.font('Helvetica').fontSize(6).fillColor('#aaaaaa');
    doc.text(`\u2500\u2500\u2500 END OF SCRAPE BATCH 2025-11-15_FR_IT_COMPANIES \u2500\u2500\u2500`);
    doc.text(`Records: 3 | Errors: 7 (encoding) | Skipped: 12 (rate-limited) | Duration: 847s`);
    doc.text(`Next batch scheduled: 22/11/2025 02:00 CET | Queue depth: 2,341 profiles`);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF 2 — 08_defense_procurement_gazette.pdf
// ─────────────────────────────────────────────────────────────────────────────

async function buildDefenseProcurement() {
  await writePDF('08_defense_procurement_gazette.pdf', (doc) => {
    // Official-looking header
    doc.font('Helvetica-Bold').fontSize(7).fillColor('#000066');
    doc.text('REPUBLIQUE FRANCAISE', { align: 'center' });
    doc.font('Helvetica').fontSize(6).fillColor('#333333');
    doc.text('Minist\u00e8re des Arm\u00e9es \u2014 Direction G\u00e9n\u00e9rale de l\u2019Armement (DGA)', { align: 'center' });
    doc.moveDown(0.2);
    doc.moveTo(120, doc.y).lineTo(475, doc.y).strokeColor('#000066').lineWidth(1.5).stroke();
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(11).fillColor('#000066');
    doc.text('AVIS DE MARCHE PUBLIC', { align: 'center' });
    doc.font('Helvetica').fontSize(7).fillColor('#333333');
    doc.text('Publi\u00e9 au Bulletin Officiel des Annonces de March\u00e9s Publics (BOAMP)', { align: 'center' });
    doc.text('et au Journal Officiel de l\u2019Union Europ\u00e9enne (JOUE / TED)', { align: 'center' });
    doc.moveDown(0.5);

    // Reference block (dense codes)
    doc.font('Courier').fontSize(6.5).fillColor('#333333');
    doc.text([
      `R\u00e9f\u00e9rence BOAMP: 25-178432    |  R\u00e9f. TED/JOUE: 2025/S 221-678901`,
      `N\u00b0 de march\u00e9: MARCHE-DGA-2025-MSNG-0047-LOT3`,
      `CPV Principal: 72210000-0 (Services de programmation de progiciels)`,
      `CPV Secondaires: 72212100-0, 72212517-6, 72220000-3, 38631000-7`,
      `NUTS: FR101 (Paris), FR242 (Cher \u2014 Bourges), FRJ21 (Hauts-de-Seine)`,
      `Code OTAN/NATO: NC 4925-15-XXX-XXXX (classifi\u00e9)`,
      `R\u00e9f. interne pouvoir adjudicateur: DGA/DT/SDTC/BPC/2025/0047`,
      `Date publication BOAMP: 07/11/2025   |   Date publication TED: 09/11/2025`,
    ].join('\n'), { lineGap: 1.5 });
    doc.moveDown(0.5);

    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#999999').lineWidth(0.3).stroke();
    doc.moveDown(0.4);

    // Section I
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000066');
    doc.text('SECTION I : POUVOIR ADJUDICATEUR');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `I.1) Nom et adresses:`,
      `   Minist\u00e8re des Arm\u00e9es \u2014 Direction G\u00e9n\u00e9rale de l\u2019Armement (DGA)`,
      `   DGA Techniques terrestres, 7 rue des Mathurins, 92221 Bagneux Cedex`,
      `   SIRET: 110 020 025 00394   |   Code APE: 8422Z`,
      `   Point de contact: Bureau des Programmes Complexes (BPC), Division Syst\u00e8mes de Missiles`,
      `   T\u00e9l: +33 (0)1 46 XX XX XX   |   Fax: +33 (0)1 46 XX XX XX`,
      `   Courriel: bpc-missiles.dga@intradef.gouv.fr`,
      `   Profil acheteur: https://www.marches-publics.gouv.fr/?page=entreprise.AccueilEntreprise`,
      ``,
      `I.2) Proc\u00e9dure conjointe: Non`,
      `I.3) Communication: Acc\u00e8s libre et complet aux documents via le profil acheteur`,
      `I.4) Type de pouvoir adjudicateur: Minist\u00e8re \u2014 D\u00e9fense`,
      `I.5) Activit\u00e9 principale: D\u00e9fense`,
    ].join('\n'), { lineGap: 1.2 });
    doc.moveDown(0.5);

    // Section II
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000066');
    doc.text('SECTION II : OBJET DU MARCHE');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `II.1) \u00c9tendue du march\u00e9:`,
      `   II.1.1) Intitul\u00e9: Prestations d\u2019ing\u00e9nierie logicielle pour le d\u00e9veloppement et la`,
      `   qualification de modules logiciels embarqu\u00e9s critiques du syst\u00e8me de guidage`,
      `   missile \u2014 Programme MISSILE NOUVELLE G\u00c9N\u00c9RATION (MNG)`,
      `   II.1.2) Code CPV principal: 72210000-0`,
      `   II.1.3) Type de march\u00e9: Services`,
      `   II.1.4) Description succincte:`,
      `   Le pr\u00e9sent march\u00e9 porte sur la fourniture de prestations d\u2019assistance technique`,
      `   et d\u2019ing\u00e9nierie logicielle au profit de MBDA France dans le cadre du programme MNG.`,
      `   Les prestations couvrent le d\u00e9veloppement, la v\u00e9rification et la validation de`,
      `   logiciels embarqu\u00e9s de niveau de criticit\u00e9 DAL A conform\u00e9ment \u00e0 la norme`,
      `   DO-178C/ED-12C et ses suppl\u00e9ments (DO-330 qualification outils, DO-331 MBD,`,
      `   DO-332 OO, DO-333 m\u00e9thodes formelles le cas \u00e9ch\u00e9ant).`,
    ].join('\n'), { lineGap: 1.2 });
    doc.moveDown(0.3);

    doc.text([
      `   II.1.5) Valeur totale estim\u00e9e: 45 000 000,00 EUR HT`,
      `          (quarante-cinq millions d\u2019euros hors taxes)`,
      `          D\u00e9composition indicative:`,
      `            Lot 1 \u2014 D\u00e9veloppement noyau guidage: 22M EUR`,
      `            Lot 2 \u2014 V&V et qualification: 12M EUR`,
      `            Lot 3 \u2014 Assistance technique sur site (Bourges / Le Plessis-Robinson): 8M EUR`,
      `            Lot 4 \u2014 Maintien en condition op\u00e9rationnelle logiciel (MCO-L): 3M EUR`,
      `   II.1.6) Division en lots: Oui (voir Section VI pour d\u00e9tails)`,
    ].join('\n'), { lineGap: 1.2 });
    doc.moveDown(0.3);

    doc.text([
      `   II.2) Description:`,
      `   II.2.1) D\u00e9nomination: Accord-cadre \u00e0 bons de commande, multi-attributaire (3 titulaires max.)`,
      `   II.2.2) Code(s) CPV additionnel(s): 72212100-0, 72212517-6`,
      `   II.2.3) Lieu d\u2019ex\u00e9cution principal:`,
      `      MBDA France, Site de Bourges (18), 1 avenue R\u00e9aumur, 18000 Bourges`,
      `      MBDA France, Si\u00e8ge, 1 avenue R\u00e9aumur, 92350 Le Plessis-Robinson`,
      `      Code NUTS: FR242 / FRJ21`,
      `   II.2.4) Description des prestations:`,
    ].join('\n'), { lineGap: 1.2 });
    doc.moveDown(0.2);

    // Dense technical requirements
    doc.font('Helvetica').fontSize(7.5).fillColor('#333333');
    doc.text([
      `   Le titulaire devra fournir des ing\u00e9nieurs logiciels embarqu\u00e9s qualifi\u00e9s disposant:`,
      `   (a) d\u2019une exp\u00e9rience minimale de 5 ans en d\u00e9veloppement DO-178C DAL A/B;`,
      `   (b) d\u2019une habilitation de s\u00e9curit\u00e9 de niveau \u00ab Secret D\u00e9fense \u00bb (ou capacit\u00e9 \u00e0`,
      `       l\u2019obtenir sous 6 mois \u2014 art. R.2311-1 et suivants du Code de la D\u00e9fense);`,
      `   (c) d\u2019une ma\u00eetrise des langages Ada (SPARK), C/C++ embarqu\u00e9, et des m\u00e9thodologies`,
      `       MBSE (SysML/UML) conform\u00e9ment au r\u00e9f\u00e9rentiel MBDA-STD-SW-100;`,
      `   (d) de certifications souhait\u00e9es: ISTQB Advanced (Test Manager ou Test Analyst),`,
      `       CSEP (INCOSE), ou \u00e9quivalent reconnu par la DGA.`,
      ``,
      `   L\u2019entreprise b\u00e9n\u00e9ficiaire (MBDA France SAS, RCS Nanterre 487 534 482, CA: 4,2 Mds EUR,`,
      `   effectif: ~15 000 salari\u00e9s, activit\u00e9: conception et fabrication de syst\u00e8mes de missiles`,
      `   et de d\u00e9fense a\u00e9rienne) assurera la direction technique du programme.`,
    ].join('\n'), { lineGap: 1.2 });
    doc.moveDown(0.4);

    // Section III
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000066');
    doc.text('SECTION III : INFORMATIONS JURIDIQUES, \u00c9CONOMIQUES, FINANCI\u00c8RES ET TECHNIQUES');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(7.5).fillColor('#333333');
    doc.text([
      `III.1) Conditions de participation:`,
      `   III.1.1) Habilitation: Le candidat doit \u00eatre habilit\u00e9 \u00ab Confidentiel D\u00e9fense \u00bb minimum`,
      `   (cf. art. R.2311-1 Code de la D\u00e9fense, IGI 1300, II 910, arr\u00eat\u00e9 du 30/11/2011).`,
      `   III.1.2) Capacit\u00e9 \u00e9conomique et financi\u00e8re:`,
      `      \u2014 Chiffre d\u2019affaires annuel minimum: 10 M EUR sur les 3 derniers exercices`,
      `      \u2014 Ratio de solvabilit\u00e9 > 1.2 (fonds propres / dettes LT)`,
      `      \u2014 Attestation d\u2019assurance RC professionnelle couvrant a minima 20 M EUR`,
      `   III.1.3) Capacit\u00e9 technique et professionnelle:`,
      `      \u2014 R\u00e9f\u00e9rences: au moins 3 projets DO-178C DAL A livr\u00e9s dans les 5 derni\u00e8res ann\u00e9es`,
      `      \u2014 Certification EN 9100:2018 (ou \u00e9quivalent) et/ou CMMI DEV niveau 3+`,
      `      \u2014 Processus de gestion de configuration conforme DO-178C \u00a77.2 / \u00a77.3`,
      `   III.1.4) Crit\u00e8res d\u2019exclusion: art. L.2141-1 \u00e0 L.2141-11 du CCP (exclusions de plein droit`,
      `      et exclusions facultatives). D\u00e9claration sur l\u2019honneur (DC1) et certificats (DC2) requis.`,
      ``,
      `   III.2) Conditions li\u00e9es au march\u00e9:`,
      `   III.2.1) Clause de s\u00e9curit\u00e9 d\u2019approvisionnement (art. L.2391-1 CCP): applicable`,
      `   III.2.2) Clause de secret (IGI 1300, II 910, Annexe 4): applicable`,
      `   III.2.3) R\u00e9vision des prix: index Syntec annuel (r\u00e9f. INSEE 1645908)`,
    ].join('\n'), { lineGap: 1.0 });
    doc.moveDown(0.4);

    // Section IV
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000066');
    doc.text('SECTION IV : PROCEDURE');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(7.5).fillColor('#333333');
    doc.text([
      `IV.1) Description:`,
      `   IV.1.1) Type de proc\u00e9dure: Proc\u00e9dure n\u00e9goci\u00e9e avec mise en concurrence pr\u00e9alable`,
      `   (art. L.2324-1 du Code de la Commande Publique, march\u00e9 de d\u00e9fense et de s\u00e9curit\u00e9`,
      `   au sens de la Directive 2009/81/CE)`,
      `   IV.1.2) Accord-cadre: Oui \u2014 dur\u00e9e 3 ans (36 mois) + 1 an de reconduction possible`,
      `   IV.1.3) Enchantement \u00e9lectronique: Non`,
      ``,
      `IV.2) Renseignements d\u2019ordre administratif:`,
      `   IV.2.1) Date limite de r\u00e9ception des offres: 15/01/2026 \u00e0 12:00 (heure de Paris)`,
      `   IV.2.2) Date d\u2019envoi des invitations \u00e0 n\u00e9gocier: 01/03/2026 (estimatif)`,
      `   IV.2.3) Langues: fran\u00e7ais (documents techniques accept\u00e9s en anglais si accompagn\u00e9s`,
      `   d\u2019une traduction certifi\u00e9e conforme)`,
      `   IV.2.4) D\u00e9lai de validit\u00e9 des offres: 180 jours \u00e0 compter de la date limite`,
    ].join('\n'), { lineGap: 1.0 });
    doc.moveDown(0.4);

    // Section V — award criteria
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000066');
    doc.text('SECTION V : CRIT\u00c8RES D\u2019ATTRIBUTION');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(7.5).fillColor('#333333');
    doc.text([
      `V.1) Crit\u00e8res d\u2019attribution (pond\u00e9ration):`,
      `   1. Valeur technique de l\u2019offre ................................. 55%`,
      `      1a. Ad\u00e9quation des profils propos\u00e9s (exp. DO-178C) .... 25%`,
      `      1b. M\u00e9thodologie et organisation projet ................ 15%`,
      `      1c. D\u00e9marche qualit\u00e9 et gestion des risques ........... 10%`,
      `      1d. Capacit\u00e9 de mont\u00e9e en charge (\u00e9quipe de 40+ ETP) .. 5%`,
      `   2. Prix des prestations .................................... 35%`,
      `   3. D\u00e9lai de mobilisation .................................. 10%`,
      ``,
      `V.2) Offre anormalement basse: art. L.2152-5 et R.2152-3 CCP \u2014 proc\u00e9dure applicable`,
    ].join('\n'), { lineGap: 1.0 });
    doc.moveDown(0.4);

    // Section VI — additional info
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#000066');
    doc.text('SECTION VI : RENSEIGNEMENTS COMPL\u00c9MENTAIRES');
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(7.5).fillColor('#333333');
    doc.text([
      `VI.1) March\u00e9 li\u00e9 \u00e0 un programme financ\u00e9 par des fonds UE: Non`,
      `   Financement: budget du minist\u00e8re des Arm\u00e9es, programme 146 \u00ab \u00c9quipement des forces \u00bb,`,
      `   BOP 146-0075, UO 0178-EM-MISSILES, conform\u00e9ment \u00e0 la LPM 2024-2030`,
      `   (loi n\u00b0 2023-703 du 1er ao\u00fbt 2023 relative \u00e0 la programmation militaire).`,
      ``,
      `VI.2) Informations compl\u00e9mentaires:`,
      `   a) Le march\u00e9 est soumis \u00e0 l\u2019article L.2512-5 du CCP (march\u00e9 de d\u00e9fense/s\u00e9curit\u00e9).`,
      `   b) Visite obligatoire du site MBDA Bourges pr\u00e9alable au d\u00e9p\u00f4t d\u2019offre.`,
      `      Cr\u00e9neaux: 02/12/2025, 09/12/2025, 16/12/2025 (inscription via profil acheteur).`,
      `   c) Sous-traitance: limit\u00e9e \u00e0 30% du montant total, sous r\u00e9serve d\u2019agr\u00e9ment DGA.`,
      `   d) Le pouvoir adjudicateur se r\u00e9serve le droit de n\u00e9gocier conform\u00e9ment \u00e0`,
      `      l\u2019art. R.2324-3 du CCP sans limitation du nombre de phases de n\u00e9gociation.`,
      `   e) Recours: Tribunal Administratif de Paris, r\u00e9f\u00e9r\u00e9 pr\u00e9contractuel (art. L.551-1 CJA)`,
      `      D\u00e9lai: avant la signature du march\u00e9. R\u00e9f\u00e9r\u00e9 contractuel: art. L.551-13 CJA.`,
      ``,
      `VI.3) R\u00e9f\u00e9rences r\u00e9glementaires compl\u00e8tes:`,
      `   \u2014 Code de la Commande Publique (CCP), Partie 2, Livre 3, Titre 2`,
      `   \u2014 Directive 2009/81/CE du 13 juillet 2009 (march\u00e9s de d\u00e9fense)`,
      `   \u2014 D\u00e9cret n\u00b0 2019-1344 du 12 d\u00e9cembre 2019 (partie r\u00e9glementaire du CCP)`,
      `   \u2014 Arr\u00eat\u00e9 du 22/03/2019 fixant la liste des habilitations requises`,
      `   \u2014 IGI 1300 (instruction g\u00e9n\u00e9rale interminist\u00e9rielle n\u00b0 1300/SGDSN/PSE)`,
      `   \u2014 II 910 (instruction interminist\u00e9rielle n\u00b0 910)`,
      `   \u2014 DO-178C/ED-12C (Software Considerations in Airborne Systems)`,
      `   \u2014 DO-330/ED-215 (Software Tool Qualification Considerations)`,
      `   \u2014 Norme EN 9100:2018 (SMQ A\u00e9rospatiale et D\u00e9fense)`,
      `   \u2014 R\u00e8glement (UE) 2016/679 RGPD \u2014 applicable aux donn\u00e9es personnelles des intervenants`,
    ].join('\n'), { lineGap: 1.0 });
    doc.moveDown(0.5);

    // Footer
    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#000066').lineWidth(1).stroke();
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(6).fillColor('#666666');
    doc.text('Avis publi\u00e9 le 07/11/2025 au BOAMP sous le n\u00b0 25-178432. Reproduction conforme au Journal Officiel.', { align: 'center' });
    doc.text('Direction de l\u2019information l\u00e9gale et administrative \u2014 26 rue Desaix, 75727 Paris Cedex 15', { align: 'center' });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF 3 — 09_energy_sector_report.pdf
// ─────────────────────────────────────────────────────────────────────────────

async function buildEnergySectorReport() {
  await writePDF('09_energy_sector_report.pdf', (doc) => {
    // Title page
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#666666');
    doc.text('CONFIDENTIEL \u2014 USAGE INTERNE UNIQUEMENT', { align: 'right' });
    doc.text('R\u00e9f.: STRAT-NRJ-2025-Q4-003 | v2.1-DRAFT', { align: 'right' });
    doc.moveDown(2);

    doc.font('Helvetica-Bold').fontSize(18).fillColor('#1a3c6e');
    doc.text('Rapport Sectoriel \u00c9nergie', { align: 'center' });
    doc.fontSize(12).fillColor('#336699');
    doc.text('Analyse Strat\u00e9gique des Opportunit\u00e9s de Placement', { align: 'center' });
    doc.text('& Besoins en Ing\u00e9nierie Externe', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(9).fillColor('#666666');
    doc.text('P\u00e9riode: T3-T4 2025 | Publication interne: Novembre 2025', { align: 'center' });
    doc.text('Direction du D\u00e9veloppement Commercial \u2014 Practice \u00c9nergie & Utilities', { align: 'center' });
    doc.moveDown(1);

    doc.moveTo(100, doc.y).lineTo(495, doc.y).strokeColor('#1a3c6e').lineWidth(2).stroke();
    doc.moveDown(0.5);

    // Table of contents (messy)
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#333333');
    doc.text('SOMMAIRE');
    doc.font('Helvetica').fontSize(7.5).fillColor('#555555');
    doc.text([
      `1. Synth\u00e8se ex\u00e9cutive ........................................... 1`,
      `2. EDF Group \u2014 Profil & opportunit\u00e9s .......................... 2`,
      `3. Framatome / Intercontr\u00f4le \u2014 Filiales nucl\u00e9aire ........... 3`,
      `4. TotalEnergies \u2014 Transition & hydrog\u00e8ne .................... 4`,
      `5. Cadre r\u00e9glementaire & financement .......................... 5`,
      `6. Annexes (sources, m\u00e9thodologie, avertissements) ............ 6`,
    ].join('\n'), { lineGap: 1.5 });
    doc.moveDown(0.8);

    // NOTE: page numbers are fake/decorative since this is a continuous doc

    // ── Section 1: Executive Summary ──
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a3c6e');
    doc.text('1. SYNTH\u00c8SE EX\u00c9CUTIVE');
    doc.moveDown(0.2);
    doc.moveTo(45, doc.y).lineTo(300, doc.y).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.moveDown(0.3);

    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Le secteur \u00e9nerg\u00e9tique fran\u00e7ais traverse une phase de transformation majeure, port\u00e9e par la relance nucl\u00e9aire (programme EPR2, Grand Car\u00e9nage), la transition \u00e9nerg\u00e9tique (hydrog\u00e8ne vert, \u00e9olien offshore) et les investissements massifs du plan France 2030. Les trois acteurs cl\u00e9s analys\u00e9s \u2014 EDF, Framatome et TotalEnergies \u2014 repr\u00e9sentent un march\u00e9 adressable estim\u00e9 \u00e0 850M EUR/an en prestations d\u2019ing\u00e9nierie externe\u00b9.\n\nLe contexte r\u00e9glementaire (ASN, LPM, France 2030) cr\u00e9e des barri\u00e8res \u00e0 l\u2019entr\u00e9e favorables aux acteurs d\u00e9j\u00e0 habilit\u00e9s et r\u00e9f\u00e9renc\u00e9s. Recommandation: prioriser le positionnement sur les lots nucl\u00e9aires (EDF/Framatome) o\u00f9 les marges sont sup\u00e9rieures de 15-20% au march\u00e9 IT classique.`, {
      lineGap: 1.5,
      width: 500,
    });
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text(`\u00b9 Source: estimation interne bas\u00e9e sur donn\u00e9es OPECST, ASN, rapports annuels 2024. Marge d\u2019erreur: \u00b115%.`);
    doc.moveDown(0.5);

    // Chart placeholder
    doc.font('Courier').fontSize(7).fillColor('#888888');
    doc.text(`[GRAPHIQUE: R\u00e9partition march\u00e9 ing\u00e9nierie externe \u00e9nergie FR 2025]`);
    doc.text(`  EDF Group:        42%  |${'='.repeat(21)}|`);
    doc.text(`  TotalEnergies:    28%  |${'='.repeat(14)}|`);
    doc.text(`  Framatome:        15%  |${'='.repeat(8)}|`);
    doc.text(`  Orano/autres:     15%  |${'='.repeat(8)}|`);
    doc.text(`[Source: analyse interne Practice NRJ, Nov 2025 \u2014 NE PAS DIFFUSER]`);
    doc.moveDown(0.6);

    // ── Section 2: EDF ──
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a3c6e');
    doc.text('2. EDF GROUP \u2014 PROFIL & OPPORTUNIT\u00c9S');
    doc.moveDown(0.2);
    doc.moveTo(45, doc.y).lineTo(350, doc.y).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.moveDown(0.3);

    // Simulated two-column layout (left column text, right column key facts box)
    const savedY = doc.y;

    // "Left column" — main text
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`\u00c9lectricit\u00e9 de France (EDF) est le premier \u00e9lectricien mondial et le pilier de la fili\u00e8re nucl\u00e9aire fran\u00e7aise. Renationalis\u00e9 en juin 2023 (retrait de la cote Euronext), le groupe est d\u00e9sormais d\u00e9tenu \u00e0 100% par l\u2019\u00c9tat fran\u00e7ais, ce qui modifie significativement les modalit\u00e9s de contractualisation (r\u00e8gles de la commande publique partiellement applicables, cf. ordonnance n\u00b0 2015-899 modifi\u00e9e).`, {
      width: 290,
      lineGap: 1.3,
    });
    doc.moveDown(0.3);

    // "Right column" — key facts box
    doc.save();
    const boxX = 355;
    doc.rect(boxX, savedY, 195, 110).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.rect(boxX, savedY, 195, 16).fill('#1a3c6e');
    doc.font('Helvetica-Bold').fontSize(7).fillColor('#ffffff');
    doc.text('FICHE SYNTH\u00c9TIQUE', boxX + 5, savedY + 4, { width: 185 });
    doc.font('Helvetica').fontSize(7).fillColor('#333333');
    const factsY = savedY + 20;
    doc.text([
      `Raison sociale: EDF SA`,
      `SIREN: 552 081 317`,
      `Si\u00e8ge: 22-30 av. de Wagram, 75008 Paris`,
      `Effectifs: ~165 000 (groupe, 2024)`,
      `CA 2024: 143 Mds EUR`,
      `Parc nucl\u00e9aire: 56 r\u00e9acteurs (REP)`,
      `PDG: Luc R\u00e9mont (depuis 11/2022)`,
      `Habilitation: TS (Tr\u00e8s Secret)`,
    ].join('\n'), boxX + 5, factsY, { width: 185, lineGap: 1 });
    doc.restore();

    // Continue left column below box
    doc.y = savedY + 120;

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('2.1 Programme EPR2 (Nouveau Nucl\u00e9aire)');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Le programme EPR2 pr\u00e9voit la construction de 6 \u00e0 14 nouveaux r\u00e9acteurs de type EPR2 (1 670 MWe) sur les sites de Penly (76), Gravelines (59) et Bugey (01). Premi\u00e8re mise en service vis\u00e9e: 2035-2037. Budget total estim\u00e9: 51,7 Mds EUR (r\u00e9vision CdC 2025, +30% vs. estimation initiale 2022\u00b2).`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.3);

    doc.text(`Besoins en ing\u00e9nierie externe identifi\u00e9s:\n  ${rb()} Ing\u00e9nieurs contr\u00f4le-commande (I&C) nucl\u00e9aire: ~200 ETP/an (2026-2032)\n  ${rb()} Ing\u00e9nieurs s\u00fbret\u00e9 nucl\u00e9aire (qualification IPS): ~80 ETP/an\n  ${rb()} Sp\u00e9cialistes g\u00e9nie civil nucl\u00e9aire (b\u00e9ton, liner, radier): ~150 ETP/an\n  ${rb()} Chefs de projet MOE/AMO cat\u00e9gorie A+ (exp. centrale nucl\u00e9aire): ~40 ETP/an\n  ${rb()} Ing\u00e9nieurs V&V logiciel cat\u00e9gorie IEC 61513 / IEC 60880: ~60 ETP/an`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text(`\u00b2 Source: Cour des Comptes, rapport th\u00e9matique "Le nouveau nucl\u00e9aire", f\u00e9vrier 2025. Chiffres hors financement EURATOM.`);
    doc.moveDown(0.4);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('2.2 Grand Car\u00e9nage (Maintenance Parc Existant)');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Programme d\u2019investissement de ~66 Mds EUR (2014-2035) visant \u00e0 prolonger la dur\u00e9e de vie du parc nucl\u00e9aire existant au-del\u00e0 de 40 ans (vis\u00e9e: 60 ans, sous r\u00e9serve avis ASN). Comprend les 4\u00e8me visites d\u00e9cennales (VD4), le remplacement des g\u00e9n\u00e9rateurs de vapeur (GV), la mise \u00e0 niveau post-Fukushima (noyau dur), et la modernisation I&C (remplacement syst\u00e8mes Controbloc par plateforme SPINLINE).`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.2);

    // Chart placeholder
    doc.font('Courier').fontSize(7).fillColor('#888888');
    doc.text(`[GRAPHIQUE: Evolution CA EDF 2020-2025 et projection 2026-2030]`);
    doc.text(`  2020:  69.0 Mds  |${'#'.repeat(14)}              |`);
    doc.text(`  2021:  84.5 Mds  |${'#'.repeat(17)}              |`);
    doc.text(`  2022: 143.5 Mds  |${'#'.repeat(29)}              |`);
    doc.text(`  2023: 139.7 Mds  |${'#'.repeat(28)}              |`);
    doc.text(`  2024: 143.0 Mds  |${'#'.repeat(29)}              |`);
    doc.text(`  2025e: 148 Mds   |${'#'.repeat(30)}(p)           |`);
    doc.text(`[NB: 2022/2023 incluent effets prix de march\u00e9 exceptionnels post-crise \u00e9nerg\u00e9tique]`);
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text(`(p) = pr\u00e9visionnel. Source: rapports annuels EDF, estimations Bloomberg Intelligence.`);
    doc.moveDown(0.5);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('2.3 Recrutement & Prestations Externes');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`EDF a annonc\u00e9 un plan de recrutement de 15 000 personnes/an sur 2024-2030 pour compenser les d\u00e9parts en retraite et renforcer les \u00e9quipes programme. Malgr\u00e9 cet effort, le recours \u00e0 l\u2019ing\u00e9nierie externe reste massif: budget achats prestations intellectuelles 2025 estim\u00e9 \u00e0 2,3 Mds EUR (dont ~1,1 Mds pour la seule DIPNN\u00b3). Les cadres de r\u00e9f\u00e9rencement principaux sont: APTITUDE (IS/IT), CAMELEON (ing\u00e9nierie nucl\u00e9aire), et accords-cadres sp\u00e9cifiques Grand Car\u00e9nage.`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text(`\u00b3 DIPNN: Direction Ing\u00e9nierie et Projets Nouveau Nucl\u00e9aire. Cr\u00e9\u00e9e en 2021 pour piloter EPR2.`);
    doc.moveDown(0.6);

    // ── Section 3: Framatome ──
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a3c6e');
    doc.text('3. FRAMATOME / INTERCONTR\u00d4LE \u2014 FILIALES NUCL\u00c9AIRE');
    doc.moveDown(0.2);
    doc.moveTo(45, doc.y).lineTo(400, doc.y).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.moveDown(0.3);

    // Two-column simulation for Framatome
    const fraY = doc.y;
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Framatome (ex-AREVA NP, renomm\u00e9e en 2018) est le principal fournisseur d\u2019\u00e9quipements et de combustible nucl\u00e9aire en France et l\u2019un des leaders mondiaux. Filiale \u00e0 75,5% d\u2019EDF (24,5% d\u00e9tenus par le CEA via Cogema/Orano), la soci\u00e9t\u00e9 emploie environ 18 000 salari\u00e9s dans le monde dont ~12 000 en France (sites: Le Creusot, Romans-sur-Is\u00e8re, Jeumont, Saint-Marcel, Lyon-Gerland, Paris).`, {
      width: 290,
      lineGap: 1.3,
    });

    // Right box
    doc.save();
    doc.rect(355, fraY, 195, 95).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.rect(355, fraY, 195, 16).fill('#1a3c6e');
    doc.font('Helvetica-Bold').fontSize(7).fillColor('#ffffff');
    doc.text('FRAMATOME \u2014 CHIFFRES CL\u00c9S', 360, fraY + 4, { width: 185 });
    doc.font('Helvetica').fontSize(7).fillColor('#333333');
    doc.text([
      `SIREN: 379 287 472`,
      `Si\u00e8ge: Tour AREVA, 92400 Courbevoie`,
      `Effectifs: ~18 000`,
      `CA 2024: ~3.8 Mds EUR (estim.)`,
      `Actionnariat: EDF 75.5%, CEA 24.5%`,
      `Certifications: ISO 9001, ISO 14001`,
      `  ISO 19443, AFCEN RCC-M/E/CW`,
    ].join('\n'), 360, fraY + 20, { width: 185, lineGap: 1 });
    doc.restore();

    doc.y = fraY + 105;

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('3.1 Activit\u00e9s & Enjeux');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `Framatome intervient sur l\u2019ensemble du cycle de vie des centrales nucl\u00e9aires:`,
      `  ${rb()} Conception et fabrication des cuves, couvercles, int\u00e9grateurs et \u00e9quipements primaires`,
      `  ${rb()} Assemblages de combustible (MOX et UO2) \u2014 usine de Romans-sur-Is\u00e8re`,
      `  ${rb()} Instrumentation et contr\u00f4le-commande (plateforme TELEPERM XS / SPINLINE)`,
      `  ${rb()} Services de maintenance et r\u00e9novation pour le parc install\u00e9 (58 r\u00e9acteurs worldwide)`,
      `  ${rb()} D\u00e9veloppement des \u00e9quipements EPR2 (cuve, GV, m\u00e9canismes de grappe)`,
      ``,
      `Enjeu critique: les retards historiques du Creusot (probl\u00e8mes qualit\u00e9 forge, rapports ASN 2016-2019)`,
      `ont conduit \u00e0 un plan de transformation industrielle encore en cours. La mont\u00e9e en cadence pour`,
      `EPR2 n\u00e9cessite un doublement des capacit\u00e9s de forge et d\u2019usinage d\u2019ici 2028\u2074.`,
    ].join('\n'), {
      width: 500,
      lineGap: 1.2,
    });
    doc.moveDown(0.2);
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text(`\u2074 Source: Framatome, pr\u00e9sentation investisseurs mars 2025. Budget d\u2019investissement Creusot: 600M EUR sur 2023-2028.`);
    doc.moveDown(0.4);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('3.2 Focus: Intercontr\u00f4le (filiale)');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`Intercontr\u00f4le (filiale 100% Framatome) est sp\u00e9cialis\u00e9e dans les contr\u00f4les non destructifs (CND/NDT) et l\u2019instrumentation de s\u00fbret\u00e9 nucl\u00e9aire. Effectif: ~1 200 collaborateurs. Activit\u00e9s principales: inspection en service des composants primaires (ultrasons, courants de Foucault), d\u00e9veloppement de robots d\u2019inspection t\u00e9l\u00e9command\u00e9s, qualification AFCEN. Opportunit\u00e9 identifi\u00e9e: besoin de 30-40 ing\u00e9nieurs logiciels embarqu\u00e9s temps r\u00e9el pour la nouvelle g\u00e9n\u00e9ration d\u2019\u00e9quipements CND (programme NEMO-3).`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.6);

    // ── Section 4: TotalEnergies ──
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a3c6e');
    doc.text('4. TOTALENERGIES \u2014 TRANSITION \u00c9NERG\u00c9TIQUE & HYDROG\u00c8NE');
    doc.moveDown(0.2);
    doc.moveTo(45, doc.y).lineTo(400, doc.y).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.moveDown(0.3);

    const teY = doc.y;
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`TotalEnergies SE (ex-Total, renomm\u00e9 en mai 2021) est la premi\u00e8re entreprise fran\u00e7aise par le chiffre d\u2019affaires et l\u2019une des majors \u00e9nerg\u00e9tiques mondiales (supermajor). Le groupe op\u00e8re dans la production et distribution de p\u00e9trole, gaz naturel, GNL, \u00e9lectricit\u00e9 renouvelable (solaire, \u00e9olien), et investit massivement dans l\u2019hydrog\u00e8ne vert/bleu, les batteries et le CCUS (capture carbone).`, {
      width: 290,
      lineGap: 1.3,
    });

    // Right box
    doc.save();
    doc.rect(355, teY, 195, 110).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.rect(355, teY, 195, 16).fill('#1a3c6e');
    doc.font('Helvetica-Bold').fontSize(7).fillColor('#ffffff');
    doc.text('TOTALENERGIES \u2014 CHIFFRES CL\u00c9S', 360, teY + 4, { width: 185 });
    doc.font('Helvetica').fontSize(7).fillColor('#333333');
    doc.text([
      `SIREN: 542 051 180`,
      `Si\u00e8ge: Tour Coupole, 92078 La D\u00e9fense`,
      `Effectifs: ~100 000 (monde)`,
      `CA 2024: 218 Mds USD (~200 Mds EUR)`,
      `R\u00e9sultat net: 15.8 Mds USD`,
      `PDG: Patrick Pouyann\u00e9 (depuis 2014)`,
      `Cotation: CAC 40, NYSE (TTE)`,
      `Cap. boursiere: ~145 Mds EUR`,
    ].join('\n'), 360, teY + 20, { width: 185, lineGap: 1 });
    doc.restore();

    doc.y = teY + 120;

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('4.1 Projets Hydrog\u00e8ne');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `TotalEnergies a annonc\u00e9 un plan d\u2019investissement de 2 Mds USD dans l\u2019hydrog\u00e8ne \u00e0 horizon 2030:`,
      `  ${rb()} Projet MASSHYLIA (Chateauneuf-les-Martigues, 13): \u00e9lectrolyseur 40 MW, production`,
      `     H2 vert pour la bio-raffinerie de La M\u00e8de. Mise en service: 2026. Partenaire: Engie.`,
      `  ${rb()} Projet HyPSTER (Lavera, 13): stockage souterrain d\u2019H2 en cavit\u00e9 saline, pilote europ\u00e9en.`,
      `     Financement: Clean Hydrogen JU (ex-FCH JU), 5M EUR + co-financement TotalEnergies.`,
      `  ${rb()} Hub H2 Normandie: coupl\u00e9 \u00e0 l\u2019\u00e9olien offshore (parc Courseulles-sur-Mer, 450 MW),`,
      `     \u00e9lectrolyseur 200 MW pr\u00e9vu 2029. Approvisionnement industriel Vallery Seine.`,
      `  ${rb()} International: NeoH2 (Oman, 25 GW solaire/\u00e9olien, 1.2M tonnes H2 vert/an, horizon 2030+)`,
    ].join('\n'), {
      width: 500,
      lineGap: 1.2,
    });
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('4.2 Besoins Ing\u00e9nierie Identifi\u00e9s');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `  ${rb()} Ing\u00e9nieurs proc\u00e9d\u00e9 / process (sp\u00e9c. \u00e9lectrolyse PEM/alcaline): 50-70 ETP`,
      `  ${rb()} Automaticiens / DCS (ABB Ability, Schneider EcoStruxure, Yokogawa): 30-40 ETP`,
      `  ${rb()} Ing\u00e9nieurs s\u00e9curit\u00e9 industrielle (ATEX, H2 haute pression): 20-30 ETP`,
      `  ${rb()} Data scientists / ML engineers (predictive maintenance, digital twin): 40-50 ETP`,
      `  ${rb()} Chefs de projet EPCM (exp\u00e9rience green hydrogen ou similar): 15-20 ETP`,
      `  ${rb()} Cadres de r\u00e9f\u00e9rencement: FRAME TE-2024-ENG (ing\u00e9nierie) + TE-2024-DIG (digital)`,
    ].join('\n'), {
      width: 500,
      lineGap: 1.2,
    });
    doc.moveDown(0.5);

    // Chart placeholder
    doc.font('Courier').fontSize(7).fillColor('#888888');
    doc.text(`[GRAPHIQUE: Evolution investissements TotalEnergies dans les \u00e9nergies bas carbone]`);
    doc.text(`  2020:  2.1 Mds USD  |${'*'.repeat(4)}                                  |`);
    doc.text(`  2021:  3.0 Mds USD  |${'*'.repeat(6)}                                  |`);
    doc.text(`  2022:  4.0 Mds USD  |${'*'.repeat(8)}                                  |`);
    doc.text(`  2023:  5.0 Mds USD  |${'*'.repeat(10)}                                  |`);
    doc.text(`  2024:  5.5 Mds USD  |${'*'.repeat(11)}                                  |`);
    doc.text(`  2025e: 6.0 Mds USD  |${'*'.repeat(12)} (objectif: 25% capex total)      |`);
    doc.text(`[Source: TotalEnergies Strategy & Outlook 2024-2030, Sept. 2024]`);
    doc.moveDown(0.6);

    // ── Section 5: Regulatory ──
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a3c6e');
    doc.text('5. CADRE R\u00c9GLEMENTAIRE & FINANCEMENT');
    doc.moveDown(0.2);
    doc.moveTo(45, doc.y).lineTo(400, doc.y).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('5.1 Autorit\u00e9 de S\u00fbret\u00e9 Nucl\u00e9aire (ASN)');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`L\u2019ASN est l\u2019autorit\u00e9 administrative ind\u00e9pendante charg\u00e9e du contr\u00f4le de la s\u00fbret\u00e9 nucl\u00e9aire et de la radioprotection en France (loi TSN n\u00b02006-686, modifi\u00e9e par la loi n\u00b02024-450 du 21 mai 2024 fusionnant ASN et IRSN en une autorit\u00e9 unique \u00e0 compter du 1er janvier 2025).\n\nImplications pour les prestataires d\u2019ing\u00e9nierie:\n  ${rb()} Les intervenants sur les INB (Installations Nucl\u00e9aires de Base) doivent \u00eatre qualifi\u00e9s conform\u00e9ment au r\u00e9f\u00e9rentiel CEFRI (E/SPR, option RN pour les zones nucl\u00e9aires)\n  ${rb()} Exigences de tra\u00e7abilit\u00e9 renforc\u00e9es (arr\u00eat\u00e9 INB du 07/02/2012 modifi\u00e9)\n  ${rb()} Avis ASN 2025-AV-0412: renforcement des exigences en mati\u00e8re de sous-traitance en cascade (limitation \u00e0 2 niveaux max. pour les activit\u00e9s IPS)`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.4);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('5.2 France 2030 \u2014 Volet Nucl\u00e9aire');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text([
      `Le plan France 2030 (annonc\u00e9 oct. 2021, amplifi\u00e9 en 2023) alloue:`,
      `  ${rb()} 1 Md EUR pour les petits r\u00e9acteurs modulaires (SMR) et technologies innovantes`,
      `  ${rb()} 500 M EUR pour la fili\u00e8re combustible avanc\u00e9 et recyclage`,
      `  ${rb()} 2 Mds EUR pour la d\u00e9carbonation de l\u2019industrie (dont \u00e9lectrification nucl\u00e9aire)`,
      `  ${rb()} 700 M EUR pour l\u2019hydrog\u00e8ne d\u00e9carbon\u00e9 (appels \u00e0 projets ADEME/BPI)`,
      `  ${rb()} Budget formation fili\u00e8re nucl\u00e9aire: 100 M EUR (objectif: 100 000 emplois d\u2019ici 2035)`,
      ``,
      `Appels \u00e0 projets pertinents en cours:`,
      `  \u2014 AAP "R\u00e9acteurs Nucl\u00e9aires Innovants" (cl\u00f4ture: 31/03/2026)`,
      `  \u2014 AAP "Briques Technologiques Nucl\u00e9aires" (cl\u00f4ture: 15/06/2026)`,
      `  \u2014 AAP "Comp\u00e9tences Nucl\u00e9aires" \u2014 formation et reconversion (permanent)`,
    ].join('\n'), {
      width: 500,
      lineGap: 1.2,
    });
    doc.moveDown(0.4);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('5.3 Loi de Programmation Militaire (LPM) 2024-2030');
    doc.font('Helvetica').fontSize(8).fillColor('#333333');
    doc.text(`La LPM 2024-2030 (loi n\u00b0 2023-703 du 1er ao\u00fbt 2023) pr\u00e9voit 413 Mds EUR de besoins programm\u00e9s sur la p\u00e9riode. Bien que principalement orient\u00e9e d\u00e9fense, la LPM a des implications indirectes significatives pour le secteur \u00e9nerg\u00e9tique:\n  ${rb()} Protection des infrastructures nucl\u00e9aires critiques (OIV, directive NIS2 transpos\u00e9e)\n  ${rb()} Renforcement de la BITD (\u00e9nerg\u00e9ticiens comme fournisseurs strat\u00e9giques)\n  ${rb()} Propulsion nucl\u00e9aire navale (Naval Group/TechnicAtome \u2014 programme SNLE 3G/PA-NG)\n  ${rb()} Budget cyberd\u00e9fense: 4 Mds EUR, incluant protection des r\u00e9seaux \u00e9nerg\u00e9tiques\n  ${rb()} Impact sur les habilitations: dur\u00e9e d\u2019instruction allong\u00e9e (DGSI: 9-18 mois vs. 6-12 ant\u00e9rieurement)`, {
      width: 500,
      lineGap: 1.3,
    });
    doc.moveDown(0.5);

    // ── Section 6: Annexes ──
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#1a3c6e');
    doc.text('6. ANNEXES');
    doc.moveDown(0.2);
    doc.moveTo(45, doc.y).lineTo(200, doc.y).strokeColor('#1a3c6e').lineWidth(0.5).stroke();
    doc.moveDown(0.3);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('6.1 Sources & R\u00e9f\u00e9rences');
    doc.font('Helvetica').fontSize(7).fillColor('#555555');
    doc.text([
      `[1] EDF, Rapport Int\u00e9gr\u00e9 2024, publi\u00e9 mars 2025`,
      `[2] Framatome, "Investing in the Future of Nuclear Energy", pr\u00e9sentation mars 2025`,
      `[3] TotalEnergies, "Strategy & Outlook 2024-2030", septembre 2024`,
      `[4] TotalEnergies, Document d\u2019Enregistrement Universel 2024`,
      `[5] ASN, Rapport annuel sur l\u2019\u00e9tat de la s\u00fbret\u00e9 nucl\u00e9aire 2024, avril 2025`,
      `[6] Cour des Comptes, "Le nouveau nucl\u00e9aire", rapport th\u00e9matique, f\u00e9vrier 2025`,
      `[7] Loi n\u00b0 2023-703 du 1er ao\u00fbt 2023 relative \u00e0 la programmation militaire 2024-2030`,
      `[8] Loi n\u00b0 2024-450 du 21 mai 2024 (fusion ASN-IRSN)`,
      `[9] France 2030, tableau de bord des investissements, minist\u00e8re de l\u2019\u00c9conomie, oct. 2025`,
      `[10] OPECST, "Les besoins en comp\u00e9tences de la fili\u00e8re nucl\u00e9aire", rapport n\u00b0 1012, juin 2025`,
      `[11] Direction des achats EDF, pr\u00e9sentation fournisseurs CAMELEON v4, septembre 2025`,
      `[12] Bloomberg Intelligence, "European Utilities: Nuclear Renaissance", novembre 2025`,
    ].join('\n'), { lineGap: 1 });
    doc.moveDown(0.4);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#1a3c6e');
    doc.text('6.2 Avertissements & Limites');
    doc.font('Helvetica').fontSize(6.5).fillColor('#888888');
    doc.text(`Ce rapport est produit \u00e0 usage strictement interne. Les informations contenues sont issues de sources publiques (rapports annuels, publications officielles, presse sp\u00e9cialis\u00e9e) et d\u2019estimations propri\u00e9taires. Aucune garantie n\u2019est donn\u00e9e quant \u00e0 l\u2019exactitude, l\u2019exhaustivit\u00e9 ou l\u2019actualit\u00e9 des donn\u00e9es. Les projections financi\u00e8res sont indicatives et ne constituent pas un engagement. La diffusion externe de ce document est strictement interdite (cf. politique de confidentialit\u00e9 interne R\u00e9f. POL-CONF-003-v7). Les mentions de soci\u00e9t\u00e9s tierces ne pr\u00e9jugent d\u2019aucune relation commerciale existante ou future. Les noms de programmes classifi\u00e9s ont \u00e9t\u00e9 anonymis\u00e9s ou remplac\u00e9s par leurs d\u00e9signations publiques.`, {
      width: 500,
      lineGap: 1,
    });
    doc.moveDown(0.5);

    // Footer
    doc.moveTo(45, doc.y).lineTo(550, doc.y).strokeColor('#1a3c6e').lineWidth(1).stroke();
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(6).fillColor('#999999');
    doc.text('CONFIDENTIEL \u2014 R\u00e9f.: STRAT-NRJ-2025-Q4-003 | Practice \u00c9nergie & Utilities | Page [auto] / [auto]', { align: 'center' });
    doc.text('Derni\u00e8re modification: 14/11/2025 17:42 CET | Auteur: JBM | Relecteur: SLA | Statut: DRAFT v2.1', { align: 'center' });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Generating PDFs...');
  await buildLinkedinDump();
  await buildDefenseProcurement();
  await buildEnergySectorReport();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
