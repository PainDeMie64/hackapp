-- =============================================================================
-- SEED: 10 French Water/Environment/Waste Companies
-- Veolia, Suez, Saur, Seche Environnement, Paprec, Derichebourg Environnement,
-- Toxfree (Veolia subsidiary), SIAAP, Agence de l'eau Loire-Bretagne,
-- Inova (Suez subsidiary)
-- Timestamp: 1776520000 (all created_at/updated_at)
-- Sector: Water/Environment
-- prospect_score: 45-65 range
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Veolia
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1001-4f6a-9b0c-100000000001',
  'Veolia',
  'veolia.com',
  'Leader mondial des services a l''environnement: gestion de l''eau, des dechets et de l''energie. Present dans 58 pays, Veolia dessert 111 millions d''habitants en eau potable et 97 millions en assainissement. Premier operateur mondial de traitement des dechets.',
  'Water/Environment', 'Water & Waste Management',
  'Paris', 'France', 220000, 45350000000, 2024,
  '{"scada":["Schneider EcoStruxure","Siemens WinCC OA"],"erp":["SAP S/4HANA","Oracle ERP Cloud"],"iot":["Hubgrade","Azure IoT Hub","LoRaWAN"],"data":["Databricks","Power BI","Snowflake"],"gis":["Esri ArcGIS","QGIS"],"cloud":["Azure","AWS"],"cybersecurity":["Fortinet","Palo Alto"],"smart_water":["Hubgrade Performance","Aquadvanced"]}',
  1,
  'https://www.linkedin.com/company/veolia/',
  '403210032',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  62, 'warm', 1776520000
);

-- 2. Suez
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1002-4f6a-9b0c-100000000002',
  'Suez',
  'suez.com',
  'Operateur majeur de la gestion de l''eau et des dechets en France et a l''international. Apres la scission avec Veolia, Suez se concentre sur l''eau municipale en France, le recyclage avance et les solutions digitales pour la gestion des ressources.',
  'Water/Environment', 'Water & Recycling',
  'Paris', 'France', 40000, 8900000000, 2024,
  '{"scada":["Schneider ClearSCADA","ABB Ability"],"erp":["SAP ECC","S/4HANA migration"],"iot":["ON''connect","Sensus FlexNet","NB-IoT"],"data":["Dataiku","Tableau","Azure Synapse"],"gis":["Esri ArcGIS Enterprise"],"cloud":["Azure","OVHcloud"],"smart_water":["ON''connect meters","Aquadvanced leakage"],"ai_ml":["Azure ML","TensorFlow"]}',
  1,
  'https://www.linkedin.com/company/suez/',
  '901012345',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'warm', 1776520000
);

-- 3. Saur
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1003-4f6a-9b0c-100000000003',
  'Saur',
  'saur.com',
  'Troisieme operateur francais de l''eau, Saur gere l''alimentation en eau potable et l''assainissement pour 7 millions d''habitants via 7200 contrats de delegation. Specialise dans les territoires ruraux et semi-urbains avec un focus sur l''innovation digitale.',
  'Water/Environment', 'Water Services',
  'Issy-les-Moulineaux', 'France', 12000, 2100000000, 2024,
  '{"scada":["Topkapi","Schneider EcoStruxure"],"erp":["SAP ECC"],"iot":["Saur Diag","LoRaWAN","Sigfox"],"gis":["Esri ArcGIS"],"cloud":["Azure"],"smart_water":["Saur Diag platform","smart meters"],"data":["Power BI","Python analytics"],"cybersecurity":["Stormshield","Fortinet"]}',
  1,
  'https://www.linkedin.com/company/saur/',
  '339379984',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  55, 'warm', 1776520000
);

-- 4. Seche Environnement
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1004-4f6a-9b0c-100000000004',
  'Seche Environnement',
  'groupe-seche.com',
  'Specialiste francais du traitement et de la valorisation des dechets dangereux et non dangereux. Seche Environnement exploite 120 sites industriels en France et a l''international, couvrant l''incineration, le stockage, la depollution des sols et le traitement des eaux industrielles.',
  'Water/Environment', 'Hazardous Waste Treatment',
  'Change', 'France', 6200, 1050000000, 2024,
  '{"scada":["Siemens WinCC","Schneider Foxboro"],"erp":["SAP Business One","Sage X3"],"iot":["Siemens MindSphere","capteurs in-situ"],"data":["Power BI","QGIS"],"cloud":["OVHcloud","Azure"],"process_control":["DCS Honeywell","PLC Siemens S7"],"cybersecurity":["Stormshield","ANSSI-qualified"]}',
  1,
  'https://www.linkedin.com/company/seche-environnement/',
  '306915535',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  52, 'warm', 1776520000
);

-- 5. Paprec
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1005-4f6a-9b0c-100000000005',
  'Paprec',
  'paprec.com',
  'Premier groupe francais independant de recyclage et de valorisation des dechets. Paprec traite 16 millions de tonnes de dechets par an via 300 sites en France. Leader du tri, recyclage papier/plastique/metaux et valorisation energetique.',
  'Water/Environment', 'Recycling & Waste Valorization',
  'La Courneuve', 'France', 16000, 3200000000, 2024,
  '{"erp":["Microsoft Dynamics 365"],"scada":["Rockwell FactoryTalk","Schneider EcoStruxure"],"iot":["capteurs de tri optique","RFID tags","Azure IoT"],"data":["Power BI","Dataiku"],"cloud":["Azure","AWS"],"ai_ml":["computer vision tri","Azure ML"],"automation":["robots de tri TOMRA","Pellenc ST"],"cybersecurity":["Fortinet","Zscaler"]}',
  1,
  'https://www.linkedin.com/company/paprec-group/',
  '410408162',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  56, 'warm', 1776520000
);

-- 6. Derichebourg Environnement
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1006-4f6a-9b0c-100000000006',
  'Derichebourg Environnement',
  'derichebourg.com',
  'Branche environnement du groupe Derichebourg, specialisee dans la collecte, le tri et le recyclage des dechets menagers et industriels, la proprete urbaine et les services aux collectivites. Present dans 10 pays.',
  'Water/Environment', 'Waste Collection & Recycling',
  'Paris', 'France', 35000, 4700000000, 2024,
  '{"erp":["SAP ECC"],"fleet_management":["Trimble","Geotab"],"iot":["capteurs de remplissage","NB-IoT","RFID"],"data":["Power BI","Excel avance"],"cloud":["Azure"],"scada":["Schneider EcoStruxure"],"cybersecurity":["Fortinet"],"logistics":["SAP TM","Oracle Transportation"]}',
  1,
  'https://www.linkedin.com/company/derichebourg/',
  '352980194',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  48, 'cold', 1776520000
);

-- 7. Toxfree (Veolia subsidiary)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1007-4f6a-9b0c-100000000007',
  'Toxfree',
  'toxfree.com.au',
  'Filiale australienne de Veolia specialisee dans la gestion des dechets dangereux, industriels et medicaux en Australie et Nouvelle-Zelande. Exploite des installations de traitement thermique, physico-chimique et de confinement securise.',
  'Water/Environment', 'Hazardous Waste Management',
  'Perth', 'Australia', 2500, 450000000, 2024,
  '{"erp":["SAP Business One"],"scada":["Schneider ClearSCADA"],"iot":["capteurs environnementaux","LoRaWAN"],"data":["Power BI"],"cloud":["Azure"],"compliance":["waste tracking systems"],"cybersecurity":["CrowdStrike"]}',
  1,
  'https://www.linkedin.com/company/toxfree/',
  NULL,
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  45, 'cold', 1776520000
);

-- 8. SIAAP
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1008-4f6a-9b0c-100000000008',
  'SIAAP',
  'siaap.fr',
  'Syndicat Interdepartemental pour l''Assainissement de l''Agglomeration Parisienne. Le SIAAP traite les eaux usees de 9 millions d''habitants en Ile-de-France via 6 usines d''epuration dont Seine Aval (Acheres), la plus grande station d''Europe.',
  'Water/Environment', 'Wastewater Treatment',
  'Paris', 'France', 1800, 1600000000, 2024,
  '{"scada":["Schneider EcoStruxure","Siemens PCS7"],"iot":["capteurs qualite eau","sondes multiparametres","LoRaWAN"],"erp":["SAP ECC"],"gis":["Esri ArcGIS","QGIS"],"data":["Power BI","Python"],"cloud":["OVHcloud"],"process_control":["ABB DCS","Siemens S7-1500"],"cybersecurity":["Stormshield","ANSSI qualifie"]}',
  1,
  'https://www.linkedin.com/company/siaap/',
  '253472858',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  60, 'warm', 1776520000
);

-- 9. Agence de l'eau Loire-Bretagne
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1009-4f6a-9b0c-100000000009',
  'Agence de l''eau Loire-Bretagne',
  'eau-loire-bretagne.fr',
  'Etablissement public charge de la politique de l''eau sur le bassin Loire-Bretagne couvrant 28% du territoire francais. Finance la protection des ressources en eau, la lutte contre les pollutions et la restauration des milieux aquatiques. Budget annuel de 400 M EUR.',
  'Water/Environment', 'Water Agency & Regulation',
  'Orleans', 'France', 340, 400000000, 2024,
  '{"erp":["Cegid"],"gis":["Esri ArcGIS","QGIS","Mapbox"],"data":["Power BI","R","Python"],"cloud":["OVHcloud","Scaleway"],"si_eau":["OSUR","Naiade","BNPE"],"cybersecurity":["ANSSI qualifie","Stormshield"],"web":["Drupal","PHP"]}',
  1,
  'https://www.linkedin.com/company/agence-de-leau-loire-bretagne/',
  '182145038',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  50, 'cold', 1776520000
);

-- 10. Inova (Suez subsidiary)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1010-4f6a-9b0c-100000000010',
  'Inova',
  'inova-france.com',
  'Filiale de Suez specialisee dans la conception, construction et exploitation d''usines de valorisation energetique des dechets (waste-to-energy). Inova a construit plus de 500 lignes d''incineration dans le monde et developpe des solutions de captage de CO2 en sortie de cheminee.',
  'Water/Environment', 'Waste-to-Energy',
  'Velizy-Villacoublay', 'France', 1200, 650000000, 2024,
  '{"scada":["Siemens PCS7","ABB 800xA"],"erp":["SAP ECC"],"simulation":["ANSYS Fluent","Aspen Plus"],"process_control":["DCS ABB","PLC Siemens S7"],"data":["Power BI","Python"],"cloud":["Azure"],"iot":["capteurs emissions","Siemens MindSphere"],"cad":["AutoCAD","SolidWorks"],"cybersecurity":["Stormshield"]}',
  1,
  'https://www.linkedin.com/company/inova-environnement/',
  '383474689',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  53, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all
-- Themes: SCADA modernization, smart water grids, circular economy

-- ---- Veolia News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw100001-aa01-4000-b101-veo000000001',
  'b2c3d4e5-1001-4f6a-9b0c-100000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Veolia modernise les SCADA de 2000 usines de traitement d''eau en France',
  'Veolia a lance un programme de modernisation des systemes SCADA sur l''ensemble de ses 2000 usines de production d''eau potable et stations d''epuration en France. Le remplacement des automates Schneider et Siemens de generation precedente par des plateformes cyber-securisees represente un investissement de 350 millions EUR sur 5 ans.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/veolia-scada-modernisation-usines-eau-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw100001-aa01-4000-b101-veo000000002',
  'b2c3d4e5-1001-4f6a-9b0c-100000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Veolia deploie Hubgrade Smart Water Grid sur 30 metropoles europeennes',
  'La plateforme Hubgrade de Veolia, combinant IoT, IA et jumeaux numeriques hydrauliques, est desormais deployee sur 30 metropoles en Europe pour optimiser la gestion des reseaux d''eau en temps reel. Le systeme a permis de reduire les pertes d''eau de 25% et la consommation energetique des pompages de 18%.',
  'smart_water',
  'https://www.lesechos.fr/industrie-services/energie-environnement/veolia-hubgrade-smart-water-grid-europe-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw100001-aa01-4000-b101-veo000000003',
  'b2c3d4e5-1001-4f6a-9b0c-100000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Veolia lance un programme d''economie circulaire de 2 milliards EUR',
  'Veolia a devoile son plan strategique pour l''economie circulaire avec un investissement de 2 milliards EUR d''ici 2030, ciblant le recyclage chimique des plastiques, la valorisation des boues d''epuration en biogaz et la recuperation des metaux rares dans les DEEE. L''objectif est d''atteindre 50% de taux de circularite sur ses operations.',
  'circular_economy',
  'https://www.veolia.com/fr/medias/communiques-presse/economie-circulaire-plan-2030',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw100001-aa01-4000-b101-veo000000004',
  'b2c3d4e5-1001-4f6a-9b0c-100000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Veolia recrute 5000 techniciens et ingenieurs pour sa transformation digitale',
  'Veolia a annonce un plan de recrutement de 5000 profils specialises en automatisme, cybersecurite industrielle, data science et IoT sur 3 ans pour accompagner la digitalisation de ses operations. Le groupe investit 100 millions EUR dans un campus de formation a Aubervilliers.',
  'hiring',
  'https://www.usinenouvelle.com/article/veolia-recrutement-5000-digital-water-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Suez News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw200002-bb02-4000-b202-suz000000001',
  'b2c3d4e5-1002-4f6a-9b0c-100000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Suez investit 200 M EUR dans la modernisation SCADA de ses reseaux d''eau',
  'Suez a lance un programme de remplacement de ses systemes de supervision et controle-commande (SCADA) obsoletes sur ses 4500 installations en France. La migration vers des plateformes unifiees Schneider ClearSCADA et ABB Ability integre des fonctionnalites de cybersecurite OT conformes a la directive NIS2.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/suez-scada-modernisation-nis2-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw200002-bb02-4000-b202-suz000000002',
  'b2c3d4e5-1002-4f6a-9b0c-100000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Suez deploie ON''connect smart water grid a Bordeaux Metropole',
  'Suez a acheve le deploiement de 300 000 compteurs communicants ON''connect sur l''ensemble de Bordeaux Metropole, creant le plus grand reseau d''eau intelligent de France. La plateforme permet la detection de fuites en temps reel, la telereleve et l''alerte consommateurs via une application mobile.',
  'smart_water',
  'https://www.lesechos.fr/industrie-services/energie-environnement/suez-onconnect-bordeaux-smart-water-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw200002-bb02-4000-b202-suz000000003',
  'b2c3d4e5-1002-4f6a-9b0c-100000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Suez lance une usine de recyclage chimique des plastiques a Saint-Fons',
  'Suez a inaugure sa premiere usine de recyclage chimique des plastiques a Saint-Fons (Lyon), capable de traiter 30 000 tonnes de dechets plastiques non recyclables mecaniquement. Le procede de pyrolyse produit de l''huile de pyrolyse reintroduite dans la petrochimie, illustrant la strategie d''economie circulaire du groupe.',
  'circular_economy',
  'https://www.usinenouvelle.com/article/suez-recyclage-chimique-plastiques-saint-fons-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw200002-bb02-4000-b202-suz000000004',
  'b2c3d4e5-1002-4f6a-9b0c-100000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Suez remporte le contrat d''assainissement du Grand Paris pour 15 ans',
  'Suez a ete selectionne pour operer le reseau d''assainissement du Grand Paris (800 km de collecteurs) dans le cadre d''un contrat de 15 ans estime a 1.2 milliard EUR. Le contrat inclut la modernisation des stations de pompage et le deploiement de capteurs IoT sur l''ensemble du reseau.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/energie-environnement/suez-grand-paris-assainissement-contrat-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

-- ---- Saur News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw300003-cc03-4000-b303-sar000000001',
  'b2c3d4e5-1003-4f6a-9b0c-100000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Saur modernise les automates SCADA de 3000 installations rurales',
  'Saur a engage un programme de remplacement des automates programmables et systemes SCADA vieillissants sur 3000 de ses installations en zone rurale et semi-urbaine. La migration vers des solutions Topkapi securisees et connectees en 4G/LoRaWAN represente un investissement de 80 millions EUR sur 4 ans.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/saur-scada-modernisation-rural-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw300003-cc03-4000-b303-sar000000002',
  'b2c3d4e5-1003-4f6a-9b0c-100000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Saur deploie sa plateforme Diag smart water sur 500 collectivites',
  'La plateforme Saur Diag, solution de gestion intelligente des reseaux d''eau basee sur l''IA et les donnees de compteurs communicants, est desormais operationnelle sur 500 collectivites en France. Le systeme detecte les fuites invisibles et optimise les traitements en temps reel.',
  'smart_water',
  'https://www.saur.com/actualites/saur-diag-500-collectivites-smart-water-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw300003-cc03-4000-b303-sar000000003',
  'b2c3d4e5-1003-4f6a-9b0c-100000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Saur investit dans la reutilisation des eaux usees traitees (REUT)',
  'Saur a lance 15 projets de reutilisation des eaux usees traitees (REUT) pour l''irrigation agricole et l''arrosage des espaces verts dans le sud de la France. Cette demarche d''economie circulaire de l''eau repond aux secheresses recurrentes et s''inscrit dans le Plan Eau du gouvernement.',
  'circular_economy',
  'https://www.lesechos.fr/industrie-services/energie-environnement/saur-reut-eau-reutilisation-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Seche Environnement News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw400004-dd04-4000-b404-sec000000001',
  'b2c3d4e5-1004-4f6a-9b0c-100000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Seche Environnement modernise les systemes SCADA de ses 120 sites industriels',
  'Seche Environnement a lance la modernisation des systemes de controle-commande et SCADA de ses 120 sites de traitement de dechets dangereux. Le programme de 45 millions EUR remplace les automates Siemens S5 et Schneider Premium par des plateformes de derniere generation avec cybersecurite OT integree.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/seche-environnement-scada-modernisation-2026',
  'positive', 7, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw400004-dd04-4000-b404-sec000000002',
  'b2c3d4e5-1004-4f6a-9b0c-100000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Seche Environnement inaugure une unite de recyclage des batteries lithium',
  'Seche Environnement a inaugure a Changee (Mayenne) la premiere unite industrielle francaise de recyclage hydrométallurgique des batteries lithium-ion en fin de vie. L''usine traitera 10 000 tonnes de batteries par an et recuperera le lithium, cobalt et nickel dans une logique d''economie circulaire.',
  'circular_economy',
  'https://www.usinenouvelle.com/article/seche-environnement-recyclage-batteries-lithium-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw400004-dd04-4000-b404-sec000000003',
  'b2c3d4e5-1004-4f6a-9b0c-100000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Seche Environnement deploie des capteurs IoT pour le suivi des emissions en temps reel',
  'Seche Environnement a equipe ses 35 incinerateurs de capteurs IoT connectes en continu pour le suivi des emissions atmospheriques. Le systeme alimente un tableau de bord Seche Connect accessible aux autorites et riverains, renforçant la transparence environnementale.',
  'smart_water',
  'https://www.actu-environnement.com/ae/news/seche-environnement-iot-emissions-temps-reel-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Paprec News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw500005-ee05-4000-b505-pap000000001',
  'b2c3d4e5-1005-4f6a-9b0c-100000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Paprec automatise ses centres de tri avec l''IA et la vision par ordinateur',
  'Paprec a deploy des robots de tri equipes de vision par ordinateur et d''IA sur 50 de ses 300 centres de tri en France. L''automatisation augmente la purete des flux tries de 15% et reduit la penibilite du travail. Le programme de 120 millions EUR s''appuie sur des solutions TOMRA et Pellenc ST.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/paprec-ia-vision-ordinateur-tri-dechets-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw500005-ee05-4000-b505-pap000000002',
  'b2c3d4e5-1005-4f6a-9b0c-100000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Paprec lance une filiere de recyclage des composites et textiles',
  'Paprec a investi 60 millions EUR dans deux nouvelles usines de recyclage : une pour les materiaux composites (fibres de carbone et verre) a Harnes et une pour les textiles a Laval. Ces filieres d''economie circulaire repondent aux obligations de la loi AGEC et au reglement europeen sur les dechets textiles.',
  'circular_economy',
  'https://www.usinenouvelle.com/article/paprec-recyclage-composites-textiles-economie-circulaire-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw500005-ee05-4000-b505-pap000000003',
  'b2c3d4e5-1005-4f6a-9b0c-100000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Paprec modernise ses systemes SCADA et automates sur 300 sites',
  'Paprec a engage la modernisation de l''ensemble de ses systemes de supervision industrielle (SCADA) et automates programmables sur ses 300 sites de tri et valorisation. Le programme de 90 millions EUR unifie les plateformes Rockwell et Schneider et integre une couche de cybersecurite OT.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/paprec-scada-modernisation-300-sites-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Derichebourg Environnement News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw600006-ff06-4000-b606-der000000001',
  'b2c3d4e5-1006-4f6a-9b0c-100000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Derichebourg Environnement digitalise sa flotte de 8000 vehicules de collecte',
  'Derichebourg Environnement a lance un programme de digitalisation de sa flotte de 8000 vehicules de collecte de dechets avec des capteurs IoT, GPS temps reel et optimisation d''itineraires par IA. Le projet de 40 millions EUR vise a reduire la consommation de carburant de 20% et ameliorer la tracabilite des flux.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/derichebourg-environnement-flotte-digitale-iot-2026',
  'positive', 6, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw600006-ff06-4000-b606-der000000002',
  'b2c3d4e5-1006-4f6a-9b0c-100000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Derichebourg investit dans le recyclage des metaux critiques',
  'Derichebourg Environnement a inaugure une nouvelle ligne de traitement pour la recuperation des metaux critiques (terres rares, lithium, cobalt) a partir de dechets electroniques et batteries usagees. L''investissement de 35 millions EUR s''inscrit dans la strategie europeenne sur les matieres premieres critiques.',
  'circular_economy',
  'https://www.usinenouvelle.com/article/derichebourg-recyclage-metaux-critiques-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw600006-ff06-4000-b606-der000000003',
  'b2c3d4e5-1006-4f6a-9b0c-100000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Derichebourg modernise les automates de ses centres de tri et broyage',
  'Derichebourg Environnement a lance la mise a jour des systemes SCADA et automates de ses centres de tri et broyeurs industriels. La migration vers des solutions Schneider unifiees avec cybersecurite integree represente un investissement de 25 millions EUR.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/derichebourg-scada-tri-broyage-modernisation-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);

-- ---- Toxfree News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw700007-0707-4000-b707-tox000000001',
  'b2c3d4e5-1007-4f6a-9b0c-100000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Toxfree modernise ses systemes SCADA conformement aux standards Veolia',
  'Toxfree, filiale australienne de Veolia, a engage la migration de ses systemes de controle-commande et SCADA vers les standards du groupe Veolia. Le programme de 15 millions AUD unifie les plateformes Schneider ClearSCADA sur ses 40 installations de traitement de dechets dangereux en Australie.',
  'digital_transformation',
  'https://www.australianmining.com.au/news/toxfree-scada-veolia-standards-modernisation-2026',
  'positive', 6, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw700007-0707-4000-b707-tox000000002',
  'b2c3d4e5-1007-4f6a-9b0c-100000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Toxfree lance un programme de recuperation des solvants uses en economie circulaire',
  'Toxfree a investi 8 millions AUD dans une nouvelle unite de regeneration des solvants industriels uses a Kwinana (Western Australia). Le procede de distillation avancee permet de recycler 85% des solvants collectes aupres des industries minieres et manufacturieres australiennes.',
  'circular_economy',
  'https://www.waste-management-world.com/article/toxfree-solvent-recovery-circular-economy-2026',
  'positive', 5, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw700007-0707-4000-b707-tox000000003',
  'b2c3d4e5-1007-4f6a-9b0c-100000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Toxfree deploie un smart monitoring grid sur ses installations de stockage',
  'Toxfree a equipe ses 12 installations de stockage de dechets dangereux de capteurs IoT connectes pour le monitoring en temps reel des nappes phreatiques, des emissions gazeuses et de la stabilite des cellules. Le systeme alimente un tableau de bord centralise conforme aux exigences de l''EPA australienne.',
  'smart_water',
  'https://www.australianmining.com.au/news/toxfree-smart-monitoring-hazardous-waste-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);

-- ---- SIAAP News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw800008-0808-4000-b808-sia000000001',
  'b2c3d4e5-1008-4f6a-9b0c-100000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'SIAAP modernise les SCADA de ses 6 usines d''epuration franciliennes',
  'Le SIAAP a lance un programme de remplacement des systemes SCADA et DCS de ses 6 usines d''epuration (dont Seine Aval, la plus grande d''Europe). Le budget de 120 millions EUR couvre la migration vers des plateformes Siemens PCS7 et Schneider EcoStruxure avec cybersecurite OT renforcee.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/siaap-scada-modernisation-usines-epuration-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw800008-0808-4000-b808-sia000000002',
  'b2c3d4e5-1008-4f6a-9b0c-100000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'SIAAP deploie un reseau de capteurs IoT smart water sur 440 km de collecteurs',
  'Le SIAAP a installe 2000 capteurs IoT sur son reseau de 440 km de collecteurs d''assainissement en Ile-de-France. Le systeme de smart water grid permet la detection en temps reel des debordements, la modelisation des flux et l''anticipation des inondations via des jumeaux numeriques hydrauliques.',
  'smart_water',
  'https://www.siaap.fr/actualites/smart-water-grid-capteurs-iot-collecteurs-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw800008-0808-4000-b808-sia000000003',
  'b2c3d4e5-1008-4f6a-9b0c-100000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'SIAAP transforme les boues d''epuration en biogaz et biofertilisants',
  'Le SIAAP a acheve la construction d''une mega-unite de methanisation sur le site de Seine Aval (Acheres), traitant 100% des boues d''epuration pour produire du biogaz injecte dans le reseau GRDF et des biofertilisants certifies. Le projet illustre l''approche d''economie circulaire du SIAAP.',
  'circular_economy',
  'https://www.actu-environnement.com/ae/news/siaap-methanisation-boues-biogaz-acheres-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw800008-0808-4000-b808-sia000000004',
  'b2c3d4e5-1008-4f6a-9b0c-100000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'SIAAP prepare les JO 2028 avec un plan qualite eau de la Seine',
  'Le SIAAP poursuit son programme d''amelioration de la qualite de l''eau de la Seine avec un investissement de 1.4 milliard EUR, incluant des bassins de stockage des eaux pluviales, la fiabilisation des deversoirs d''orage et le deploiement de capteurs de qualite en temps reel sur 50 points du fleuve.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/energie-environnement/siaap-qualite-eau-seine-plan-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Agence de l'eau Loire-Bretagne News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw900009-0909-4000-b909-alb000000001',
  'b2c3d4e5-1009-4f6a-9b0c-100000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Agence de l''eau Loire-Bretagne modernise son systeme d''information sur l''eau',
  'L''Agence de l''eau Loire-Bretagne a lance la refonte complete de son systeme d''information sur l''eau (SI Eau), incluant les bases de donnees OSUR, Naiade et BNPE. Le programme de 25 millions EUR prevoit la migration vers des architectures cloud, l''ouverture des donnees en open data et l''integration de tableaux de bord cartographiques temps reel.',
  'digital_transformation',
  'https://www.eau-loire-bretagne.fr/actualites/modernisation-si-eau-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw900009-0909-4000-b909-alb000000002',
  'b2c3d4e5-1009-4f6a-9b0c-100000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Agence Loire-Bretagne deploie un reseau smart water de surveillance des cours d''eau',
  'L''Agence de l''eau Loire-Bretagne a installe 800 stations de mesure automatisees sur les cours d''eau du bassin, equipees de capteurs multiparametres IoT (debit, temperature, conductivite, nitrates). Les donnees alimentent un jumeau numerique hydrologique du bassin Loire-Bretagne.',
  'smart_water',
  'https://www.actu-environnement.com/ae/news/agence-eau-loire-bretagne-smart-water-capteurs-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nw900009-0909-4000-b909-alb000000003',
  'b2c3d4e5-1009-4f6a-9b0c-100000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Loire-Bretagne finance 150 projets de restauration ecologique des zones humides',
  'L''Agence de l''eau Loire-Bretagne a alloue 80 millions EUR pour financer 150 projets de restauration ecologique des zones humides et de renaturation des cours d''eau dans le cadre du 12e programme d''intervention. Cette demarche d''economie circulaire de l''eau vise a retablir les fonctions naturelles d''epuration et de regulation.',
  'circular_economy',
  'https://www.eau-loire-bretagne.fr/actualites/restauration-zones-humides-programme-12-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);

-- ---- Inova News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nwa00010-1010-4000-ba10-ino000000001',
  'b2c3d4e5-1010-4f6a-9b0c-100000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Inova modernise les systemes SCADA de ses usines waste-to-energy en Europe',
  'Inova, filiale de Suez, a lance la modernisation des systemes SCADA et DCS de ses 25 usines de valorisation energetique des dechets en Europe. La migration vers des plateformes Siemens PCS7 et ABB 800xA integre des fonctionnalites de predictive maintenance et de cybersecurite OT.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/inova-suez-scada-waste-to-energy-modernisation-2026',
  'positive', 7, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nwa00010-1010-4000-ba10-ino000000002',
  'b2c3d4e5-1010-4f6a-9b0c-100000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Inova developpe le captage de CO2 sur ses incinerateurs pour l''economie circulaire',
  'Inova a lance un pilote de captage de CO2 en sortie de cheminee sur son usine d''Issy-les-Moulineaux. La technologie de capture post-combustion permettrait de sequestrer 100 000 tonnes de CO2 par an et de les valoriser dans la production de materiaux de construction, illustrant une demarche d''economie circulaire du carbone.',
  'circular_economy',
  'https://www.actu-environnement.com/ae/news/inova-suez-captage-co2-incinerateurs-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nwa00010-1010-4000-ba10-ino000000003',
  'b2c3d4e5-1010-4f6a-9b0c-100000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Inova equipe ses usines de smart grids energetiques connectes au reseau',
  'Inova a deploye des systemes de smart grid sur ses 15 usines francaises de valorisation energetique, permettant l''injection intelligente de l''electricite et de la chaleur produites dans les reseaux urbains. Le pilotage en temps reel optimise la revente d''energie et la stabilisation du reseau electrique local.',
  'smart_water',
  'https://www.usine-digitale.fr/article/inova-smart-grid-waste-to-energy-reseau-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- 1. Veolia: large company, strong digital transformation, smart water leader
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
  'ps-veo01-1001-4000-c001-200000000001',
  'b2c3d4e5-1001-4f6a-9b0c-100000000001',
  7, 7, 8, 6,
  7, 6, 8, 7,
  5, 6, 6, 5,
  3, 5, 5, 3, 6,
  6, 5, 5, 6,
  6, 7, 4, 5, 5,
  6, 6, 6, 6,
  7, 6, 6, 6,
  4, 5, 7,
  7, 6, 5, 7, 7,
  7, 1, 5,
  6, 3, 6,
  62, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 2. Suez: medium-large, SCADA modernization focus, NIS2 compliance
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
  'ps-suz02-1002-4000-c002-200000000002',
  'b2c3d4e5-1002-4f6a-9b0c-100000000002',
  7, 6, 7, 5,
  7, 6, 7, 6,
  5, 5, 5, 5,
  3, 4, 5, 3, 6,
  5, 5, 4, 5,
  5, 6, 4, 5, 5,
  5, 5, 6, 5,
  7, 6, 5, 5,
  4, 5, 6,
  6, 5, 5, 6, 6,
  7, 1, 5,
  6, 3, 6,
  58, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 3. Saur: mid-size, rural focus, smart water platform
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
  'ps-sar03-1003-4000-c003-200000000003',
  'b2c3d4e5-1003-4f6a-9b0c-100000000003',
  6, 6, 5, 4,
  6, 7, 6, 5,
  5, 5, 5, 5,
  3, 5, 4, 3, 5,
  5, 4, 4, 5,
  5, 5, 3, 4, 4,
  4, 5, 5, 5,
  7, 5, 5, 4,
  3, 3, 5,
  6, 5, 5, 6, 5,
  6, 1, 4,
  5, 2, 5,
  55, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 4. Seche Environnement: hazardous waste specialist, SCADA modernization
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
  'ps-sec04-1004-4000-c004-200000000004',
  'b2c3d4e5-1004-4f6a-9b0c-100000000004',
  6, 5, 4, 4,
  5, 5, 6, 5,
  4, 5, 5, 4,
  3, 4, 4, 3, 5,
  4, 4, 3, 4,
  5, 5, 3, 4, 4,
  5, 5, 4, 5,
  7, 4, 4, 4,
  3, 3, 5,
  6, 5, 5, 6, 5,
  7, 1, 5,
  4, 2, 5,
  52, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 5. Paprec: large recycler, AI/vision for sorting, SCADA upgrade
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
  'ps-pap05-1005-4000-c005-200000000005',
  'b2c3d4e5-1005-4f6a-9b0c-100000000005',
  6, 6, 6, 4,
  6, 5, 6, 5,
  5, 5, 5, 5,
  3, 5, 4, 3, 5,
  5, 4, 4, 5,
  5, 6, 3, 5, 4,
  5, 6, 5, 5,
  7, 4, 5, 4,
  3, 4, 5,
  6, 5, 5, 5, 6,
  6, 1, 5,
  5, 2, 5,
  56, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 6. Derichebourg Environnement: fleet digitalization, less technical depth
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
  'ps-der06-1006-4000-c006-200000000006',
  'b2c3d4e5-1006-4f6a-9b0c-100000000006',
  5, 5, 6, 3,
  5, 5, 6, 5,
  4, 4, 4, 4,
  2, 3, 4, 3, 4,
  4, 4, 3, 4,
  4, 4, 3, 4, 4,
  4, 4, 4, 4,
  7, 4, 4, 4,
  3, 4, 5,
  6, 5, 4, 4, 4,
  6, 1, 4,
  4, 2, 4,
  48, 'cold',
  1776520000, 1776520000, 1776520000
);

-- 7. Toxfree: small subsidiary, aligned to Veolia standards
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
  'ps-tox07-1007-4000-c007-200000000007',
  'b2c3d4e5-1007-4f6a-9b0c-100000000007',
  5, 4, 3, 3,
  2, 3, 5, 4,
  3, 4, 4, 3,
  2, 3, 4, 2, 4,
  3, 3, 3, 4,
  4, 4, 3, 3, 3,
  3, 3, 5, 4,
  7, 3, 3, 3,
  2, 5, 4,
  6, 5, 4, 4, 4,
  5, 1, 4,
  3, 2, 3,
  45, 'cold',
  1776520000, 1776520000, 1776520000
);

-- 8. SIAAP: public entity, large capex, SCADA modernization, smart water
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
  'ps-sia08-1008-4000-c008-200000000008',
  'b2c3d4e5-1008-4f6a-9b0c-100000000008',
  7, 6, 4, 4,
  8, 7, 7, 5,
  5, 5, 7, 4,
  3, 7, 3, 3, 7,
  5, 4, 4, 5,
  5, 5, 3, 4, 3,
  6, 5, 5, 6,
  7, 5, 4, 5,
  3, 2, 7,
  6, 6, 5, 7, 6,
  7, 1, 5,
  5, 3, 5,
  60, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 9. Agence de l'eau Loire-Bretagne: public agency, SI modernization
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
  'ps-alb09-1009-4000-c009-200000000009',
  'b2c3d4e5-1009-4f6a-9b0c-100000000009',
  6, 5, 2, 2,
  5, 6, 7, 4,
  3, 3, 3, 3,
  2, 7, 2, 2, 5,
  3, 3, 3, 4,
  4, 4, 2, 3, 3,
  2, 4, 5, 4,
  7, 3, 4, 3,
  3, 1, 5,
  6, 5, 5, 6, 4,
  7, 1, 5,
  3, 2, 5,
  50, 'cold',
  1776520000, 1776520000, 1776520000
);

-- 10. Inova: Suez subsidiary, waste-to-energy, SCADA modernization
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
  'ps-ino10-1010-4000-c010-200000000010',
  'b2c3d4e5-1010-4f6a-9b0c-100000000010',
  6, 5, 3, 4,
  6, 5, 6, 5,
  4, 5, 5, 4,
  2, 4, 4, 2, 5,
  4, 4, 3, 4,
  5, 5, 3, 4, 4,
  4, 5, 5, 5,
  7, 4, 4, 5,
  3, 4, 5,
  6, 5, 4, 6, 5,
  6, 1, 5,
  4, 2, 5,
  53, 'warm',
  1776520000, 1776520000, 1776520000
);
