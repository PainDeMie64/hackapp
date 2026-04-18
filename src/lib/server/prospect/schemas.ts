import { z } from 'zod';

const signalSchema = z.object({
	text: z.string().describe('Description concise du signal detecte'),
	strength: z.enum(['strong', 'moderate', 'weak']).catch('moderate').describe('Force du signal'),
	source: z.string().nullish().describe('Extrait ou reference dans le texte source'),
});

export type Signal = z.infer<typeof signalSchema>;

const dimensionSignalsSchema = z.object({
	signals: z.array(signalSchema).catch([]),
	confidence: z.enum(['high', 'medium', 'low']).catch('low').describe('Confiance globale pour cette dimension'),
});

export const extractedCompanySchema = z.object({
	name: z.string().describe('Nom officiel de l\'entreprise'),
	domain: z.string().nullish().describe('Domaine web principal (ex: airbus.com)'),
	description: z.string().nullish().describe('Description courte de l\'activite'),
	sector: z.string().nullish().describe('Secteur principal: automotive, aerospace, energy, telecoms, pharma, rail, banking_it, manufacturing, semiconductors'),
	subsector: z.string().nullish().describe('Sous-secteur ou specialisation'),
	locationCity: z.string().nullish().describe('Ville du siege'),
	locationCountry: z.string().nullish().describe('Pays'),
	employeeCount: z.number().int().nullish().describe('Nombre de salaries'),
	revenueEur: z.number().int().nullish().describe('CA annuel en euros'),
	revenueYear: z.number().int().nullish().describe('Annee du CA'),
	techStack: z.array(z.string()).nullish().describe('Technologies detectees'),
	siren: z.string().nullish().describe('Numero SIREN si mentionne'),
	linkedinUrl: z.string().nullish().describe('URL LinkedIn si mentionnee'),

	scoring: z.object({
		firmographic: dimensionSignalsSchema.describe('Adequation firmographique: secteur cible, taille 500+, CA 50M+, R&D 50+, proximite ALTEN'),
		recruitment: dimensionSignalsSchema.describe('Signaux recrutement: volume offres 20+, postes 60j+, competences rares, echecs recrutement'),
		financial: dimensionSignalsSchema.describe('Signaux financiers: croissance CA >10%, R&D >5% CA, CapEx, levees, gel embauches+projets'),
		project: dimensionSignalsSchema.describe('Signaux projet/expansion: usines, nouveaux produits, transformations, partenariats'),
		intent: dimensionSignalsSchema.describe('Intention/comportemental: AO publies, activite evenementielle, signaux sociaux'),
		regulatory: dimensionSignalsSchema.describe('Pression reglementaire: AI Act, CSRD, NIS2, DORA, certifications sectorielles'),
		competitive: dimensionSignalsSchema.describe('Position concurrentielle: contrats sortants, consultants concurrents, opportunites deplacement'),
	}).optional(),

	disqualifiers: z.array(z.union([z.string(), z.object({}).passthrough().transform((o) => JSON.stringify(o))])).nullish().describe('Signaux negatifs: gel sans projets, internalisation, faillite, trop petit, sanctions'),
});

export type ExtractedCompany = z.infer<typeof extractedCompanySchema>;

export const extractionResultSchema = z.object({
	companies: z.array(extractedCompanySchema),
	sourceNotes: z.string().nullish().describe('Notes sur la qualite/couverture du document source'),
});

export type ExtractionResult = z.infer<typeof extractionResultSchema>;
