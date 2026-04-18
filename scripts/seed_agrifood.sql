-- ==========================================================================
-- SEED: 10 French Agri-Food & Food Tech Companies
-- Danone, Lactalis, Bel Group, Tereos, Roquette, Limagrain,
-- InVivo, Lesaffre, Diana Food (Symrise), Bonduelle
-- Timestamp: 1776520000 (all created_at/updated_at)
-- ==========================================================================

-- ======================================================================
-- 1. COMPANIES
-- ======================================================================

-- Danone
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0001-4af0-a100-da0000000001',
  'Danone',
  'danone.com',
  'Multinationale francaise de l''agroalimentaire, leader mondial des produits laitiers frais, de la nutrition infantile et des eaux en bouteille. Presente dans plus de 120 pays avec une strategie forte autour de la sante et de la durabilite.',
  'Agri-Food', 'Dairy & Nutrition',
  'Paris', 'France', 88000, 27600000000, 2024,
  '{"erp":["SAP S/4HANA"],"cloud":["Azure","AWS"],"scm":["Blue Yonder","Kinaxis"],"data":["Snowflake","Power BI","Dataiku"],"mes":["Wonderware","Aveva"],"iot":["Azure IoT Hub","Rockwell FactoryTalk"],"devops":["Azure DevOps","Docker"]}',
  1,
  'https://www.linkedin.com/company/danone/',
  '552032534',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  52, 'warm', 1776520000
);

-- Lactalis
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0002-4af0-a100-1ac000000002',
  'Lactalis',
  'lactalis.fr',
  'Premier groupe laitier mondial, non cote en bourse, base a Laval. Propriétaire des marques President, Lactel, Galbani, Parmalat. Plus de 270 sites de production dans 51 pays.',
  'Agri-Food', 'Dairy & Cheese',
  'Laval', 'France', 85000, 28500000000, 2024,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"cloud":["Azure"],"scm":["SAP IBP","Manhattan Associates"],"data":["Power BI","Qlik"],"mes":["Siemens Opcenter","Wonderware"],"iot":["Siemens MindSphere"],"quality":["TraceGains","SAP QM"]}',
  0,
  'https://www.linkedin.com/company/lactalis/',
  '304186301',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  42, 'cold', 1776520000
);

-- Bel Group
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0003-4af0-a100-be1000000003',
  'Bel Group',
  'groupe-bel.com',
  'Groupe fromager et de snacking sain d''envergure mondiale. Marques phares : La Vache qui rit, Babybel, Kiri, Boursin. 30 sites de production, forte poussee vers les alternatives vegetales et la durabilite emballage.',
  'Agri-Food', 'Cheese & Healthy Snacking',
  'Suresnes', 'France', 12000, 3800000000, 2024,
  '{"erp":["SAP S/4HANA"],"cloud":["Azure","AWS"],"scm":["Kinaxis RapidResponse"],"data":["Power BI","Alteryx"],"mes":["Rockwell Plex","Wonderware"],"iot":["Rockwell FactoryTalk IoT"],"packaging":["AVEVA Packaging","Siemens"]}',
  1,
  'https://www.linkedin.com/company/groupe-bel/',
  '542088653',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  48, 'warm', 1776520000
);

-- Tereos
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0004-4af0-a100-7e7e00000004',
  'Tereos',
  'tereos.com',
  'Cooperative sucriere francaise, 2e producteur mondial de sucre et d''ethanol. Transforme betteraves, cannes a sucre et cereales en sucres, amidons, proteines vegetales et bioethanol dans 43 sites industriels.',
  'Agri-Food', 'Sugar & Starch Processing',
  'Lille', 'France', 15400, 6700000000, 2024,
  '{"erp":["SAP ECC"],"cloud":["OVHcloud","Azure"],"scm":["SAP APO"],"data":["Power BI","Python analytics"],"mes":["Siemens WinCC","Wonderware InTouch"],"scada":["Schneider EcoStruxure","ABB Ability"],"process_control":["Honeywell Experion","DeltaV"]}',
  0,
  'https://www.linkedin.com/company/tereos/',
  '381993642',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  38, 'cold', 1776520000
);

-- Roquette
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0005-4af0-a100-70c000000005',
  'Roquette Freres',
  'roquette.com',
  'Leader mondial des ingredients d''origine vegetale pour l''alimentation, la nutrition et la pharmacie. Specialiste des amidons, polyols, proteines de pois et fibres vegetales. 25 sites industriels a travers le monde.',
  'Agri-Food', 'Plant-Based Ingredients',
  'Lestrem', 'France', 8800, 5100000000, 2024,
  '{"erp":["SAP S/4HANA"],"cloud":["AWS","Azure"],"scm":["SAP IBP"],"data":["Dataiku","Power BI"],"mes":["Siemens Opcenter"],"process_control":["Emerson DeltaV","Yokogawa CENTUM"],"lims":["LabWare","Thermo Fisher SampleManager"]}',
  1,
  'https://www.linkedin.com/company/roquette/',
  '348515352',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  47, 'warm', 1776520000
);

-- Limagrain
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0006-4af0-a100-11a000000006',
  'Limagrain',
  'limagrain.com',
  'Cooperative agricole internationale et 4e semencier mondial. Activites en semences de grandes cultures (Limagrain Europe, Vilmorin), semences potageres et produits cerealiers (Jacquet-Brossard). R&D intensive en genomique vegetale.',
  'Agri-Food', 'Seeds & Cereal Products',
  'Chappes', 'France', 9700, 3200000000, 2024,
  '{"erp":["SAP ECC","Oracle EBS"],"cloud":["AWS"],"genomics":["Illumina","PacBio","custom bioinformatics"],"data":["Databricks","R","Python"],"mes":["Wonderware"],"lims":["LabWare"],"devops":["Jenkins","Docker"]}',
  0,
  'https://www.linkedin.com/company/limagrain/',
  '345870825',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  40, 'cold', 1776520000
);

-- InVivo
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0007-4af0-a100-1a1100000007',
  'InVivo',
  'invivo-group.com',
  'Premier groupe cooperatif agricole francais. Activites en agriculture (Bioline, semences, biosolutions), nutrition animale (Neovia) et distribution alimentaire (Cordier, Soufflet). 12 000 employes et presence dans 43 pays.',
  'Agri-Food', 'Agricultural Cooperative',
  'Paris', 'France', 12000, 12100000000, 2024,
  '{"erp":["SAP ECC","Dynamics 365"],"cloud":["Azure"],"scm":["SAP APO"],"agtech":["Smag Farmer","Atland"],"data":["Power BI","Azure Synapse"],"mes":["Wonderware"],"devops":["Azure DevOps"]}',
  0,
  'https://www.linkedin.com/company/invivo-group/',
  '775684905',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  41, 'cold', 1776520000
);

-- Lesaffre
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0008-4af0-a100-1e5a00000008',
  'Lesaffre',
  'lesaffre.com',
  'Leader mondial de la fermentation. Produit levures de boulangerie, ingredients de panification, complementaires nutritionnels et solutions de biotechnologie. 96 sites de production dans plus de 50 pays.',
  'Agri-Food', 'Fermentation & Yeast',
  'Lille', 'France', 11000, 3000000000, 2024,
  '{"erp":["SAP S/4HANA"],"cloud":["Azure","AWS"],"scm":["SAP IBP"],"data":["Power BI","Tableau"],"mes":["Wonderware","Siemens Opcenter"],"biotech":["custom fermentation SCADA"],"process_control":["Emerson DeltaV","Schneider Foxboro"]}',
  1,
  'https://www.linkedin.com/company/lesaffre/',
  '325586266',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  50, 'warm', 1776520000
);

-- Diana Food (Symrise)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0009-4af0-a100-d1a000000009',
  'Diana Food (Symrise)',
  'diana-food.com',
  'Filiale du groupe allemand Symrise, specialisee dans les ingredients naturels d''origine vegetale et les aromes. Fournisseur cle de l''industrie agroalimentaire en extraits de fruits, legumes et proteines. Siege operationnel en France.',
  'Agri-Food', 'Natural Food Ingredients',
  'Rennes', 'France', 4200, 1200000000, 2024,
  '{"erp":["SAP S/4HANA (Symrise group)"],"cloud":["AWS"],"scm":["Kinaxis"],"data":["Tableau","Python"],"mes":["Wonderware"],"lims":["LabWare"],"process_control":["Siemens PCS 7"]}',
  1,
  'https://www.linkedin.com/company/diana-food/',
  '349535099',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  45, 'warm', 1776520000
);

-- Bonduelle
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'af10c3d4-0010-4af0-a100-b0ad00000010',
  'Bonduelle',
  'bonduelle.com',
  'Leader mondial de la transformation de legumes (conserves, surgeles, frais, prets a l''emploi). Entreprise familiale cotee en bourse, presente dans 100 pays avec 56 sites industriels et une ambition forte autour de l''alimentation vegetale durable.',
  'Agri-Food', 'Vegetable Processing',
  'Villeneuve-d''Ascq', 'France', 11500, 2400000000, 2024,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"cloud":["Azure"],"scm":["SAP APO","Blue Yonder"],"data":["Power BI","Alteryx"],"mes":["Rockwell Plex","Wonderware"],"iot":["Rockwell FactoryTalk","ThingWorx"],"quality":["TraceGains"]}',
  1,
  'https://www.linkedin.com/company/bonduelle/',
  '447250044',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  55, 'warm', 1776520000
);


-- ======================================================================
-- 2. NEWS
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all
-- Themes: factory automation, sustainability, digital supply chain
-- ======================================================================

-- ---- Danone News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00001-da01-4000-b001-da0000000001',
  'af10c3d4-0001-4af0-a100-da0000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Danone deploie l''IA pour optimiser sa supply chain laitiere en Europe',
  'Danone a lance un programme de digitalisation de sa chaine d''approvisionnement laitiere en partenariat avec Blue Yonder. L''outil de demand sensing base sur le machine learning permet de reduire les ruptures de 18% et le gaspillage alimentaire de 12% sur les produits frais.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/danone-ia-supply-chain-laitiere-europe-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00001-da02-4000-b001-da0000000002',
  'af10c3d4-0001-4af0-a100-da0000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Danone investit 150 M EUR dans l''automatisation de ses usines en France',
  'Danone a annonce un plan de modernisation de 5 usines francaises (Bailleul, Ferriere-en-Bray, Villecomtal) avec des lignes de conditionnement robotisees, des cobots et un MES Wonderware deploye en standard. L''investissement de 150 M EUR vise 25% de productivite en plus.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/danone-automatisation-usines-france-150-millions-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00001-da03-4000-b001-da0000000003',
  'af10c3d4-0001-4af0-a100-da0000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Danone accelere sa strategie B Corp avec un objectif carbone net zero en 2040',
  'Danone a publie sa feuille de route climatique actualisee visant le net zero carbone sur l''ensemble de sa chaine de valeur d''ici 2040. Le groupe investit dans la methanisation des exploitations laitieres partenaires et l''eco-conception des emballages.',
  'sustainability',
  'https://www.danone.com/impact/planet/carbon-neutrality-roadmap-2026.html',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00001-da04-4000-b001-da0000000004',
  'af10c3d4-0001-4af0-a100-da0000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Danone migre sa plateforme e-commerce B2B vers une architecture cloud-native sur AWS',
  'Danone a finalise la migration de sa plateforme de commandes B2B pour la restauration hors domicile vers une architecture microservices sur AWS. Le projet mobilise 120 developpeurs internes et externes sur Kubernetes et event-driven architecture.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/danone-ecommerce-b2b-cloud-native-aws-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);


-- ---- Lactalis News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00002-la01-4000-b002-1ac000000001',
  'af10c3d4-0002-4af0-a100-1ac000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lactalis lance un programme de tracabilite numerique du lait de la ferme a l''usine',
  'Lactalis deploie une plateforme de tracabilite blockchain-based couvrant l''integralite de la collecte laitiere en France (15 milliards de litres/an). Chaque lot est desormais trace de l''exploitation agricole au conditionnement via des capteurs IoT et la technologie DLT.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/lactalis-tracabilite-blockchain-lait-ferme-usine-2026',
  'positive', 7, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00002-la02-4000-b002-1ac000000002',
  'af10c3d4-0002-4af0-a100-1ac000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lactalis investit 200 M EUR dans la robotisation de ses fromageries europeennes',
  'Le groupe Lactalis modernise 12 fromageries en France et en Italie avec des robots d''affinage, des systemes de palettisation automatises et un MES Siemens Opcenter. Le programme vise a reduire la penibilite et a augmenter la capacite de 20%.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/lactalis-robotisation-fromageries-europe-200-millions-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00002-la03-4000-b002-1ac000000003',
  'af10c3d4-0002-4af0-a100-1ac000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lactalis reduit ses emissions de methane de 30% grace a la methanisation partenaire',
  'Lactalis a deploye 180 unites de methanisation chez ses exploitants partenaires en France, capturant le methane des effluents d''elevage pour produire du biogaz. Le programme couvre 40% de la collecte laitiere francaise du groupe.',
  'sustainability',
  'https://www.lactalis.fr/actualites/reduction-methane-methanisation-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);


-- ---- Bel Group News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00003-be01-4000-b003-be1000000001',
  'af10c3d4-0003-4af0-a100-be1000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bel deploie des jumeaux numeriques dans ses usines pour optimiser la consommation energetique',
  'Bel Group a lance un projet de jumeaux numeriques sur 8 de ses 30 sites de production. Le modele, developpe avec Schneider Electric et heberge sur Azure, simule les flux thermiques et electriques pour reduire la consommation energetique de 15%.',
  'factory_automation',
  'https://www.usine-digitale.fr/article/bel-jumeaux-numeriques-usines-consommation-energetique-2026',
  'positive', 7, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00003-be02-4000-b003-be1000000002',
  'af10c3d4-0003-4af0-a100-be1000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bel Group atteint 50% d''emballages recyclables et vise 100% en 2030',
  'Bel a annonce que 50% de ses emballages sont desormais recyclables ou compostables. Le groupe investit dans de nouveaux materiaux d''emballage a base de cellulose pour remplacer l''aluminium sur La Vache qui rit et Babybel.',
  'sustainability',
  'https://www.groupe-bel.com/en/news/packaging-sustainability-50-percent-2026',
  'positive', 5, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00003-be03-4000-b003-be1000000003',
  'af10c3d4-0003-4af0-a100-be1000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bel digitalise sa supply chain avec Kinaxis pour piloter 30 usines en temps reel',
  'Bel Group a finalise le deploiement de Kinaxis RapidResponse sur l''ensemble de ses 30 sites mondiaux, permettant une planification de la demande et de la production en temps reel. Le projet a reduit les stocks de 12% et ameliore le taux de service de 3 points.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/bel-kinaxis-supply-chain-temps-reel-2026',
  'positive', 7, 1775800000, 1775950000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00003-be04-4000-b003-be1000000004',
  'af10c3d4-0003-4af0-a100-be1000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bel investit 80 M EUR dans une nouvelle usine d''alternatives vegetales en France',
  'Bel a annonce la construction d''une usine dediee aux produits fromagers vegetaux a base de pois et d''avoine, a Vendome. Le site de 15 000 m2 integrera des lignes automatisees et un MES Rockwell Plex.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/bel-usine-alternatives-vegetales-vendome-2026',
  'positive', 6, 1775700000, 1775900000, 1776520000
);


-- ---- Tereos News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00004-te01-4000-b004-7e7e00000001',
  'af10c3d4-0004-4af0-a100-7e7e00000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Tereos modernise ses sucreries avec un programme SCADA unifie sur Schneider EcoStruxure',
  'Tereos a lance un programme de modernisation des systemes de controle-commande de 15 sucreries en France et au Bresil. Le groupe deploie une plateforme SCADA unifiee Schneider EcoStruxure, remplacement des automates vieillissants et integration de capteurs IoT pour la maintenance predictive.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/tereos-scada-schneider-ecostruxure-sucreries-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00004-te02-4000-b004-7e7e00000002',
  'af10c3d4-0004-4af0-a100-7e7e00000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Tereos reduit de 25% sa consommation d''eau grace a des procedes de recyclage en boucle fermee',
  'Tereos a deploye des systemes de recyclage d''eau en boucle fermee dans 8 sucreries francaises, reutilisant l''eau d''extraction des betteraves. Le programme s''inscrit dans l''objectif du groupe de reduire son empreinte hydrique de 40% d''ici 2030.',
  'sustainability',
  'https://www.tereos.com/en/news/water-recycling-closed-loop-sucreries-2026',
  'positive', 5, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00004-te03-4000-b004-7e7e00000003',
  'af10c3d4-0004-4af0-a100-7e7e00000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Tereos lance un portail digital de gestion cooperative connectant 12 000 agriculteurs',
  'Tereos a deploye une plateforme digitale permettant a ses 12 000 cooperateurs-betteraviers de piloter leurs livraisons, consulter les analyses qualite en temps reel et optimiser les calendriers de recolte via des donnees satellitaires et meteorologiques.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/tereos-portail-digital-cooperatif-agriculteurs-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Roquette News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00005-ro01-4000-b005-70c000000001',
  'af10c3d4-0005-4af0-a100-70c000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Roquette inaugure la plus grande usine mondiale de proteines de pois au Canada',
  'Roquette a inaugure son megazine de Portage la Prairie (Manitoba), la plus grande usine de production de proteines de pois au monde (capacite de 125 000 t/an). Le site est entierement automatise avec un MES Siemens Opcenter et un process control Emerson DeltaV.',
  'factory_automation',
  'https://www.roquette.com/media/press-releases/portage-la-prairie-pea-protein-inauguration-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00005-ro02-4000-b005-70c000000002',
  'af10c3d4-0005-4af0-a100-70c000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Roquette deploie SAP IBP pour une planification integree sur 25 sites mondiaux',
  'Roquette a acheve le deploiement de SAP Integrated Business Planning sur l''ensemble de ses 25 sites de production. La solution remplace les anciens outils de planification manuelle et permet une visibilite S&OP en temps reel avec un horizon de 18 mois.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/roquette-sap-ibp-planification-integree-25-sites-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00005-ro03-4000-b005-70c000000003',
  'af10c3d4-0005-4af0-a100-70c000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Roquette vise la neutralite carbone en 2050 avec un programme de biomasse et d''efficacite energetique',
  'Roquette a publie sa strategie climat visant la neutralite carbone en 2050, avec un jalon intermediaire de -30% d''emissions en 2030. Le groupe remplace les chaudieres gaz de son site de Lestrem par de la biomasse et optimise ses procedes d''extraction amidon.',
  'sustainability',
  'https://www.roquette.com/sustainability/carbon-neutrality-roadmap-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);


-- ---- Limagrain News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00006-li01-4000-b006-11a000000001',
  'af10c3d4-0006-4af0-a100-11a000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Limagrain accelere la selection genomique avec une plateforme de phenotypage haut debit',
  'Limagrain a inaugure un centre de phenotypage haut debit a Chappes (Auvergne), couplant imagerie hyperspectrale, IA et robotique pour evaluer 500 000 parcelles experimentales par campagne. La plateforme reduit de 40% le temps de selection varietale.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/limagrain-phenotypage-haut-debit-selection-genomique-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00006-li02-4000-b006-11a000000002',
  'af10c3d4-0006-4af0-a100-11a000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Limagrain digitalise sa logistique semences avec un WMS connecte en temps reel',
  'Limagrain Europe a deploye un systeme de gestion d''entrepot (WMS) connecte couvrant 8 centres de conditionnement de semences. La solution integre le suivi lot par lot, l''automatisation du picking et la tracabilite reglementaire des semences certifiees.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/limagrain-wms-logistique-semences-digitale-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00006-li03-4000-b006-11a000000003',
  'af10c3d4-0006-4af0-a100-11a000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Limagrain s''engage sur des objectifs SBTi et la reduction de 42% de ses emissions d''ici 2030',
  'Limagrain a fait valider ses objectifs climatiques par la Science Based Targets initiative. Le plan prevoit -42% d''emissions directes (scopes 1 et 2) d''ici 2030, avec un focus sur la decarbonation des sites industriels et la reduction des intrants azotes en amont.',
  'sustainability',
  'https://www.limagrain.com/en/news/sbti-targets-emissions-reduction-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);


-- ---- InVivo News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00007-iv01-4000-b007-1a1100000001',
  'af10c3d4-0007-4af0-a100-1a1100000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'InVivo deploie une plateforme d''agriculture de precision Smag pour 200 000 agriculteurs',
  'InVivo Bioline a deploye sa plateforme d''agriculture de precision Smag Farmer aupres de 200 000 exploitations en France. L''outil integre les donnees satellitaires Sentinel-2, les previsions meteo et les modeles agronomiques pour optimiser les intrants et les rendements.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/invivo-smag-agriculture-precision-200000-agriculteurs-2026',
  'positive', 7, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00007-iv02-4000-b007-1a1100000002',
  'af10c3d4-0007-4af0-a100-1a1100000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'InVivo Neovia automatise ses usines d''aliments pour animaux avec des cobots et de l''IA vision',
  'La branche nutrition animale Neovia d''InVivo a equipe 6 usines de cobots Universal Robots et de systemes d''IA vision pour le controle qualite en ligne des granules. Le programme reduit les non-conformites de 35% et la manutention manuelle de 50%.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/invivo-neovia-cobots-ia-vision-usines-aliments-animaux-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00007-iv03-4000-b007-1a1100000003',
  'af10c3d4-0007-4af0-a100-1a1100000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'InVivo s''engage vers la transition agroecologique avec un fonds de 100 M EUR',
  'InVivo a cree un fonds de 100 M EUR dedie a la transition agroecologique, financant des biosolutions alternatives aux pesticides, la couverture des sols et les circuits courts proteines vegetales. L''objectif est de convertir 30% des surfaces cooperatrices en agroecologie d''ici 2030.',
  'sustainability',
  'https://www.invivo-group.com/actualites/fonds-transition-agroecologique-100-millions-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);


-- ---- Lesaffre News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00008-le01-4000-b008-1e5a00000001',
  'af10c3d4-0008-4af0-a100-1e5a00000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lesaffre automatise ses fermenteurs avec des jumeaux numeriques et du process control avance',
  'Lesaffre a deploye des jumeaux numeriques sur ses fermenteurs industriels dans 12 usines mondiales. Le modele numerique, couple a un controle de procede avance (APC) Emerson, optimise en continu les parametres de fermentation et ameliore le rendement levurier de 8%.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/lesaffre-jumeaux-numeriques-fermenteurs-process-control-2026',
  'positive', 8, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00008-le02-4000-b008-1e5a00000002',
  'af10c3d4-0008-4af0-a100-1e5a00000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lesaffre deploie SAP S/4HANA sur 96 sites pour unifier sa gestion industrielle',
  'Lesaffre a acheve la migration vers SAP S/4HANA sur l''ensemble de ses 96 sites de production. Le programme, etalé sur 3 ans, unifie la gestion des achats matieres premieres, la planification de production et la tracabilite reglementaire a l''echelle mondiale.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/lesaffre-sap-s4hana-96-sites-gestion-industrielle-2026',
  'positive', 7, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00008-le03-4000-b008-1e5a00000003',
  'af10c3d4-0008-4af0-a100-1e5a00000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lesaffre reduit ses emissions industrielles de 20% grace a la biomasse et a la recuperation de chaleur',
  'Lesaffre a annonce une reduction de 20% de ses emissions de CO2 industrielles depuis 2020. Le groupe a converti 15 chaudieres gaz a la biomasse et deploye des echangeurs de chaleur sur les effluents de fermentation dans ses plus grosses usines.',
  'sustainability',
  'https://www.lesaffre.com/sustainability/emissions-reduction-biomass-heat-recovery-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00008-le04-4000-b008-1e5a00000004',
  'af10c3d4-0008-4af0-a100-1e5a00000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lesaffre investit dans les biotechnologies de precision pour la fermentation non-alimentaire',
  'Lesaffre a ouvert un centre R&D de 50 M EUR a Marcq-en-Baroeul dedie a la fermentation de precision pour des applications non-alimentaires : bio-ethanol avance, enzymes industrielles et ingredients pharmaceutiques. Le centre emploie 200 chercheurs et ingenieurs.',
  'digital_transformation',
  'https://www.lesaffre.com/media/rd-center-precision-fermentation-non-food-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);


-- ---- Diana Food (Symrise) News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00009-di01-4000-b009-d1a000000001',
  'af10c3d4-0009-4af0-a100-d1a000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Diana Food automatise ses lignes d''extraction vegetale avec des systemes de controle Siemens PCS 7',
  'Diana Food a acheve la modernisation de ses 3 usines d''extraction vegetale en Bretagne avec des systemes de controle distribue Siemens PCS 7. L''automatisation permet un pilotage en continu des parametres d''extraction (temperature, pression, solvant) et ameliore la qualite produit.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/diana-food-automatisation-extraction-vegetale-siemens-pcs7-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00009-di02-4000-b009-d1a000000002',
  'af10c3d4-0009-4af0-a100-d1a000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Diana Food deploie une plateforme de tracabilite fournisseurs couvrant 5 000 exploitations agricoles',
  'Diana Food a lance une plateforme numerique de tracabilite couvrant 5 000 exploitations agricoles partenaires en France et au Maroc. L''outil trace l''origine des matieres premieres (fruits, legumes, herbes), les pratiques agricoles et les certifications bio en temps reel.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/diana-food-tracabilite-fournisseurs-5000-exploitations-2026',
  'positive', 6, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00009-di03-4000-b009-d1a000000003',
  'af10c3d4-0009-4af0-a100-d1a000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Diana Food s''engage dans l''agriculture regeneratrice pour 100% de ses approvisionnements en fruits d''ici 2030',
  'Diana Food (Symrise) a annonce un programme d''agriculture regeneratrice couvrant l''integralite de ses approvisionnements en fruits d''ici 2030. Le plan prevoit la conversion de 5 000 hectares en pratiques de couverture des sols, rotation et biodiversite.',
  'sustainability',
  'https://www.diana-food.com/news/regenerative-agriculture-fruits-2030-commitment-2026',
  'positive', 5, 1775800000, 1776000000, 1776520000
);


-- ---- Bonduelle News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00010-bo01-4000-b010-b0ad00000001',
  'af10c3d4-0010-4af0-a100-b0ad00000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bonduelle deploie des robots de tri optique et de palettisation dans 15 usines',
  'Bonduelle a equipe 15 de ses 56 usines de robots de tri optique (TOMRA) et de palettisation automatisee. Le programme couvre les lignes de conserves et de surgeles en France, Hongrie et Canada, et reduit de 40% les operations de manutention manuelle.',
  'factory_automation',
  'https://www.usinenouvelle.com/article/bonduelle-robots-tri-optique-palettisation-15-usines-2026',
  'positive', 8, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00010-bo02-4000-b010-b0ad00000002',
  'af10c3d4-0010-4af0-a100-b0ad00000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bonduelle lance un plan de migration SAP S/4HANA pour unifier 56 sites industriels',
  'Bonduelle a demarre son programme de migration vers SAP S/4HANA, visant l''unification de la gestion de ses 56 sites mondiaux d''ici 2029. Le programme mobilise 300 consultants internes et externes avec un budget estime a 120 M EUR.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/bonduelle-migration-sap-s4hana-56-sites-2026',
  'positive', 7, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00010-bo03-4000-b010-b0ad00000003',
  'af10c3d4-0010-4af0-a100-b0ad00000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bonduelle reduit son empreinte hydrique de 20% grace a des capteurs IoT sur les lignes de lavage',
  'Bonduelle a deploye des capteurs IoT Rockwell FactoryTalk sur l''ensemble de ses lignes de lavage de legumes. Les donnees en temps reel permettent d''optimiser les volumes d''eau et de detecter les fuites, reduisant la consommation de 20% sur les sites pilotes.',
  'sustainability',
  'https://www.bonduelle.com/en/news/water-footprint-iot-sensors-washing-lines-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'naf00010-bo04-4000-b010-b0ad00000004',
  'af10c3d4-0010-4af0-a100-b0ad00000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bonduelle pilote la tracabilite blockchain de ses legumes du champ a l''assiette',
  'Bonduelle teste une solution de tracabilite blockchain sur 3 filieres (haricots verts, petits pois, mais doux) en France. Le systeme connecte les exploitations agricoles, les usines de transformation et les distributeurs pour garantir la transparence sur l''origine et les pratiques culturales.',
  'digital_supply_chain',
  'https://www.usine-digitale.fr/article/bonduelle-tracabilite-blockchain-legumes-champ-assiette-2026',
  'positive', 5, 1775700000, 1775950000, 1776520000
);


-- ======================================================================
-- 3. PROSPECT SCORES
-- sector_alignment LOW (Agri-Food is not ALTEN's core), digital_transformation MEDIUM
-- total_score range: 35-55
-- ======================================================================

-- Danone prospect_scores (total=52, warm)
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
  'ps-dan01-0001-4af0-c001-da0000000001',
  'af10c3d4-0001-4af0-a100-da0000000001',
  3, 2, 7, 5,
  6, 3, 8, 6,
  4, 5, 5, 4,
  2, 3, 5, 3, 5,
  4, 3, 3, 4,
  4, 5, 4, 4, 5,
  5, 6, 6, 5,
  6, 5, 5, 5,
  4, 4, 6,
  5, 4, 3, 5, 5,
  5, 1, 4,
  3, 3, 5,
  52, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Lactalis prospect_scores (total=42, cold)
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
  'ps-lac02-0002-4af0-c002-1ac000000002',
  'af10c3d4-0002-4af0-a100-1ac000000002',
  2, 2, 7, 3,
  3, 2, 7, 5,
  3, 3, 5, 3,
  1, 2, 5, 4, 3,
  3, 3, 2, 3,
  3, 4, 3, 3, 4,
  5, 4, 5, 4,
  5, 5, 3, 3,
  3, 5, 3,
  5, 4, 3, 5, 4,
  4, 1, 5,
  3, 2, 4,
  42, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Bel Group prospect_scores (total=48, warm)
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
  'ps-bel03-0003-4af0-c003-be1000000003',
  'af10c3d4-0003-4af0-a100-be1000000003',
  3, 2, 5, 4,
  5, 3, 7, 5,
  4, 4, 5, 4,
  2, 3, 4, 3, 4,
  3, 3, 3, 4,
  3, 5, 3, 3, 4,
  6, 6, 5, 5,
  6, 5, 4, 4,
  3, 4, 5,
  4, 4, 3, 5, 5,
  5, 1, 5,
  3, 2, 5,
  48, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Tereos prospect_scores (total=38, cold)
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
  'ps-ter04-0004-4af0-c004-7e7e00000004',
  'af10c3d4-0004-4af0-a100-7e7e00000004',
  2, 2, 5, 3,
  3, 3, 6, 4,
  3, 3, 4, 3,
  1, 2, 4, 3, 2,
  2, 2, 2, 3,
  3, 3, 3, 2, 3,
  4, 3, 3, 4,
  5, 3, 2, 3,
  2, 3, 2,
  4, 4, 3, 5, 4,
  4, 1, 4,
  2, 3, 3,
  38, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Roquette prospect_scores (total=47, warm)
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
  'ps-roq05-0005-4af0-c005-70c000000005',
  'af10c3d4-0005-4af0-a100-70c000000005',
  3, 2, 5, 5,
  4, 3, 7, 5,
  4, 5, 5, 4,
  2, 3, 4, 3, 4,
  4, 3, 3, 3,
  4, 5, 3, 3, 4,
  6, 5, 5, 5,
  5, 5, 4, 4,
  3, 3, 5,
  4, 3, 3, 5, 4,
  4, 1, 5,
  3, 2, 4,
  47, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Limagrain prospect_scores (total=40, cold)
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
  'ps-lim06-0006-4af0-c006-11a000000006',
  'af10c3d4-0006-4af0-a100-11a000000006',
  2, 2, 5, 5,
  3, 3, 7, 4,
  3, 5, 3, 3,
  1, 3, 3, 2, 2,
  3, 2, 2, 3,
  4, 4, 3, 3, 3,
  4, 5, 3, 4,
  5, 3, 2, 3,
  2, 2, 3,
  3, 3, 2, 4, 3,
  3, 1, 4,
  2, 2, 4,
  40, 'cold',
  1776520000, 1776520000, 1776520000
);

-- InVivo prospect_scores (total=41, cold)
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
  'ps-inv07-0007-4af0-c007-1a1100000007',
  'af10c3d4-0007-4af0-a100-1a1100000007',
  2, 2, 5, 3,
  5, 3, 6, 4,
  3, 3, 4, 3,
  1, 3, 4, 3, 2,
  3, 2, 2, 3,
  3, 4, 3, 3, 3,
  4, 4, 4, 4,
  5, 3, 3, 4,
  3, 4, 3,
  3, 3, 3, 5, 4,
  4, 1, 4,
  2, 2, 4,
  41, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Lesaffre prospect_scores (total=50, warm)
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
  'ps-les08-0008-4af0-c008-1e5a00000008',
  'af10c3d4-0008-4af0-a100-1e5a00000008',
  3, 2, 5, 5,
  5, 3, 7, 5,
  4, 5, 5, 4,
  2, 3, 4, 3, 5,
  4, 3, 3, 4,
  5, 5, 3, 4, 4,
  5, 5, 6, 5,
  6, 6, 4, 5,
  3, 4, 5,
  5, 4, 3, 5, 5,
  4, 1, 5,
  3, 2, 5,
  50, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Diana Food (Symrise) prospect_scores (total=45, warm)
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
  'ps-dia09-0009-4af0-c009-d1a000000009',
  'af10c3d4-0009-4af0-a100-d1a000000009',
  3, 2, 4, 4,
  4, 3, 6, 5,
  4, 4, 4, 3,
  2, 2, 3, 3, 4,
  3, 3, 2, 3,
  4, 4, 3, 3, 4,
  4, 5, 4, 4,
  5, 4, 3, 4,
  3, 3, 5,
  4, 3, 3, 5, 4,
  4, 1, 5,
  3, 2, 4,
  45, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Bonduelle prospect_scores (total=55, warm)
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
  'ps-bon10-0010-4af0-c010-b0ad00000010',
  'af10c3d4-0010-4af0-a100-b0ad00000010',
  3, 2, 5, 4,
  5, 3, 7, 5,
  5, 4, 5, 4,
  2, 3, 5, 4, 5,
  4, 4, 3, 4,
  4, 5, 4, 4, 4,
  5, 5, 6, 5,
  6, 6, 5, 5,
  4, 4, 6,
  5, 5, 3, 5, 5,
  5, 1, 5,
  4, 3, 5,
  55, 'warm',
  1776520000, 1776520000, 1776520000
);
