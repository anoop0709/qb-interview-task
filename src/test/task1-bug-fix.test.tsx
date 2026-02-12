/**
 * Task 1 — Bug Fix
 *
 * The App component has a bug that causes a runtime error.
 * These tests verify the fix has been applied correctly.
 */
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("Task 1 — Bug Fix", () => {
	it("should render without crashing", () => {
		expect(() => render(<App />)).not.toThrow();
	});

	it("should display the app header", () => {
		render(<App />);
		expect(screen.getByText("Question Bank")).toBeInTheDocument();
	});

	it("should render the footer", async () => {
		render(<App />);
		await waitFor(() => {
			const footer = document.querySelector(".app-footer");
			expect(footer).toBeInTheDocument();
		});
	});
});
