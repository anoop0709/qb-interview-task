/**
 * Task 2 — Free-Text Search
 *
 * Tests that a keyword text input has been added to SearchForm,
 * the `q` field exists on SearchParams, and the reset button clears it.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "../components/SearchForm";
import type { SearchParams } from "../types/question";

const emptyAggregations = {
	subject: [{ key: "Biology", count: 5 }],
	level: [{ key: "GCSE", count: 10 }],
	language: [],
	tier: [],
	tags: [],
};

describe("Task 2 — Free-Text Search", () => {
	it("SearchParams type should include a 'q' field", () => {
		// This test verifies q has been added to SearchParams.
		// If q is not in SearchParams, this will produce a TypeScript compile error.
		const params: SearchParams = { q: "test", limit: 20, offset: 0 };
		// Verify q is a first-class key, not just silently accepted
		const key: keyof SearchParams = "q";
		expect(params[key]).toBe("test");
	});

	it("should render a text input for keyword search", () => {
		const onSearch = vi.fn();
		render(<SearchForm onSearch={onSearch} aggregations={emptyAggregations} />);

		// Look for an input with type="text" (or no type, which defaults to text)
		const textInputs = screen.getAllByRole("textbox");
		expect(textInputs.length).toBeGreaterThanOrEqual(1);
	});

	it("should include q parameter when form is submitted with a keyword", async () => {
		const user = userEvent.setup();
		const onSearch = vi.fn();
		render(<SearchForm onSearch={onSearch} aggregations={emptyAggregations} />);

		const textInput = screen.getByRole("textbox");
		await user.type(textInput, "photosynthesis");

		const submitButton = screen.getByRole("button", { name: /apply filters/i });
		await user.click(submitButton);

		expect(onSearch).toHaveBeenCalled();
		const lastCall = onSearch.mock.calls[onSearch.mock.calls.length - 1][0];
		expect(lastCall).toHaveProperty("q", "photosynthesis");
	});

	it("should clear the text input when Reset Filters is clicked", async () => {
		const user = userEvent.setup();
		const onSearch = vi.fn();
		render(<SearchForm onSearch={onSearch} aggregations={emptyAggregations} />);

		const textInput = screen.getByRole("textbox") as HTMLInputElement;
		await user.type(textInput, "algebra");
		expect(textInput.value).toBe("algebra");

		const resetButton = screen.getByRole("button", { name: /reset filters/i });
		await user.click(resetButton);

		expect(textInput.value).toBe("");
	});
});
