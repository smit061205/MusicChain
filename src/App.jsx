import React, { useState, useEffect } from 'react';
import { MusicRoyaltyBlockchain } from './utils/blockchain';
import SongCard from './components/SongCard';
import UploadSongForm from './components/UploadSongForm';
import Dashboard from './components/Dashboard';
import BlockchainExplorer from './components/BlockchainExplorer';
import UserSelector from './components/UserSelector';
import DataManager from './components/DataManager';
import Toast from './components/Toast';
import { Music, Wallet, TrendingUp, Box, Database, Loader } from 'lucide-react';
import './App.css';

function App() {
  const [blockchain] = useState(() => new MusicRoyaltyBlockchain());
  const [songs, setSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('music');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [, forceUpdate] = useState();

  useEffect(() => {
    setSongs(blockchain.getAllSongs());
    setCurrentUser(blockchain.currentUser);
  }, [blockchain]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case '1': setActiveTab('music'); e.preventDefault(); break;
          case '2': setActiveTab('upload'); e.preventDefault(); break;
          case '3': setActiveTab('dashboard'); e.preventDefault(); break;
          case '4': setActiveTab('blockchain'); e.preventDefault(); break;
          case '5': setActiveTab('data'); e.preventDefault(); break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSongUpload = (songData) => {
    setLoading(true);
    setTimeout(() => {
      const result = blockchain.registerSong(songData);
      
      if (result.success) {
        setSongs(blockchain.getAllSongs());
        forceUpdate({});
        setActiveTab('music');
        showToast('🎵 Song registered on blockchain successfully!', 'success');
      } else {
        showToast(result.errors.join(', '), 'error');
      }
      setLoading(false);
    }, 500);
  };

  const handlePlay = (songId) => {
    if (!currentUser) {
      showToast('Please select a listener wallet first!', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = blockchain.recordPlay(songId, currentUser);
      
      if (!result.success) {
        showToast(result.message, 'error');
        setLoading(false);
        return;
      }

      setSongs(blockchain.getAllSongs());
      setCurrentlyPlaying(songId);
      forceUpdate({});
      showToast('✓ Play recorded! Royalties distributed.', 'success');
      
      setTimeout(() => {
        setCurrentlyPlaying(null);
        setLoading(false);
      }, 1500);
    }, 300);
  };

  const handleUserChange = (wallet) => {
    setCurrentUser(wallet);
    blockchain.setCurrentUser(wallet);
    showToast(`Listener wallet selected: ${wallet.substring(0, 10)}...`, 'info');
  };

  const handleDataChange = () => {
    setSongs(blockchain.getAllSongs());
    setCurrentUser(blockchain.currentUser);
    forceUpdate({});
  };

  const totalPlays = songs.reduce((sum, song) => sum + song.plays, 0);
  const totalRevenue = songs.reduce((sum, song) => sum + song.totalEarnings, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <Loader className="w-12 h-12 text-blue-600 animate-spin" strokeWidth={2.5} />
            <p className="text-[0.9375rem] font-bold text-slate-900">Processing transaction...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-6 md:py-7">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-7">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                <Music className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-[1.5rem] md:text-[2rem] font-bold text-slate-900 tracking-[-0.04em] leading-none mb-1 md:mb-1.5">
                  MusicChain
                </h1>
                <p className="text-[0.75rem] md:text-[0.8125rem] text-slate-600 font-semibold tracking-[-0.01em]">
                  Decentralized Music Royalty Platform
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
              <div className="w-full md:w-auto">
                <UserSelector currentUser={currentUser} onUserChange={handleUserChange} />
              </div>
              <div className="flex gap-2 flex-1 md:flex-none">
                <div className="bg-slate-50 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-3.5 border border-slate-200 flex-1 md:flex-none">
                  <div className="text-[0.625rem] md:text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-0.5 md:mb-1">Plays</div>
                  <div className="text-[1.25rem] md:text-[1.75rem] font-black text-slate-900 tabular-nums leading-none">{totalPlays}</div>
                </div>
                <div className="bg-slate-900 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-3.5 shadow-sm flex-1 md:flex-none">
                  <div className="text-[0.625rem] md:text-[0.6875rem] text-slate-400 font-bold uppercase tracking-wider mb-0.5 md:mb-1">Revenue</div>
                  <div className="text-[1.25rem] md:text-[1.75rem] font-black text-white tabular-nums leading-none">${totalRevenue.toFixed(2)}</div>
                </div>
                <div className="bg-blue-600 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-3.5 shadow-sm hide-mobile">
                  <div className="text-[0.6875rem] text-blue-200 font-bold uppercase tracking-wider mb-1">Songs</div>
                  <div className="text-[1.75rem] font-black text-white tabular-nums leading-none">{songs.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'music', label: 'Music', icon: Music, shortcut: '⌘1' },
              { id: 'upload', label: 'Upload', icon: TrendingUp, shortcut: '⌘2' },
              { id: 'dashboard', label: 'Analytics', icon: Wallet, shortcut: '⌘3' },
              { id: 'blockchain', label: 'Blockchain', icon: Box, shortcut: '⌘4' },
              { id: 'data', label: 'Data', icon: Database, shortcut: '⌘5' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={`${tab.label} (${tab.shortcut})`}
                className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 rounded-xl font-bold text-[0.75rem] md:text-[0.8125rem] tracking-[-0.01em] transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="animate-fade-in">
          {activeTab === 'music' && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
                <h2 className="text-[1.5rem] md:text-[2rem] font-black text-slate-900 tracking-[-0.03em] leading-none">
                  Music Library
                </h2>
                {currentlyPlaying && (
                  <div className="flex items-center gap-3 bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl shadow-sm border border-slate-200">
                    <div className="music-wave text-blue-600">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <span className="text-[0.75rem] md:text-[0.8125rem] font-bold text-slate-900 tracking-[-0.01em]">
                      Playing & Recording
                    </span>
                  </div>
                )}
              </div>
              {songs.length === 0 ? (
                <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-8 md:p-16 text-center shadow-sm">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-900 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                    <Music className="w-8 h-8 md:w-12 md:h-12 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-[1.25rem] md:text-[1.75rem] font-black text-slate-900 mb-2 md:mb-3 tracking-[-0.03em] leading-tight">
                    No songs yet
                  </h3>
                  <p className="text-[0.875rem] md:text-[1rem] text-slate-600 font-medium mb-6 md:mb-8 tracking-[-0.011em] leading-relaxed max-w-md mx-auto">
                    Upload your first song or load demo data to get started!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white text-[0.875rem] md:text-[0.9375rem] font-bold rounded-xl md:rounded-2xl hover:bg-slate-800 transition-all shadow-sm hover:shadow-md tracking-[-0.01em]"
                    >
                      Upload Song
                    </button>
                    <button
                      onClick={() => setActiveTab('data')}
                      className="px-6 md:px-8 py-3 md:py-4 bg-emerald-600 text-white text-[0.875rem] md:text-[0.9375rem] font-bold rounded-xl md:rounded-2xl hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md tracking-[-0.01em]"
                    >
                      Load Demo Data
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {songs.map(song => (
                    <SongCard
                      key={song.songId}
                      song={song}
                      onPlay={handlePlay}
                      isPlaying={currentlyPlaying === song.songId}
                      currentUser={currentUser}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <h2 className="text-[1.5rem] md:text-[2rem] font-black text-slate-900 mb-6 md:mb-8 tracking-[-0.03em] leading-none">
                Upload New Song
              </h2>
              <UploadSongForm onUpload={handleSongUpload} />
            </div>
          )}

          {activeTab === 'dashboard' && <Dashboard blockchain={blockchain} songs={songs} />}
          {activeTab === 'blockchain' && <BlockchainExplorer blockchain={blockchain} />}
          {activeTab === 'data' && (
            <div>
              <h2 className="text-[1.5rem] md:text-[2rem] font-black text-slate-900 mb-6 md:mb-8 tracking-[-0.03em] leading-none">
                Data Management
              </h2>
              <DataManager blockchain={blockchain} onDataChange={handleDataChange} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 md:py-8 mt-12 md:mt-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-[0.75rem] md:text-[0.8125rem] text-slate-700 font-semibold mb-2 md:mb-3 tracking-[-0.011em]">
            Powered by <span className="font-black text-slate-900">Blockchain Technology</span> • 
            <span className="font-black text-slate-900"> SHA-256</span> • 
            <span className="font-black text-slate-900"> Smart Contracts</span>
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-3">
            <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-slate-100 text-slate-700 text-[0.625rem] md:text-[0.6875rem] font-bold rounded-full border border-slate-200 uppercase tracking-wider">
              {blockchain.chain.length} Blocks
            </span>
            <span className="px-2.5 md:px-3 py-1 md:py-1.5 bg-blue-100 text-blue-700 text-[0.625rem] md:text-[0.6875rem] font-bold rounded-full border border-blue-200 uppercase tracking-wider">
              {blockchain.isChainValid() ? '✓ Valid' : '✗ Invalid'}
            </span>
          </div>
          <p className="text-[0.625rem] md:text-[0.6875rem] text-slate-500 mt-3 font-medium">
            Keyboard shortcuts: ⌘1-5 to switch tabs
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
