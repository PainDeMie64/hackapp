import type { ScoringDimension, ProspectBand } from '../db/schema.js';
import type { ExtractedCompany, Signal } from './schemas.js';

const DIMENSION_WEIGHTS: Record<ScoringDimension, number> = {
	firmographic: 0.20,
	recruitment: 0.25,
	financial: 0.15,
	project: 0.15,
	intent: 0.10,
	regulatory: 0.10,
	competitive: 0.05,
};

const STRENGTH_SCORES: Record<Signal['strength'], number> = {
	strong: 30,
	moderate: 18,
	weak: 8,
};

const CONFIDENCE_MULTIPLIER: Record<'high' | 'medium' | 'low', number> = {
	high: 1.0,
	medium: 0.7,
	low: 0.4,
};

export interface DimensionResult {
	dimension: ScoringDimension;
	score: number;
	signals: Signal[];
}

export interface ScoringResult {
	dimensions: DimensionResult[];
	totalScore: number;
	band: ProspectBand;
	disqualified: boolean;
	disqualifiers: string[];
}

function scoreDimension(
	dimension: ScoringDimension,
	data: { signals: Signal[]; confidence: 'high' | 'medium' | 'low' }
): DimensionResult {
	if (data.signals.length === 0) {
		return { dimension, score: 0, signals: [] };
	}

	const rawScore = data.signals.reduce((sum, s) => sum + STRENGTH_SCORES[s.strength], 0);
	const capped = Math.min(rawScore, 100);
	const adjusted = Math.round(capped * CONFIDENCE_MULTIPLIER[data.confidence]);

	return {
		dimension,
		score: Math.min(adjusted, 100),
		signals: data.signals,
	};
}

function classifyBand(score: number): ProspectBand {
	if (score >= 80) return 'hot';
	if (score >= 60) return 'warm';
	if (score >= 40) return 'qualified';
	return 'cold';
}

const EMPTY_DIMENSION = { signals: [] as Signal[], confidence: 'low' as const };

export function scoreCompany(company: ExtractedCompany): ScoringResult {
	const disqualified = (company.disqualifiers?.length ?? 0) > 0;
	const scoring = company.scoring ?? {};

	const dimensions = (Object.keys(DIMENSION_WEIGHTS) as ScoringDimension[]).map((dim) =>
		scoreDimension(dim, scoring[dim as keyof typeof scoring] ?? EMPTY_DIMENSION)
	);

	const totalScore = disqualified
		? 0
		: Math.round(
				dimensions.reduce(
					(sum, d) => sum + d.score * DIMENSION_WEIGHTS[d.dimension],
					0
				)
			);

	return {
		dimensions,
		totalScore,
		band: disqualified ? 'cold' : classifyBand(totalScore),
		disqualified,
		disqualifiers: company.disqualifiers ?? [],
	};
}
