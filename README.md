# FitLens — AI-Based Real-Time Sports Performance & Injury-Risk Assessment

FitLens is a web application designed for athletes and coaches to assess exercise mechanics in real time, extract movement metrics, detect unsafe patterns (e.g., knee valgus, excessive forward lean), and visualize progress over time.

> **Sports-Training Support Tool**: FitLens is engineered for athletic performance education and biomechanical feedback. It is **not** a medical diagnostic device.

---

## ⚡ Key Highlights
- **100% In-Browser Pose Estimation**: MediaPipe Pose Landmarker processes video frames locally on the client machine using WebAssembly/WebGL. Zero raw video streams are transmitted to any server, guaranteeing athlete privacy.
- **Biomechanical Math Engine**: Pure JavaScript vector calculations for 3-point joint angles, planar alignments, dynamic symmetry, and velocity curves.
- **Explainable Injury-Risk Indicators**: Clear, non-black-box coaching heuristics that explain *why* an alert was flagged and recommend evidence-based corrective exercises.
- **Coach & Athlete Dashboards**: Tailored role-based portals for athletes tracking their daily training volume and coaches overseeing assigned team rosters.
- **Zero-Barrier Demo Mode**: Pre-loaded workout sequences for testing and hackathon judging without requiring a live webcam.

---

## 🛠 Technology Stack
- **Frontend**: React (Vite), JavaScript ES2023, Tailwind CSS, Lucide Icons, Recharts, React Router v6, Axios
- **Computer Vision**: Google MediaPipe Pose Landmarker (`@mediapipe/tasks-vision`)
- **Backend**: Node.js, Express.js (ES Modules), JWT, bcryptjs, express-validator
- **Database**: MongoDB & Mongoose ODM (MongoDB Atlas & local support)
- **Architecture**: Modular Client-Server Architecture

---

## 📚 Technical Documentation
- [System Architecture Specification](file:///c:/Users/udayl/OneDrive/Desktop/College/FitLens/docs/ARCHITECTURE.md)
- [Biomechanical Rules & Heuristics](file:///c:/Users/udayl/OneDrive/Desktop/College/FitLens/docs/BIOMECHANICS_RULES.md)
- [REST API Specification](file:///c:/Users/udayl/OneDrive/Desktop/College/FitLens/docs/API_SPECIFICATION.md)
- [Development Phase Roadmap](file:///c:/Users/udayl/OneDrive/Desktop/College/FitLens/docs/PHASE_ROADMAP.md)

---

## 🚀 Development Phases
- [x] **Phase 1: Architecture, Planning & System Design**
- [ ] **Phase 2: Client & Server Scaffolding**
- [ ] **Phase 3: Design System, Landing Page, Auth UI & Mock Dashboard**
- [ ] **Phase 4: Database Models & Authentication APIs**
- [ ] **Phase 5: Browser-Based Pose Estimation Pipeline**
- [ ] **Phase 6: Exercise Detection, Joint Angles & Rep Counter**
- [ ] **Phase 7: Heuristic Injury-Risk Indicators & Safety Messaging**
- [ ] **Phase 8: Session Persistence, Reports & Historical Trends**
- [ ] **Phase 9: Coach Dashboard & Role-Based Access Control**
- [ ] **Phase 10: Testing, Security Hardening & Polish**
- [ ] **Phase 11: Deployment Configuration & Final Verification**

