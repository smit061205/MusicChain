import React, { useState } from 'react';
import { User, Plus, X } from 'lucide-react';

const UserSelector = ({ currentUser, onUserChange }) => {
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [newWallet, setNewWallet] = useState('');
  const [customListeners, setCustomListeners] = useState([]);

  const defaultListeners = [
    { wallet: '0xListener1', name: 'Listener 1' },
    { wallet: '0xListener2', name: 'Listener 2' },
    { wallet: '0xListener3', name: 'Listener 3' },
    { wallet: '0xFan001', name: 'Fan 001' },
  ];

  const allListeners = [...defaultListeners, ...customListeners];

  const handleAddWallet = () => {
    if (newWallet.trim()) {
      const newListener = {
        wallet: newWallet.trim(),
        name: `Custom (${newWallet.substring(0, 8)}...)`
      };
      setCustomListeners([...customListeners, newListener]);
      onUserChange(newWallet.trim());
      setNewWallet('');
      setShowAddWallet(false);
    }
  };

  return (
    <div className="bg-slate-50 rounded-2xl px-5 py-3.5 border border-slate-200 relative">
      <div className="flex items-center gap-3">
        <User className="w-5 h-5 text-slate-600" strokeWidth={2.5} />
        <div className="flex-1">
          <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Current Listener</div>
          <div className="flex items-center gap-2">
            <select
              value={currentUser || ''}
              onChange={(e) => onUserChange(e.target.value)}
              className="text-[0.8125rem] font-bold text-slate-900 bg-transparent border-none outline-none cursor-pointer tracking-[-0.01em] pr-2"
            >
              <option value="">Select Listener...</option>
              {allListeners.map(listener => (
                <option key={listener.wallet} value={listener.wallet}>
                  {listener.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAddWallet(!showAddWallet)}
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              title="Add custom wallet"
            >
              {showAddWallet ? (
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              ) : (
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add Wallet Form */}
      {showAddWallet && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xl z-50">
          <h4 className="text-[0.875rem] font-bold text-slate-900 mb-3 tracking-[-0.01em]">Add Custom Listener Wallet</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddWallet()}
              placeholder="0x..."
              className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-xl text-[0.8125rem] font-mono font-medium tracking-tight focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAddWallet}
              disabled={!newWallet.trim()}
              className="px-4 py-2 bg-slate-900 text-white text-[0.8125rem] font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Add
            </button>
          </div>
          <p className="text-[0.6875rem] text-slate-500 mt-2 tracking-[-0.011em]">
            Enter any wallet address to simulate a listener
          </p>
        </div>
      )}
    </div>
  );
};

export default UserSelector;
