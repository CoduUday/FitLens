# FitLens Risk Management & Mitigation Matrix

## 1. Biomechanical & AI Pose Accuracy Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Landmark Occlusion & Jitter**<br>(Limbs obscured or erratic jumps in estimated keypoints) | High | Medium | Implement an exponential moving average (EMA) filter on 3D landmarks ($\alpha = 0.65$) to smooth transient noise; enforce visibility threshold checks ($v > 0.5$) before computing angles. If keypoints are occluded, pause metric updates and display "Partial Occlusion" status. |
| **Camera Angle & Perspective Distortion**<br>(Athlete positioned obliquely to camera) | Medium | Medium | Include an on-screen posture framing calibration box before starting rep counting. Normalize horizontal coordinate offsets relative to inter-hip distance to make Q-angle/valgus ratios scale-invariant. |
| **False-Positive Rep Counting**<br>(Fidgeting, adjusting clothes, or partial twitches counted as reps) | Medium | Low | Use a 4-state Finite State Machine (`IDLE` $\rightarrow$ `DESCENDING` $\rightarrow$ `BOTTOM` $\rightarrow$ `ASCENDING` $\rightarrow$ `COMPLETED`) with hysteresis: a rep is only incremented if knee angle crosses below $110^\circ$ and then fully returns above $160^\circ$ with minimum duration $> 1.0\text{s}$. |

---

## 2. Hardware & Browser Environment Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Webcam Permission Denied / No Camera Attached** | Medium | High | Display non-blocking, user-friendly permission guidance; provide a one-click **"Demo Mode"** toggle equipped with bundled sports video clips that feeds synthetic frames into the pose pipeline seamlessly. |
| **Low-End Client CPU/GPU Frame Drops** | Medium | Medium | Decouple MediaPipe inference rate from UI rendering: run inference asynchronously using `requestVideoFrameCallback` or throttled `requestAnimationFrame` targeting 30 FPS, keeping UI responsive at 60 FPS. |
| **WASM / MediaPipe Asset CDN Failure** | Low | High | Serve WASM binaries and model files from public client assets or cached CDN with fallback handling. |

---

## 3. Ethical & Legal Compliance Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **User Mistaking Feedback for Medical Diagnosis** | Medium | Critical | - Display a mandatory, prominent disclaimer on the Landing Page, Dashboard, and Live Analysis workspace: *"FitLens is a sports training support tool, not a medical diagnostic device."*<br>- Terminology constraint: Use terms such as **"Movement Quality"**, **"Biomechanical Indicator"**, and **"Educational Focus"**; never use terms like "Injury Diagnosis", "Clinically Safe", or "Medically Certified".<br>- Display recommendation for professional physical therapist assessment when elevated patterns persist. |
| **Video Privacy & Biometric Data Regulations** | Low | High | - Process 100% of video frames in local browser memory via WASM/Canvas.<br>- Do not stream or store raw video frames on the backend or database.<br>- Explicit camera activation prompt with privacy guarantee pill. |

---

## 4. Backend & Database Resilience Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **MongoDB Atlas Offline / No Internet Connection** | Low | Medium | Backend supports configurable local MongoDB connection URI with graceful error messaging and reconnection retry logic. |
| **Unauthenticated / Unauthorized Data Access** | Medium | High | - Strictly enforce JWT Bearer validation on all protected endpoints.<br>- Enforce RBAC in coach routes: verify athlete-coach assignment in MongoDB before returning athlete sessions (prevents unauthorized access). |
| **Brute Force / Credential Stuffing** | Medium | Medium | Express rate-limiting middleware on `/api/auth/login` and `/api/auth/register` (max 10 requests per 15 minutes per IP). |

