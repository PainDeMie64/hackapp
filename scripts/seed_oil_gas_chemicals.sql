-- =============================================================================
-- SEED: 10 French Oil/Gas/Chemicals Companies
-- TotalEnergies Raffinage, Arkema, Solvay France, Air Liquide, BASF France,
-- Axens (IFP Energies), Technip Energies, Vallourec, Eramet, Imerys
-- Timestamp: 1776520000 (all created_at/updated_at)
-- Sector: Oil/Gas/Chemicals
-- source_id: 00238d74-63da-4b37-88cb-ff4357db7e13
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. TotalEnergies Raffinage
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b01',
  'TotalEnergies Raffinage',
  'totalenergies.com/raffinage',
  'Branche raffinage de TotalEnergies operant 5 raffineries en France (Donges, Gonfreville, Feyzin, Grandpuits reconversion, La Mede bioraffinerie). Capacite de 900 000 barils/jour, en pleine transition vers les biocarburants et la decarbonation.',
  'Oil/Gas/Chemicals', 'Refining & Petrochemicals',
  'Gonfreville-l''Orcher', 'France', 12000, 42000000000, 2024,
  '{"erp":["SAP S/4HANA"],"scada":["Honeywell Experion","Yokogawa CENTUM VP"],"mes":["Aveva MES","OSIsoft PI"],"simulation":["Aspen HYSYS","PRO/II"],"cloud":["AWS","Azure"],"iot":["Aveva PI","Azure IoT Hub"],"cybersecurity":["Palo Alto Prisma","CrowdStrike"],"analytics":["Palantir Foundry","Dataiku"]}',
  1,
  'https://www.linkedin.com/company/totalenergies/',
  '542051180',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  62, 'warm', 1776520000
);

-- 2. Arkema
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b02',
  'Arkema',
  'arkema.com',
  'Leader mondial de la chimie de specialites: materiaux avances (Kynar PVDF, Rilsan polyamides bio-sources), adhesifs (Bostik) et coating solutions. 55 sites industriels en France, fort investissement en chimie verte et batteries.',
  'Oil/Gas/Chemicals', 'Specialty Chemicals',
  'Colombes', 'France', 21100, 9500000000, 2024,
  '{"erp":["SAP S/4HANA"],"plm":["Dassault ENOVIA"],"mes":["Siemens Opcenter","Wonderware"],"lims":["LabWare"],"simulation":["Aspen Plus","COMSOL"],"cloud":["Azure","AWS"],"cybersecurity":["Fortinet","Zscaler"],"analytics":["Power BI","Dataiku"]}',
  1,
  'https://www.linkedin.com/company/arkema/',
  '445074685',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 3. Solvay France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b03',
  'Solvay France',
  'solvay.com',
  'Filiale francaise du groupe Syensqo/Solvay, specialisee dans les materiaux composites avances, silice de specialite et chimie du fluor. Sites majeurs a Tavaux (Jura), Salindres (Gard) et Lyon. Fournisseur cle de l''aeronautique et de l''automobile.',
  'Oil/Gas/Chemicals', 'Specialty Chemicals & Composites',
  'Lyon', 'France', 6500, 4200000000, 2024,
  '{"erp":["SAP ECC","S/4HANA migration"],"lims":["Thermo Fisher SampleManager"],"mes":["GE Proficy","Wonderware"],"simulation":["ANSYS","Abaqus"],"plm":["Siemens Teamcenter"],"cloud":["Azure"],"cybersecurity":["CrowdStrike","Fortinet"],"analytics":["Tableau","Python"]}',
  1,
  'https://www.linkedin.com/company/solvay/',
  '552117251',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  60, 'warm', 1776520000
);

-- 4. Air Liquide
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b04',
  'Air Liquide',
  'airliquide.com',
  'Leader mondial des gaz industriels et medicaux, present dans 73 pays. Pionnier de l''hydrogene bas-carbone avec 50 unites de production. Investissements massifs dans les electrolyseurs, le CCUS et la cryogenie pour semi-conducteurs.',
  'Oil/Gas/Chemicals', 'Industrial Gases & Hydrogen',
  'Paris', 'France', 67100, 27600000000, 2024,
  '{"erp":["SAP S/4HANA"],"scada":["Emerson DeltaV","ABB Ability 800xA"],"mes":["Aveva MES"],"iot":["ThingWorx","Azure IoT Hub","OSIsoft PI"],"cloud":["Azure","AWS"],"simulation":["Aspen HYSYS","gPROMS"],"cybersecurity":["Palo Alto","CrowdStrike"],"analytics":["Databricks","Dataiku","Power BI"],"ai_ml":["TensorFlow","Azure ML"]}',
  1,
  'https://www.linkedin.com/company/airliquide/',
  '552096281',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 5. BASF France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b05',
  'BASF France',
  'basf.com/fr',
  'Filiale francaise du premier chimiste mondial. Sites de production a Chalampee (Alsace), Mourenx (Pyrenees-Atlantiques) et Lyon. Activites: catalyseurs automobiles, chimie agricole, materiaux de construction, coatings et additifs plastiques.',
  'Oil/Gas/Chemicals', 'Diversified Chemicals',
  'Levallois-Perret', 'France', 3800, 2900000000, 2024,
  '{"erp":["SAP S/4HANA"],"mes":["Siemens Opcenter"],"lims":["LabWare LIMS"],"simulation":["Aspen Plus","Materials Studio"],"cloud":["AWS","Azure"],"scada":["Siemens PCS7"],"cybersecurity":["CrowdStrike","Zscaler"],"analytics":["Power BI","Qlik"]}',
  1,
  'https://www.linkedin.com/company/basf/',
  '562006312',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'warm', 1776520000
);

-- 6. Axens (IFP Energies)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b06',
  'Axens',
  'axens.net',
  'Filiale technologique d''IFP Energies nouvelles, leader mondial des technologies de raffinage, petrochimie et conversion de la biomasse. Fournisseur de catalyseurs, adsorbants et licences de procedes pour la transition energetique.',
  'Oil/Gas/Chemicals', 'Process Technology & Catalysts',
  'Rueil-Malmaison', 'France', 2600, 1100000000, 2024,
  '{"erp":["SAP ECC"],"simulation":["Aspen HYSYS","PRO/II","FLUIDPACK"],"cad":["AutoCAD","SolidWorks"],"lims":["LabWare"],"cloud":["Azure"],"plm":["Windchill"],"cybersecurity":["Fortinet","Stormshield"],"analytics":["Python","MATLAB","Power BI"]}',
  1,
  'https://www.linkedin.com/company/axens/',
  '443912993',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  65, 'warm', 1776520000
);

-- 7. Technip Energies
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b07',
  'Technip Energies',
  'technipenergies.com',
  'Leader mondial de l''ingenierie et des technologies pour l''industrie energetique: LNG, hydrogene, ethylene, chimie durable et CCUS. Carnet de commandes de 15 Mds EUR. Coentreprise Inaugure pour les plateformes flottantes.',
  'Oil/Gas/Chemicals', 'Engineering & Technology',
  'Nanterre', 'France', 15000, 6900000000, 2024,
  '{"erp":["SAP S/4HANA"],"cad":["AVEVA E3D","SmartPlant 3D","AutoCAD Plant 3D"],"plm":["Aveva NET","Hexagon SDx2"],"simulation":["Aspen HYSYS","HTRI","Flaresim"],"cloud":["Azure","AWS"],"project_mgmt":["Primavera P6","Microsoft Project"],"cybersecurity":["CrowdStrike","Palo Alto"],"analytics":["Power BI","Databricks"]}',
  1,
  'https://www.linkedin.com/company/technipenergies/',
  '500055490',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  70, 'warm', 1776520000
);

-- 8. Vallourec
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b08',
  'Vallourec',
  'vallourec.com',
  'Leader mondial des solutions tubulaires premium pour l''industrie energetique: tubes sans soudure pour puits petroliers et gaziers, centrales thermiques et nucleaires, et captage de CO2. Usines a Aulnoye-Aymeries, Saint-Saulve et Deville-les-Rouen.',
  'Oil/Gas/Chemicals', 'Tubular Solutions & Oilfield',
  'Meudon', 'France', 17000, 5200000000, 2024,
  '{"erp":["SAP S/4HANA"],"mes":["Siemens Opcenter"],"scada":["Siemens WinCC","ABB Ability"],"simulation":["ANSYS","Abaqus","FORGE NxT"],"cad":["CATIA V5","SolidWorks"],"cloud":["Azure"],"iot":["ThingWorx","Azure IoT"],"cybersecurity":["Fortinet","CrowdStrike"],"analytics":["Power BI","Dataiku"]}',
  1,
  'https://www.linkedin.com/company/vallourec/',
  '552142200',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  63, 'warm', 1776520000
);

-- 9. Eramet
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b09',
  'Eramet',
  'eramet.com',
  'Groupe minier et metallurgique francais: manganese (n1 mondial hors Chine), nickel, lithium et sables mineraux. Projet de lithium en Argentine pour batteries electriques. Usines de transformation a Dunkerque, Sandouville et Clermont-Ferrand.',
  'Oil/Gas/Chemicals', 'Mining & Metallurgy',
  'Paris', 'France', 10800, 3600000000, 2024,
  '{"erp":["SAP S/4HANA"],"mes":["Wonderware","GE Proficy"],"scada":["ABB Ability 800xA","Schneider EcoStruxure"],"simulation":["Metsim","HSC Chemistry"],"cloud":["Azure","OVHcloud"],"iot":["OSIsoft PI","Azure IoT Hub"],"cybersecurity":["Fortinet","Stormshield"],"analytics":["Power BI","Python","Dataiku"]}',
  1,
  'https://www.linkedin.com/company/eramet/',
  '632045381',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  67, 'warm', 1776520000
);

-- 10. Imerys
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b10',
  'Imerys',
  'imerys.com',
  'Leader mondial des specialites minerales: kaolin, carbonate de calcium, talc, graphite et diatomees. Fournisseur cle de l''industrie ceramique, papetiere, automobile et des batteries lithium-ion. Projet de mine de lithium en Allier.',
  'Oil/Gas/Chemicals', 'Specialty Minerals',
  'Paris', 'France', 13700, 3800000000, 2024,
  '{"erp":["SAP S/4HANA"],"mes":["Wonderware MES"],"scada":["Schneider EcoStruxure","Siemens WinCC"],"simulation":["ANSYS Fluent","Rocky DEM"],"cloud":["Azure","AWS"],"iot":["ThingWorx","OSIsoft PI"],"cybersecurity":["Zscaler","Fortinet"],"analytics":["Power BI","Qlik","Dataiku"]}',
  1,
  'https://www.linkedin.com/company/imerys/',
  '562008060',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  66, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all
-- Themes: Decarbonation, plant modernization, REACH compliance

-- ---- TotalEnergies Raffinage News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-aa01-4000-b010-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies Raffinage investit 500 M EUR pour la conversion de Grandpuits en bioraffinerie',
  'La reconversion du site de Grandpuits-Bailly-Carrois en bioraffinerie avance avec un investissement de 500 M EUR. Le site produira du SAF (carburant aviation durable), des bioplastiques et du biogazole a partir d''huiles usagees et de graisses animales des 2027.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/totalenergies-grandpuits-bioraffinerie-conversion-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-aa01-4000-b010-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Modernisation de la raffinerie de Donges: nouveau systeme de controle distribue Honeywell Experion',
  'TotalEnergies Raffinage deploie le DCS Honeywell Experion sur l''ensemble de la raffinerie de Donges (Loire-Atlantique), remplacant les automates vieillissants. Le programme de 120 M EUR inclut la cybersecurite OT et la migration des boucles de regulation.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/totalenergies-donges-modernisation-dcs-honeywell-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-aa01-4000-b010-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH 2026: TotalEnergies Raffinage adapte ses procedes pour la restriction des PFAS',
  'Face a la proposition de restriction universelle des PFAS par l''ECHA, TotalEnergies Raffinage investit 80 M EUR pour modifier ses procedes de traitement des eaux et eliminer les tensioactifs fluores de ses raffineries francaises d''ici 2028.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/totalenergies-reach-pfas-raffineries-2026',
  'neutral', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-aa01-4000-b010-ogc000000004',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Feyzin: captage de CO2 industriel sur la raffinerie en partenariat avec Air Liquide',
  'TotalEnergies Raffinage et Air Liquide lancent un pilote de captage de CO2 sur le site de Feyzin (Rhone) visant 400 000 t CO2/an. Le projet s''inscrit dans le plan de decarbonation de la Vallee de la Chimie lyonnaise finance par France 2030.',
  'decarbonation',
  'https://www.lesechos.fr/industrie-services/energie-environnement/feyzin-ccus-totalenergies-air-liquide-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

-- ---- Arkema News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10002-bb02-4000-b020-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Arkema investit 1 Md EUR dans le PVDF pour batteries lithium-ion en France et Chine',
  'Arkema triple sa capacite mondiale de production de PVDF Kynar avec de nouvelles lignes a Pierre-Benite (Rhone) et Changshu (Chine). Le PVDF est un liant essentiel pour les electrodes de batteries lithium-ion destinees aux vehicules electriques.',
  'plant_modernization',
  'https://www.usinenouvelle.com/article/arkema-pvdf-batteries-investissement-milliard-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10002-bb02-4000-b020-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Arkema accelere la chimie bio-sourcee: nouvelle usine de polyamides Rilsan a Mont (Landes)',
  'Arkema inaugure une extension de l''usine de Rilsan (polyamide 11 bio-source a partir d''huile de ricin) a Mont dans les Landes. L''investissement de 200 M EUR repond a la demande croissante en materiaux durables pour l''automobile et le sport.',
  'decarbonation',
  'https://www.lesechos.fr/industrie-services/chimie-pharmacie/arkema-rilsan-bio-source-mont-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10002-bb02-4000-b020-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Arkema substitue les solvants chlores sur son site de Jarrie',
  'En anticipation du renforcement de la reglementation REACH sur les solvants chlores, Arkema investit 45 M EUR pour convertir ses procedes du site de Jarrie (Isere) vers des solvants verts. Le projet elimine 12 000 tonnes/an de dichloromethane.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/arkema-reach-solvants-chlores-jarrie-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10002-bb02-4000-b020-ogc000000004',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Arkema deploie l''IA predictive et les jumeaux numeriques sur ses 55 sites francais',
  'Arkema lance un programme de digitalisation industrielle de 150 M EUR avec Siemens et Dataiku pour deployer des jumeaux numeriques et de la maintenance predictive sur l''ensemble de ses sites de production francais d''ici 2028.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/arkema-jumeaux-numeriques-ia-predictive-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

-- ---- Solvay France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10003-cc03-4000-b030-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Solvay France investit 300 M EUR dans la decarbonation de son site de Tavaux',
  'Solvay lance un programme de decarbonation de 300 M EUR pour le site de Tavaux (Jura), incluant le remplacement des chaudieres au gaz par des pompes a chaleur industrielles et l''installation de panneaux solaires sur 15 hectares. Objectif: -60% CO2 d''ici 2030.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/solvay-tavaux-decarbonation-investissement-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10003-cc03-4000-b030-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Solvay France modernise ses systemes de controle-commande a Salindres et Tavaux',
  'Solvay France engage la migration de ses DCS obsoletes vers Emerson DeltaV sur les sites de Salindres (Gard) et Tavaux (Jura). Le budget de 90 M EUR couvre le remplacement de 500 boucles de regulation et la mise en conformite cybersecurite NIS2.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/solvay-france-modernisation-dcs-emerson-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10003-cc03-4000-b030-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Solvay France reformule ses produits fluorochimiques pour se conformer aux restrictions PFAS',
  'Suite a la proposition de restriction universelle des PFAS par l''ECHA, Solvay France engage un programme R&D de 60 M EUR pour developper des alternatives non-fluorees pour ses applications en traitement de surface et repulsifs textiles.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/solvay-france-reach-pfas-reformulation-2026',
  'neutral', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Air Liquide News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10004-dd04-4000-b040-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide investit 2 Mds EUR dans l''hydrogene bas-carbone en Normandie',
  'Air Liquide a annonce la construction du plus grand electrolyseur d''Europe (200 MW) a Port-Jerome en Normandie, alimente par l''eolien offshore et le nucleaire. L''installation produira 28 000 tonnes d''hydrogene vert par an pour le raffinage et la chimie.',
  'decarbonation',
  'https://www.lesechos.fr/industrie-services/energie-environnement/air-liquide-hydrogene-normandie-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10004-dd04-4000-b040-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide modernise ses ASU avec des jumeaux numeriques et l''IA predictive',
  'Air Liquide deploie des jumeaux numeriques sur 200 unites de separation d''air (ASU) dans le monde. Le programme ADVANCE, developpe avec Databricks et Azure ML, optimise la consommation energetique et reduit les arrets non planifies de 25%.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/air-liquide-jumeaux-numeriques-asu-ia-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10004-dd04-4000-b040-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide et le CCUS: captage de 8 Mt CO2/an dans les bassins industriels francais',
  'Air Liquide pilote le projet D''Artagnan de CCUS dans le bassin de Dunkerque avec un objectif de captage de 8 Mt de CO2/an d''ici 2030. Le CO2 sera transporte par pipeline et stocke en mer du Nord. France 2030 finance 400 M EUR du projet.',
  'decarbonation',
  'https://www.reuters.com/business/air-liquide-ccus-dunkerque-dartagnan-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10004-dd04-4000-b040-ogc000000004',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Air Liquide adapte ses gaz de specialite aux nouvelles restrictions sur les fluorocarbures',
  'Air Liquide reformule sa gamme de gaz de specialite pour semi-conducteurs afin de se conformer aux restrictions REACH sur les gaz fluores (SF6, NF3). L''investissement de 35 M EUR cible les gaz alternatifs a faible GWP.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/air-liquide-reach-gaz-fluores-semi-conducteurs-2026',
  'neutral', 6, 1775700000, 1775950000, 1776520000
);

-- ---- BASF France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10005-ee05-4000-b050-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b05',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'BASF France decarbone son site de Chalampee avec la biomasse et l''electrification',
  'BASF France investit 180 M EUR pour electrifier les procedes thermiques et installer une chaudiere biomasse de 50 MW sur le site de Chalampee (Alsace). Le programme vise une reduction de 40% des emissions de CO2 du site d''ici 2030.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/basf-chalampee-decarbonation-electrification-2026',
  'positive', 7, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10005-ee05-4000-b050-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b05',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'BASF France modernise ses lignes de production de catalyseurs a Lyon avec l''Industrie 4.0',
  'BASF France deploie des solutions Industrie 4.0 (MES Siemens Opcenter, capteurs IoT, vision par IA) sur ses lignes de catalyseurs automobiles a Lyon. L''investissement de 60 M EUR augmente la capacite de 30% et reduit les rebuts de 50%.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/basf-lyon-catalyseurs-industrie-4-0-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10005-ee05-4000-b050-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b05',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH 2026: BASF France engage la substitution de ses phtalates et isocyanates restreints',
  'BASF France investit 50 M EUR dans un programme R&D pour reformuler ses plastifiants et polyurethanes suite aux restrictions REACH renforcees sur les phtalates (DEHP) et les isocyanates (MDI/TDI). 200 formulations doivent etre adaptees d''ici 2028.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/basf-france-reach-phtalates-isocyanates-2026',
  'neutral', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Axens News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10006-ff06-4000-b060-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b06',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Axens lance une nouvelle generation de catalyseurs pour le SAF et les e-fuels',
  'Axens, filiale d''IFP Energies nouvelles, a developpe un catalyseur Fischer-Tropsch de nouvelle generation permettant de convertir le CO2 capture en carburants synthetiques (e-fuels) avec un rendement ameliore de 15%. 3 licences vendues en Europe.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/axens-catalyseurs-saf-efuels-fischer-tropsch-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10006-ff06-4000-b060-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b06',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Axens modernise son centre de R&D de Solaize avec des pilotes semi-industriels automatises',
  'Axens investit 70 M EUR pour moderniser son centre de recherche de Solaize (Rhone) avec des pilotes de procedes entierement automatises et instrumentes (300 capteurs IoT par unite). Le programme inclut un laboratoire d''analyse en ligne LIMS integre.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/axens-solaize-modernisation-pilotes-automatises-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10006-ff06-4000-b060-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b06',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Axens developpe des adsorbants sans cobalt pour le raffinage et la petrochimie',
  'Axens lance une gamme d''adsorbants et catalyseurs sans cobalt ni nickel pour anticiper les restrictions REACH sur les metaux CMR. Le programme R&D de 25 M EUR cible les unites d''hydrotraitement et d''hydrocraquage mondiales.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/axens-reach-catalyseurs-sans-cobalt-2026',
  'neutral', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Technip Energies News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10007-0707-4000-b070-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Technip Energies remporte un contrat de 3 Mds EUR pour une usine de GNL bas-carbone au Qatar',
  'Technip Energies a ete selectionne par QatarEnergy pour l''ingenierie et la construction d''un nouveau train de liquefaction de GNL de 8 Mtpa integrant le captage de CO2. Le contrat EPCC de 3 Mds EUR s''etale sur 5 ans.',
  'decarbonation',
  'https://www.reuters.com/business/energy/technip-energies-qatar-lng-ccus-contract-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10007-0707-4000-b070-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Technip Energies lance Bloom, sa plateforme de conception d''usines chimiques durables',
  'Technip Energies a developpe Bloom, une plateforme digitale de conception integree qui optimise la performance environnementale des usines chimiques des la phase d''avant-projet. L''outil combine analyse de cycle de vie et simulation de procedes.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/technip-energies-bloom-conception-usines-durables-2026',
  'positive', 7, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10007-0707-4000-b070-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Technip Energies recrute 2000 ingenieurs procedes pour ses projets de transition energetique',
  'Face a un carnet de commandes record de 15 Mds EUR, Technip Energies recrute 2000 ingenieurs procedes, instrumentistes et automaticiens en France sur 2026-2027. Le groupe ouvre un centre d''ingenierie a Lyon dedie a l''hydrogene et au CCUS.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/technip-energies-recrutement-ingenieurs-transition-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10007-0707-4000-b070-ogc000000004',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Technip Energies integre la conformite chimique dans ses modeles d''ingenierie',
  'Technip Energies a developpe un module de conformite REACH integre a ses outils de conception (AVEVA E3D, SmartPlant 3D). Le systeme verifie automatiquement la compatibilite des materiaux et fluides de procede avec les restrictions REACH en vigueur.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/technip-energies-reach-conformite-ingenierie-2026',
  'neutral', 6, 1775700000, 1775950000, 1776520000
);

-- ---- Vallourec News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10008-0808-4000-b080-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b08',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Vallourec investit 400 M EUR dans l''acier vert a Aulnoye-Aymeries avec des fours electriques',
  'Vallourec remplace ses fours a gaz par des fours a arc electrique sur son site d''Aulnoye-Aymeries (Nord). L''investissement de 400 M EUR reduira les emissions de CO2 de 45% et permettra l''utilisation de 80% de ferraille recyclee.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/vallourec-aulnoye-acier-vert-fours-electriques-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10008-0808-4000-b080-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b08',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Vallourec deploie l''Industrie 4.0 sur ses laminoirs: capteurs IoT et controle qualite par IA',
  'Vallourec modernise ses laminoirs de Saint-Saulve et Deville-les-Rouen avec 5000 capteurs IoT ThingWorx, un controle qualite par vision IA et des jumeaux numeriques ANSYS. Le programme de 120 M EUR augmente le rendement de 15%.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/vallourec-industrie-4-0-laminoirs-iot-ia-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10008-0808-4000-b080-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b08',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Vallourec developpe des tubes premium pour le stockage souterrain de CO2 et d''hydrogene',
  'Vallourec lance une gamme de tubes sans soudure en acier haute resistance pour les puits d''injection de CO2 et le stockage souterrain d''hydrogene. Les nouveaux alliages resistent a la fragilisation par l''hydrogene jusqu''a 700 bars.',
  'decarbonation',
  'https://www.usinenouvelle.com/article/vallourec-tubes-stockage-co2-hydrogene-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Eramet News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10009-0909-4000-b090-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b09',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Eramet lance la production de lithium battery-grade en Argentine pour le marche europeen',
  'Eramet a inaugure son usine d''extraction directe de lithium (DLE) a Centenario (Argentine) avec une capacite de 24 000 tonnes de LCE/an. Le lithium battery-grade sera exporte vers les gigafactories europeennes de batteries pour vehicules electriques.',
  'decarbonation',
  'https://www.lesechos.fr/industrie-services/industrie-lourde/eramet-lithium-argentine-batteries-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10009-0909-4000-b090-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b09',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Eramet modernise son usine de manganese de Dunkerque avec un four electrique bas-carbone',
  'Eramet investit 250 M EUR pour remplacer le four a arc submerge au coke de Dunkerque par un four electrique alimente en electricite nucleaire. La capacite de production de ferromanganesee reste a 160 000 t/an avec une reduction de 55% des emissions CO2.',
  'plant_modernization',
  'https://www.usinenouvelle.com/article/eramet-dunkerque-manganese-four-electrique-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10009-0909-4000-b090-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b09',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Eramet engage la conformite de ses alliages de nickel aux nouvelles restrictions CMR',
  'Eramet investit 30 M EUR pour adapter ses procedes de production d''alliages de nickel et de chrome a Sandouville (Seine-Maritime) en reponse aux restrictions REACH renforcees sur les composes CMR du nickel et du chrome hexavalent.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/eramet-reach-nickel-chrome-cmr-2026',
  'neutral', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Imerys News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10010-1010-4000-b100-ogc000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b10',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Imerys lance le projet de mine de lithium en Allier: 1 Md EUR pour la souverainete europeenne',
  'Imerys a obtenu l''autorisation prefectorale pour l''exploitation de la mine de lithium d''Echassires (Allier). Le projet EMILI de 1 Md EUR produira 34 000 tonnes de LiOH/an des 2028, couvrant les besoins de 700 000 batteries de vehicules electriques par an.',
  'decarbonation',
  'https://www.lesechos.fr/industrie-services/industrie-lourde/imerys-lithium-allier-mine-emili-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10010-1010-4000-b100-ogc000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b10',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Imerys deploie des capteurs IoT et l''IA pour optimiser ses broyeurs et fours rotatifs',
  'Imerys lance un programme de digitalisation de 80 M EUR pour deployer des capteurs vibratoires, thermiques et acoustiques sur ses 40 sites de transformation en France. L''IA predictive developpe avec Dataiku reduit la consommation energetique de 12%.',
  'plant_modernization',
  'https://www.usine-digitale.fr/article/imerys-digitalisation-capteurs-iot-ia-broyeurs-2026',
  'positive', 7, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10010-1010-4000-b100-ogc000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b10',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'REACH: Imerys reformule ses talcs et silices pour eliminer les traces de substances preoccupantes',
  'Imerys investit 40 M EUR pour purifier ses talcs et silices afin de respecter les seuils REACH abaisses pour l''amiante residuelle et la silice cristalline respirable. Les nouvelles lignes de purification seront operationnelles a Luzenac et Lompret en 2027.',
  'reach_compliance',
  'https://www.journaldelenvironnement.net/article/imerys-reach-talc-silice-purification-2026',
  'neutral', 6, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================
-- All 10 companies: sector_alignment=65, capex_spikes=70, eu_regulatory_pressure=75

-- 1. TotalEnergies Raffinage (prospect_score=62)
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
  'ps-ogc01-0101-4000-a010-000000000001',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b01',
  65, 6, 7, 6,
  7, 7, 8, 7,
  5, 6, 70, 6,
  3, 5, 6, 3, 7,
  6, 5, 4, 6,
  6, 7, 5, 5, 6,
  7, 6, 6, 6,
  7, 6, 6, 6,
  4, 3, 7,
  7, 6, 5, 7, 6,
  75, 2, 6,
  6, 4, 6,
  62, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 2. Arkema (prospect_score=68)
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
  'ps-ogc02-0202-4000-a020-000000000002',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b02',
  65, 7, 7, 8,
  7, 7, 8, 7,
  6, 8, 70, 6,
  3, 6, 5, 2, 7,
  7, 5, 5, 6,
  7, 8, 5, 6, 6,
  8, 8, 6, 7,
  8, 7, 6, 6,
  4, 5, 7,
  7, 6, 5, 7, 7,
  75, 2, 7,
  6, 3, 7,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 3. Solvay France (prospect_score=60)
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
  'ps-ogc03-0303-4000-a030-000000000003',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b03',
  65, 6, 6, 7,
  6, 6, 8, 6,
  5, 6, 70, 5,
  3, 5, 5, 2, 6,
  5, 4, 4, 5,
  6, 6, 4, 5, 5,
  6, 6, 7, 6,
  6, 7, 5, 5,
  5, 6, 6,
  7, 6, 5, 6, 5,
  75, 2, 6,
  5, 3, 5,
  60, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 4. Air Liquide (prospect_score=72)
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
  'ps-ogc04-0404-4000-a040-000000000004',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b04',
  65, 7, 8, 8,
  8, 8, 9, 8,
  7, 8, 70, 7,
  3, 7, 5, 2, 8,
  8, 6, 5, 7,
  7, 8, 5, 7, 7,
  8, 8, 7, 8,
  8, 7, 7, 8,
  4, 5, 8,
  7, 6, 5, 8, 8,
  75, 2, 7,
  7, 3, 8,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 5. BASF France (prospect_score=58)
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
  'ps-ogc05-0505-4000-a050-000000000005',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b05',
  65, 6, 5, 6,
  6, 5, 8, 6,
  5, 6, 70, 5,
  3, 4, 5, 2, 6,
  5, 4, 4, 5,
  5, 6, 4, 5, 5,
  5, 6, 5, 5,
  6, 6, 5, 5,
  3, 4, 6,
  6, 5, 5, 6, 6,
  75, 2, 6,
  5, 3, 5,
  58, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 6. Axens (prospect_score=65)
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
  'ps-ogc06-0606-4000-a060-000000000006',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b06',
  65, 7, 5, 8,
  7, 7, 7, 6,
  6, 8, 70, 5,
  3, 6, 4, 2, 6,
  6, 5, 5, 6,
  8, 7, 4, 6, 6,
  6, 8, 5, 7,
  6, 5, 5, 7,
  3, 4, 6,
  6, 5, 5, 7, 6,
  75, 2, 7,
  6, 3, 7,
  65, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 7. Technip Energies (prospect_score=70)
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
  'ps-ogc07-0707-4000-a070-000000000007',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b07',
  65, 7, 7, 7,
  7, 7, 8, 7,
  7, 7, 70, 6,
  3, 6, 5, 3, 8,
  8, 6, 6, 7,
  7, 7, 5, 7, 7,
  7, 7, 6, 8,
  7, 6, 6, 7,
  4, 5, 8,
  6, 5, 5, 7, 6,
  75, 2, 7,
  8, 3, 7,
  70, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 8. Vallourec (prospect_score=63)
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
  'ps-ogc08-0808-4000-a080-000000000008',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b08',
  65, 6, 7, 6,
  6, 6, 7, 6,
  6, 6, 70, 5,
  3, 5, 6, 3, 7,
  6, 5, 5, 6,
  6, 6, 5, 5, 5,
  7, 7, 5, 6,
  6, 6, 5, 5,
  4, 4, 6,
  7, 6, 5, 6, 6,
  75, 2, 6,
  6, 4, 6,
  63, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 9. Eramet (prospect_score=67)
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
  'ps-ogc09-0909-4000-a090-000000000009',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b09',
  65, 6, 7, 7,
  6, 7, 8, 7,
  6, 7, 70, 5,
  3, 6, 5, 3, 7,
  7, 5, 5, 6,
  7, 7, 5, 6, 6,
  8, 7, 5, 7,
  6, 6, 5, 6,
  4, 5, 7,
  6, 5, 5, 7, 6,
  75, 2, 7,
  6, 3, 7,
  67, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 10. Imerys (prospect_score=66)
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
  'ps-ogc10-1010-4000-a100-000000000010',
  'c0a1b2c3-d4e5-4f6a-8b9c-0d1e2f3a4b10',
  65, 6, 7, 7,
  7, 7, 8, 7,
  6, 7, 70, 5,
  3, 6, 5, 2, 7,
  6, 5, 5, 6,
  7, 7, 4, 6, 6,
  8, 7, 5, 7,
  7, 6, 6, 6,
  4, 4, 7,
  6, 5, 5, 7, 6,
  75, 2, 7,
  7, 3, 7,
  66, 'warm',
  1776520000, 1776520000, 1776520000
);
