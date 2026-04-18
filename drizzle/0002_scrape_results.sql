CREATE TABLE `scrape_results` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`normalized_url` text NOT NULL,
	`base_domain` text NOT NULL,
	`path` text NOT NULL,
	`status_code` integer NOT NULL,
	`content_type` text,
	`content_length` integer,
	`encoding` text,
	`etag` text,
	`last_modified` text,
	`title` text,
	`meta_description` text,
	`meta_keywords` text,
	`og_title` text,
	`og_description` text,
	`og_image` text,
	`canonical_url` text,
	`language` text,
	`favicon_url` text,
	`word_count` integer,
	`link_count` integer,
	`image_count` integer,
	`raw_html_r2_key` text,
	`extracted_text_r2_key` text,
	`json_ld` text,
	`scraped_at` integer NOT NULL,
	`scrape_duration_ms` integer,
	`source_id` text NOT NULL REFERENCES `sources`(`id`)
);
--> statement-breakpoint
CREATE INDEX `scrape_results_source_id` ON `scrape_results` (`source_id`);
--> statement-breakpoint
CREATE INDEX `scrape_results_base_domain` ON `scrape_results` (`base_domain`);
--> statement-breakpoint
CREATE INDEX `scrape_results_scraped_at` ON `scrape_results` (`scraped_at`);
--> statement-breakpoint
CREATE INDEX `scrape_results_normalized_url` ON `scrape_results` (`normalized_url`);
--> statement-breakpoint
CREATE INDEX `scrape_results_status_code` ON `scrape_results` (`status_code`);
