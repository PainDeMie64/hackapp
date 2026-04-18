export function buildExtractNewsPrompt(
	company: { name: string; domain?: string | null; sector?: string | null },
	text: string
): string {
	const truncated = text.slice(0, 8000);
	return `Tu es un analyste veille pour ALTEN. Extrais les actualites pertinentes concernant l'entreprise "${company.name}" (domaine: ${company.domain ?? 'inconnu'}, secteur: ${company.sector ?? 'inconnu'}) a partir du texte suivant.

Pour chaque actualite, retourne un objet JSON avec:
- "title": titre court (1-2 phrases)
- "summary": resume LLM de 2-3 phrases
- "category": une parmi: hiring, funding, partnership, acquisition, product_launch, regulation, other
- "sentiment": positive, negative, ou neutral
- "relevance_score": 1-10 (pertinence pour la prospection ALTEN en ingenierie/IT)
- "source_url": l'URL source si mentionnee dans le texte, sinon null

Retourne UNIQUEMENT un tableau JSON valide. Si aucune actualite trouvee, retourne [].
Pas de markdown, pas de code fence, juste le JSON.

<document>
${truncated}
</document>`;
}

export function buildScoreProspectPrompt(company: {
	name: string;
	domain?: string | null;
	sector?: string | null;
	subsector?: string | null;
	locationCity?: string | null;
	locationCountry?: string | null;
	employeeCount?: number | null;
	revenueEur?: number | null;
	techStack?: string | null;
	description?: string | null;
	usesConsultingServices?: boolean | null;
}): string {
	return `Tu es un analyste commercial pour ALTEN, leader du conseil en ingenierie. Score cette entreprise sur les 50 criteres ci-dessous. Chaque score de 0 a 100.

Entreprise:
- Nom: ${company.name}
- Domaine: ${company.domain ?? ''}
- Secteur: ${company.sector ?? ''} / ${company.subsector ?? ''}
- Localisation: ${company.locationCity ?? ''}, ${company.locationCountry ?? ''}
- Effectif: ${company.employeeCount ?? ''}
- CA EUR: ${company.revenueEur ?? ''}
- Stack tech: ${company.techStack ?? ''}
- Utilise consulting: ${company.usesConsultingServices ?? ''}
- Description: ${company.description ?? ''}

Retourne UNIQUEMENT un JSON valide avec ces cles exactes (pas de markdown):
{"sector_alignment":N,"naf_code_match":N,"company_size":N,"rd_department_size":N,"geographic_proximity":N,"regional_specialization":N,"company_maturity":N,"organizational_structure":N,"revenue_growth_gap":N,"rd_spending_trend":N,"capex_spikes":N,"capex_to_opex_shift":N,"recent_funding":N,"public_grants":N,"margin_compression":N,"hiring_freeze_with_projects":N,"external_spend_in_financials":N,"engineering_job_volume":N,"stale_job_postings":N,"repeated_repostings":N,"contract_freelance_language":N,"rare_skills_demand":N,"emerging_tech_demand":N,"high_turnover_signals":N,"recruiter_hiring_wave":N,"above_market_salaries":N,"physical_expansion":N,"new_product_launch":N,"platform_migration":N,"program_milestones":N,"digital_transformation":N,"erp_plm_migration":N,"cloud_migration":N,"strategic_partnerships":N,"leadership_change":N,"ma_activity":N,"existing_consulting_usage":N,"legacy_modernization":N,"tech_debt_indicators":N,"cybersecurity_gaps":N,"industry_specific_software":N,"iot_industry4_adoption":N,"eu_regulatory_pressure":N,"french_defense_budget":N,"certification_needs":N,"major_contract_won":N,"crisis_event":N,"industry_event_presence":N}

Pour les criteres sans donnees, utilise 50 comme valeur neutre.`;
}
