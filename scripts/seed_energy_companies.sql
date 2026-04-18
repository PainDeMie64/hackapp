-- =============================================================================
-- SEED: 5 French Energy/Nuclear Companies
-- EDF, TotalEnergies, Engie, Framatome, Orano
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- EDF (Electricite de France)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  'EDF',
  'edf.fr',
  'Premier producteur et fournisseur d''electricite en France, leader mondial du nucleaire civil avec 56 reacteurs en exploitation et le programme EPR2 en cours de deploiement.',
  'Energy', 'Nuclear & Electricity',
  'Paris', 'France', 167000, 143500000000, 2024,
  '{"scada":["Schneider EcoStruxure","Siemens WinCC"],"erp":["SAP S/4HANA"],"plm":["Dassault 3DEXPERIENCE"],"simulation":["ANSYS","Code_Aster","CATHARE"],"cloud":["Azure","OVHcloud"],"cybersecurity":["Thales Cybels","Stormshield"],"iot":["ThingWorx","Azure IoT Hub"],"data":["Databricks","Snowflake"]}',
  1,
  'https://www.linkedin.com/company/edf/',
  '552081317',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  82, 'hot', 1776520000
);

-- TotalEnergies
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'a1b2c3d4-2222-4e5f-8a9b-000000000002',
  'TotalEnergies',
  'totalenergies.com',
  'Major petrolier et gazier en transition vers les energies renouvelables, l''electricite et l''hydrogene vert. 5e plus grande entreprise energetique mondiale par chiffre d''affaires.',
  'Energy', 'Oil Gas & Renewables',
  'Courbevoie', 'France', 101000, 218900000000, 2024,
  '{"erp":["SAP S/4HANA","Oracle Cloud ERP"],"cloud":["AWS","GCP","Azure"],"data":["Palantir Foundry","Dataiku","Snowflake"],"iot":["Aveva PI","OSIsoft"],"simulation":["Petrel","Eclipse","OLGA"],"cybersecurity":["CrowdStrike","Palo Alto Prisma"],"ai_ml":["TensorFlow","Databricks","SageMaker"],"devops":["Kubernetes","Terraform","GitLab"]}',
  1,
  'https://www.linkedin.com/company/totalenergies/',
  '542051180',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  75, 'warm', 1776520000
);

-- Engie
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'a1b2c3d4-3333-4e5f-8a9b-000000000003',
  'Engie',
  'engie.com',
  'Leader mondial de la transition energetique: gaz naturel, energies renouvelables, infrastructures decentralisees et services d''efficacite energetique. Operateur du plus grand parc eolien et solaire d''Europe.',
  'Energy', 'Gas Renewables & Energy Services',
  'Courbevoie', 'France', 97000, 82600000000, 2024,
  '{"erp":["SAP ECC","SAP S/4HANA migration"],"cloud":["Azure","AWS"],"iot":["GE Predix","Schneider EcoStruxure","Azure IoT"],"data":["Dataiku","Power BI","Snowflake"],"scada":["ABB Ability","Schneider Foxboro"],"cybersecurity":["Fortinet","Zscaler"],"bim":["Autodesk Revit","BIM 360"],"devops":["Azure DevOps","Docker"]}',
  1,
  'https://www.linkedin.com/company/engie/',
  '542107651',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  71, 'warm', 1776520000
);

-- Framatome
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  'Framatome',
  'framatome.com',
  'Concepteur et fabricant de composants nucleaires, assemblages de combustible et systemes de controle-commande pour centrales nucleaires. Filiale d''EDF, acteur cle du programme EPR2 et du Grand Carenage.',
  'Energy', 'Nuclear Engineering & Fuel',
  'Paris', 'France', 20000, 3800000000, 2024,
  '{"simulation":["ANSYS","CATHARE","APOLLO3","TRIPOLI-4"],"plm":["Siemens Teamcenter","NX"],"scada":["Framatome TELEPERM XS","Foxboro"],"erp":["SAP ECC"],"cad":["CATIA V5","AutoCAD"],"cybersecurity":["Stormshield","Thales Cybels"],"embedded":["VxWorks","QNX","IEC 61131"],"quality":["Windchill","Reqtify"]}',
  1,
  'https://www.linkedin.com/company/framatome/',
  '379588448',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  85, 'hot', 1776520000
);

-- Orano
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'a1b2c3d4-5555-4e5f-8a9b-000000000005',
  'Orano',
  'orano.group',
  'Specialiste du cycle du combustible nucleaire: extraction d''uranium, conversion, enrichissement, recyclage du combustible use et gestion des dechets radioactifs. Operateur des usines de La Hague et du Tricastin.',
  'Energy', 'Nuclear Fuel Cycle',
  'Chatillon', 'France', 17000, 5600000000, 2024,
  '{"simulation":["CESAR","DARWIN","APOLLO3"],"erp":["SAP ECC","SAP S/4HANA migration"],"scada":["Siemens PCS7","Yokogawa CENTUM"],"plm":["Windchill"],"cad":["CATIA V5","SolidWorks"],"cybersecurity":["Stormshield","ANSSI-qualified tools"],"robotics":["Staubli","KUKA nuclear-grade"],"data":["Power BI","Python analytics"]}',
  1,
  'https://www.linkedin.com/company/orano/',
  '330956871',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  78, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- EDF News (5 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n1a00001-aaaa-4000-b001-edf000000001',
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF lance la construction du premier EPR2 a Penly',
  'EDF a officiellement lance les travaux de genie civil du premier reacteur EPR2 sur le site de Penly en Normandie. Le projet prevoit 2 reacteurs de 1670 MW chacun, avec une mise en service visee pour 2035. Plus de 8000 emplois directs sont attendus en phase de construction.',
  'nuclear_project',
  'https://www.lesechos.fr/industrie-services/energie-environnement/edf-epr2-penly-construction-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n1a00001-aaaa-4000-b001-edf000000002',
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF recrute 6000 ingenieurs pour le Grand Carenage et les EPR2',
  'Le groupe EDF a annonce un plan massif de recrutement de 6000 ingenieurs et techniciens specialises en nucleaire sur 2026-2028, couvrant les besoins du Grand Carenage (prolongation des reacteurs existants a 60 ans) et le programme de nouveaux EPR2.',
  'hiring',
  'https://www.usinenouvelle.com/article/edf-recrutement-ingenieurs-nucleaire-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n1a00001-aaaa-4000-b001-edf000000003',
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF investit 1.2 milliard EUR dans l''hydrogene bas-carbone',
  'EDF a devoile sa feuille de route hydrogene avec un investissement de 1.2 milliard EUR d''ici 2030 pour developper des electrolyseurs couples a ses centrales nucleaires. L''objectif est de produire 3 GW d''hydrogene bas-carbone pour l''industrie et la mobilite lourde.',
  'energy_transition',
  'https://www.edf.fr/groupe-edf/hydrogene-bas-carbone-investissement-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n1a00001-aaaa-4000-b001-edf000000004',
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF accelere la digitalisation de ses centrales avec des jumeaux numeriques',
  'EDF deploie des jumeaux numeriques sur l''ensemble de son parc nucleaire francais (56 reacteurs). Le programme, developpe avec Dassault Systemes, vise a optimiser la maintenance predictive et reduire les durees d''arret pour rechargement de 30%.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/edf-jumeaux-numeriques-centrales-nucleaires-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n1a00001-aaaa-4000-b001-edf000000005',
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'EDF remporte le contrat de construction de la centrale nucleaire de Jaitapur en Inde',
  'EDF a signe l''accord definitif avec NPCIL pour la construction de 6 reacteurs EPR a Jaitapur, Maharashtra. Le contrat estimee a plus de 20 milliards EUR represente le plus grand projet nucleaire a l''export pour la France.',
  'major_contract',
  'https://www.reuters.com/business/energy/edf-jaitapur-india-nuclear-contract-final-2026',
  'positive', 9, 1775600000, 1775900000, 1776520000
);


-- ---- TotalEnergies News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n2b00002-bbbb-4000-b002-tot000000001',
  'a1b2c3d4-2222-4e5f-8a9b-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies atteint 50 GW de capacite renouvelable installee',
  'TotalEnergies a franchi le cap des 50 GW de capacite renouvelable installee dans le monde, en avance sur son objectif de 100 GW a 2030. Le groupe a inaugure la plus grande ferme solaire d''Europe (2 GW) dans le sud de l''Espagne.',
  'energy_transition',
  'https://www.totalenergies.com/media/news/press-releases/50gw-renewable-milestone-2026',
  'positive', 7, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n2b00002-bbbb-4000-b002-tot000000002',
  'a1b2c3d4-2222-4e5f-8a9b-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies investit 2 Mds EUR dans l''hydrogene vert en France et en Allemagne',
  'Le groupe a annonce un plan d''investissement de 2 milliards EUR pour developper des hubs de production d''hydrogene vert adosses a des parcs eoliens offshore en mer du Nord. Les premiers electrolyseurs de 200 MW seront operationnels en 2028.',
  'hydrogen',
  'https://www.lesechos.fr/industrie-services/energie-environnement/totalenergies-hydrogene-vert-investissement-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n2b00002-bbbb-4000-b002-tot000000003',
  'a1b2c3d4-2222-4e5f-8a9b-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies recrute 3000 ingenieurs data et IA pour sa transformation digitale',
  'TotalEnergies a lance un programme de recrutement de 3000 profils specialises en data science, intelligence artificielle et cybersecurite sur 3 ans. Le groupe deploie Palantir Foundry et Dataiku sur l''ensemble de ses operations upstream et downstream.',
  'hiring',
  'https://www.usinenouvelle.com/article/totalenergies-recrutement-data-ia-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n2b00002-bbbb-4000-b002-tot000000004',
  'a1b2c3d4-2222-4e5f-8a9b-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'TotalEnergies lance le projet de CCUS a Dunkerque avec Air Liquide',
  'TotalEnergies et Air Liquide ont signe un accord pour developper le plus grand hub europeen de captage et stockage de CO2 (CCUS) dans la zone industrielle de Dunkerque. Le projet vise a capter 10 Mt de CO2/an d''ici 2030.',
  'energy_transition',
  'https://www.reuters.com/business/energy/totalenergies-air-liquide-ccus-dunkerque-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);


-- ---- Engie News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n3c00003-cccc-4000-b003-eng000000001',
  'a1b2c3d4-3333-4e5f-8a9b-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie remporte un mega-contrat de 10 GW solaire en Arabie Saoudite',
  'Engie a ete selectionne pour developper un portefeuille de 10 GW de projets solaires photovoltaiques dans le cadre du programme Vision 2030 de l''Arabie Saoudite. Le contrat, estime a 8 milliards EUR, s''etale sur 2027-2032.',
  'major_contract',
  'https://www.engie.com/en/journalists/press-releases/saudi-arabia-10gw-solar-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n3c00003-cccc-4000-b003-eng000000002',
  'a1b2c3d4-3333-4e5f-8a9b-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie inaugure la plus grande usine d''hydrogene vert en Europe a Belfort',
  'Engie a inaugure son usine d''electrolyseurs de 100 MW a Belfort, alimentee par l''electricite nucleaire bas-carbone. La production de 14 000 tonnes d''hydrogene par an approvisionnera les industries chimique et siderurgique de la region Grand Est.',
  'hydrogen',
  'https://www.usinenouvelle.com/article/engie-hydrogene-vert-belfort-inauguration-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n3c00003-cccc-4000-b003-eng000000003',
  'a1b2c3d4-3333-4e5f-8a9b-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie accelere la migration SAP S/4HANA sur l''ensemble du groupe',
  'Engie a confirme le deploiement de SAP S/4HANA sur l''ensemble de ses entites mondiales d''ici 2028, avec un budget de 600 millions EUR. Le programme mobilisera plus de 2000 consultants externes en integration, data migration et change management.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/engie-sap-s4hana-migration-globale-2026',
  'positive', 8, 1775800000, 1775950000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n3c00003-cccc-4000-b003-eng000000004',
  'a1b2c3d4-3333-4e5f-8a9b-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Engie cree 1500 postes d''ingenieurs en efficacite energetique et smart grids',
  'Face a la demande croissante en renovation energetique des batiments et en reseaux electriques intelligents, Engie recrute 1500 ingenieurs en France sur 2026-2027. Le groupe cible des profils en thermique, electrotechnique et IoT industriel.',
  'hiring',
  'https://www.lesechos.fr/industrie-services/energie-environnement/engie-recrutement-ingenieurs-smart-grids-2026',
  'positive', 6, 1775700000, 1775900000, 1776520000
);


-- ---- Framatome News (5 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n4d00004-dddd-4000-b004-fra000000001',
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Framatome livrera les cuves et generateurs de vapeur des 6 EPR2 francais',
  'Framatome a confirme avoir signe les contrats de fourniture des composants lourds (cuves, generateurs de vapeur, pressuriseurs) pour les 6 reacteurs EPR2 programmes en France (Penly, Gravelines, Bugey). L''usine de Saint-Marcel tourne a pleine capacite.',
  'nuclear_project',
  'https://www.framatome.com/medias/press-releases/epr2-heavy-components-contract-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n4d00004-dddd-4000-b004-fra000000002',
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Framatome recrute 3500 profils pour soutenir la renaissance nucleaire',
  'Framatome a annonce un plan de recrutement de 3500 ingenieurs, techniciens et soudeurs sur 2026-2029 pour repondre aux besoins du programme EPR2 et du Grand Carenage. L''entreprise ouvre un centre de formation a Chalon-sur-Saone.',
  'hiring',
  'https://www.usinenouvelle.com/article/framatome-recrutement-3500-nucleaire-renaissance-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n4d00004-dddd-4000-b004-fra000000003',
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Framatome developpe le combustible ATF accident-tolerant pour la surete renforcee',
  'Framatome a lance les essais en reacteur de son combustible ATF (Accident Tolerant Fuel) avec gainage en chromium dans le cadre du programme europeen ESNII. Ce combustible permettra d''allonger les marges de surete et de prolonger les cycles d''exploitation.',
  'nuclear_project',
  'https://www.world-nuclear-news.org/articles/framatome-atf-fuel-irradiation-tests-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n4d00004-dddd-4000-b004-fra000000004',
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Framatome modernise le controle-commande de 32 reacteurs francais',
  'Framatome a recu la commande d''EDF pour la renovation complete des systemes de controle-commande (I&C) de 32 reacteurs 900 MW. Le programme TELEPERM XS remplacera les systemes analogiques par des plateformes numeriques qualifiees surete.',
  'nuclear_project',
  'https://www.sfen.org/rgn/framatome-controle-commande-reacteurs-modernisation-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n4d00004-dddd-4000-b004-fra000000005',
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Framatome et Siemens Energy signent un partenariat sur les SMR',
  'Framatome et Siemens Energy ont signe un protocole d''accord pour co-developper des petits reacteurs modulaires (SMR) adaptes aux applications industrielles et au chauffage urbain en Europe. Le design vise une puissance de 170 MWe.',
  'energy_transition',
  'https://www.reuters.com/business/energy/framatome-siemens-smr-partnership-2026',
  'positive', 7, 1775600000, 1775900000, 1776520000
);


-- ---- Orano News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n5e00005-eeee-4000-b005-oro000000001',
  'a1b2c3d4-5555-4e5f-8a9b-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orano inaugure la nouvelle usine d''enrichissement d''uranium Georges Besse III',
  'Orano a inaugure la phase d''extension de l''usine d''enrichissement par centrifugation au Tricastin, portant sa capacite a 11 millions d''UTS/an. L''investissement de 3 milliards EUR repond a la demande croissante liee a la renaissance nucleaire mondiale.',
  'nuclear_project',
  'https://www.orano.group/en/news/press-releases/tricastin-enrichment-expansion-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n5e00005-eeee-4000-b005-oro000000002',
  'a1b2c3d4-5555-4e5f-8a9b-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orano remporte un contrat de recyclage de combustible use avec le Japon',
  'Orano a signe un contrat de 1.5 milliard EUR avec JNFL pour le traitement de 800 tonnes de combustible use japonais a l''usine de La Hague. Le contrat s''etend sur 10 ans et renforce la position de leader mondial d''Orano dans le recyclage nucleaire.',
  'major_contract',
  'https://www.world-nuclear-news.org/articles/orano-japan-fuel-recycling-contract-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n5e00005-eeee-4000-b005-oro000000003',
  'a1b2c3d4-5555-4e5f-8a9b-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orano recrute 2000 ingenieurs et techniciens nucleaires d''ici 2028',
  'Orano a lance un plan de recrutement de 2000 postes specialises (ingenierie nucleaire, robotique, chimie, surete) pour accompagner la montee en charge de ses activites d''enrichissement et de recyclage. Le groupe investit dans un campus de formation a Pierrelatte.',
  'hiring',
  'https://www.usinenouvelle.com/article/orano-recrutement-2000-nucleaire-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n5e00005-eeee-4000-b005-oro000000004',
  'a1b2c3d4-5555-4e5f-8a9b-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orano deploie des robots telecommandes pour le demantelement de l''usine UP2-400',
  'Orano a deploye une nouvelle generation de robots telecommandes pour le demantelement de l''ancienne usine de retraitement UP2-400 a La Hague. La technologie, developpee en partenariat avec le CEA, permet d''operer en zones de tres haute radioactivite.',
  'nuclear_project',
  'https://www.sfen.org/rgn/orano-robots-demantelement-up2-400-la-hague-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES (50 criteria each) =====================

-- EDF: highest scorer - massive nuclear program, EPR2, Grand Carenage, huge hiring
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
  'ps-edf01-1111-4000-a001-000000000001',
  'a1b2c3d4-1111-4e5f-8a9b-000000000001',
  9, 8, 9, 9,
  8, 9, 9, 8,
  7, 9, 9, 6,
  3, 9, 5, 2, 8,
  9, 7, 7, 8,
  9, 8, 6, 8, 7,
  9, 8, 7, 9,
  8, 7, 6, 8,
  5, 4, 9,
  8, 7, 5, 9, 7,
  9, 4, 9,
  9, 3, 8,
  82, 'hot',
  1776520000, 1776520000, 1776520000
);

-- TotalEnergies: strong on digital/data, energy transition, but less nuclear-focused
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
  'ps-tot02-2222-4000-a002-000000000002',
  'a1b2c3d4-2222-4e5f-8a9b-000000000002',
  8, 7, 9, 8,
  7, 7, 9, 8,
  7, 8, 8, 7,
  3, 6, 6, 3, 8,
  8, 6, 5, 7,
  7, 9, 5, 7, 8,
  8, 7, 8, 7,
  9, 7, 8, 8,
  4, 6, 9,
  7, 6, 5, 8, 8,
  8, 2, 6,
  7, 4, 8,
  75, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Engie: strong on renewables, smart grids, SAP migration, services
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
  'ps-eng03-3333-4000-a003-000000000003',
  'a1b2c3d4-3333-4e5f-8a9b-000000000003',
  8, 7, 9, 7,
  7, 7, 9, 7,
  6, 7, 7, 7,
  3, 7, 5, 2, 7,
  7, 6, 5, 7,
  6, 8, 5, 6, 6,
  7, 7, 8, 7,
  8, 9, 7, 7,
  5, 5, 8,
  7, 6, 5, 7, 7,
  8, 2, 6,
  8, 3, 7,
  71, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Framatome: highest absolute score - nuclear-only, EPR2 supplier, massive hiring, I&C modernization
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
  'ps-fra04-4444-4000-a004-000000000004',
  'a1b2c3d4-4444-4e5f-8a9b-000000000004',
  9, 9, 7, 9,
  8, 9, 8, 8,
  8, 9, 9, 5,
  3, 8, 4, 2, 9,
  9, 8, 8, 9,
  9, 7, 7, 9, 8,
  9, 8, 6, 9,
  7, 6, 4, 9,
  4, 3, 9,
  8, 7, 6, 9, 6,
  9, 5, 9,
  9, 2, 8,
  85, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Orano: nuclear fuel cycle specialist, big capex, niche skills
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
  'ps-oro05-5555-4000-a005-000000000005',
  'a1b2c3d4-5555-4e5f-8a9b-000000000005',
  9, 8, 7, 8,
  6, 8, 8, 7,
  7, 8, 9, 5,
  3, 8, 4, 2, 8,
  8, 7, 7, 8,
  9, 6, 6, 8, 7,
  9, 7, 6, 8,
  6, 7, 5, 7,
  4, 3, 8,
  7, 6, 6, 8, 6,
  9, 4, 9,
  8, 3, 7,
  78, 'warm',
  1776520000, 1776520000, 1776520000
);
