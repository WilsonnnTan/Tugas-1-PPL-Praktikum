# Feedback REST API Documentation

Complete API reference for the Feedback REST API. All endpoints require bearer token authentication (except auth endpoints).

## Authentication

All protected endpoints require the following header:
```
Authorization: Bearer <token>
```

### Auth Endpoints (BetterAuth)

#### Sign Up
**POST** `/api/auth/sign-up/email`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "bearer-token-string"
}
```

#### Sign In
**POST** `/api/auth/sign-in/email`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "bearer-token-string"
}
```

---

## Feedback Endpoints

### Get All Feedback
**GET** `/api/feedback`

Retrieve all feedback from all users (public data).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "feedback-123",
      "title": "Great service",
      "category": "general",
      "user": {
        "name": "John Doe"
      }
    },
    {
      "id": "feedback-456",
      "title": "Bug report",
      "category": "bug",
      "user": {
        "name": "Jane Smith"
      }
    }
  ]
}
```

**Error (401):**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

---

### Get My Feedback
**GET** `/api/feedback/me`

Retrieve all feedback submitted by the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "feedback-123",
      "title": "Great service",
      "category": "general",
      "user": {
        "name": "John Doe"
      }
    }
  ]
}
```

**Error (401):**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

---

### Get Feedback Detail
**GET** `/api/feedback/[id]`

Retrieve a specific feedback entry by ID.

**Path Parameters:**
- `id` (required): The feedback ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200) - Success:**
```json
{
  "status": "success",
  "data": {
    "feedbacks": {
      "title": "Great service",
      "category": "general",
      "content": "The service exceeded my expectations",
      "user": {
        "name": "John Doe"
      }
    }
  }
}
```

**Response (404) - Not Found:**
```json
{
  "status": "fail",
  "data": {
    "feedbacks": null
  }
}
```

**Error (401) - Unauthorized:**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

**Error (500) - Server Error:**
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

### Create Feedback
**POST** `/api/feedback`

Create a new feedback entry.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Great service",
  "category": "general",
  "content": "The service exceeded my expectations"
}
```

**Response (200) - Success:**
```json
{
  "status": "success",
  "data": {
    "feedback": {
      "title": "Great service",
      "category": "general",
      "content": "The service exceeded my expectations"
    }
  }
}
```

**Response (400) - Validation Error:**
```json
{
  "status": "fail",
  "data": {
    "title": ["Title is required"],
    "category": ["Invalid category"],
    "content": ["Content must be at least 10 characters"]
  }
}
```

**Error (401) - Unauthorized:**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

**Error (500) - Server Error:**
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

### Update Feedback
**PATCH** `/api/feedback/[id]`

Update an existing feedback entry. Only the owner can update their feedback.

**Path Parameters:**
- `id` (required): The feedback ID

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "category": "bug",
  "content": "Updated content"
}
```

**Response (200) - Success:**
```json
{
  "status": "success",
  "data": {
    "feedback": {
      "title": "Updated title",
      "category": "bug",
      "content": "Updated content"
    }
  }
}
```

**Response (400) - Validation Error:**
```json
{
  "status": "fail",
  "data": {
    "category": ["Invalid category"]
  }
}
```

**Response (404) - Not Found:**
```json
{
  "status": "fail",
  "data": {
    "id": "Feedback not found"
  }
}
```

**Error (401) - Unauthorized:**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

**Error (500) - Server Error:**
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

### Delete Feedback
**DELETE** `/api/feedback/[id]`

Delete a feedback entry. Only the owner can delete their feedback.

**Path Parameters:**
- `id` (required): The feedback ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200) - Success:**
```json
{
  "status": "success",
  "message": "Feedback deleted successfully"
}
```

**Response (404) - Not Found:**
```json
{
  "status": "fail",
  "data": {
    "id": "Feedback not found"
  }
}
```

**Error (401) - Unauthorized:**
```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

**Error (500) - Server Error:**
```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

## Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation error or malformed request |
| 401 | Unauthorized | Missing or invalid bearer token |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

## Response Format

All API responses follow the [jsend](https://github.com/omniti-labs/jsend.git) format.
