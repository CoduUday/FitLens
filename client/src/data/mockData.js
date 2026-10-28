/**
 * FitLens Realistic Mock Data Store
 * Clearly labeled for Phase 3 prototype demonstration.
 * All metrics, scores, and risks are simulated.
 */

export const MOCK_ATHLETE = {
  id: 'ath_001',
  fullName: 'Alex Rivera',
  email: 'alex.rivera@athletics.org',
  role: 'athlete',
  sportsFocus: 'Basketball & Strength Training',
  skillLevel: 'Intermediate',
  heightCm: 188,
  weightKg: 84,
  priorInjuries: [
    { bodyPart: 'Left Patellar Tendon', year: 2024, notes: 'Mild jumper knee under high volume' },
  ],
  baselineSymmetry: 94,
  joinedDate: 'Jan 2026',
  avatarInitials: 'AR',
};

export const MOCK_METRICS = {
  totalSessions: 28,
  totalReps: 412,
  formQualityScore: 89, // out of 100
  injuryRiskLevel: 'Moderate', // 'Low', 'Moderate', 'Elevated'
  averageSymmetry: 93.4, // percentage
  averageTempo: 2.3, // seconds
  changeFromLastMonth: '+6.2%',
};

export const MOCK_TRENDS = [
  { session: 'S-22', date: 'Oct 10', formScore: 82, symmetry: 90, kneeFlexion: 86, riskScore: 18 },
  { session: 'S-23', date: 'Oct 14', formScore: 85, symmetry: 91, kneeFlexion: 88, riskScore: 15 },
  { session: 'S-24', date: 'Oct 18', formScore: 83, symmetry: 89, kneeFlexion: 84, riskScore: 22 },
  { session: 'S-25', date: 'Oct 21', formScore: 88, symmetry: 94, kneeFlexion: 90, riskScore: 12 },
  { session: 'S-26', date: 'Oct 24', formScore: 87, symmetry: 92, kneeFlexion: 89, riskScore: 14 },
  { session: 'S-27', date: 'Oct 26', formScore: 91, symmetry: 95, kneeFlexion: 91, riskScore: 9 },
  { session: 'S-28', date: 'Oct 28', formScore: 89, symmetry: 94, kneeFlexion: 90, riskScore: 11 },
];

export const MOCK_RISK_DISTRIBUTION = [
  { name: 'Optimal Form', value: 68, color: '#10B981' },
  { name: 'Knee Valgus (Inward)', value: 18, color: '#F59E0B' },
  { name: 'Forward Lean', value: 10, color: '#06B6D4' },
  { name: 'Asymmetrical Load', value: 4, color: '#EF4444' },
];

export const MOCK_SESSIONS = [
  {
    id: 'ses_101',
    exerciseType: 'Squat',
    date: '2026-10-28',
    time: '09:30 AM',
    duration: '14m 20s',
    totalReps: 18,
    validReps: 16,
    avgDepth: '89°',
    symmetry: '94%',
    formScore: 89,
    concernLevel: 'Moderate',
    concernBadgeColor: 'bg-amber-950/70 text-amber-300 border-amber-800',
    primaryIssue: 'Mild bilateral knee valgus on fatigue (reps 14-16)',
  },
  {
    id: 'ses_102',
    exerciseType: 'Forward Lunge',
    date: '2026-10-26',
    time: '05:15 PM',
    duration: '11m 45s',
    totalReps: 24,
    validReps: 23,
    avgDepth: '92°',
    symmetry: '96%',
    formScore: 92,
    concernLevel: 'Low',
    concernBadgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-800',
    primaryIssue: 'Excellent pelvic stability and knee tracking',
  },
  {
    id: 'ses_103',
    exerciseType: 'Jump Landing',
    date: '2026-10-24',
    time: '11:00 AM',
    duration: '08m 10s',
    totalReps: 12,
    validReps: 10,
    avgDepth: '118°',
    symmetry: '88%',
    formScore: 81,
    concernLevel: 'Elevated',
    concernBadgeColor: 'bg-rose-950/70 text-rose-300 border-rose-800',
    primaryIssue: 'Stiff landing impact; asymmetrical left leg bias upon touchdown',
  },
  {
    id: 'ses_104',
    exerciseType: 'Squat',
    date: '2026-10-21',
    time: '07:45 AM',
    duration: '15m 30s',
    totalReps: 20,
    validReps: 19,
    avgDepth: '91°',
    symmetry: '95%',
    formScore: 91,
    concernLevel: 'Low',
    concernBadgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-800',
    primaryIssue: 'Clean cadence, consistent 2.4s tempo',
  },
  {
    id: 'ses_105',
    exerciseType: 'Forward Lunge',
    date: '2026-10-18',
    time: '04:20 PM',
    duration: '10m 00s',
    totalReps: 20,
    validReps: 17,
    avgDepth: '87°',
    symmetry: '89%',
    formScore: 84,
    concernLevel: 'Moderate',
    concernBadgeColor: 'bg-amber-950/70 text-amber-300 border-amber-800',
    primaryIssue: 'Torso forward lean > 25° during right leg extensions',
  },
];

export const MOCK_REPORT_DETAILS = {
  sessionId: 'ses_101',
  exerciseType: 'Squat',
  date: 'October 28, 2026 at 09:30 AM',
  durationSeconds: 860,
  durationFormatted: '14 minutes 20 seconds',
  athlete: 'Alex Rivera',
  coachAssigned: 'Coach Marcus Vance',
  summary: {
    totalReps: 18,
    validReps: 16,
    avgKneeFlexion: 89.2,
    avgTrunkLean: 27.4,
    bilateralSymmetry: 94.1,
    averageTempo: 2.3, // seconds
    formQualityScore: 89,
    overallRisk: 'Moderate Concern',
  },
  repAnalysis: [
    { rep: 1, depth: 91, trunkLean: 25, symmetry: 97, valgus: 'Normal', status: 'Optimal' },
    { rep: 2, depth: 90, trunkLean: 24, symmetry: 98, valgus: 'Normal', status: 'Optimal' },
    { rep: 3, depth: 89, trunkLean: 26, symmetry: 96, valgus: 'Normal', status: 'Optimal' },
    { rep: 4, depth: 88, trunkLean: 25, symmetry: 95, valgus: 'Normal', status: 'Optimal' },
    { rep: 5, depth: 90, trunkLean: 26, symmetry: 96, valgus: 'Normal', status: 'Optimal' },
    { rep: 6, depth: 87, trunkLean: 27, symmetry: 94, valgus: 'Normal', status: 'Optimal' },
    { rep: 7, depth: 89, trunkLean: 28, symmetry: 95, valgus: 'Normal', status: 'Optimal' },
    { rep: 8, depth: 90, trunkLean: 26, symmetry: 94, valgus: 'Normal', status: 'Optimal' },
    { rep: 9, depth: 88, trunkLean: 27, symmetry: 93, valgus: 'Normal', status: 'Optimal' },
    { rep: 10, depth: 92, trunkLean: 28, symmetry: 95, valgus: 'Normal', status: 'Optimal' },
    { rep: 11, depth: 91, trunkLean: 29, symmetry: 94, valgus: 'Normal', status: 'Optimal' },
    { rep: 12, depth: 89, trunkLean: 30, symmetry: 92, valgus: 'Normal', status: 'Optimal' },
    { rep: 13, depth: 88, trunkLean: 31, symmetry: 91, valgus: 'Normal', status: 'Optimal' },
    { rep: 14, depth: 86, trunkLean: 33, symmetry: 88, valgus: 'Mild Cave', status: 'Flagged' },
    { rep: 15, depth: 85, trunkLean: 35, symmetry: 87, valgus: 'Mild Cave', status: 'Flagged' },
    { rep: 16, depth: 88, trunkLean: 32, symmetry: 90, valgus: 'Normal', status: 'Optimal' },
    { rep: 17, depth: 94, trunkLean: 30, symmetry: 91, valgus: 'Normal', status: 'Shallow' },
    { rep: 18, depth: 95, trunkLean: 29, symmetry: 92, valgus: 'Normal', status: 'Shallow' },
  ],
  detectedBiomechanicalFlags: [
    {
      id: 'flag_valgus',
      title: 'Dynamic Knee Valgus (Inward Knee Cave)',
      severity: 'Moderate',
      badgeColor: 'bg-amber-950/60 border-amber-800 text-amber-300',
      occurrences: 'Reps 14 & 15',
      observation: 'Left knee exhibited 3.8° medial deviation relative to ankle-hip vector during ascending phase under fatigue.',
      educationalCorrection: 'Cue knees driving outward in line with 2nd toe; integrate banded Spanish squats and lateral monster walks.',
    },
    {
      id: 'flag_depth',
      title: 'Inconsistent Depth under Fatigue',
      severity: 'Low',
      badgeColor: 'bg-cyan-950/60 border-cyan-800 text-cyan-300',
      occurrences: 'Reps 17 & 18',
      observation: 'Squat depth rose to 94°-95° (target 85°-90°) as repetitions progressed.',
      educationalCorrection: 'Maintain intentional pause at the bottom hole; monitor set volume to avoid premature breakdown.',
    },
  ],
  coachingNotes: 'Alex showed great concentric drive through reps 1-13. Slight collapse started when fatigue set in at rep 14. Recommend focusing on glute medius activation warm-up before next squat day.',
};

export const MOCK_COACH_DATA = {
  coach: {
    id: 'coa_001',
    fullName: 'Coach Marcus Vance',
    title: 'Head Strength & Biomechanics Coach',
    team: 'Metro Sports Academy',
  },
  athletes: [
    {
      id: 'ath_001',
      fullName: 'Alex Rivera',
      sport: 'Basketball & Strength',
      lastSession: 'Today, 09:30 AM',
      formQualityScore: 89,
      riskLevel: 'Moderate',
      riskBadge: 'bg-amber-950 text-amber-300 border-amber-800',
      recentAlert: 'Knee valgus on late reps',
    },
    {
      id: 'ath_002',
      fullName: 'Maya Chen',
      sport: 'Track & Field (Sprint)',
      lastSession: 'Yesterday, 04:15 PM',
      formQualityScore: 94,
      riskLevel: 'Low',
      riskBadge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      recentAlert: 'Optimal landing mechanics',
    },
    {
      id: 'ath_003',
      fullName: 'Jordan Hayes',
      sport: 'CrossFit & Olympic Lifting',
      lastSession: '2 days ago',
      formQualityScore: 78,
      riskLevel: 'Elevated',
      riskBadge: 'bg-rose-950 text-rose-300 border-rose-800',
      recentAlert: 'Excessive forward trunk lean (42°)',
    },
  ],
};
