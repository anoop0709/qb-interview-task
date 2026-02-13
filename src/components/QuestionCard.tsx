import { Question } from '../types/question';
import './QuestionCard.css';

interface QuestionCardProps {
    question: Question;
    onClick?: () => void;
}

export const QuestionCard = ({ question, onClick }: QuestionCardProps) => {
    const formatSeries = (series?: { year: number; month: number }) => {
        if (!series) {
            return null;
        }
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        return `${months[series.month - 1]} ${series.year}`;
    };
    const isQuestionExpired = (): boolean => {
        if (!question?.validTo) {
            return false; // If there's no validTo date, consider it not expired
        }
        const currentDate = new Date();
        const questionValidTo = new Date(question?.validTo);
        if (
            currentDate.setHours(0, 0, 0, 0) >=
            questionValidTo.setHours(0, 0, 0, 0)
        ) {
            return true;
        }

        return false;
    };
    // Add subtle visual cue for expired questions
    const expired = isQuestionExpired();
    return (
        <div
            className={`question-card ${expired && 'expired'}`}
            onClick={onClick}
        >
            <div className="question-header">
                <span className="question-number">
                    {question.questionNumber || 'Q'}
                </span>
                <div className="question-meta">
                    {question.subject && (
                        <span className="badge badge-subject">
                            {question.subject}
                        </span>
                    )}
                    {question.level && (
                        <span className="badge badge-level">
                            {question.level}
                        </span>
                    )}
                    {question.tier && (
                        <span className="badge badge-tier">
                            {question.tier}
                        </span>
                    )}
                    <span className="badge badge-lang">
                        {question.language === 'cy' ? '🏴 Welsh' : '🇬🇧 English'}
                    </span>
                    {expired && (
                        <span className="badge badge-validTo">{'Expired'}</span>
                    )}
                </div>
            </div>

            <div
                className="question-content"
                dangerouslySetInnerHTML={{ __html: question.questionHtml }}
            />

            <div className="question-footer">
                <div className="question-info">
                    {question.marks && (
                        <span className="marks">{question.marks} marks</span>
                    )}
                    {question.paperCode && (
                        <span className="paper-code">{question.paperCode}</span>
                    )}
                    {question.series && (
                        <span className="series">
                            {formatSeries(question.series)}
                        </span>
                    )}
                </div>
                {question.tags && question.tags.length > 0 && (
                    <div className="question-tags">
                        {question.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="tag"
                            >
                                {tag}
                            </span>
                        ))}
                        {question.tags.length > 4 && (
                            <span className="tag tag-more">
                                +{question.tags.length - 4}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
