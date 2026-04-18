CREATE TABLE `prospect_scores` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL REFERENCES `companies`(`id`),

	-- Firmographics (20%)
	`sector_alignment` integer,
	`naf_code_match` integer,
	`company_size` integer,
	`rd_department_size` integer,
	`geographic_proximity` integer,
	`regional_specialization` integer,
	`company_maturity` integer,
	`organizational_structure` integer,

	-- Financial signals (15%)
	`revenue_growth_gap` integer,
	`rd_spending_trend` integer,
	`capex_spikes` integer,
	`capex_to_opex_shift` integer,
	`recent_funding` integer,
	`public_grants` integer,
	`margin_compression` integer,
	`hiring_freeze_with_projects` integer,
	`external_spend_in_financials` integer,

	-- Hiring signals (25%)
	`engineering_job_volume` integer,
	`stale_job_postings` integer,
	`repeated_repostings` integer,
	`contract_freelance_language` integer,
	`rare_skills_demand` integer,
	`emerging_tech_demand` integer,
	`high_turnover_signals` integer,
	`recruiter_hiring_wave` integer,
	`above_market_salaries` integer,

	-- Project & expansion (15%)
	`physical_expansion` integer,
	`new_product_launch` integer,
	`platform_migration` integer,
	`program_milestones` integer,
	`digital_transformation` integer,
	`erp_plm_migration` integer,
	`cloud_migration` integer,
	`strategic_partnerships` integer,

	-- Organizational
	`leadership_change` integer,
	`ma_activity` integer,
	`existing_consulting_usage` integer,

	-- Technology
	`legacy_modernization` integer,
	`tech_debt_indicators` integer,
	`cybersecurity_gaps` integer,
	`industry_specific_software` integer,
	`iot_industry4_adoption` integer,

	-- Regulatory
	`eu_regulatory_pressure` integer,
	`french_defense_budget` integer,
	`certification_needs` integer,

	-- News & events
	`major_contract_won` integer,
	`crisis_event` integer,
	`industry_event_presence` integer,

	-- Aggregates
	`total_score` integer,
	`score_label` text,

	-- Timestamps
	`scored_at` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prospect_scores_company_id_unique` ON `prospect_scores` (`company_id`);
