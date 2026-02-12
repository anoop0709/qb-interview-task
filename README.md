# Developer Interview Task

**Stack:** React, TypeScript, CSS

---

## Getting Started

```bash
npm install
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000). It uses mock data so there is no backend to run.

**Tests are provided** — run `npm test` to check your progress. All tests should pass when you have completed the tasks (and correctly fail until you do).

Take a few minutes to explore the running app and browse the code in `src/` before starting.

---

## Task 1 — Bug Fix

The app currently **crashes on load**. There is a bug in `src/App.tsx` that references a variable that doesn't exist.

- Find and fix the bug so the app renders correctly.
- Briefly explain (as a code comment next to your fix) what the issue was.

---

## Task 2 — Add Free-Text Search

The `SearchForm` component currently only has dropdown filters (subject, level, tier). Users have requested the ability to **search by keyword** (e.g. searching for "photosynthesis" or "algebra").

The backend already supports a query parameter called `q` for free-text search (see `src/api/BACKEND_API.md` for the API spec). The mock data function in `src/data/mockData.ts` already handles `q` filtering too.

**Requirements:**

1. Add a **text input** to `SearchForm` that captures a keyword search term.
2. Include the value as the `q` parameter when the form is submitted.
3. The text input should be **cleared when the "Reset Filters" button is pressed**.
4. Add a `q` field to the `SearchParams` type in `src/types/question.ts`.

---

## Task 3 — Expired Question Indicator

Each question has an optional `validTo` date field. When a question has expired (i.e. `validTo` is in the past), it should be visually distinct.

Some of the mock questions have `validTo` dates that are already in the past — you should see your changes take effect.

**Requirements:**

1. In `QuestionCard`, if the question's `validTo` date is in the past, display an **"Expired" badge** in the header alongside the existing badges (subject, level, etc.).
2. Style the badge so it stands out — use a red/muted-red background (add CSS to `QuestionCard.css`).
3. When a question is expired, add a subtle visual cue to the whole card (e.g. reduced opacity, a left border, or a background tint — your choice).

---

## Task 4 — API Client Function

The API client in `src/api/questions.ts` has functions for searching, getting, and creating questions, but is **missing a delete function**.

Look at `src/api/BACKEND_API.md` to see the expected endpoint.

**Requirements:**

1. Add a `deleteQuestion` function that sends a `DELETE` request to `{baseUrl}/questions/{questionId}`.
2. The function should accept `brand` and `questionId` as parameters.
3. Follow the same patterns and error handling used by the existing functions in that file.
4. Return an appropriate type for the response (e.g. `{ message: string }`).

---

## What We're Looking For

- Can you read and understand an unfamiliar codebase quickly?
- Clean, consistent code that matches the existing style.
- Correct use of TypeScript types.
- Sensible React patterns (state, props, events).
- Practical CSS skills.
- Don't over-engineer — keep it simple and working.

**Good luck!**
