import { useState, FormEvent } from "react";
import { SearchParams, Aggregations } from "../types/question";
import "./SearchForm.css";

interface SearchFormProps {
	onSearch: (params: SearchParams) => void;
	isLoading?: boolean;
	aggregations: Aggregations;
}

export const SearchForm = ({ onSearch, isLoading, aggregations }: SearchFormProps) => {
	const [subject, setSubject] = useState("");
	const [level, setLevel] = useState("");
	const [tier, setTier] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSearch({
			subject: subject || undefined,
			level: level || undefined,
			tier: tier || undefined,
			limit: 20,
			offset: 0,
		});
	};

	const handleReset = () => {
		setSubject("");
		setLevel("");
		setTier("");
		onSearch({ limit: 20, offset: 0 });
	};

	return (
		<form className="search-form" onSubmit={handleSubmit}>
			<div className="search-filters">
				<div className="filter-group">
					<label htmlFor="subject">Subject</label>
					<select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
						<option value="">All Subjects</option>
						{(aggregations.subject || []).map((agg) => (
							<option key={agg.key} value={agg.key}>
								{agg.key} ({agg.count})
							</option>
						))}
					</select>
				</div>

				<div className="filter-group">
					<label htmlFor="level">Level</label>
					<select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
						<option value="">All Levels</option>
						{(aggregations.level || []).map((agg) => (
							<option key={agg.key} value={agg.key}>
								{agg.key} ({agg.count})
							</option>
						))}
					</select>
				</div>

				<div className="filter-group">
					<label htmlFor="tier">Tier</label>
					<select id="tier" value={tier} onChange={(e) => setTier(e.target.value)}>
						<option value="">All Tiers</option>
						{(aggregations.tier || []).map((agg) => (
							<option key={agg.key} value={agg.key}>
								{agg.key} ({agg.count})
							</option>
						))}
					</select>
				</div>

				<div className="filter-actions">
					<button type="submit" className="search-button" disabled={isLoading}>
						{isLoading ? "Searching..." : "Apply Filters"}
					</button>
					<button type="button" className="reset-button" onClick={handleReset}>
						Reset Filters
					</button>
				</div>
			</div>
		</form>
	);
};
