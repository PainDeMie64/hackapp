-- =============================================================================
-- SEED: 10 Large International Companies with Major French Operations
-- Airbus Helicopters, Rolls-Royce France, BAE Systems France, Boeing France,
-- Lockheed Martin France, General Electric France, ABB France,
-- Honeywell France, Bosch France, Continental France
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Airbus Helicopters
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1001-4a5b-9c0d-100100100101',
  'Airbus Helicopters',
  'airbus.com/helicopters',
  'Premier constructeur mondial d''helicopteres civils et militaires. Siege a Marignane (Bouches-du-Rhone), concoive et assemble les gammes H125, H145, H160, H225, NH90 et Tigre. Leader du marche civil avec 55% de part de marche mondiale.',
  'Aerospace', 'Helicopters & Rotorcraft',
  'Marignane', 'France', 23000, 7200000000, 2024,
  '{"plm":["Dassault 3DEXPERIENCE","Siemens Teamcenter"],"erp":["SAP S/4HANA"],"cad":["CATIA V5/V6","NX"],"simulation":["ANSYS Fluent","MSC Nastran"],"mes":["Apriso","SAP ME"],"cloud":["AWS","Azure"],"cybersecurity":["Thales Cybels","Airbus CyberSecurity"],"iot":["Skywise","PTC ThingWorx"]}',
  1,
  'https://www.linkedin.com/company/airbus-helicopters/',
  '352383715',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  83, 'hot', 1776520000
);

-- 2. Rolls-Royce France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1002-4a5b-9c0d-100200100202',
  'Rolls-Royce France',
  'rolls-royce.com',
  'Filiale francaise du motoriste britannique, presente a Dahlewitz et Blagnac. Operations de support moteurs Trent pour Airbus, R&D sur les materiaux composites et les turbines de nouvelle generation. Partenaire cle du programme SCAF/NGF.',
  'Aerospace', 'Aero Engines & Propulsion',
  'Blagnac', 'France', 2800, 950000000, 2024,
  '{"plm":["Siemens Teamcenter","NX"],"simulation":["ANSYS CFX","Abaqus","Rolls-Royce proprietary"],"erp":["SAP ECC"],"cloud":["Azure","AWS"],"cad":["NX","CATIA V5"],"data":["Databricks","Azure Synapse"],"cybersecurity":["Palo Alto","CrowdStrike"],"devops":["Azure DevOps","GitLab"]}',
  1,
  'https://www.linkedin.com/company/rolls-royce/',
  '382745623',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 3. BAE Systems France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1003-4a5b-9c0d-100300100303',
  'BAE Systems France',
  'baesystems.com',
  'Filiale francaise du groupe de defense britannique. Activites en electronique de defense, guerre electronique, systemes de communication securises et cybersecurite. Partenaire des programmes MBDA et SCAF avec la DGA.',
  'Aerospace', 'Defense Electronics & Systems',
  'Paris', 'France', 1200, 480000000, 2024,
  '{"embedded":["VxWorks","INTEGRITY","Ada"],"simulation":["MATLAB/Simulink","STK"],"erp":["SAP ECC"],"cybersecurity":["BAE proprietary","Thales Cybels"],"cloud":["AWS GovCloud","Azure"],"cad":["Altium","Cadence"],"devops":["Jenkins","GitLab"],"data":["Splunk","Elastic"]}',
  1,
  'https://www.linkedin.com/company/bae-systems/',
  '419853274',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  76, 'warm', 1776520000
);

-- 4. Boeing France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1004-4a5b-9c0d-100400100404',
  'Boeing France',
  'boeing.fr',
  'Bureau francais de Boeing, coordonne les achats aupres de 200+ fournisseurs francais (5 Mds EUR/an). Activites de R&D avec l''ONERA, support MRO pour les compagnies aeriennes europeennes, et programmes de defense (satellites, helicopteres Apache/Chinook).',
  'Aerospace', 'Commercial & Defense Aviation',
  'Paris', 'France', 800, 350000000, 2024,
  '{"plm":["Dassault Enovia","PTC Windchill"],"erp":["SAP S/4HANA"],"simulation":["ANSYS","Abaqus","HyperWorks"],"cloud":["AWS","Azure"],"cad":["CATIA V5","Creo"],"data":["Snowflake","Tableau"],"cybersecurity":["CrowdStrike","Palo Alto"],"ai_ml":["TensorFlow","AWS SageMaker"]}',
  1,
  'https://www.linkedin.com/company/boeing/',
  '348765291',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 5. Lockheed Martin France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1005-4a5b-9c0d-100500100505',
  'Lockheed Martin France',
  'lockheedmartin.com',
  'Representation francaise du premier groupe mondial de defense. Activites de cooperation industrielle liees aux programmes F-35, C-130J, et systemes spatiaux. Partenariats avec Thales, MBDA et la DGA sur les systemes de defense integres.',
  'Aerospace', 'Defense & Space Systems',
  'Paris', 'France', 450, 280000000, 2024,
  '{"simulation":["STK","MATLAB/Simulink","AFSIM"],"embedded":["VxWorks","Green Hills INTEGRITY"],"erp":["SAP ECC"],"cloud":["AWS GovCloud"],"cybersecurity":["LM proprietary","Fortinet"],"cad":["NX","SolidWorks"],"data":["Palantir Gotham","Splunk"],"devops":["GitLab","Jenkins"]}',
  1,
  'https://www.linkedin.com/company/lockheed-martin/',
  '412987653',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  74, 'warm', 1776520000
);

-- 6. General Electric France (GE Vernova)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1006-4a5b-9c0d-100600100606',
  'General Electric France',
  'ge.com/fr',
  'Presence majeure en France via GE Vernova (ex-GE Power) a Belfort: turbines a gaz et a vapeur, turbines hydrauliques a Grenoble, et GE Aerospace a Moissy-Cramayel pour la maintenance moteurs LEAP/CFM56. Plus de 16 000 employes en France.',
  'Manufacturing', 'Power Generation & Aero Engines',
  'Belfort', 'France', 16000, 4800000000, 2024,
  '{"scada":["GE Mark VIe","Predix"],"erp":["Oracle Cloud ERP"],"plm":["Teamcenter","NX"],"simulation":["ANSYS","GE proprietary"],"cloud":["AWS","GCP"],"iot":["Predix","Azure IoT"],"data":["Snowflake","Databricks"],"cybersecurity":["Palo Alto","Zscaler"],"cad":["NX","CATIA V5"]}',
  1,
  'https://www.linkedin.com/company/ge/',
  '381512647',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  77, 'warm', 1776520000
);

-- 7. ABB France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1007-4a5b-9c0d-100700100707',
  'ABB France',
  'new.abb.com/fr',
  'Filiale francaise du groupe suisse d''electrification et d''automatisation industrielle. 10 sites en France dont le centre R&D de Beynes. Activites en robotique, variateurs de vitesse, automatisme, tableaux electriques BT/MT et solutions de recharge VE.',
  'Manufacturing', 'Electrification & Automation',
  'Cergy-Pontoise', 'France', 5200, 1800000000, 2024,
  '{"scada":["ABB Ability Symphony Plus","ABB 800xA"],"erp":["SAP S/4HANA"],"plm":["PTC Windchill"],"robotics":["ABB RobotStudio","OmniCore"],"iot":["ABB Ability","Azure IoT"],"cloud":["Azure","AWS"],"cad":["AutoCAD","SolidWorks","E-Plan"],"cybersecurity":["Fortinet","Nozomi Networks"],"mes":["ABB MOM"]}',
  1,
  'https://www.linkedin.com/company/abb/',
  '562100783',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  69, 'warm', 1776520000
);

-- 8. Honeywell France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1008-4a5b-9c0d-100800100808',
  'Honeywell France',
  'honeywell.com/fr',
  'Presence en France avec 3500 employes sur 6 sites. Activites en avionique (Toulouse), automatisation des batiments (Paris), materiaux de performance et solutions de securite industrielle. Fournisseur cle d''Airbus pour les systemes avioniques.',
  'Manufacturing', 'Avionics & Industrial Automation',
  'Toulouse', 'France', 3500, 1400000000, 2024,
  '{"scada":["Honeywell Experion PKS"],"erp":["SAP S/4HANA"],"bms":["Honeywell Forge","EBI"],"cloud":["AWS","Azure"],"iot":["Honeywell Forge","Connected Plant"],"simulation":["MATLAB/Simulink"],"cybersecurity":["Honeywell Forge Cybersecurity","Palo Alto"],"data":["Databricks","Power BI"]}',
  1,
  'https://www.linkedin.com/company/honeywell/',
  '572156284',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  71, 'warm', 1776520000
);

-- 9. Bosch France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1009-4a5b-9c0d-100900100909',
  'Bosch France',
  'bosch.fr',
  'Filiale francaise du groupe allemand, 8300 collaborateurs sur 33 sites. Activites en equipements automobiles (Rodez, Mondeville), thermotechnique (Drancy), outils electroportatifs et systemes de securite. Centre R&D de Sophia Antipolis specialise en IA embarquee.',
  'Manufacturing', 'Automotive & Industrial Technology',
  'Saint-Ouen', 'France', 8300, 3200000000, 2024,
  '{"erp":["SAP S/4HANA"],"iot":["Bosch IoT Suite","Azure IoT"],"cloud":["AWS","Azure","Bosch IoT Cloud"],"ai_ml":["TensorFlow","PyTorch","Bosch AIoT"],"embedded":["AUTOSAR","Bosch proprietary"],"plm":["PTC Windchill","Teamcenter"],"cad":["CATIA V5","Creo"],"cybersecurity":["Bosch IoT Security","Escrypt"],"mes":["Bosch Nexeed"]}',
  1,
  'https://www.linkedin.com/company/bosch-france/',
  '572097157',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  65, 'warm', 1776520000
);

-- 10. Continental France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1010-4a5b-9c0d-101000101010',
  'Continental France',
  'continental.com/fr',
  'Filiale francaise de l''equipementier automobile allemand. 10 sites industriels en France specialises en systemes de freinage (Boussens), electronique embarquee (Toulouse), pneumatiques (Sarreguemines) et solutions ADAS pour la conduite autonome.',
  'Manufacturing', 'Automotive Components & Electronics',
  'Toulouse', 'France', 9500, 3800000000, 2024,
  '{"erp":["SAP S/4HANA"],"embedded":["AUTOSAR","QNX","Continental ADAS stack"],"plm":["Siemens Teamcenter"],"cad":["CATIA V5","NX"],"simulation":["MATLAB/Simulink","CarMaker","dSPACE"],"cloud":["AWS","Azure"],"ai_ml":["TensorFlow","Continental AI platform"],"cybersecurity":["Argus","Continental Automotive Cybersecurity"],"iot":["Continental IoT","Azure IoT Edge"]}',
  1,
  'https://www.linkedin.com/company/continental/',
  '342876159',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  62, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- Airbus Helicopters News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd100001-aa01-4000-b101-hel000000001',
  'b2c3d4e5-1001-4a5b-9c0d-100100100101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Helicopters investit 500M EUR dans la nouvelle chaine d''assemblage H160M a Marignane',
  'Airbus Helicopters a inaugure une nouvelle ligne d''assemblage automatisee pour le H160M Guepard destine a l''armee francaise. L''investissement de 500 millions EUR modernise le site de Marignane avec des postes de travail robotises et des jumeaux numeriques.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/airbus-helicopters-h160m-marignane-investissement-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd100001-aa01-4000-b101-hel000000002',
  'b2c3d4e5-1001-4a5b-9c0d-100100100101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'La DGA commande 169 H160M Guepard pour les armees francaises',
  'La Direction Generale de l''Armement a confirme la commande de 169 helicopteres H160M Guepard pour les trois armees, representant un contrat de 8 milliards EUR sur 2026-2035. Le programme genere 4000 emplois directs en PACA.',
  'defense_contract',
  'https://www.defense.gouv.fr/dga/actualites/commande-169-h160m-guepard-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd100001-aa01-4000-b101-hel000000003',
  'b2c3d4e5-1001-4a5b-9c0d-100100100101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Helicopters et Safran lancent le programme de motorisation hybride CityAirbus',
  'Airbus Helicopters et Safran Helicopter Engines ont signe un partenariat strategique pour developper la propulsion hybride-electrique du CityAirbus NextGen eVTOL. Le centre de R&D de Marignane recrute 300 ingenieurs specialises en electrification.',
  'partnership',
  'https://www.lesechos.fr/industrie-services/air-defense/airbus-helicopters-safran-evtol-motorisation-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd100001-aa01-4000-b101-hel000000004',
  'b2c3d4e5-1001-4a5b-9c0d-100100100101',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Helicopters remporte 50 NH90 pour la marine australienne',
  'Airbus Helicopters a ete selectionne pour fournir 50 helicopteres NH90 Caiman Marine a la Royal Australian Navy. Le contrat de 3.2 milliards EUR est le plus important export du NH90 et mobilisera les sites de Marignane et Donauworth.',
  'major_contract',
  'https://www.reuters.com/business/aerospace-defense/airbus-helicopters-nh90-australia-contract-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);


-- ---- Rolls-Royce France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd200002-bb02-4000-b202-rrf000000001',
  'b2c3d4e5-1002-4a5b-9c0d-100200100202',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Rolls-Royce investit 200M EUR dans son centre MRO de Blagnac pour les moteurs UltraFan',
  'Rolls-Royce a annonce un investissement de 200 millions EUR pour agrandir et moderniser son centre de maintenance moteurs a Blagnac pres de Toulouse. Le site sera equipe pour la maintenance de la nouvelle generation de moteurs UltraFan destines aux futurs Airbus.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/rolls-royce-blagnac-mro-ultrafan-investissement-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd200002-bb02-4000-b202-rrf000000002',
  'b2c3d4e5-1002-4a5b-9c0d-100200100202',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Rolls-Royce rejoint le programme SCAF comme partenaire propulsion avec Safran',
  'Rolls-Royce a ete integre au programme SCAF (Systeme de Combat Aerien du Futur) franco-allemand-espagnol pour co-developper le moteur de nouvelle generation du NGF avec Safran. Le partenariat represente 1.2 milliard EUR de R&D d''ici 2030.',
  'defense_contract',
  'https://www.defense.gouv.fr/dga/actualites/scaf-rolls-royce-safran-moteur-ngf-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd200002-bb02-4000-b202-rrf000000003',
  'b2c3d4e5-1002-4a5b-9c0d-100200100202',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Rolls-Royce France ouvre un centre R&D sur les materiaux composites a Toulouse',
  'Rolls-Royce a inaugure un centre de recherche de 50 millions EUR dedie aux materiaux composites et ceramiques (CMC) pour les turbines de prochaine generation. Le centre emploiera 200 chercheurs et ingenieurs en partenariat avec le CIRIMAT et l''ISAE-SUPAERO.',
  'facility_investment',
  'https://www.usine-digitale.fr/article/rolls-royce-toulouse-rd-composites-cmc-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- BAE Systems France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd300003-cc03-4000-b303-bae000000001',
  'b2c3d4e5-1003-4a5b-9c0d-100300100303',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'BAE Systems France decroche un contrat DGA de 350M EUR en guerre electronique',
  'BAE Systems France a remporte un contrat de 350 millions EUR avec la DGA pour la fourniture de systemes de guerre electronique de nouvelle generation pour les armees francaises. Le programme couvre les systemes embarques et terrestres sur 2026-2032.',
  'defense_contract',
  'https://www.defense.gouv.fr/dga/actualites/bae-systems-guerre-electronique-contrat-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd300003-cc03-4000-b303-bae000000002',
  'b2c3d4e5-1003-4a5b-9c0d-100300100303',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'BAE Systems France et MBDA signent un accord de cooperation sur les missiles hypersoniques',
  'BAE Systems France et MBDA ont signe un accord de cooperation pour developper des technologies de guidage et de materiaux pour missiles hypersoniques. Le programme s''inscrit dans la feuille de route BITD europeenne et mobilise les bureaux d''etudes francais et britanniques.',
  'partnership',
  'https://www.janes.com/defence-news/bae-systems-mbda-hypersonic-cooperation-france-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd300003-cc03-4000-b303-bae000000003',
  'b2c3d4e5-1003-4a5b-9c0d-100300100303',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'BAE Systems France recrute 400 ingenieurs cyber et electronique de defense',
  'BAE Systems France a lance un plan de recrutement de 400 ingenieurs specialises en cybersecurite, electronique de defense et intelligence artificielle pour soutenir la croissance de ses activites en France. Les recrutements ciblent des profils habilites secret defense.',
  'hiring',
  'https://www.usinenouvelle.com/article/bae-systems-france-recrutement-cyber-defense-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Boeing France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd400004-dd04-4000-b404-boe000000001',
  'b2c3d4e5-1004-4a5b-9c0d-100400100404',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Boeing France porte ses achats aupres de fournisseurs francais a 6 Mds EUR/an',
  'Boeing a annonce que ses achats aupres de l''industrie aeronautique francaise atteindront 6 milliards EUR par an d''ici 2028, en hausse de 20%. Le groupe renforce ses partenariats avec Safran, Thales, Daher et les PME de la supply chain aeronautique francaise.',
  'partnership',
  'https://www.lesechos.fr/industrie-services/air-defense/boeing-france-achats-fournisseurs-6-milliards-2026',
  'positive', 7, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd400004-dd04-4000-b404-boe000000002',
  'b2c3d4e5-1004-4a5b-9c0d-100400100404',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Boeing et l''ONERA signent un partenariat de 5 ans en aerodynamique avancee',
  'Boeing et l''ONERA ont signe un accord de R&D de 5 ans portant sur les technologies d''aile a flux laminaire et les materiaux composites de nouvelle generation. Le partenariat mobilise les souffleries de Modane et le centre Boeing de recherche a Paris.',
  'partnership',
  'https://www.onera.fr/actualites/boeing-onera-partenariat-aerodynamique-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd400004-dd04-4000-b404-boe000000003',
  'b2c3d4e5-1004-4a5b-9c0d-100400100404',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Boeing France ouvre un centre de formation MRO a Roissy pour les techniciens europeens',
  'Boeing a inaugure un centre de formation de 30 millions EUR a Roissy-CDG dedie a la maintenance des 787 Dreamliner et 737 MAX. Le centre formera 2000 techniciens par an pour les compagnies aeriennes europeennes et africaines.',
  'facility_investment',
  'https://www.air-journal.fr/boeing-france-centre-formation-mro-roissy-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Lockheed Martin France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd500005-ee05-4000-b505-lmf000000001',
  'b2c3d4e5-1005-4a5b-9c0d-100500100505',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lockheed Martin signe un contrat de cooperation industrielle de 2 Mds EUR avec la DGA',
  'Lockheed Martin a conclu un accord de cooperation industrielle avec la DGA lie aux offsets du programme F-35 europeen. Le contrat genere 2 milliards EUR de retombees industrielles en France sur 2026-2035, incluant des transferts de technologie vers Thales et MBDA.',
  'defense_contract',
  'https://www.defense.gouv.fr/dga/actualites/lockheed-martin-cooperation-industrielle-france-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd500005-ee05-4000-b505-lmf000000002',
  'b2c3d4e5-1005-4a5b-9c0d-100500100505',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lockheed Martin France ouvre un centre cyber a Paris pour le marche europeen',
  'Lockheed Martin a ouvert un centre d''operations de cybersecurite (SOC) a Paris dedie au marche de defense europeen. Le centre de 80 millions EUR emploie 150 specialistes et offre des services de detection de menaces et de reponse aux incidents pour les armees alliees.',
  'facility_investment',
  'https://www.usine-digitale.fr/article/lockheed-martin-soc-cybersecurity-paris-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd500005-ee05-4000-b505-lmf000000003',
  'b2c3d4e5-1005-4a5b-9c0d-100500100505',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lockheed Martin et Thales lancent un partenariat sur les systemes spatiaux de surveillance',
  'Lockheed Martin et Thales Alenia Space ont signe un accord de cooperation pour developper des systemes de surveillance spatiale (Space Domain Awareness) pour les clients europeens et OTAN. Le programme de 500 millions EUR combine les capteurs LM et les satellites TAS.',
  'partnership',
  'https://www.reuters.com/business/aerospace-defense/lockheed-martin-thales-space-surveillance-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);


-- ---- General Electric France News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd600006-ff06-4000-b606-gef000000001',
  'b2c3d4e5-1006-4a5b-9c0d-100600100606',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE Vernova Belfort investit 300M EUR dans les turbines a hydrogene',
  'GE Vernova a annonce un investissement de 300 millions EUR sur son site historique de Belfort pour adapter sa gamme de turbines a gaz a la combustion d''hydrogene vert. Le programme vise la certification de turbines 100% H2 d''ici 2029.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/ge-vernova-belfort-turbines-hydrogene-investissement-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd600006-ff06-4000-b606-gef000000002',
  'b2c3d4e5-1006-4a5b-9c0d-100600100606',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE Aerospace Moissy-Cramayel devient centre d''excellence mondial pour le moteur LEAP',
  'GE Aerospace a designe son site de Moissy-Cramayel comme centre d''excellence mondial pour la maintenance et la reparation du moteur LEAP-1A/1B. L''investissement de 150 millions EUR porte la capacite a 500 moteurs par an avec des technologies de reparation additive.',
  'facility_investment',
  'https://www.air-journal.fr/ge-aerospace-moissy-cramayel-leap-excellence-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd600006-ff06-4000-b606-gef000000003',
  'b2c3d4e5-1006-4a5b-9c0d-100600100606',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE Hydro Grenoble remporte le contrat de modernisation des barrages EDF pour 800M EUR',
  'GE Renewable Energy (Hydro) a Grenoble a remporte un contrat de 800 millions EUR avec EDF pour la renovation de 45 turbines hydrauliques sur les grands barrages alpins. Le programme s''etale sur 2026-2033 et augmente la capacite de 15%.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/energie-environnement/ge-hydro-grenoble-barrages-edf-modernisation-2026',
  'positive', 9, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd600006-ff06-4000-b606-gef000000004',
  'b2c3d4e5-1006-4a5b-9c0d-100600100606',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'GE France lance un plan de recrutement de 1200 ingenieurs sur Belfort, Grenoble et Moissy',
  'General Electric France a annonce le recrutement de 1200 ingenieurs et techniciens sur 3 ans pour soutenir la croissance de ses activites en turbines H2, hydraulique et maintenance aeronautique. Le groupe cible des profils en mecanique, thermodynamique et data science.',
  'hiring',
  'https://www.usinenouvelle.com/article/ge-france-recrutement-1200-ingenieurs-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- ABB France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd700007-aa07-4000-b707-abb000000001',
  'b2c3d4e5-1007-4a5b-9c0d-100700100707',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ABB France investit 120M EUR dans une usine de robots collaboratifs a Beynes',
  'ABB a annonce la construction d''une nouvelle usine de robots collaboratifs (cobots) a Beynes (Yvelines) pour un investissement de 120 millions EUR. L''usine produira la gamme GoFa et SWIFTI pour le marche europeen avec une capacite de 10 000 unites par an.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/abb-france-usine-robots-collaboratifs-beynes-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd700007-aa07-4000-b707-abb000000002',
  'b2c3d4e5-1007-4a5b-9c0d-100700100707',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ABB France et EDF signent un accord-cadre pour l''electrification des centrales nucleaires',
  'ABB France a signe un accord-cadre de 5 ans avec EDF pour la fourniture de tableaux electriques moyenne tension, variateurs de vitesse et systemes d''automatisation pour le programme de Grand Carenage et les EPR2. Le contrat est estime a 250 millions EUR.',
  'partnership',
  'https://www.lesechos.fr/industrie-services/energie-environnement/abb-edf-electrification-nucleaire-accord-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd700007-aa07-4000-b707-abb000000003',
  'b2c3d4e5-1007-4a5b-9c0d-100700100707',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ABB France deploie 5000 bornes de recharge rapide pour Engie sur les autoroutes francaises',
  'ABB France a remporte un contrat avec Engie pour l''installation de 5000 bornes de recharge rapide (150-350 kW) sur le reseau autoroutier francais d''ici 2028. Le contrat de 180 millions EUR inclut la fourniture, l''installation et la maintenance sur 10 ans.',
  'major_contract',
  'https://www.automobile-propre.com/abb-engie-bornes-recharge-autoroutes-france-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Honeywell France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd800008-bb08-4000-b808-hon000000001',
  'b2c3d4e5-1008-4a5b-9c0d-100800100808',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Honeywell Toulouse investit 150M EUR dans un centre d''avionique de nouvelle generation',
  'Honeywell Aerospace a annonce un investissement de 150 millions EUR pour agrandir son centre d''ingenierie avionique a Toulouse-Blagnac. Le nouveau batiment accueillera 500 ingenieurs travaillant sur les cockpits connectes et les systemes de navigation pour Airbus.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/honeywell-toulouse-avionique-investissement-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd800008-bb08-4000-b808-hon000000002',
  'b2c3d4e5-1008-4a5b-9c0d-100800100808',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Honeywell France et Airbus signent un contrat de 2 Mds EUR pour l''avionique A350-1000',
  'Honeywell a remporte un contrat de 2 milliards EUR pour fournir les systemes de navigation inertielle, les ecrans de cockpit et les systemes de gestion de vol de l''Airbus A350-1000 Freighter. Le contrat s''etend sur la vie du programme.',
  'major_contract',
  'https://www.air-journal.fr/honeywell-airbus-a350-1000-avionique-contrat-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd800008-bb08-4000-b808-hon000000003',
  'b2c3d4e5-1008-4a5b-9c0d-100800100808',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Honeywell France deploie sa plateforme Forge pour 200 batiments intelligents en Ile-de-France',
  'Honeywell Building Technologies France a signe un contrat avec la Region Ile-de-France pour deployer sa plateforme Honeywell Forge sur 200 batiments publics (lycees, hopitaux). Le programme de 80 millions EUR vise 30% de reduction de consommation energetique.',
  'partnership',
  'https://www.usine-digitale.fr/article/honeywell-forge-batiments-intelligents-ile-de-france-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Bosch France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd900009-cc09-4000-b909-bos000000001',
  'b2c3d4e5-1009-4a5b-9c0d-100900100909',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bosch France reconvertit l''usine de Rodez vers l''hydrogene et la pile a combustible',
  'Bosch a annonce un investissement de 250 millions EUR pour reconvertir son site historique de Rodez (Aveyron), auparavant dedie aux injecteurs diesel, en usine de production de piles a combustible pour vehicules lourds. Le site emploiera 1200 personnes d''ici 2029.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/bosch-rodez-hydrogene-pile-combustible-reconversion-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd900009-cc09-4000-b909-bos000000002',
  'b2c3d4e5-1009-4a5b-9c0d-100900100909',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bosch France et Renault signent un partenariat strategique sur l''ADAS et la conduite autonome',
  'Bosch France et Renault Group ont signe un accord de cooperation de 5 ans pour le co-developpement de systemes ADAS de niveau 3 et de fonctions de conduite autonome. Le centre R&D de Sophia Antipolis pilotera les travaux en IA embarquee et capteurs radar.',
  'partnership',
  'https://www.lesechos.fr/industrie-services/automobile/bosch-renault-adas-conduite-autonome-partenariat-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nd900009-cc09-4000-b909-bos000000003',
  'b2c3d4e5-1009-4a5b-9c0d-100900100909',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Bosch France lance un programme Industry 4.0 sur ses 33 sites industriels',
  'Bosch France a annonce le deploiement de sa plateforme Nexeed d''Industrie 4.0 sur ses 33 sites en France. L''investissement de 100 millions EUR sur 3 ans integre l''IA, les jumeaux numeriques et l''IoT industriel pour augmenter la productivite de 25%.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/bosch-france-industry-40-nexeed-deploiement-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Continental France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nda00010-dd10-4000-ba10-con000000001',
  'b2c3d4e5-1010-4a5b-9c0d-101000101010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Continental France investit 200M EUR dans un centre ADAS a Toulouse',
  'Continental a annonce un investissement de 200 millions EUR pour creer un centre de competences ADAS (Advanced Driver-Assistance Systems) a Toulouse. Le centre emploiera 600 ingenieurs specialises en vision par ordinateur, lidar et intelligence artificielle embarquee.',
  'facility_investment',
  'https://www.usinenouvelle.com/article/continental-toulouse-centre-adas-investissement-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nda00010-dd10-4000-ba10-con000000002',
  'b2c3d4e5-1010-4a5b-9c0d-101000101010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Continental France et Stellantis signent un contrat de 1.5 Mds EUR pour les systemes de freinage',
  'Continental France a remporte un contrat de 1.5 milliard EUR avec Stellantis pour la fourniture de systemes de freinage electro-hydrauliques MK C2 pour les plateformes EV de nouvelle generation. L''usine de Boussens (Haute-Garonne) sera modernisee pour la production.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/automobile/continental-stellantis-freinage-contrat-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nda00010-dd10-4000-ba10-con000000003',
  'b2c3d4e5-1010-4a5b-9c0d-101000101010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Continental France recrute 500 ingenieurs software pour la conduite autonome et l''IoT vehicule',
  'Continental France a lance un plan de recrutement de 500 ingenieurs logiciel sur 2 ans pour ses centres de Toulouse et Rambouillet. Les profils recherches couvrent le deep learning embarque, les architectures vehicule E/E et les systemes de communication V2X.',
  'hiring',
  'https://www.usinenouvelle.com/article/continental-france-recrutement-software-conduite-autonome-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- 1. Airbus Helicopters: hot - defense contracts, H160M program, eVTOL R&D, massive facility investment
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
  'ps-abh01-1001-4000-c001-100100100101',
  'b2c3d4e5-1001-4a5b-9c0d-100100100101',
  9, 9, 8, 9,
  9, 9, 9, 8,
  8, 9, 9, 6,
  4, 8, 4, 2, 8,
  9, 7, 6, 8,
  9, 8, 5, 8, 8,
  9, 9, 7, 9,
  8, 7, 7, 9,
  5, 4, 9,
  7, 6, 5, 9, 7,
  8, 9, 9,
  9, 3, 9,
  83, 'hot',
  1776520000, 1776520000, 1776520000
);

-- 2. Rolls-Royce France: warm - SCAF program, MRO expansion, R&D composites
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
  'ps-rrf02-1002-4000-c002-100200100202',
  'b2c3d4e5-1002-4a5b-9c0d-100200100202',
  9, 8, 6, 8,
  8, 8, 8, 7,
  7, 8, 8, 5,
  3, 6, 4, 2, 7,
  7, 5, 5, 7,
  8, 8, 4, 6, 7,
  8, 8, 6, 8,
  7, 5, 6, 8,
  4, 3, 7,
  6, 5, 5, 8, 6,
  7, 8, 8,
  7, 2, 7,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 3. BAE Systems France: warm - defense electronics, EW contract, SCAF, cyber hiring
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
  'ps-bae03-1003-4000-c003-100300100303',
  'b2c3d4e5-1003-4a5b-9c0d-100300100303',
  9, 8, 5, 8,
  7, 7, 8, 7,
  7, 8, 7, 5,
  3, 7, 4, 2, 8,
  8, 6, 6, 8,
  9, 8, 5, 7, 8,
  6, 7, 5, 8,
  7, 5, 6, 8,
  5, 4, 8,
  7, 6, 7, 9, 5,
  8, 9, 9,
  9, 2, 7,
  76, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 4. Boeing France: warm - supply chain expansion, R&D partnerships, MRO training
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
  'ps-boe04-1004-4000-c004-100400100404',
  'b2c3d4e5-1004-4a5b-9c0d-100400100404',
  8, 7, 5, 7,
  7, 7, 9, 7,
  6, 7, 6, 5,
  3, 4, 5, 3, 7,
  6, 5, 4, 6,
  7, 7, 4, 5, 7,
  6, 6, 6, 7,
  7, 6, 7, 8,
  4, 4, 8,
  6, 5, 5, 8, 6,
  7, 5, 7,
  7, 4, 7,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 5. Lockheed Martin France: warm - defense cooperation, F-35 offsets, cyber center, space partnerships
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
  'ps-lmf05-1005-4000-c005-100500100505',
  'b2c3d4e5-1005-4a5b-9c0d-100500100505',
  9, 8, 4, 7,
  7, 6, 9, 7,
  7, 8, 7, 5,
  3, 5, 3, 2, 7,
  6, 5, 5, 7,
  8, 8, 4, 6, 8,
  7, 7, 5, 8,
  7, 5, 6, 9,
  4, 3, 7,
  6, 5, 6, 9, 5,
  8, 9, 9,
  9, 2, 7,
  74, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 6. General Electric France: warm - H2 turbines, LEAP MRO, hydro contracts, major hiring
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
  'ps-gef06-1006-4000-c006-100600100606',
  'b2c3d4e5-1006-4a5b-9c0d-100600100606',
  8, 7, 8, 8,
  7, 8, 9, 8,
  7, 8, 8, 6,
  3, 7, 5, 3, 8,
  8, 6, 5, 7,
  8, 8, 5, 7, 7,
  8, 8, 7, 8,
  8, 6, 7, 7,
  5, 5, 8,
  7, 6, 5, 8, 7,
  8, 3, 7,
  8, 3, 7,
  77, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 7. ABB France: warm - cobot factory, nuclear electrification, EV charging
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
  'ps-abb07-1007-4000-c007-100700100707',
  'b2c3d4e5-1007-4a5b-9c0d-100700100707',
  7, 6, 7, 7,
  7, 7, 8, 7,
  6, 7, 7, 6,
  3, 5, 4, 2, 7,
  7, 5, 5, 6,
  7, 7, 4, 6, 6,
  8, 7, 6, 7,
  7, 6, 6, 7,
  4, 4, 7,
  6, 5, 5, 7, 7,
  7, 3, 6,
  7, 2, 6,
  69, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 8. Honeywell France: warm - avionics center, Airbus contract, smart buildings
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
  'ps-hon08-1008-4000-c008-100800100808',
  'b2c3d4e5-1008-4a5b-9c0d-100800100808',
  8, 7, 6, 7,
  8, 8, 8, 7,
  6, 7, 7, 5,
  3, 5, 4, 2, 7,
  7, 5, 5, 6,
  7, 7, 4, 6, 7,
  7, 7, 6, 7,
  7, 6, 6, 7,
  4, 4, 7,
  6, 5, 5, 8, 7,
  7, 4, 7,
  8, 2, 7,
  71, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 9. Bosch France: warm - H2 fuel cell plant, ADAS partnership, Industry 4.0
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
  'ps-bos09-1009-4000-c009-100900100909',
  'b2c3d4e5-1009-4a5b-9c0d-100900100909',
  6, 6, 7, 7,
  7, 6, 9, 7,
  6, 7, 7, 6,
  3, 5, 5, 3, 6,
  7, 5, 4, 6,
  7, 8, 4, 6, 6,
  7, 7, 6, 6,
  8, 6, 6, 7,
  4, 3, 7,
  6, 5, 4, 7, 8,
  7, 2, 5,
  6, 3, 6,
  65, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 10. Continental France: warm - ADAS center, Stellantis contract, software hiring
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
  'ps-con10-1010-4000-c010-101000101010',
  'b2c3d4e5-1010-4a5b-9c0d-101000101010',
  6, 5, 7, 7,
  7, 7, 8, 7,
  5, 6, 7, 6,
  3, 4, 5, 3, 6,
  7, 5, 4, 6,
  7, 8, 5, 6, 6,
  7, 6, 5, 6,
  7, 6, 6, 6,
  4, 3, 6,
  5, 5, 4, 7, 7,
  7, 2, 5,
  7, 3, 6,
  62, 'warm',
  1776520000, 1776520000, 1776520000
);
