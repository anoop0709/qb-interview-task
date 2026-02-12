# Backend API Reference

This file documents the REST API endpoints. You do **not** need to run the backend — the app uses mock data. This is provided so you can see what the API accepts.

---

## Endpoints

### `GET /questions`

Search questions with filters and pagination.

**Query parameters:**

| Parameter   | Type   | Description                    |
|-------------|--------|--------------------------------|
| `q`         | string | Free-text keyword search       |
| `subject`   | string | Filter by subject              |
| `level`     | string | Filter by level (GCSE, A Level)|
| `language`  | string | Filter by language (en, cy)    |
| `tier`      | string | Filter by tier                 |
| `tags`      | string | Filter by tag                  |
| `series`    | string | Filter by series               |
| `paperCode` | string | Filter by paper code           |
| `limit`     | number | Results per page (default 20)  |
| `offset`    | number | Pagination offset (default 0)  |

**Response:**
```json
{
  "data": [ ...questions ],
  "meta": { "total": 79, "limit": 20, "offset": 0 },
  "aggregations": { "subject": [...], "level": [...], ... }
}
```

---

### `GET /questions/:id`

Get a single question by ID.

**Response:**
```json
{ "data": { ...question } }
```

---

### `POST /questions`

Create a new question. Body should be a JSON object matching the Question type.

**Response:**
```json
{ "id": "abc-123", "message": "Question created" }
```

---

### `DELETE /questions/:id`

Soft-delete a question by ID.

**Response:**
```json
{ "message": "Question deleted" }
```
