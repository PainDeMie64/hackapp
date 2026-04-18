-- =============================================================================
-- SEED: 10 French/European Space Sector Companies
-- ArianeGroup, Airbus Defence and Space, Thales Alenia Space, CS Group,
-- Telespazio France, Hemeria, Loft Orbital, Kineis, Unseenlabs, Exotrail
-- Timestamp: 1776520000 (all created_at/updated_at)
-- source_id: 00238d74-63da-4b37-88cb-ff4357db7e13
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. ArianeGroup
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0001-4f2a-9c3d-5e8f1a2b3c01',
  'ArianeGroup',
  'ariane.group',
  'Leader europeen des lanceurs spatiaux et de la propulsion spatiale. Maitre d''oeuvre d''Ariane 6, co-entreprise Airbus/Safran. Responsable de la dissuasion nucleaire oceanique francaise (missiles M51). 7000 employes entre la France et l''Allemagne.',
  'Space', 'Launch Vehicles & Propulsion',
  'Paris', 'France', 7000, 3200000000, 2024,
  '{"simulation":["ANSYS Fluent","Abaqus","Nastran"],"plm":["Siemens Teamcenter","NX"],"erp":["SAP S/4HANA"],"cad":["CATIA V5","Creo"],"embedded":["VxWorks","RTEMS","Ada"],"cloud":["OVHcloud","Azure"],"cybersecurity":["Thales Cybels","Stormshield"],"devops":["GitLab CI","Jenkins"],"data":["Databricks","Python scientific stack"]}',
  1,
  'https://www.linkedin.com/company/arianegroup/',
  '538033147',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  88, 'hot', 1776520000
);

-- 2. Airbus Defence and Space
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0002-4f2a-9c3d-5e8f1a2b3c02',
  'Airbus Defence and Space',
  'airbus.com',
  'Division defense et espace d''Airbus. Numero un europeen des satellites de telecommunications et d''observation, systemes militaires, drones MALE et cybersecurite. Maitre d''oeuvre du programme Copernicus et contributeur majeur a l''ISS et Orion ESM.',
  'Space', 'Satellites & Defence Systems',
  'Toulouse', 'France', 35000, 11400000000, 2024,
  '{"simulation":["ANSYS","MSC Nastran","STK"],"plm":["Siemens Teamcenter","Windchill"],"erp":["SAP S/4HANA"],"cad":["CATIA V5","Creo","NX"],"cloud":["AWS GovCloud","OVHcloud Sovereign"],"cybersecurity":["Airbus CyberSecurity","Stormshield","Atos Bull"],"ai_ml":["TensorFlow","PyTorch","Databricks"],"embedded":["VxWorks","RTEMS","LEON3"],"devops":["GitLab","Kubernetes","Terraform"]}',
  1,
  'https://www.linkedin.com/company/airbus-defence-and-space/',
  '383474814',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  90, 'hot', 1776520000
);

-- 3. Thales Alenia Space
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0003-4f2a-9c3d-5e8f1a2b3c03',
  'Thales Alenia Space',
  'thalesaleniaspace.com',
  'Co-entreprise Thales (67%) / Leonardo (33%). Leader europeen des infrastructures spatiales orbitales, satellites de navigation (Galileo), telecommunications et observation de la Terre. Maitre d''oeuvre du module ESPRIT de la station Lunar Gateway.',
  'Space', 'Satellites & Orbital Infrastructure',
  'Cannes', 'France', 8900, 2800000000, 2024,
  '{"simulation":["ANSYS HFSS","CST Studio","Nastran","MATLAB/Simulink"],"plm":["Siemens Teamcenter"],"erp":["SAP ECC","SAP S/4HANA migration"],"cad":["CATIA V5","NX"],"embedded":["RTEMS","VxWorks","SpaceWire"],"cybersecurity":["Thales Cybels","CipherTrust"],"cloud":["OVHcloud","Private cloud"],"test":["LabVIEW","DOORS"],"devops":["GitLab CI","Jenkins"]}',
  1,
  'https://www.linkedin.com/company/thales-alenia-space/',
  '414946117',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  86, 'hot', 1776520000
);

-- 4. CS Group
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0004-4f2a-9c3d-5e8f1a2b3c04',
  'CS Group',
  'csgroup.eu',
  'Entreprise de services numeriques specialisee dans les systemes critiques pour le spatial, la defense et la cybersecurite. Fournisseur historique du CNES pour les centres de controle et le traitement d''images satellite. Expert en systemes embarques temps reel et IA appliquee.',
  'Space', 'Space Systems & Cybersecurity',
  'Toulouse', 'France', 2200, 280000000, 2024,
  '{"embedded":["Ada","C/C++ safety-critical","RTEMS","VxWorks"],"simulation":["MATLAB/Simulink","STK","GMAT"],"cybersecurity":["Prelude SIEM","Stormshield","ANSSI tools"],"cloud":["OVHcloud","OpenStack private"],"ai_ml":["TensorFlow","scikit-learn","OpenCV"],"devops":["GitLab CI","Docker","Ansible"],"erp":["SAP Business One"],"data":["Elasticsearch","Grafana","InfluxDB"]}',
  1,
  'https://www.linkedin.com/company/cs-group-/',
  '312930289',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  78, 'warm', 1776520000
);

-- 5. Telespazio France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0005-4f2a-9c3d-5e8f1a2b3c05',
  'Telespazio France',
  'telespazio.com',
  'Filiale francaise de Telespazio (Leonardo/Thales). Operateur de services spatiaux: exploitation de satellites, geoinformation, navigation et telecommunications par satellite. Operateur du centre spatial de Kourou pour le compte du CNES et d''Arianespace.',
  'Space', 'Satellite Operations & Services',
  'Toulouse', 'France', 1200, 350000000, 2024,
  '{"ground_segment":["SCOS-2000","EGS-CC"],"geospatial":["QGIS","ArcGIS","SNAP"],"cloud":["AWS","OVHcloud"],"data":["PostGIS","Elasticsearch","Kafka"],"erp":["SAP Business ByDesign"],"cybersecurity":["Thales Cybels","CyberArk"],"devops":["GitLab","Docker","Kubernetes"],"ai_ml":["TensorFlow","PyTorch Earth Observation"]}',
  1,
  'https://www.linkedin.com/company/telespazio-france/',
  '342404255',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  74, 'warm', 1776520000
);

-- 6. Hemeria
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0006-4f2a-9c3d-5e8f1a2b3c06',
  'Hemeria',
  'hemeria-group.com',
  'PME spatiale francaise specialisee dans les nanosatellites, ballons stratospheriques et systemes embarques pour la defense. Maitre d''oeuvre de la constellation YODA (DGA) et du programme MUSIC du CNES. Anciennement Nexeya Space.',
  'Space', 'Nanosatellites & Stratospheric Systems',
  'Toulouse', 'France', 450, 75000000, 2024,
  '{"embedded":["C/C++","VHDL/FPGA","FreeRTOS"],"cad":["CATIA V5","Altium Designer"],"simulation":["MATLAB/Simulink","STK"],"test":["LabVIEW","custom EGSE"],"erp":["Sage X3"],"cloud":["OVHcloud"],"devops":["GitLab CI","Jenkins"],"cybersecurity":["ANSSI-qualified tools"]}',
  1,
  'https://www.linkedin.com/company/hemeria/',
  '380129166',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  76, 'warm', 1776520000
);

-- 7. Loft Orbital
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0007-4f2a-9c3d-5e8f1a2b3c07',
  'Loft Orbital',
  'loftorbital.com',
  'Start-up franco-americaine de Space-as-a-Service. Deploie des charges utiles clients sur des satellites partages en orbite basse. Modele innovant d''hebergement spatial permettant un acces rapide et abordable a l''espace. Levee de fonds de 154 M$ en Serie C.',
  'Space', 'Space-as-a-Service',
  'Toulouse', 'France', 250, 45000000, 2024,
  '{"cloud":["AWS","GCP"],"embedded":["Linux embarque","C/C++","Rust"],"devops":["Kubernetes","Terraform","GitLab CI","ArgoCD"],"data":["Snowflake","Apache Kafka","PostgreSQL"],"ai_ml":["PyTorch","TensorFlow on-orbit"],"simulation":["STK","GMAT","FreeFlyer"],"cybersecurity":["Zero-trust architecture","Vault"],"frontend":["React","TypeScript"]}',
  0,
  'https://www.linkedin.com/company/loft-orbital/',
  '842aborb47',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  72, 'warm', 1776520000
);

-- 8. Kineis
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0008-4f2a-9c3d-5e8f1a2b3c08',
  'Kineis',
  'kineis.com',
  'Operateur satellite IoT francais issu du CNES. Deploie une constellation de 25 nanosatellites pour la connectivite IoT mondiale en temps quasi-reel. Successeur du systeme ARGOS. Financement de 100 M EUR dont BPI France et CNES. Premier operateur europeen d''IoT spatial.',
  'Space', 'Satellite IoT Constellation',
  'Toulouse', 'France', 120, 15000000, 2024,
  '{"embedded":["C/C++","VHDL/FPGA","FreeRTOS"],"cloud":["AWS","OVHcloud"],"iot":["LoRaWAN","ARGOS protocol","MQTT"],"data":["TimescaleDB","Apache Kafka","Grafana"],"devops":["Kubernetes","Terraform","GitHub Actions"],"frontend":["React","TypeScript"],"simulation":["STK","MATLAB"],"cybersecurity":["AWS Security Hub","custom encryption"]}',
  0,
  'https://www.linkedin.com/company/kineis/',
  '844434516',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  75, 'warm', 1776520000
);

-- 9. Unseenlabs
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0009-4f2a-9c3d-5e8f1a2b3c09',
  'Unseenlabs',
  'unseenlabs.space',
  'Start-up bretonne pionniere de la surveillance maritime par detection de signaux radiofrequences depuis l''espace. Constellation de nanosatellites BRO (Breizh Reconnaissance Orbiter) pour la detection et geolocalisation de navires sans AIS. Clients defense et renseignement.',
  'Space', 'RF Geolocation & Maritime Surveillance',
  'Rennes', 'France', 85, 12000000, 2024,
  '{"embedded":["C/C++","VHDL/FPGA","SDR"],"signal_processing":["GNU Radio","MATLAB","Python NumPy/SciPy"],"cloud":["AWS","OVHcloud"],"ai_ml":["PyTorch","scikit-learn","RF fingerprinting"],"data":["PostgreSQL","PostGIS","Elasticsearch"],"devops":["GitLab CI","Docker","Kubernetes"],"cybersecurity":["ANSSI-qualified","classified systems"],"frontend":["React","Mapbox GL"]}',
  0,
  'https://www.linkedin.com/company/unseenlabs/',
  '832674489',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  73, 'warm', 1776520000
);

-- 10. Exotrail
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c9a1e7b3-0010-4f2a-9c3d-5e8f1a2b3c10',
  'Exotrail',
  'exotrail.com',
  'Start-up NewSpace francaise specialisee dans la propulsion electrique pour petits satellites et le logiciel de mission spatiale. Propulseur a effet Hall ExoMG et suite logicielle ExoOPS pour l''optimisation de missions en constellation. Levee de 54 M EUR.',
  'Space', 'Electric Propulsion & Mission Software',
  'Massy', 'France', 150, 20000000, 2024,
  '{"embedded":["C/C++","Rust","VHDL/FPGA"],"simulation":["COMSOL","MATLAB/Simulink","GMAT","FreeFlyer"],"cloud":["AWS","GCP"],"devops":["GitHub Actions","Docker","Kubernetes","Terraform"],"ai_ml":["Python ML stack","reinforcement learning"],"frontend":["React","TypeScript","Three.js"],"data":["PostgreSQL","ClickHouse","Grafana"],"cybersecurity":["SOC2","ANSSI guidelines"]}',
  0,
  'https://www.linkedin.com/company/exotrail/',
  '830816744',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  70, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- ArianeGroup News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-sp01-4000-b001-ari000000001',
  'c9a1e7b3-0001-4f2a-9c3d-5e8f1a2b3c01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Ariane 6 reussit son cinquieme vol commercial depuis Kourou',
  'ArianeGroup a effectue avec succes le cinquieme lancement commercial d''Ariane 6 depuis le Centre spatial guyanais, mettant en orbite deux satellites de telecommunications pour Eutelsat. Le lanceur confirme sa fiabilite et son retour a la competitivite face a SpaceX.',
  'space_launch',
  'https://www.lesechos.fr/industrie-services/air-defense/ariane-6-cinquieme-vol-commercial-succes-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-sp01-4000-b001-ari000000002',
  'c9a1e7b3-0001-4f2a-9c3d-5e8f1a2b3c01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ArianeGroup recrute 800 ingenieurs propulsion et systemes pour Ariane 6 et les futurs lanceurs',
  'ArianeGroup a annonce un plan de recrutement de 800 ingenieurs sur 2026-2028 pour monter en cadence la production d''Ariane 6 (12 lanceurs/an vises) et lancer les etudes du futur lanceur reutilisable europeen SUSIE/SALTO.',
  'hiring',
  'https://www.usinenouvelle.com/article/arianegroup-recrutement-800-ingenieurs-propulsion-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-sp01-4000-b001-ari000000003',
  'c9a1e7b3-0001-4f2a-9c3d-5e8f1a2b3c01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ESA attribue 340 M EUR a ArianeGroup pour le developpement du moteur Prometheus reutilisable',
  'L''Agence spatiale europeenne a attribue un contrat de 340 millions EUR a ArianeGroup pour poursuivre le developpement du moteur Prometheus a bas cout et reutilisable fonctionnant au methane/LOX, brique technologique cle des futurs lanceurs europeens post-Ariane 6.',
  'esa_program',
  'https://www.esa.int/Enabling_Support/Space_Transportation/ArianeGroup_Prometheus_contract_2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f10001-sp01-4000-b001-ari000000004',
  'c9a1e7b3-0001-4f2a-9c3d-5e8f1a2b3c01',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ArianeGroup digitalise sa chaine de production avec des jumeaux numeriques',
  'ArianeGroup deploie des jumeaux numeriques sur l''ensemble de sa chaine de production de lanceurs a Vernon et Les Mureaux. Le programme, en partenariat avec Siemens, vise a reduire de 30% les delais de fabrication du moteur Vulcain 2.1 et de l''etage superieur.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/arianegroup-jumeaux-numeriques-production-lanceurs-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- Airbus Defence and Space News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f20002-sp02-4000-b002-ads000000001',
  'c9a1e7b3-0002-4f2a-9c3d-5e8f1a2b3c02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus Defence and Space remporte le contrat de la constellation IRIS2 pour la connectivite europeenne souveraine',
  'Airbus DS a ete selectionne comme co-prime contractor avec Thales Alenia Space pour la constellation europeenne IRIS2 (Infrastructure for Resilience, Interconnectivity and Security by Satellite). Le programme de 6 milliards EUR prevoit 290 satellites en orbites multiples.',
  'satellite_contract',
  'https://www.airbus.com/en/newsroom/press-releases/iris2-constellation-contract-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f20002-sp02-4000-b002-ads000000002',
  'c9a1e7b3-0002-4f2a-9c3d-5e8f1a2b3c02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus DS livre le module de service europeen ESM-4 pour la mission Artemis IV de la NASA',
  'Airbus Defence and Space a livre le quatrieme module de service europeen (ESM) du vaisseau Orion au Kennedy Space Center. L''ESM fournit propulsion, electricite et controle thermique pour la mission lunaire Artemis IV prevue en 2028.',
  'space_exploration',
  'https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Orion/ESM4_delivery_2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f20002-sp02-4000-b002-ads000000003',
  'c9a1e7b3-0002-4f2a-9c3d-5e8f1a2b3c02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus DS recrute 2500 ingenieurs pour les programmes spatiaux Copernicus et IRIS2',
  'Airbus Defence and Space a annonce le recrutement de 2500 ingenieurs et techniciens specialises en systemes spatiaux, traitement de donnees satellite et cybersecurite pour soutenir les mega-programmes europeens Copernicus Expansion et IRIS2.',
  'hiring',
  'https://www.usinenouvelle.com/article/airbus-ds-recrutement-2500-ingenieurs-spatial-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f20002-sp02-4000-b002-ads000000004',
  'c9a1e7b3-0002-4f2a-9c3d-5e8f1a2b3c02',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Airbus DS deploie une plateforme IA pour l''analyse d''images satellite en temps reel',
  'Airbus Defence and Space a lance OneAtlas Intelligence, une plateforme cloud alimentee par IA pour l''analyse automatisee d''images satellite en temps quasi-reel. La solution cible les marches defense, renseignement et agriculture de precision.',
  'digital_transformation',
  'https://www.usine-digitale.fr/article/airbus-ds-oneatlas-intelligence-ia-satellite-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- Thales Alenia Space News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f30003-sp03-4000-b003-tas000000001',
  'c9a1e7b3-0003-4f2a-9c3d-5e8f1a2b3c03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Thales Alenia Space livre le module ESPRIT pour la station Lunar Gateway',
  'Thales Alenia Space a acheve l''integration du module ESPRIT (European System Providing Refuelling, Infrastructure and Telecommunications) pour la station Lunar Gateway de la NASA. Le module fournira telecoms, stockage de xenon et hublot d''observation lunaire.',
  'space_exploration',
  'https://www.thalesaleniaspace.com/en/press-releases/esprit-module-lunar-gateway-delivery-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f30003-sp03-4000-b003-tas000000002',
  'c9a1e7b3-0003-4f2a-9c3d-5e8f1a2b3c03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Thales Alenia Space co-prime sur IRIS2 avec 170 satellites a produire a Cannes et Turin',
  'Thales Alenia Space a confirme sa position de co-prime contractor sur la constellation souveraine europeenne IRIS2. L''industriel assemblera 170 satellites sur ses sites de Cannes et Turin, avec un investissement de 200 M EUR dans de nouvelles lignes d''assemblage automatisees.',
  'satellite_contract',
  'https://www.lesechos.fr/industrie-services/air-defense/thales-alenia-space-iris2-production-170-satellites-2026',
  'positive', 9, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f30003-sp03-4000-b003-tas000000003',
  'c9a1e7b3-0003-4f2a-9c3d-5e8f1a2b3c03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ESA selectionne Thales Alenia Space pour les satellites Sentinel Expansion du programme Copernicus',
  'Thales Alenia Space a ete retenu par l''ESA pour la construction de trois nouveaux satellites d''observation de la Terre du programme Copernicus Expansion: Sentinel-7 (monitoring CO2), Sentinel-8 (temperature de surface) et Sentinel-9 (altimetrie glaces polaires).',
  'esa_program',
  'https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Thales_Alenia_Space_Sentinel_Expansion_2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f30003-sp03-4000-b003-tas000000004',
  'c9a1e7b3-0003-4f2a-9c3d-5e8f1a2b3c03',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Thales Alenia Space recrute 1500 ingenieurs pour la montee en cadence IRIS2 et Galileo 2e generation',
  'Face a la montee en charge des mega-constellations IRIS2 et Galileo 2e generation, Thales Alenia Space recrute 1500 profils specialises en antennes, traitement du signal, systemes embarques et integration satellite sur ses sites de Cannes, Toulouse et Turin.',
  'hiring',
  'https://www.usinenouvelle.com/article/thales-alenia-space-recrutement-1500-ingenieurs-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);


-- ---- CS Group News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f40004-sp04-4000-b004-csg000000001',
  'c9a1e7b3-0004-4f2a-9c3d-5e8f1a2b3c04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'CS Group renouvelle le contrat d''exploitation du Centre de controle du CNES pour 10 ans',
  'CS Group a remporte le renouvellement du contrat d''exploitation et de maintenance du centre de controle satellite du CNES a Toulouse. Le contrat de 180 millions EUR sur 10 ans couvre l''operation de 25 satellites scientifiques et d''observation de la Terre.',
  'satellite_contract',
  'https://www.air-cosmos.com/article/cs-group-contrat-cnes-centre-controle-10-ans-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f40004-sp04-4000-b004-csg000000002',
  'c9a1e7b3-0004-4f2a-9c3d-5e8f1a2b3c04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'CS Group fournira le segment sol de la constellation militaire SYRACUSE IV',
  'CS Group a ete selectionne par la DGA pour la conception et le deploiement du segment sol du systeme de telecommunications militaires SYRACUSE IV. Le contrat de 120 M EUR inclut les stations de controle, la cybersecurite et l''integration avec les systemes OTAN.',
  'defense_contract',
  'https://www.defense.gouv.fr/actualites/cs-group-segment-sol-syracuse-iv-2026',
  'positive', 8, 1775850000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f40004-sp04-4000-b004-csg000000003',
  'c9a1e7b3-0004-4f2a-9c3d-5e8f1a2b3c04',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'CS Group developpe un systeme d''IA pour la detection autonome de debris spatiaux',
  'CS Group a annonce le developpement d''un systeme de surveillance spatiale (SSA) base sur l''intelligence artificielle pour le CNES. Le systeme permettra la detection et le suivi autonome de 50 000 debris orbitaux et l''alerte anti-collision en temps reel pour les operateurs europeens.',
  'space_innovation',
  'https://www.air-cosmos.com/article/cs-group-ia-detection-debris-spatiaux-cnes-2026',
  'positive', 7, 1775700000, 1775900000, 1776520000
);


-- ---- Telespazio France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f50005-sp05-4000-b005-tel000000001',
  'c9a1e7b3-0005-4f2a-9c3d-5e8f1a2b3c05',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Telespazio France deploie le nouveau centre de controle Galileo 2e generation',
  'Telespazio France a demarre les operations du centre de controle de la constellation Galileo 2e generation a Toulouse. Le centre supervise les 12 premiers satellites de la nouvelle constellation offrant un positionnement centimetrique et des services de recherche et sauvetage ameliores.',
  'satellite_operations',
  'https://www.telespazio.com/en/press-releases/galileo-2nd-gen-control-center-toulouse-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f50005-sp05-4000-b005-tel000000002',
  'c9a1e7b3-0005-4f2a-9c3d-5e8f1a2b3c05',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Telespazio France remporte le contrat de geoinformation pour la Direction du Renseignement Militaire',
  'Telespazio France a ete retenu par la DRM pour la fourniture de services de geoinformation et d''analyse d''imagerie satellite sur 7 ans. Le contrat de 90 M EUR inclut le traitement automatise par IA des images Pleiades Neo et CSO.',
  'defense_contract',
  'https://www.defense.gouv.fr/actualites/telespazio-geoinformation-drm-contrat-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f50005-sp05-4000-b005-tel000000003',
  'c9a1e7b3-0005-4f2a-9c3d-5e8f1a2b3c05',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Telespazio France modernise les stations de poursuite du reseau ESTRACK pour l''ESA',
  'Telespazio France a remporte le contrat de modernisation de 8 stations de poursuite du reseau ESTRACK de l''ESA. Le programme de 60 M EUR inclut le passage aux antennes a reseau phase et l''integration des liaisons optiques laser pour les futures missions deep space.',
  'esa_program',
  'https://www.esa.int/Enabling_Support/Operations/ESTRACK_modernisation_Telespazio_2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Hemeria News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f60006-sp06-4000-b006-hem000000001',
  'c9a1e7b3-0006-4f2a-9c3d-5e8f1a2b3c06',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Hemeria livre les deux premiers nanosatellites YODA a la DGA',
  'Hemeria a acheve la livraison des deux premiers nanosatellites de la constellation YODA (Yeux en Orbite pour un Deploiement Agile) a la Direction generale de l''armement. Ces satellites de 50 kg en orbite basse fourniront des capacites d''observation duale pour les forces armees francaises.',
  'defense_contract',
  'https://www.air-cosmos.com/article/hemeria-yoda-nanosatellites-dga-livraison-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f60006-sp06-4000-b006-hem000000002',
  'c9a1e7b3-0006-4f2a-9c3d-5e8f1a2b3c06',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'CNES selectionne Hemeria pour la plateforme nanosatellite du programme scientifique MUSIC',
  'Le CNES a attribue a Hemeria le contrat de developpement de la plateforme nanosatellite du programme MUSIC (MUlti-Satellite Imaging of Clouds). La constellation de 8 nanosatellites etudiera la formation des nuages et leur impact sur le changement climatique.',
  'esa_program',
  'https://www.cnes.fr/en/hemeria-music-nanosatellite-platform-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f60006-sp06-4000-b006-hem000000003',
  'c9a1e7b3-0006-4f2a-9c3d-5e8f1a2b3c06',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Hemeria leve 30 M EUR pour industrialiser sa production de nanosatellites',
  'Hemeria a boucle une levee de fonds de 30 millions EUR menee par Tikehau Ace Capital et BPI France pour industrialiser sa chaine de production de nanosatellites a Toulouse. L''objectif est de passer de 5 a 20 satellites assembles par an d''ici 2028.',
  'funding',
  'https://www.usinenouvelle.com/article/hemeria-levee-30-millions-nanosatellites-industrialisation-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Loft Orbital News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f70007-sp07-4000-b007-lft000000001',
  'c9a1e7b3-0007-4f2a-9c3d-5e8f1a2b3c07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Loft Orbital lance 4 satellites partages YAM en orbite basse avec SpaceX',
  'Loft Orbital a deploye avec succes 4 satellites YAM (Yet Another Mission) hebergeant 18 charges utiles clients via un lancement SpaceX Transporter. Les missions couvrent l''observation de la Terre, l''IoT et les experiences technologiques pour des clients gouvernementaux et commerciaux.',
  'space_launch',
  'https://www.loftorbital.com/blog/yam-launch-4-satellites-spacex-transporter-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f70007-sp07-4000-b007-lft000000002',
  'c9a1e7b3-0007-4f2a-9c3d-5e8f1a2b3c07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Loft Orbital signe un contrat de 80 M USD avec le Space Development Agency americain',
  'Loft Orbital a remporte un contrat de 80 millions USD avec le Space Development Agency (SDA) du Pentagone pour heberger des charges utiles de detection de missiles sur ses prochains satellites. Le contrat valide le modele Space-as-a-Service pour les applications de defense.',
  'defense_contract',
  'https://www.spacenews.com/loft-orbital-sda-contract-80m-hosted-payloads-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f70007-sp07-4000-b007-lft000000003',
  'c9a1e7b3-0007-4f2a-9c3d-5e8f1a2b3c07',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Loft Orbital leve 154 M USD en Serie C pour accelerer sa cadence de lancement',
  'Loft Orbital a boucle un tour de table de 154 millions USD en Serie C mene par Insight Partners. Les fonds serviront a quadrupler la cadence de production de satellites a Toulouse et San Francisco, visant 20 satellites par an des 2028.',
  'funding',
  'https://www.lesechos.fr/start-up/loft-orbital-serie-c-154-millions-space-as-a-service-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ---- Kineis News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f80008-sp08-4000-b008-kin000000001',
  'c9a1e7b3-0008-4f2a-9c3d-5e8f1a2b3c08',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Kineis complete le deploiement de sa constellation de 25 nanosatellites IoT',
  'Kineis a annonce la mise en service operationnelle de l''ensemble de sa constellation de 25 nanosatellites dediee a l''Internet des Objets spatial. Le systeme offre une connectivite mondiale avec un temps de revisite inferieur a 15 minutes pour les capteurs IoT les plus isoles.',
  'space_launch',
  'https://www.kineis.com/en/press-releases/25-nanosatellites-constellation-complete-operational-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f80008-sp08-4000-b008-kin000000002',
  'c9a1e7b3-0008-4f2a-9c3d-5e8f1a2b3c08',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Kineis signe des accords de distribution avec Semtech et STMicroelectronics',
  'Kineis a conclu des partenariats strategiques avec Semtech et STMicroelectronics pour l''integration de sa connectivite satellite dans les chipsets LoRa et les microcontroleurs STM32. L''objectif est de connecter 10 millions d''objets IoT via satellite d''ici 2030.',
  'strategic_partnership',
  'https://www.usine-digitale.fr/article/kineis-semtech-stmicroelectronics-iot-satellite-chipsets-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f80008-sp08-4000-b008-kin000000003',
  'c9a1e7b3-0008-4f2a-9c3d-5e8f1a2b3c08',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Kineis deploie son reseau IoT spatial pour le suivi des conteneurs maritimes CMA CGM',
  'Kineis a signe un contrat majeur avec CMA CGM pour le suivi par satellite de 500 000 conteneurs maritimes. La solution offre une geolocalisation et un monitoring de temperature en temps quasi-reel, meme en haute mer hors de portee des reseaux terrestres.',
  'satellite_contract',
  'https://www.lemondeinformatique.fr/actualites/kineis-cma-cgm-iot-satellite-conteneurs-tracking-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);


-- ---- Unseenlabs News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f90009-sp09-4000-b009-uns000000001',
  'c9a1e7b3-0009-4f2a-9c3d-5e8f1a2b3c09',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Unseenlabs porte sa constellation BRO a 12 nanosatellites pour la surveillance maritime globale',
  'Unseenlabs a lance avec succes ses 11e et 12e nanosatellites BRO (Breizh Reconnaissance Orbiter), portant sa constellation a 12 unites. La capacite de revisite passe sous les 2 heures, permettant la detection et geolocalisation RF de tout navire emettant, y compris ceux qui desactivent leur AIS.',
  'space_launch',
  'https://www.air-cosmos.com/article/unseenlabs-constellation-bro-12-nanosatellites-surveillance-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f90009-sp09-4000-b009-uns000000002',
  'c9a1e7b3-0009-4f2a-9c3d-5e8f1a2b3c09',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'La Marine nationale signe un contrat pluriannuel avec Unseenlabs pour la surveillance des ZEE',
  'Unseenlabs a conclu un contrat pluriannuel avec la Marine nationale francaise pour la surveillance des Zones Economiques Exclusives (ZEE) par detection RF spatiale. La solution permet la detection de la peche illegale et du trafic maritime dans les territoires ultramarins.',
  'defense_contract',
  'https://www.defense.gouv.fr/actualites/unseenlabs-marine-nationale-surveillance-zee-rf-2026',
  'positive', 8, 1775850000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6f90009-sp09-4000-b009-uns000000003',
  'c9a1e7b3-0009-4f2a-9c3d-5e8f1a2b3c09',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Unseenlabs leve 85 M EUR pour accelerer le deploiement de sa constellation RF',
  'Unseenlabs a boucle une levee de fonds de 85 millions EUR en Serie B menee par Eurazeo et le Fonds Innovation Defense de BPI France. Les fonds financeront le deploiement de 20 satellites supplementaires pour atteindre une couverture temps reel d''ici 2029.',
  'funding',
  'https://www.lesechos.fr/start-up/unseenlabs-serie-b-85-millions-constellation-rf-maritime-2026',
  'positive', 7, 1775700000, 1775900000, 1776520000
);


-- ---- Exotrail News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6fa0010-sp10-4000-b010-exo000000001',
  'c9a1e7b3-0010-4f2a-9c3d-5e8f1a2b3c10',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Exotrail atteint 50 propulseurs ExoMG livres en orbite avec zero defaillance',
  'Exotrail a franchi le cap symbolique des 50 propulseurs a effet Hall ExoMG en operation en orbite basse, avec un taux de fiabilite de 100%. Le propulseur equipe desormais des satellites de 10 operateurs differents, dont Loft Orbital, AAC Clyde Space et Satellogic.',
  'space_milestone',
  'https://www.spacenews.com/exotrail-50-thrusters-orbit-zero-failure-milestone-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6fa0010-sp10-4000-b010-exo000000002',
  'c9a1e7b3-0010-4f2a-9c3d-5e8f1a2b3c10',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'ESA selectionne Exotrail pour la propulsion des satellites de service en orbite EROSS+',
  'L''ESA a retenu le propulseur ExoMG d''Exotrail pour equiper les vehicules de service en orbite du programme EROSS+ (European Robotic Orbital Support Services). Les propulseurs permettront les manoeuvres de rendez-vous et de desorbitation des satellites en fin de vie.',
  'esa_program',
  'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Exotrail_EROSS_propulsion_selection_2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n6fa0010-sp10-4000-b010-exo000000003',
  'c9a1e7b3-0010-4f2a-9c3d-5e8f1a2b3c10',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Exotrail lance ExoOPS 3.0 avec optimisation de trajectoire par IA pour les mega-constellations',
  'Exotrail a lance la version 3.0 de sa suite logicielle ExoOPS integrant un moteur d''optimisation de trajectoire par intelligence artificielle. La solution permet aux operateurs de mega-constellations de planifier automatiquement les manoeuvres de 500+ satellites simultanement.',
  'space_innovation',
  'https://www.usine-digitale.fr/article/exotrail-exoops-3-ia-optimisation-trajectoire-mega-constellations-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES (50 criteria each) =====================

-- ArianeGroup: top scorer - Ariane 6 prime, defense/dissuasion, ESA programs, massive hiring
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
  'ps-ari01-sp01-4000-a001-000000000001',
  'c9a1e7b3-0001-4f2a-9c3d-5e8f1a2b3c01',
  9, 9, 8, 9,
  8, 9, 8, 8,
  8, 9, 9, 6,
  4, 9, 5, 3, 9,
  9, 7, 7, 8,
  9, 8, 6, 8, 8,
  8, 9, 7, 9,
  8, 7, 6, 9,
  5, 4, 9,
  8, 7, 6, 9, 7,
  8, 9, 9,
  9, 3, 9,
  88, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Airbus Defence and Space: highest score - massive programs IRIS2/Copernicus, defense, huge R&D
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
  'ps-ads02-sp02-4000-a002-000000000002',
  'c9a1e7b3-0002-4f2a-9c3d-5e8f1a2b3c02',
  9, 9, 9, 9,
  8, 9, 9, 9,
  8, 9, 9, 7,
  4, 9, 5, 3, 9,
  9, 8, 8, 9,
  9, 9, 6, 9, 8,
  9, 9, 8, 9,
  9, 8, 7, 9,
  5, 6, 9,
  8, 7, 6, 9, 8,
  9, 9, 9,
  9, 3, 9,
  90, 'hot',
  1776520000, 1776520000, 1776520000
);

-- Thales Alenia Space: very high - Lunar Gateway, IRIS2, Galileo 2nd gen, Sentinel
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
  'ps-tas03-sp03-4000-a003-000000000003',
  'c9a1e7b3-0003-4f2a-9c3d-5e8f1a2b3c03',
  9, 9, 8, 9,
  8, 9, 8, 8,
  8, 9, 9, 6,
  3, 9, 5, 3, 8,
  9, 7, 7, 8,
  9, 8, 6, 8, 7,
  9, 9, 7, 9,
  8, 8, 6, 9,
  4, 4, 9,
  8, 7, 5, 9, 6,
  8, 8, 9,
  9, 3, 9,
  86, 'hot',
  1776520000, 1776520000, 1776520000
);

-- CS Group: strong on space operations, defense, cybersecurity - mid-size consulting buyer
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
  'ps-csg04-sp04-4000-a004-000000000004',
  'c9a1e7b3-0004-4f2a-9c3d-5e8f1a2b3c04',
  9, 8, 6, 7,
  8, 9, 7, 7,
  7, 7, 6, 6,
  3, 7, 5, 4, 7,
  7, 6, 6, 8,
  9, 8, 5, 7, 6,
  5, 7, 6, 8,
  7, 5, 6, 8,
  5, 3, 8,
  6, 6, 7, 9, 5,
  7, 8, 8,
  8, 2, 8,
  78, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Telespazio France: satellite operations, ground segment, defense geo-intelligence
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
  'ps-tel05-sp05-4000-a005-000000000005',
  'c9a1e7b3-0005-4f2a-9c3d-5e8f1a2b3c05',
  9, 8, 6, 7,
  8, 8, 7, 7,
  6, 7, 6, 6,
  3, 7, 5, 3, 7,
  7, 5, 5, 7,
  8, 7, 5, 6, 6,
  5, 6, 7, 7,
  7, 5, 7, 7,
  4, 3, 7,
  7, 6, 5, 8, 6,
  7, 7, 7,
  7, 2, 7,
  74, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Hemeria: nanosatellites, defense constellation YODA, CNES programs, growing fast
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
  'ps-hem06-sp06-4000-a006-000000000006',
  'c9a1e7b3-0006-4f2a-9c3d-5e8f1a2b3c06',
  9, 8, 5, 7,
  8, 9, 6, 6,
  8, 8, 7, 5,
  7, 8, 4, 3, 6,
  7, 6, 6, 7,
  8, 7, 5, 7, 6,
  7, 8, 5, 8,
  6, 4, 5, 7,
  4, 3, 6,
  5, 5, 6, 8, 5,
  7, 8, 8,
  8, 2, 7,
  76, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Loft Orbital: Space-as-a-Service, recent funding, fast growth, defense contracts
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
  'ps-lft07-sp07-4000-a007-000000000007',
  'c9a1e7b3-0007-4f2a-9c3d-5e8f1a2b3c07',
  9, 7, 4, 7,
  8, 8, 5, 6,
  8, 8, 7, 5,
  9, 6, 4, 3, 5,
  8, 6, 6, 7,
  8, 9, 6, 7, 7,
  7, 8, 5, 7,
  7, 3, 8, 6,
  4, 3, 5,
  4, 4, 6, 7, 5,
  6, 6, 7,
  8, 2, 7,
  72, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Kineis: IoT constellation operational, strategic partnerships, CNES heritage
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
  'ps-kin08-sp08-4000-a008-000000000008',
  'c9a1e7b3-0008-4f2a-9c3d-5e8f1a2b3c08',
  9, 7, 4, 7,
  8, 8, 5, 6,
  7, 8, 7, 5,
  8, 8, 4, 3, 5,
  7, 5, 5, 6,
  8, 8, 5, 6, 6,
  6, 9, 5, 8,
  6, 3, 7, 8,
  4, 3, 5,
  4, 4, 5, 8, 8,
  7, 5, 6,
  7, 2, 7,
  75, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Unseenlabs: RF surveillance, defense clients, constellation growth, niche skills
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
  'ps-uns09-sp09-4000-a009-000000000009',
  'c9a1e7b3-0009-4f2a-9c3d-5e8f1a2b3c09',
  9, 7, 3, 7,
  7, 8, 5, 5,
  8, 8, 7, 5,
  8, 7, 4, 3, 5,
  7, 5, 5, 6,
  9, 8, 5, 6, 6,
  6, 7, 4, 7,
  5, 3, 6, 5,
  4, 3, 4,
  4, 4, 7, 8, 5,
  6, 8, 7,
  7, 2, 7,
  73, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Exotrail: electric propulsion, ESA programs, mission software, growing NewSpace
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
  'ps-exo10-sp10-4000-a010-000000000010',
  'c9a1e7b3-0010-4f2a-9c3d-5e8f1a2b3c10',
  9, 7, 3, 8,
  7, 8, 5, 5,
  7, 8, 6, 5,
  7, 7, 4, 3, 4,
  7, 5, 5, 6,
  9, 9, 5, 6, 6,
  6, 9, 4, 7,
  6, 3, 7, 6,
  4, 2, 4,
  4, 4, 5, 8, 5,
  6, 5, 7,
  7, 2, 7,
  70, 'warm',
  1776520000, 1776520000, 1776520000
);
