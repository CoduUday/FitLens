# FitLens Development Phase Roadmap

This document outlines the strict phased implementation roadmap for FitLens, matching the instructions.

---

## Phase 1: Architecture, Planning, and System Design (CURRENT)
- [x] Workspace inspection.
- [x] High-level architectural blueprint (`docs/ARCHITECTURE.md`).
- [x] Biomechanics and heuristic mathematical formulations (`docs/BIOMECHANICS_RULES.md`).
- [x] REST API contracts and envelope structures (`docs/API_SPECIFICATION.md`).
- [x] Monorepo folder layout and dependency mapping.
- [x] Risk mitigation and hardware contingency plans (Demo Mode).
- **Verification**: Complete documentation, clear data flow, zero ambiguity, ready for user sign-off.

---

## Phase 2: Client & Server Scaffolding (COMPLETED)
- [x] Initialize React frontend with Vite, Tailwind CSS, Lucide Icons, and React Router.
- [x] Initialize Node.js + Express backend with ESM (`"type": "module"`), CORS, Helmet, and base health check endpoint `/api/health`.
- [x] Create root `package.json` with scripts to run client and server concurrently.
- [x] Verification: Built client bundle with zero errors; `/api/health` tested and returns 200 OK.

---

## Phase 3: Design System, Landing Page, Auth UI, & Mock Dashboard (COMPLETED)
- [x] Implement dark-navy sports tech theme (`#0B0F19`) with electric cyan (`#00F0FF`) and lime accents.
- [x] Build Landing Page with feature highlights, non-diagnostic privacy banner, and interactive demo preview.
- [x] Build Auth UI (Login & Register) with role selector (Athlete / Coach) and 1-click demo autofill.
- [x] Build Athlete Dashboard with Recharts performance trends and clearly labeled mock telemetry.
- [x] Build Live Analysis Workspace with simulated 60 FPS rep counter and joint angle HUD.
- [x] Build Session History and Session Report Details pages with depth charts and corrective drill suggestions.
- [x] Build Athlete Profile and Coach Dashboard with assigned athlete rosters.
- [x] Verification: All routes compile and link functionally via React Router; mock badges present on all simulated features.

---

## Phase 4: Database Models & Authentication APIs
- Connect to MongoDB with Mongoose ODM (supporting local URI and Atlas with fallback in-memory or mock DB for zero-barrier testing).
- Implement schemas: `User`, `AthleteProfile`, `TrainingSession`, `CoachAthleteAssignment`.
- Implement JWT authentication routes (`/register`, `/login`, `/me`) and password hashing with bcryptjs.
- Wire frontend `AuthContext` to backend APIs; protect dashboard routes.
- **Verification**: Register new athlete, log in, verify JWT cookie/header, confirm MongoDB persistence, protect private routes.

---

## Phase 5: Browser-Based Pose Estimation Pipeline
- Integrate `@mediapipe/tasks-vision` PoseLandmarker.
- Create camera abstraction hook (`useCamera`) handling user permissions, camera switching, denial alerts, and demo mode.
- Render live video feed with canvas 33-landmark skeleton overlay at 30-60 FPS.
- Display landmarker detection confidence and joint visibility indicators.
- **Verification**: Real-time camera feed detects skeleton with smooth overlay; fallback demo mode works seamlessly if webcam is unavailable.

---

## Phase 6: Exercise Detection, Joint Angles, & Repetition State Machine
- Implement vector math utilities in pure JavaScript: 3-point angle calculation, 2D/3D planar projection.
- Build exercise state machines for:
  - **Squats**: depth inflection, rep duration, eccentric/concentric tempo.
  - **Lunges**: front/rear knee flexion, stability.
  - **Jumps**: take-off, flight time, landing stiffness.
- Build real-time HUD showing current angle, rep count, tempo timer, and depth gauge.
- **Verification**: Performing a squat visibly updates knee angle, triggers rep transition, increments rep count, and alerts on shallow depth.

---

## Phase 7: Heuristic Injury-Risk Indicators & Safety Messaging
- Implement rule-based detection for:
  - Dynamic Knee Valgus (inward knee collapse).
  - Excessive forward trunk lean (lumbar shear proxy).
  - Left-Right asymmetry (>10% discrepancy).
  - Stiff landing impact.
- Present explainable real-time warnings with severity levels (Low, Moderate, Elevated).
- Display responsible non-diagnostic coaching tips and educational corrective exercises.
- **Verification**: Simulating or performing a knee cave triggers a clear "Moderate Concern: Knee Cave" alert with biomechanical explanation and drill recommendation.

---

## Phase 8: Session Reports, History, & Progress Analytics
- Aggregate session metrics upon completion (reps, avg depth, tempo, risk counts).
- Transmit session data to `POST /api/sessions`.
- Build Session Report details page with Recharts angle graphs and CSV export / printable summary.
- Build Session History page with filtering by exercise type and date range.
- **Verification**: Completed workout persists to MongoDB; session details page graphs all reps; CSV download produces clean tabular data.

---

## Phase 9: Coach Dashboard & Role-Based Access Control
- Implement Coach Dashboard showing assigned athletes.
- Implement athlete assignment workflow (assign by code/email).
- Restrict session data access using RBAC middleware.
- Allow coaches to review session reports and attach coaching notes.
- **Verification**: Coach account sees only assigned athletes; unauthorized access to other athletes returns 403 Forbidden.

---

## Phase 10: Testing, Security Hardening, & Performance Optimization
- Add unit tests for angle calculation math, rep state machine transitions, and risk heuristics.
- Add integration tests for authentication and session endpoints using Supertest.
- Implement request rate limiting, input sanitization, and security headers.
- Optimize canvas rendering loop and asset loading.
- **Verification**: All test suites pass; responsive testing confirms mobile and desktop fidelity.

---

## Phase 11: Deployment Configuration & Final Documentation
- Create `.env.example` with documented environment variables.
- Document local setup, Docker/Node deployment, and MongoDB Atlas configuration in `README.md`.
- Provide a hackathon presentation summary and video demonstration guide.
- **Verification**: Clean clone and fresh setup works out of the box following the README.

