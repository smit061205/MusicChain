import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const ChainValidator = ({ isValid, onValidate }) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        onClick={onValidate}
        className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white text-[0.9375rem] font-semibold tracking-[-0.011em] rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <Shield className="w-5 h-5" strokeWidth={2.5} />
        Validate Chain
      </button>
      
      {isValid !== null && (
        <div className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-[0.9375rem] font-semibold tracking-[-0.011em] shadow-sm ${
          isValid 
            ? 'bg-emerald-500 text-white border-2 border-emerald-600' 
            : 'bg-red-500 text-white border-2 border-red-600 animate-pulse'
        }`}>
          {isValid ? (
            <>
              <Shield className="w-5 h-5" strokeWidth={2.5} />
              Chain is Valid ✓
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
              Chain is Broken ✗
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChainValidator;
