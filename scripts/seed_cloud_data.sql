-- =============================================================================
-- SEED: 10 French Cloud & Data Companies
-- OVHcloud, Scaleway, 3DS Outscale, Orange Business Services, Atos OneCloud,
-- Clever Cloud, Platform.sh, Talend France, Databricks France, Snowflake France
-- Timestamp: 1776520000 (all created_at/updated_at)
-- Source: 00238d74-63da-4b37-88cb-ff4357db7e13
-- =============================================================================

-- ===================== 1. COMPANIES =====================

-- 1. OVHcloud
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0001-aa01-4b00-8c01-000000000001',
  'OVHcloud',
  'ovhcloud.com',
  'Premier fournisseur europeen de cloud computing, operant 43 data centers dans le monde. Certifie SecNumCloud par l''ANSSI, OVHcloud propose IaaS, PaaS, stockage, bare metal et Hosted Private Cloud. Acteur cle de la souverainete numerique europeenne.',
  'Cloud/Data', 'Cloud Infrastructure & IaaS',
  'Roubaix', 'France', 3200, 870000000, 2024,
  '{"cloud":["OpenStack","VMware","Kubernetes"],"network":["VRACK","Anti-DDoS"],"storage":["Ceph","S3-compatible","NAS HA"],"compute":["Bare Metal","GPU NVIDIA H100","FPGA"],"security":["SecNumCloud","ISO 27001","HDS"],"data":["Managed Databases","Logs Data Platform"],"devops":["Terraform Provider","Ansible","API REST"]}',
  0,
  'https://www.linkedin.com/company/ovhcloud/',
  '424761419',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  62, 'warm', 1776520000
);

-- 2. Scaleway
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0002-bb02-4b00-8c02-000000000002',
  'Scaleway',
  'scaleway.com',
  'Filiale cloud du groupe Iliad (Free), Scaleway opere des data centers a Paris, Amsterdam et Varsovie. Offre cloud public europeen avec compute, Kubernetes managé, bases de donnees, stockage objet et inference IA. Positionne sur le cloud souverain et l''IA generative.',
  'Cloud/Data', 'Cloud Infrastructure & PaaS',
  'Paris', 'France', 600, 200000000, 2024,
  '{"cloud":["Kubernetes Kapsule","Serverless Functions","Elastic Metal"],"ai":["GPU H100 Clusters","Managed Inference","LLM Hosting"],"storage":["Object Storage S3","Block Storage"],"network":["VPC","Load Balancer","DNS"],"data":["Managed PostgreSQL","Redis","Cockpit Observability"],"security":["SecNumCloud en cours","ISO 27001"],"devops":["Terraform","CLI","API REST"]}',
  0,
  'https://www.linkedin.com/company/scaleway/',
  '433115904',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  58, 'warm', 1776520000
);

-- 3. 3DS Outscale
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0003-cc03-4b00-8c03-000000000003',
  '3DS Outscale',
  'outscale.com',
  'Filiale cloud de Dassault Systemes, premier cloud IaaS qualifie SecNumCloud en France. Opere des data centers souverains en France, fournit des services cloud de confiance pour les OIV, la defense et les administrations publiques.',
  'Cloud/Data', 'Sovereign Cloud & IaaS',
  'Saint-Cloud', 'France', 250, 80000000, 2024,
  '{"cloud":["TINA OS","IaaS SecNumCloud","Flexible Compute Unit"],"security":["SecNumCloud qualifie","ISO 27001","HDS","qualification OTAN"],"compute":["GPU Computing","HPC"],"storage":["Block Storage","Object Storage S3"],"network":["VPC","Net Access","DirectLink"],"devops":["Terraform Provider","osc-cli","Cockpit API"]}',
  0,
  'https://www.linkedin.com/company/outscale/',
  '789019534',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  55, 'warm', 1776520000
);

-- 4. Orange Business Services
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0004-dd04-4b00-8c04-000000000004',
  'Orange Business Services',
  'orange-business.com',
  'Division B2B d''Orange, fournisseur de services cloud, cybersecurite, connectivite et transformation digitale pour les entreprises. Opere le cloud souverain Orange avec qualification SecNumCloud. Plus de 3000 multinationales clientes dans 220 pays.',
  'Cloud/Data', 'Cloud Services & Digital Transformation',
  'Paris', 'France', 28000, 7800000000, 2024,
  '{"cloud":["Flexible Engine","OpenStack","VMware Cloud","AWS Partner","Azure Partner"],"cybersecurity":["Orange Cyberdefense","SOC 24/7","Managed Detection"],"network":["SD-WAN","SASE","5G Private","MPLS"],"data":["Data Analytics","IoT Platform","Flux Vision"],"devops":["Kubernetes","Terraform","CI/CD managed"],"ai":["AI as a Service","Chatbot Platform"]}',
  1,
  'https://www.linkedin.com/company/orange-business/',
  '380129866',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  60, 'warm', 1776520000
);

-- 5. Atos OneCloud
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0005-ee05-4b00-8c05-000000000005',
  'Atos OneCloud',
  'atos.net/onecloud',
  'Division cloud d''Atos, offrant migration cloud, hybrid cloud, edge computing et cloud souverain. Partenaire strategique de Google Cloud, AWS et VMware. Integre dans Eviden apres la restructuration d''Atos. Supercalculateurs BullSequana.',
  'Cloud/Data', 'Cloud Migration & Managed Services',
  'Bezons', 'France', 12000, 3200000000, 2024,
  '{"cloud":["Google Cloud Partner","AWS Partner","VMware Cloud","OpenShift"],"hpc":["BullSequana XH3000","EuroHPC"],"security":["Evidian IAM","Atos Trustway HSM","SecNumCloud"],"data":["SAP S/4HANA Cloud","Snowflake","Databricks"],"edge":["Atos Edge Computer Vision","AI at Edge"],"devops":["Kubernetes","Terraform","Ansible","GitLab CI"]}',
  1,
  'https://www.linkedin.com/company/atos/',
  '323623603',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  48, 'cold', 1776520000
);

-- 6. Clever Cloud
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0006-ff06-4b00-8c06-000000000006',
  'Clever Cloud',
  'clever-cloud.com',
  'PaaS francais automatisant le deploiement d''applications. Hebergement souverain sur infrastructure propre en France. Supporte Java, Node.js, PHP, Python, Ruby, Go, Rust, Docker. Positionne sur le cloud de confiance europeen et la simplicite DevOps.',
  'Cloud/Data', 'PaaS & Application Hosting',
  'Nantes', 'France', 80, 15000000, 2024,
  '{"platform":["PaaS Auto-scaling","Docker","Add-ons Marketplace"],"languages":["Java","Node.js","PHP","Python","Ruby","Go","Rust","Scala"],"data":["PostgreSQL Managed","MySQL","MongoDB","Redis","Elasticsearch"],"storage":["Cellar S3","FS Buckets"],"network":["Dedicated IP","Custom Domains","Let''s Encrypt"],"devops":["Git Push Deploy","CLI","API REST","GitHub Actions Integration"]}',
  0,
  'https://www.linkedin.com/company/clever-cloud/',
  '524172699',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  50, 'cold', 1776520000
);

-- 7. Platform.sh
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0007-a707-4b00-8c07-000000000007',
  'Platform.sh',
  'platform.sh',
  'PaaS francais pour le deploiement continu d''applications web. Cree a Paris, opere en Europe et en Amerique du Nord. Supporte Symfony, Laravel, Django, Node.js, Go. A fusionne avec Upsun pour offrir une plateforme cloud unifiee orientee developpeurs.',
  'Cloud/Data', 'PaaS & Developer Platform',
  'Paris', 'France', 300, 50000000, 2024,
  '{"platform":["PaaS Multi-cloud","Upsun","Git-driven Infrastructure"],"languages":["PHP/Symfony","Python/Django","Node.js","Go","Java","Ruby"],"data":["MariaDB","PostgreSQL","MongoDB","Redis","Elasticsearch","InfluxDB"],"features":["Preview Environments","Auto-scaling","Blackfire Profiler"],"security":["SOC 2 Type II","GDPR","Data Residency EU"],"devops":["Git Push Deploy","CLI","GitHub/GitLab Integration","Terraform"]}',
  0,
  'https://www.linkedin.com/company/platformsh/',
  '800058023',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  52, 'cold', 1776520000
);

-- 8. Talend France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0008-b808-4b00-8c08-000000000008',
  'Talend France',
  'talend.com',
  'Editeur francais de logiciels d''integration de donnees, qualite des donnees et gouvernance. Fonde a Suresnes, rachete par Qlik en 2023. Talend Data Fabric est la plateforme de reference pour l''integration ETL/ELT et le data management en entreprise.',
  'Cloud/Data', 'Data Integration & Governance',
  'Suresnes', 'France', 450, 320000000, 2024,
  '{"platform":["Talend Data Fabric","Talend Cloud","Stitch Data Loader"],"integration":["ETL/ELT","API Services","Real-time Streaming"],"data_quality":["Data Stewardship","Data Catalog","Trust Score"],"cloud":["AWS","Azure","GCP","Snowflake Connector","Databricks Connector"],"languages":["Java","Apache Spark","Apache Beam"],"governance":["GDPR Compliance","Data Lineage","Metadata Management"]}',
  1,
  'https://www.linkedin.com/company/talend/',
  '484175977',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  56, 'warm', 1776520000
);

-- 9. Databricks France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0009-c909-4b00-8c09-000000000009',
  'Databricks France',
  'databricks.com/fr',
  'Bureau francais de Databricks, leader mondial du lakehouse et de la data intelligence. Plateforme unifiee pour data engineering, data science, machine learning et IA generative. Forte croissance en France aupres des grands comptes CAC 40.',
  'Cloud/Data', 'Data Lakehouse & AI Platform',
  'Paris', 'France', 200, 180000000, 2024,
  '{"platform":["Databricks Lakehouse","Unity Catalog","Delta Lake","MLflow"],"ai":["Mosaic AI","Model Serving","Feature Store","RAG"],"compute":["Apache Spark","Photon Engine","Serverless Compute"],"cloud":["AWS","Azure","GCP"],"languages":["Python","SQL","Scala","R"],"governance":["Unity Catalog","Data Lineage","GDPR Tools"]}',
  1,
  'https://www.linkedin.com/company/databricks/',
  '852741963',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  65, 'warm', 1776520000
);

-- 10. Snowflake France
INSERT INTO companies (
  id, name, domain, description, sector, subsector,
  location_city, location_country, employee_count, revenue_eur, revenue_year,
  tech_stack, uses_consulting_services, linkedin_url, siren, logo_url,
  status, enrichment_status, last_enriched_at, created_at, updated_at,
  prospect_score, prospect_band, scored_at
) VALUES (
  'c10d0010-da10-4b00-8c10-000000000010',
  'Snowflake France',
  'snowflake.com/fr',
  'Bureau francais de Snowflake, plateforme de data cloud leader pour l''entreposage de donnees, le partage de donnees et les applications data. Forte adoption par les entreprises francaises pour le data warehouse cloud et la collaboration inter-entreprises via le Snowflake Marketplace.',
  'Cloud/Data', 'Data Cloud & Warehousing',
  'Paris', 'France', 150, 150000000, 2024,
  '{"platform":["Snowflake Data Cloud","Snowpark","Streamlit","Cortex AI"],"features":["Data Sharing","Marketplace","Dynamic Tables","Snowpipe Streaming"],"security":["Tri-Secret Secure","Network Policies","GDPR","Data Clean Rooms"],"cloud":["AWS","Azure","GCP"],"languages":["SQL","Python","Java","Scala"],"ecosystem":["dbt","Fivetran","Matillion","Talend Connector"]}',
  1,
  'https://www.linkedin.com/company/snowflake-computing/',
  '891234567',
  NULL,
  'active', 'enriched', 1776520000, 1776520000, 1776520000,
  63, 'warm', 1776520000
);


-- ===================== 2. NEWS =====================
-- source_id = '00238d74-63da-4b37-88cb-ff4357db7e13' for all

-- ---- OVHcloud News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0001-aaaa-4000-b001-ovh000000001',
  'c10d0001-aa01-4b00-8c01-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'OVHcloud obtient le renouvellement de sa qualification SecNumCloud 3.2',
  'OVHcloud a obtenu le renouvellement de la qualification SecNumCloud version 3.2 delivree par l''ANSSI pour ses offres Hosted Private Cloud. Cette qualification renforce sa position de leader du cloud souverain europeen face aux hyperscalers americains.',
  'sovereign_cloud',
  'https://www.usine-digitale.fr/article/ovhcloud-secnumcloud-3-2-renouvellement-2026',
  'positive', 9, 1776000000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0001-aaaa-4000-b001-ovh000000002',
  'c10d0001-aa01-4b00-8c01-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'OVHcloud inaugure son nouveau data center a Strasbourg avec refroidissement liquide',
  'OVHcloud a inaugure son data center SBG6 a Strasbourg, equipe de la technologie de refroidissement par immersion dielectrique. D''une capacite de 20 MW, il vise les charges IA et HPC tout en reduisant la consommation energetique de 30%.',
  'data_center_expansion',
  'https://www.lesechos.fr/tech-medias/ovhcloud-datacenter-strasbourg-sbg6-refroidissement-liquide-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0001-aaaa-4000-b001-ovh000000003',
  'c10d0001-aa01-4b00-8c01-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'OVHcloud lance AI Endpoints pour democratiser l''acces aux LLM en Europe',
  'OVHcloud a lance son offre AI Endpoints permettant aux entreprises europeennes d''acceder a des modeles d''IA generative (Mistral, Llama, Falcon) heberges sur infrastructure souveraine. Le service inclut l''inference GPU et le fine-tuning managed.',
  'sovereign_cloud',
  'https://www.ovhcloud.com/fr/press/ai-endpoints-llm-souverain-2026',
  'positive', 8, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0001-aaaa-4000-b001-ovh000000004',
  'c10d0001-aa01-4b00-8c01-000000000001',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'OVHcloud recrute 500 ingenieurs pour son expansion data center en Europe',
  'Face a la demande croissante en cloud souverain et en infrastructure IA, OVHcloud a annonce le recrutement de 500 ingenieurs specialises en infrastructure, reseau et refroidissement pour ses nouveaux data centers en France, Allemagne et Pologne.',
  'hiring',
  'https://www.usinenouvelle.com/article/ovhcloud-recrutement-500-ingenieurs-datacenter-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Scaleway News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0002-bbbb-4000-b002-scw000000001',
  'c10d0002-bb02-4b00-8c02-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Scaleway deploie le plus grand cluster GPU H100 d''Europe pour l''IA generative',
  'Scaleway a mis en service un cluster de 1536 GPU NVIDIA H100 dans son data center de Paris-Vitry, le plus grand en Europe dedie a l''entrainement de modeles IA. Le cluster est deja utilise par Mistral AI et plusieurs laboratoires de recherche francais.',
  'data_center_expansion',
  'https://www.usine-digitale.fr/article/scaleway-cluster-gpu-h100-europe-ia-generative-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0002-bbbb-4000-b002-scw000000002',
  'c10d0002-bb02-4b00-8c02-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Scaleway vise la certification SecNumCloud pour son offre cloud public',
  'Scaleway a annonce avoir engage la procedure de qualification SecNumCloud aupres de l''ANSSI pour l''ensemble de son offre cloud public. La certification est attendue pour fin 2026, permettant de servir les OIV et les administrations publiques.',
  'sovereign_cloud',
  'https://www.lesechos.fr/tech-medias/scaleway-secnumcloud-certification-cloud-public-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0002-bbbb-4000-b002-scw000000003',
  'c10d0002-bb02-4b00-8c02-000000000002',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Scaleway ouvre un nouveau data center a Amsterdam pour renforcer sa presence europeenne',
  'Scaleway a inaugure son troisieme data center a Amsterdam (AMS2) d''une capacite de 10 MW, oriente vers le calcul IA et le stockage objet. L''investissement de 120 millions EUR s''inscrit dans la strategie d''expansion europeenne du groupe Iliad.',
  'data_center_expansion',
  'https://www.scaleway.com/fr/press/amsterdam-datacenter-ams2-ouverture-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- 3DS Outscale News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0003-cccc-4000-b003-out000000001',
  'c10d0003-cc03-4b00-8c03-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  '3DS Outscale retenu pour le cloud de confiance du ministere des Armees',
  '3DS Outscale a ete selectionne comme fournisseur de cloud de confiance pour le ministere des Armees francais dans le cadre du programme SCAF (Systeme de Combat Aerien Futur). Le contrat couvre l''hebergement de donnees classifiees et les simulations numeriques.',
  'sovereign_cloud',
  'https://www.usine-digitale.fr/article/3ds-outscale-cloud-confiance-defense-ministere-armees-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0003-cccc-4000-b003-out000000002',
  'c10d0003-cc03-4b00-8c03-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  '3DS Outscale etend sa qualification SecNumCloud aux services GPU et IA',
  'L''ANSSI a etendu la qualification SecNumCloud de 3DS Outscale pour couvrir les services de calcul GPU et d''intelligence artificielle. C''est la premiere qualification de ce type en France, ouvrant la voie a l''IA souveraine pour les secteurs sensibles.',
  'sovereign_cloud',
  'https://www.outscale.com/fr/press/secnumcloud-gpu-ia-qualification-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0003-cccc-4000-b003-out000000003',
  'c10d0003-cc03-4b00-8c03-000000000003',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  '3DS Outscale ouvre un second data center souverain en region parisienne',
  'Dassault Systemes a annonce l''ouverture d''un second data center 3DS Outscale a Saclay, a proximite du pole de recherche Paris-Saclay. Le site de 5 MW est dedie aux workloads de simulation industrielle et de jumeaux numeriques pour les clients defense et aeronautique.',
  'data_center_expansion',
  'https://www.lesechos.fr/tech-medias/3ds-outscale-datacenter-saclay-souverain-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Orange Business Services News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0004-dddd-4000-b004-obs000000001',
  'c10d0004-dd04-4b00-8c04-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Business obtient la qualification SecNumCloud pour Flexible Engine',
  'Orange Business a obtenu la qualification SecNumCloud delivree par l''ANSSI pour sa plateforme cloud Flexible Engine. Cette certification permet de proposer un cloud IaaS de confiance aux OIV, OSE et administrations publiques francaises.',
  'sovereign_cloud',
  'https://www.orange-business.com/fr/press/secnumcloud-flexible-engine-qualification-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0004-dddd-4000-b004-obs000000002',
  'c10d0004-dd04-4b00-8c04-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Business lance une offre SASE souveraine combinant SD-WAN et cybersecurite',
  'Orange Business a devoile son offre SASE (Secure Access Service Edge) souveraine, integrant SD-WAN, firewall cloud et zero trust network access. Le service est opere depuis des PoP en France et en Europe, sans transit par les Etats-Unis.',
  'sovereign_cloud',
  'https://www.orange-business.com/fr/press/sase-souverain-sdwan-cybersecurite-2026',
  'positive', 8, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0004-dddd-4000-b004-obs000000003',
  'c10d0004-dd04-4b00-8c04-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Business investit 300M EUR dans ses data centers en France et en Europe',
  'Orange Business a annonce un plan d''investissement de 300 millions EUR sur 3 ans pour moderniser et etendre ses data centers en France (Val-de-Reuil, Cesson-Sevigne) et en Europe. L''objectif est de doubler la capacite d''hebergement cloud et IA.',
  'data_center_expansion',
  'https://www.lesechos.fr/tech-medias/orange-business-investissement-datacenters-300m-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0004-dddd-4000-b004-obs000000004',
  'c10d0004-dd04-4b00-8c04-000000000004',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Orange Business remporte le contrat cloud et cybersecurite de la SNCF',
  'Orange Business a ete selectionne par la SNCF pour un contrat de 5 ans couvrant la migration vers le cloud hybride, les services de cybersecurite managee et la connectivite SD-WAN pour l''ensemble du reseau ferroviaire francais.',
  'major_contract',
  'https://www.usinenouvelle.com/article/orange-business-sncf-contrat-cloud-cybersecurite-2026',
  'positive', 8, 1775700000, 1775950000, 1776520000
);

-- ---- Atos OneCloud News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0005-eeee-4000-b005-ato000000001',
  'c10d0005-ee05-4b00-8c05-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Eviden (ex-Atos) livre le supercalculateur Jules Verne au CEA',
  'Eviden (division cloud et HPC d''Atos) a livre le supercalculateur Jules Verne au CEA, base sur l''architecture BullSequana XH3000. Avec une puissance de 80 petaflops, il sera utilise pour les simulations de defense et les programmes de recherche nucleaire.',
  'sovereign_cloud',
  'https://www.usine-digitale.fr/article/eviden-atos-supercalculateur-jules-verne-cea-2026',
  'positive', 8, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0005-eeee-4000-b005-ato000000002',
  'c10d0005-ee05-4b00-8c05-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Atos OneCloud lance une offre de migration cloud souverain pour les administrations',
  'Atos OneCloud a lance un programme accelere de migration vers le cloud souverain pour les administrations publiques francaises, base sur OpenShift et SecNumCloud. Le programme cible 200 applications gouvernementales d''ici 2028.',
  'sovereign_cloud',
  'https://www.atos.net/fr/press/onecloud-migration-souverain-administrations-2026',
  'positive', 7, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0005-eeee-4000-b005-ato000000003',
  'c10d0005-ee05-4b00-8c05-000000000005',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Atos restructure sa division cloud avec la cession d''actifs non strategiques',
  'Atos a annonce la cession de ses activites d''infra-management non strategiques pour se recentrer sur le cloud souverain, le HPC et la cybersecurite via Eviden. La restructuration concerne 4000 postes en Europe.',
  'restructuring',
  'https://www.lesechos.fr/tech-medias/atos-restructuration-cloud-cession-eviden-2026',
  'negative', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Clever Cloud News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0006-ffff-4000-b006-clv000000001',
  'c10d0006-ff06-4b00-8c06-000000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Clever Cloud leve 25 millions EUR pour accelerer son cloud souverain',
  'Clever Cloud a boucle un tour de table de 25 millions EUR aupres de Bpifrance et de fonds europeens pour accelerer le developpement de son PaaS souverain. Les fonds financeront l''ouverture de data centers en Allemagne et aux Pays-Bas.',
  'sovereign_cloud',
  'https://www.usine-digitale.fr/article/clever-cloud-levee-fonds-25m-cloud-souverain-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0006-ffff-4000-b006-clv000000002',
  'c10d0006-ff06-4b00-8c06-000000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Clever Cloud lance Clever AI, une offre d''inference IA souveraine sur GPU europeens',
  'Clever Cloud a lance Clever AI, une plateforme d''inference de modeles d''IA generative hebergee exclusivement sur des GPU en France. Le service supporte les modeles Mistral, Llama et les modeles open-source, sans transfert de donnees hors UE.',
  'sovereign_cloud',
  'https://www.clever-cloud.com/press/clever-ai-inference-souveraine-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0006-ffff-4000-b006-clv000000003',
  'c10d0006-ff06-4b00-8c06-000000000006',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Clever Cloud selectionne par l''Education Nationale pour l''hebergement des services numeriques',
  'Le ministere de l''Education Nationale a selectionne Clever Cloud pour heberger ses applications pedagogiques numeriques sur une infrastructure souveraine francaise. Le contrat couvre 12 millions d''eleves et 800 000 enseignants.',
  'major_contract',
  'https://www.lesechos.fr/tech-medias/clever-cloud-education-nationale-hebergement-souverain-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

-- ---- Platform.sh News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0007-a7a7-4000-b007-psh000000001',
  'c10d0007-a707-4b00-8c07-000000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Platform.sh fusionne avec Upsun pour creer une plateforme cloud developer-first unifiee',
  'Platform.sh a complete la fusion de sa marque avec Upsun, sa plateforme cloud de nouvelle generation. L''offre unifiee combine PaaS, preview environments et observabilite integree pour les equipes de developpement cloud-native.',
  'data_center_expansion',
  'https://www.usine-digitale.fr/article/platform-sh-upsun-fusion-plateforme-cloud-developer-2026',
  'positive', 7, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0007-a7a7-4000-b007-psh000000002',
  'c10d0007-a707-4b00-8c07-000000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Platform.sh ouvre une region cloud en France pour repondre aux exigences de souverainete',
  'Platform.sh a lance une region cloud dediee en France (hebergee chez Scaleway) pour les clients soumis aux reglementations de souverainete des donnees. La region offre une residance complete des donnees en France avec chiffrement AES-256.',
  'sovereign_cloud',
  'https://www.platform.sh/press/france-region-cloud-souverainete-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0007-a7a7-4000-b007-psh000000003',
  'c10d0007-a707-4b00-8c07-000000000007',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Platform.sh signe un partenariat strategique avec Symfony pour le deploiement cloud natif PHP',
  'Platform.sh a signe un partenariat strategique avec SensioLabs (createur de Symfony) pour offrir un deploiement cloud optimise des applications Symfony. Le partenariat inclut des templates pre-configures et un support premium conjoint.',
  'strategic_partnership',
  'https://www.platform.sh/press/symfony-partenariat-deploiement-cloud-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Talend France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0008-b8b8-4000-b008-tld000000001',
  'c10d0008-b808-4b00-8c08-000000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Talend integre Qlik pour creer la plateforme leader de data integration et analytics',
  'Suite au rachat par Qlik, Talend a complete l''integration de ses outils de data integration avec la plateforme Qlik Sense. La combinaison offre un pipeline de donnees de bout en bout: extraction, transformation, qualite et visualisation.',
  'data_center_expansion',
  'https://www.usine-digitale.fr/article/talend-qlik-integration-data-analytics-plateforme-2026',
  'positive', 8, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0008-b8b8-4000-b008-tld000000002',
  'c10d0008-b808-4b00-8c08-000000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Talend lance Data Fabric for AI, sa plateforme de preparation de donnees pour l''IA generative',
  'Talend a devoile Data Fabric for AI, une extension de sa plateforme permettant de preparer, cataloguer et gouverner les donnees d''entrainement pour les modeles d''IA generative. Le produit integre le data lineage et la detection automatique de biais.',
  'sovereign_cloud',
  'https://www.talend.com/press/data-fabric-ai-generative-preparation-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0008-b8b8-4000-b008-tld000000003',
  'c10d0008-b808-4b00-8c08-000000000008',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Talend France recrute 150 ingenieurs R&D pour son centre de Suresnes',
  'Talend a annonce le recrutement de 150 ingenieurs R&D pour son centre de developpement de Suresnes, focalises sur l''integration de donnees temps reel, la gouvernance IA et les connecteurs cloud-natifs. Le centre reste le plus grand site R&D de Talend/Qlik en Europe.',
  'hiring',
  'https://www.usinenouvelle.com/article/talend-recrutement-150-ingenieurs-suresnes-rd-2026',
  'positive', 6, 1775800000, 1776000000, 1776520000
);

-- ---- Databricks France News (4 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0009-c9c9-4000-b009-dbk000000001',
  'c10d0009-c909-4b00-8c09-000000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Databricks ouvre une region Azure France pour heberger les donnees des clients francais',
  'Databricks a annonce l''ouverture d''une region dediee sur Azure France Central (Paris), permettant aux entreprises francaises de traiter leurs donnees sur le sol national. L''offre repond aux exigences de souverainete des secteurs banque, sante et public.',
  'sovereign_cloud',
  'https://www.databricks.com/fr/press/azure-france-region-souverainete-2026',
  'positive', 9, 1776100000, 1776200000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0009-c9c9-4000-b009-dbk000000002',
  'c10d0009-c909-4b00-8c09-000000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Databricks lance Mosaic AI en France pour industrialiser l''IA generative en entreprise',
  'Databricks a lance Mosaic AI pour le marche francais, offrant l''entrainement, le fine-tuning et le serving de modeles LLM directement sur la plateforme Lakehouse. Les premiers clients incluent BNP Paribas, Carrefour et Sanofi.',
  'data_center_expansion',
  'https://www.usine-digitale.fr/article/databricks-mosaic-ai-france-ia-generative-entreprise-2026',
  'positive', 8, 1775950000, 1776100000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0009-c9c9-4000-b009-dbk000000003',
  'c10d0009-c909-4b00-8c09-000000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Databricks France depasse les 500 clients et double son chiffre d''affaires en 2025',
  'Databricks France a annonce avoir depasse les 500 clients actifs en France, avec une croissance de 100% de son chiffre d''affaires en 2025. Les secteurs banque, retail et industrie representent 70% de la base installee.',
  'growth',
  'https://www.lesechos.fr/tech-medias/databricks-france-500-clients-croissance-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0009-c9c9-4000-b009-dbk000000004',
  'c10d0009-c909-4b00-8c09-000000000009',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Databricks recrute 100 ingenieurs en France pour son centre R&D parisien',
  'Databricks a annonce l''ouverture de 100 postes d''ingenieurs en France pour renforcer son centre de R&D parisien. Les recrutements portent sur le machine learning, le data engineering et l''optimisation de requetes SQL a grande echelle.',
  'hiring',
  'https://www.usinenouvelle.com/article/databricks-recrutement-100-ingenieurs-paris-rd-2026',
  'positive', 7, 1775700000, 1775950000, 1776520000
);

-- ---- Snowflake France News (3 items) ----

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0010-dada-4000-b010-snw000000001',
  'c10d0010-da10-4b00-8c10-000000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Snowflake lance Cortex AI en France pour l''IA generative dans le data cloud',
  'Snowflake a deploye Cortex AI sur sa region Azure France, permettant aux clients francais d''utiliser l''IA generative directement dans leur data cloud. Les fonctionnalites incluent le text-to-SQL, le summarization et les LLM fine-tunes sur donnees proprietaires.',
  'sovereign_cloud',
  'https://www.snowflake.com/fr/press/cortex-ai-france-ia-generative-data-cloud-2026',
  'positive', 9, 1776050000, 1776150000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0010-dada-4000-b010-snw000000002',
  'c10d0010-da10-4b00-8c10-000000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Snowflake ouvre un bureau elargi a Paris et vise 300 employes en France d''ici 2027',
  'Snowflake a inaugure son nouveau bureau parisien dans le 8e arrondissement, triplant sa surface pour accueillir jusqu''a 300 employes. L''expansion soutient la croissance du marche francais ou Snowflake revendique plus de 400 clients.',
  'data_center_expansion',
  'https://www.lesechos.fr/tech-medias/snowflake-paris-bureau-expansion-300-employes-2026',
  'positive', 7, 1775900000, 1776050000, 1776520000
);

INSERT INTO news (id, company_id, source_id, title, summary, category, source_url, sentiment, relevance_score, published_at, extracted_at, created_at)
VALUES (
  'nc10-0010-dada-4000-b010-snw000000003',
  'c10d0010-da10-4b00-8c10-000000000010',
  '00238d74-63da-4b37-88cb-ff4357db7e13',
  'Snowflake signe un partenariat strategique avec Capgemini France pour accelerer les migrations data cloud',
  'Snowflake et Capgemini France ont signe un accord de partenariat strategique pour accompagner les entreprises du CAC 40 dans leur migration vers le Data Cloud. Le partenariat comprend un centre d''excellence commun et 200 consultants dedies.',
  'strategic_partnership',
  'https://www.snowflake.com/fr/press/capgemini-partenariat-migration-data-cloud-2026',
  'positive', 7, 1775800000, 1776000000, 1776520000
);


-- ===================== 3. PROSPECT_SCORES =====================

-- OVHcloud: strong on sovereign cloud, data center expansion, SecNumCloud leader
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
  'ps-ovh01-aa01-4000-a001-cd0000000001',
  'c10d0001-aa01-4b00-8c01-000000000001',
  8, 7, 6, 7,
  7, 8, 7, 6,
  7, 8, 9, 5,
  4, 6, 5, 3, 5,
  7, 5, 4, 5,
  7, 8, 5, 6, 6,
  9, 8, 6, 7,
  6, 3, 8, 7,
  4, 3, 4,
  5, 5, 4, 7, 4,
  8, 3, 9,
  6, 4, 8,
  62, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Scaleway: GPU/AI infrastructure, European expansion, SecNumCloud pursuit
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
  'ps-scw02-bb02-4000-a002-cd0000000002',
  'c10d0002-bb02-4b00-8c02-000000000002',
  7, 6, 5, 7,
  8, 7, 6, 5,
  7, 8, 8, 4,
  5, 5, 4, 2, 4,
  6, 4, 3, 5,
  7, 8, 4, 5, 6,
  8, 8, 5, 6,
  6, 2, 7, 6,
  3, 3, 3,
  4, 4, 4, 6, 3,
  7, 2, 8,
  5, 3, 7,
  58, 'warm',
  1776520000, 1776520000, 1776520000
);

-- 3DS Outscale: sovereign cloud for defense, SecNumCloud qualified, Dassault backing
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
  'ps-out03-cc03-4000-a003-cd0000000003',
  'c10d0003-cc03-4b00-8c03-000000000003',
  7, 6, 4, 6,
  7, 7, 6, 5,
  5, 7, 7, 4,
  3, 5, 4, 2, 4,
  5, 4, 3, 4,
  6, 7, 3, 4, 5,
  7, 6, 5, 6,
  5, 2, 6, 7,
  3, 4, 3,
  4, 3, 5, 7, 3,
  8, 6, 9,
  7, 2, 6,
  55, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Orange Business Services: large enterprise cloud, cyber, SecNumCloud
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
  'ps-obs04-dd04-4000-a004-cd0000000004',
  'c10d0004-dd04-4b00-8c04-000000000004',
  8, 7, 8, 7,
  8, 7, 8, 7,
  6, 7, 7, 6,
  3, 5, 5, 3, 7,
  7, 5, 4, 6,
  6, 7, 5, 6, 5,
  7, 7, 7, 6,
  7, 5, 8, 7,
  5, 4, 7,
  6, 5, 5, 6, 5,
  7, 3, 7,
  7, 3, 7,
  60, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Atos OneCloud: restructuring challenges, HPC strength, sovereign cloud
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
  'ps-ato05-ee05-4000-a005-cd0000000005',
  'c10d0005-ee05-4b00-8c05-000000000005',
  7, 6, 7, 6,
  7, 6, 7, 5,
  4, 5, 5, 5,
  2, 4, 7, 5, 6,
  5, 5, 5, 5,
  6, 6, 6, 4, 4,
  4, 5, 6, 5,
  6, 4, 7, 5,
  7, 6, 7,
  6, 6, 5, 6, 4,
  6, 4, 6,
  5, 5, 5,
  48, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Clever Cloud: fast-growing PaaS, sovereign positioning, funding
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
  'ps-clv06-ff06-4000-a006-cd0000000006',
  'c10d0006-ff06-4b00-8c06-000000000006',
  7, 5, 3, 5,
  6, 7, 5, 4,
  6, 7, 6, 3,
  7, 5, 4, 2, 3,
  5, 3, 3, 4,
  6, 7, 3, 4, 5,
  6, 7, 4, 5,
  5, 2, 6, 5,
  3, 2, 2,
  3, 3, 4, 5, 3,
  7, 2, 7,
  5, 2, 6,
  50, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Platform.sh: developer platform, EU data sovereignty, niche PaaS
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
  'ps-psh07-a707-4000-a007-cd0000000007',
  'c10d0007-a707-4b00-8c07-000000000007',
  7, 5, 4, 6,
  7, 6, 5, 4,
  5, 7, 5, 4,
  5, 4, 4, 2, 3,
  5, 3, 3, 5,
  6, 7, 4, 4, 5,
  5, 7, 5, 5,
  6, 2, 6, 6,
  3, 3, 2,
  4, 4, 3, 5, 3,
  7, 2, 6,
  4, 2, 6,
  52, 'cold',
  1776520000, 1776520000, 1776520000
);

-- Talend France: data integration leader, Qlik acquisition, R&D center
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
  'ps-tld08-b808-4000-a008-cd0000000008',
  'c10d0008-b808-4b00-8c08-000000000008',
  7, 6, 5, 7,
  7, 6, 6, 5,
  5, 7, 5, 5,
  3, 4, 5, 3, 5,
  6, 4, 4, 5,
  7, 7, 5, 5, 5,
  5, 7, 6, 6,
  6, 3, 6, 6,
  4, 6, 5,
  5, 5, 3, 6, 3,
  7, 2, 6,
  5, 2, 6,
  56, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Databricks France: high-growth data/AI platform, strong market traction
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
  'ps-dbk09-c909-4000-a009-cd0000000009',
  'c10d0009-c909-4b00-8c09-000000000009',
  8, 6, 4, 7,
  8, 7, 6, 5,
  8, 8, 6, 5,
  6, 4, 3, 2, 4,
  7, 4, 3, 5,
  8, 8, 4, 6, 7,
  6, 9, 6, 7,
  7, 3, 8, 7,
  3, 3, 5,
  4, 3, 3, 7, 4,
  7, 2, 6,
  6, 2, 8,
  65, 'warm',
  1776520000, 1776520000, 1776520000
);

-- Snowflake France: data cloud leader, strong partnerships, French expansion
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
  'ps-snw10-da10-4000-a010-cd0000000010',
  'c10d0010-da10-4b00-8c10-000000000010',
  8, 6, 4, 6,
  8, 7, 6, 5,
  7, 7, 5, 5,
  5, 3, 3, 2, 4,
  6, 4, 3, 5,
  7, 8, 4, 6, 7,
  6, 8, 6, 6,
  7, 3, 8, 7,
  3, 3, 5,
  4, 3, 3, 7, 4,
  7, 2, 6,
  6, 2, 7,
  63, 'warm',
  1776520000, 1776520000, 1776520000
);
