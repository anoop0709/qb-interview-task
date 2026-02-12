/**
 * Task 4 — API Client Delete Function
 *
 * Tests that a deleteQuestion function has been added to the API client
 * with the correct method, URL, and error handling.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// We dynamically import to check the export exists
describe("Task 4 — API Client Delete Function", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("should export a deleteQuestion function", async () => {
		const api = await import("../api/questions");
		expect(api).toHaveProperty("deleteQuestion");
		expect(typeof api.deleteQuestion).toBe("function");
	});

	it("should call fetch with DELETE method and correct URL", async () => {
		const mockResponse = { message: "Question deleted" };
		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		} as Response);

		const { deleteQuestion } = await import("../api/questions");
		await deleteQuestion("wjec", "abc-123");

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		const [url, options] = fetchSpy.mock.calls[0];

		// URL should end with /questions/abc-123
		expect(String(url)).toContain("/questions/abc-123");
		expect(options).toBeDefined();
		expect((options as RequestInit).method).toBe("DELETE");
	});

	it("should return the parsed JSON response", async () => {
		const mockResponse = { message: "Question deleted" };
		vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		} as Response);

		const { deleteQuestion } = await import("../api/questions");
		const result = await deleteQuestion("wjec", "abc-123");

		expect(result).toEqual(mockResponse);
		expect(result).toHaveProperty("message");
	});

	it("should throw an error when the response is not ok", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: false,
			statusText: "Not Found",
		} as Response);

		const { deleteQuestion } = await import("../api/questions");

		await expect(deleteQuestion("wjec", "abc-123")).rejects.toThrow();
	});

	it("should work with both brands", async () => {
		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ message: "deleted" }),
		} as Response);

		const { deleteQuestion } = await import("../api/questions");

		await deleteQuestion("wjec", "id-1");
		const wjecUrl = String(fetchSpy.mock.calls[0][0]);

		await deleteQuestion("eduqas", "id-2");
		const eduqasUrl = String(fetchSpy.mock.calls[1][0]);

		// The two URLs should differ (different brand base URLs) 
		// and each should contain the question ID
		expect(wjecUrl).toContain("id-1");
		expect(eduqasUrl).toContain("id-2");
		expect(wjecUrl).not.toEqual(eduqasUrl);
	});
});
