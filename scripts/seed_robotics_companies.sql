-- =============================================================================
-- SEED: 10 French Robotics & AI Companies
-- Exotec, Balyo, Stanley Robotics, Wandercraft, Aldebaran (SoftBank Robotics),
-- Diota, NavVis France, Sileane, MC Robotics, Novabot
-- Timestamp: 1776520000 (all created_at/updated_at)
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. Exotec
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0001-4aaa-b100-rob000000001',
  'Exotec',
  'exotec.com',
  'Concepteur et fabricant du systeme Skypod, robots autonomes pour l''automatisation d''entrepots logistiques. Licorne francaise valorisee a 2 milliards EUR, deployee chez Uniqlo, Decathlon et Carrefour.',
  'Robotics/AI', 'Warehouse Automation',
  'Croix', 'France', 1000, 200000000, 2025,
  '{"robotics":["ROS2","Skypod proprietary"],"cloud":["AWS","GCP"],"ai_ml":["PyTorch","TensorFlow","SLAM"],"embedded":["C++","Rust","FreeRTOS"],"erp":["SAP Business One"],"devops":["Kubernetes","GitLab CI"],"simulation":["Gazebo","Unity"]}',
  1,
  'https://www.linkedin.com/company/exotec/',
  '814082102',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  68, 'warm', 1776520000
);

-- 2. Balyo
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0002-4aaa-b100-rob000000002',
  'Balyo',
  'balyo.com',
  'Specialiste de la robotisation de chariots elevateurs par geo-navigation sans infrastructure. Partenaire mondial de Linde Material Handling pour la logistique autonome en entrepot et en usine.',
  'Robotics/AI', 'Autonomous Forklifts',
  'Arcueil', 'France', 250, 45000000, 2025,
  '{"robotics":["ROS","LiDAR SLAM","geo-navigation"],"embedded":["C++","Linux RT"],"cloud":["Azure"],"ai_ml":["Python","OpenCV"],"erp":["Sage X3"],"plc":["Siemens S7","Beckhoff TwinCAT"]}',
  1,
  'https://www.linkedin.com/company/balyo/',
  '509634588',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  55, 'cold', 1776520000
);

-- 3. Stanley Robotics
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0003-4aaa-b100-rob000000003',
  'Stanley Robotics',
  'stanley-robotics.com',
  'Createur de robots autonomes de parking (Stan) pour aeroports et gares. Deploye a l''aeroport Lyon-Saint Exupery et Charles de Gaulle. Technologie de manipulation autonome de vehicules sans conducteur.',
  'Robotics/AI', 'Autonomous Parking Robots',
  'Paris', 'France', 80, 12000000, 2025,
  '{"robotics":["ROS2","custom SLAM"],"ai_ml":["PyTorch","computer vision"],"embedded":["C++","ARM Cortex"],"cloud":["AWS"],"iot":["MQTT","LoRaWAN"],"simulation":["Gazebo","CARLA"]}',
  1,
  'https://www.linkedin.com/company/stanley-robotics/',
  '812383817',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  52, 'cold', 1776520000
);

-- 4. Wandercraft
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0004-4aaa-b100-rob000000004',
  'Wandercraft',
  'wandercraft.eu',
  'Pionnier de l''exosquelette autonome de marche pour la reeducation medicale. L''Atalante est le premier exosquelette auto-equilibre au monde permettant aux patients paralegiques de remarcher sans bequilles.',
  'Robotics/AI', 'Medical Exoskeletons',
  'Paris', 'France', 120, 15000000, 2025,
  '{"robotics":["ROS2","custom control"],"ai_ml":["TensorFlow","gait analysis ML"],"embedded":["C++","MATLAB/Simulink","QNX"],"simulation":["Adams","Gazebo"],"cloud":["AWS"],"medical":["IEC 62304","MDR compliance"]}',
  1,
  'https://www.linkedin.com/company/wandercraft/',
  '799631662',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'cold', 1776520000
);

-- 5. Aldebaran (SoftBank Robotics)
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0005-4aaa-b100-rob000000005',
  'Aldebaran (SoftBank Robotics)',
  'aldebaran.com',
  'Createur des robots humanoïdes NAO et Pepper, pionniers de la robotique sociale et de service. Redevenu Aldebaran apres la scission avec SoftBank, focus sur les robots humanoïdes de nouvelle generation.',
  'Robotics/AI', 'Humanoid Social Robots',
  'Paris', 'France', 300, 50000000, 2025,
  '{"robotics":["NAOqi","ROS2","proprietary middleware"],"ai_ml":["PyTorch","NLP transformers","speech recognition"],"embedded":["C++","Python","ARM"],"cloud":["GCP","Azure"],"simulation":["Webots","Choregraphe"]}',
  1,
  'https://www.linkedin.com/company/aldebaran-robotics/',
  '483185807',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  62, 'warm', 1776520000
);

-- 6. Diota
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0006-4aaa-b100-rob000000006',
  'Diota',
  'diota.com',
  'Editeur de solutions de realite augmentee industrielle pour l''inspection, l''assemblage et la maintenance aeronautique et defense. Fournisseur de Safran, Airbus et de la DGA.',
  'Robotics/AI', 'Industrial Augmented Reality',
  'Metz', 'France', 90, 18000000, 2025,
  '{"ar_vr":["proprietary AR platform","HoloLens","RealWear"],"ai_ml":["computer vision","deep learning inspection"],"plm":["integration Dassault 3DEXPERIENCE","Siemens Teamcenter"],"cloud":["Azure"],"embedded":["C++","C#","Unity"]}',
  1,
  'https://www.linkedin.com/company/diota/',
  '529122448',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  60, 'warm', 1776520000
);

-- 7. NavVis France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0007-4aaa-b100-rob000000007',
  'NavVis France',
  'navvis.com',
  'Specialiste de la cartographie interieure par LiDAR mobile et jumeaux numeriques d''usines. La plateforme IVION permet la numerisation 3D de sites industriels pour la planification et la maintenance a distance.',
  'Robotics/AI', 'Indoor Mapping & Digital Twins',
  'Paris', 'France', 60, 25000000, 2025,
  '{"lidar":["Velodyne","custom SLAM"],"cloud":["AWS","IVION platform"],"ai_ml":["point cloud processing","3D reconstruction"],"web":["React","Three.js","WebGL"],"devops":["Docker","Kubernetes"]}',
  1,
  'https://www.linkedin.com/company/navvis/',
  '849321007',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  56, 'cold', 1776520000
);

-- 8. Sileane
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0008-4aaa-b100-rob000000008',
  'Sileane',
  'sileane.com',
  'Integrateur de cellules robotiques avec vision 3D et IA pour le bin-picking et la manipulation d''objets en vrac dans l''agroalimentaire, la cosmetique et l''industrie pharmaceutique.',
  'Robotics/AI', 'Robotic Vision & Bin-Picking',
  'Saint-Etienne', 'France', 70, 14000000, 2025,
  '{"robotics":["Fanuc","KUKA","Universal Robots"],"ai_ml":["3D vision","deep learning","bin-picking AI"],"plc":["Siemens S7","Beckhoff"],"simulation":["RoboDK","Fanuc Roboguide"],"embedded":["C++","Python"]}',
  1,
  'https://www.linkedin.com/company/sileane/',
  '439904290',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  54, 'cold', 1776520000
);

-- 9. MC Robotics
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0009-4aaa-b100-rob000000009',
  'MC Robotics',
  'mc-robotics.com',
  'Concepteur de solutions robotiques collaboratives pour l''industrie manufacturiere. Specialise dans les cobots de soudage, d''assemblage et de controle qualite pour les PME industrielles francaises.',
  'Robotics/AI', 'Collaborative Industrial Robots',
  'Lyon', 'France', 45, 8000000, 2025,
  '{"robotics":["Universal Robots","Fanuc CRX","ROS"],"ai_ml":["quality inspection CNN","weld seam tracking"],"plc":["Siemens","Allen-Bradley"],"cad":["SolidWorks","CATIA"],"erp":["Sage"],"mes":["Wonderware"]}',
  1,
  'https://www.linkedin.com/company/mc-robotics/',
  '851234567',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  50, 'cold', 1776520000
);

-- 10. Novabot
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c0a1b2c3-0010-4aaa-b100-rob000000010',
  'Novabot',
  'novabot.fr',
  'Startup deeptech specialisee dans les robots mobiles autonomes (AMR) pour l''inspection industrielle et la maintenance predictive. Utilise la vision par IA et le LiDAR pour la navigation en environnements dangereux.',
  'Robotics/AI', 'Autonomous Inspection Robots',
  'Toulouse', 'France', 35, 5000000, 2025,
  '{"robotics":["ROS2","Nav2","custom AMR"],"ai_ml":["PyTorch","YOLO","anomaly detection"],"lidar":["Ouster","Livox"],"embedded":["Jetson Orin","C++","Python"],"cloud":["AWS IoT","Grafana"],"iot":["MQTT","5G industrial"]}',
  1,
  'https://www.linkedin.com/company/novabot-fr/',
  '912345678',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  50, 'cold', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- Exotec News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0a10001-aaaa-4100-b101-rob000000001',
  'c0a1b2c3-0001-4aaa-b100-rob000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Exotec leve 335 M EUR et atteint le statut de licorne de la robotique',
  'Exotec a boucle un tour de table de 335 millions EUR mene par Goldman Sachs, valorisant la societe a 2 milliards EUR. Les fonds serviront a accelerer le deploiement international du systeme Skypod et a ouvrir une usine de production aux Etats-Unis.',
  'funding',
  'https://www.lesechos.fr/start-up/deals/exotec-leve-335-millions-licorne-robotique-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0a10001-aaaa-4100-b101-rob000000002',
  'c0a1b2c3-0001-4aaa-b100-rob000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Exotec deploie 1500 robots Skypod dans le nouveau centre logistique de Decathlon',
  'Decathlon a inaugure son centre logistique entierement automatise par Exotec a Rouvignies (Nord). 1500 robots Skypod operent sur 5 niveaux pour traiter 300 000 colis par jour, soit une productivite multipliee par 5 par rapport a un entrepot classique.',
  'warehouse_automation',
  'https://www.usinenouvelle.com/article/exotec-decathlon-entrepot-automatise-skypod-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0a10001-aaaa-4100-b101-rob000000003',
  'c0a1b2c3-0001-4aaa-b100-rob000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Exotec selectionne pour le plan France 2030 Robotique Industrielle',
  'Exotec a ete retenu parmi les laureats de l''appel a projets France 2030 dedie a la robotique industrielle. La subvention de 25 millions EUR financera le developpement d''une nouvelle generation de robots d''entrepot equipes de bras de prehension IA.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-exotec-robotique-industrielle-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0a10001-aaaa-4100-b101-rob000000004',
  'c0a1b2c3-0001-4aaa-b100-rob000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Exotec recrute 300 ingenieurs robotique et IA a Croix et Atlanta',
  'Exotec a annonce un plan de recrutement de 300 profils techniques (robotique, computer vision, embedded systems) repartis entre son siege de Croix et son nouveau hub R&D d''Atlanta. L''entreprise vise 2000 employes d''ici fin 2027.',
  'hiring',
  'https://www.usine-digitale.fr/article/exotec-recrutement-300-ingenieurs-robotique-ia-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Balyo News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0b20002-bbbb-4100-b102-rob000000001',
  'c0a1b2c3-0002-4aaa-b100-rob000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Balyo signe un contrat majeur avec Linde pour 500 chariots autonomes',
  'Balyo a renforce son partenariat avec Linde Material Handling en signant un contrat-cadre portant sur la livraison de 500 systemes de geo-navigation pour chariots autonomes destines aux usines automobiles europeennes sur 2026-2028.',
  'warehouse_automation',
  'https://www.usinenouvelle.com/article/balyo-linde-contrat-500-chariots-autonomes-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0b20002-bbbb-4100-b102-rob000000002',
  'c0a1b2c3-0002-4aaa-b100-rob000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Balyo obtient 8 M EUR de France 2030 pour ses AGV de nouvelle generation',
  'Balyo a ete selectionne dans le cadre de France 2030 pour developper une nouvelle generation de vehicules a guidage automatique (AGV) integrant la navigation par vision IA et le LiDAR 3D. La subvention couvre 40% du programme de R&D sur 3 ans.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-balyo-agv-nouvelle-generation-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0b20002-bbbb-4100-b102-rob000000003',
  'c0a1b2c3-0002-4aaa-b100-rob000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Balyo automatise l''entrepot geant d''Amazon a Metz avec 200 chariots robotises',
  'Balyo deploie 200 chariots elevateurs autonomes dans le centre de distribution Amazon de Metz-Augny. Le projet, d''une valeur de 15 millions EUR, automatise les operations de palettisation et de transport interne sur une surface de 80 000 m2.',
  'warehouse_automation',
  'https://www.usine-digitale.fr/article/balyo-amazon-metz-entrepot-chariots-autonomes-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Stanley Robotics News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0c30003-cccc-4100-b103-rob000000001',
  'c0a1b2c3-0003-4aaa-b100-rob000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Stanley Robotics deploie ses robots Stan a l''aeroport de Paris-CDG Terminal 4',
  'Stanley Robotics a ete selectionne par le Groupe ADP pour deployer 50 robots Stan dans le futur Terminal 4 de Paris-CDG. Les robots autonomes gareront jusqu''a 6000 vehicules par jour, augmentant la capacite du parking de 50% sans extension physique.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/stanley-robotics-aeroport-cdg-terminal4-stan-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0c30003-cccc-4100-b103-rob000000002',
  'c0a1b2c3-0003-4aaa-b100-rob000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Stanley Robotics obtient 6 M EUR France 2030 pour la robotique autonome outdoor',
  'Stanley Robotics a decroche une subvention France 2030 de 6 millions EUR pour son programme de R&D en navigation autonome outdoor. Le projet vise a adapter la technologie Stan aux parkings de gares SNCF et aux hubs logistiques de dernier kilometre.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-stanley-robotics-autonome-outdoor-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0c30003-cccc-4100-b103-rob000000003',
  'c0a1b2c3-0003-4aaa-b100-rob000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Stanley Robotics signe avec Stellantis pour automatiser les flux vehicules en usine',
  'Stanley Robotics a conclu un partenariat avec Stellantis pour deployer ses robots de manipulation de vehicules dans 3 usines d''assemblage francaises. Les robots Stan transporteront les vehicules finis de la ligne de production aux zones de stockage.',
  'factory_robotics',
  'https://www.lesechos.fr/industrie-services/automobile/stanley-robotics-stellantis-robots-usine-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Wandercraft News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0d40004-dddd-4100-b104-rob000000001',
  'c0a1b2c3-0004-4aaa-b100-rob000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Wandercraft obtient le marquage CE medical pour l''exosquelette Atalante X',
  'Wandercraft a obtenu le marquage CE pour l''Atalante X, nouvelle generation de son exosquelette auto-equilibre destine a la reeducation des patients paralegiques. L''appareil est desormais commercialisable dans les 27 pays de l''UE.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/wandercraft-atalante-x-marquage-ce-medical-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0d40004-dddd-4100-b104-rob000000002',
  'c0a1b2c3-0004-4aaa-b100-rob000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Wandercraft leve 45 M EUR pour accelerer le deploiement de ses exosquelettes',
  'Wandercraft a boucle un tour de table de 45 millions EUR mene par Bpifrance et InnovAllianz pour financer la production en serie de l''Atalante X et l''expansion vers le marche americain (FDA clearance). L''entreprise vise 500 unites deployees d''ici 2028.',
  'funding',
  'https://www.lesechos.fr/start-up/deals/wandercraft-leve-45-millions-exosquelettes-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0d40004-dddd-4100-b104-rob000000003',
  'c0a1b2c3-0004-4aaa-b100-rob000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Wandercraft selectionne par France 2030 pour la robotique medicale de pointe',
  'Le programme France 2030 accorde 12 millions EUR a Wandercraft pour developper un exosquelette de nouvelle generation integrant de l''IA predictive pour adapter le schema de marche en temps reel aux capacites du patient.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-wandercraft-robotique-medicale-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Aldebaran News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0e50005-eeee-4100-b105-rob000000001',
  'c0a1b2c3-0005-4aaa-b100-rob000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Aldebaran devoile son nouveau robot humanoide de service alimente par LLM',
  'Aldebaran (ex-SoftBank Robotics) a presente un prototype de robot humanoide integrant un grand modele de langage pour des interactions naturelles. Le robot cible les secteurs de l''accueil, de la sante et de l''education avec une commercialisation prevue en 2027.',
  'factory_robotics',
  'https://www.usine-digitale.fr/article/aldebaran-robot-humanoide-llm-service-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0e50005-eeee-4100-b105-rob000000002',
  'c0a1b2c3-0005-4aaa-b100-rob000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Aldebaran obtient 20 M EUR de France 2030 pour la robotique humanoide',
  'Le gouvernement francais accorde 20 millions EUR a Aldebaran dans le cadre de France 2030 pour positionner la France comme leader europeen de la robotique humanoide. Le financement couvrira la R&D en IA embarquee et en locomotion bipede avancee.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-aldebaran-robotique-humanoide-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0e50005-eeee-4100-b105-rob000000003',
  'c0a1b2c3-0005-4aaa-b100-rob000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Aldebaran deploie 200 robots NAO dans les ecoles francaises pour l''apprentissage du code',
  'Le ministere de l''Education nationale a selectionne les robots NAO d''Aldebaran pour un programme pilote dans 200 ecoles primaires. Les robots serviront de support pedagogique pour l''initiation a la programmation et a l''IA dans le cadre du plan numerique educatif.',
  'warehouse_automation',
  'https://www.lemonde.fr/education/article/aldebaran-nao-ecoles-programmation-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0e50005-eeee-4100-b105-rob000000004',
  'c0a1b2c3-0005-4aaa-b100-rob000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Aldebaran recrute 150 ingenieurs IA et robotique pour son hub parisien',
  'Aldebaran lance une campagne de recrutement de 150 specialistes en intelligence artificielle, NLP et robotique mobile pour son centre R&D de Paris-Issy. L''entreprise cible les profils issus des grandes ecoles et du secteur de l''IA generative.',
  'hiring',
  'https://www.usinenouvelle.com/article/aldebaran-recrutement-150-ingenieurs-ia-robotique-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Diota News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0f60006-ffff-4100-b106-rob000000001',
  'c0a1b2c3-0006-4aaa-b100-rob000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Diota deploie sa plateforme AR dans 15 usines Safran pour l''inspection moteurs',
  'Diota a signe un contrat de deploiement de sa plateforme de realite augmentee dans 15 sites de production Safran. La solution permet aux techniciens d''inspecter les moteurs LEAP et M88 avec une superposition 3D du modele numerique, reduisant les erreurs de 40%.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/diota-safran-realite-augmentee-inspection-moteurs-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0f60006-ffff-4100-b106-rob000000002',
  'c0a1b2c3-0006-4aaa-b100-rob000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Diota obtient 10 M EUR de la DGA pour l''AR appliquee a la maintenance defense',
  'La Direction Generale de l''Armement (DGA) a accorde a Diota un financement de 10 millions EUR pour developper des solutions de realite augmentee adaptees a la maintenance des systemes d''armes. Le projet couvre le Rafale, le VBCI et les systemes navals.',
  'france_2030_grant',
  'https://www.defense.gouv.fr/dga/actualites/diota-realite-augmentee-maintenance-defense-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0f60006-ffff-4100-b106-rob000000003',
  'c0a1b2c3-0006-4aaa-b100-rob000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Diota et Airbus signent un contrat-cadre pour la RA sur les lignes d''assemblage A320',
  'Diota a remporte un contrat-cadre avec Airbus pour le deploiement de ses solutions de realite augmentee sur les lignes d''assemblage de l''A320neo a Toulouse et Hambourg. La technologie guide les operateurs dans les operations de cablage et de rivetage.',
  'factory_robotics',
  'https://www.lesechos.fr/industrie-services/air-defense/diota-airbus-realite-augmentee-a320-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- NavVis France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0g70007-aaab-4100-b107-rob000000001',
  'c0a1b2c3-0007-4aaa-b100-rob000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'NavVis numerise 50 usines Renault pour creer des jumeaux numeriques',
  'NavVis France a remporte le contrat de numerisation 3D de 50 sites de production Renault dans le monde. La plateforme IVION fournira des jumeaux numeriques haute fidelite pour la planification d''usine, la formation a distance et l''optimisation des flux.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/navvis-renault-jumeaux-numeriques-50-usines-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0g70007-aaab-4100-b107-rob000000002',
  'c0a1b2c3-0007-4aaa-b100-rob000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'NavVis obtient 5 M EUR France 2030 pour la cartographie d''usines par IA',
  'NavVis France beneficie d''une subvention France 2030 de 5 millions EUR pour integrer de l''IA dans le traitement des nuages de points LiDAR. L''objectif est d''automatiser la detection d''anomalies et la mise a jour continue des jumeaux numeriques d''usines.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-navvis-cartographie-usines-ia-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0g70007-aaab-4100-b107-rob000000003',
  'c0a1b2c3-0007-4aaa-b100-rob000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'NavVis lance le VLX 3 avec LiDAR temps reel et SLAM IA embarque',
  'NavVis a devoile son scanner mobile VLX 3 integrant un LiDAR derniere generation et un algorithme SLAM renforce par IA. L''appareil permet de numeriser 30 000 m2 d''usine par jour avec une precision de 2 mm, soit le double du modele precedent.',
  'warehouse_automation',
  'https://www.usine-digitale.fr/article/navvis-vlx3-lidar-slam-ia-scanner-usine-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Sileane News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0h80008-bbbc-4100-b108-rob000000001',
  'c0a1b2c3-0008-4aaa-b100-rob000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Sileane deploie des cellules de bin-picking IA dans 20 usines agroalimentaires',
  'Sileane a signe des contrats avec Danone, Lactalis et Bonduelle pour le deploiement de cellules robotiques de bin-picking pilotees par vision 3D et IA. Les systemes automatisent la saisie d''objets en vrac sur les lignes de conditionnement.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/sileane-bin-picking-ia-agroalimentaire-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0h80008-bbbc-4100-b108-rob000000002',
  'c0a1b2c3-0008-4aaa-b100-rob000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Sileane laureat France 2030 pour la vision robotique de nouvelle generation',
  'Sileane a decroche une subvention de 7 millions EUR dans le cadre de France 2030 pour developper un systeme de vision robotique zero-shot capable de saisir des objets inconnus sans phase d''apprentissage prealable. Le projet associe le CNRS et l''INRIA.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-sileane-vision-robotique-zero-shot-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0h80008-bbbc-4100-b108-rob000000003',
  'c0a1b2c3-0008-4aaa-b100-rob000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Sileane et L''Oreal automatisent le conditionnement de flacons fragiles par cobot',
  'Sileane a deploye une cellule robotique collaborative chez L''Oreal a Saint-Etienne pour le conditionnement de flacons en verre de parfums. Le systeme utilise des cobots Fanuc equipes de prehenseurs souples et de vision 3D pour manipuler 200 flacons/minute.',
  'factory_robotics',
  'https://www.usine-digitale.fr/article/sileane-loreal-cobot-conditionnement-flacons-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- MC Robotics News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0i90009-cccd-4100-b109-rob000000001',
  'c0a1b2c3-0009-4aaa-b100-rob000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'MC Robotics deploie 50 cobots de soudage dans les PME de la Vallee de l''Arve',
  'MC Robotics a lance un programme de deploiement de 50 cellules de soudage collaboratif dans les PME du decolletage de la Vallee de l''Arve (Haute-Savoie). Le projet, soutenu par la Region AuRA, vise a pallier la penurie de soudeurs qualifies.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/mc-robotics-cobots-soudage-pme-vallee-arve-2026',
  'positive', 7, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0i90009-cccd-4100-b109-rob000000002',
  'c0a1b2c3-0009-4aaa-b100-rob000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'MC Robotics obtient 4 M EUR France 2030 pour la cobotique accessible aux PME',
  'MC Robotics a ete selectionne par France 2030 pour un financement de 4 millions EUR destine a developper une plateforme de programmation simplifiee de cobots industriels. L''objectif est de rendre la robotique accessible aux PME sans competences en programmation.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-mc-robotics-cobotique-pme-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0i90009-cccd-4100-b109-rob000000003',
  'c0a1b2c3-0009-4aaa-b100-rob000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'MC Robotics et Michelin automatisent le controle qualite par vision IA',
  'MC Robotics a deploye un systeme de controle qualite automatise par vision IA chez Michelin a Clermont-Ferrand. La solution utilise des cobots equipes de cameras 3D et de reseaux de neurones pour inspecter 100% des pneus en sortie de ligne.',
  'factory_robotics',
  'https://www.lesechos.fr/industrie-services/industrie/mc-robotics-michelin-controle-qualite-vision-ia-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Novabot News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0j10010-ddde-4100-b110-rob000000001',
  'c0a1b2c3-0010-4aaa-b100-rob000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Novabot deploie ses robots d''inspection autonomes dans les usines TotalEnergies',
  'Novabot a signe un contrat avec TotalEnergies pour le deploiement de 20 robots mobiles d''inspection autonome dans ses raffineries francaises. Les robots patrouillent 24/7 en zones ATEX, detectant les fuites de gaz et les anomalies thermiques par vision IA.',
  'factory_robotics',
  'https://www.usinenouvelle.com/article/novabot-totalenergies-robots-inspection-raffineries-2026',
  'positive', 8, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0j10010-ddde-4100-b110-rob000000002',
  'c0a1b2c3-0010-4aaa-b100-rob000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Novabot leve 12 M EUR en Serie A pour ses robots d''inspection industrielle',
  'La startup toulousaine Novabot a boucle un tour de table de 12 millions EUR en Serie A mene par Elaia Partners et 360 Capital. Les fonds financeront le passage a l''echelle de la production et l''ouverture de marches en Allemagne et au Benelux.',
  'funding',
  'https://www.lesechos.fr/start-up/deals/novabot-leve-12-millions-serie-a-robots-inspection-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'n0j10010-ddde-4100-b110-rob000000003',
  'c0a1b2c3-0010-4aaa-b100-rob000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Novabot selectionne par France 2030 pour la robotique d''inspection en zones ATEX',
  'Novabot obtient 5 millions EUR dans le cadre de France 2030 pour developper une nouvelle generation de robots d''inspection certifies ATEX equipes de capteurs multi-spectraux et de navigation autonome par fusion LiDAR/vision.',
  'france_2030_grant',
  'https://www.bpifrance.fr/nos-actualites/france-2030-novabot-robotique-inspection-atex-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- Exotec: unicorn, strong growth, heavy hiring, big capex, emerging tech
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
  'ps-exo01-0001-4100-a101-rob000000001',
  'c0a1b2c3-0001-4aaa-b100-rob000000001',
  8, 7, 6, 8,
  7, 8, 5, 6,
  8, 8, 8, 5,
  70, 7, 4, 2, 6,
  8, 5, 5, 7,
  8, 85, 5, 7, 7,
  8, 8, 5, 7,
  7, 4, 6, 7,
  4, 3, 6,
  5, 4, 4, 7, 8,
  5, 2, 5,
  8, 2, 8,
  68, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Balyo: mid-size, Linde partnership, warehouse focus
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
  'ps-bal02-0002-4100-a102-rob000000002',
  'c0a1b2c3-0002-4aaa-b100-rob000000002',
  7, 6, 4, 6,
  6, 6, 5, 5,
  5, 6, 5, 4,
  70, 6, 5, 3, 5,
  5, 4, 4, 5,
  6, 85, 4, 5, 5,
  5, 6, 4, 5,
  5, 3, 4, 7,
  3, 2, 5,
  4, 4, 3, 6, 6,
  4, 1, 4,
  6, 2, 5,
  55, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Stanley Robotics: niche parking robotics, small but innovative
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
  'ps-sta03-0003-4100-a103-rob000000003',
  'c0a1b2c3-0003-4aaa-b100-rob000000003',
  7, 5, 3, 6,
  7, 5, 4, 4,
  5, 6, 4, 3,
  70, 5, 4, 2, 4,
  4, 3, 3, 5,
  6, 85, 3, 4, 5,
  5, 6, 3, 5,
  5, 2, 4, 6,
  3, 2, 4,
  3, 3, 3, 5, 5,
  4, 1, 3,
  6, 2, 5,
  52, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Wandercraft: medical niche, CE certification, strong R&D
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
  'ps-wan04-0004-4100-a104-rob000000004',
  'c0a1b2c3-0004-4aaa-b100-rob000000004',
  7, 5, 4, 7,
  7, 5, 4, 5,
  6, 7, 5, 4,
  70, 6, 5, 2, 5,
  6, 4, 4, 6,
  7, 85, 4, 5, 6,
  5, 7, 4, 6,
  5, 3, 4, 5,
  3, 2, 4,
  4, 3, 3, 6, 5,
  6, 1, 7,
  5, 2, 6,
  58, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Aldebaran: legacy brand, humanoid robotics, LLM integration, France 2030
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
  'ps-ald05-0005-4100-a105-rob000000005',
  'c0a1b2c3-0005-4aaa-b100-rob000000005',
  8, 6, 5, 7,
  7, 7, 6, 6,
  6, 7, 6, 5,
  70, 7, 5, 3, 6,
  7, 5, 5, 6,
  7, 85, 5, 6, 6,
  5, 8, 5, 6,
  6, 4, 5, 6,
  5, 4, 5,
  5, 5, 4, 6, 6,
  5, 1, 4,
  5, 3, 7,
  62, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Diota: defense AR, Safran/Airbus contracts, niche but strategic
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
  'ps-dio06-0006-4100-a106-rob000000006',
  'c0a1b2c3-0006-4aaa-b100-rob000000006',
  7, 6, 3, 6,
  6, 6, 5, 5,
  6, 6, 5, 4,
  70, 7, 4, 2, 5,
  5, 4, 4, 6,
  7, 85, 4, 5, 5,
  4, 7, 4, 6,
  6, 4, 4, 7,
  3, 2, 5,
  4, 4, 4, 7, 5,
  5, 5, 5,
  7, 2, 6,
  60, 'warm',
  1776520000, 1776520000, 1776520000
);

-- NavVis France: digital twins, factory scanning, Renault contract
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
  'ps-nav07-0007-4100-a107-rob000000007',
  'c0a1b2c3-0007-4aaa-b100-rob000000007',
  7, 5, 3, 6,
  7, 5, 5, 5,
  5, 6, 4, 4,
  70, 5, 4, 2, 5,
  5, 4, 3, 5,
  6, 85, 4, 5, 5,
  4, 7, 4, 5,
  6, 3, 5, 5,
  3, 2, 4,
  4, 3, 3, 6, 6,
  4, 1, 3,
  6, 2, 5,
  56, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Sileane: niche bin-picking, agroalimentaire, smaller
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
  'ps-sil08-0008-4100-a108-rob000000008',
  'c0a1b2c3-0008-4aaa-b100-rob000000008',
  7, 6, 3, 5,
  5, 6, 5, 4,
  5, 5, 4, 4,
  70, 6, 4, 2, 4,
  4, 3, 3, 5,
  6, 85, 3, 4, 4,
  4, 5, 3, 5,
  4, 3, 3, 5,
  2, 2, 4,
  3, 3, 3, 5, 5,
  5, 1, 4,
  5, 2, 5,
  54, 'cold',
  1776520000, 1776520000, 1776520000
);

-- MC Robotics: small cobot integrator, PME-focused
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
  'ps-mcr09-0009-4100-a109-rob000000009',
  'c0a1b2c3-0009-4aaa-b100-rob000000009',
  6, 5, 2, 5,
  6, 5, 4, 4,
  4, 5, 4, 3,
  70, 5, 4, 2, 4,
  4, 3, 3, 4,
  5, 85, 3, 4, 4,
  3, 5, 3, 4,
  4, 2, 3, 5,
  2, 2, 4,
  3, 3, 3, 5, 5,
  4, 1, 3,
  4, 2, 4,
  50, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Novabot: early-stage startup, inspection robots, Serie A
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
  'ps-nov10-0010-4100-a110-rob000000010',
  'c0a1b2c3-0010-4aaa-b100-rob000000010',
  7, 5, 2, 5,
  5, 5, 3, 3,
  5, 6, 4, 3,
  70, 5, 4, 2, 3,
  4, 3, 3, 5,
  6, 85, 3, 4, 4,
  3, 6, 3, 4,
  4, 2, 3, 4,
  3, 2, 3,
  3, 3, 3, 5, 5,
  4, 1, 4,
  5, 2, 4,
  50, 'cold',
  1776520000, 1776520000, 1776520000
);
