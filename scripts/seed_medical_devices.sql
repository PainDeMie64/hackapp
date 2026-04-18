-- =============================================================================
-- SEED: 10 French Medical Device & Healthtech Companies
-- Essilor, Guerbet, Stryker France, Medtronic France, Air Liquide Medical,
-- Getinge France, Carl Zeiss France, Siemens Healthineers France,
-- GE HealthCare France, Vygon
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Essilor (EssilorLuxottica)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a01-1001-4e5f-8a9b-000000000101',
  'EssilorLuxottica',
  'essilorluxottica.com',
  'Leader mondial de l''optique ophtalmique et des verres correcteurs. Issu de la fusion Essilor-Luxottica, le groupe concoit, fabrique et distribue des verres, montures et equipements optiques. Siege historique a Charenton-le-Pont, 190 000 collaborateurs dans 150 pays.',
  'Medical Devices', 'Ophthalmic Optics & Vision Care',
  'Charenton-le-Pont', 'France', 190000, 25400000000, 2024,
  '{"erp":["SAP S/4HANA","Oracle EBS"],"plm":["PTC Windchill","Dassault ENOVIA"],"manufacturing":["Rockwell FactoryTalk","Siemens Opcenter"],"cloud":["Azure","AWS"],"ai_ml":["TensorFlow","PyTorch","Azure ML"],"crm":["Salesforce"],"data":["Snowflake","Databricks"],"iot":["Azure IoT Hub","PTC ThingWorx"]}',
  1,
  'https://www.linkedin.com/company/essilorluxottica/',
  '712049618',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 2. Guerbet
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a02-1002-4e5f-8a9b-000000000102',
  'Guerbet',
  'guerbet.com',
  'Specialiste mondial des produits de contraste et solutions pour l''imagerie medicale diagnostique et interventionnelle. Fonde en 1926, Guerbet est le seul acteur pharmaceutique 100%% dedie a l''imagerie medicale. Usines a Aulnay-sous-Bois et Lanester.',
  'Medical Devices', 'Contrast Agents & Medical Imaging',
  'Villepinte', 'France', 2600, 830000000, 2024,
  '{"erp":["SAP ECC"],"manufacturing":["Siemens Opcenter","Wonderware"],"quality":["Veeva Vault QMS","TrackWise"],"cloud":["Azure"],"ai_ml":["Python","TensorFlow"],"regulatory":["ARIS","Veeva RIM"],"data":["Power BI","SAP BW"]}',
  1,
  'https://www.linkedin.com/company/guerbet/',
  '308460036',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 3. Stryker France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a03-1003-4e5f-8a9b-000000000103',
  'Stryker France',
  'stryker.com',
  'Filiale francaise du groupe americain Stryker, leader mondial des implants orthopediques, instruments chirurgicaux, equipements de bloc operatoire et robotique chirurgicale (Mako). Presente en France depuis 1986 avec un centre de R&D a Pusignan.',
  'Medical Devices', 'Orthopedic Implants & Surgical Robotics',
  'Pusignan', 'France', 1200, 950000000, 2024,
  '{"erp":["SAP S/4HANA"],"crm":["Salesforce Health Cloud"],"quality":["Veeva Vault QMS","MasterControl"],"regulatory":["Veeva RIM"],"cloud":["AWS","Azure"],"ai_ml":["SageMaker","Azure ML"],"manufacturing":["Rockwell FactoryTalk"],"robotics":["Mako SmartRobotics platform"]}',
  1,
  'https://www.linkedin.com/company/stryker/',
  '327912464',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  65, 'warm', 1776520000
);

-- 4. Medtronic France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a04-1004-4e5f-8a9b-000000000104',
  'Medtronic France',
  'medtronic.com',
  'Filiale francaise de Medtronic, premier fabricant mondial de dispositifs medicaux. Couvre les therapies cardiaques, le diabete, la neuromodulation, la chirurgie mini-invasive et la surveillance patient. Centre de R&D et site de production a Boulogne-Billancourt.',
  'Medical Devices', 'Cardiac Devices & Neuromodulation',
  'Boulogne-Billancourt', 'France', 2500, 1800000000, 2024,
  '{"erp":["SAP S/4HANA","Oracle Cloud"],"quality":["Veeva Vault QMS","Pilgrim SmartSolve"],"regulatory":["Veeva RIM","ARIS"],"cloud":["AWS","Azure"],"ai_ml":["GIDeon AI platform","TensorFlow"],"crm":["Salesforce Health Cloud"],"iot":["Azure IoT","CareLink platform"],"cybersecurity":["Palo Alto Prisma","CrowdStrike"]}',
  1,
  'https://www.linkedin.com/company/medtronic/',
  '305092121',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  70, 'warm', 1776520000
);

-- 5. Air Liquide Medical Systems (Air Liquide Healthcare)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a05-1005-4e5f-8a9b-000000000105',
  'Air Liquide Medical Systems',
  'airliquidehealthcare.com',
  'Branche sante du groupe Air Liquide, specialisee dans les gaz medicaux, les equipements de ventilation et d''anesthesie, et les services de sante a domicile. Fabrique les ventilateurs et stations d''anesthesie a Antony. Leader en Europe de la sante a domicile.',
  'Medical Devices', 'Medical Gases & Ventilation Equipment',
  'Antony', 'France', 4500, 2200000000, 2024,
  '{"erp":["SAP S/4HANA"],"manufacturing":["Siemens Opcenter","Wonderware"],"quality":["TrackWise","Veeva Vault QMS"],"cloud":["Azure","OVHcloud"],"iot":["Azure IoT Hub","custom IoT platform"],"data":["Databricks","Power BI"],"regulatory":["Veeva RIM"],"cybersecurity":["Fortinet","Zscaler"]}',
  1,
  'https://www.linkedin.com/company/air-liquide/',
  '552096281',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  67, 'warm', 1776520000
);

-- 6. Getinge France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a06-1006-4e5f-8a9b-000000000106',
  'Getinge France',
  'getinge.com',
  'Filiale francaise du groupe suedois Getinge, fournisseur de solutions pour les blocs operatoires, les soins intensifs et la sterilisation hospitaliere. Propose des systemes de perfusion cardiaque, tables chirurgicales, autoclaves et systemes de flux d''air.',
  'Medical Devices', 'Surgical Workflow & Sterilization',
  'Ardon', 'France', 800, 420000000, 2024,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"quality":["Windchill Quality","TrackWise"],"regulatory":["ARIS","MedTech regulatory suite"],"cloud":["Azure"],"manufacturing":["Rockwell FactoryTalk"],"crm":["Salesforce"],"data":["Power BI","Qlik"]}',
  1,
  'https://www.linkedin.com/company/getinge/',
  '572197936',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  60, 'warm', 1776520000
);

-- 7. Carl Zeiss Meditec France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a07-1007-4e5f-8a9b-000000000107',
  'Carl Zeiss Meditec France',
  'zeiss.com',
  'Division medicale de Carl Zeiss en France, specialisee dans les systemes d''imagerie ophtalmique, les microscopes chirurgicaux, la chirurgie refractive (VisuMax) et les solutions de visualisation intra-operatoire. Leader en microscopie medicale de precision.',
  'Medical Devices', 'Ophthalmic & Surgical Microscopy',
  'Marly-le-Roi', 'France', 600, 380000000, 2024,
  '{"erp":["SAP S/4HANA"],"quality":["Veeva Vault QMS"],"regulatory":["Veeva RIM","Aris"],"cloud":["Azure","AWS"],"ai_ml":["TensorFlow","ONNX Runtime"],"imaging":["proprietary ZEISS ZEN platform"],"manufacturing":["Siemens Opcenter"],"data":["Power BI","Azure Synapse"]}',
  1,
  'https://www.linkedin.com/company/zeiss/',
  '722008189',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  63, 'warm', 1776520000
);

-- 8. Siemens Healthineers France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a08-1008-4e5f-8a9b-000000000108',
  'Siemens Healthineers France',
  'siemens-healthineers.com',
  'Filiale francaise de Siemens Healthineers, leader mondial de l''imagerie medicale diagnostique (IRM, scanner, echographie, radiographie), du diagnostic in vitro et de la radiotherapie (Varian). Centre d''excellence en IA appliquee au diagnostic a Saint-Denis.',
  'Medical Devices', 'Medical Imaging & Diagnostics',
  'Saint-Denis', 'France', 2200, 1500000000, 2024,
  '{"erp":["SAP S/4HANA"],"ai_ml":["AI-Rad Companion","TensorFlow","PyTorch"],"cloud":["AWS","Azure","teamplay digital health platform"],"quality":["Veeva Vault QMS","Teamcenter Quality"],"regulatory":["Veeva RIM"],"imaging":["syngo.via","AI-Pathway Companion"],"cybersecurity":["Palo Alto","CrowdStrike"],"data":["Snowflake","Databricks"]}',
  1,
  'https://www.linkedin.com/company/siemens-healthineers/',
  '348863229',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  73, 'warm', 1776520000
);

-- 9. GE HealthCare France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a09-1009-4e5f-8a9b-000000000109',
  'GE HealthCare France',
  'gehealthcare.com',
  'Filiale francaise de GE HealthCare, fabricant majeur de systemes d''imagerie medicale (IRM, scanner, echographie, mammographie), de monitoring patient et de solutions pharmaceutiques diagnostiques. Site de production d''echographes a Buc (Yvelines).',
  'Medical Devices', 'Medical Imaging & Patient Monitoring',
  'Buc', 'France', 3000, 1900000000, 2024,
  '{"erp":["Oracle Cloud ERP"],"ai_ml":["Edison AI platform","TensorFlow","AWS SageMaker"],"cloud":["AWS","GCP"],"quality":["Veeva Vault QMS","Pilgrim SmartSolve"],"regulatory":["Veeva RIM"],"manufacturing":["GE Proficy","Rockwell FactoryTalk"],"iot":["Predix","AWS IoT"],"data":["Databricks","Snowflake"]}',
  1,
  'https://www.linkedin.com/company/gehealthcare/',
  '315410101',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  75, 'warm', 1776520000
);

-- 10. Vygon
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'med10a10-1010-4e5f-8a9b-000000000110',
  'Vygon',
  'vygon.com',
  'Fabricant francais de dispositifs medicaux a usage unique pour la neonatalogie, la perfusion intraveineuse, l''oncologie et la chirurgie. Entreprise familiale fondee en 1962 a Ecouen, avec 5 usines en France et une presence dans 120 pays. Leader en catheters neonatals.',
  'Medical Devices', 'Single-Use Medical Devices & IV Therapy',
  'Ecouen', 'France', 2400, 380000000, 2024,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"manufacturing":["Wonderware","Siemens Opcenter"],"quality":["TrackWise","Veeva Vault QMS"],"regulatory":["ARIS","Veeva RIM"],"cloud":["Azure"],"cad":["SolidWorks","CATIA"],"data":["Power BI"],"cybersecurity":["Fortinet","Stormshield"]}',
  1,
  'https://www.linkedin.com/company/vygon/',
  '335080445',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- EssilorLuxottica News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0101-aa01-4000-b101-ess000000001',
  'med10a01-1001-4e5f-8a9b-000000000101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EssilorLuxottica obtient le marquage CE MDR pour sa gamme Stellest de verres freination myopique',
  'EssilorLuxottica a obtenu la certification MDR (Medical Device Regulation EU 2017/745) pour sa gamme de verres Stellest, utilises dans le controle de la progression de la myopie chez l''enfant. La conformite MDR Classe IIa remplace l''ancien marquage MDD et ouvre la voie a la commercialisation dans les 27 pays de l''UE.',
  'regulatory_compliance',
  'https://www.devicesthis.com/essilorluxottica-mdr-stellest-myopia-ce-mark-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0101-aa01-4000-b101-ess000000002',
  'med10a01-1001-4e5f-8a9b-000000000101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EssilorLuxottica investit 500 M EUR dans une mega-usine de verres connectes en France',
  'Le groupe a annonce la construction d''une usine de 45 000 m2 a Ligny-en-Barrois (Meuse) dediee a la production de verres ophtalmiques connectes et de la prochaine generation de smart glasses. L''investissement de 500 millions EUR creera 800 emplois directs d''ici 2029.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/essilorluxottica-mega-usine-verres-connectes-ligny-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0101-aa01-4000-b101-ess000000003',
  'med10a01-1001-4e5f-8a9b-000000000101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EssilorLuxottica deploie l''IA pour le diagnostic automatise de la retinopathie diabetique',
  'Essilor a lance un programme pilote avec 200 opticiens en France utilisant un retinographe portable equipe d''un algorithme d''IA de Classe IIa MDR pour le depistage de la retinopathie diabetique. L''outil detecte les micro-anevrismes et exsudats avec une sensibilite de 96%%.',
  'ai_diagnostics',
  'https://www.ticpharma.com/essilorluxottica-ia-retinopathie-diabetique-depistage-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0101-aa01-4000-b101-ess000000004',
  'med10a01-1001-4e5f-8a9b-000000000101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EssilorLuxottica accelere la mise en conformite IVDR de ses dispositifs de mesure oculaire',
  'Le groupe a annonce un investissement de 120 millions EUR pour mettre l''ensemble de ses autorefractometres et biometre optiques en conformite avec le reglement IVDR (EU 2017/746) avant la date limite de mai 2027. Le programme mobilise 300 ingenieurs qualite et affaires reglementaires.',
  'regulatory_compliance',
  'https://www.medtecheurope.org/news/essilorluxottica-ivdr-compliance-ophthalmic-devices-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- Guerbet News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0202-bb02-4000-b202-gue000000001',
  'med10a02-1002-4e5f-8a9b-000000000102',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Guerbet obtient le marquage CE MDR pour son agent de contraste IRM macrocyclique Elucirem',
  'Guerbet a recu la certification MDR Classe III pour Elucirem (gadopiclenol), premier agent de contraste IRM macrocyclique a demi-dose. La transition depuis le cadre MDD a necessite 18 mois de travail reglementaire et la constitution d''un dossier de 12 000 pages aupres de l''organisme notifie BSI.',
  'regulatory_compliance',
  'https://www.guerbet.com/media/press-releases/elucirem-mdr-ce-mark-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0202-bb02-4000-b202-gue000000002',
  'med10a02-1002-4e5f-8a9b-000000000102',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Guerbet inaugure l''extension de son usine de Lanester dediee aux produits de contraste nouvelle generation',
  'Guerbet a inaugure l''extension de 8 000 m2 de son site de production de Lanester (Morbihan), portant la capacite a 40 millions de doses par an. L''investissement de 130 millions EUR integre des lignes automatisees de remplissage sterile et un systeme de serialisation UDI conforme MDR.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/guerbet-extension-usine-lanester-contraste-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0202-bb02-4000-b202-gue000000003',
  'med10a02-1002-4e5f-8a9b-000000000102',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Guerbet lance un logiciel d''IA pour l''optimisation des protocoles d''injection en imagerie',
  'Guerbet a lance Dose&Scan AI, un logiciel medical de Classe IIa (MDR) utilisant l''intelligence artificielle pour optimiser les protocoles d''injection de produits de contraste en fonction du poids du patient, de la fonction renale et du type d''examen. Deploiement prevu dans 500 hopitaux europeens.',
  'ai_diagnostics',
  'https://www.ticpharma.com/guerbet-ia-optimisation-injection-contraste-dose-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Stryker France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0303-cc03-4000-b303-str000000001',
  'med10a03-1003-4e5f-8a9b-000000000103',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Stryker France recertifie l''integralite de sa gamme Mako robotique sous le reglement MDR',
  'Stryker a obtenu la certification MDR Classe IIb pour le systeme de chirurgie robotisee Mako SmartRobotics, incluant les modules hanche, genou total et genou partiel. La recertification aupres du TUV SUD a necessite la soumission d''un dossier technique de 25 000 pages et 14 mois de revue.',
  'regulatory_compliance',
  'https://www.stryker.com/eu/en/about/news/mako-mdr-certification-2026.html',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0303-cc03-4000-b303-str000000002',
  'med10a03-1003-4e5f-8a9b-000000000103',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Stryker agrandit son centre de R&D de Pusignan pour la robotique chirurgicale',
  'Stryker a annonce un investissement de 80 millions EUR pour doubler la surface de son centre de R&D de Pusignan (Rhone), dedie au developpement de la prochaine generation de robots chirurgicaux et de systemes de navigation intra-operatoire. 200 postes d''ingenieurs seront crees.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/stryker-expansion-rd-pusignan-robotique-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0303-cc03-4000-b303-str000000003',
  'med10a03-1003-4e5f-8a9b-000000000103',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Stryker deploie un systeme d''IA de planification pre-operatoire pour la chirurgie de la hanche',
  'Stryker France a lance Blueprint AI, un logiciel de Classe IIa utilisant le deep learning pour la planification 3D pre-operatoire des protheses de hanche. Le systeme analyse les scanners CT et propose automatiquement la taille et le positionnement optimal de l''implant avec une precision de 98%%.',
  'ai_diagnostics',
  'https://www.devicemed.fr/stryker-blueprint-ai-planification-hanche-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Medtronic France News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0404-dd04-4000-b404-med000000001',
  'med10a04-1004-4e5f-8a9b-000000000104',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Medtronic France acheve la transition MDR de 120 dispositifs cardiaques implantables',
  'Medtronic a confirme la recertification sous MDR Classe III de l''ensemble de son portefeuille de dispositifs cardiaques implantables actifs (pacemakers, defibrillateurs, CRT) aupres de l''organisme notifie DEKRA. Le programme a mobilise 500 specialistes reglementaires sur 24 mois.',
  'regulatory_compliance',
  'https://www.medtronic.com/eu/en/about/news/mdr-cardiac-devices-transition-2026.html',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0404-dd04-4000-b404-med000000002',
  'med10a04-1004-4e5f-8a9b-000000000104',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Medtronic France ouvre un centre d''innovation a Boulogne-Billancourt dedie a la chirurgie assistee par IA',
  'Medtronic a inaugure un centre d''innovation de 5 000 m2 a Boulogne-Billancourt, equipe de blocs operatoires de simulation et d''un laboratoire d''IA. Le centre developpera des algorithmes de vision par ordinateur pour la chirurgie mini-invasive, en partenariat avec l''AP-HP et l''INRIA.',
  'factory_expansion',
  'https://www.usine-digitale.fr/article/medtronic-centre-innovation-boulogne-ia-chirurgie-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0404-dd04-4000-b404-med000000003',
  'med10a04-1004-4e5f-8a9b-000000000104',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Medtronic lance GI Genius Module 2.0, IA de detection des polypes colorectaux en temps reel',
  'Medtronic France a obtenu le marquage CE MDR Classe IIa pour GI Genius Module 2.0, un systeme d''intelligence artificielle de 2e generation qui detecte en temps reel les polypes colorectaux lors des coloscopies. La sensibilite de detection atteint 99,7%% avec un taux de faux positifs reduit de 40%%.',
  'ai_diagnostics',
  'https://www.ticpharma.com/medtronic-gi-genius-2-ia-polypes-coloscopie-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0404-dd04-4000-b404-med000000004',
  'med10a04-1004-4e5f-8a9b-000000000104',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Medtronic investit dans la cybersecurite de ses dispositifs connectes face aux exigences MDR Annexe I',
  'Medtronic a annonce un programme de 200 millions EUR sur 3 ans pour renforcer la cybersecurite de ses dispositifs medicaux connectes, en conformite avec les exigences de securite informatique de l''Annexe I du reglement MDR et la norme IEC 81001-5-1. Le programme couvre les pacemakers connectes, pompes a insuline et systemes de monitoring.',
  'regulatory_compliance',
  'https://www.devicemed.fr/medtronic-cybersecurite-dispositifs-connectes-mdr-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- Air Liquide Medical Systems News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0505-ee05-4000-b505-alm000000001',
  'med10a05-1005-4e5f-8a9b-000000000105',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide Medical obtient le marquage CE MDR pour sa gamme de ventilateurs Monnal',
  'Air Liquide Medical Systems a obtenu la certification MDR Classe IIb pour l''integralite de sa gamme de ventilateurs Monnal (T75, T60) utilises en reanimation et anesthesie. La conformite MDR inclut les nouvelles exigences de vigilance post-marche renforcee (PMCF) et d''evaluation clinique.',
  'regulatory_compliance',
  'https://www.airliquidehealthcare.com/news/monnal-ventilators-mdr-certification-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0505-ee05-4000-b505-alm000000002',
  'med10a05-1005-4e5f-8a9b-000000000105',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide Medical agrandit son site de production d''Antony pour les equipements de ventilation',
  'Air Liquide Medical Systems a demarre la construction d''une extension de 12 000 m2 sur son site d''Antony (Hauts-de-Seine) pour augmenter de 60%% sa capacite de production de ventilateurs et stations d''anesthesie. L''investissement de 95 millions EUR integre une salle blanche ISO 7 et des lignes d''assemblage robotisees.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/air-liquide-medical-extension-antony-ventilateurs-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0505-ee05-4000-b505-alm000000003',
  'med10a05-1005-4e5f-8a9b-000000000105',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide Medical lance un algorithme d''IA de sevrage ventilatoire integre a ses ventilateurs',
  'Air Liquide Medical Systems a lance WeamAI, un module logiciel de Classe IIa (MDR) integre aux ventilateurs Monnal T75 qui utilise le machine learning pour predire le moment optimal de sevrage ventilatoire en reanimation. L''algorithme analyse 15 parametres physiologiques en continu.',
  'ai_diagnostics',
  'https://www.ticpharma.com/air-liquide-medical-ia-sevrage-ventilatoire-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Getinge France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0606-ff06-4000-b606-get000000001',
  'med10a06-1006-4e5f-8a9b-000000000106',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Getinge France acheve la recertification MDR de ses systemes de perfusion cardiopulmonaire',
  'Getinge a obtenu la certification MDR Classe III pour ses systemes de perfusion cardiopulmonaire (Cardiohelp, HL 40) et ses oxygenateurs aupres de l''organisme notifie TUV Rheinland. La transition MDR a necessite la mise a jour de 45 dossiers techniques et la realisation de 12 evaluations cliniques supplementaires.',
  'regulatory_compliance',
  'https://www.getinge.com/int/media-resources/news/mdr-cardiac-perfusion-certification-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0606-ff06-4000-b606-get000000002',
  'med10a06-1006-4e5f-8a9b-000000000106',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Getinge investit 40 M EUR dans une nouvelle ligne de production d''autoclaves a Ardon',
  'Getinge France a lance la construction d''une nouvelle ligne de production d''autoclaves et d''equipements de sterilisation sur son site d''Ardon (Loiret). L''investissement de 40 millions EUR doublera la capacite de production pour repondre a la demande hospitaliere post-pandemie.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/getinge-nouvelle-ligne-autoclaves-ardon-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0606-ff06-4000-b606-get000000003',
  'med10a06-1006-4e5f-8a9b-000000000106',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Getinge deploie un systeme d''IA predictive pour le monitoring hemodynamique en soins intensifs',
  'Getinge a lance HemoSight AI, un logiciel medical de Classe IIa (MDR) qui utilise des algorithmes de machine learning pour predire les episodes d''instabilite hemodynamique 30 minutes avant leur survenue en reanimation. Le systeme s''integre aux moniteurs Getinge existants.',
  'ai_diagnostics',
  'https://www.devicemed.fr/getinge-ia-predictive-hemodynamique-soins-intensifs-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Carl Zeiss Meditec France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0707-0707-4000-b707-zei000000001',
  'med10a07-1007-4e5f-8a9b-000000000107',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Carl Zeiss Meditec obtient la certification MDR pour le laser femtoseconde VisuMax 800',
  'Carl Zeiss Meditec a obtenu le marquage CE sous MDR Classe IIb pour le laser femtoseconde VisuMax 800, utilise en chirurgie refractive SMILE pro. La certification aupres de l''organisme notifie DEKRA couvre egalement le logiciel de planification integre en tant que SaMD (Software as a Medical Device).',
  'regulatory_compliance',
  'https://www.zeiss.com/meditec/news/visumax-800-mdr-certification-2026.html',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0707-0707-4000-b707-zei000000002',
  'med10a07-1007-4e5f-8a9b-000000000107',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Carl Zeiss Meditec agrandit son centre de service et de formation a Marly-le-Roi',
  'Zeiss Meditec France a demarre les travaux d''extension de son centre de service et de formation de Marly-le-Roi (Yvelines). L''investissement de 25 millions EUR ajoutera 3 000 m2 de laboratoires de calibration et de salles de formation pour les ophtalmologistes et chirurgiens.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/carl-zeiss-meditec-extension-marly-le-roi-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0707-0707-4000-b707-zei000000003',
  'med10a07-1007-4e5f-8a9b-000000000107',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Carl Zeiss Meditec lance un OCT avec IA embarquee pour le diagnostic precoce du glaucome',
  'Zeiss Meditec a lance le CIRRUS 6000 AI, un tomographe a coherence optique (OCT) equipe d''un module d''IA de Classe IIa (MDR) pour le depistage automatise du glaucome. L''algorithme analyse les fibres nerveuses retiniennes et predit le risque de progression a 5 ans avec une specificite de 94%%.',
  'ai_diagnostics',
  'https://www.ticpharma.com/zeiss-oct-ia-glaucome-diagnostic-precoce-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);


-- ---- Siemens Healthineers France News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0808-0808-4000-b808-sie000000001',
  'med10a08-1008-4e5f-8a9b-000000000108',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens Healthineers France recertifie 85 dispositifs d''imagerie sous le reglement MDR',
  'Siemens Healthineers a acheve la transition MDR pour 85 references de dispositifs d''imagerie medicale (IRM MAGNETOM, scanners SOMATOM, echographes ACUSON) commercialises en France. Le programme de recertification a coute 350 millions EUR au niveau groupe et mobilise 1 200 specialistes reglementaires.',
  'regulatory_compliance',
  'https://www.siemens-healthineers.com/press/mdr-transition-imaging-devices-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0808-0808-4000-b808-sie000000002',
  'med10a08-1008-4e5f-8a9b-000000000108',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens Healthineers investit 150 M EUR dans son centre d''IA de Saint-Denis',
  'Siemens Healthineers a annonce un investissement de 150 millions EUR pour agrandir son centre d''excellence en IA medicale de Saint-Denis (Seine-Saint-Denis). Le centre passera de 200 a 500 chercheurs et developpera la prochaine generation de l''AI-Rad Companion pour la radiologie automatisee.',
  'factory_expansion',
  'https://www.usine-digitale.fr/article/siemens-healthineers-centre-ia-saint-denis-expansion-2026',
  'positive', 9, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0808-0808-4000-b808-sie000000003',
  'med10a08-1008-4e5f-8a9b-000000000108',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens Healthineers lance AI-Pathway Companion pour le parcours de soins oncologiques',
  'Siemens Healthineers France a lance AI-Pathway Companion Oncology, un logiciel de Classe IIa (MDR) qui utilise l''IA pour integrer les donnees d''imagerie, de pathologie et de genomique afin de proposer un parcours de soins personnalise aux oncologues. Deploiement pilote dans 30 CHU francais.',
  'ai_diagnostics',
  'https://www.ticpharma.com/siemens-healthineers-ai-pathway-companion-oncologie-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0808-0808-4000-b808-sie000000004',
  'med10a08-1008-4e5f-8a9b-000000000108',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens Healthineers met en conformite IVDR ses 200 references de diagnostics in vitro',
  'Siemens Healthineers a entame la transition IVDR (EU 2017/746) de l''ensemble de son portefeuille de diagnostics in vitro Atellica, incluant les analyseurs de chimie clinique, d''immunoanalyse et d''hemostase. Le programme represente un investissement de 400 millions EUR sur 3 ans au niveau groupe.',
  'regulatory_compliance',
  'https://www.medtecheurope.org/news/siemens-healthineers-ivdr-transition-diagnostics-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);


-- ---- GE HealthCare France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0909-0909-4000-b909-geh000000001',
  'med10a09-1009-4e5f-8a9b-000000000109',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE HealthCare France acheve la recertification MDR de ses systemes d''imagerie et de monitoring',
  'GE HealthCare a obtenu la certification MDR pour l''integralite de ses gammes d''imagerie (Revolution CT, SIGNA IRM, Voluson echographie) et de monitoring patient (CARESCAPE) vendues en France. La transition a represente 280 millions USD d''investissement au niveau mondial.',
  'regulatory_compliance',
  'https://www.gehealthcare.com/about/newsroom/mdr-recertification-imaging-monitoring-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0909-0909-4000-b909-geh000000002',
  'med10a09-1009-4e5f-8a9b-000000000109',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE HealthCare modernise son usine d''echographes de Buc avec 120 M EUR d''investissement',
  'GE HealthCare a demarre la modernisation de son site de production d''echographes de Buc (Yvelines) avec un investissement de 120 millions EUR. Le projet inclut une nouvelle salle blanche, des lignes d''assemblage Industry 4.0 avec jumeaux numeriques et un laboratoire d''acoustique avance.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/ge-healthcare-modernisation-usine-buc-echographes-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed0909-0909-4000-b909-geh000000003',
  'med10a09-1009-4e5f-8a9b-000000000109',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE HealthCare lance CareIntellect AI, plateforme d''IA pour le diagnostic radiologique automatise',
  'GE HealthCare France a lance CareIntellect, une plateforme d''IA de Classe IIa (MDR) basee sur la plateforme Edison qui automatise la detection de pathologies sur radiographies thoraciques, mammographies et scanners cerebraux. Deploiement dans 100 hopitaux francais en partenariat avec l''AP-HP.',
  'ai_diagnostics',
  'https://www.ticpharma.com/ge-healthcare-careintellect-ia-diagnostic-radiologique-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);


-- ---- Vygon News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed1010-1010-4000-b010-vyg000000001',
  'med10a10-1010-4e5f-8a9b-000000000110',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Vygon obtient le marquage CE MDR pour sa gamme complete de catheters neonatals',
  'Vygon a acheve la certification MDR Classe IIa/IIb de l''ensemble de sa gamme de catheters neonatals (Premicath, Nutricath, Seldiflex) aupres du GMED. La transition a necessite la mise a jour de 85 dossiers techniques et la realisation de 20 evaluations cliniques selon les guidelines MEDDEV 2.7/1 rev.4.',
  'regulatory_compliance',
  'https://www.vygon.com/news/mdr-neonatal-catheters-full-certification-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed1010-1010-4000-b010-vyg000000002',
  'med10a10-1010-4e5f-8a9b-000000000110',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Vygon inaugure une nouvelle usine de 20 000 m2 a Ecouen dediee aux dispositifs steriles',
  'Vygon a inaugure sa 6e usine sur le site d''Ecouen (Val-d''Oise), un batiment de 20 000 m2 dedie a la production de dispositifs steriles a usage unique pour la perfusion et l''oncologie. L''investissement de 75 millions EUR integre des salles blanches ISO 5 et un systeme de tracabilite UDI conforme MDR.',
  'factory_expansion',
  'https://www.usinenouvelle.com/article/vygon-nouvelle-usine-ecouen-dispositifs-steriles-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nmed1010-1010-4000-b010-vyg000000003',
  'med10a10-1010-4e5f-8a9b-000000000110',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Vygon developpe un catheter connecte avec IA de detection precoce des infections de ligne',
  'Vygon a lance un programme de R&D pour un catheter intraveineux central connecte equipe de capteurs integres et d''un algorithme d''IA qui detecte les signes precoces d''infection de ligne (CLABSI) 12 heures avant les symptomes cliniques. Le prototype vise une classification MDR Classe IIb.',
  'ai_diagnostics',
  'https://www.devicemed.fr/vygon-catheter-connecte-ia-detection-infections-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- EssilorLuxottica: large optics leader, MDR transition, factory expansion, AI diagnostics
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
  'ps-ess01-1001-4000-c101-000000000101',
  'med10a01-1001-4e5f-8a9b-000000000101',
  8, 7, 9, 8,
  7, 7, 9, 8,
  6, 7, 8, 6,
  3, 5, 5, 3, 7,
  7, 5, 4, 6,
  7, 7, 4, 6, 7,
  8, 8, 6, 7,
  7, 7, 6, 7,
  4, 6, 8,
  6, 5, 4, 7, 6,
  85, 2, 80,
  7, 2, 7,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Guerbet: contrast agent specialist, heavy MDR/regulatory burden, factory expansion
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
  'ps-gue02-1002-4000-c202-000000000102',
  'med10a02-1002-4e5f-8a9b-000000000102',
  9, 8, 5, 7,
  8, 8, 8, 6,
  7, 8, 8, 5,
  3, 6, 6, 3, 6,
  6, 5, 5, 6,
  8, 7, 4, 5, 5,
  8, 8, 5, 7,
  6, 7, 5, 5,
  4, 3, 7,
  7, 6, 5, 8, 5,
  85, 2, 80,
  6, 2, 7,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Stryker France: surgical robotics, MDR recertification, R&D expansion
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
  'ps-str03-1003-4000-c303-000000000103',
  'med10a03-1003-4e5f-8a9b-000000000103',
  8, 7, 5, 7,
  6, 6, 8, 7,
  6, 7, 7, 5,
  3, 4, 4, 2, 7,
  6, 5, 4, 5,
  7, 7, 4, 5, 6,
  7, 7, 5, 6,
  6, 6, 5, 5,
  3, 5, 7,
  5, 4, 4, 7, 5,
  85, 2, 80,
  5, 2, 6,
  65, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Medtronic France: largest medtech, cardiac MDR, AI, cybersecurity
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
  'ps-mdt04-1004-4000-c404-000000000104',
  'med10a04-1004-4e5f-8a9b-000000000104',
  9, 8, 7, 8,
  7, 7, 9, 7,
  6, 7, 7, 6,
  3, 5, 5, 3, 7,
  7, 6, 5, 6,
  8, 8, 5, 6, 7,
  7, 8, 6, 7,
  7, 6, 6, 6,
  4, 5, 8,
  6, 5, 6, 8, 7,
  85, 2, 80,
  6, 3, 7,
  70, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Air Liquide Medical Systems: ventilators, MDR compliance, factory expansion
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
  'ps-alm05-1005-4000-c505-000000000105',
  'med10a05-1005-4e5f-8a9b-000000000105',
  8, 7, 6, 7,
  7, 7, 9, 7,
  5, 6, 7, 6,
  3, 5, 4, 2, 6,
  6, 5, 4, 5,
  6, 6, 4, 5, 5,
  7, 7, 5, 6,
  6, 6, 5, 6,
  3, 4, 7,
  6, 5, 5, 7, 6,
  85, 2, 80,
  5, 2, 6,
  67, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Getinge France: surgical workflow, sterilization, MDR Classe III
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
  'ps-get06-1006-4000-c606-000000000106',
  'med10a06-1006-4e5f-8a9b-000000000106',
  7, 7, 4, 5,
  6, 6, 8, 6,
  5, 5, 6, 5,
  3, 4, 5, 2, 5,
  5, 4, 4, 5,
  5, 5, 3, 4, 4,
  6, 6, 5, 5,
  5, 6, 4, 4,
  3, 3, 6,
  6, 5, 4, 6, 4,
  85, 2, 80,
  4, 2, 5,
  60, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Carl Zeiss Meditec France: ophthalmic specialist, MDR, AI OCT
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
  'ps-zei07-1007-4000-c707-000000000107',
  'med10a07-1007-4e5f-8a9b-000000000107',
  8, 7, 4, 6,
  6, 6, 8, 6,
  5, 6, 6, 5,
  3, 4, 4, 2, 5,
  5, 4, 4, 5,
  7, 7, 3, 4, 5,
  6, 7, 5, 6,
  6, 5, 5, 5,
  3, 3, 6,
  5, 4, 4, 7, 5,
  85, 2, 80,
  5, 2, 6,
  63, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Siemens Healthineers France: imaging leader, massive MDR/IVDR program, AI hub
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
  'ps-sie08-1008-4000-c808-000000000108',
  'med10a08-1008-4e5f-8a9b-000000000108',
  9, 8, 7, 8,
  7, 7, 9, 7,
  7, 8, 7, 6,
  3, 5, 5, 3, 7,
  7, 6, 5, 6,
  8, 8, 4, 6, 7,
  8, 8, 6, 7,
  8, 7, 7, 7,
  4, 5, 8,
  6, 5, 5, 8, 6,
  85, 2, 80,
  6, 2, 7,
  73, 'warm',
  1776520000, 1776520000, 1776520000
);

-- GE HealthCare France: imaging + monitoring, MDR transition, factory modernization
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
  'ps-geh09-1009-4000-c909-000000000109',
  'med10a09-1009-4e5f-8a9b-000000000109',
  9, 8, 7, 8,
  7, 7, 9, 7,
  7, 8, 8, 6,
  3, 5, 5, 3, 7,
  7, 6, 5, 6,
  8, 8, 5, 6, 7,
  8, 8, 7, 7,
  8, 6, 7, 7,
  4, 5, 8,
  6, 5, 5, 8, 7,
  85, 2, 80,
  6, 2, 7,
  75, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Vygon: French family company, single-use devices, MDR transition, neonatal specialist
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
  'ps-vyg10-1010-4000-c010-000000000110',
  'med10a10-1010-4e5f-8a9b-000000000110',
  8, 7, 5, 5,
  8, 7, 8, 5,
  5, 5, 6, 5,
  3, 5, 5, 2, 5,
  5, 4, 4, 5,
  5, 4, 3, 4, 4,
  7, 6, 5, 5,
  5, 6, 4, 4,
  3, 2, 5,
  6, 5, 5, 6, 4,
  85, 2, 80,
  4, 2, 5,
  58, 'warm',
  1776520000, 1776520000, 1776520000
);
