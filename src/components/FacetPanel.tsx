import { Aggregations } from "../types/question";
import "./FacetPanel.css";

interface FacetPanelProps {
	aggregations: Aggregations;
	onFilterClick: (field: string, value: string) => void;
}

export const FacetPanel = ({ aggregations, onFilterClick }: FacetPanelProps) => {
	const renderFacetGroup = (title: string, field: string, items?: { key: string; count: number }[]) => {
		if (!items || items.length === 0) {
			return null;
		}

		return (
			<div className="facet-group">
				<h4 className="facet-title">{title}</h4>
				<ul className="facet-list">
					{items.slice(0, 10).map((item) => (
						<li key={item.key} className="facet-item">
							<button className="facet-button" onClick={() => onFilterClick(field, item.key)}>
								<span className="facet-label">{item.key}</span>
								<span className="facet-count">{item.count}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	};

	const hasAggregations =
		aggregations.subject?.length ||
		aggregations.level?.length ||
		aggregations.language?.length ||
		aggregations.tier?.length ||
		aggregations.tags?.length;

	if (!hasAggregations) {
		return null;
	}

	return (
		<aside className="facet-panel">
			<h3 className="facet-header">Filter by</h3>
			{renderFacetGroup("Subject", "subject", aggregations.subject)}
			{renderFacetGroup("Level", "level", aggregations.level)}
			{renderFacetGroup("Language", "language", aggregations.language)}
			{renderFacetGroup("Tier", "tier", aggregations.tier)}
			{renderFacetGroup("Tags", "tags", aggregations.tags)}
		</aside>
	);
};
