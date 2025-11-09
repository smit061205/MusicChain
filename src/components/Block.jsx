import React from 'react';
import { Box, Link2, Calendar, FileText } from 'lucide-react';

const Block = ({ block, isValid, onDataChange }) => {
  return (
    <div className={`relative bg-white rounded-3xl shadow-lg border-2 p-7 min-w-[360px] transition-all duration-300 hover:shadow-xl ${
      isValid ? 'border-emerald-400/60' : 'border-red-400/60 animate-pulse-slow'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${
            isValid ? 'bg-emerald-100' : 'bg-red-100'
          }`}>
            <Box className={`w-5 h-5 ${isValid ? 'text-emerald-600' : 'text-red-600'}`} strokeWidth={2.5} />
          </div>
          <h3 className="text-[1.375rem] font-bold text-slate-900 tracking-[-0.02em] tabular-nums">
            Block #{block.index}
          </h3>
        </div>
        <div className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide ${
          isValid ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {isValid ? '✓ VALID' : '✗ INVALID'}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {/* Data */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <FileText className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
            <label className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">
              Block Data
            </label>
          </div>
          <input
            type="text"
            value={block.data}
            onChange={(e) => onDataChange && onDataChange(block.index, e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.9375rem] text-slate-900 font-medium tracking-[-0.011em] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
            placeholder="Block data..."
          />
        </div>

        {/* Timestamp */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Calendar className="w-4 h-4 text-purple-600" strokeWidth={2.5} />
            <label className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">
              Timestamp
            </label>
          </div>
          <p className="text-[0.8125rem] text-slate-600 font-mono font-medium bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 tracking-tight">
            {new Date(block.timestamp).toLocaleString()}
          </p>
        </div>

        {/* Previous Hash */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Link2 className="w-4 h-4 text-orange-600" strokeWidth={2.5} />
            <label className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">
              Previous Hash
            </label>
          </div>
          <p className="text-[0.75rem] text-slate-600 font-mono font-medium bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 break-all leading-relaxed">
            {block.previousHash.substring(0, 32)}...
          </p>
        </div>

        {/* Current Hash */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Box className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
            <label className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">
              Current Hash
            </label>
          </div>
          <p className="text-[0.75rem] text-slate-900 font-mono font-semibold bg-gradient-to-r from-slate-50 to-slate-100 px-3.5 py-2.5 rounded-xl border-2 border-slate-200 break-all leading-relaxed">
            {block.hash.substring(0, 32)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Block;
