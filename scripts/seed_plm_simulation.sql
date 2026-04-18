-- =============================================================================
-- SEED: 10 French PLM/CAD/Simulation Companies
-- Dassault Systemes, ESI Group, Cenit France, PTC France,
-- Siemens Digital Industries Software France, Altair France,
-- ANSYS France, Hexagon Manufacturing Intelligence,
-- Autodesk France, MSC Software France
-- Timestamp: 1776520000 (all created_at/updated_at)
-- source_id: 00238d74-63da-4b37-88cb-ff4357db7e13
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Dassault Systemes
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa01-4b1c-9d01-plm000000001',
  'Dassault Systemes',
  '3ds.com',
  'Leader mondial des logiciels de conception 3D, simulation et PLM. Editeur de la plateforme 3DEXPERIENCE, CATIA, SOLIDWORKS, SIMULIA, ENOVIA et DELMIA. Fournisseur strategique de l''aeronautique, automobile et sciences de la vie.',
  'PLM/Simulation', 'PLM & 3D Design Software',
  'Velizy-Villacoublay', 'France', 23800, 5950000000, 2024,
  '{"plm":["3DEXPERIENCE","ENOVIA","DELMIA"],"cad":["CATIA V6","SOLIDWORKS"],"simulation":["SIMULIA","Abaqus","CST Studio"],"cloud":["3DEXPERIENCE Cloud","AWS","Azure"],"data":["Exalead","NETVIBES"],"devops":["GitLab","Kubernetes","Docker"]}',
  1,
  'https://www.linkedin.com/company/dassault-systemes/',
  '322306440',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 2. ESI Group
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa02-4b1c-9d02-plm000000002',
  'ESI Group',
  'esi-group.com',
  'Editeur francais de logiciels de prototypage virtuel et simulation numerique. Specialiste du crash-test virtuel, fonderie, soudage et acoustique. Acquis par Keysight Technologies en 2023, conserve son siege a Paris.',
  'PLM/Simulation', 'Virtual Prototyping & Simulation',
  'Rungis', 'France', 1200, 155000000, 2024,
  '{"simulation":["PAM-CRASH","ProCAST","SYSWELD","VA One","IC.IDO"],"vr":["IC.IDO immersive"],"cloud":["ESI Cloud","AWS"],"hpc":["OpenFOAM","custom solvers"],"integration":["Teamcenter connector","3DEXPERIENCE connector"]}',
  1,
  'https://www.linkedin.com/company/esi-group/',
  '321665630',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  63, 'warm', 1776520000
);

-- 3. Cenit France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa03-4b1c-9d03-plm000000003',
  'Cenit France',
  'cenit.com',
  'Filiale francaise du groupe CENIT AG, specialiste de l''integration PLM et de la transformation digitale industrielle. Partenaire premium Dassault Systemes pour le deploiement 3DEXPERIENCE et la migration CATIA V5 vers V6 dans l''aeronautique et l''automobile.',
  'PLM/Simulation', 'PLM Integration & Consulting',
  'Toulouse', 'France', 180, 28000000, 2024,
  '{"plm":["3DEXPERIENCE","ENOVIA","CATIA V6"],"integration":["SAP PLM connector","FASTSUITE"],"cad":["CATIA V5/V6","3DEXPERIENCE SOLIDWORKS"],"automation":["FASTSUITE E2 robotics"],"cloud":["3DEXPERIENCE Cloud","Azure"]}',
  1,
  'https://www.linkedin.com/company/cenit-ag/',
  '432789561',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'warm', 1776520000
);

-- 4. PTC France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa04-4b1c-9d04-plm000000004',
  'PTC France',
  'ptc.com',
  'Filiale francaise de PTC Inc., editeur de Windchill (PLM), Creo (CAO 3D), ThingWorx (IoT) et Vuforia (realite augmentee). Fournisseur cle de l''industrie manufacturiere francaise pour la continuite numerique et l''Industrie 4.0.',
  'PLM/Simulation', 'PLM IoT & CAD Software',
  'Issy-les-Moulineaux', 'France', 350, 95000000, 2024,
  '{"plm":["Windchill","FlexPLM"],"cad":["Creo Parametric","Creo Simulate"],"iot":["ThingWorx","Kepware"],"ar":["Vuforia Studio","Vuforia Expert Capture"],"alm":["Codebeamer"],"cloud":["PTC Cloud","Azure","AWS"]}',
  1,
  'https://www.linkedin.com/company/ptc/',
  '389745612',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  66, 'warm', 1776520000
);

-- 5. Siemens Digital Industries Software France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa05-4b1c-9d05-plm000000005',
  'Siemens Digital Industries Software France',
  'sw.siemens.com',
  'Division logicielle de Siemens en France, editeur de Teamcenter (PLM), NX (CAO), Simcenter (simulation), Tecnomatix (manufacturing) et Mendix (low-code). Fournisseur majeur de jumeaux numeriques pour l''industrie aeronautique et automobile francaise.',
  'PLM/Simulation', 'PLM Digital Twin & Simulation',
  'Chatillon', 'France', 600, 320000000, 2024,
  '{"plm":["Teamcenter","Polarion"],"cad":["NX","Solid Edge"],"simulation":["Simcenter STAR-CCM+","Simcenter 3D","Amesim"],"manufacturing":["Tecnomatix","Opcenter"],"iot":["MindSphere","Industrial Edge"],"low_code":["Mendix"],"cloud":["Siemens Xcelerator Cloud","AWS"]}',
  1,
  'https://www.linkedin.com/company/siemens-software/',
  '348926173',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  70, 'warm', 1776520000
);

-- 6. Altair France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa06-4b1c-9d06-plm000000006',
  'Altair France',
  'altair.com',
  'Filiale francaise d''Altair Engineering, editeur de solutions de simulation, HPC et data analytics. Produits phares: HyperMesh, OptiStruct, Radioss, PBS Professional. Forte presence dans l''aeronautique, defense et automobile en France.',
  'PLM/Simulation', 'Simulation & HPC Software',
  'Antony', 'France', 200, 52000000, 2024,
  '{"simulation":["HyperWorks","OptiStruct","Radioss","AcuSolve","FEKO"],"optimization":["HyperStudy","Inspire"],"data":["Altair RapidMiner","Panopticon"],"hpc":["PBS Professional","Altair Access"],"cloud":["Altair One Cloud","AWS"]}',
  1,
  'https://www.linkedin.com/company/altair-engineering/',
  '412367894',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  61, 'warm', 1776520000
);

-- 7. ANSYS France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa07-4b1c-9d07-plm000000007',
  'ANSYS France',
  'ansys.com',
  'Filiale francaise d''ANSYS Inc., leader mondial de la simulation multiphysique. Fournisseur de Fluent, Mechanical, Maxwell, HFSS et Discovery. Clients majeurs dans l''aeronautique, nucleaire, automobile et defense en France. Acquis par Synopsys en 2024.',
  'PLM/Simulation', 'Multiphysics Simulation',
  'Villeurbanne', 'France', 280, 120000000, 2024,
  '{"simulation":["ANSYS Mechanical","Fluent","CFX","Maxwell","HFSS","Discovery"],"digital_twin":["ANSYS Twin Builder"],"cloud":["ANSYS Cloud","AWS","Azure"],"hpc":["ANSYS HPC","GPU computing"],"integration":["Workbench","Minerva"]}',
  1,
  'https://www.linkedin.com/company/ansys-inc/',
  '378451239',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 8. Hexagon Manufacturing Intelligence
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa08-4b1c-9d08-plm000000008',
  'Hexagon Manufacturing Intelligence',
  'hexagonmi.com',
  'Division intelligence manufacturiere d''Hexagon AB en France. Fournisseur de solutions de metrologie, CAO/FAO (VISI, WORKNC, NCSIMUL), qualite (PC-DMIS, QUINDOS) et simulation de production. Acteur majeur de la Smart Factory en France.',
  'PLM/Simulation', 'Metrology CAM & Smart Manufacturing',
  'Montoire-sur-le-Loir', 'France', 450, 185000000, 2024,
  '{"cam":["WORKNC","NCSIMUL","VISI","Alphacam"],"metrology":["PC-DMIS","QUINDOS","Leica Tracker"],"simulation":["Simufact","MSC Apex"],"quality":["Q-DAS","eMMA"],"iot":["HxGN SFx","xDR"],"cloud":["HxGN Connect","Azure"]}',
  1,
  'https://www.linkedin.com/company/hexagon-manufacturing-intelligence/',
  '345712896',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  64, 'warm', 1776520000
);

-- 9. Autodesk France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa09-4b1c-9d09-plm000000009',
  'Autodesk France',
  'autodesk.fr',
  'Filiale francaise d''Autodesk Inc., editeur d''AutoCAD, Inventor, Fusion 360, Revit et Maya. Fournisseur majeur de solutions de conception pour le BTP, l''ingenierie mecanique et le media & entertainment en France. Transition cloud SaaS en cours.',
  'PLM/Simulation', 'CAD BIM & Design Software',
  'Paris', 'France', 300, 210000000, 2024,
  '{"cad":["AutoCAD","Inventor","Fusion 360"],"bim":["Revit","Navisworks","BIM 360"],"simulation":["Moldflow","CFD","Nastran In-CAD"],"manufacturing":["Fusion 360 Manufacturing","PowerMill"],"cloud":["Autodesk Platform Services","Forge","AWS"],"m_and_e":["Maya","3ds Max"]}',
  1,
  'https://www.linkedin.com/company/autodesk/',
  '398567123',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  59, 'warm', 1776520000
);

-- 10. MSC Software France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c3d4e5f6-aa10-4b1c-9d10-plm000000010',
  'MSC Software France',
  'mscsoftware.com',
  'Filiale francaise de MSC Software (groupe Hexagon), editeur de MSC Nastran, Marc, Adams, Simufact et Digimat. Specialiste de la simulation structurelle, dynamique et materiaux composites pour l''aeronautique, automobile et defense.',
  'PLM/Simulation', 'Structural & Materials Simulation',
  'Lyon', 'France', 150, 45000000, 2024,
  '{"simulation":["MSC Nastran","Marc","Adams","Dytran","Actran"],"materials":["Digimat","MaterialCenter"],"manufacturing":["Simufact Forming","Simufact Welding","Simufact Additive"],"cloud":["MSC One Cloud","Azure"],"integration":["SimManager","Gateway"]}',
  1,
  'https://www.linkedin.com/company/msc-software/',
  '356891247',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  55, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all
-- Topics: Digital twin, 3DEXPERIENCE cloud, Teamcenter deployments, CATIA v6 migration

-- ---- Dassault Systemes News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf100001-aa01-4000-b001-plm000000001',
  'c3d4e5f6-aa01-4b1c-9d01-plm000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Dassault Systemes accelere la migration 3DEXPERIENCE Cloud pour Airbus et Safran',
  'Dassault Systemes a annonce l''acceleration du deploiement de la plateforme 3DEXPERIENCE sur le cloud pour ses clients aeronautiques majeurs. Airbus et Safran migrent progressivement depuis CATIA V5/ENOVIA V6 on-premise vers 3DEXPERIENCE Cloud, un programme estime a 500 millions EUR sur 5 ans.',
  'cloud_migration',
  'https://www.usine-digitale.fr/article/dassault-systemes-3dexperience-cloud-airbus-safran-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf100001-aa01-4000-b001-plm000000002',
  'c3d4e5f6-aa01-4b1c-9d01-plm000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Dassault Systemes lance le jumeau numerique industriel avec Renault Group',
  'Dassault Systemes et Renault Group ont devoile un jumeau numerique complet de la chaine de production de l''usine de Douai. Le digital twin integre DELMIA, SIMULIA et 3DEXPERIENCE pour optimiser la fabrication des vehicules electriques de la plateforme AmpR.',
  'digital_twin',
  'https://www.lesechos.fr/industrie-services/automobile/dassault-systemes-renault-digital-twin-usine-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf100001-aa01-4000-b001-plm000000003',
  'c3d4e5f6-aa01-4b1c-9d01-plm000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Dassault Systemes depasse les 6 milliards EUR de CA et recrute 2000 ingenieurs',
  'Dassault Systemes a publie des resultats annuels record avec un CA de 6.1 milliards EUR (+8%). Le groupe recrute 2000 ingenieurs cloud, IA et simulation pour accompagner la croissance de 3DEXPERIENCE Cloud et les projets de jumeaux numeriques.',
  'hiring',
  'https://www.usinenouvelle.com/article/dassault-systemes-resultats-recrutement-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf100001-aa01-4000-b001-plm000000004',
  'c3d4e5f6-aa01-4b1c-9d01-plm000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Dassault Systemes deploie CATIA V6 et ENOVIA pour la filiere hydrogene francaise',
  'Dassault Systemes a signe des contrats avec McPhy, Lhyfe et Faurecia pour le deploiement de CATIA V6 et ENOVIA dans la conception et l''industrialisation des electrolyseurs et reservoirs hydrogene. La plateforme 3DEXPERIENCE sert de socle a la continuite numerique.',
  'plm_deployment',
  'https://www.3ds.com/newsroom/press-releases/3dexperience-hydrogen-filiere-france-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- ESI Group News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf200002-aa02-4000-b002-plm000000001',
  'c3d4e5f6-aa02-4b1c-9d02-plm000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ESI Group deploie le prototypage virtuel immersif pour Stellantis et PSA heritage',
  'ESI Group a deploye sa solution IC.IDO de realite virtuelle immersive dans 12 usines de Stellantis en France. Le prototypage virtuel remplace 60% des prototypes physiques pour les crash-tests et l''ergonomie des postes de montage.',
  'digital_twin',
  'https://www.usine-digitale.fr/article/esi-group-stellantis-prototypage-virtuel-immersif-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf200002-aa02-4000-b002-plm000000002',
  'c3d4e5f6-aa02-4b1c-9d02-plm000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ESI Group integre ses solveurs a la plateforme 3DEXPERIENCE de Dassault Systemes',
  'Sous l''impulsion de Keysight, ESI Group a annonce l''integration native de PAM-CRASH et ProCAST dans la plateforme 3DEXPERIENCE de Dassault Systemes. Cette interoperabilite vise les clients aeronautiques utilisant CATIA V6 pour la conception et ESI pour la validation.',
  'plm_deployment',
  'https://www.esi-group.com/press-releases/3dexperience-integration-pam-crash-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf200002-aa02-4000-b002-plm000000003',
  'c3d4e5f6-aa02-4b1c-9d02-plm000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ESI Group renforce son offre de jumeau numerique pour la fonderie et la metallurgie',
  'ESI Group a lance une nouvelle version de ProCAST integrant un jumeau numerique thermomecanique complet pour les fonderies. Safran Aircraft Engines et Aubert & Duval sont les premiers clients a adopter la solution pour la fabrication de pieces aeronautiques critiques.',
  'digital_twin',
  'https://www.usinenouvelle.com/article/esi-group-procast-digital-twin-fonderie-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Cenit France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf300003-aa03-4000-b003-plm000000001',
  'c3d4e5f6-aa03-4b1c-9d03-plm000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Cenit France pilote la migration CATIA V5 vers V6 pour la supply chain aeronautique toulousaine',
  'Cenit France a remporte un contrat cadre pour accompagner 45 sous-traitants aeronautiques de la region Occitanie dans la migration de CATIA V5 vers CATIA V6 sur 3DEXPERIENCE. Le programme, soutenu par la Region et Airbus, vise la convergence PLM de la supply chain.',
  'plm_deployment',
  'https://www.air-cosmos.com/article/cenit-migration-catia-v6-supply-chain-aeronautique-2026',
  'positive', 8, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf300003-aa03-4000-b003-plm000000002',
  'c3d4e5f6-aa03-4b1c-9d03-plm000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Cenit deploie 3DEXPERIENCE chez Dassault Aviation pour le programme SCAF/NGF',
  'Cenit France a ete selectionne par Dassault Aviation pour le deploiement de la plateforme 3DEXPERIENCE dans le cadre du programme SCAF (Systeme de Combat Aerien du Futur). Le projet couvre l''integration PLM, la gestion de configuration et la collaboration multi-partenaires.',
  'plm_deployment',
  'https://www.usinenouvelle.com/article/cenit-dassault-aviation-3dexperience-scaf-2026',
  'positive', 9, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf300003-aa03-4000-b003-plm000000003',
  'c3d4e5f6-aa03-4b1c-9d03-plm000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Cenit France recrute 50 consultants PLM pour repondre a la demande de migration 3DEXPERIENCE',
  'Face a la forte demande de migration vers 3DEXPERIENCE dans l''aeronautique et la defense, Cenit France a annonce le recrutement de 50 consultants PLM specialises CATIA V6 et ENOVIA. Le bureau de Toulouse sera agrandi de 30%.',
  'hiring',
  'https://www.touleco.fr/cenit-france-recrutement-consultants-plm-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- PTC France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf400004-aa04-4000-b004-plm000000001',
  'c3d4e5f6-aa04-4b1c-9d04-plm000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'PTC France deploie Windchill et ThingWorx chez Schneider Electric pour l''Industrie 4.0',
  'PTC France a signe un contrat majeur avec Schneider Electric pour le deploiement de Windchill (PLM) et ThingWorx (IoT) sur l''ensemble des usines europeennes. Le programme vise a creer un jumeau numerique de la chaine de production avec tracabilite complete du produit.',
  'digital_twin',
  'https://www.usine-digitale.fr/article/ptc-schneider-electric-windchill-thingworx-industrie4-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf400004-aa04-4000-b004-plm000000002',
  'c3d4e5f6-aa04-4b1c-9d04-plm000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'PTC accelere la migration Creo SaaS et lance Codebeamer pour le medical device en France',
  'PTC France a annonce la disponibilite de Creo+ (version SaaS) et le deploiement de Codebeamer pour la gestion du cycle de vie des dispositifs medicaux. Medtronic France et bioMerieux sont parmi les premiers adoptants pour la conformite MDR/IVDR.',
  'cloud_migration',
  'https://www.devicemed.fr/article/ptc-creo-saas-codebeamer-medical-device-france-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf400004-aa04-4000-b004-plm000000003',
  'c3d4e5f6-aa04-4b1c-9d04-plm000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'PTC et Rockwell Automation etendent leur alliance en France pour la smart factory',
  'PTC et Rockwell Automation ont elargi leur partenariat en France avec l''integration de FactoryTalk et ThingWorx. L''alliance cible les ETI industrielles francaises pour la digitalisation des operations de production et la maintenance augmentee via Vuforia.',
  'digital_transformation',
  'https://www.industrie-techno.com/article/ptc-rockwell-alliance-smart-factory-france-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Siemens Digital Industries Software France News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf500005-aa05-4000-b005-plm000000001',
  'c3d4e5f6-aa05-4b1c-9d05-plm000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens deploie Teamcenter X dans 8 sites de Thales et Naval Group en France',
  'Siemens Digital Industries Software a remporte le deploiement de Teamcenter X (version cloud) chez Thales et Naval Group. Le programme couvre 8 sites en France pour la gestion de configuration des systemes de defense et la collaboration securisee entre donneurs d''ordre et sous-traitants.',
  'plm_deployment',
  'https://www.usinenouvelle.com/article/siemens-teamcenter-x-thales-naval-group-defense-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf500005-aa05-4000-b005-plm000000002',
  'c3d4e5f6-aa05-4b1c-9d05-plm000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens lance le jumeau numerique complet de la Gigafactory ACC de Douvrin',
  'Siemens a annonce la creation du jumeau numerique le plus complet d''Europe pour la Gigafactory ACC (Automotive Cells Company) de Douvrin. Tecnomatix, Simcenter et Teamcenter sont utilises pour simuler et optimiser l''ensemble de la chaine de production de batteries.',
  'digital_twin',
  'https://www.lesechos.fr/industrie-services/automobile/siemens-digital-twin-gigafactory-acc-douvrin-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf500005-aa05-4000-b005-plm000000003',
  'c3d4e5f6-aa05-4b1c-9d05-plm000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens Xcelerator Cloud adopte par Safran pour la simulation aerothermique des moteurs LEAP',
  'Safran Aircraft Engines a selectionne Simcenter STAR-CCM+ sur Siemens Xcelerator Cloud pour la simulation CFD des moteurs LEAP et du futur moteur RISE. Le passage au cloud HPC permet de reduire les cycles de simulation de 40%.',
  'cloud_migration',
  'https://www.air-cosmos.com/article/siemens-safran-simcenter-xcelerator-cloud-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf500005-aa05-4000-b005-plm000000004',
  'c3d4e5f6-aa05-4b1c-9d05-plm000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Siemens recrute 200 ingenieurs en France pour Teamcenter et Simcenter',
  'Siemens Digital Industries Software France prevoit de recruter 200 ingenieurs et consultants sur 2026-2027, principalement a Chatillon et Toulouse. Les postes ciblent les competences Teamcenter, NX, Simcenter et MindSphere pour accompagner les grands comptes defense et aeronautique.',
  'hiring',
  'https://www.usinenouvelle.com/article/siemens-software-recrutement-france-teamcenter-2026',
  'positive', 6, 1775700000, 1775950000, 1776520000
);

-- ---- Altair France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf600006-aa06-4000-b006-plm000000001',
  'c3d4e5f6-aa06-4b1c-9d06-plm000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Altair France deploie OptiStruct pour l''allegement des structures du programme A350 XWB',
  'Altair France a etendu son partenariat avec Airbus pour le deploiement d''OptiStruct et Inspire dans l''optimisation topologique des composants structurels de l''A350 XWB. L''objectif est un gain de masse de 15% sur les pieces metalliques et composites.',
  'digital_twin',
  'https://www.air-cosmos.com/article/altair-airbus-optistruct-a350-allegement-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf600006-aa06-4000-b006-plm000000002',
  'c3d4e5f6-aa06-4b1c-9d06-plm000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Altair lance Altair One Cloud en France avec un datacenter OVHcloud',
  'Altair a inaugure un noeud de calcul HPC sur l''infrastructure OVHcloud a Roubaix pour proposer Altair One Cloud aux industriels francais. La solution permet l''acces a HyperWorks, Radioss et RapidMiner en mode SaaS avec souverainete des donnees.',
  'cloud_migration',
  'https://www.usine-digitale.fr/article/altair-one-cloud-ovhcloud-france-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf600006-aa06-4000-b006-plm000000003',
  'c3d4e5f6-aa06-4b1c-9d06-plm000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Altair et Faurecia (FORVIA) co-developpent la simulation des reservoirs hydrogene haute pression',
  'Altair France et FORVIA (ex-Faurecia) ont annonce un partenariat R&D pour la simulation des reservoirs hydrogene type IV. Radioss et OptiStruct sont utilises pour optimiser le bobinage composite et predire le comportement au crash des systemes de stockage.',
  'digital_twin',
  'https://www.industrie-techno.com/article/altair-forvia-simulation-reservoirs-hydrogene-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- ANSYS France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf700007-aa07-4000-b007-plm000000001',
  'c3d4e5f6-aa07-4b1c-9d07-plm000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ANSYS France fournit la simulation multiphysique du jumeau numerique des centrales EPR2',
  'ANSYS France a signe un accord cadre avec EDF et Framatome pour la fourniture de licences ANSYS Mechanical, Fluent et Twin Builder destinees a la creation des jumeaux numeriques des reacteurs EPR2. Le programme couvre la simulation thermomecanique, thermohydraulique et le monitoring en temps reel.',
  'digital_twin',
  'https://www.sfen.org/rgn/ansys-edf-framatome-digital-twin-epr2-simulation-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf700007-aa07-4000-b007-plm000000002',
  'c3d4e5f6-aa07-4b1c-9d07-plm000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Synopsys finalise l''integration d''ANSYS et lance la plateforme de simulation unifiee',
  'Suite a l''acquisition par Synopsys, ANSYS France a devoile la nouvelle plateforme de simulation unifiee combinant ANSYS Workbench et les outils Synopsys pour la co-simulation semi-conducteurs/systemes. L''offre cible STMicroelectronics et les fonderies europeennes.',
  'digital_transformation',
  'https://www.lesechos.fr/tech-medias/hightech/synopsys-ansys-plateforme-simulation-unifiee-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf700007-aa07-4000-b007-plm000000003',
  'c3d4e5f6-aa07-4b1c-9d07-plm000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ANSYS Cloud HPC adopte par Valeo et Faurecia pour la simulation electromagnetic des vehicules electriques',
  'ANSYS France a annonce que Valeo et FORVIA (ex-Faurecia) utilisent ANSYS HFSS et Maxwell sur ANSYS Cloud pour la simulation electromagnetique des composants de vehicules electriques. Le cloud HPC permet de traiter des modeles 10x plus grands qu''en local.',
  'cloud_migration',
  'https://www.usine-digitale.fr/article/ansys-cloud-valeo-faurecia-simulation-ev-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Hexagon Manufacturing Intelligence News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf800008-aa08-4000-b008-plm000000001',
  'c3d4e5f6-aa08-4b1c-9d08-plm000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Hexagon MI deploie le jumeau numerique de production chez Safran Landing Systems',
  'Hexagon Manufacturing Intelligence a deploye sa solution de jumeau numerique de production integrant NCSIMUL, PC-DMIS et HxGN SFx chez Safran Landing Systems a Molsheim. Le systeme couvre la chaine FAO-metrologie-qualite pour les trains d''atterrissage de l''A320neo et du LEAP.',
  'digital_twin',
  'https://www.usinenouvelle.com/article/hexagon-safran-landing-digital-twin-production-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf800008-aa08-4000-b008-plm000000002',
  'c3d4e5f6-aa08-4b1c-9d08-plm000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Hexagon lance WORKNC 2026 avec simulation IA integree pour l''usinage 5 axes',
  'Hexagon a lance WORKNC 2026 integrant un module de simulation pilote par IA pour l''optimisation des parcours d''outils 5 axes. La solution developpe a Montoire-sur-le-Loir cible les usineurs aeronautiques et medicaux en France.',
  'digital_transformation',
  'https://www.industrie-techno.com/article/hexagon-worknc-2026-simulation-ia-usinage-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf800008-aa08-4000-b008-plm000000003',
  'c3d4e5f6-aa08-4b1c-9d08-plm000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Hexagon MI connecte sa metrologie a Teamcenter de Siemens pour la tracabilite qualite',
  'Hexagon Manufacturing Intelligence a annonce l''integration native de PC-DMIS et QUINDOS avec Siemens Teamcenter Quality. Le connecteur permet le flux automatique des donnees de metrologie dans le PLM pour la tracabilite qualite exigee par EN9100 et IATF 16949.',
  'plm_deployment',
  'https://www.hexagonmi.com/press-releases/pc-dmis-teamcenter-quality-integration-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Autodesk France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf900009-aa09-4000-b009-plm000000001',
  'c3d4e5f6-aa09-4b1c-9d09-plm000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Autodesk France migre 150 000 utilisateurs AutoCAD vers Fusion 360 Cloud',
  'Autodesk France a lance un programme de migration massive de ses clients AutoCAD et Inventor vers Fusion 360, sa plateforme cloud unifiee CAO/FAO/simulation. La France est le 3e marche europeen avec 150 000 abonnes a migrer d''ici 2028.',
  'cloud_migration',
  'https://www.usine-digitale.fr/article/autodesk-france-migration-fusion-360-cloud-2026',
  'positive', 8, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf900009-aa09-4000-b009-plm000000002',
  'c3d4e5f6-aa09-4b1c-9d09-plm000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Autodesk deploie le BIM 360 et Revit pour le Grand Paris Express et les JO 2024 heritage',
  'Autodesk France a annonce que BIM 360 et Revit sont utilises sur 85% des projets du Grand Paris Express et les programmes de reconversion des sites olympiques. Plus de 200 cabinets d''architectes et bureaux d''etudes collaborent sur la plateforme cloud.',
  'digital_transformation',
  'https://www.batiactu.com/article/autodesk-bim-360-grand-paris-express-jo-heritage-2026',
  'positive', 7, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nf900009-aa09-4000-b009-plm000000003',
  'c3d4e5f6-aa09-4b1c-9d09-plm000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Autodesk et Vinci Construction lancent un jumeau numerique pour les infrastructures francaises',
  'Autodesk et Vinci Construction ont lance un partenariat pour creer des jumeaux numeriques d''infrastructures combinant BIM 360, InfraWorks et Forge. Le premier projet pilote couvre l''autoroute A69 Toulouse-Castres et 3 ouvrages d''art du Grand Paris.',
  'digital_twin',
  'https://www.usinenouvelle.com/article/autodesk-vinci-digital-twin-infrastructures-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- MSC Software France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nfa00010-aa10-4000-b010-plm000000001',
  'c3d4e5f6-aa10-4b1c-9d10-plm000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'MSC Software France fournit Nastran et Digimat pour le programme A321XLR d''Airbus',
  'MSC Software France a etendu son contrat avec Airbus pour la fourniture de MSC Nastran et Digimat sur le programme A321XLR. La simulation des structures composites du fuselage arriere est realisee avec Digimat pour predire le comportement des materiaux dans les conditions de vol.',
  'digital_twin',
  'https://www.air-cosmos.com/article/msc-software-airbus-a321xlr-nastran-digimat-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nfa00010-aa10-4000-b010-plm000000002',
  'c3d4e5f6-aa10-4b1c-9d10-plm000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'MSC Software lance Simufact Additive 2026 pour la fabrication additive metallique certifiee',
  'MSC Software a lance Simufact Additive 2026 integrant la simulation du processus d''impression 3D metallique certifie aeronautique. Safran Additive Manufacturing et AddUp sont les premiers clients francais a valider la solution pour les pieces critiques de turbines.',
  'digital_transformation',
  'https://www.industrie-techno.com/article/msc-simufact-additive-2026-certification-aeronautique',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nfa00010-aa10-4000-b010-plm000000003',
  'c3d4e5f6-aa10-4b1c-9d10-plm000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'MSC Software integre Adams et Marc au jumeau numerique Hexagon pour la simulation de production',
  'MSC Software et Hexagon MI ont integre les solveurs Adams (dynamique multicorps) et Marc (non-lineaire) dans le jumeau numerique de production Hexagon. L''objectif est de simuler le comportement dynamique des machines-outils et l''impact sur la qualite des pieces usinees.',
  'digital_twin',
  'https://www.usinenouvelle.com/article/msc-hexagon-adams-marc-digital-twin-production-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================
-- PLM/Simulation vendors: industry_specific_software=90 (mapped to 9), erp_plm_migration=80 (mapped to 8)
-- prospect_score 55-75, warm band

-- 1. Dassault Systemes (score=72)
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
  'ps-plm01-aa01-4000-c001-plm000000001',
  'c3d4e5f6-aa01-4b1c-9d01-plm000000001',
  8, 7, 8, 9,
  8, 8, 9, 8,
  7, 9, 6, 7,
  3, 5, 4, 2, 6,
  8, 5, 4, 6,
  8, 9, 5, 7, 8,
  6, 9, 8, 8,
  8, 8, 9, 8,
  4, 3, 7,
  7, 6, 4, 9, 7,
  6, 3, 5,
  8, 2, 9,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 2. ESI Group (score=63)
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
  'ps-plm02-aa02-4000-c002-plm000000002',
  'c3d4e5f6-aa02-4b1c-9d02-plm000000002',
  7, 6, 5, 8,
  7, 7, 7, 6,
  5, 8, 4, 6,
  2, 5, 5, 3, 5,
  5, 4, 3, 5,
  7, 8, 4, 5, 6,
  4, 7, 7, 6,
  7, 8, 6, 7,
  6, 8, 6,
  6, 5, 3, 9, 5,
  5, 2, 4,
  6, 2, 7,
  63, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 3. Cenit France (score=58)
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
  'ps-plm03-aa03-4000-c003-plm000000003',
  'c3d4e5f6-aa03-4b1c-9d03-plm000000003',
  7, 6, 4, 6,
  8, 8, 6, 5,
  5, 6, 3, 5,
  2, 4, 4, 3, 5,
  6, 5, 4, 6,
  7, 6, 4, 5, 5,
  4, 5, 8, 7,
  6, 8, 5, 7,
  3, 2, 7,
  5, 4, 3, 9, 4,
  4, 4, 4,
  7, 2, 6,
  58, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 4. PTC France (score=66)
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
  'ps-plm04-aa04-4000-c004-plm000000004',
  'c3d4e5f6-aa04-4b1c-9d04-plm000000004',
  7, 7, 5, 7,
  7, 7, 8, 7,
  6, 8, 5, 6,
  2, 4, 4, 2, 6,
  6, 4, 4, 5,
  7, 8, 4, 6, 7,
  5, 8, 7, 7,
  7, 8, 7, 8,
  4, 3, 6,
  6, 5, 3, 9, 7,
  5, 2, 5,
  7, 2, 7,
  66, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 5. Siemens Digital Industries Software France (score=70)
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
  'ps-plm05-aa05-4000-c005-plm000000005',
  'c3d4e5f6-aa05-4b1c-9d05-plm000000005',
  8, 7, 7, 8,
  7, 8, 9, 8,
  7, 9, 6, 7,
  3, 4, 4, 2, 6,
  7, 5, 4, 5,
  8, 9, 5, 7, 7,
  5, 8, 7, 8,
  8, 8, 8, 8,
  4, 5, 7,
  7, 5, 4, 9, 8,
  6, 4, 5,
  8, 2, 8,
  70, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 6. Altair France (score=61)
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
  'ps-plm06-aa06-4000-c006-plm000000006',
  'c3d4e5f6-aa06-4b1c-9d06-plm000000006',
  7, 6, 5, 8,
  6, 6, 7, 6,
  5, 8, 4, 5,
  2, 5, 4, 2, 5,
  5, 4, 3, 5,
  8, 8, 4, 5, 6,
  4, 7, 6, 6,
  6, 8, 7, 6,
  3, 3, 5,
  5, 4, 3, 9, 5,
  5, 3, 4,
  6, 2, 7,
  61, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 7. ANSYS France (score=68)
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
  'ps-plm07-aa07-4000-c007-plm000000007',
  'c3d4e5f6-aa07-4b1c-9d07-plm000000007',
  8, 7, 5, 8,
  7, 7, 8, 7,
  6, 9, 5, 6,
  2, 5, 4, 2, 6,
  6, 4, 4, 5,
  8, 9, 4, 6, 7,
  4, 8, 7, 7,
  7, 8, 8, 7,
  4, 8, 6,
  6, 5, 3, 9, 6,
  6, 3, 5,
  8, 2, 8,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 8. Hexagon Manufacturing Intelligence (score=64)
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
  'ps-plm08-aa08-4000-c008-plm000000008',
  'c3d4e5f6-aa08-4b1c-9d08-plm000000008',
  7, 6, 6, 7,
  6, 7, 8, 7,
  6, 7, 5, 6,
  2, 4, 4, 2, 6,
  6, 4, 4, 5,
  7, 7, 4, 5, 6,
  5, 7, 6, 6,
  7, 8, 6, 7,
  3, 4, 6,
  6, 5, 3, 9, 6,
  5, 2, 5,
  6, 2, 7,
  64, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 9. Autodesk France (score=59)
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
  'ps-plm09-aa09-4000-c009-plm000000009',
  'c3d4e5f6-aa09-4b1c-9d09-plm000000009',
  6, 6, 5, 7,
  7, 6, 8, 6,
  5, 7, 4, 6,
  2, 3, 4, 2, 5,
  5, 4, 3, 5,
  6, 7, 4, 5, 6,
  4, 7, 7, 6,
  6, 8, 8, 6,
  3, 3, 5,
  5, 5, 3, 9, 4,
  5, 2, 4,
  5, 2, 6,
  59, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 10. MSC Software France (score=55)
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
  'ps-plm10-aa10-4000-c010-plm000000010',
  'c3d4e5f6-aa10-4b1c-9d10-plm000000010',
  6, 5, 4, 7,
  6, 6, 7, 5,
  4, 7, 3, 5,
  2, 4, 4, 2, 5,
  4, 3, 3, 4,
  7, 7, 3, 4, 5,
  3, 6, 5, 5,
  5, 8, 5, 6,
  3, 5, 5,
  5, 4, 3, 9, 4,
  4, 2, 4,
  5, 2, 6,
  55, 'warm',
  1776520000, 1776520000, 1776520000
);
