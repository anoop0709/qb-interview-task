import { Question, Aggregations } from "../types/question";

const sampleQuestions: Question[] = [
	{
		id: "q-001",
		questionNumber: "Q1(a)",
		subject: "Biology",
		level: "GCSE",
		tier: "Higher",
		language: "en",
		marks: 4,
		paperCode: "C120U20-1",
		series: { year: 2024, month: 6 },
		validTo: "2025-08-31T00:00:00Z",
		questionHtml: `<p>Describe the process of photosynthesis in plants.</p>
      <p>Include in your answer:</p>
      <ul>
        <li>the reactants required</li>
        <li>the products formed</li>
        <li>where the process takes place</li>
      </ul>`,
		markingScheme: `<p><strong>Indicative content:</strong></p>
      <ul>
        <li>Carbon dioxide + water → glucose + oxygen (1 mark)</li>
        <li>Light energy required (1 mark)</li>
        <li>Chlorophyll absorbs light (1 mark)</li>
        <li>Takes place in chloroplasts (1 mark)</li>
      </ul>`,
		tags: ["photosynthesis", "plants", "energy", "chlorophyll"],
		createdAt: "2024-01-15T10:30:00Z",
	},
	{
		id: "q-002",
		questionNumber: "Q2",
		subject: "Mathematics",
		level: "A Level",
		tier: "Higher",
		language: "en",
		marks: 6,
		paperCode: "A420U10-1",
		series: { year: 2024, month: 6 },
		questionHtml: `<p>Solve the quadratic equation:</p>
      <p style="text-align: center; font-size: 1.2em;"><em>2x² - 5x - 3 = 0</em></p>
      <p>Show all working and give your answers in exact form.</p>`,
		markingScheme: `<p>Using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a</p>
      <p>x = (5 ± √(25 + 24)) / 4 = (5 ± 7) / 4</p>
      <p>x = 3 or x = -1/2</p>`,
		tags: ["quadratic", "algebra", "equations"],
		createdAt: "2024-01-16T14:20:00Z",
	},
	{
		id: "q-003",
		questionNumber: "C1",
		subject: "Biology",
		level: "GCSE",
		tier: "Foundation",
		language: "cy",
		marks: 3,
		paperCode: "C120U20-1W",
		series: { year: 2024, month: 6 },
		validTo: "2024-12-31T00:00:00Z",
		questionHtml: `<p>Disgrifiwch sut mae celloedd coch y gwaed wedi'u haddasu ar gyfer eu swyddogaeth.</p>
      <p>[3 marc]</p>`,
		markingScheme: `<p>Dim cnewyllyn - mwy o le ar gyfer haemoglobin (1)</p>
      <p>Siâp disgyn ddwyfwng - arwynebedd arwyneb mawr (1)</p>
      <p>Yn cynnwys haemoglobin - i gario ocsigen (1)</p>`,
		tags: ["celloedd", "gwaed", "addasiadau"],
		createdAt: "2024-01-17T09:15:00Z",
	},
	{
		id: "q-004",
		questionNumber: "Q3(b)",
		subject: "Chemistry",
		level: "AS",
		language: "en",
		marks: 5,
		paperCode: "B440U10-1",
		series: { year: 2023, month: 11 },
		questionHtml: `<p>Explain the trend in electronegativity across Period 3 of the Periodic Table.</p>
      <p>In your answer, refer to atomic structure and nuclear charge.</p>`,
		examinersComments: `<p>Most candidates were able to identify that electronegativity increases across the period.
      Fewer candidates linked this correctly to increasing nuclear charge and similar shielding effect.</p>`,
		tags: ["electronegativity", "periodic table", "atomic structure", "Period 3"],
		createdAt: "2023-11-20T11:00:00Z",
	},
	{
		id: "q-005",
		questionNumber: "Q5",
		subject: "Physics",
		level: "A Level",
		tier: "Higher",
		language: "en",
		marks: 8,
		paperCode: "B460U20-1",
		series: { year: 2024, month: 1 },
		validTo: "2027-06-30T00:00:00Z",
		questionHtml: `<p>A satellite orbits Earth at an altitude of 400 km above the surface.</p>
      <p>Given that:</p>
      <ul>
        <li>Mass of Earth = 5.97 × 10²⁴ kg</li>
        <li>Radius of Earth = 6.37 × 10⁶ m</li>
        <li>G = 6.67 × 10⁻¹¹ N m² kg⁻²</li>
      </ul>
      <p>Calculate:</p>
      <p>(a) the orbital speed of the satellite [4 marks]</p>
      <p>(b) the orbital period [4 marks]</p>`,
		markingScheme: `<p>(a) r = 6.37 × 10⁶ + 4 × 10⁵ = 6.77 × 10⁶ m (1)</p>
      <p>v = √(GM/r) (1)</p>
      <p>v = √(6.67 × 10⁻¹¹ × 5.97 × 10²⁴ / 6.77 × 10⁶) (1)</p>
      <p>v = 7.67 × 10³ m/s (1)</p>`,
		tags: ["satellites", "orbits", "gravity", "circular motion"],
		createdAt: "2024-01-10T16:45:00Z",
	},
	{
		id: "q-006",
		questionNumber: "Q1",
		subject: "English",
		level: "GCSE",
		language: "en",
		marks: 10,
		paperCode: "C700U10-1",
		series: { year: 2024, month: 6 },
		questionHtml: `<p>Read the extract below from a newspaper article about climate change.</p>
      <blockquote>
        <p>"The devastating floods that swept through our valley last month were not
        an anomaly but a warning. Scientists predict such events will become the norm,
        not the exception, within our lifetimes..."</p>
      </blockquote>
      <p>Analyse how the writer uses language to persuade the reader that climate change
      is a serious threat. You should refer to specific techniques and their effects.</p>`,
		tags: ["language analysis", "persuasive writing", "climate change"],
		createdAt: "2024-02-01T10:00:00Z",
	},
];

const sampleAggregations: Aggregations = {
	subject: [
		{ key: "Biology", count: 24 },
		{ key: "Mathematics", count: 18 },
		{ key: "Chemistry", count: 15 },
		{ key: "Physics", count: 12 },
		{ key: "English", count: 10 },
	],
	level: [
		{ key: "GCSE", count: 45 },
		{ key: "A Level", count: 20 },
		{ key: "AS", count: 14 },
	],
	language: [
		{ key: "en", count: 70 },
		{ key: "cy", count: 9 },
	],
	tier: [
		{ key: "Higher", count: 50 },
		{ key: "Foundation", count: 29 },
	],
	tags: [
		{ key: "equations", count: 12 },
		{ key: "photosynthesis", count: 8 },
		{ key: "periodic table", count: 7 },
		{ key: "algebra", count: 6 },
		{ key: "energy", count: 5 },
	],
};

/**
 * Mock search function that simulates API behavior
 */
export const mockSearch = (params: {
	q?: string;
	subject?: string;
	level?: string;
	language?: string;
	tier?: string;
	limit?: number;
	offset?: number;
}): Promise<import("../types/question").SearchResponse> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let filtered = [...sampleQuestions];

			if (params.q) {
				const term = params.q.toLowerCase();
				filtered = filtered.filter(
					(q) =>
						q.questionHtml.toLowerCase().includes(term) ||
						q.subject?.toLowerCase().includes(term) ||
						q.tags?.some((t) => t.toLowerCase().includes(term)),
				);
			}

			if (params.subject) {
				filtered = filtered.filter((q) => q.subject === params.subject);
			}

			if (params.level) {
				filtered = filtered.filter((q) => q.level === params.level);
			}

			if (params.language) {
				filtered = filtered.filter((q) => q.language === params.language);
			}

			if (params.tier) {
				filtered = filtered.filter((q) => q.tier === params.tier);
			}

			const offset = params.offset || 0;
			const limit = params.limit || 20;
			const paginated = filtered.slice(offset, offset + limit);

			resolve({
				data: paginated,
				meta: {
					total: filtered.length,
					limit,
					offset,
				},
				aggregations: sampleAggregations,
			});
		}, 300);
	});
};
