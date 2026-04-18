CREATE TABLE `searches` (
	`id` text PRIMARY KEY NOT NULL,
	`sector` text NOT NULL,
	`regions` text,
	`prospect_count` integer,
	`free_conditions` text,
	`min_revenue` integer,
	`min_headcount` integer,
	`growth_potential` text,
	`consulting_usage` text,
	`status` text DEFAULT 'pending',
	`result_count` integer,
	`best_score` integer,
	`error_message` text,
	`started_at` integer,
	`completed_at` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE INDEX `searches_status` ON `searches` (`status`);
--> statement-breakpoint
CREATE INDEX `searches_created_at` ON `searches` (`created_at`);
