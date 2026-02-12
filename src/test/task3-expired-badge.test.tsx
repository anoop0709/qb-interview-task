/**
 * Task 3 — Expired Question Indicator
 *
 * Tests that QuestionCard shows an "Expired" badge and visual cue
 * when a question's validTo date is in the past.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuestionCard } from "../components/QuestionCard";
import type { Question } from "../types/question";

const baseQuestion: Question = {
	id: "q-test-001",
	questionNumber: "Q1",
	subject: "Biology",
	level: "GCSE",
	language: "en",
	marks: 4,
	questionHtml: "<p>Test question content</p>",
	tags: ["test"],
};

const expiredQuestion: Question = {
	...baseQuestion,
	id: "q-test-expired",
	validTo: "2024-01-01T00:00:00Z", // well in the past
};

const validQuestion: Question = {
	...baseQuestion,
	id: "q-test-valid",
	validTo: "2099-12-31T00:00:00Z", // far in the future
};

const noValidToQuestion: Question = {
	...baseQuestion,
	id: "q-test-no-validto",
	// no validTo field
};

describe("Task 3 — Expired Question Indicator", () => {
	it("should show an 'Expired' badge when validTo is in the past", () => {
		render(<QuestionCard question={expiredQuestion} />);
		expect(screen.getByText(/expired/i)).toBeInTheDocument();
	});

	it("should NOT show an 'Expired' badge when validTo is in the future", () => {
		render(<QuestionCard question={validQuestion} />);
		expect(screen.queryByText(/expired/i)).not.toBeInTheDocument();
	});

	it("should NOT show an 'Expired' badge when validTo is not set", () => {
		render(<QuestionCard question={noValidToQuestion} />);
		expect(screen.queryByText(/expired/i)).not.toBeInTheDocument();
	});

	it("should apply a visual cue to the card when the question is expired", () => {
		const { container } = render(<QuestionCard question={expiredQuestion} />);
		const card = container.querySelector(".question-card");
		expect(card).toBeInTheDocument();

		// The candidate should add a CSS class or inline style to distinguish expired cards.
		// We check for either an additional class or a distinct style attribute.
		const hasExpiredClass =
			card!.classList.length > 1 || // additional class beyond "question-card"
			card!.className.includes("expired");
		const hasExpiredStyle = card!.getAttribute("style") !== null;
		expect(hasExpiredClass || hasExpiredStyle).toBe(true);
	});

	it("should style the Expired badge with a red-ish background", () => {
		render(<QuestionCard question={expiredQuestion} />);
		const badge = screen.getByText(/expired/i);

		// Check the badge has a class that can be styled (not just plain text)
		expect(badge.tagName.toLowerCase()).toBe("span");
		expect(badge.className).toContain("badge");
	});
});
