ALTER TABLE `companies` ADD `prospect_score` integer;
--> statement-breakpoint
ALTER TABLE `companies` ADD `prospect_band` text;
--> statement-breakpoint
ALTER TABLE `companies` ADD `scored_at` integer;
--> statement-breakpoint
CREATE TABLE `company_scores` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL REFERENCES `companies`(`id`),
	`dimension` text NOT NULL,
	`score` integer NOT NULL,
	`signals` text,
	`scored_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scores_company_dimension` ON `company_scores` (`company_id`, `dimension`);
--> statement-breakpoint
CREATE INDEX `scores_company` ON `company_scores` (`company_id`);
