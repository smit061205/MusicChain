import React, { useState } from 'react';
import { Download, Upload, Trash2, Database, AlertCircle, CheckCircle } from 'lucide-react';

const DataManager = ({ blockchain, onDataChange }) => {
  const [importError, setImportError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleExport = () => {
    const data = blockchain.exportBlockchain();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `musicchain-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess('Blockchain exported successfully!');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = blockchain.importBlockchain(e.target.result);
      if (result.success) {
        showSuccess(result.message);
        onDataChange();
      } else {
        setImportError(result.message);
        setTimeout(() => setImportError(null), 5000);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleLoadDemo = () => {
    if (confirm('This will replace current data with demo data. Continue?')) {
      const result = blockchain.loadDemoData();
      if (result.success) {
        showSuccess(result.message);
        onDataChange();
      }
    }
  };

  const handleClear = () => {
    if (confirm('This will permanently delete all blockchain data. Are you sure?')) {
      blockchain.clearBlockchain();
      showSuccess('Blockchain cleared successfully!');
      onDataChange();
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
        <div>
          <h3 className="text-[1.125rem] font-bold text-slate-900 tracking-[-0.02em]">Data Management</h3>
          <p className="text-[0.8125rem] text-slate-600 font-medium">Export, import, or reset blockchain data</p>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
          <p className="text-[0.875rem] font-semibold text-emerald-900">{successMessage}</p>
        </div>
      )}

      {importError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={2.5} />
          <p className="text-[0.875rem] font-semibold text-red-900">{importError}</p>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold text-[0.8125rem] rounded-xl hover:bg-blue-700 transition-all"
        >
          <Download className="w-4 h-4" strokeWidth={2.5} />
          Export Blockchain
        </button>

        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white font-bold text-[0.8125rem] rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
          <Upload className="w-4 h-4" strokeWidth={2.5} />
          Import Blockchain
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <button
          onClick={handleLoadDemo}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-bold text-[0.8125rem] rounded-xl hover:bg-emerald-700 transition-all"
        >
          <Database className="w-4 h-4" strokeWidth={2.5} />
          Load Demo Data
        </button>

        <button
          onClick={handleClear}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-bold text-[0.8125rem] rounded-xl hover:bg-red-700 transition-all"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2.5} />
          Clear All Data
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Blocks</div>
            <div className="text-[1.25rem] font-black text-slate-900 tabular-nums">{blockchain.chain.length}</div>
          </div>
          <div>
            <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Songs</div>
            <div className="text-[1.25rem] font-black text-slate-900 tabular-nums">{blockchain.songs.size}</div>
          </div>
          <div>
            <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Wallets</div>
            <div className="text-[1.25rem] font-black text-slate-900 tabular-nums">{blockchain.wallets.size}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManager;
