import { Question } from "../types/question";
import "./QuestionModal.css";

interface QuestionModalProps {
	question: Question;
	onClose: () => void;
}

export const QuestionModal = ({ question, onClose }: QuestionModalProps) => {
	const formatDate = (dateStr?: string) => {
		if (!dateStr) {
			return "N/A";
		}
		return new Date(dateStr).toLocaleDateString("en-GB", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatSeries = (series?: { year: number; month: number }) => {
		if (!series) {
			return "N/A";
		}
		const months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December",
		];
		return `${months[series.month - 1]} ${series.year}`;
	};

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>
					×
				</button>

				<div className="modal-header">
					<h2>
						{question.questionNumber || "Question"} - {question.subject}
					</h2>
					<div className="modal-badges">
						{question.level && <span className="badge">{question.level}</span>}
						{question.tier && <span className="badge">{question.tier}</span>}
						<span className="badge">{question.language === "cy" ? "Welsh" : "English"}</span>
						{question.marks && <span className="badge badge-marks">{question.marks} marks</span>}
					</div>
				</div>

				<div className="modal-body">
					<section className="modal-section">
						<h3>Question</h3>
						<div className="question-html" dangerouslySetInnerHTML={{ __html: question.questionHtml }} />
					</section>

					{question.markingScheme && (
						<section className="modal-section">
							<h3>Marking Scheme</h3>
							<div className="marking-scheme" dangerouslySetInnerHTML={{ __html: question.markingScheme }} />
						</section>
					)}

					{question.examinersComments && (
						<section className="modal-section">
							<h3>Examiner's Comments</h3>
							<div className="examiners-comments" dangerouslySetInnerHTML={{ __html: question.examinersComments }} />
						</section>
					)}

					<section className="modal-section modal-metadata">
						<h3>Details</h3>
						<dl className="metadata-grid">
							<dt>Paper Code</dt>
							<dd>{question.paperCode || "N/A"}</dd>

							<dt>Series</dt>
							<dd>{formatSeries(question.series)}</dd>

							<dt>Date</dt>
							<dd>{formatDate(question.date)}</dd>

							{question.tags && question.tags.length > 0 && (
								<>
									<dt>Tags</dt>
									<dd>
										<div className="tag-list">
											{question.tags.map((tag) => (
												<span key={tag} className="tag">
													{tag}
												</span>
											))}
										</div>
									</dd>
								</>
							)}

							<dt>Question ID</dt>
							<dd className="question-id">{question.id}</dd>
						</dl>
					</section>
				</div>
			</div>
		</div>
	);
};
