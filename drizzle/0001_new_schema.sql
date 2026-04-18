DROP TABLE IF EXISTS `users`;
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`name` text,
	`type` text,
	`is_active` integer DEFAULT 1,
	`last_crawled_at` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sources_url_unique` ON `sources` (`url`);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`domain` text,
	`description` text,
	`sector` text,
	`subsector` text,
	`location_city` text,
	`location_country` text,
	`employee_count` integer,
	`revenue_eur` integer,
	`revenue_year` integer,
	`tech_stack` text,
	`uses_consulting_services` integer,
	`linkedin_url` text,
	`siren` text,
	`logo_url` text,
	`status` text DEFAULT 'active',
	`enrichment_status` text DEFAULT 'pending',
	`last_enriched_at` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `companies_domain_unique` ON `companies` (`domain`);
--> statement-breakpoint
CREATE INDEX `companies_sector` ON `companies` (`sector`);
--> statement-breakpoint
CREATE INDEX `companies_country` ON `companies` (`location_country`);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL REFERENCES `companies`(`id`),
	`source_id` text NOT NULL REFERENCES `sources`(`id`),
	`title` text NOT NULL,
	`summary` text,
	`category` text,
	`source_url` text NOT NULL,
	`report_key` text,
	`sentiment` text,
	`relevance_score` integer,
	`published_at` integer,
	`extracted_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_company_source_url` ON `news` (`company_id`, `source_url`);
--> statement-breakpoint
CREATE INDEX `news_published_at` ON `news` (`published_at`);
