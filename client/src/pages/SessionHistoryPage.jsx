import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, Search, Filter, ChevronRight, Activity, Download 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import MockBadge from '../components/common/MockBadge';
import { MOCK_SESSIONS } from '../data/mockData';

export default function SessionHistoryPage() {
  const [filterExercise, setFilterExercise] = useState('All');
  const [filterConcern, setFilterConcern] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = MOCK_SESSIONS.filter((ses) => {
    const matchExercise = filterExercise === 'All' || ses.exerciseType.toLowerCase().includes(filterExercise.toLowerCase());
    const matchConcern = filterConcern === 'All' || ses.concernLevel.toLowerCase() === filterConcern.toLowerCase();
    const matchSearch = ses.exerciseType.toLowerCase().includes(searchQuery.toLowerCase()) || ses.primaryIssue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchExercise && matchConcern && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-200 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Biomechanical Session History</h1>
              <MockBadge variant="pill" text="Archive" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and audit your past movement sessions, depth metrics, and risk summaries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Simulated CSV export ready.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#0D121F] border border-white/5 p-3.5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise..."
              className="w-full pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Exercise:</span>
              <select
                value={filterExercise}
                onChange={(e) => setFilterExercise(e.target.value)}
                className="bg-black/40 border border-white/10 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Exercises</option>
                <option value="Squat">Squats</option>
                <option value="Lunge">Lunges</option>
                <option value="Jump">Jumps</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Risk:</span>
              <select
                value={filterConcern}
                onChange={(e) => setFilterConcern(e.target.value)}
                className="bg-black/40 border border-white/10 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Levels</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="Elevated">Elevated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions List Cards */}
        <div className="space-y-3">
          {filteredSessions.length === 0 ? (
            <div className="bg-[#0D121F] border border-white/5 rounded-2xl p-8 text-center text-slate-500 text-xs">
              No sessions found matching your filter criteria.
            </div>
          ) : (
            filteredSessions.map((ses) => (
              <div
                key={ses.id}
                className="bg-[#0D121F] border border-white/5 rounded-2xl p-4 hover:border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{ses.exerciseType}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                        {ses.concernLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{ses.primaryIssue}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-mono">
                      <span>{ses.date} at {ses.time}</span>
                      <span>&bull;</span>
                      <span>{ses.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-5 border-t md:border-t-0 pt-2.5 md:pt-0 border-white/5">
                  <div className="text-center md:text-right">
                    <div className="text-[10px] text-slate-500 font-mono">Reps</div>
                    <div className="text-xs font-mono font-bold text-white">{ses.validReps}/{ses.totalReps}</div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-[10px] text-slate-500 font-mono">Depth</div>
                    <div className="text-xs font-mono font-bold text-cyan-300">{ses.avgDepth}</div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-[10px] text-slate-500 font-mono">Score</div>
                    <div className="text-xs font-mono font-bold text-white">{ses.formScore}/100</div>
                  </div>

                  <Link
                    to={`/report/${ses.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                  >
                    <span>Report</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
