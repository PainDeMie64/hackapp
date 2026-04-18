const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'data', 'pdfs');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── helpers ───────────────────────────────────────────────────────────────────

function startPipe(doc, filename) {
  const ws = fs.createWriteStream(path.join(OUT_DIR, filename));
  doc.pipe(ws);
  return new Promise((resolve, reject) => {
    ws.on('finish', resolve);
    ws.on('error', reject);
  });
}

// Adds text with random font-size jitter and occasional mid-word font switches
// to make OCR / text-extraction harder.
function messyText(doc, text, opts = {}) {
  const baseSize = opts.size || 10;
  const x = opts.x;
  const y = opts.y;
  const width = opts.width || 480;
  const align = opts.align || 'justify';

  // Split into segments of varying length
  const segments = [];
  let i = 0;
  while (i < text.length) {
    const len = 3 + Math.floor(Math.random() * 30);
    segments.push(text.slice(i, i + len));
    i += len;
  }

  const fonts = ['Helvetica', 'Times-Roman', 'Courier'];
  for (const seg of segments) {
    const font = fonts[Math.floor(Math.random() * fonts.length)];
    const size = baseSize + (Math.random() * 1.4 - 0.7); // jitter ±0.7pt
    doc.font(font).fontSize(size);
  }

  // Actually render as a single block (the font switching above was just to
  // confuse internal state; we render with a settled font so it looks okay).
  doc.font('Helvetica').fontSize(baseSize);
  if (x !== undefined && y !== undefined) {
    doc.text(text, x, y, { width, align, lineGap: 1.2 });
  } else {
    doc.text(text, { width, align, lineGap: 1.2 });
  }
}

function heading(doc, text, opts = {}) {
  const size = opts.size || 14;
  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(size).text(text, { underline: !!opts.underline });
  doc.moveDown(0.3);
}

function subheading(doc, text) {
  doc.moveDown(0.4);
  doc.font('Helvetica-BoldOblique').fontSize(11).text(text);
  doc.moveDown(0.2);
}

// draw a light-grey box behind text to simulate a "sidebar"
function sidebar(doc, text, opts = {}) {
  const x = opts.x || 60;
  const y = doc.y;
  const w = opts.width || 470;
  doc.save();
  doc.rect(x, y, w, 14 + text.split('\n').length * 13).fill('#f0f0f0');
  doc.restore();
  doc.font('Courier').fontSize(8.5).fillColor('#333333')
    .text(text, x + 6, y + 6, { width: w - 12 });
  doc.fillColor('#000000');
  doc.moveDown(0.6);
}

// Renders a pseudo-table using fixed-width columns (hard to parse)
function pseudoTable(doc, headers, rows, opts = {}) {
  const startX = opts.x || 55;
  const colW = opts.colW || 110;
  const fontSize = opts.fontSize || 8;
  let y = doc.y;

  // header row
  doc.font('Helvetica-Bold').fontSize(fontSize);
  headers.forEach((h, i) => {
    doc.text(h, startX + i * colW, y, { width: colW - 4, align: 'left' });
  });
  y += 14;
  doc.moveTo(startX, y).lineTo(startX + headers.length * colW, y).stroke('#999999');
  y += 4;

  // data rows – alternate fonts to confuse parsers
  const rowFonts = ['Courier', 'Helvetica', 'Times-Roman'];
  rows.forEach((row, ri) => {
    const f = rowFonts[ri % rowFonts.length];
    doc.font(f).fontSize(fontSize);
    row.forEach((cell, ci) => {
      doc.text(String(cell), startX + ci * colW, y, { width: colW - 4, align: 'left' });
    });
    y += 13;
  });
  doc.y = y + 6;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PDF 1 — 28_internalization_signals.pdf
// ═══════════════════════════════════════════════════════════════════════════════

async function generatePDF1() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 55, right: 55 },
    info: {
      Title: 'European Technology Insourcing Trends — Q3 2025 Analysis',
      Author: 'Meridian Research Group',
      Subject: 'Internalization Signals',
    },
  });

  const promise = startPipe(doc, '28_internalization_signals.pdf');

  // --- page 1 ---
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#888888')
    .text('MERIDIAN RESEARCH GROUP — CONFIDENTIAL — NOT FOR DISTRIBUTION', { align: 'center' });
  doc.moveDown(1.5);

  doc.font('Times-Roman').fontSize(22).fillColor('#1a1a1a')
    .text('European Technology Insourcing Trends', { align: 'center' });
  doc.font('Times-Roman').fontSize(14).fillColor('#555555')
    .text('Quarterly Intelligence Briefing — Q3 2025', { align: 'center' });
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(8).fillColor('#999999')
    .text('Document reference: MRG-2025-Q3-INT-0028 | Classification: Restricted | Pages: 3', { align: 'center' });
  doc.fillColor('#000000');
  doc.moveDown(2);

  // Misleading section title
  heading(doc, '1. Market Overview and Digital Transformation Outlook');

  messyText(doc, `The European technology landscape continues to undergo significant structural transformation as organizations reassess their reliance on external service providers and consulting firms. This report examines the growing trend of internalization — the strategic decision by large enterprises to bring previously outsourced technology capabilities back in-house — and its implications for the professional services ecosystem across the continent. The analysis draws on proprietary survey data collected from 847 technology decision-makers across 14 European markets during Q2 and Q3 2025, supplemented by public filings, press releases, and interviews with C-suite executives at 23 organizations.`);

  doc.moveDown(0.3);
  messyText(doc, `It is worth noting at the outset that the internalization trend is neither uniform nor universal. While certain sectors — particularly adtech, gaming, and defense — have accelerated insourcing efforts, others continue to expand their use of external engineering consultancies. The nuances are critical for any firm seeking to understand prospecting viability across the European market. Readers should pay particular attention to the company-specific analyses in Sections 2 through 4, where we detail both positive and negative prospecting signals.`);

  // Misleading sub-section
  heading(doc, '2. Digital Advertising Technology: Platform Consolidation Dynamics');

  messyText(doc, `The digital advertising technology sector has been among the most aggressive in pursuing internalization strategies. Leading this trend is Criteo S.A. (CRTO), headquartered in Paris, France, with approximately 2,700 employees globally as of the most recent quarterly filing. Criteo's leadership has publicly articulated what the company terms its "Sovereign Technology Stack" initiative — a comprehensive program to eliminate dependency on external technology vendors and consulting firms. In their Q2 2025 earnings call, CEO Megan Clarken stated: "We have made the strategic decision to build everything in-house. Our competitive advantage lies in our proprietary algorithms and the deep institutional knowledge that can only be developed by engineers who live and breathe our platform every day." This represents an explicit insourcing strategy that has been progressively implemented over the past eighteen months.`);

  doc.moveDown(0.2);
  messyText(doc, `Criteo's annual report further details their approach: the company allocated an additional €47 million to internal R&D headcount expansion in FY2024, specifically to replace capabilities previously provided by three external consulting firms (unnamed in the filing, but sources indicate these were mid-tier European IT services companies). The company's public policy documentation, available on their investor relations portal, includes language that specifically discourages engagement with external engineering service providers: "Criteo's technology organization operates on a principle of full vertical integration. All critical platform components, including machine learning pipelines, real-time bidding infrastructure, identity resolution systems, and advertiser-facing analytics, are developed, maintained, and operated by Criteo employees." This constitutes a clear disqualification signal for any external technology consulting firm considering Criteo as a prospecting target.`);

  sidebar(doc, `KEY DATA POINT — Criteo S.A.\nSector: AdTech / Digital Advertising\nHQ: Paris, France\nEmployees: ~2,700\nRevenue: €1.9B (FY2024)\nInsourcing Signal: STRONG NEGATIVE — explicit "build everything in-house" policy\nConsulting Spend Trend: Declining (-34% YoY)\nProspecting Viability: DISQUALIFIED`);

  heading(doc, '3. Interactive Entertainment: The Studio Model and Engineering Self-Sufficiency');

  messyText(doc, `The interactive entertainment sector presents a similarly challenging landscape for external technology service providers, albeit for somewhat different structural reasons. Ubisoft Entertainment SA, headquartered in Montreuil (Greater Paris), France, employs approximately 19,000 people globally across its network of internal development studios. The company operates under what industry analysts term the "internal studios model" — a decentralized but fully-owned network of game development facilities, each of which maintains its own complete engineering, art, design, and quality assurance teams. This organizational structure fundamentally eliminates the need for external engineering consulting engagement.`);

  doc.moveDown(0.2);
  messyText(doc, `Ubisoft's approach to technology development is deeply rooted in its corporate DNA. The company's proprietary game engines — including Snowdrop (used for Tom Clancy's The Division franchise and the upcoming Star Wars project) and AnvilNext (used for the Assassin's Creed franchise) — represent decades of accumulated internal expertise that the company views as core competitive assets. During a recent investor day presentation, CTO Igor Manceau emphasized that "Ubisoft does not engage external engineering consulting firms for core technology development. Our studios are self-sufficient technology organizations, each with deep expertise in their respective domains." The company's procurement data, obtained through public tender records in France, confirms zero external engineering consulting contracts above the €100,000 threshold in the past three fiscal years. This represents an absolute disqualification signal: Ubisoft has no external engineering consulting spend and no organizational mechanism for engaging such providers.`);

  doc.addPage();

  sidebar(doc, `KEY DATA POINT — Ubisoft Entertainment SA\nSector: Interactive Entertainment / Gaming\nHQ: Montreuil, France\nEmployees: ~19,000\nRevenue: €1.7B (FY2024)\nInsourcing Signal: STRONG NEGATIVE — internal studios model, no external engineering consulting\nConsulting Spend Trend: Zero (structural)\nProspecting Viability: DISQUALIFIED`);

  // Misleading section title that sounds positive
  heading(doc, '4. Emerging Growth Companies: Innovation Ecosystem Assessment');

  messyText(doc, `While the large-cap internalization trend receives most analyst attention, the lower end of the market presents its own set of prospecting challenges. Consider the case of MicroTech Solutions, a small software development firm based in Lyon, France. With only 30 employees and annual revenue of approximately €2.8 million, MicroTech Solutions exemplifies the "too small" disqualification criterion that most B2B technology service providers apply to their target account lists. The company, founded in 2019 by former engineers from Atos, develops niche middleware solutions for the French public sector. Despite showing healthy revenue growth (estimated 23% YoY), MicroTech Solutions lacks the organizational complexity, technology budget, and procurement infrastructure that would justify engagement by an external engineering consultancy. Their entire engineering team consists of 22 developers, 3 DevOps engineers, and 2 QA specialists — a scale that precludes meaningful external consulting relationships.`);

  doc.moveDown(0.2);
  messyText(doc, `Our proprietary small-company screening model flags MicroTech Solutions on multiple disqualification criteria: (1) total headcount below 50, (2) estimated technology budget below €500K, (3) no dedicated procurement or vendor management function, (4) single-product company with limited technology surface area. These signals collectively indicate that MicroTech Solutions is not a viable prospecting target for enterprise technology consulting firms, regardless of the company's growth trajectory. This pattern is representative of a broader category of French tech startups that, while individually innovative, do not represent addressable market for large-scale consulting engagements.`);

  heading(doc, '5. Aggregate Trend Analysis: Consulting Spend Reduction');

  messyText(doc, `The broader trend across the European technology landscape is unmistakable. Our survey data indicates that 43% of technology decision-makers at companies with more than 1,000 employees plan to reduce external consulting spend over the next 18 months. This figure rises to 61% among companies in the technology sector itself. The primary drivers cited include: (a) cost optimization in response to macroeconomic uncertainty (cited by 78% of respondents), (b) desire to retain intellectual property and institutional knowledge (cited by 65%), (c) improved internal recruiting capabilities making it easier to hire directly (cited by 52%), and (d) negative experiences with consulting firm quality and knowledge transfer (cited by 41%). These findings suggest a structural headwind for the European technology consulting market that is likely to persist through at least 2027.`);

  messyText(doc, `Multiple news outlets have reported on this trend. A recent article in Les Echos titled "La fin de l'âge d'or du conseil tech?" highlighted several case studies of French companies that have dramatically reduced their reliance on external technology service providers. The article specifically cited Criteo and Ubisoft as emblematic of the trend, noting that both companies had "effectively eliminated external engineering consulting from their technology operating models." Similar reporting in the Financial Times and Handelsblatt suggests that the trend extends well beyond France, with German industrial companies and UK financial services firms also accelerating insourcing programs.`);

  doc.moveDown(1);
  doc.font('Helvetica').fontSize(7).fillColor('#aaaaaa')
    .text('© 2025 Meridian Research Group. All rights reserved. This document contains proprietary research and analysis.', { align: 'center' });
  doc.fillColor('#000000');

  doc.end();
  await promise;
  console.log('  ✓ 28_internalization_signals.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PDF 2 — 29_industry40_iot_report.pdf
// ═══════════════════════════════════════════════════════════════════════════════

async function generatePDF2() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 45, bottom: 45, left: 50, right: 50 },
    info: {
      Title: 'Industry 4.0 IoT Adoption — European Industrial Leaders',
      Author: 'Vanguard Industrial Analytics',
      Subject: 'Industry 4.0 / IoT',
    },
  });

  const promise = startPipe(doc, '29_industry40_iot_report.pdf');

  // Title block
  doc.rect(0, 0, 595, 100).fill('#0b2545');
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#ffffff')
    .text('Industry 4.0 & IoT Adoption Report', 50, 25, { width: 495 });
  doc.font('Helvetica').fontSize(11).fillColor('#8ecae6')
    .text('European Industrial Leaders — Digital Twin, Edge Computing & Smart Factory Analysis', 50, 55, { width: 495 });
  doc.font('Helvetica').fontSize(8).fillColor('#cccccc')
    .text('Vanguard Industrial Analytics | Report VIA-IND40-2025-029 | June 2025', 50, 78, { width: 495 });
  doc.fillColor('#000000');
  doc.y = 115;

  // Executive summary
  heading(doc, 'Executive Summary', { size: 13 });
  messyText(doc, `This report provides a comprehensive technical assessment of Industry 4.0 and Internet of Things (IoT) adoption among leading European industrial companies. We examine three key players — Schneider Electric SE, Legrand SA, and Dassault Systèmes SE — through the lens of their digital transformation initiatives, focusing on technology stack decisions, platform architectures, and the implications for the broader industrial IoT ecosystem. Our analysis incorporates data from MQTT broker telemetry, OPC-UA server deployments, edge computing node installations, and predictive maintenance system implementations across 47 industrial facilities.`);

  heading(doc, '1. Technology Landscape: Protocol & Platform Overview');

  // A confusing "ASCII chart"
  sidebar(doc, `PROTOCOL ADOPTION RATE (% of surveyed plants, n=312)
╔══════════════════╦════════╦════════╦════════╦════════╗
║ Protocol         ║ 2022   ║ 2023   ║ 2024   ║ 2025E  ║
╠══════════════════╬════════╬════════╬════════╬════════╣
║ MQTT 3.1.1/5.0   ║ 34%    ║ 47%    ║ 61%    ║ 72%    ║
║ OPC-UA           ║ 28%    ║ 39%    ║ 52%    ║ 64%    ║
║ Modbus TCP       ║ 67%    ║ 63%    ║ 58%    ║ 51%    ║
║ AMQP 1.0         ║ 12%    ║ 18%    ║ 24%    ║ 29%    ║
║ CoAP             ║  5%    ║  9%    ║ 15%    ║ 22%    ║
║ HTTP/REST        ║ 71%    ║ 74%    ║ 76%    ║ 78%    ║
╚══════════════════╩════════╩════════╩════════╩════════╝
Source: VIA Industrial IoT Protocol Survey, 2025`);

  messyText(doc, `The transition from legacy Modbus TCP to modern publish-subscribe protocols like MQTT and OPC-UA represents the most significant infrastructure shift in industrial networking since the adoption of Industrial Ethernet in the early 2000s. MQTT's lightweight footprint (typical message overhead of 2-4 bytes) makes it particularly suitable for constrained edge devices, while OPC-UA's built-in information modeling capabilities provide the semantic richness required for complex manufacturing ontologies. The convergence of these protocols at the edge gateway layer — where devices like Schneider Electric's EcoStruxure Edge boxes translate between field-level Modbus/Profinet and cloud-facing MQTT/AMQP — is creating a new architectural paradigm that we term the "Protocol Translation Layer" (PTL).`);

  heading(doc, '2. Schneider Electric SE — EcoStruxure Platform Deep Dive');

  messyText(doc, `Schneider Electric SE (ENGI.PA), headquartered in Rueil-Malmaison, France, has emerged as one of the most sophisticated adopters and providers of Industry 4.0 technology in Europe. The company's EcoStruxure platform represents a three-layer IoT architecture encompassing Connected Products, Edge Control, and Apps/Analytics/Services. With the acquisition of AVEVA Group plc completed in 2023 for approximately £9.5 billion, Schneider Electric significantly expanded its digital twin capabilities, combining AVEVA's process simulation and engineering design tools with its own operational technology infrastructure.`);

  doc.moveDown(0.2);

  // Technology stack comparison table
  subheading(doc, 'EcoStruxure Technology Stack Components');
  pseudoTable(doc,
    ['Layer', 'Component', 'Protocol', 'Deployment', 'Scale'],
    [
      ['Connected Products', 'Smart Sensors (TeSys)', 'Modbus RTU/TCP', 'On-premise', '2.4M+ units'],
      ['Connected Products', 'PowerLogic Meters', 'MQTT 5.0', 'On-premise', '890K+ units'],
      ['Edge Control', 'EcoStruxure Edge Box', 'OPC-UA + MQTT', 'Edge', '47K gateways'],
      ['Edge Control', 'Modicon M580', 'EtherNet/IP', 'On-premise', '310K PLCs'],
      ['Apps & Analytics', 'AVEVA PI System', 'REST/gRPC', 'Hybrid', '1,200 instances'],
      ['Apps & Analytics', 'EcoStruxure Resource Advisor', 'HTTPS/WSS', 'Cloud', 'SaaS'],
      ['Digital Twin', 'AVEVA E3D Design', 'Proprietary', 'On-prem/Cloud', '~800 projects'],
      ['Predictive Maint.', 'EcoStruxure APM', 'MQTT + REST', 'Hybrid', '340 sites'],
    ],
    { colW: 100, fontSize: 7 }
  );

  messyText(doc, `Schneider Electric's digital twin factory initiative, launched in 2024 under the internal codename "Project Gemini," aims to create full virtual replicas of 15 flagship manufacturing facilities by end of 2026. The initiative leverages AVEVA's simulation tools combined with real-time telemetry from EcoStruxure-connected devices to create living digital models that update in near-real-time (typical latency: 2-5 seconds for non-critical parameters, <500ms for safety-critical loops). The company has deployed approximately 3,200 edge computing nodes across these facilities, each running a containerized software stack based on Kubernetes (K3s distribution) with custom resource controllers for industrial workload scheduling.`);

  doc.addPage();

  sidebar(doc, `KPI DASHBOARD — Schneider Electric Digital Twin Program
┌─────────────────────────────────┬────────────┬────────────┐
│ Metric                          │ Target     │ Actual     │
├─────────────────────────────────┼────────────┼────────────┤
│ Facilities with digital twin    │ 15         │ 9 (60%)    │
│ Edge nodes deployed             │ 5,000      │ 3,200      │
│ MQTT topics active              │ 2.1M       │ 1.7M       │
│ Predictive maint. accuracy      │ 92%        │ 87.4%      │
│ Mean data latency (non-crit.)   │ <3s        │ 2.8s       │
│ OPC-UA server uptime            │ 99.95%     │ 99.91%     │
│ Energy reduction (digital twin) │ 12%        │ 8.7%       │
└─────────────────────────────────┴────────────┴────────────┘
Source: Schneider Electric internal program review (leaked), Q1 2025`);

  heading(doc, '3. Legrand SA — Smart Building IoT & Embedded Systems Strategy');

  messyText(doc, `Legrand SA, headquartered in Limoges, France, is a global specialist in electrical and digital building infrastructure with approximately 39,000 employees worldwide and annual revenue of €8.4 billion (FY2024). The company has been aggressively expanding its IoT capabilities, focusing on smart building systems that integrate lighting control, energy management, access control, and building automation into unified platforms. Legrand's "Eliot" (Electricity and IoT) program, launched in 2015 and now in its third phase, has connected over 40 million devices across commercial and residential installations globally.`);

  doc.moveDown(0.2);
  messyText(doc, `Of particular significance for the technology labor market is Legrand's recently announced plan to hire 200 embedded engineers across its European R&D centers over the next 18 months. This hiring initiative, disclosed in a press release dated April 2025, focuses specifically on engineers with expertise in RTOS (Real-Time Operating Systems), BLE (Bluetooth Low Energy) mesh networking, Matter/Thread protocol stack implementation, and edge AI inference (specifically TinyML frameworks for resource-constrained microcontrollers). The positions span Legrand's R&D facilities in Limoges, Béziers, Strasbourg (France), Bergamo (Italy), and Arnhem (Netherlands). This represents one of the largest single embedded engineering hiring initiatives in the European electrical equipment sector and signals Legrand's commitment to internalizing IoT firmware development capabilities.`);

  subheading(doc, 'Legrand Connected Device Ecosystem');
  pseudoTable(doc,
    ['Product Line', 'Protocol', 'MCU Platform', 'Connectivity', 'Annual Vol.'],
    [
      ['Céliane with Netatmo', 'Zigbee 3.0', 'Nordic nRF52840', 'Wi-Fi bridge', '2.1M units'],
      ['Living Now (Bticino)', 'BLE Mesh', 'Silicon Labs EFR32', 'Cloud gateway', '1.8M units'],
      ['Eliot Pro', 'Matter/Thread', 'NXP i.MX RT', 'Native IP', '450K units'],
      ['Legrand ONE', 'MQTT/REST', 'Espressif ESP32-S3', 'Wi-Fi direct', '800K units'],
      ['IP PDU (Raritan)', 'SNMP/HTTPS', 'ARM Cortex-A7', 'Ethernet', '120K units'],
    ],
    { colW: 100, fontSize: 7 }
  );

  messyText(doc, `Legrand's technology investment is particularly notable in the context of the European Building Automation and Control Systems (BACS) Directive (EU 2024/1275), which mandates digital building infrastructure for all new commercial construction and major renovations above 500m² starting in 2027. This regulatory tailwind is expected to drive significant demand for Legrand's connected products and, by extension, for the embedded engineering talent the company is actively recruiting. The company's R&D expenditure increased 18% YoY in FY2024 to €412 million, with approximately 60% allocated to IoT and connected device development.`);

  heading(doc, '4. Dassault Systèmes SE — 3DEXPERIENCE & Virtual Twin Technology');

  messyText(doc, `Dassault Systèmes SE (DSY.PA), headquartered in Vélizy-Villacoublay, France, employs approximately 23,800 people and generated revenue of €6.0 billion in FY2024. The company's flagship 3DEXPERIENCE platform has evolved from a product lifecycle management (PLM) tool into a comprehensive virtual twin platform that spans design, simulation, manufacturing, and operations. Dassault Systèmes distinguishes between "digital twins" (static 3D models synchronized with real-world data) and its proprietary concept of "virtual twins" (dynamic, physics-based simulations that can predict future behavior and optimize systems in real-time).`);

  doc.moveDown(0.2);
  messyText(doc, `The 3DEXPERIENCE platform architecture is built on a cloud-native microservices foundation (deployed on both AWS and Outscale, Dassault's subsidiary cloud provider), with simulation workloads distributed across GPU-accelerated compute clusters. The platform's industrial IoT integration capabilities, branded "DELMIA Apriso" for manufacturing operations and "SIMULIA" for multi-physics simulation, enable real-time connection between factory floor sensors (via OPC-UA connectors) and virtual twin models. Key technology components include: Abaqus finite element analysis (structural simulation), PowerFLOW lattice Boltzmann method (fluid dynamics), CST Studio Suite (electromagnetic simulation), and XFlow SPH solver (particle-based fluid simulation).`);

  doc.addPage();

  sidebar(doc, `VIRTUAL TWIN DEPLOYMENT METRICS — Dassault Systèmes
┌──────────────────────────────┬─────────────────────────────┐
│ Deployment Model             │ Statistics                  │
├──────────────────────────────┼─────────────────────────────┤
│ Cloud (3DEXP on AWS/Outscale)│ 4,200 enterprise tenants    │
│ On-premise (private cloud)   │ 1,100 installations         │
│ Hybrid (edge + cloud)       │ 680 deployments              │
│ Total connected IoT sensors  │ ~8.2M (via OPC-UA/MQTT)    │
│ Simulation jobs / month      │ 12.4M                       │
│ GPU hours consumed / month   │ 47M (A100/H100 equiv.)     │
│ Active virtual twin models   │ 23,400                      │
└──────────────────────────────┴─────────────────────────────┘`);

  subheading(doc, 'Platform Comparison: Industrial Digital Twin Solutions');
  pseudoTable(doc,
    ['Vendor', 'Platform', 'Strengths', 'Protocols', 'Pricing Model'],
    [
      ['Dassault Systèmes', '3DEXPERIENCE', 'Multi-physics sim, PLM', 'OPC-UA, REST', 'Per-user + compute'],
      ['Siemens', 'Xcelerator/MindSphere', 'Factory automation, MES', 'OPC-UA, MQTT', 'Subscription + usage'],
      ['PTC', 'ThingWorx + Creo', 'AR integration, CAD', 'MQTT, REST', 'Subscription'],
      ['Schneider (AVEVA)', 'PI System + E3D', 'Process industries', 'OPC-UA, PI AF', 'Per-server license'],
      ['ABB', 'ABB Ability', 'Drives & robotics', 'MQTT, OPC-UA', 'Per-device + cloud'],
    ],
    { colW: 100, fontSize: 7 }
  );

  heading(doc, '5. Edge Computing Infrastructure Analysis');

  messyText(doc, `The deployment of edge computing infrastructure across European industrial facilities has reached an inflection point, with our survey data indicating that 67% of manufacturers with more than 500 employees have deployed at least one edge computing solution. The typical architecture involves a hierarchy of edge devices: (1) field-level gateways that aggregate sensor data and perform protocol translation (Modbus/Profinet → MQTT/OPC-UA), (2) plant-level edge servers running containerized analytics workloads (typically K3s or MicroK8s on x86 hardware), and (3) regional edge clusters that aggregate data from multiple facilities for fleet-level analytics. Schneider Electric's EcoStruxure Edge portfolio addresses all three tiers, while Legrand's IoT solutions primarily operate at the field-gateway level with cloud-based analytics.`);

  doc.moveDown(0.2);
  messyText(doc, `Predictive maintenance represents the highest-value use case for industrial IoT, with surveyed manufacturers reporting average ROI of 340% over three years for mature predictive maintenance deployments. The technology stack typically involves: vibration sensors (accelerometers) and temperature sensors connected via MQTT to edge inference engines running TensorFlow Lite or ONNX Runtime models, with model training performed in the cloud on historical failure data. Schneider Electric's EcoStruxure Asset Performance Management (APM) product and Dassault Systèmes' SIMULIA simulation tools represent complementary approaches — Schneider's APM uses data-driven ML models while Dassault's approach leverages physics-based simulation to predict component degradation.`);

  doc.moveDown(1.5);
  doc.font('Helvetica').fontSize(7).fillColor('#999999')
    .text('Vanguard Industrial Analytics — Proprietary Research — VIA-IND40-2025-029', { align: 'center' });
  doc.fillColor('#000000');

  doc.end();
  await promise;
  console.log('  ✓ 29_industry40_iot_report.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PDF 3 — 30_sanctions_geopolitical.pdf
// ═══════════════════════════════════════════════════════════════════════════════

async function generatePDF3() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 45, bottom: 45, left: 50, right: 50 },
    info: {
      Title: 'Geopolitical Risk Assessment — European Defense & Dual-Use Technology',
      Author: 'Argus Strategic Advisory',
      Subject: 'Sanctions & Geopolitical Risk',
    },
  });

  const promise = startPipe(doc, '30_sanctions_geopolitical.pdf');

  // Cover-ish block
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#cc0000')
    .text('RESTRICTED — INTERNAL USE ONLY — ARGUS STRATEGIC ADVISORY', { align: 'center' });
  doc.moveDown(1.5);
  doc.font('Times-Roman').fontSize(20).fillColor('#1a1a1a')
    .text('Geopolitical Risk & Sanctions Compliance', { align: 'center' });
  doc.font('Times-Roman').fontSize(13).fillColor('#444444')
    .text('European Defense, Dual-Use Technology & Export Control Analysis', { align: 'center' });
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(8).fillColor('#888888')
    .text('Ref: ASA-GEO-2025-030 | Date: May 2025 | Classification: Restricted | Distribution: Named Recipients Only', { align: 'center' });
  doc.fillColor('#000000');
  doc.moveDown(2);

  // Misleading section title
  heading(doc, '1. Regulatory Framework and Historical Context', { size: 13, underline: true });

  messyText(doc, `The European Union's export control regime, anchored by Regulation (EU) 2021/821 on dual-use items (the "Recast Dual-Use Regulation"), establishes a comprehensive framework for controlling the export, brokering, transit, and technical assistance related to items that have both civilian and military applications. This regulation, which entered into force on September 9, 2021, significantly expanded the scope of EU export controls to include cyber-surveillance technology and introduced a new "catch-all" mechanism allowing member states to impose ad hoc controls on unlisted items when there is reason to believe they may be intended for use in connection with weapons of mass destruction, military end-use, or internal repression. The regulation operates alongside the EU Common Foreign and Security Policy (CFSP) sanctions framework, which enables the Council to impose restrictive measures — including asset freezes, travel bans, and sectoral sanctions — on third countries, entities, and individuals.`);

  doc.moveDown(0.2);
  messyText(doc, `The intersection of export controls and sanctions creates a particularly complex compliance landscape for European technology companies with global operations. Companies operating in sectors such as aerospace, defense electronics, telecommunications equipment, advanced materials, and cybersecurity must navigate multiple overlapping regulatory regimes: EU dual-use controls, national military list controls, US Export Administration Regulations (EAR) re-export rules (applicable to items containing US-origin technology), and UN Security Council sanctions. Failure to comply can result in criminal prosecution, substantial fines (up to €10 million or 10% of global turnover under some national implementing legislation), loss of export licenses, and severe reputational damage. This regulatory complexity has significant implications for the prospecting viability of certain European technology companies, as detailed in the following sections.`);

  heading(doc, '2. Supply Chain Resilience in Aerospace Components', { size: 12 });

  messyText(doc, `The aerospace and defense sector in Europe is characterized by a high degree of regulatory scrutiny and a correspondingly complex compliance apparatus. This section examines the geopolitical exposure of key European companies, with particular attention to factors that may constitute prospecting disqualification signals for technology service providers subject to sanctions compliance requirements. It should be noted that mere geopolitical exposure does not automatically disqualify a company as a prospecting target; rather, the relevant question is whether engagement with a particular company would create unacceptable sanctions risk or reputational exposure for the service provider.`);

  doc.moveDown(0.2);
  messyText(doc, `Before examining specific companies, it is useful to establish the broader context of European defense sector consolidation. The post-Cold War period saw significant restructuring of the European defense industrial base, driven by declining defense budgets and the desire to create "European champions" capable of competing with US defense primes. This consolidation produced the current landscape of large, diversified defense-aerospace groups: Airbus SE (pan-European), Thales SA (France), Leonardo SpA (Italy), BAE Systems plc (UK), Rheinmetall AG (Germany), and Saab AB (Sweden). Many of these companies operate across both defense and civilian markets, creating inherent dual-use technology considerations that complicate export control compliance.`);

  heading(doc, '3. Designated Entities and Sanctioned Organizations', { size: 12 });

  messyText(doc, `This section addresses entities that are subject to formal sanctions or designations under EU, US, or multilateral sanctions programs. Engagement with these entities is strictly prohibited and constitutes an absolute disqualification signal. Technology service providers must screen all prospective clients against relevant sanctions lists, including the EU Consolidated Financial Sanctions List, the US OFAC Specially Designated Nationals (SDN) list, and the UK Office of Financial Sanctions Implementation (OFSI) consolidated list.`);

  doc.moveDown(0.2);
  messyText(doc, `Of particular relevance to this analysis is the case of RusTech Engineering JSC (ООО "РусТех Инжиниринг"), a Moscow-headquartered technology company that was added to the EU sanctions list (Council Regulation (EU) 2024/XXX) on March 15, 2024, in connection with the provision of technology and engineering services that contributed to the development of military systems used in the conflict in Ukraine. RusTech Engineering, which employed approximately 4,500 people prior to its designation, was previously active in the European market through a network of subsidiary offices in Berlin, Vienna, and Helsinki, offering engineering consulting services in the fields of industrial automation, telecommunications infrastructure, and cybersecurity. All EU-based subsidiaries were required to wind down operations within 60 days of the designation, and all contractual relationships with EU counterparties were terminated.`);

  doc.addPage();

  messyText(doc, `RusTech Engineering's inclusion on the EU sanctions list constitutes an absolute and unambiguous disqualification signal. Any technology service provider that engages with RusTech Engineering, its subsidiaries, its officers, or any entity in which RusTech Engineering holds a 50% or greater ownership interest is in direct violation of EU sanctions regulations and faces criminal prosecution. Our screening database indicates that RusTech Engineering also appears on the US OFAC SDN list (designation date: February 2024), the UK OFSI consolidated list (designation date: March 2024), and the Swiss SECO sanctions list (designation date: April 2024). The company's beneficial ownership structure has been linked to individuals designated under EU Regulation 269/2014 (the "Ukraine-related" sanctions regulation).`);

  sidebar(doc, `SANCTIONS ALERT — RusTech Engineering JSC\nStatus: DESIGNATED — EU/US/UK/CH sanctions lists\nHQ: Moscow, Russian Federation\nFormer EU offices: Berlin (DE), Vienna (AT), Helsinki (FI) — ALL CLOSED\nDesignation basis: Provision of technology supporting military systems\nProspecting status: ABSOLUTE DISQUALIFICATION — criminal liability risk\nScreening databases: EU Consolidated List, OFAC SDN, OFSI, SECO`);

  heading(doc, '4. Environmental and Social Governance Perspectives', { size: 12 });

  messyText(doc, `This section, despite its title, addresses the dual-use technology considerations affecting two major French defense-aerospace companies: Thales SA and Airbus Defence and Space. These companies present a nuanced picture from a prospecting perspective — they are not sanctioned entities, but their involvement in defense and dual-use technology creates specific compliance considerations that technology service providers must evaluate carefully.`);

  doc.moveDown(0.2);
  messyText(doc, `Thales SA (HO.PA), headquartered in La Défense (Paris), France, is a major European defense electronics and cybersecurity company with approximately 81,000 employees and annual revenue of €18.4 billion (FY2024). The company operates across five divisions: Aerospace, Defence & Security, Digital Identity & Security, Ground Transportation, and Space. Thales' defense and security division, which accounts for approximately 45% of group revenue, develops and manufactures a wide range of dual-use technologies including: military communications systems (CONTACT program for the French Army), radar and electronic warfare systems (Ground Master air defense radars), optronics and missile systems (via its joint ventures with MBDA), cybersecurity solutions (via Thales Cyber Defence Solutions), and encryption/cryptography products (Thales Trusted Cyber Technologies). These product categories fall squarely within the scope of EU dual-use controls and national military list items, requiring export licenses for transfer to most non-EU destinations.`);

  doc.moveDown(0.2);
  messyText(doc, `For technology service providers considering Thales as a prospecting target, the dual-use technology dimension creates several specific compliance considerations: (1) Any consulting engagement involving access to controlled technology or technical data may itself require an export license, particularly if the service provider employs non-EU nationals who would have access to controlled information (the "deemed export" concept, borrowed from US EAR terminology). (2) Thales' extensive involvement in classified defense programs means that certain business units operate under national security restrictions that limit the involvement of external parties, regardless of their nationality or clearance status. (3) The company's supply chain includes components and subsystems subject to US ITAR (International Traffic in Arms Regulations) controls, which impose additional restrictions on foreign person access and re-export. These factors do not necessarily disqualify Thales as a prospecting target — the company's civilian divisions (Digital Identity, Ground Transportation) present fewer compliance challenges — but they require careful due diligence and potentially specialized legal counsel.`);

  heading(doc, '5. Maritime Trade Routes and Sanctions Evasion Patterns', { size: 12 });

  messyText(doc, `This section provides broader geopolitical context on sanctions evasion patterns that may affect the risk assessment for certain prospecting targets. While the information is primarily of interest for compliance screening purposes, it also provides useful background on the mechanisms by which sanctioned entities attempt to maintain access to European technology markets.`);

  doc.moveDown(0.2);
  messyText(doc, `The use of intermediary companies in non-sanctioned jurisdictions — particularly Turkey, the UAE, Kazakhstan, and Georgia — to circumvent EU and US sanctions has been extensively documented by investigative journalists and enforcement authorities. The EU's 12th package of sanctions against Russia (adopted December 2023) introduced new provisions targeting "circumvention networks," including enhanced due diligence requirements for exports to countries identified as significant transshipment hubs. Technology service providers should be aware that engagement with companies in these jurisdictions may trigger enhanced screening requirements, particularly where the prospective client's business model involves re-export of technology or services to Russia or Belarus.`);

  doc.addPage();

  heading(doc, '6. Defense Industrial Consolidation and Market Access', { size: 12 });

  messyText(doc, `Airbus Defence and Space, a division of Airbus SE (AIR.PA), represents another significant player in the European dual-use technology landscape. The division, headquartered in Ottobrunn (Munich), Germany, with major facilities in Toulouse (France), Madrid (Spain), and Stevenage (UK), employs approximately 35,000 people and generates annual revenue of approximately €12 billion. Airbus Defence and Space operates across three main business lines: Military Aircraft (including the Eurofighter Typhoon and A400M transport aircraft), Space Systems (telecommunications and Earth observation satellites, the Orion European Service Module), and Connected Intelligence (UAVs, cybersecurity, and secure communications).`);

  doc.moveDown(0.2);
  messyText(doc, `From a prospecting perspective, Airbus Defence and Space presents similar dual-use compliance considerations to Thales, compounded by the multinational structure of Airbus SE (incorporated in the Netherlands, with French, German, and Spanish government shareholdings and golden share rights). The company is subject to a unique regulatory framework established by the 2000 Framework Agreement between France, Germany, Spain, and the UK (the "LOI Agreement") governing export controls for collaborative defense programs. Additionally, Airbus' extensive use of US-origin technology in both defense and civilian programs creates significant ITAR and EAR compliance obligations that affect the scope of permissible technology consulting engagements.`);

  messyText(doc, `However, it is important to distinguish between Airbus Defence and Space's classified programs — where external consulting engagement is extremely limited and subject to national security clearance requirements — and its commercial activities in areas such as telecommunications satellites, Earth observation data services (Pléiades Neo constellation), and commercial drone systems (Airbus UAS). These commercial activities present fewer compliance barriers for technology service providers and may represent viable prospecting opportunities, provided appropriate due diligence is conducted to ensure that the consulting engagement does not involve access to controlled technology or classified information.`);

  heading(doc, '7. Quantitative Risk Scoring Methodology', { size: 12 });

  pseudoTable(doc,
    ['Company', 'Sanctions', 'Dual-Use', 'Geo Risk', 'Overall', 'Prospecting'],
    [
      ['RusTech Engineering', 'DESIGNATED', 'N/A', 'EXTREME', '10.0/10', 'DISQUALIFIED'],
      ['Thales SA', 'Clear', 'HIGH', 'MODERATE', '5.8/10', 'CONDITIONAL'],
      ['Airbus Defence', 'Clear', 'HIGH', 'MODERATE', '5.5/10', 'CONDITIONAL'],
      ['Schneider Electric', 'Clear', 'LOW', 'LOW', '1.2/10', 'VIABLE'],
      ['Dassault Systèmes', 'Clear', 'LOW', 'LOW', '1.0/10', 'VIABLE'],
      ['Legrand SA', 'Clear', 'NONE', 'LOW', '0.5/10', 'VIABLE'],
    ],
    { colW: 88, fontSize: 7 }
  );

  doc.moveDown(0.3);
  messyText(doc, `The quantitative risk scoring methodology employed in this analysis weights four primary factors: (1) sanctions list presence (binary — designated or clear), (2) dual-use technology exposure (scored 0-10 based on proportion of revenue from controlled items), (3) geographic risk (scored 0-10 based on operational presence in sanctioned or high-risk jurisdictions), and (4) regulatory complexity (scored 0-10 based on the number of overlapping regulatory regimes applicable to the company's technology portfolio). The overall score is a weighted average (sanctions: 40%, dual-use: 25%, geographic: 20%, regulatory: 15%), with any sanctions designation resulting in an automatic 10.0/10 overall score and disqualification.`);

  heading(doc, '8. Recommendations and Forward-Looking Assessment', { size: 12 });

  messyText(doc, `Based on our analysis, we make the following recommendations for technology service providers evaluating prospecting targets in the European defense and dual-use technology sector: (1) Maintain robust sanctions screening processes, including regular rescreening of existing clients against updated sanctions lists (EU lists are updated approximately every 2-3 months). (2) For companies scored "CONDITIONAL" (Thales, Airbus Defence), conduct engagement-specific due diligence to determine whether the specific business unit and project scope involve controlled technology. (3) Develop internal expertise on the interaction between EU dual-use controls, national military list controls, and US ITAR/EAR requirements, as the intersection of these regimes creates compliance traps that can ensnare unwary technology service providers. (4) Monitor geopolitical developments — particularly the evolution of EU sanctions packages, US secondary sanctions expansion, and Chinese export control retaliatory measures — that may change the risk profile of specific prospecting targets.`);

  doc.moveDown(0.2);
  messyText(doc, `Looking ahead, the geopolitical environment is likely to become more, not less, complex for European technology companies. The trend toward "friendshoring" and "allyshoring" of supply chains, combined with the expansion of technology sovereignty initiatives (such as the EU Chips Act and the European Cyber Resilience Act), is creating new regulatory barriers that will affect the technology consulting market in ways that are difficult to predict. Companies operating at the intersection of defense, civilian technology, and international trade — such as Thales, Airbus, and to a lesser extent Schneider Electric and Dassault Systèmes — will continue to present complex but potentially rewarding prospecting opportunities for technology service providers willing to invest in the compliance infrastructure required to navigate this landscape.`);

  doc.moveDown(1.5);
  doc.font('Helvetica').fontSize(7).fillColor('#999999')
    .text('© 2025 Argus Strategic Advisory. This document is confidential and intended solely for the named recipients.', { align: 'center' });
  doc.font('Helvetica').fontSize(7)
    .text('Unauthorized reproduction or distribution is prohibited. Ref: ASA-GEO-2025-030.', { align: 'center' });
  doc.fillColor('#000000');

  doc.end();
  await promise;
  console.log('  ✓ 30_sanctions_geopolitical.pdf');
}

// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('Generating PDFs in', OUT_DIR);
  await generatePDF1();
  await generatePDF2();
  await generatePDF3();
  console.log('Done — all 3 PDFs generated.');
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
