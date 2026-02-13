import { Brand, SearchParams, SearchResponse, Question } from "../types/question";

// API base URL - would be configured per environment
const getApiBaseUrl = (brand: Brand): string => {
	const baseUrls: Record<Brand, string> = {
		wjec: import.meta.env.VITE_WJEC_API_URL || "/api/wjec",
		eduqas: import.meta.env.VITE_EDUQAS_API_URL || "/api/eduqas",
	};
	return baseUrls[brand];
};

/**
 * Search questions
 */
export const searchQuestions = async (brand: Brand, params: SearchParams): Promise<SearchResponse> => {
	const baseUrl = getApiBaseUrl(brand);
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			searchParams.append(key, String(value));
		}
	});

	const url = `${baseUrl}/questions?${searchParams.toString()}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Search failed: ${response.statusText}`);
	}

	return response.json();
};

/**
 * Get a single question by ID
 */
export const getQuestion = async (brand: Brand, questionId: string): Promise<Question> => {
	const baseUrl = getApiBaseUrl(brand);
	const url = `${baseUrl}/questions/${questionId}`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to get question: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data;
};

/**
 * Create a new question
 */
export const createQuestion = async (
	brand: Brand,
	question: Omit<Question, "id" | "createdAt" | "updatedAt">,
): Promise<{ id: string; message: string }> => {
	const baseUrl = getApiBaseUrl(brand);
	const url = `${baseUrl}/questions`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(question),
	});

	if (!response.ok) {
		throw new Error(`Failed to create question: ${response.statusText}`);
	}

	return response.json();
};

/**
 * Check API health
 */
export const checkHealth = async (brand: Brand): Promise<{ status: string }> => {
	const baseUrl = getApiBaseUrl(brand);
	const url = `${baseUrl}/health`;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Health check failed: ${response.statusText}`);
	}

	return response.json();
};

/**
 * Delete a question by ID
 */
export const deleteQuestion = async (brand: Brand, questionId: string): Promise<{ message: string }> => {
	const baseUrl = getApiBaseUrl(brand);
	const url = `${baseUrl}/questions/${questionId}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to delete question: ${response.statusText}`);
	}

	return response.json();
};
