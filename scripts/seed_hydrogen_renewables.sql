-- =============================================================================
-- SEED: 10 French Hydrogen & Renewable Energy Companies
-- McPhy Energy, Lhyfe, HDF Energy, Symbio, Plastic Omnium Hydrogen,
-- Air Liquide Hydrogen, Engie Hydrogen, TotalEnergies Renewables,
-- EDF Renouvelables, Voltalia
-- Timestamp: 1776520000 (all created_at/updated_at)
-- source_id: 00238d74-63da-4b37-88cb-ff4357db7e13
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. McPhy Energy
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1001-4f6a-9b0c-h2r000000001',
  'McPhy Energy',
  'mcphy.com',
  'Specialiste francais des electrolyseurs alcalins et PEM pour la production d''hydrogene vert. Fournisseur cle du plan France 2030 avec sa gigafactory d''electrolyseurs a Belfort.',
  'Hydrogen/Renewables', 'Electrolyzer Manufacturing',
  'Grenoble', 'France', 350, 45000000, 2024,
  '{"process_control":["Siemens PCS7","Wonderware"],"erp":["SAP Business One"],"cad":["SolidWorks","AutoCAD"],"simulation":["ANSYS Fluent","COMSOL"],"cloud":["Azure"],"iot":["Siemens MindSphere"],"quality":["SAP QM"]}',
  1,
  'https://www.linkedin.com/company/mcphy-energy/',
  '531223498',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 2. Lhyfe
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1002-4f6a-9b0c-h2r000000002',
  'Lhyfe',
  'lhyfe.com',
  'Producteur d''hydrogene vert et renouvelable a partir d''eolien et de solaire. Pionnier mondial de l''hydrogene offshore avec la premiere plateforme de production en mer operationnelle a Saint-Nazaire.',
  'Hydrogen/Renewables', 'Green Hydrogen Production',
  'Nantes', 'France', 250, 18000000, 2024,
  '{"process_control":["ABB Ability","Yokogawa"],"cloud":["AWS","Azure"],"data":["Databricks","Grafana"],"iot":["AWS IoT Core","InfluxDB"],"erp":["Odoo"],"scada":["Schneider ClearSCADA"]}',
  1,
  'https://www.linkedin.com/company/lhyfe/',
  '850924523',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 3. HDF Energy (Hydrogene de France)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1003-4f6a-9b0c-h2r000000003',
  'HDF Energy',
  'hdf-energy.com',
  'Developpeur de centrales electriques a hydrogene de haute puissance (Renewstable et HyPower). Specialiste des piles a combustible de forte puissance pour la production d''electricite continue a partir d''hydrogene vert.',
  'Hydrogen/Renewables', 'Hydrogen Power Plants',
  'Bordeaux', 'France', 180, 25000000, 2024,
  '{"simulation":["MATLAB Simulink","ANSYS"],"cad":["CATIA V5","SolidWorks"],"erp":["SAP Business ByDesign"],"cloud":["Azure"],"scada":["Schneider EcoStruxure"],"project_mgmt":["Primavera P6"]}',
  1,
  'https://www.linkedin.com/company/hdf-energy/',
  '487543002',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  65, 'warm', 1776520000
);

-- 4. Symbio
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1004-4f6a-9b0c-h2r000000004',
  'Symbio',
  'symbio.one',
  'Co-entreprise Faurecia-Michelin, leader europeen des systemes de piles a combustible pour la mobilite hydrogene. Construction de la gigafactory SymphonHy a Saint-Fons pour produire 50 000 stacks/an.',
  'Hydrogen/Renewables', 'Fuel Cell Systems',
  'Saint-Fons', 'France', 1500, 120000000, 2024,
  '{"plm":["Siemens Teamcenter","NX"],"erp":["SAP S/4HANA"],"simulation":["ANSYS","GT-SUITE","Star-CCM+"],"embedded":["AUTOSAR","dSPACE"],"manufacturing":["Siemens Opcenter","MES"],"cloud":["Azure","AWS"],"quality":["Minitab","SAP QM"],"test":["NI LabVIEW","dSPACE HIL"]}',
  1,
  'https://www.linkedin.com/company/symbio-fcel/',
  '538aborj09',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  76, 'warm', 1776520000
);

-- 5. Plastic Omnium Hydrogen
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1005-4f6a-9b0c-h2r000000005',
  'Plastic Omnium Hydrogen',
  'plasticomnium.com',
  'Division hydrogene de Plastic Omnium, specialisee dans les reservoirs haute pression et systemes de stockage d''hydrogene embarque pour les vehicules lourds, bus et ferroviaire. Usines a Compiègne et Venette.',
  'Hydrogen/Renewables', 'Hydrogen Storage Systems',
  'Levallois-Perret', 'France', 800, 350000000, 2024,
  '{"plm":["Dassault 3DEXPERIENCE","CATIA V5"],"erp":["SAP S/4HANA"],"simulation":["ANSYS","Abaqus","LS-DYNA"],"manufacturing":["Dassault DELMIA","Apriso MES"],"cloud":["Azure"],"iot":["ThingWorx","Azure IoT Hub"],"quality":["SAP QM","Minitab"]}',
  1,
  'https://www.linkedin.com/company/plastic-omnium/',
  '955512611',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  74, 'warm', 1776520000
);

-- 6. Air Liquide Hydrogen
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1006-4f6a-9b0c-h2r000000006',
  'Air Liquide Hydrogen',
  'airliquide.com',
  'Division hydrogene d''Air Liquide, premier producteur mondial d''hydrogene industriel. Operateur de 50+ stations hydrogene en Europe, developpeur d''electrolyseurs PEM de grande capacite a Becancour et Oberhausen.',
  'Hydrogen/Renewables', 'Industrial Hydrogen & Infrastructure',
  'Paris', 'France', 5000, 2800000000, 2024,
  '{"process_control":["Honeywell Experion","Yokogawa CENTUM"],"erp":["SAP S/4HANA"],"cloud":["AWS","GCP"],"data":["Palantir Foundry","Dataiku"],"iot":["Aveva PI","OSIsoft"],"scada":["ABB Ability","Honeywell"],"cybersecurity":["CrowdStrike","Zscaler"],"simulation":["Aspen HYSYS","gPROMS"]}',
  1,
  'https://www.linkedin.com/company/air-liquide/',
  '552096281',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  78, 'warm', 1776520000
);

-- 7. Engie Hydrogen
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1007-4f6a-9b0c-h2r000000007',
  'Engie Hydrogen',
  'engie.com/hydrogene',
  'Filiale d''Engie dediee a l''hydrogene renouvelable. Developpeur de projets d''electrolyseurs a grande echelle couples a des parcs eoliens et solaires. Portefeuille de 4 GW de projets hydrogene en Europe et en Amerique latine.',
  'Hydrogen/Renewables', 'Green Hydrogen Development',
  'Courbevoie', 'France', 600, 180000000, 2024,
  '{"erp":["SAP S/4HANA"],"cloud":["Azure","AWS"],"data":["Dataiku","Power BI"],"iot":["Azure IoT Hub","Schneider EcoStruxure"],"scada":["ABB Ability"],"project_mgmt":["Primavera P6","MS Project"]}',
  1,
  'https://www.linkedin.com/company/engie/',
  '542107651',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  70, 'warm', 1776520000
);

-- 8. TotalEnergies Renewables
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1008-4f6a-9b0c-h2r000000008',
  'TotalEnergies Renewables',
  'totalenergies.com/renewables',
  'Branche energies renouvelables de TotalEnergies. Portefeuille de 50+ GW solaire et eolien, dont des projets eoliens offshore en mer du Nord et en Manche. Objectif 100 GW installes d''ici 2030.',
  'Hydrogen/Renewables', 'Solar & Wind Energy',
  'Courbevoie', 'France', 7000, 5500000000, 2024,
  '{"erp":["SAP S/4HANA","Oracle Cloud"],"cloud":["AWS","GCP"],"data":["Palantir Foundry","Databricks"],"iot":["Aveva PI","GE Digital Wind"],"scada":["GE Mark VIe","Vestas Online"],"simulation":["WindPRO","PVsyst","Meteotest"],"cybersecurity":["CrowdStrike","Palo Alto"]}',
  1,
  'https://www.linkedin.com/company/totalenergies/',
  '542051180',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  75, 'warm', 1776520000
);

-- 9. EDF Renouvelables
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1009-4f6a-9b0c-h2r000000009',
  'EDF Renouvelables',
  'edf-renouvelables.com',
  'Filiale d''EDF dediee aux energies renouvelables: eolien terrestre et offshore, solaire photovoltaique et stockage par batteries. Operateur de 40 GW de capacite renouvelable dans 25 pays, dont les parcs eoliens offshore de Saint-Nazaire et Fecamp.',
  'Hydrogen/Renewables', 'Wind & Solar Energy',
  'Paris La Defense', 'France', 5500, 3200000000, 2024,
  '{"erp":["SAP S/4HANA"],"cloud":["Azure","OVHcloud"],"scada":["GE Mark VIe","Siemens SCADA"],"data":["Databricks","Power BI"],"iot":["Azure IoT Hub","ThingWorx"],"simulation":["WindPRO","PVsyst","openWind"],"cybersecurity":["Thales Cybels","Fortinet"],"gis":["ArcGIS","QGIS"]}',
  1,
  'https://www.linkedin.com/company/edf-renouvelables/',
  '379576088',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  73, 'warm', 1776520000
);

-- 10. Voltalia
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'b2c3d4e5-1010-4f6a-9b0c-h2r000000010',
  'Voltalia',
  'voltalia.com',
  'Producteur francais d''energies renouvelables: eolien, solaire, hydraulique et biomasse. Operateur de 3 GW de capacite installee dans 20 pays, avec des projets majeurs au Bresil, en Afrique et en France metropolitaine.',
  'Hydrogen/Renewables', 'Multi-Renewable Energy',
  'Paris', 'France', 1800, 520000000, 2024,
  '{"erp":["SAP Business ByDesign"],"cloud":["AWS"],"scada":["Schneider ClearSCADA","ABB"],"data":["Power BI","Grafana"],"iot":["AWS IoT Greengrass"],"simulation":["PVsyst","WindPRO"],"gis":["ArcGIS"],"project_mgmt":["Primavera P6"]}',
  1,
  'https://www.linkedin.com/company/voltalia/',
  '485237903',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  66, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- McPhy Energy News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-h2r1-4000-b010-mcp000000001',
  'b2c3d4e5-1001-4f6a-9b0c-h2r000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'McPhy Energy lance la construction de sa gigafactory d''electrolyseurs a Belfort',
  'McPhy a demarre les travaux de sa gigafactory d''electrolyseurs alcalins a Belfort, soutenue par 114 millions EUR du plan France 2030. L''usine produira des electrolyseurs de 100 MW+ a partir de 2027, visant une capacite totale de 1 GW/an.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/mcphy-gigafactory-electrolyseurs-belfort-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-h2r1-4000-b010-mcp000000002',
  'b2c3d4e5-1001-4f6a-9b0c-h2r000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'McPhy decroche un contrat de 60 MW d''electrolyseurs pour le projet HyPSTER',
  'McPhy a remporte la fourniture de 60 MW d''electrolyseurs alcalins pour le projet europeen HyPSTER de stockage souterrain d''hydrogene en cavite saline a Etrez (Ain). Le projet, finance par l''UE et France 2030, sera operationnel en 2028.',
  'electrolyzer_project',
  'https://www.lesechos.fr/industrie-services/energie-environnement/mcphy-electrolyseurs-hypster-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-h2r1-4000-b010-mcp000000003',
  'b2c3d4e5-1001-4f6a-9b0c-h2r000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'McPhy recrute 200 ingenieurs pour sa montee en charge industrielle',
  'McPhy Energy a annonce un plan de recrutement de 200 ingenieurs et techniciens specialises en electrochimie, automatisme et production industrielle pour accompagner la montee en puissance de sa gigafactory de Belfort.',
  'hiring',
  'https://www.usinenouvelle.com/article/mcphy-recrutement-ingenieurs-belfort-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Lhyfe News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n7g20002-h2r2-4000-b020-lhy000000001',
  'b2c3d4e5-1002-4f6a-9b0c-h2r000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lhyfe inaugure la premiere plateforme offshore de production d''hydrogene vert au monde',
  'Lhyfe a mis en service sa plateforme Sealhyfe au large de Saint-Nazaire, connectee a l''eolien offshore pour produire de l''hydrogene vert directement en mer. Le projet pilote de 1 MW ouvre la voie a des unites de 100 MW prevues pour 2029.',
  'offshore_hydrogen',
  'https://www.reuters.com/business/energy/lhyfe-sealhyfe-offshore-hydrogen-platform-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n7g20002-h2r2-4000-b020-lhy000000002',
  'b2c3d4e5-1002-4f6a-9b0c-h2r000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lhyfe obtient 50 millions EUR de France 2030 pour ses projets d''hydrogene renouvelable',
  'Lhyfe a recu une subvention de 50 millions EUR dans le cadre du plan France 2030 pour developper 3 sites de production d''hydrogene vert en Bretagne, Pays de la Loire et Occitanie, totalisant 75 MW d''electrolyseurs.',
  'public_funding',
  'https://www.lesechos.fr/industrie-services/energie-environnement/lhyfe-france-2030-subvention-hydrogene-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n7g20002-h2r2-4000-b020-lhy000000003',
  'b2c3d4e5-1002-4f6a-9b0c-h2r000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Lhyfe signe un contrat de fourniture d''hydrogene vert avec la SNCF',
  'Lhyfe a signe un accord-cadre avec SNCF Voyageurs pour fournir de l''hydrogene vert destine aux trains a pile a combustible sur les lignes regionales non electrifiees en Bretagne et Nouvelle-Aquitaine.',
  'major_contract',
  'https://www.usinenouvelle.com/article/lhyfe-sncf-hydrogene-vert-trains-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- HDF Energy News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n8h30003-h2r3-4000-b030-hdf000000001',
  'b2c3d4e5-1003-4f6a-9b0c-h2r000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'HDF Energy demarre la construction de la centrale Renewstable de 55 MW en Guyane',
  'HDF Energy a lance les travaux de sa centrale Renewstable en Guyane francaise, combinant 55 MW de solaire, des electrolyseurs et des piles a combustible pour fournir une electricite 100% renouvelable et non-intermittente 24h/24.',
  'hydrogen_power_plant',
  'https://www.usinenouvelle.com/article/hdf-energy-renewstable-guyane-construction-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n8h30003-h2r3-4000-b030-hdf000000002',
  'b2c3d4e5-1003-4f6a-9b0c-h2r000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'HDF Energy leve 200 millions EUR pour son expansion internationale',
  'HDF Energy a boucle un tour de financement de 200 millions EUR aupres d''investisseurs institutionnels pour financer le deploiement de centrales hydrogene au Mexique, en Indonesie et en Afrique du Sud. Le carnet de commandes atteint 1.2 milliard EUR.',
  'funding',
  'https://www.lesechos.fr/industrie-services/energie-environnement/hdf-energy-levee-fonds-expansion-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n8h30003-h2r3-4000-b030-hdf000000003',
  'b2c3d4e5-1003-4f6a-9b0c-h2r000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'HDF Energy remporte le contrat HyPower de 100 MW pour le port de Marseille-Fos',
  'HDF Energy a ete selectionne pour construire une centrale hydrogene HyPower de 100 MW au Grand Port Maritime de Marseille-Fos, alimentant les navires a quai et l''industrie portuaire en electricite decarbonee.',
  'major_contract',
  'https://www.reuters.com/business/energy/hdf-energy-hypower-marseille-port-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Symbio News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n9i40004-h2r4-4000-b040-sym000000001',
  'b2c3d4e5-1004-4f6a-9b0c-h2r000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Symbio inaugure la gigafactory SymphonHy a Saint-Fons pour 50 000 stacks/an',
  'Symbio a inaugure sa gigafactory SymphonHy a Saint-Fons pres de Lyon, la plus grande usine de piles a combustible en Europe. Soutenue par 200 millions EUR de France 2030, elle produira 50 000 stacks hydrogene par an pour Stellantis, Renault et Volvo.',
  'gigafactory',
  'https://www.usinenouvelle.com/article/symbio-gigafactory-symphonhy-saint-fons-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n9i40004-h2r4-4000-b040-sym000000002',
  'b2c3d4e5-1004-4f6a-9b0c-h2r000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Symbio signe un contrat de fourniture de 10 000 stacks avec Stellantis',
  'Symbio a conclu un accord de fourniture de 10 000 systemes de piles a combustible avec Stellantis pour equiper les utilitaires legers hydrogene Peugeot, Citroen et Fiat Professional a partir de 2027.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/automobile/symbio-stellantis-piles-combustible-contrat-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n9i40004-h2r4-4000-b040-sym000000003',
  'b2c3d4e5-1004-4f6a-9b0c-h2r000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Symbio recrute 500 ingenieurs pour la montee en cadence de SymphonHy',
  'Symbio lance un plan de recrutement de 500 profils (electrochimie, automatisme, qualite industrielle, embedded software) pour accompagner la montee en cadence de la production sur le site de Saint-Fons.',
  'hiring',
  'https://www.usinenouvelle.com/article/symbio-recrutement-500-ingenieurs-symphonhy-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n9i40004-h2r4-4000-b040-sym000000004',
  'b2c3d4e5-1004-4f6a-9b0c-h2r000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Symbio devoile StackPack 200, sa pile a combustible de nouvelle generation',
  'Symbio a presente le StackPack 200, une pile a combustible de 200 kW avec une densite de puissance amelioree de 40% et une duree de vie de 30 000 heures, destinee aux poids lourds et bus hydrogene.',
  'emerging_tech',
  'https://www.automobile-propre.com/symbio-stackpack-200-pile-combustible-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Plastic Omnium Hydrogen News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nAj50005-h2r5-4000-b050-poh000000001',
  'b2c3d4e5-1005-4f6a-9b0c-h2r000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium ouvre son centre R&D hydrogene de nouvelle generation a Compiegne',
  'Plastic Omnium a inaugure son centre de recherche et developpement dedie a l''hydrogene a Compiegne, un investissement de 80 millions EUR finance en partie par France 2030. Le site developpe des reservoirs haute pression Type IV de 700 bars.',
  'rd_expansion',
  'https://www.usinenouvelle.com/article/plastic-omnium-centre-rd-hydrogene-compiegne-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nAj50005-h2r5-4000-b050-poh000000002',
  'b2c3d4e5-1005-4f6a-9b0c-h2r000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium remporte un contrat de reservoirs hydrogene avec Alstom pour les trains regionaux',
  'Plastic Omnium a signe un contrat de fourniture de systemes de stockage hydrogene haute pression pour les trains regionaux Coradia iLint d''Alstom. Les reservoirs Type IV equiperont 50 rames destinees aux lignes non electrifiees en France et en Allemagne.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/automobile/plastic-omnium-alstom-reservoirs-hydrogene-trains-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nAj50005-h2r5-4000-b050-poh000000003',
  'b2c3d4e5-1005-4f6a-9b0c-h2r000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Plastic Omnium recrute 150 ingenieurs composites et hydrogene',
  'Le groupe Plastic Omnium lance le recrutement de 150 ingenieurs specialises en materiaux composites, simulation mecanique et systemes hydrogene pour ses sites de Compiegne et Venette.',
  'hiring',
  'https://www.usinenouvelle.com/article/plastic-omnium-recrutement-ingenieurs-hydrogene-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Air Liquide Hydrogen News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nBk60006-h2r6-4000-b060-alh000000001',
  'b2c3d4e5-1006-4f6a-9b0c-h2r000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide inaugure le plus grand electrolyseur PEM au monde a Oberhausen',
  'Air Liquide a mis en service son electrolyseur PEM de 20 MW a Oberhausen (Allemagne), le plus grand au monde. L''installation produit 8 tonnes d''hydrogene vert par jour pour l''industrie chimique de la Ruhr et prefigure des unites de 200 MW.',
  'electrolyzer_project',
  'https://www.airliquide.com/media/press-releases/oberhausen-electrolyzer-inauguration-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nBk60006-h2r6-4000-b060-alh000000002',
  'b2c3d4e5-1006-4f6a-9b0c-h2r000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide investit 500 millions EUR dans l''hydrogene bas-carbone en Normandie',
  'Air Liquide a annonce un investissement de 500 millions EUR pour construire un complexe de production d''hydrogene bas-carbone a Port-Jerome en Normandie, couple au captage de CO2. Le projet recoit 150 millions EUR du plan France 2030.',
  'france_2030',
  'https://www.lesechos.fr/industrie-services/energie-environnement/air-liquide-hydrogene-normandie-france-2030-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nBk60006-h2r6-4000-b060-alh000000003',
  'b2c3d4e5-1006-4f6a-9b0c-h2r000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide deploie 100 nouvelles stations hydrogene en Europe d''ici 2028',
  'Air Liquide a annonce le deploiement de 100 stations de distribution d''hydrogene supplementaires en France, Allemagne et Benelux dans le cadre du reseau HyVia. L''investissement de 300 millions EUR vise les corridors de transport routier TEN-T.',
  'infrastructure',
  'https://www.reuters.com/business/energy/air-liquide-100-hydrogen-stations-europe-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nBk60006-h2r6-4000-b060-alh000000004',
  'b2c3d4e5-1006-4f6a-9b0c-h2r000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Air Liquide et Siemens Energy signent un partenariat sur les electrolyseurs de grande capacite',
  'Air Liquide et Siemens Energy ont signe un accord de co-developpement d''electrolyseurs PEM de 100+ MW pour les projets industriels de decarbonation en Europe, visant une reduction de 30% du cout de l''hydrogene vert.',
  'strategic_partnership',
  'https://www.usinenouvelle.com/article/air-liquide-siemens-energy-electrolyseurs-partenariat-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Engie Hydrogen News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nCl70007-h2r7-4000-b070-enh000000001',
  'b2c3d4e5-1007-4f6a-9b0c-h2r000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie Hydrogen lance le projet HyGreen Provence de 300 MW d''electrolyseurs',
  'Engie Hydrogen a demarre les travaux du projet HyGreen Provence a Manosque, combinant 300 MW d''electrolyseurs avec un parc solaire de 900 MW. Le projet beneficie de 100 millions EUR de France 2030 et produira 44 000 tonnes d''hydrogene vert par an.',
  'electrolyzer_project',
  'https://www.usinenouvelle.com/article/engie-hydrogen-hygreen-provence-electrolyseurs-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nCl70007-h2r7-4000-b070-enh000000002',
  'b2c3d4e5-1007-4f6a-9b0c-h2r000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie Hydrogen signe un accord avec ArcelorMittal pour la decarbonation de l''acier a Dunkerque',
  'Engie Hydrogen fournira de l''hydrogene vert a l''usine ArcelorMittal de Dunkerque pour remplacer le charbon dans les hauts fourneaux. Le contrat de 15 ans porte sur la livraison de 15 000 tonnes d''hydrogene par an a partir de 2029.',
  'major_contract',
  'https://www.lesechos.fr/industrie-services/energie-environnement/engie-hydrogen-arcelormittal-dunkerque-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nCl70007-h2r7-4000-b070-enh000000003',
  'b2c3d4e5-1007-4f6a-9b0c-h2r000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie Hydrogen participe au consortium europeen CorrHydor pour les pipelines hydrogene',
  'Engie Hydrogen rejoint le consortium CorrHydor avec GRTgaz et Snam pour convertir 3 000 km de gazoducs existants au transport d''hydrogene vert entre la France, l''Allemagne et l''Italie. Le projet est cofinance par le mecanisme europeen REPowerEU.',
  'infrastructure',
  'https://www.reuters.com/business/energy/engie-hydrogen-corrhydor-pipeline-consortium-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- TotalEnergies Renewables News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nDm80008-h2r8-4000-b080-ter000000001',
  'b2c3d4e5-1008-4f6a-9b0c-h2r000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies Renewables remporte le mega-projet eolien offshore de 1.5 GW en mer du Nord',
  'TotalEnergies Renewables a ete retenu pour le developpement d''un parc eolien offshore de 1.5 GW au large de Dunkerque. Le projet de 5 milliards EUR, le plus grand en France, alimentera 3 millions de foyers a partir de 2030.',
  'offshore_wind',
  'https://www.lesechos.fr/industrie-services/energie-environnement/totalenergies-eolien-offshore-dunkerque-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nDm80008-h2r8-4000-b080-ter000000002',
  'b2c3d4e5-1008-4f6a-9b0c-h2r000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies Renewables inaugure la plus grande ferme solaire de France a Gardanne',
  'TotalEnergies Renewables a inaugure un parc solaire de 1 GW sur l''ancien site minier de Gardanne-Meyreuil dans les Bouches-du-Rhone. Le projet de reconversion industrielle a beneficie de 80 millions EUR de financements publics.',
  'solar_project',
  'https://www.usinenouvelle.com/article/totalenergies-renewables-ferme-solaire-gardanne-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nDm80008-h2r8-4000-b080-ter000000003',
  'b2c3d4e5-1008-4f6a-9b0c-h2r000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies Renewables recrute 800 ingenieurs pour l''eolien offshore et le stockage',
  'TotalEnergies Renewables lance un programme de recrutement de 800 ingenieurs specialises en eolien offshore, stockage par batteries et integration reseau pour accompagner sa croissance en France et en Europe du Nord.',
  'hiring',
  'https://www.usinenouvelle.com/article/totalenergies-renewables-recrutement-eolien-stockage-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nDm80008-h2r8-4000-b080-ter000000004',
  'b2c3d4e5-1008-4f6a-9b0c-h2r000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies Renewables deploie l''IA pour optimiser ses parcs eoliens et solaires',
  'TotalEnergies Renewables deploie des algorithmes d''intelligence artificielle sur l''ensemble de ses actifs renouvelables pour la maintenance predictive et l''optimisation du dispatching, visant une amelioration de 8% du facteur de charge.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/totalenergies-renewables-ia-optimisation-parcs-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);

-- ---- EDF Renouvelables News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nEn90009-h2r9-4000-b090-edr000000001',
  'b2c3d4e5-1009-4f6a-9b0c-h2r000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF Renouvelables met en service le parc eolien offshore de Fecamp (500 MW)',
  'EDF Renouvelables a inaugure le parc eolien offshore de Fecamp en Normandie, compose de 71 eoliennes de 7 MW pour une capacite totale de 500 MW. Le parc alimente 770 000 foyers et a mobilise 2 milliards EUR d''investissement.',
  'offshore_wind',
  'https://www.edf-renouvelables.com/press/fecamp-offshore-wind-commissioning-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nEn90009-h2r9-4000-b090-edr000000002',
  'b2c3d4e5-1009-4f6a-9b0c-h2r000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF Renouvelables remporte l''appel d''offres eolien offshore flottant en Mediterranee',
  'EDF Renouvelables a ete selectionne pour developper un parc eolien flottant de 250 MW au large de Gruissan en Mediterranee. Ce projet pionnier utilise des fondations semi-submersibles et sera operationnel en 2029.',
  'offshore_wind',
  'https://www.lesechos.fr/industrie-services/energie-environnement/edf-renouvelables-eolien-flottant-mediterranee-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nEn90009-h2r9-4000-b090-edr000000003',
  'b2c3d4e5-1009-4f6a-9b0c-h2r000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF Renouvelables investit 400 millions EUR dans le stockage par batteries en France',
  'EDF Renouvelables a annonce un programme d''investissement de 400 millions EUR pour deployer 1 GWh de capacite de stockage par batteries lithium-ion sur ses sites solaires et eoliens en France, afin de lisser l''intermittence de la production.',
  'energy_storage',
  'https://www.usinenouvelle.com/article/edf-renouvelables-stockage-batteries-investissement-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nEn90009-h2r9-4000-b090-edr000000004',
  'b2c3d4e5-1009-4f6a-9b0c-h2r000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF Renouvelables recrute 600 ingenieurs pour ses projets eoliens et solaires',
  'EDF Renouvelables lance le recrutement de 600 ingenieurs en genie electrique, structures marines et data science pour accompagner son plan de croissance a 50 GW d''ici 2030.',
  'hiring',
  'https://www.usinenouvelle.com/article/edf-renouvelables-recrutement-ingenieurs-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);

-- ---- Voltalia News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nFo10010-h2rA-4000-b100-vol000000001',
  'b2c3d4e5-1010-4f6a-9b0c-h2r000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Voltalia inaugure un complexe solaire et eolien de 500 MW au Bresil',
  'Voltalia a mis en service son complexe renouvelable Serra Branca II au nord-est du Bresil, combinant 300 MW eolien et 200 MW solaire. Le site est le plus grand actif de la societe et alimente le reseau bresilien via des PPA de 20 ans.',
  'renewable_project',
  'https://www.reuters.com/business/energy/voltalia-serra-branca-brazil-500mw-commissioning-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nFo10010-h2rA-4000-b100-vol000000002',
  'b2c3d4e5-1010-4f6a-9b0c-h2r000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Voltalia remporte 200 MW de projets solaires en France dans le cadre du CRE5',
  'Voltalia a ete retenu pour 200 MW de projets solaires en France metropolitaine lors de la derniere session d''appel d''offres CRE5. Les parcs seront construits dans le sud de la France et en Nouvelle-Aquitaine d''ici 2028.',
  'solar_project',
  'https://www.lesechos.fr/industrie-services/energie-environnement/voltalia-solaire-france-cre5-appel-offres-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nFo10010-h2rA-4000-b100-vol000000003',
  'b2c3d4e5-1010-4f6a-9b0c-h2r000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Voltalia lance un programme de stockage par batteries de 300 MWh en Afrique de l''Ouest',
  'Voltalia a signe des accords pour deployer 300 MWh de stockage par batteries au Senegal et en Cote d''Ivoire, couples a ses parcs solaires existants. Le programme, soutenu par la Banque Africaine de Developpement, vise a stabiliser les reseaux electriques locaux.',
  'energy_storage',
  'https://www.usinenouvelle.com/article/voltalia-stockage-batteries-afrique-ouest-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- McPhy Energy: gigafactory, France 2030, electrolyzer specialist
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
  'ps-mcp01-h201-4000-a101-000000000001',
  'b2c3d4e5-1001-4f6a-9b0c-h2r000000001',
  8, 7, 5, 7,
  7, 8, 5, 6,
  7, 8, 9, 5,
  7, 85, 6, 3, 7,
  8, 6, 6, 7,
  8, 75, 5, 7, 6,
  80, 8, 5, 8,
  6, 5, 5, 7,
  4, 3, 7,
  5, 5, 5, 8, 7,
  8, 2, 7,
  8, 3, 7,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Lhyfe: offshore hydrogen pioneer, France 2030
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
  'ps-lhy02-h202-4000-a102-000000000002',
  'b2c3d4e5-1002-4f6a-9b0c-h2r000000002',
  8, 6, 4, 7,
  6, 7, 4, 5,
  7, 8, 8, 4,
  8, 85, 7, 3, 6,
  7, 5, 5, 6,
  8, 75, 4, 6, 5,
  80, 8, 4, 7,
  5, 4, 5, 7,
  5, 2, 6,
  4, 4, 5, 7, 6,
  8, 1, 6,
  7, 3, 7,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- HDF Energy: hydrogen power plants, international expansion
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
  'ps-hdf03-h203-4000-a103-000000000003',
  'b2c3d4e5-1003-4f6a-9b0c-h2r000000003',
  7, 6, 4, 6,
  5, 6, 4, 5,
  7, 7, 8, 4,
  8, 85, 6, 3, 6,
  6, 5, 5, 6,
  7, 75, 4, 6, 5,
  80, 7, 4, 7,
  5, 4, 4, 6,
  4, 2, 5,
  4, 4, 5, 6, 5,
  7, 1, 6,
  7, 3, 6,
  65, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Symbio: gigafactory, fuel cells, automotive hydrogen
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
  'ps-sym04-h204-4000-a104-000000000004',
  'b2c3d4e5-1004-4f6a-9b0c-h2r000000004',
  8, 7, 6, 8,
  8, 8, 6, 7,
  7, 8, 9, 5,
  7, 85, 5, 3, 8,
  8, 7, 7, 8,
  9, 75, 5, 8, 7,
  80, 9, 5, 8,
  7, 6, 5, 8,
  4, 4, 8,
  5, 5, 5, 8, 7,
  8, 2, 7,
  8, 3, 8,
  76, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Plastic Omnium Hydrogen: H2 storage, automotive, composites R&D
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
  'ps-poh05-h205-4000-a105-000000000005',
  'b2c3d4e5-1005-4f6a-9b0c-h2r000000005',
  8, 7, 6, 8,
  7, 7, 7, 7,
  7, 8, 8, 5,
  5, 85, 5, 3, 7,
  7, 6, 6, 7,
  8, 75, 5, 7, 6,
  80, 8, 5, 7,
  7, 6, 5, 7,
  4, 3, 7,
  6, 5, 5, 7, 6,
  8, 2, 7,
  8, 3, 7,
  74, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Air Liquide Hydrogen: industrial H2 leader, large-scale electrolyzers
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
  'ps-alh06-h206-4000-a106-000000000006',
  'b2c3d4e5-1006-4f6a-9b0c-h2r000000006',
  9, 8, 8, 8,
  8, 8, 9, 8,
  7, 8, 8, 6,
  4, 85, 5, 2, 8,
  8, 6, 6, 7,
  8, 75, 5, 7, 7,
  80, 8, 6, 8,
  7, 6, 6, 8,
  4, 5, 9,
  6, 5, 5, 8, 7,
  8, 2, 7,
  8, 3, 8,
  78, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Engie Hydrogen: green H2 development, industrial decarbonation
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
  'ps-enh07-h207-4000-a107-000000000007',
  'b2c3d4e5-1007-4f6a-9b0c-h2r000000007',
  8, 7, 5, 7,
  7, 7, 6, 6,
  7, 7, 8, 5,
  5, 85, 5, 3, 7,
  7, 5, 5, 6,
  7, 75, 4, 6, 6,
  80, 7, 5, 7,
  6, 5, 5, 7,
  4, 3, 7,
  5, 5, 5, 7, 6,
  8, 2, 6,
  7, 3, 7,
  70, 'warm',
  1776520000, 1776520000, 1776520000
);

-- TotalEnergies Renewables: offshore wind, solar mega-projects
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
  'ps-ter08-h208-4000-a108-000000000008',
  'b2c3d4e5-1008-4f6a-9b0c-h2r000000008',
  8, 7, 8, 8,
  7, 7, 8, 8,
  7, 8, 8, 6,
  4, 85, 5, 3, 8,
  8, 6, 5, 7,
  7, 75, 5, 7, 7,
  80, 7, 7, 7,
  8, 6, 7, 8,
  4, 5, 9,
  6, 5, 5, 8, 7,
  8, 2, 6,
  8, 3, 8,
  75, 'warm',
  1776520000, 1776520000, 1776520000
);

-- EDF Renouvelables: offshore wind, battery storage, solar
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
  'ps-edr09-h209-4000-a109-000000000009',
  'b2c3d4e5-1009-4f6a-9b0c-h2r000000009',
  8, 7, 7, 7,
  8, 8, 7, 7,
  7, 7, 8, 6,
  4, 85, 5, 3, 7,
  7, 6, 5, 7,
  7, 75, 5, 6, 6,
  80, 7, 6, 7,
  7, 5, 6, 7,
  4, 4, 8,
  5, 5, 5, 7, 7,
  8, 2, 7,
  7, 3, 7,
  73, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Voltalia: multi-renewable, international, Brazil/Africa
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
  'ps-vol10-h210-4000-a110-000000000010',
  'b2c3d4e5-1010-4f6a-9b0c-h2r000000010',
  7, 6, 6, 6,
  6, 6, 6, 6,
  6, 7, 7, 5,
  5, 85, 5, 3, 6,
  6, 5, 5, 6,
  6, 75, 4, 6, 5,
  80, 6, 5, 6,
  5, 5, 5, 6,
  3, 3, 6,
  5, 4, 5, 6, 6,
  7, 1, 6,
  7, 3, 6,
  66, 'warm',
  1776520000, 1776520000, 1776520000
);
