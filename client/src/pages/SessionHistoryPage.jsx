import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Search, Filter, ChevronRight, Download 
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
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Movement Session History</h1>
              <MockBadge variant="pill" text="Session Records" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Review and audit your past movement sessions, repetition depth curves, and risk summaries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Simulated CSV export: In Phase 8, this will generate a real downloadable CSV report of your session metrics.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#0B101D] border border-slate-800/80 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise or issue..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Exercise:</span>
              <select
                value={filterExercise}
                onChange={(e) => setFilterExercise(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All</option>
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
                className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All</option>
                <option value="Low">Low Concern</option>
                <option value="Moderate">Moderate Concern</option>
                <option value="Elevated">Elevated Concern</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions List Cards */}
        <div className="space-y-3">
          {filteredSessions.length === 0 ? (
            <div className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
              No sessions found matching your filter criteria.
            </div>
          ) : (
            filteredSessions.map((ses) => (
              <div
                key={ses.id}
                className="bg-[#0B101D] border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{ses.exerciseType}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800">
                        {ses.concernLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{ses.primaryIssue}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 font-mono">
                      <span>{ses.date} at {ses.time}</span>
                      <span>&bull;</span>
                      <span>{ses.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                  <div className="text-center md:text-right">
                    <div className="text-[11px] text-slate-500">Volume</div>
                    <div className="text-xs font-mono font-medium text-white">{ses.validReps}/{ses.totalReps}</div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-[11px] text-slate-500">Avg Depth</div>
                    <div className="text-xs font-mono font-medium text-cyan-300">{ses.avgDepth}</div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-[11px] text-slate-500">Form Score</div>
                    <div className="text-xs font-mono font-bold text-white">{ses.formScore}/100</div>
                  </div>

                  <Link
                    to={`/report/${ses.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 transition-colors"
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
