ALTER TABLE `scrape_results` ADD COLUMN `final_url` text;
--> statement-breakpoint
ALTER TABLE `scrape_results` ADD COLUMN `content_hash` text;
--> statement-breakpoint
ALTER TABLE `scrape_results` ADD COLUMN `llm_status` text DEFAULT 'pending';
--> statement-breakpoint
ALTER TABLE `scrape_results` ADD COLUMN `processed_at` integer;
--> statement-breakpoint
CREATE INDEX `scrape_results_pipeline` ON `scrape_results` (`source_id`, `llm_status`, `scraped_at`);
