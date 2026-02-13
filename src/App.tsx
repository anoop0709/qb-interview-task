import { useState, useCallback, useEffect } from "react";
import "./App.css";
import { SearchForm } from "./components/SearchForm";
import { QuestionList } from "./components/QuestionList";
import { FacetPanel } from "./components/FacetPanel";
import { QuestionModal } from "./components/QuestionModal";
import { BrandSelector } from "./components/BrandSelector";
import { LanguageToggle, UILanguage } from "./components/LanguageToggle";
import { Question, SearchResponse, SearchParams, Brand, Aggregations } from "./types/question";
import { mockSearch } from "./data/mockData";

const isMockData = true;

const emptyAggregations: Aggregations = {
	subject: [],
	level: [],
	language: [],
	tier: [],
	tags: [],
};

function App() {
	const [brand, setBrand] = useState<Brand>("wjec");
	const [language, setLanguage] = useState<UILanguage>("en");
	const [searchParams, setSearchParams] = useState<SearchParams>({
		language: "en",
		limit: 20,
		offset: 0,
	});
	const [results, setResults] = useState<SearchResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

	// Perform search
	const performSearch = useCallback(
		async (params: SearchParams) => {
			setIsLoading(true);
			setError(null);

			try {
				const response: SearchResponse = await mockSearch(params);
				setResults(response);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Search failed");
				setResults(null);
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	// Initial search on load
	useEffect(() => {
		performSearch(searchParams);
	}, [brand, language]);

	// Handle search submit
	const handleSearch = (params: SearchParams) => {
		const newParams: SearchParams = {
			...params,
			language,
			offset: 0,
		};
		setSearchParams(newParams);
		performSearch(newParams);
	};

	// Handle facet selection
	const handleFacetClick = (field: string, value: string) => {
		const newParams: SearchParams = {
			...searchParams,
			[field]: searchParams[field as keyof SearchParams] === value ? undefined : value,
			offset: 0,
		};
		setSearchParams(newParams);
		performSearch(newParams);
	};

	// Handle pagination
	const handlePageChange = (offset: number) => {
		const newParams: SearchParams = {
			...searchParams,
			offset,
		};
		setSearchParams(newParams);
		performSearch(newParams);
	};

	// Handle language change
	const handleLanguageChange = (newLang: UILanguage) => {
		setLanguage(newLang);
		const newParams: SearchParams = {
			...searchParams,
			language: newLang,
			offset: 0,
		};
		setSearchParams(newParams);
	};

	// Handle brand change
	const handleBrandChange = (newBrand: Brand) => {
		setBrand(newBrand);
		setSearchParams({
			language,
			limit: 20,
			offset: 0,
		});
	};

	return (
		<div className="app">
			<header className="app-header">
				<div className="header-content">
					<h1>Question Bank</h1>
					<p className="subtitle">Search examination questions across subjects and years</p>
				</div>
				<div className="header-controls">
					<LanguageToggle selected={language} onChange={handleLanguageChange} />
					<BrandSelector selectedBrand={brand} onBrandChange={handleBrandChange} />
				</div>
			</header>

			<main className="app-main">
				<aside className="app-sidebar">
					<FacetPanel aggregations={results?.aggregations || emptyAggregations} onFilterClick={handleFacetClick} />
				</aside>

				<section className="app-content">
					<SearchForm
						onSearch={handleSearch}
						isLoading={isLoading}
						aggregations={results?.aggregations || emptyAggregations}
					/>

					{error && (
						<div className="error-banner">
							<span className="error-icon">⚠️</span>
							<span>{error}</span>
						</div>
					)}

					<QuestionList
						questions={results?.data || []}
						total={results?.meta.total || 0}
						limit={searchParams.limit || 20}
						offset={searchParams.offset || 0}
						onPageChange={handlePageChange}
						onQuestionClick={setSelectedQuestion}
					/>
				</section>
			</main>

			{selectedQuestion && <QuestionModal question={selectedQuestion} onClose={() => setSelectedQuestion(null)} />}

			<footer className="app-footer">
				<p>
				{/* Bug fix: IS_MOCK_DATA was not defined. Changed to isMockData which is defined at the top of the file. */}
				{isMockData ? (
						<span className="demo-badge">Demo Mode - Using Mock Data</span>
					) : (
						<span>Connected to {brand.toUpperCase()} API</span>
					)}
				</p>
			</footer>
		</div>
	);
}

export default App;
