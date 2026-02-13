export interface QuestionSeries {
	year: number;
	month: number;
}

export interface Question {
	id: string;
	series?: QuestionSeries;
	subject?: string;
	level?: string;
	date?: string;
	validTo?: string;
	marks?: number;
	questionHtml: string;
	questionNumber?: string;
	paperCode?: string;
	language: string;
	tier?: string;
	tags?: string[];
	markingScheme?: string;
	examinersComments?: string;
	createdAt?: string;
	updatedAt?: string;
	deleted?: boolean;
}

export interface SearchParams {
	subject?: string;
	level?: string;
	language?: string;
	tier?: string;
	tags?: string;
	series?: string;
	paperCode?: string;
	q?: string; // Free-text search query
	limit?: number;
	offset?: number;
}

export interface Aggregation {
	key: string;
	count: number;
}

export interface Aggregations {
	subject?: Aggregation[];
	level?: Aggregation[];
	language?: Aggregation[];
	tier?: Aggregation[];
	tags?: Aggregation[];
}

export interface SearchResponse {
	data: Question[];
	meta: {
		total: number;
		limit: number;
		offset: number;
	};
	aggregations?: Aggregations;
}

export type Brand = "wjec" | "eduqas";
