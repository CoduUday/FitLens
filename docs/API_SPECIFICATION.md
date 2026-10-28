# FitLens REST API Specification

## 1. Base URL & Convention

- Base URL: `http://localhost:5000/api`
- Content-Type: `application/json`
- Authentication Scheme: `Bearer <JWT_TOKEN>` in `Authorization` header

All responses follow the standard JSON envelope structure:

```json
{
  "success": true,
  "message": "Human-readable status summary",
  "data": { ... },
  "error": null
}
```

Error response:
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [ ... ]
  }
}
```

---

## 2. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Register a new athlete or coach account.

**Request Body:**
```json
{
  "fullName": "Alex Rivera",
  "email": "alex@example.com",
  "password": "Password123!",
  "role": "athlete" // "athlete" | "coach"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": "6648...",
      "fullName": "Alex Rivera",
      "email": "alex@example.com",
      "role": "athlete"
    }
  }
}
```

### `POST /api/auth/login`
Authenticate user and retrieve token.

### `GET /api/auth/me`
Retrieve currently authenticated user profile. (Requires Bearer Token)

---

## 3. Athlete Profile Endpoints (`/api/profile`)

- `GET /api/profile` - Get full athlete profile (biometrics, sport type, injury history)
- `PUT /api/profile` - Update athlete profile

---

## 4. Session Telemetry Endpoints (`/api/sessions`)

### `POST /api/sessions`
Save an analyzed movement session.

**Request Body:**
```json
{
  "exerciseType": "squat",
  "durationSeconds": 145,
  "metrics": {
    "totalReps": 15,
    "validReps": 13,
    "averageKneeAngle": 88.5,
    "averageTrunkAngle": 28.2,
    "symmetryScore": 92.4,
    "averageTempoSeconds": 2.4
  },
  "riskAssessment": {
    "overallConcernLevel": "moderate", // "low" | "moderate" | "elevated"
    "indicators": [
      {
        "type": "knee_valgus",
        "severity": "moderate",
        "repOccurrences": [4, 7, 12],
        "explanation": "Medial knee collapse observed during ascending phase",
        "suggestedCorrection": "Strengthen gluteus medius and cue knees out over toes."
      }
    ]
  },
  "repTelemetry": [
    {
      "repNumber": 1,
      "minKneeAngle": 86.4,
      "maxTrunkAngle": 25.1,
      "valgusDeviation": 0.02,
      "duration": 2.3,
      "formQuality": "good"
    }
  ],
  "notes": "Leg day set 1"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Training session saved successfully",
  "data": {
    "sessionId": "6649...",
    "createdAt": "2026-10-28T17:49:00Z"
  }
}
```

### `GET /api/sessions`
Retrieve paginated list of user's past training sessions.

### `GET /api/sessions/:id`
Retrieve detailed telemetry and risk breakdown for a single session.

### `GET /api/sessions/trends`
Retrieve aggregated progress metrics (weekly volume, average symmetry, risk frequency).

---

## 5. Coach Management Endpoints (`/api/coach`)

- `GET /api/coach/athletes` - List athletes assigned to the coach
- `POST /api/coach/assign` - Assign an athlete by email or athlete code
- `GET /api/coach/athletes/:athleteId/sessions` - Retrieve athlete sessions (guarded by coach assignment validation)
- `GET /api/coach/athletes/:athleteId/reports/:sessionId` - Detailed report review with coach notes

