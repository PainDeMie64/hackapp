-- =============================================================================
-- SEED: 10 French EV & Battery Ecosystem Companies
-- ACC, Verkor, Saft, Blue Solutions, Ampere, Nidec PSA e-motors,
-- Continental France, Plastic Omnium, Faurecia Clean Mobility, Valeo Siemens eAutomotive
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. ACC (Automotive Cells Company)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10001-aa01-4e5f-8a9b-ba77ery00001',
  'ACC (Automotive Cells Company)',
  'acc-emotion.com',
  'Joint-venture entre Stellantis, TotalEnergies et Mercedes-Benz pour la production de cellules de batteries lithium-ion en Europe. Gigafactories a Billy-Berclau (Hauts-de-France), Kaiserslautern (Allemagne) et Termoli (Italie). Capacite cible de 120 GWh d''ici 2030.',
  'EV/Battery', 'Battery Cell Manufacturing',
  'Nersac', 'France', 3000, 500000000, 2025,
  '{"mes":["Siemens Opcenter"],"erp":["SAP S/4HANA"],"plm":["Siemens Teamcenter"],"simulation":["ANSYS Fluent","COMSOL Multiphysics"],"cloud":["AWS","Azure"],"iot":["Siemens MindSphere","AWS IoT Greengrass"],"quality":["Zeiss CALYPSO","SPC Vision"],"automation":["Siemens TIA Portal","KUKA robots"]}',
  1,
  'https://www.linkedin.com/company/automotive-cells-company/',
  '898aborc1',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  88, 'hot', 1776520000
);

-- 2. Verkor
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10002-bb02-4e5f-8a9b-ba77ery00002',
  'Verkor',
  'verkor.com',
  'Start-up industrielle francaise construisant une gigafactory de batteries haute performance a Dunkerque (Hauts-de-France). Partenariat strategique avec Renault Group pour fournir des cellules NMC pour les vehicules electriques. Capacite cible de 50 GWh d''ici 2030.',
  'EV/Battery', 'Battery Cell Manufacturing',
  'Grenoble', 'France', 1500, 150000000, 2025,
  '{"mes":["Rockwell FactoryTalk"],"erp":["SAP S/4HANA"],"simulation":["COMSOL","Altair"],"cloud":["GCP","AWS"],"data":["Databricks","dbt"],"iot":["Google Cloud IoT","Grafana"],"devops":["Kubernetes","Terraform","GitLab CI"],"ai_ml":["Vertex AI","PyTorch"]}',
  1,
  'https://www.linkedin.com/company/verkor/',
  '893456789',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  90, 'hot', 1776520000
);

-- 3. Saft (TotalEnergies)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10003-cc03-4e5f-8a9b-ba77ery00003',
  'Saft (TotalEnergies)',
  'saftbatteries.com',
  'Filiale de TotalEnergies, leader mondial des batteries haute technologie pour l''industrie (defense, spatial, transport, stockage d''energie). Usines a Bordeaux, Poitiers et Nersac. Expertise en lithium-ion, nickel et batteries primaires pour applications critiques.',
  'EV/Battery', 'Industrial & Specialty Batteries',
  'Levallois-Perret', 'France', 4500, 900000000, 2025,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"mes":["Apriso"],"plm":["PTC Windchill"],"simulation":["ANSYS","MATLAB Simulink"],"cloud":["Azure","OVHcloud"],"quality":["Minitab","SAP QM"],"embedded":["LabVIEW","National Instruments"],"cybersecurity":["Stormshield","Thales Elips"]}',
  1,
  'https://www.linkedin.com/company/saft/',
  '383703873',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  79, 'warm', 1776520000
);

-- 4. Blue Solutions (Bollore)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10004-dd04-4e5f-8a9b-ba77ery00004',
  'Blue Solutions (Bollore)',
  'blue-solutions.com',
  'Filiale du groupe Bollore, pionniere des batteries solides a electrolyte polymere (LMP - Lithium Metal Polymer). Production a Quimper (Bretagne) et Boucherville (Canada). Technologie utilisee dans les bus electriques Bluebus et le stockage stationnaire.',
  'EV/Battery', 'Solid-State Battery Manufacturing',
  'Odet', 'France', 2000, 350000000, 2025,
  '{"erp":["SAP ECC"],"mes":["Wonderware InTouch"],"plm":["SolidWorks PDM"],"simulation":["COMSOL","MATLAB"],"cloud":["OVHcloud"],"automation":["Schneider Modicon","Beckhoff TwinCAT"],"quality":["JMP Statistical","SAP QM"],"r_and_d":["OriginPro","Igor Pro"]}',
  1,
  'https://www.linkedin.com/company/blue-solutions/',
  '421090148',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  75, 'warm', 1776520000
);

-- 5. Ampere (Renault)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10005-ee05-4e5f-8a9b-ba77ery00005',
  'Ampere (Renault)',
  'ampere-cars.com',
  'Entite dediee aux vehicules electriques et logiciels du groupe Renault. Produit la Renault 5 E-Tech, Megane E-Tech et Scenic E-Tech dans l''ElectriCity (Douai-Maubeuge-Ruitz). Objectif de 1 million de VE/an d''ici 2031. Partenariat Qualcomm pour le SDV.',
  'EV/Battery', 'Electric Vehicle OEM',
  'Boulogne-Billancourt', 'France', 11000, 10000000000, 2025,
  '{"sdv":["Qualcomm Snapdragon Ride","Android Automotive"],"erp":["SAP S/4HANA"],"plm":["Dassault 3DEXPERIENCE","CATIA V6"],"simulation":["ANSYS","Altair HyperWorks","CarMaker"],"cloud":["GCP","AWS"],"data":["Palantir Foundry","Databricks"],"iot":["Google Cloud IoT","Azure IoT Hub"],"devops":["GitLab","Jenkins","Kubernetes"]}',
  1,
  'https://www.linkedin.com/company/ampere-electricvehicles/',
  '954312876',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  86, 'hot', 1776520000
);

-- 6. Nidec PSA e-motors (Nidec Leroy-Somer)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10006-ff06-4e5f-8a9b-ba77ery00006',
  'Nidec PSA e-motors',
  'nidec-industrial.com',
  'Joint-venture entre Nidec et Stellantis pour la conception et fabrication de moteurs electriques de traction pour vehicules electriques. Usine de production a Trémery (Moselle), ancien site de moteurs thermiques reconverti. Capacite de 900 000 moteurs/an.',
  'EV/Battery', 'Electric Motor Manufacturing',
  'Tremery', 'France', 2500, 600000000, 2025,
  '{"erp":["SAP S/4HANA"],"mes":["Siemens Opcenter"],"plm":["Siemens NX","Teamcenter"],"simulation":["JMAG","ANSYS Maxwell","Simulink"],"cad":["CATIA V5","Siemens NX"],"automation":["Siemens TIA Portal","Fanuc robots"],"quality":["SAP QM","Hexagon PC-DMIS"],"iot":["Siemens MindSphere"]}',
  1,
  'https://www.linkedin.com/company/nidec-psa-emotors/',
  '844567321',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  77, 'warm', 1776520000
);

-- 7. Continental France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10007-a707-4e5f-8a9b-ba77ery00007',
  'Continental France',
  'continental.com',
  'Operations francaises du groupe Continental AG, specialisees dans l''electronique de puissance, les systemes de gestion de batteries (BMS), les capteurs ADAS et les solutions de freinage regeneratif pour vehicules electriques. Sites a Toulouse, Rambouillet et Bourgoin-Jallieu.',
  'EV/Battery', 'EV Electronics & BMS',
  'Toulouse', 'France', 8000, 2500000000, 2025,
  '{"embedded":["AUTOSAR","Vector CANoe","MATLAB Simulink"],"erp":["SAP S/4HANA"],"plm":["PTC Windchill","Creo"],"simulation":["ANSYS","dSPACE","CarMaker"],"cloud":["AWS","Azure"],"ci_cd":["Jenkins","GitLab CI"],"cybersecurity":["Argus Automotive","C2A Security"],"testing":["Vector VT System","NI TestStand"]}',
  1,
  'https://www.linkedin.com/company/continental/',
  '542065123',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  74, 'warm', 1776520000
);

-- 8. Plastic Omnium
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10008-b808-4e5f-8a9b-ba77ery00008',
  'Plastic Omnium',
  'plasticomnium.com',
  'Equipementier automobile francais leader dans les systemes d''energie propre: reservoirs a hydrogene haute pression, piles a combustible, systemes de stockage d''energie et pieces de carrosserie composites pour vehicules electriques. Centre R&D a Compiègne et alphatech a Bruxelles.',
  'EV/Battery', 'Hydrogen Systems & EV Components',
  'Levallois-Perret', 'France', 31000, 9400000000, 2025,
  '{"erp":["SAP S/4HANA"],"plm":["Siemens Teamcenter","NX"],"simulation":["ANSYS","Abaqus","GT-SUITE"],"cloud":["Azure","AWS"],"mes":["Apriso","SAP ME"],"data":["Power BI","Databricks"],"iot":["Azure IoT Hub","PTC ThingWorx"],"cad":["CATIA V5","Siemens NX"]}',
  1,
  'https://www.linkedin.com/company/plastic-omnium/',
  '955512345',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  80, 'hot', 1776520000
);

-- 9. Faurecia Clean Mobility (FORVIA)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10009-c909-4e5f-8a9b-ba77ery00009',
  'Faurecia Clean Mobility (FORVIA)',
  'faurecia.com',
  'Division mobilite propre du groupe FORVIA (ex-Faurecia/HELLA). Specialisee dans les systemes de stockage d''hydrogene embarque, les piles a combustible, la gestion thermique des batteries EV et les materiaux legers pour vehicules electriques. 77 sites industriels dans le monde.',
  'EV/Battery', 'Clean Mobility & Hydrogen Storage',
  'Nanterre', 'France', 15000, 4500000000, 2025,
  '{"erp":["SAP S/4HANA"],"plm":["Dassault ENOVIA","CATIA V6"],"simulation":["ANSYS","StarCCM+","Abaqus"],"cloud":["Azure","GCP"],"mes":["SAP ME","Apriso"],"iot":["Azure IoT","ThingWorx"],"data":["Snowflake","Power BI"],"devops":["Azure DevOps","Docker","Kubernetes"]}',
  1,
  'https://www.linkedin.com/company/faurecia/',
  '542005376',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  82, 'hot', 1776520000
);

-- 10. Valeo Siemens eAutomotive (now Valeo Power)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'evb10010-da10-4e5f-8a9b-ba77ery00010',
  'Valeo Siemens eAutomotive',
  'valeo.com',
  'Division electrification de Valeo (rachat de la part Siemens en 2022). Concoit et fabrique des moteurs electriques haute tension, onduleurs, chargeurs embarques et systemes 48V pour constructeurs automobiles mondiaux. Site principal a Cergy-Pontoise et usine de production a l''Isle-d''Abeau.',
  'EV/Battery', 'EV Powertrain & Power Electronics',
  'Paris', 'France', 5000, 2200000000, 2025,
  '{"embedded":["AUTOSAR","Vector tools","Simulink"],"erp":["SAP S/4HANA"],"plm":["Dassault ENOVIA","CATIA"],"simulation":["ANSYS","JMAG","Plecs"],"cad":["CATIA V5","Altium Designer"],"cloud":["Azure","AWS"],"ci_cd":["Jenkins","GitLab CI","Artifactory"],"testing":["dSPACE HIL","NI TestStand","Vector CANoe"]}',
  1,
  'https://www.linkedin.com/company/valeo/',
  '552030967',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  83, 'hot', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- ACC News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00001-aa01-4000-b001-acc000000001',
  'evb10001-aa01-4e5f-8a9b-ba77ery00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ACC demarre la production en serie de cellules a Billy-Berclau',
  'ACC a lance la production en serie dans sa gigafactory de Billy-Berclau (Hauts-de-France), premiere usine de cellules de batteries de cette envergure en France. La ligne 1 atteint 13 GWh de capacite, alimentant les Peugeot e-3008 et Opel Grandland Electric. 2000 emplois directs crees.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/acc-billy-berclau-production-serie-gigafactory-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00001-aa01-4000-b001-acc000000002',
  'evb10001-aa01-4e5f-8a9b-ba77ery00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ACC recrute 3000 ingenieurs et techniciens pour ses trois gigafactories',
  'ACC a annonce un plan de recrutement massif de 3000 postes (electrochimie, process engineering, automatisme, qualite) sur 2026-2028 pour monter en cadence ses trois sites de Billy-Berclau, Kaiserslautern et Termoli. L''entreprise ouvre un centre de formation a Nersac.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/acc-recrutement-3000-gigafactory-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00001-aa01-4000-b001-acc000000003',
  'evb10001-aa01-4e5f-8a9b-ba77ery00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ACC recoit 4.7 milliards EUR d''aides publiques au titre de l''IPCEI Batteries',
  'La Commission europeenne a approuve 4.7 milliards EUR d''aides publiques pour ACC dans le cadre du programme IPCEI (Important Project of Common European Interest) sur les batteries. Le financement couvre la R&D sur les cellules haute densite et la mise a l''echelle des trois gigafactories.',
  'public_funding',
  'https://www.reuters.com/business/autos/acc-ipcei-battery-eu-subsidy-approved-2026',
  'positive', 9, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00001-aa01-4000-b001-acc000000004',
  'evb10001-aa01-4e5f-8a9b-ba77ery00001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ACC se conforme au EU Battery Regulation avec un passeport numerique',
  'ACC est l''un des premiers fabricants a implementer le passeport numerique de batterie conformement au EU Battery Regulation (entree en vigueur 2027). Le systeme trace l''empreinte carbone, les materiaux critiques et la recyclabilite de chaque cellule produite.',
  'regulatory',
  'https://www.euractiv.com/section/batteries/acc-eu-battery-passport-regulation-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Verkor News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00002-bb02-4000-b002-vrk000000001',
  'evb10002-bb02-4e5f-8a9b-ba77ery00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Verkor lance la construction de sa gigafactory de 50 GWh a Dunkerque',
  'Verkor a demarre les travaux de sa gigafactory de batteries a Dunkerque, sur un terrain de 150 hectares dans la zone industrialo-portuaire. L''investissement total de 4.6 milliards EUR creera 2200 emplois directs. La phase 1 (16 GWh) sera operationnelle debut 2027.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/verkor-dunkerque-gigafactory-construction-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00002-bb02-4000-b002-vrk000000002',
  'evb10002-bb02-4e5f-8a9b-ba77ery00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Verkor recrute 1200 ingenieurs pour sa ligne pilote et la montee en cadence',
  'Verkor a lance une campagne de recrutement de 1200 ingenieurs et techniciens specialises en electrochimie, data science, process industriel et automatisation. La start-up a ouvert un Innovation Centre a Grenoble pour la R&D sur les cellules haute performance.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/verkor-recrutement-1200-ingenieurs-batteries-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00002-bb02-4000-b002-vrk000000003',
  'evb10002-bb02-4e5f-8a9b-ba77ery00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Verkor leve 2.3 milliards EUR avec le soutien de la BEI et France 2030',
  'Verkor a boucle un tour de financement de 2.3 milliards EUR comprenant des fonds propres, un pret BEI de 600 MEUR et des subventions France 2030. Le financement securise la construction de la gigafactory de Dunkerque et la R&D sur les cellules NMC de nouvelle generation.',
  'public_funding',
  'https://www.reuters.com/business/autos/verkor-raises-2-3-billion-battery-gigafactory-2026',
  'positive', 9, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00002-bb02-4000-b002-vrk000000004',
  'evb10002-bb02-4e5f-8a9b-ba77ery00002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Verkor signe un contrat d''approvisionnement avec Renault pour 10 GWh/an',
  'Verkor a signe un accord ferme avec Renault Group pour la fourniture de 10 GWh de cellules NMC par an a partir de 2027, destinees aux modeles Megane E-Tech et Scenic E-Tech. Le contrat represente environ 2 milliards EUR sur 5 ans.',
  'major_contract',
  'https://www.usinenouvelle.com/article/verkor-renault-contrat-batteries-10gwh-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

-- ---- Saft News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00003-cc03-4000-b003-sft000000001',
  'evb10003-cc03-4e5f-8a9b-ba77ery00003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Saft inaugure sa nouvelle ligne de production de batteries lithium-ion a Bordeaux',
  'Saft a inaugure une nouvelle ligne de production de batteries lithium-ion haute energie sur son site de Bordeaux, investissement de 200 MEUR. La ligne produit des modules pour le stockage stationnaire, la defense et le ferroviaire, avec une capacite de 2 GWh/an.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/saft-bordeaux-nouvelle-ligne-lithium-ion-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00003-cc03-4000-b003-sft000000002',
  'evb10003-cc03-4e5f-8a9b-ba77ery00003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Saft recrute 800 ingenieurs pour ses programmes defense et spatial',
  'Saft a lance un plan de recrutement de 800 profils specialises (electrochimie, ingenierie systeme, tests et validation, surete) pour accompagner la croissance de ses activites defense (torpilles, sous-marins) et spatiales (satellites, lanceurs). Le recrutement cible principalement Bordeaux et Poitiers.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/industrie-lourde/saft-recrutement-800-ingenieurs-defense-spatial-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00003-cc03-4000-b003-sft000000003',
  'evb10003-cc03-4e5f-8a9b-ba77ery00003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Saft remporte le contrat BESS de 500 MWh pour RTE',
  'Saft a ete selectionne par RTE pour deployer un systeme de stockage par batterie (BESS) de 500 MWh destine a la stabilisation du reseau electrique francais. Le projet, finance par le plan France 2030, sera deploye en Hauts-de-France d''ici 2028.',
  'major_contract',
  'https://www.reuters.com/business/energy/saft-rte-battery-storage-500mwh-contract-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

-- ---- Blue Solutions News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00004-dd04-4000-b004-blu000000001',
  'evb10004-dd04-4e5f-8a9b-ba77ery00004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Blue Solutions annonce une percee sur les batteries solides nouvelle generation',
  'Blue Solutions a devoile les resultats de ses recherches sur une nouvelle generation de batteries solides a electrolyte polymere atteignant 450 Wh/kg, contre 280 Wh/kg pour la generation actuelle. La technologie sera industrialisee a Quimper d''ici 2028 avec un investissement de 300 MEUR.',
  'battery_innovation',
  'https://www.usinenouvelle.com/article/blue-solutions-batterie-solide-nouvelle-generation-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00004-dd04-4000-b004-blu000000002',
  'evb10004-dd04-4e5f-8a9b-ba77ery00004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Blue Solutions recrute 500 specialistes pour l''industrialisation de la batterie solide',
  'Blue Solutions a lance un plan de recrutement de 500 ingenieurs et techniciens (electrochimie, materiaux, process, automatisation) pour industrialiser sa batterie solide de nouvelle generation. Le recrutement cible principalement le site de Quimper en Bretagne.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/blue-solutions-recrutement-500-batterie-solide-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00004-dd04-4000-b004-blu000000003',
  'evb10004-dd04-4e5f-8a9b-ba77ery00004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Blue Solutions deploie 200 MWh de stockage stationnaire pour Enedis',
  'Blue Solutions a remporte un contrat avec Enedis pour deployer 200 MWh de batteries solides LMP dediees au stockage stationnaire et a la stabilisation des reseaux de distribution en zones insulaires (Corse, DOM-TOM). Valeur estimee a 150 MEUR.',
  'major_contract',
  'https://www.reuters.com/business/energy/blue-solutions-enedis-solid-state-storage-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Ampere News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00005-ee05-4000-b005-amp000000001',
  'evb10005-ee05-4e5f-8a9b-ba77ery00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ampere inaugure l''ElectriCity, plus grand pole de production EV en Europe',
  'Ampere a officiellement inaugure l''ElectriCity, regroupant les usines de Douai, Maubeuge et Ruitz dans les Hauts-de-France. Le pole produit la Renault 5 E-Tech, le Scenic E-Tech et le futur Twingo electrique. Capacite de 400 000 vehicules/an, objectif 1 million d''ici 2031.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/ampere-renault-electricity-inauguration-production-ev-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00005-ee05-4000-b005-amp000000002',
  'evb10005-ee05-4e5f-8a9b-ba77ery00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ampere recrute 2500 ingenieurs software et electronique embarquee',
  'Ampere a lance une campagne de recrutement de 2500 ingenieurs specialises en software-defined vehicle (SDV), electronique de puissance, IA embarquee et cybersecurite vehicule. Le recrutement cible les sites de Guyancourt, Toulouse et le Technocentre de Lardy.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/ampere-renault-recrutement-2500-ingenieurs-software-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00005-ee05-4000-b005-amp000000003',
  'evb10005-ee05-4e5f-8a9b-ba77ery00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ampere recoit 1.6 milliard EUR du plan France 2030 pour l''electrification',
  'Ampere a obtenu 1.6 milliard EUR de subventions et prets bonifies du plan France 2030 pour soutenir la transformation de l''ElectriCity et le developpement de la plateforme AmpR Small pour les vehicules electriques abordables (cible sous 25 000 EUR).',
  'public_funding',
  'https://www.reuters.com/business/autos/ampere-renault-france-2030-ev-subsidy-2026',
  'positive', 9, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00005-ee05-4000-b005-amp000000004',
  'evb10005-ee05-4e5f-8a9b-ba77ery00005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ampere et Qualcomm developpent la plateforme SDV de nouvelle generation',
  'Ampere et Qualcomm ont annonce un partenariat approfondi pour developper la plateforme Software Defined Vehicle (SDV) de nouvelle generation, integrant le Snapdragon Ride Flex SoC. Le systeme centralisera les fonctions ADAS, infotainment et gestion de l''energie sur un seul calculateur.',
  'technology_partnership',
  'https://www.usine-digitale.fr/article/ampere-qualcomm-sdv-plateforme-automobile-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Nidec PSA e-motors News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00006-ff06-4000-b006-ndc000000001',
  'evb10006-ff06-4e5f-8a9b-ba77ery00006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Nidec PSA e-motors triple sa capacite de production a Tremery',
  'Nidec PSA e-motors a annonce un investissement de 150 MEUR pour tripler la capacite de production de moteurs electriques sur son site de Tremery (Moselle), passant de 300 000 a 900 000 unites/an. L''extension creera 500 emplois directs et illustre la reconversion reussie de l''ancien site de moteurs thermiques.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/nidec-psa-emotors-tremery-extension-capacite-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00006-ff06-4000-b006-ndc000000002',
  'evb10006-ff06-4e5f-8a9b-ba77ery00006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Nidec PSA e-motors recrute 700 techniciens et ingenieurs pour la montee en cadence',
  'Nidec PSA e-motors recrute 700 postes (bobinage, assemblage, test, ingenierie process) pour accompagner le triplement de capacite a Tremery. L''entreprise a signe un partenariat avec l''Universite de Lorraine pour former des specialistes en moteurs electriques.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/nidec-psa-emotors-recrutement-700-tremery-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00006-ff06-4000-b006-ndc000000003',
  'evb10006-ff06-4e5f-8a9b-ba77ery00006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Nidec PSA e-motors developpe un moteur electrique sans aimants permanents',
  'Nidec PSA e-motors a devoile un prototype de moteur synchrone a rotor bobine eliminant les aimants permanents (et la dependance aux terres rares chinoises). Le moteur atteint 95% d''efficacite et sera integre dans les futurs modeles Stellantis a partir de 2028.',
  'battery_innovation',
  'https://www.usinenouvelle.com/article/nidec-psa-emotors-moteur-sans-aimants-permanents-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Continental France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00007-a707-4000-b007-cnt000000001',
  'evb10007-a707-4e5f-8a9b-ba77ery00007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Continental France investit 180 MEUR dans un centre de R&D BMS a Toulouse',
  'Continental a annonce un investissement de 180 MEUR pour creer un centre de R&D dedie aux systemes de gestion de batteries (BMS) et a l''electronique de puissance a Toulouse. Le centre emploiera 600 ingenieurs et ciblera les architectures 800V pour les vehicules electriques premium.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/continental-toulouse-centre-rd-bms-electronique-puissance-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00007-a707-4000-b007-cnt000000002',
  'evb10007-a707-4e5f-8a9b-ba77ery00007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Continental recrute 900 ingenieurs ADAS et electronique en France',
  'Continental France a lance un plan de recrutement de 900 ingenieurs specialises en ADAS, electronique de puissance, embedded software et cybersecurite automobile. Le recrutement cible les sites de Toulouse, Rambouillet et le nouveau centre de Bourgoin-Jallieu.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/continental-france-recrutement-900-ingenieurs-adas-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00007-a707-4000-b007-cnt000000003',
  'evb10007-a707-4e5f-8a9b-ba77ery00007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Continental se prepare au EU Battery Regulation avec une solution de tracabilite',
  'Continental a developpe une solution logicielle de tracabilite end-to-end pour les batteries EV, conforme au EU Battery Regulation. Le systeme integre des capteurs IoT, la blockchain et le passeport numerique pour tracer les materiaux critiques (cobalt, lithium, nickel) de la mine au recyclage.',
  'regulatory',
  'https://www.euractiv.com/section/batteries/continental-eu-battery-regulation-traceability-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Plastic Omnium News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00008-b808-4000-b008-pom000000001',
  'evb10008-b808-4e5f-8a9b-ba77ery00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium inaugure sa gigafactory de reservoirs hydrogene a Compiegne',
  'Plastic Omnium a inaugure la plus grande usine europeenne de reservoirs a hydrogene haute pression (Type IV, 700 bars) a Compiegne. L''investissement de 250 MEUR porte la capacite a 100 000 reservoirs/an, fournissant Stellantis, Hyundai et les bus Safra.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/plastic-omnium-compiegne-gigafactory-reservoirs-hydrogene-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00008-b808-4000-b008-pom000000002',
  'evb10008-b808-4e5f-8a9b-ba77ery00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium recrute 1500 ingenieurs hydrogene et composites',
  'Plastic Omnium a annonce le recrutement de 1500 ingenieurs et techniciens sur 2026-2028 dans les domaines de l''hydrogene (piles a combustible, reservoirs haute pression), des composites avances et de l''allegement vehicule. Les postes ciblent Compiegne, Lyon et les sites en Belgique.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/plastic-omnium-recrutement-1500-hydrogene-composites-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00008-b808-4000-b008-pom000000003',
  'evb10008-b808-4e5f-8a9b-ba77ery00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium recoit 200 MEUR de France 2030 pour l''hydrogene vert',
  'Plastic Omnium a obtenu 200 MEUR de subventions France 2030 pour accelerer l''industrialisation de ses systemes hydrogene (reservoirs, piles a combustible, electrolyseurs). Le financement soutient egalement le programme IPCEI Hy2Use pour la chaine de valeur hydrogene europeenne.',
  'public_funding',
  'https://www.reuters.com/business/autos/plastic-omnium-france-2030-hydrogen-subsidy-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00008-b808-4000-b008-pom000000004',
  'evb10008-b808-4e5f-8a9b-ba77ery00008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium fournira les systemes hydrogene des bus et camions Stellantis',
  'Plastic Omnium a signe un contrat-cadre avec Stellantis pour fournir l''ensemble des systemes hydrogene (reservoirs Type IV + pile a combustible) des utilitaires Peugeot e-Expert Hydrogen, Citroen e-Jumpy Hydrogen et des futurs camions lourds Fiat Professional.',
  'major_contract',
  'https://www.usinenouvelle.com/article/plastic-omnium-stellantis-contrat-systemes-hydrogene-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

-- ---- Faurecia Clean Mobility News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00009-c909-4000-b009-fau000000001',
  'evb10009-c909-4e5f-8a9b-ba77ery00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'FORVIA Faurecia ouvre un centre d''excellence en stockage hydrogene a Bavans',
  'FORVIA Faurecia a inaugure un centre d''excellence mondial dedie au stockage d''hydrogene embarque a Bavans (Doubs). Le site de 25 000 m2 integre R&D, prototypage et tests de reservoirs Type IV a 700 bars. Investissement de 120 MEUR, 400 ingenieurs sur site.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/forvia-faurecia-bavans-centre-excellence-hydrogene-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00009-c909-4000-b009-fau000000002',
  'evb10009-c909-4e5f-8a9b-ba77ery00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'FORVIA Faurecia recrute 2000 ingenieurs pour la mobilite hydrogene et la gestion thermique EV',
  'FORVIA Faurecia a lance un plan de recrutement de 2000 ingenieurs sur 2026-2028, ciblent les domaines du stockage d''hydrogene, de la gestion thermique des batteries EV, des materiaux composites et du digital manufacturing. Les postes sont repartis entre Nanterre, Bavans et les sites en Allemagne.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/forvia-faurecia-recrutement-2000-hydrogene-thermique-ev-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00009-c909-4000-b009-fau000000003',
  'evb10009-c909-4e5f-8a9b-ba77ery00009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'FORVIA Faurecia remporte le contrat de gestion thermique batteries pour BMW iX et i7',
  'FORVIA Faurecia a ete selectionne par BMW pour fournir les systemes de gestion thermique des batteries (refroidissement par immersion) de la prochaine generation des BMW iX et i7. Le contrat represente environ 800 MEUR sur la duree de vie du programme.',
  'major_contract',
  'https://www.reuters.com/business/autos/forvia-faurecia-bmw-battery-thermal-management-contract-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

-- ---- Valeo Siemens eAutomotive News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00010-da10-4000-b010-val000000001',
  'evb10010-da10-4e5f-8a9b-ba77ery00010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Valeo investit 300 MEUR dans une usine d''onduleurs SiC a l''Isle-d''Abeau',
  'Valeo a annonce un investissement de 300 MEUR pour construire une usine de production d''onduleurs a base de carbure de silicium (SiC) a l''Isle-d''Abeau (Isere). L''usine produira 1 million d''onduleurs 800V par an a partir de 2028 pour Stellantis, Renault et BMW.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/valeo-isle-abeau-usine-onduleurs-sic-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00010-da10-4000-b010-val000000002',
  'evb10010-da10-4e5f-8a9b-ba77ery00010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Valeo recrute 1800 ingenieurs en electronique de puissance et moteurs electriques',
  'Valeo a lance un plan de recrutement de 1800 ingenieurs specialises en electronique de puissance, conception de moteurs electriques, embedded software et integration systeme. Les postes ciblent Cergy-Pontoise, l''Isle-d''Abeau et les centres techniques en Allemagne et Chine.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/automobile/valeo-recrutement-1800-ingenieurs-electrification-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nev00010-da10-4000-b010-val000000003',
  'evb10010-da10-4e5f-8a9b-ba77ery00010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Valeo et Renault signent un accord-cadre pour l''electrification de 3 plateformes',
  'Valeo a signe un accord-cadre avec Renault Group pour fournir les moteurs electriques, onduleurs et chargeurs embarques des trois plateformes EV du constructeur (AmpR Small, AmpR Medium, AmpR Large). Le contrat represente plus de 3 milliards EUR sur 2027-2033.',
  'major_contract',
  'https://www.reuters.com/business/autos/valeo-renault-electrification-framework-agreement-2026',
  'positive', 9, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- ACC: highest scorer - gigafactory construction, massive IPCEI funding, hiring thousands
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
  'ps-acc01-aa01-4000-a001-ba77ery00001',
  'evb10001-aa01-4e5f-8a9b-ba77ery00001',
  9, 8, 7, 9,
  9, 9, 5, 7,
  8, 9, 10, 5,
  9, 10, 6, 2, 8,
  9, 7, 8, 9,
  10, 9, 7, 9, 8,
  10, 9, 7, 9,
  8, 7, 7, 9,
  6, 3, 8,
  7, 5, 5, 9, 9,
  9, 2, 8,
  8, 3, 8,
  88, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Verkor: very high - greenfield gigafactory, massive funding, startup energy
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
  'ps-vrk02-bb02-4000-a002-ba77ery00002',
  'evb10002-bb02-4e5f-8a9b-ba77ery00002',
  9, 8, 5, 9,
  9, 9, 3, 6,
  9, 10, 10, 4,
  10, 10, 7, 2, 9,
  10, 8, 9, 10,
  10, 10, 8, 10, 9,
  10, 9, 8, 9,
  9, 8, 8, 9,
  7, 3, 7,
  5, 3, 6, 9, 9,
  9, 2, 8,
  8, 2, 8,
  90, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Saft: solid - industrial battery expert, defense contracts, steady expansion
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
  'ps-sft03-cc03-4000-a003-ba77ery00003',
  'evb10003-cc03-4e5f-8a9b-ba77ery00003',
  8, 7, 7, 8,
  7, 8, 9, 8,
  7, 8, 8, 6,
  5, 7, 5, 3, 7,
  8, 6, 6, 7,
  9, 7, 5, 7, 7,
  8, 7, 6, 8,
  7, 8, 6, 7,
  4, 4, 8,
  8, 6, 5, 9, 7,
  8, 7, 9,
  8, 3, 7,
  79, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Blue Solutions: warm - solid-state pioneer, niche but growing
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
  'ps-blu04-dd04-4000-a004-ba77ery00004',
  'evb10004-dd04-4e5f-8a9b-ba77ery00004',
  8, 7, 6, 8,
  6, 7, 7, 7,
  7, 9, 7, 5,
  5, 6, 5, 3, 6,
  7, 5, 5, 6,
  9, 9, 5, 6, 6,
  7, 9, 5, 7,
  6, 5, 5, 6,
  5, 4, 6,
  6, 5, 5, 8, 6,
  8, 2, 7,
  7, 3, 6,
  75, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Ampere: hot - massive EV production ramp, SDV development, France 2030 funding
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
  'ps-amp05-ee05-4000-a005-ba77ery00005',
  'evb10005-ee05-4e5f-8a9b-ba77ery00005',
  9, 8, 8, 9,
  8, 9, 4, 7,
  8, 9, 9, 6,
  8, 9, 6, 3, 8,
  9, 7, 7, 8,
  9, 10, 7, 9, 8,
  9, 10, 8, 9,
  9, 8, 8, 9,
  7, 4, 8,
  7, 5, 6, 9, 8,
  9, 2, 7,
  8, 3, 8,
  86, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Nidec PSA e-motors: warm - capacity expansion, reconversion success
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
  'ps-ndc06-ff06-4000-a006-ba77ery00006',
  'evb10006-ff06-4e5f-8a9b-ba77ery00006',
  8, 7, 6, 8,
  7, 8, 5, 7,
  7, 8, 8, 6,
  6, 7, 5, 3, 7,
  8, 6, 6, 7,
  8, 8, 6, 7, 7,
  9, 8, 6, 8,
  7, 7, 6, 8,
  4, 5, 7,
  7, 5, 5, 8, 7,
  8, 2, 7,
  7, 3, 7,
  77, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Continental France: warm - BMS R&D center, ADAS expansion
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
  'ps-cnt07-a707-4000-a007-ba77ery00007',
  'evb10007-a707-4e5f-8a9b-ba77ery00007',
  8, 7, 8, 8,
  7, 7, 9, 8,
  6, 8, 7, 6,
  4, 5, 5, 3, 7,
  8, 6, 5, 7,
  8, 8, 6, 7, 7,
  8, 7, 6, 7,
  7, 7, 7, 7,
  5, 5, 8,
  7, 6, 6, 8, 7,
  8, 2, 7,
  7, 4, 7,
  74, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Plastic Omnium: hot - hydrogen gigafactory, France 2030, diversification
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
  'ps-pom08-b808-4000-a008-ba77ery00008',
  'evb10008-b808-4e5f-8a9b-ba77ery00008',
  9, 8, 8, 8,
  7, 8, 8, 8,
  7, 8, 9, 6,
  6, 8, 5, 3, 7,
  8, 7, 6, 7,
  8, 9, 6, 8, 7,
  9, 9, 6, 8,
  7, 7, 6, 8,
  5, 5, 8,
  7, 5, 5, 8, 8,
  9, 2, 7,
  8, 3, 8,
  80, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Faurecia Clean Mobility: hot - hydrogen storage center, BMW contract, FORVIA synergies
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
  'ps-fau09-c909-4000-a009-ba77ery00009',
  'evb10009-c909-4e5f-8a9b-ba77ery00009',
  9, 8, 8, 8,
  7, 8, 8, 8,
  7, 8, 8, 6,
  5, 7, 6, 3, 8,
  9, 7, 6, 8,
  9, 8, 6, 8, 7,
  8, 8, 7, 8,
  8, 7, 7, 8,
  6, 7, 8,
  7, 6, 5, 8, 8,
  9, 2, 7,
  9, 3, 8,
  82, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Valeo Siemens eAutomotive: hot - SiC inverter factory, Renault framework deal, power electronics leader
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
  'ps-val10-da10-4000-a010-ba77ery00010',
  'evb10010-da10-4e5f-8a9b-ba77ery00010',
  9, 8, 7, 9,
  8, 8, 7, 8,
  7, 9, 9, 6,
  5, 7, 5, 3, 8,
  9, 7, 7, 8,
  9, 9, 6, 8, 8,
  9, 9, 7, 8,
  8, 7, 7, 8,
  5, 6, 8,
  7, 5, 5, 9, 8,
  9, 2, 7,
  9, 3, 8,
  83, 'hot',
  1776520000, 1776520000, 1776520000
);
