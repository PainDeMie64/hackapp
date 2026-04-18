-- =============================================================================
-- SEED: 10 Rennes/Brittany Region Tech & Defense Companies
-- Orange Labs, Thales DIS, DGA MI, Ippon, Oberthur, Kerlink,
-- b<>com (IRT), Niji, Groupe Apave, Enensys Technologies
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Orange Labs Rennes
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa01-4f6a-9b01-ren000000001',
  'Orange Labs Rennes',
  'orange.com',
  'Centre de R&D majeur du groupe Orange dedie aux reseaux 5G/6G, cybersecurite, IA et services cloud. Plus de 1500 chercheurs et ingenieurs sur le site de Cesson-Sevigne, l''un des plus grands campus de recherche telecom en Europe.',
  'Telecommunications', 'R&D Telecom & Networks',
  'Rennes', 'France', 1500, NULL, NULL,
  '{"5g":["Open RAN","O-RAN Alliance stack"],"cloud":["Kubernetes","OpenStack","AWS"],"ai_ml":["PyTorch","TensorFlow","MLflow"],"cybersecurity":["ANSSI-qualified tools","Stormshield","Orange Cyberdefense"],"iot":["LwM2M","LoRaWAN","MQTT"],"devops":["GitLab CI","Terraform","Ansible"],"data":["Apache Kafka","Spark","Elasticsearch"]}',
  1,
  'https://www.linkedin.com/company/orange/',
  '380129866',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 2. Thales DIS Rennes
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa02-4f6a-9b02-ren000000002',
  'Thales DIS Rennes',
  'thalesgroup.com',
  'Division Digital Identity & Security de Thales a Rennes, specialisee dans les solutions de cybersecurite, identite numerique, chiffrement et protection des donnees pour les secteurs defense, gouvernemental et bancaire.',
  'Defense & Security', 'Cybersecurity & Digital Identity',
  'Rennes', 'France', 800, NULL, NULL,
  '{"cybersecurity":["Thales CipherTrust","Luna HSM","Vormetric"],"cloud":["Azure","AWS GovCloud"],"embedded":["Java Card","GlobalPlatform","ARM TrustZone"],"crypto":["Post-quantum crypto","HSM FIPS 140-3"],"devops":["Jenkins","GitLab CI","SonarQube"],"identity":["FIDO2","PKI","eIDAS"]}',
  1,
  'https://www.linkedin.com/company/thaborales/',
  '479807192',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 3. DGA MI (Maitrise de l'Information) Bruz
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa03-4f6a-9b03-ren000000003',
  'DGA MI (Maitrise de l''Information)',
  'defense.gouv.fr',
  'Centre d''expertise technique de la Direction Generale de l''Armement dedie a la guerre electronique, au renseignement d''origine electromagnetique (ROEM), a la cybersecurite militaire et aux systemes d''information operationnels. Plus grand centre DGA en effectif.',
  'Defense & Security', 'Electronic Warfare & SIGINT',
  'Bruz', 'France', 1400, NULL, NULL,
  '{"sigint":["SDR platforms","ELINT/COMINT systems"],"cybersecurity":["ANSSI-qualified tools","custom TEMPEST solutions"],"hpc":["GPU clusters","FPGA accelerators"],"ai_ml":["Python","TensorFlow","classified NLP"],"embedded":["RTOS","Ada/SPARK","VHDL/Verilog"],"simulation":["Electromagnetic spectrum modeling","MATLAB/Simulink"]}',
  1,
  'https://www.linkedin.com/company/direction-generale-de-l-armement/',
  '157800002',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  65, 'warm', 1776520000
);

-- 4. Ippon Technologies
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa04-4f6a-9b04-ren000000004',
  'Ippon Technologies',
  'ippon.fr',
  'ESN francaise specialisee en architecture cloud, big data, DevOps et transformation digitale. Fondee a Paris avec un centre de delivery majeur a Rennes. Expertise JHipster, Kafka, Kubernetes et data engineering.',
  'IT Services', 'Cloud & Data Consulting',
  'Rennes', 'France', 550, 65000000, 2024,
  '{"cloud":["AWS","GCP","Azure"],"data":["Apache Kafka","Spark","Snowflake","dbt"],"devops":["Kubernetes","Terraform","ArgoCD","GitLab CI"],"backend":["Java/Spring Boot","JHipster","Node.js"],"frontend":["React","Angular","Vue.js"],"ai_ml":["Dataiku","SageMaker","LangChain"]}',
  0,
  'https://www.linkedin.com/company/ippon-technologies/',
  '487367972',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'warm', 1776520000
);

-- 5. Oberthur Technologies
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa05-4f6a-9b05-ren000000005',
  'Oberthur Technologies',
  'oberthur.com',
  'Specialiste mondial de la securite numerique: cartes a puce, SIM, eSIM, documents d''identite electroniques et solutions de paiement. Site historique de Rennes dedie a la R&D embarquee et a la production de composants securises.',
  'Defense & Security', 'Smart Cards & Digital Security',
  'Rennes', 'France', 600, 280000000, 2024,
  '{"embedded":["Java Card","MULTOS","GlobalPlatform"],"security":["Common Criteria EAL5+","FIPS 140-2","EMVCo"],"manufacturing":["MES systems","SAP PP"],"crypto":["AES","RSA","ECC","post-quantum"],"testing":["fault injection","side-channel analysis"],"erp":["SAP ECC"]}',
  1,
  'https://www.linkedin.com/company/oberthur-technologies/',
  '340709534',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  63, 'warm', 1776520000
);

-- 6. Kerlink
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa06-4f6a-9b06-ren000000006',
  'Kerlink',
  'kerlink.com',
  'Leader europeen des solutions d''infrastructure IoT basees sur LoRaWAN. Concepteur et fabricant de passerelles et stations de base pour reseaux LPWAN, smart city, agriculture connectee et industrie 4.0. Siege a Thorigne-Fouillard pres de Rennes.',
  'IoT & Connected Devices', 'IoT Infrastructure & LPWAN',
  'Rennes', 'France', 85, 14000000, 2024,
  '{"iot":["LoRaWAN","LPWAN","MQTT","LwM2M"],"embedded":["Linux embarque","ARM Cortex","FPGA"],"cloud":["AWS IoT Core","Azure IoT Hub"],"network":["Wanesy Management Center","SPN"],"manufacturing":["EMS partners","PCB design"],"devops":["Git","Jenkins","Docker"]}',
  0,
  'https://www.linkedin.com/company/kerlink/',
  '530016829',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  60, 'warm', 1776520000
);

-- 7. b<>com (IRT)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa07-4f6a-9b07-ren000000007',
  'b<>com (IRT)',
  'b-com.com',
  'Institut de Recherche Technologique dedie aux technologies numeriques: 5G/6G, medias immersifs, cybersecurite, IA de confiance et e-sante. Finance par le PIA avec 300 chercheurs et ingenieurs a Rennes, transfert technologique vers l''industrie.',
  'Research & Technology', '5G Media & Cybersecurity Research',
  'Rennes', 'France', 300, NULL, NULL,
  '{"5g":["5G NR testbed","Open RAN","network slicing"],"ai_ml":["PyTorch","federated learning","XAI"],"media":["VR/AR","volumetric video","HDR/HFR"],"cybersecurity":["trusted AI","homomorphic encryption"],"cloud":["Kubernetes","OpenStack","edge computing"],"health":["FHIR","medical imaging AI"]}',
  1,
  'https://www.linkedin.com/company/irt-b-com/',
  '791781690',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  66, 'warm', 1776520000
);

-- 8. Niji
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa08-4f6a-9b08-ren000000008',
  'Niji',
  'niji.fr',
  'Societe de conseil et d''ingenierie numerique fondee a Rennes, specialisee en strategie digitale, UX design, developpement d''applications mobiles et web, et transformation des SI. Clients grands comptes Banque, Assurance, Retail.',
  'IT Services', 'Digital Consulting & Engineering',
  'Rennes', 'France', 500, 55000000, 2024,
  '{"mobile":["iOS/Swift","Android/Kotlin","Flutter","React Native"],"web":["React","Angular","Node.js"],"cloud":["AWS","Azure","GCP"],"design":["Figma","Adobe XD","Design System"],"backend":["Java/Spring",".NET","Python"],"devops":["Docker","Kubernetes","Azure DevOps"]}',
  0,
  'https://www.linkedin.com/company/niji/',
  '378786407',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  57, 'warm', 1776520000
);

-- 9. Groupe Apave
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa09-4f6a-9b09-ren000000009',
  'Groupe Apave',
  'apave.com',
  'Groupe international d''inspection, d''essais et de certification. Expertise en maitrise des risques techniques, humains et environnementaux. Centre technique majeur a Rennes couvrant cybersecurite industrielle, surete nucleaire et certification IoT.',
  'Inspection & Certification', 'Technical Risk Management',
  'Rennes', 'France', 13000, 1100000000, 2024,
  '{"inspection":["COMOS","SAP PM","custom CMMS"],"cybersecurity":["IEC 62443","ANSSI CSPN audits"],"iot_certification":["CE marking","RED directive","ETSI EN 303 645"],"erp":["SAP S/4HANA"],"data":["Power BI","Dataiku"],"training":["LMS platforms","VR safety training"]}',
  1,
  'https://www.linkedin.com/company/apave/',
  '527750397',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  61, 'warm', 1776520000
);

-- 10. Enensys Technologies
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b7c1d2e3-aa10-4f6a-9b10-ren000000010',
  'Enensys Technologies',
  'enensys.com',
  'Specialiste des solutions de diffusion broadcast et broadband convergentes. Technologies pour la distribution de contenus audiovisuels via DVB-T2, ATSC 3.0 et 5G Broadcast. Siege a Rennes, clients operateurs et diffuseurs mondiaux.',
  'Telecommunications', 'Broadcast & 5G Media Distribution',
  'Rennes', 'France', 75, 12000000, 2024,
  '{"broadcast":["DVB-T2","ATSC 3.0","5G Broadcast","DASH/HLS"],"embedded":["FPGA Xilinx","Linux embarque","ARM"],"cloud":["AWS MediaLive","Kubernetes"],"video":["HEVC/H.265","VVC/H.266","MPEG-DASH"],"network":["IP multicast","SRT","RIST"],"devops":["Git","Jenkins","Docker"]}',
  0,
  'https://www.linkedin.com/company/enensys-technologies/',
  '450aborc90',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  55, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- Orange Labs Rennes News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00001-bb01-4000-b101-ren000000001',
  'b7c1d2e3-aa01-4f6a-9b01-ren000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Labs Rennes deploie le premier testbed 5G Open RAN en Bretagne',
  'Le campus de Cesson-Sevigne accueille le premier banc d''essai 5G Open RAN de France, permettant de tester l''interoperabilite des equipements multi-vendeurs. Le projet, soutenu par le plan France 2030, vise a reduire la dependance aux fournisseurs proprietaires.',
  'technology_launch',
  'https://www.usine-digitale.fr/article/orange-labs-rennes-5g-open-ran-testbed-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00001-bb01-4000-b101-ren000000002',
  'b7c1d2e3-aa01-4f6a-9b01-ren000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Cyberdefense renforce son SOC de Rennes avec 200 analystes supplementaires',
  'Orange Cyberdefense, filiale du groupe Orange, agrandit son centre d''operations de securite (SOC) de Rennes pour atteindre 500 analystes. Le site surveille en temps reel les menaces cyber pour les clients grands comptes et institutions gouvernementales.',
  'cybersecurity',
  'https://www.lemondeinformatique.fr/actualites/orange-cyberdefense-soc-rennes-expansion-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00001-bb01-4000-b101-ren000000003',
  'b7c1d2e3-aa01-4f6a-9b01-ren000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Labs Rennes participe au projet europeen Hexa-X II pour la 6G',
  'Les equipes R&D d''Orange a Rennes sont impliquees dans le consortium Hexa-X II, le principal projet europeen de recherche sur la 6G. Leurs travaux portent sur l''integration IA-reseau, la communication terahertz et les jumeaux numeriques de reseau.',
  'research',
  'https://www.orange.com/fr/newsroom/communiques/hexa-x-ii-6g-recherche-rennes-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00001-bb01-4000-b101-ren000000004',
  'b7c1d2e3-aa01-4f6a-9b01-ren000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange recrute 150 ingenieurs cybersecurite et IA pour ses labos de Rennes',
  'Le groupe Orange a lance un plan de recrutement de 150 profils R&D (cybersecurite, IA, reseaux) pour son campus de Cesson-Sevigne. Les postes couvrent la detection de menaces par IA, le chiffrement post-quantique et la securite des reseaux 5G.',
  'hiring',
  'https://www.ouest-france.fr/bretagne/rennes/orange-recrute-150-ingenieurs-rennes-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- Thales DIS Rennes News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00002-bb02-4000-b102-ren000000001',
  'b7c1d2e3-aa02-4f6a-9b02-ren000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Thales Rennes qualifie par l''ANSSI pour les solutions de chiffrement post-quantique',
  'Le site Thales DIS de Rennes obtient la qualification ANSSI pour ses modules de chiffrement post-quantique destines aux communications classifiees. La solution integre les algorithmes CRYSTALS-Kyber et CRYSTALS-Dilithium standardises par le NIST.',
  'cybersecurity',
  'https://www.thalesgroup.com/fr/group/press-releases/chiffrement-post-quantique-anssi-qualification-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00002-bb02-4000-b102-ren000000002',
  'b7c1d2e3-aa02-4f6a-9b02-ren000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Thales DIS remporte le contrat d''identite numerique europeenne eIDAS 2.0',
  'Thales Digital Identity & Security a ete selectionne comme fournisseur principal du portefeuille d''identite numerique europeen (EUDI Wallet) pour 8 pays membres. Le contrat-cadre de 500M EUR s''appuie sur l''expertise du site de Rennes en securite embarquee.',
  'major_contract',
  'https://www.lesechos.fr/tech-medias/hightech/thales-eidas-2-identite-numerique-europeenne-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00002-bb02-4000-b102-ren000000003',
  'b7c1d2e3-aa02-4f6a-9b02-ren000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Thales ouvre un centre de R&D cybersecurite defense a Rennes en partenariat avec la DGA',
  'Thales inaugure un nouveau laboratoire de recherche en cybersecurite a Rennes, co-finance avec la DGA et la Region Bretagne. Le centre de 5000 m2 emploiera 120 chercheurs sur la detection d''intrusion, le cyber-renseignement et la resilience des systemes d''armes.',
  'defense_digital',
  'https://www.defense.gouv.fr/actualites/thales-dga-centre-cybersecurite-rennes-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);


-- ---- DGA MI Bruz News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00003-bb03-4000-b103-ren000000001',
  'b7c1d2e3-aa03-4f6a-9b03-ren000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'DGA MI Bruz recoit 180M EUR pour moderniser les capacites de guerre electronique',
  'La LPM 2024-2030 alloue 180 millions EUR au centre DGA MI de Bruz pour le renouvellement des systemes d''ecoute et de brouillage electronique. Le programme couvre le spectre 0.1-40 GHz et integre des capacites de traitement IA en temps reel.',
  'defense_digital',
  'https://www.defense.gouv.fr/dga/actualites/dga-mi-bruz-modernisation-guerre-electronique-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00003-bb03-4000-b103-ren000000002',
  'b7c1d2e3-aa03-4f6a-9b03-ren000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'DGA MI recrute 200 ingenieurs en cybersecurite et traitement du signal',
  'Le centre DGA MI de Bruz lance une campagne de recrutement de 200 ingenieurs et docteurs en cybersecurite offensive/defensive, traitement du signal et intelligence artificielle. Le site accueillera egalement 50 reservistes operationnels cyber.',
  'hiring',
  'https://www.ouest-france.fr/bretagne/bruz/dga-mi-recrutement-200-ingenieurs-cyber-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00003-bb03-4000-b103-ren000000003',
  'b7c1d2e3-aa03-4f6a-9b03-ren000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'DGA MI et le Pole d''excellence cyber lancent un programme de R&D IA pour le renseignement',
  'DGA MI s''associe au Pole d''excellence cyber de Rennes pour un programme de 3 ans en IA appliquee au renseignement d''origine electromagnetique. Le projet mobilise l''INRIA, CentraleSupelec Rennes et 5 PME bretonnes specialisees en traitement du signal.',
  'research',
  'https://www.pole-excellence-cyber.org/actualites/dga-mi-ia-renseignement-programme-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Ippon Technologies News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00004-bb04-4000-b104-ren000000001',
  'b7c1d2e3-aa04-4f6a-9b04-ren000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ippon Technologies ouvre un nouveau centre cloud-native a Rennes avec 80 postes',
  'L''ESN Ippon Technologies agrandit son centre de delivery de Rennes avec un nouveau plateau dedie aux architectures cloud-native et data engineering. 80 postes d''ingenieurs sont a pourvoir sur AWS, Kubernetes et Apache Kafka.',
  'hiring',
  'https://www.silicon.fr/ippon-technologies-centre-cloud-rennes-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00004-bb04-4000-b104-ren000000002',
  'b7c1d2e3-aa04-4f6a-9b04-ren000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ippon lance une offre IA generative pour les entreprises avec son accelerateur JHipster-AI',
  'Ippon Technologies devoile un accelerateur combinant JHipster et modeles d''IA generative (LLM) pour accelerer le developpement d''applications d''entreprise. La solution, testee chez plusieurs clients grands comptes, reduit les delais de mise en production de 40%.',
  'technology_launch',
  'https://www.journaldunet.com/solutions/ippon-jhipster-ai-accelerateur-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00004-bb04-4000-b104-ren000000003',
  'b7c1d2e3-aa04-4f6a-9b04-ren000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ippon Technologies obtient le statut AWS Premier Tier Services Partner',
  'Ippon Technologies monte au rang de Premier Tier dans le programme partenaires AWS, reconnaissant son expertise en migration cloud, data analytics et modernisation d''applications. Le bureau de Rennes concentre 60% des certifications AWS du groupe.',
  'partnership',
  'https://www.channelnews.fr/ippon-technologies-aws-premier-tier-partner-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Oberthur Technologies News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00005-bb05-4000-b105-ren000000001',
  'b7c1d2e3-aa05-4f6a-9b05-ren000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Oberthur Technologies lance la premiere eSIM post-quantique pour operateurs telecom',
  'Le site R&D de Rennes d''Oberthur a developpe la premiere eSIM integrant des algorithmes de chiffrement post-quantique, compatible avec les reseaux 5G SA. La solution repond aux exigences de l''ANSSI pour les communications sensibles des operateurs d''importance vitale.',
  'cybersecurity',
  'https://www.usine-digitale.fr/article/oberthur-esim-post-quantique-operateurs-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00005-bb05-4000-b105-ren000000002',
  'b7c1d2e3-aa05-4f6a-9b05-ren000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Oberthur remporte un marche de 120M EUR pour les passeports biometriques de 3 pays africains',
  'Oberthur Technologies a ete selectionne pour fournir les passeports biometriques de nouvelle generation (polycarbonate, chip dualinterface) a 3 pays d''Afrique de l''Ouest. Le contrat de 120M EUR sur 7 ans inclut la personnalisation et le deploiement des infrastructures PKI.',
  'major_contract',
  'https://www.lemondeinformatique.fr/actualites/oberthur-passeports-biometriques-afrique-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00005-bb05-4000-b105-ren000000003',
  'b7c1d2e3-aa05-4f6a-9b05-ren000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Oberthur investit 30M EUR dans une ligne de production eSIM a Rennes',
  'Oberthur Technologies annonce un investissement de 30M EUR pour une nouvelle ligne de production eSIM sur son site de Rennes, visant a tripler sa capacite de production a 500 millions d''unites par an. Le projet cree 50 emplois directs.',
  'physical_expansion',
  'https://www.ouest-france.fr/bretagne/rennes/oberthur-investissement-esim-production-rennes-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Kerlink News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00006-bb06-4000-b106-ren000000001',
  'b7c1d2e3-aa06-4f6a-9b06-ren000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Kerlink deploie 15 000 passerelles LoRaWAN pour le reseau smart city de Singapour',
  'Kerlink remporte un contrat majeur de 15 000 passerelles Wirnet iStation pour le deploiement du reseau IoT national de Singapour. Le reseau couvrira les capteurs urbains (qualite de l''air, inondations, gestion des dechets) sur l''ensemble de la cite-Etat.',
  'major_contract',
  'https://www.iot-now.com/kerlink-singapore-smart-city-lorawan-15000-gateways-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00006-bb06-4000-b106-ren000000002',
  'b7c1d2e3-aa06-4f6a-9b06-ren000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Kerlink lance la passerelle Wirnet iStation 5G-IoT convergente',
  'Kerlink devoile la Wirnet iStation 5G, premiere passerelle convergente LoRaWAN/5G RedCap pour les reseaux IoT industriels. Le produit, concu a Rennes, permet une migration progressive des reseaux LPWAN vers la 5G massive IoT.',
  'technology_launch',
  'https://www.silicon.fr/kerlink-wirnet-istation-5g-iot-convergente-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00006-bb06-4000-b106-ren000000003',
  'b7c1d2e3-aa06-4f6a-9b06-ren000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Kerlink signe un partenariat avec Airbus Defence pour l''IoT des bases militaires',
  'Kerlink et Airbus Defence & Space s''associent pour deployer des reseaux LoRaWAN securises sur les bases militaires francaises. Le projet couvre la surveillance perimetrique, la gestion energetique et la logistique connectee des emprises de la Defense.',
  'defense_digital',
  'https://www.defense.gouv.fr/actualites/kerlink-airbus-iot-bases-militaires-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);


-- ---- b<>com (IRT) News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00007-bb07-4000-b107-ren000000001',
  'b7c1d2e3-aa07-4f6a-9b07-ren000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'b<>com inaugure sa plateforme 5G standalone pour l''industrie 4.0 a Rennes',
  'L''IRT b<>com inaugure la premiere plateforme 5G SA d''experimentation industrielle en Bretagne. Le testbed, ouvert aux PME et grands groupes, permet de valider des cas d''usage en temps reel: robotique mobile, realite augmentee industrielle et jumeaux numeriques.',
  'technology_launch',
  'https://www.b-com.com/actualites/plateforme-5g-standalone-industrie-rennes-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00007-bb07-4000-b107-ren000000002',
  'b7c1d2e3-aa07-4f6a-9b07-ren000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'b<>com transfere sa technologie d''IA de confiance a 3 industriels bretons',
  'L''IRT b<>com a signe 3 contrats de transfert technologique pour sa suite d''IA de confiance (explicabilite, robustesse, equite). Les beneficiaires sont des ETI bretonnes des secteurs defense, sante et telecom qui integreront les briques dans leurs produits.',
  'research',
  'https://www.usine-digitale.fr/article/bcom-ia-confiance-transfert-technologique-bretagne-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00007-bb07-4000-b107-ren000000003',
  'b7c1d2e3-aa07-4f6a-9b07-ren000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'b<>com recoit 25M EUR du plan France 2030 pour la cybersecurite des reseaux 5G/6G',
  'L''IRT b<>com obtient un financement de 25M EUR du programme France 2030 pour ses travaux sur la securisation native des architectures 5G et pre-6G. Le projet associe Orange, Thales et 4 startups bretonnes sur 4 ans.',
  'cybersecurity',
  'https://www.gouvernement.fr/actualites/france-2030-bcom-cybersecurite-5g-6g-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);


-- ---- Niji News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00008-bb08-4000-b108-ren000000001',
  'b7c1d2e3-aa08-4f6a-9b08-ren000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Niji remporte le marche de refonte des services numeriques de la Region Bretagne',
  'La societe rennaise Niji a ete selectionnee pour la refonte complete du portail de services numeriques de la Region Bretagne. Le projet de 8M EUR sur 3 ans couvre le design system, les parcours usagers et le developpement d''applications mobiles accessibles.',
  'major_contract',
  'https://www.ouest-france.fr/bretagne/rennes/niji-marche-services-numeriques-region-bretagne-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00008-bb08-4000-b108-ren000000002',
  'b7c1d2e3-aa08-4f6a-9b08-ren000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Niji lance un studio d''innovation IA generative dedie au secteur bancaire',
  'Niji ouvre un studio d''innovation a Rennes specialise dans l''application de l''IA generative aux services financiers: chatbots conseillers, analyse documentaire automatisee et detection de fraude augmentee. Le studio emploie 25 data scientists et UX designers.',
  'technology_launch',
  'https://www.journaldunet.com/solutions/niji-studio-ia-generative-banque-rennes-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00008-bb08-4000-b108-ren000000003',
  'b7c1d2e3-aa08-4f6a-9b08-ren000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Niji recrute 100 consultants digitaux pour accompagner sa croissance de 20%',
  'Face a une croissance de 20% de son chiffre d''affaires, Niji lance une campagne de recrutement de 100 consultants a Rennes (developpeurs, UX designers, chefs de projet digital). L''entreprise investit dans un programme d''acceleration des juniors avec Epitech Rennes.',
  'hiring',
  'https://www.silicon.fr/niji-recrutement-100-consultants-rennes-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Groupe Apave News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00009-bb09-4000-b109-ren000000001',
  'b7c1d2e3-aa09-4f6a-9b09-ren000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Apave lance une offre de certification cybersecurite IEC 62443 pour l''industrie',
  'Le Groupe Apave deploie depuis son centre de Rennes une nouvelle offre de certification cybersecurite industrielle IEC 62443, ciblant les systemes SCADA et IoT industriels. L''offre repond a la directive NIS2 imposant des audits de cybersecurite aux OIV et OSE.',
  'cybersecurity',
  'https://www.usine-digitale.fr/article/apave-certification-iec-62443-cybersecurite-industrielle-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00009-bb09-4000-b109-ren000000002',
  'b7c1d2e3-aa09-4f6a-9b09-ren000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Apave acquiert un cabinet de conseil en cybersecurite OT a Rennes',
  'Le Groupe Apave renforce son pole cybersecurite industrielle par l''acquisition d''un cabinet rennais de 40 consultants specialises en securite des systemes operationnels (OT). L''operation s''inscrit dans le plan strategique Apave 2028 visant 200M EUR de CA en cybersecurite.',
  'ma_activity',
  'https://www.lemondeinformatique.fr/actualites/apave-acquisition-cybersecurite-ot-rennes-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00009-bb09-4000-b109-ren000000003',
  'b7c1d2e3-aa09-4f6a-9b09-ren000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Apave deploie la formation cybersecurite en realite virtuelle pour les operateurs industriels',
  'Le centre Apave de Rennes lance un programme de formation en realite virtuelle simulant des cyberattaques sur des environnements SCADA et IoT industriels. Le programme cible 5000 operateurs industriels par an sur les sites classes Seveso et les OIV.',
  'digital_transformation',
  'https://www.industrie-techno.com/apave-formation-vr-cybersecurite-industrielle-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Enensys Technologies News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00010-bb10-4000-b110-ren000000001',
  'b7c1d2e3-aa10-4f6a-9b10-ren000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Enensys Technologies deploie la premiere infrastructure 5G Broadcast en France',
  'La societe rennaise Enensys a deploye la premiere infrastructure 5G Broadcast operationnelle en France pour le compte de TDF. La technologie permet la diffusion de contenus audiovisuels en direct vers les smartphones sans consommer de forfait data.',
  'technology_launch',
  'https://www.usine-digitale.fr/article/enensys-5g-broadcast-premiere-infrastructure-france-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00010-bb10-4000-b110-ren000000002',
  'b7c1d2e3-aa10-4f6a-9b10-ren000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Enensys remporte un contrat ATSC 3.0 avec un consortium de diffuseurs americains',
  'Enensys Technologies signe un contrat de 15M USD avec un consortium de 12 stations TV americaines pour fournir ses solutions de head-end ATSC 3.0. Le deploiement couvre la generation de signaux NextGen TV et l''insertion publicitaire dynamique.',
  'major_contract',
  'https://www.broadcastnow.co.uk/enensys-atsc-3-us-broadcasters-consortium-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nrn00010-bb10-4000-b110-ren000000003',
  'b7c1d2e3-aa10-4f6a-9b10-ren000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Enensys participe au projet europeen 5G-MAG pour la convergence broadcast-broadband',
  'Enensys Technologies rejoint le consortium europeen 5G-MAG pour developper les standards de convergence entre diffusion hertzienne et reseaux 5G. Les travaux du site de Rennes portent sur le multiplexage statistique et la synchronisation broadcast/unicast.',
  'research',
  'https://www.5g-mag.com/post/enensys-rejoint-5g-mag-convergence-broadcast-broadband-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- 1. Orange Labs Rennes: strong on 5G/cyber R&D, large employer, high consulting usage
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-orn01-aa01-4000-c001-ren000000001',
  'b7c1d2e3-aa01-4f6a-9b01-ren000000001',
  8, 7, 7, 9,
  85, 80, 8, 7,
  5, 8, 6, 7,
  3, 7, 5, 3, 7,
  7, 5, 4, 6,
  8, 9, 5, 6, 7,
  6, 7, 7, 7,
  7, 4, 8, 8,
  4, 3, 8,
  6, 5, 4, 7, 7,
  7, 3, 6,
  6, 2, 8,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 2. Thales DIS Rennes: defense/cyber, post-quantum, eIDAS contracts
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-thl02-aa02-4000-c002-ren000000002',
  'b7c1d2e3-aa02-4f6a-9b02-ren000000002',
  9, 8, 7, 8,
  85, 80, 9, 8,
  6, 8, 7, 5,
  3, 7, 4, 2, 8,
  7, 6, 5, 7,
  9, 8, 5, 7, 7,
  7, 8, 5, 8,
  7, 5, 5, 8,
  4, 4, 8,
  6, 5, 3, 8, 5,
  8, 7, 9,
  8, 2, 8,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 3. DGA MI Bruz: defense/SIGINT, large government body, steady hiring
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-dga03-aa03-4000-c003-ren000000003',
  'b7c1d2e3-aa03-4f6a-9b03-ren000000003',
  9, 8, 7, 9,
  85, 80, 9, 7,
  3, 7, 7, 3,
  2, 9, 2, 4, 7,
  7, 6, 5, 5,
  9, 7, 4, 6, 5,
  5, 6, 5, 7,
  6, 3, 3, 7,
  3, 2, 7,
  7, 6, 3, 9, 4,
  6, 9, 8,
  5, 2, 7,
  65, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 4. Ippon Technologies: cloud-native ESN, growing fast, less defense
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-ipp04-aa04-4000-c004-ren000000004',
  'b7c1d2e3-aa04-4f6a-9b04-ren000000004',
  6, 5, 5, 5,
  85, 80, 6, 5,
  7, 6, 4, 6,
  3, 4, 5, 3, 4,
  7, 5, 4, 7,
  6, 7, 6, 6, 5,
  6, 6, 5, 5,
  7, 3, 7, 6,
  3, 3, 3,
  4, 4, 4, 5, 4,
  4, 2, 4,
  5, 2, 6,
  58, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 5. Oberthur Technologies: smart card/security niche, eSIM growth, export contracts
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-obt05-aa05-4000-c005-ren000000005',
  'b7c1d2e3-aa05-4f6a-9b05-ren000000005',
  7, 6, 6, 7,
  85, 80, 8, 6,
  5, 7, 7, 5,
  3, 5, 5, 3, 6,
  6, 5, 4, 5,
  8, 7, 5, 5, 6,
  7, 7, 4, 6,
  5, 5, 4, 6,
  3, 3, 7,
  5, 5, 4, 8, 4,
  7, 3, 8,
  7, 2, 6,
  63, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 6. Kerlink: IoT pure-play, small but strategic, LoRaWAN leader
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-ker06-aa06-4000-c006-ren000000006',
  'b7c1d2e3-aa06-4f6a-9b06-ren000000006',
  7, 5, 3, 6,
  85, 80, 6, 4,
  6, 7, 5, 6,
  4, 6, 6, 3, 3,
  5, 4, 3, 5,
  7, 8, 5, 4, 5,
  5, 8, 4, 6,
  5, 2, 5, 7,
  3, 3, 3,
  4, 4, 5, 6, 9,
  6, 4, 7,
  7, 3, 7,
  60, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 7. b<>com (IRT): R&D institute, 5G testbed, trusted AI, France 2030 funding
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-bcm07-aa07-4000-c007-ren000000007',
  'b7c1d2e3-aa07-4f6a-9b07-ren000000007',
  8, 6, 4, 9,
  85, 80, 6, 5,
  4, 9, 5, 5,
  3, 9, 3, 3, 5,
  6, 4, 3, 5,
  9, 9, 4, 5, 6,
  5, 8, 5, 7,
  6, 3, 5, 8,
  3, 2, 6,
  4, 3, 4, 7, 7,
  6, 3, 5,
  5, 2, 8,
  66, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 8. Niji: digital agency, growing, moderate complexity
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-nij08-aa08-4000-c008-ren000000008',
  'b7c1d2e3-aa08-4f6a-9b08-ren000000008',
  5, 5, 5, 4,
  85, 80, 6, 5,
  7, 5, 3, 5,
  3, 3, 5, 3, 3,
  7, 5, 4, 6,
  5, 6, 6, 6, 5,
  5, 5, 4, 5,
  6, 3, 6, 5,
  3, 3, 2,
  3, 3, 4, 4, 3,
  4, 2, 3,
  6, 2, 5,
  57, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 9. Groupe Apave: certification/inspection, cybersecurity OT expansion, NIS2-driven
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-apv09-aa09-4000-c009-ren000000009',
  'b7c1d2e3-aa09-4f6a-9b09-ren000000009',
  6, 5, 7, 5,
  85, 80, 8, 6,
  5, 5, 5, 5,
  3, 4, 4, 3, 6,
  6, 4, 4, 5,
  6, 6, 5, 5, 5,
  5, 6, 5, 5,
  6, 6, 5, 5,
  4, 6, 7,
  5, 5, 5, 6, 5,
  8, 3, 8,
  5, 2, 6,
  61, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 10. Enensys Technologies: small broadcast/5G niche, export-oriented
INSERT INTO prospect_scores (
  id, company_id,
  sector_alignment, naf_code_match, company_size, rd_department_size,
  geographic_proximity, regional_specialization, company_maturity, organizational_structure,
  revenue_growth_gap, rd_spending_trend, capex_spikes, capex_to_opex_shift,
  recent_funding, public_grants, margin_compression, hiring_freeze_with_projects, external_spend_in_financials,
  engineering_job_volume, stale_job_postings, repeated_repostings, contract_freelance_language,
  rare_skills_demand, emerging_tech_demand, high_turnover_signals, recruiter_hiring_wave, above_market_salaries,
  physical_expansion, new_product_launch, platform_migration, program_milestones,
  digital_transformation, erp_plm_migration, cloud_migration, strategic_partnerships,
  leadership_change, ma_activity, existing_consulting_usage,
  legacy_modernization, tech_debt_indicators, cybersecurity_gaps, industry_specific_software, iot_industry4_adoption,
  eu_regulatory_pressure, french_defense_budget, certification_needs,
  major_contract_won, crisis_event, industry_event_presence,
  total_score, score_label,
  scored_at, created_at, updated_at
) VALUES (
  'ps-ene10-aa10-4000-c010-ren000000010',
  'b7c1d2e3-aa10-4f6a-9b10-ren000000010',
  6, 5, 3, 6,
  85, 80, 6, 4,
  5, 7, 4, 5,
  3, 5, 5, 3, 3,
  4, 3, 3, 4,
  7, 7, 4, 4, 5,
  4, 7, 4, 5,
  5, 2, 4, 6,
  3, 2, 3,
  4, 3, 4, 7, 4,
  5, 2, 5,
  6, 2, 6,
  55, 'warm',
  1776520000, 1776520000, 1776520000
);
