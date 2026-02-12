import { Question } from "../types/question";
import { QuestionCard } from "./QuestionCard";
import "./QuestionList.css";

interface QuestionListProps {
	questions: Question[];
	total: number;
	limit: number;
	offset: number;
	onPageChange: (offset: number) => void;
	onQuestionClick?: (question: Question) => void;
}

export const QuestionList = ({ questions, total, limit, offset, onPageChange, onQuestionClick }: QuestionListProps) => {
	const currentPage = Math.floor(offset / limit) + 1;
	const totalPages = Math.ceil(total / limit);

	const handlePrevious = () => {
		if (offset > 0) {
			onPageChange(Math.max(0, offset - limit));
		}
	};

	const handleNext = () => {
		if (offset + limit < total) {
			onPageChange(offset + limit);
		}
	};

	if (questions.length === 0) {
		return (
			<div className="no-results">
				<p>No questions found matching your criteria.</p>
				<p>Try adjusting your filters.</p>
			</div>
		);
	}

	return (
		<div className="question-list">
			<div className="results-header">
				<span className="results-count">
					Showing {offset + 1}-{Math.min(offset + limit, total)} of {total} questions
				</span>
			</div>

			<div className="questions-grid">
				{questions.map((question) => (
					<QuestionCard key={question.id} question={question} onClick={() => onQuestionClick?.(question)} />
				))}
			</div>

			{totalPages > 1 && (
				<div className="pagination">
					<button className="page-button" onClick={handlePrevious} disabled={offset === 0}>
						← Previous
					</button>
					<span className="page-info">
						Page {currentPage} of {totalPages}
					</span>
					<button className="page-button" onClick={handleNext} disabled={offset + limit >= total}>
						Next →
					</button>
				</div>
			)}
		</div>
	);
};
