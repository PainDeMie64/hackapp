-- =============================================================================
-- SEED: 10 Toulouse Aerospace / Aero Supply Chain Companies
-- Liebherr-Aerospace Toulouse, Collins Aerospace France, Latecoere,
-- Figeac Aero, Sabena Technics, Mecachrome, Ratier-Figeac,
-- Stelia Aerospace (Airbus Atlantic), ATR, Derichebourg Aeronautics Services
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Liebherr-Aerospace Toulouse
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c001-aero-4a01-b001-toulouse00001',
  'Liebherr-Aerospace Toulouse',
  'liebherr.com',
  'Filiale aeronautique du groupe Liebherr, concoit et fabrique des systemes d''air management (packs de climatisation, turbines), des systemes de commandes de vol et des trains d''atterrissage pour Airbus, Boeing et Embraer. Site principal a Toulouse-Blagnac avec centre d''essais integre.',
  'Aerospace', 'Air Management & Flight Control Systems',
  'Toulouse', 'France', 1500, 950000000, 2024,
  '{"erp":["SAP ECC"],"plm":["Siemens Teamcenter","NX"],"cad":["CATIA V5","Creo"],"simulation":["ANSYS Fluent","Simcenter"],"mes":["Siemens Opcenter"],"quality":["SAP QM","Solumina"],"cloud":["Azure"],"iot":["ThingWorx"]}',
  1,
  'https://www.linkedin.com/company/liebherr-aerospace/',
  '383474750',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  82, 'hot', 1776520000
);

-- 2. Collins Aerospace France (RTX)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c002-aero-4a02-b002-toulouse00002',
  'Collins Aerospace France',
  'collinsaerospace.com',
  'Division francaise de Collins Aerospace (groupe RTX), leader mondial en systemes avioniques, nacelles de moteurs, trains d''atterrissage et systemes de gestion de l''information de vol. Sites a Toulouse (Blagnac) et Figeac, fournisseur Tier-1 d''Airbus et Dassault Aviation.',
  'Aerospace', 'Avionics & Nacelle Systems',
  'Toulouse', 'France', 5500, 2800000000, 2024,
  '{"erp":["SAP S/4HANA"],"plm":["Windchill","Creo"],"cad":["CATIA V5","Creo Parametric"],"simulation":["ANSYS","MATLAB Simulink"],"mes":["Apriso"],"cloud":["AWS","Azure"],"cybersecurity":["CrowdStrike","Zscaler"],"devops":["GitLab","Jenkins"]}',
  1,
  'https://www.linkedin.com/company/collins-aerospace/',
  '672042757',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  85, 'hot', 1776520000
);

-- 3. Latecoere
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c003-aero-4a03-b003-toulouse00003',
  'Latecoere',
  'latecoere.aero',
  'Equipementier aeronautique fonde a Toulouse en 1917, specialise dans les aerostructures (portes, fuselages, troncons) et les systemes d''interconnexion (cablage, harnais electriques). Fournisseur historique d''Airbus, Boeing, Dassault et Embraer. Detenu par Searchlight Capital Partners.',
  'Aerospace', 'Aerostructures & Interconnection Systems',
  'Toulouse', 'France', 5800, 720000000, 2024,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"plm":["Dassault ENOVIA","CATIA V5"],"mes":["Apriso"],"cad":["CATIA V5"],"quality":["Solumina","SAP QM"],"cloud":["Azure"],"data":["Power BI"]}',
  1,
  'https://www.linkedin.com/company/latecoere/',
  '572650889',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  78, 'warm', 1776520000
);

-- 4. Figeac Aero
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c004-aero-4a04-b004-toulouse00004',
  'Figeac Aero',
  'music.figeac-aero.com',
  'Sous-traitant aeronautique specialise dans l''usinage de precision de pieces de structure en alliages legers et titane, la chaudronnerie et le traitement de surface. Cote en bourse (Euronext Growth), fournisseur d''Airbus, Safran, Boeing, Spirit AeroSystems. Siege a Figeac, bureaux a Toulouse.',
  'Aerospace', 'Precision Machining & Aerostructures',
  'Toulouse', 'France', 3200, 420000000, 2024,
  '{"erp":["SAP ECC"],"cad":["CATIA V5","Mastercam"],"cam":["Mastercam","NCSIMUL"],"plm":["Windchill"],"mes":["MES Aero internal"],"quality":["Polyworks","Zeiss Calypso"],"cloud":["OVHcloud"]}',
  1,
  'https://www.linkedin.com/company/figeac-aero/',
  '349367576',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  75, 'warm', 1776520000
);

-- 5. Sabena Technics
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c005-aero-4a05-b005-toulouse00005',
  'Sabena Technics',
  'sabenatechnics.com',
  'Leader francais de la maintenance, reparation et revision (MRO) d''aeronefs civils et militaires. Filiale du groupe TAT, bases a Toulouse-Blagnac, Bordeaux, Dinard et Nimes. Specialise dans les modifications cabine, la peinture et la maintenance lourde de flottes Airbus et Boeing.',
  'Aerospace', 'MRO & Aircraft Maintenance',
  'Toulouse', 'France', 2800, 580000000, 2024,
  '{"erp":["IFS Applications"],"mrp":["AMOS MRO"],"cad":["CATIA V5"],"quality":["Solumina"],"mes":["Paperless MRO"],"cloud":["Azure"],"cybersecurity":["Fortinet"]}',
  1,
  'https://www.linkedin.com/company/sabena-technics/',
  '414734047',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 6. Mecachrome
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c006-aero-4a06-b006-toulouse00006',
  'Mecachrome',
  'mecachrome.com',
  'Groupe industriel specialise dans l''usinage de haute precision, l''assemblage de sous-ensembles et la supply chain aeronautique. Fournisseur Tier-1 d''Airbus, Safran et Rolls-Royce pour les pieces de moteurs (aubes, disques) et structures. Sites a Toulouse, Aubigny et Amboise. Egalement present en Formule 1.',
  'Aerospace', 'High-Precision Machining & Assembly',
  'Toulouse', 'France', 3000, 500000000, 2024,
  '{"erp":["SAP ECC"],"cam":["Mastercam","PowerMill"],"cad":["CATIA V5","NX"],"mes":["Siemens Opcenter"],"quality":["Zeiss Calypso","Polyworks"],"plm":["Windchill"],"iot":["Fanuc iConnect"]}',
  1,
  'https://www.linkedin.com/company/mecachrome/',
  '622050365',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  76, 'warm', 1776520000
);

-- 7. Ratier-Figeac (Collins Aerospace)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c007-aero-4a07-b007-toulouse00007',
  'Ratier-Figeac',
  'collinsaerospace.com/who-we-are/locations/ratier-figeac',
  'Filiale de Collins Aerospace (RTX), leader mondial des helices pour turbopropulseurs et des systemes de cockpit (manettes, pedonniers, panneaux de commande). Fournisseur d''ATR, Airbus A400M, Leonardo et Lockheed Martin. Site historique a Figeac, bureaux Toulouse.',
  'Aerospace', 'Propeller Systems & Cockpit Equipment',
  'Toulouse', 'France', 1300, 380000000, 2024,
  '{"erp":["SAP S/4HANA"],"plm":["Windchill","Creo"],"cad":["Creo Parametric","CATIA V5"],"simulation":["ANSYS Mechanical","MATLAB Simulink"],"mes":["Apriso"],"quality":["Solumina"],"embedded":["DO-178C tools","SCADE"]}',
  1,
  'https://www.linkedin.com/company/ratier-figeac/',
  '675580068',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  74, 'warm', 1776520000
);

-- 8. Stelia Aerospace (Airbus Atlantic)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c008-aero-4a08-b008-toulouse00008',
  'Airbus Atlantic',
  'airbus-atlantic.com',
  'Anciennement Stelia Aerospace, filiale d''Airbus dediee aux aerostructures et sieges pilotes. Concoit et fabrique les fuselages avant et centraux des A320/A321, les pointes avant de l''A350 et des sieges business class. 13 sites dont Toulouse, Meaulte, Saint-Nazaire et Rochefort. Premier fournisseur de rang 1 d''Airbus.',
  'Aerospace', 'Aerostructures & Pilot Seats',
  'Toulouse', 'France', 13000, 4200000000, 2024,
  '{"erp":["SAP S/4HANA"],"plm":["Dassault 3DEXPERIENCE","ENOVIA"],"cad":["CATIA V5","CATIA V6"],"mes":["Apriso","SAP ME"],"quality":["Solumina","SAP QM"],"simulation":["ANSYS","HyperWorks"],"cloud":["Azure","AWS"],"data":["Databricks","Power BI"],"iot":["Siemens MindSphere"]}',
  1,
  'https://www.linkedin.com/company/airbus-atlantic/',
  '389191816',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  88, 'hot', 1776520000
);

-- 9. ATR
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c009-aero-4a09-b009-toulouse00009',
  'ATR',
  'atr-aircraft.com',
  'Joint-venture 50/50 entre Airbus et Leonardo, ATR est le leader mondial des avions turbopropulseurs regionaux (ATR 42/72). Siege social et chaine d''assemblage final a Toulouse-Blagnac. Flotte de plus de 1500 appareils operes par 200 compagnies dans 100 pays. Developpement de l''ATR EVO a propulsion hybride.',
  'Aerospace', 'Regional Aircraft Manufacturer',
  'Toulouse', 'France', 1400, 1800000000, 2024,
  '{"erp":["SAP S/4HANA"],"plm":["Dassault 3DEXPERIENCE"],"cad":["CATIA V5","CATIA V6"],"simulation":["ANSYS","Nastran"],"mes":["SAP ME"],"cloud":["Azure"],"data":["Power BI","Dataiku"],"cybersecurity":["Airbus CyberSecurity"]}',
  1,
  'https://www.linkedin.com/company/atr/',
  '345195197',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  80, 'hot', 1776520000
);

-- 10. Derichebourg Aeronautics Services
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'ae10c010-aero-4a10-b010-toulouse00010',
  'Derichebourg Aeronautics Services',
  'derichebourg.com',
  'Division aeronautique du groupe Derichebourg, specialisee dans la prestation de services industriels sur sites aeronautiques: logistique de production, assemblage, peinture, nettoyage technique et gestion de supply chain. Presente sur les sites Airbus de Toulouse, Hambourg et Mobile (USA). Partenaire strategique d''Airbus pour la montee en cadence A320/A321neo.',
  'Aerospace', 'Industrial Services & Aerospace Logistics',
  'Toulouse', 'France', 4000, 620000000, 2024,
  '{"erp":["SAP ECC"],"wms":["SAP EWM"],"mes":["custom MES"],"quality":["SAP QM"],"fleet":["GeoTab","TomTom Telematics"],"cloud":["Azure"],"rpa":["UiPath"]}',
  1,
  'https://www.linkedin.com/company/derichebourg-aeronautics-services/',
  '493727992',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  73, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- Liebherr-Aerospace Toulouse News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero001-aa01-4000-b101-liebherr00001',
  'ae10c001-aero-4a01-b001-toulouse00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Liebherr-Aerospace decroche le contrat de climatisation pour l''A321XLR',
  'Liebherr-Aerospace Toulouse a signe un contrat pluriannuel avec Airbus pour la fourniture des packs de climatisation et systemes pneumatiques de l''A321XLR. Le programme represente plus de 200 MEUR sur 10 ans et necessite l''extension de la ligne de production de Blagnac.',
  'major_contract',
  'https://www.air-journal.fr/liebherr-aerospace-contrat-a321xlr-climatisation-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero001-aa01-4000-b101-liebherr00002',
  'ae10c001-aero-4a01-b001-toulouse00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Liebherr-Aerospace recrute 200 ingenieurs a Toulouse pour la montee en cadence Airbus',
  'Face a la montee en cadence de la famille A320neo (75 appareils/mois vises en 2027), Liebherr-Aerospace lance un plan de recrutement de 200 ingenieurs et techniciens a Toulouse, couvrant la conception mecanique, les essais systemes et l''industrialisation.',
  'hiring',
  'https://www.usinenouvelle.com/article/liebherr-aerospace-toulouse-recrutement-200-ingenieurs-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero001-aa01-4000-b101-liebherr00003',
  'ae10c001-aero-4a01-b001-toulouse00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Liebherr-Aerospace investit 50 MEUR dans un nouveau banc d''essais a Toulouse',
  'Liebherr-Aerospace Toulouse investit 50 millions d''euros dans un nouveau banc d''essais de systemes d''air integres pour les programmes Airbus A350 et A321neo. L''installation, operationnelle fin 2027, simulera les conditions de vol de -60C a +55C.',
  'expansion',
  'https://www.aerospatium.info/liebherr-aerospace-banc-essais-toulouse-investissement-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Collins Aerospace France News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero002-bb02-4000-b202-collins00001',
  'ae10c002-aero-4a02-b002-toulouse00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Collins Aerospace remporte le contrat des nacelles du RISE engine demonstrator',
  'Collins Aerospace France a ete selectionne par CFM International pour concevoir et fabriquer les nacelles du demonstrateur de moteur RISE (Revolutionary Innovation for Sustainable Engines). Le contrat mobilise 300 ingenieurs a Toulouse sur 5 ans.',
  'major_contract',
  'https://www.air-cosmos.com/collins-aerospace-nacelles-rise-cfm-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero002-bb02-4000-b202-collins00002',
  'ae10c002-aero-4a02-b002-toulouse00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Collins Aerospace France accelere la digitalisation de sa supply chain avec SAP IBP',
  'Collins Aerospace France deploie SAP Integrated Business Planning (IBP) sur ses sites francais pour optimiser la planification de la supply chain aeronautique. Le projet, estime a 40 MEUR, vise a reduire les delais de livraison de 20% face a la montee en cadence A320neo.',
  'digital_transformation',
  'https://www.usine-digitale.fr/collins-aerospace-sap-ibp-supply-chain-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero002-bb02-4000-b202-collins00003',
  'ae10c002-aero-4a02-b002-toulouse00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Collins Aerospace recrute 400 profils a Toulouse pour soutenir la croissance de RTX',
  'Collins Aerospace France lance un plan de recrutement de 400 ingenieurs et techniciens a Toulouse et Figeac en 2026-2027. Les profils recherches couvrent l''avionique embarquee, les composites, la mecanique des fluides et la cybersecurite aeronautique.',
  'hiring',
  'https://www.touleco.fr/collins-aerospace-recrutement-400-toulouse-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero002-bb02-4000-b202-collins00004',
  'ae10c002-aero-4a02-b002-toulouse00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Collins Aerospace fournira l''avionique de nouvelle generation du futur helicoptere militaire europeen NGRC',
  'Collins Aerospace France a ete retenu par Airbus Helicopters pour developper la suite avionique du Next Generation Rotorcraft Capability (NGRC). Le contrat cadre, estime a 500 MEUR, sera execute principalement depuis le site de Toulouse-Blagnac.',
  'major_contract',
  'https://www.defense.gouv.fr/actualites/collins-aerospace-avionique-ngrc-helicoptere-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);


-- ---- Latecoere News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero003-cc03-4000-b303-latecoer00001',
  'ae10c003-aero-4a03-b003-toulouse00003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Latecoere remporte le contrat des portes passagers de l''A321neo ACF',
  'Latecoere a ete selectionne par Airbus pour la conception et la production des portes passagers de l''A321neo Airbus Cabin Flex (ACF). Le contrat pluriannuel represente 150 MEUR de chiffre d''affaires cumule et consolide la position de Latecoere comme fournisseur cle de portes d''avions.',
  'major_contract',
  'https://www.aerospatium.info/latecoere-portes-a321neo-acf-airbus-contrat-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero003-cc03-4000-b303-latecoer00002',
  'ae10c003-aero-4a03-b003-toulouse00003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Latecoere investit dans l''industrie 4.0 avec une nouvelle usine connectee a Toulouse',
  'Latecoere a inaugure sa nouvelle usine connectee de 12 000 m2 a Toulouse-Montredon, equipee de robots collaboratifs, de jumeaux numeriques et de systemes MES avances. L''investissement de 35 MEUR vise a augmenter la productivite de 30% pour accompagner la ramp-up A320neo.',
  'expansion',
  'https://www.usinenouvelle.com/article/latecoere-usine-connectee-industrie-4-toulouse-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero003-cc03-4000-b303-latecoer00003',
  'ae10c003-aero-4a03-b003-toulouse00003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Latecoere recrute 300 operateurs et techniciens pour la montee en cadence Airbus',
  'Latecoere annonce le recrutement de 300 operateurs de production et techniciens composites sur ses sites de Toulouse et Labege pour accompagner la montee en cadence record de la famille A320neo. Le groupe mise sur la formation interne et les partenariats avec les IUT locaux.',
  'hiring',
  'https://www.touleco.fr/latecoere-recrutement-300-toulouse-montee-cadence-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Figeac Aero News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero004-dd04-4000-b404-figeac000001',
  'ae10c004-aero-4a04-b004-toulouse00004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Figeac Aero signe un contrat de 200 MEUR avec Airbus pour des pieces de structure A320neo',
  'Figeac Aero a signe un contrat cadre de 200 MEUR avec Airbus pour la fourniture de pieces de structure en aluminium et titane de la famille A320neo. Le contrat sur 7 ans confirme le retour a la croissance du groupe apres sa restructuration financiere.',
  'major_contract',
  'https://www.lesechos.fr/pme-regions/occitanie/figeac-aero-contrat-airbus-a320neo-200meur-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero004-dd04-4000-b404-figeac000002',
  'ae10c004-aero-4a04-b004-toulouse00004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Figeac Aero investit dans l''usinage 5 axes automatise pour la montee en cadence',
  'Figeac Aero investit 25 MEUR dans 15 nouvelles machines-outils 5 axes Starrag et Makino sur son site de Figeac. L''objectif est d''augmenter la capacite d''usinage de 40% pour repondre a la montee en cadence A320neo et aux nouveaux contrats Safran.',
  'expansion',
  'https://www.usinenouvelle.com/article/figeac-aero-usinage-5-axes-investissement-montee-cadence-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero004-dd04-4000-b404-figeac000003',
  'ae10c004-aero-4a04-b004-toulouse00004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Figeac Aero recrute 250 usineurs et ingenieurs methodes',
  'Figeac Aero lance un plan de recrutement de 250 postes sur 2026-2027 (usineurs CN, ingenieurs methodes, programmeurs FAO) pour accompagner la reprise des cadences aeronautiques. Le groupe ouvre un centre de formation a l''usinage aeronautique en partenariat avec le CNAM.',
  'hiring',
  'https://www.touleco.fr/figeac-aero-recrutement-250-usineurs-ingenieurs-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Sabena Technics News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero005-ee05-4000-b505-sabena000001',
  'ae10c005-aero-4a05-b005-toulouse00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Sabena Technics remporte le contrat MRO pour la flotte A330 MRTT de l''Armee de l''Air',
  'Sabena Technics a ete selectionne par la DGA pour le maintien en condition operationnelle de la flotte de 15 Airbus A330 MRTT Phenix de l''Armee de l''Air et de l''Espace. Le contrat de 10 ans, estime a 800 MEUR, sera execute depuis le site de Toulouse-Blagnac.',
  'major_contract',
  'https://www.defense.gouv.fr/air/actualites/sabena-technics-mro-a330mrtt-phenix-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero005-ee05-4000-b505-sabena000002',
  'ae10c005-aero-4a05-b005-toulouse00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Sabena Technics ouvre un nouveau hangar de maintenance lourde a Toulouse-Blagnac',
  'Sabena Technics inaugure un hangar de maintenance lourde de 15 000 m2 a Toulouse-Blagnac, capable d''accueillir 2 Airbus A350 simultanement. L''investissement de 45 MEUR repond a la demande croissante de checks C et D sur les avions de derniere generation.',
  'expansion',
  'https://www.aerospatium.info/sabena-technics-hangar-toulouse-blagnac-a350-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero005-ee05-4000-b505-sabena000003',
  'ae10c005-aero-4a05-b005-toulouse00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Sabena Technics recrute 350 mecaniciens et techniciens aeronautiques',
  'Sabena Technics annonce le recrutement de 350 mecaniciens et techniciens aeronautiques licencies B1/B2 sur ses bases de Toulouse, Bordeaux et Dinard. Le plan de recrutement vise a accompagner la croissance de l''activite MRO civile et militaire.',
  'hiring',
  'https://www.usinenouvelle.com/article/sabena-technics-recrutement-350-mecaniciens-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Mecachrome News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero006-ff06-4000-b606-mecachro00001',
  'ae10c006-aero-4a06-b006-toulouse00006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Mecachrome signe un contrat Tier-1 avec Safran pour les aubes de turbine LEAP',
  'Mecachrome a signe un contrat de 300 MEUR avec Safran Aircraft Engines pour la production d''aubes de turbine haute pression du moteur LEAP-1A (A320neo). Le contrat mobilise les capacites d''usinage 5 axes du site de Toulouse et d''Aubigny-sur-Nere.',
  'major_contract',
  'https://www.air-cosmos.com/mecachrome-safran-aubes-turbine-leap-contrat-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero006-ff06-4000-b606-mecachro00002',
  'ae10c006-aero-4a06-b006-toulouse00006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Mecachrome deploie l''usine du futur avec des cobots et de l''IA sur son site de Toulouse',
  'Mecachrome investit 20 MEUR dans la robotisation et l''intelligence artificielle sur son site toulousain. Le programme inclut 30 cobots Fanuc, un systeme de controle qualite par vision artificielle et un jumeau numerique de la chaine de production.',
  'digital_transformation',
  'https://www.usine-digitale.fr/mecachrome-usine-futur-cobots-ia-toulouse-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero006-ff06-4000-b606-mecachro00003',
  'ae10c006-aero-4a06-b006-toulouse00006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Mecachrome recrute 180 usineurs specialises pour ses sites francais',
  'Mecachrome lance une campagne de recrutement de 180 operateurs CN, programmeurs FAO et ingenieurs metallurgie sur ses sites de Toulouse, Aubigny et Amboise. Le groupe s''appuie sur son ecole interne d''usinage aeronautique pour former les nouvelles recrues.',
  'hiring',
  'https://www.touleco.fr/mecachrome-recrutement-180-usineurs-aeronautique-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Ratier-Figeac News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero007-gg07-4000-b707-ratierf00001',
  'ae10c007-aero-4a07-b007-toulouse00007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ratier-Figeac fournira les helices du futur ATR EVO a propulsion hybride',
  'Ratier-Figeac (Collins Aerospace) a ete selectionne pour concevoir les helices de nouvelle generation du programme ATR EVO, le futur turbopropulseur regional a propulsion hybride. Le contrat inclut le developpement d''helices en composite a pas variable optimisees pour le rendement propulsif.',
  'major_contract',
  'https://www.air-journal.fr/ratier-figeac-helices-atr-evo-hybride-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero007-gg07-4000-b707-ratierf00002',
  'ae10c007-aero-4a07-b007-toulouse00007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ratier-Figeac livre les systemes de cockpit de l''A400M Atlas a la cadence de 3/mois',
  'Ratier-Figeac a atteint la cadence cible de 3 shipsets par mois pour les systemes de cockpit (manettes de puissance, pedonniers, panneaux de commande) de l''Airbus A400M. L''acceleration repond aux commandes de l''OCCAR pour la derniere tranche de 32 appareils.',
  'ramp_up',
  'https://www.defense.gouv.fr/air/actualites/ratier-figeac-cockpit-a400m-cadence-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero007-gg07-4000-b707-ratierf00003',
  'ae10c007-aero-4a07-b007-toulouse00007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ratier-Figeac recrute 100 ingenieurs composites et systemes embarques',
  'Ratier-Figeac cherche a recruter 100 ingenieurs et techniciens specialises en materiaux composites, systemes embarques DO-178C et mecatronique pour ses sites de Figeac et Toulouse. Les recrutements accompagnent les programmes ATR EVO et A400M.',
  'hiring',
  'https://www.usinenouvelle.com/article/ratier-figeac-recrutement-100-ingenieurs-composites-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Airbus Atlantic (Stelia Aerospace) News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero008-hh08-4000-b808-airbatl00001',
  'ae10c008-aero-4a08-b008-toulouse00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Atlantic accelere a 75 fuselages A320neo par mois d''ici 2027',
  'Airbus Atlantic (ex-Stelia Aerospace) confirme l''objectif de produire 75 fuselages avant et sections centrales par mois pour la famille A320neo d''ici fin 2027. Le plan industriel necessite 600 MEUR d''investissements supplementaires dans les sites de Meaulte, Toulouse et Saint-Nazaire.',
  'ramp_up',
  'https://www.lesechos.fr/industrie-services/air-defense/airbus-atlantic-75-fuselages-mois-a320neo-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero008-hh08-4000-b808-airbatl00002',
  'ae10c008-aero-4a08-b008-toulouse00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Atlantic deploie 3DEXPERIENCE sur l''ensemble de ses 13 sites',
  'Airbus Atlantic finalise le deploiement de la plateforme Dassault 3DEXPERIENCE en remplacement de CATIA V5/ENOVIA sur ses 13 sites industriels. Le programme de 120 MEUR couvre la gestion des donnees produit, la simulation numerique et la continuite numerique atelier.',
  'digital_transformation',
  'https://www.usine-digitale.fr/airbus-atlantic-3dexperience-deploiement-13-sites-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero008-hh08-4000-b808-airbatl00003',
  'ae10c008-aero-4a08-b008-toulouse00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Atlantic recrute 2000 personnes en France pour la montee en cadence',
  'Airbus Atlantic annonce le recrutement de 2000 personnes en CDI sur 2026-2027 (operateurs composites, soudeurs, ingenieurs industrialisation, techniciens qualite) pour accompagner la montee en cadence sans precedent de la famille A320neo et de l''A350.',
  'hiring',
  'https://www.usinenouvelle.com/article/airbus-atlantic-recrutement-2000-montee-cadence-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero008-hh08-4000-b808-airbatl00004',
  'ae10c008-aero-4a08-b008-toulouse00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Atlantic signe un partenariat avec Daher pour la sous-traitance de sous-ensembles A321neo',
  'Airbus Atlantic et Daher ont signe un accord-cadre pour la fabrication de sous-ensembles du fuselage de l''A321neo. Le partenariat de 5 ans mobilise les sites Daher de Tarbes et Nantes et represente 250 MEUR de sous-traitance.',
  'strategic_partnership',
  'https://www.air-cosmos.com/airbus-atlantic-daher-sous-traitance-a321neo-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- ATR News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero009-ii09-4000-b909-atr00000001',
  'ae10c009-aero-4a09-b009-toulouse00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ATR lance officiellement le programme ATR EVO a propulsion hybride',
  'ATR a officiellement lance le programme ATR EVO, le successeur hybride de l''ATR 72-600. L''avion combinera des moteurs thermiques avances et une propulsion electrique pour reduire les emissions de CO2 de 50%. L''entree en service est prevue pour 2032, avec un investissement de 1.5 milliard EUR.',
  'new_product',
  'https://www.air-journal.fr/atr-evo-lancement-programme-hybride-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero009-ii09-4000-b909-atr00000002',
  'ae10c009-aero-4a09-b009-toulouse00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ATR remporte une commande de 50 ATR 72-600 avec IndiGo',
  'ATR a annonce une commande ferme de 50 ATR 72-600 avec IndiGo, la plus grande compagnie aerienne indienne. La commande, estimee a 800 MEUR au prix catalogue, confirme le rebond des ventes d''ATR apres les annees COVID et renforce sa position en Asie.',
  'major_contract',
  'https://www.reuters.com/business/aerospace-defense/atr-indigo-commande-50-atr72-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero009-ii09-4000-b909-atr00000003',
  'ae10c009-aero-4a09-b009-toulouse00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ATR accelere la cadence de production a 8 appareils par mois a Toulouse',
  'ATR vise une cadence de 8 appareils livres par mois d''ici fin 2027, contre 5 actuellement, sur sa chaine d''assemblage final de Toulouse-Blagnac. L''acceleration necessite des investissements de 80 MEUR dans les postes de montage et la supply chain des equipementiers.',
  'ramp_up',
  'https://www.aerospatium.info/atr-cadence-production-8-mois-toulouse-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero009-ii09-4000-b909-atr00000004',
  'ae10c009-aero-4a09-b009-toulouse00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ATR recrute 200 ingenieurs pour le programme EVO et le support client',
  'ATR lance le recrutement de 200 ingenieurs a Toulouse (aerodynamique, propulsion hybride, certification EASA, support client) pour accompagner le programme ATR EVO et la croissance de sa flotte mondiale. Le siege de Blagnac sera agrandi de 3000 m2.',
  'hiring',
  'https://www.touleco.fr/atr-recrutement-200-ingenieurs-toulouse-evo-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- Derichebourg Aeronautics Services News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero010-jj10-4000-b010-derich000001',
  'ae10c010-aero-4a10-b010-toulouse00010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Derichebourg Aeronautics remporte un contrat de 500 MEUR avec Airbus pour la logistique A320neo',
  'Derichebourg Aeronautics Services a signe un contrat cadre de 500 MEUR sur 7 ans avec Airbus pour la gestion de la logistique de production, le kitting et la supply chain interne sur les lignes d''assemblage A320neo de Toulouse et Hambourg.',
  'major_contract',
  'https://www.air-cosmos.com/derichebourg-aeronautics-airbus-logistique-a320neo-contrat-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero010-jj10-4000-b010-derich000002',
  'ae10c010-aero-4a10-b010-toulouse00010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Derichebourg Aeronautics deploie des AGV et de la robotique sur les lignes Airbus',
  'Derichebourg Aeronautics Services investit 15 MEUR dans le deploiement de vehicules a guidage automatique (AGV) et de robots collaboratifs sur les lignes d''assemblage final A320neo de Toulouse. Le projet vise a automatiser 40% des flux logistiques internes.',
  'digital_transformation',
  'https://www.usine-digitale.fr/derichebourg-aeronautics-agv-robotique-airbus-toulouse-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naero010-jj10-4000-b010-derich000003',
  'ae10c010-aero-4a10-b010-toulouse00010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Derichebourg Aeronautics recrute 500 operateurs pour la montee en cadence Airbus',
  'Derichebourg Aeronautics Services recrute 500 operateurs de production, logisticiens et chefs d''equipe sur le bassin d''emploi de Toulouse pour accompagner la montee en cadence historique de la famille A320neo (75/mois en 2027). Le groupe propose des CDI et des parcours de formation qualifiants.',
  'hiring',
  'https://www.usinenouvelle.com/article/derichebourg-aeronautics-recrutement-500-operateurs-toulouse-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- 1. Liebherr-Aerospace Toulouse: strong Tier-1 supplier, A321XLR contract, ramp-up hiring
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
  'ps-aero01-1111-4a01-a001-toulouse00001',
  'ae10c001-aero-4a01-b001-toulouse00001',
  95, 85, 70, 80,
  90, 92, 85, 75,
  75, 80, 85, 60,
  30, 65, 50, 20, 75,
  80, 65, 60, 70,
  85, 75, 55, 75, 70,
  85, 80, 65, 80,
  70, 65, 60, 80,
  40, 30, 80,
  70, 60, 50, 85, 75,
  80, 55, 85,
  90, 20, 75,
  82, 'hot',
  1776520000, 1776520000, 1776520000
);

-- 2. Collins Aerospace France: major RTX subsidiary, RISE nacelles, strong digital
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
  'ps-aero02-2222-4a02-a002-toulouse00002',
  'ae10c002-aero-4a02-b002-toulouse00002',
  95, 90, 80, 85,
  90, 92, 90, 80,
  80, 85, 80, 70,
  40, 70, 45, 25, 80,
  85, 70, 65, 75,
  90, 85, 60, 80, 80,
  75, 85, 75, 85,
  80, 80, 75, 85,
  45, 50, 85,
  75, 65, 55, 90, 80,
  85, 65, 90,
  90, 15, 85,
  85, 'hot',
  1776520000, 1776520000, 1776520000
);

-- 3. Latecoere: aerostructures, A321neo doors, factory 4.0 investment
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
  'ps-aero03-3333-4a03-a003-toulouse00003',
  'ae10c003-aero-4a03-b003-toulouse00003',
  95, 85, 75, 70,
  90, 92, 80, 70,
  70, 70, 80, 65,
  50, 60, 65, 35, 70,
  75, 60, 55, 70,
  70, 70, 50, 70, 60,
  80, 70, 75, 75,
  75, 80, 65, 70,
  50, 45, 75,
  75, 65, 55, 80, 70,
  75, 40, 80,
  80, 30, 70,
  78, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 4. Figeac Aero: precision machining, recovery story, capex investment
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
  'ps-aero04-4444-4a04-a004-toulouse00004',
  'ae10c004-aero-4a04-b004-toulouse00004',
  95, 85, 70, 65,
  90, 90, 70, 65,
  75, 65, 85, 55,
  45, 55, 70, 30, 65,
  70, 55, 50, 65,
  75, 60, 50, 65, 55,
  80, 60, 55, 70,
  60, 55, 50, 65,
  35, 30, 70,
  65, 60, 50, 75, 60,
  70, 30, 75,
  85, 25, 65,
  75, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 5. Sabena Technics: MRO leader, military contract, hangar expansion
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
  'ps-aero05-5555-4a05-a005-toulouse00005',
  'ae10c005-aero-4a05-b005-toulouse00005',
  95, 80, 70, 60,
  90, 90, 80, 70,
  65, 55, 80, 55,
  30, 50, 55, 25, 65,
  75, 55, 50, 65,
  70, 55, 55, 65, 55,
  80, 50, 55, 70,
  60, 55, 50, 60,
  35, 25, 70,
  65, 55, 55, 75, 55,
  75, 60, 80,
  85, 20, 65,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 6. Mecachrome: precision machining, Safran LEAP contract, industry 4.0
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
  'ps-aero06-6666-4a06-a006-toulouse00006',
  'ae10c006-aero-4a06-b006-toulouse00006',
  95, 85, 70, 70,
  90, 92, 80, 70,
  70, 70, 80, 55,
  35, 55, 55, 25, 70,
  75, 60, 55, 70,
  80, 70, 55, 70, 60,
  75, 65, 55, 75,
  75, 60, 50, 70,
  35, 30, 75,
  65, 55, 50, 80, 75,
  70, 35, 75,
  85, 20, 70,
  76, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 7. Ratier-Figeac: propeller systems, ATR EVO, cockpit equipment
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
  'ps-aero07-7777-4a07-a007-toulouse00007',
  'ae10c007-aero-4a07-b007-toulouse00007',
  95, 85, 65, 75,
  90, 90, 85, 70,
  65, 70, 70, 55,
  30, 50, 50, 20, 65,
  70, 55, 50, 60,
  80, 70, 50, 65, 65,
  65, 80, 60, 75,
  65, 65, 55, 70,
  35, 30, 70,
  60, 50, 50, 80, 60,
  75, 55, 85,
  80, 15, 70,
  74, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 8. Airbus Atlantic: highest scorer - A320neo ramp-up, 3DEXPERIENCE, massive hiring
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
  'ps-aero08-8888-4a08-a008-toulouse00008',
  'ae10c008-aero-4a08-b008-toulouse00008',
  95, 90, 85, 85,
  90, 95, 90, 85,
  85, 85, 90, 70,
  50, 75, 50, 25, 85,
  90, 75, 70, 80,
  85, 85, 60, 85, 80,
  90, 80, 80, 90,
  85, 85, 75, 90,
  50, 55, 90,
  80, 70, 60, 90, 85,
  85, 50, 90,
  85, 15, 90,
  88, 'hot',
  1776520000, 1776520000, 1776520000
);

-- 9. ATR: aircraft OEM, ATR EVO program, IndiGo order, production ramp-up
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
  'ps-aero09-9999-4a09-a009-toulouse00009',
  'ae10c009-aero-4a09-b009-toulouse00009',
  95, 90, 65, 80,
  90, 95, 85, 75,
  80, 85, 80, 65,
  40, 70, 45, 20, 75,
  80, 65, 60, 70,
  85, 80, 50, 75, 70,
  75, 90, 70, 85,
  75, 70, 65, 80,
  45, 40, 80,
  70, 60, 55, 85, 70,
  80, 35, 85,
  85, 15, 80,
  80, 'hot',
  1776520000, 1776520000, 1776520000
);

-- 10. Derichebourg Aeronautics Services: logistics on Airbus lines, AGV deployment
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
  'ps-aero10-0000-4a10-a010-toulouse00010',
  'ae10c010-aero-4a10-b010-toulouse00010',
  95, 80, 75, 50,
  90, 90, 75, 65,
  70, 50, 70, 60,
  30, 45, 55, 30, 65,
  80, 60, 55, 75,
  55, 50, 60, 70, 50,
  70, 45, 50, 65,
  60, 55, 50, 65,
  35, 25, 65,
  60, 55, 50, 65, 55,
  65, 30, 65,
  85, 20, 60,
  73, 'warm',
  1776520000, 1776520000, 1776520000
);
