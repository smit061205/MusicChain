import React, { useState } from 'react';
import { Upload, Music, AlertCircle } from 'lucide-react';

const UploadSongForm = ({ onUpload }) => {
  const PLATFORM_FEE = 10; // Fixed platform fee
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    artistWallet: '',
    producer: '',
    producerWallet: '',
    genre: '',
    duration: '',
    coverArt: '',
    audioUrl: '',
    royaltySplit: { artist: 60, producer: 30, platform: PLATFORM_FEE }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(formData);
    setFormData({
      title: '',
      artist: '',
      artistWallet: '',
      producer: '',
      producerWallet: '',
      genre: '',
      duration: '',
      coverArt: '',
      audioUrl: '',
      royaltySplit: { artist: 60, producer: 30, platform: PLATFORM_FEE }
    });
  };

  const handleSplitChange = (role, value) => {
    const numValue = parseInt(value) || 0;
    const newSplit = { ...formData.royaltySplit };
    
    if (role === 'artist') {
      newSplit.artist = numValue;
      // Producer gets the remaining after platform fee
      newSplit.producer = Math.max(0, 100 - PLATFORM_FEE - numValue);
    } else if (role === 'producer') {
      newSplit.producer = numValue;
      // Artist gets the remaining after platform fee
      newSplit.artist = Math.max(0, 100 - PLATFORM_FEE - numValue);
    }
    
    newSplit.platform = PLATFORM_FEE; // Always fixed
    
    setFormData({ ...formData, royaltySplit: newSplit });
  };

  const totalSplit = formData.royaltySplit.artist + formData.royaltySplit.producer + formData.royaltySplit.platform;
  const maxArtistProducer = 100 - PLATFORM_FEE;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
          <Upload className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-[1.125rem] md:text-[1.25rem] font-bold text-slate-900 tracking-[-0.02em] leading-tight">Register New Song</h3>
          <p className="text-[0.75rem] md:text-[0.8125rem] text-slate-600 font-semibold tracking-[-0.011em]">Add your music to the blockchain</p>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
        <div>
          <h4 className="text-[0.8125rem] font-bold text-blue-900 mb-1 tracking-[-0.01em]">Demo Mode</h4>
          <p className="text-[0.75rem] text-blue-800 leading-relaxed tracking-[-0.011em]">
            This is a blockchain demonstration. The "Play" button simulates a music play and records it on the blockchain, 
            automatically distributing royalties to wallets. Platform fee is fixed at {PLATFORM_FEE}%.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Song Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8125rem] font-bold text-slate-700 mb-2 tracking-[-0.005em]">Song Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.9375rem] font-medium tracking-[-0.011em] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter song title"
            />
          </div>
          <div>
            <label className="block text-[0.8125rem] font-bold text-slate-700 mb-2 tracking-[-0.005em]">Genre</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.9375rem] font-medium tracking-[-0.011em] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g., Pop, Rock, Hip-Hop"
            />
          </div>
        </div>

        {/* Artist Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8125rem] font-bold text-slate-700 mb-2 tracking-[-0.005em]">Artist Name *</label>
            <input
              type="text"
              required
              value={formData.artist}
              onChange={(e) => setFormData({...formData, artist: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.9375rem] font-medium tracking-[-0.011em] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Artist name"
            />
          </div>
          <div>
            <label className="block text-[0.8125rem] font-bold text-slate-700 mb-2 tracking-[-0.005em]">Artist Wallet Address *</label>
            <input
              type="text"
              required
              value={formData.artistWallet}
              onChange={(e) => setFormData({...formData, artistWallet: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.8125rem] font-mono font-medium tracking-tight focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="0xArtist..."
            />
          </div>
        </div>

        {/* Producer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.8125rem] font-bold text-slate-700 mb-2 tracking-[-0.005em]">Producer Name</label>
            <input
              type="text"
              value={formData.producer}
              onChange={(e) => setFormData({...formData, producer: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.9375rem] font-medium tracking-[-0.011em] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Producer name (optional)"
            />
          </div>
          <div>
            <label className="block text-[0.8125rem] font-bold text-slate-700 mb-2 tracking-[-0.005em]">Producer Wallet Address</label>
            <input
              type="text"
              value={formData.producerWallet}
              onChange={(e) => setFormData({...formData, producerWallet: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-[0.8125rem] font-mono font-medium tracking-tight focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="0xProducer..."
            />
          </div>
        </div>

        {/* Royalty Split */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h4 className="text-[0.875rem] font-bold text-slate-900 mb-2 uppercase tracking-wider">Royalty Split Distribution</h4>
          <p className="text-[0.75rem] text-slate-600 mb-4 tracking-[-0.011em]">
            Platform fee is fixed at {PLATFORM_FEE}%. Adjust the split between Artist and Producer (total must be {maxArtistProducer}%).
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[0.6875rem] font-bold text-slate-700 mb-2 uppercase tracking-wider">Artist %</label>
              <input
                type="number"
                min="0"
                max={maxArtistProducer}
                value={formData.royaltySplit.artist}
                onChange={(e) => handleSplitChange('artist', e.target.value)}
                className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl text-center font-black text-[1.25rem] tabular-nums focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[0.6875rem] font-bold text-slate-700 mb-2 uppercase tracking-wider">Producer %</label>
              <input
                type="number"
                min="0"
                max={maxArtistProducer}
                value={formData.royaltySplit.producer}
                onChange={(e) => handleSplitChange('producer', e.target.value)}
                className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl text-center font-black text-[1.25rem] tabular-nums focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[0.6875rem] font-bold text-slate-700 mb-2 uppercase tracking-wider">Platform %</label>
              <input
                type="number"
                value={formData.royaltySplit.platform}
                readOnly
                className="w-full px-3 py-3 border-2 border-slate-300 rounded-xl text-center font-black text-[1.25rem] tabular-nums bg-slate-100 cursor-not-allowed"
                title="Platform fee is fixed"
              />
            </div>
          </div>
          <div className={`text-center mt-4 text-[0.875rem] font-bold ${totalSplit === 100 ? 'text-emerald-600' : 'text-red-600'}`}>
            Total: {totalSplit}% {totalSplit === 100 ? '✓ Perfect!' : `✗ Must equal 100% (Artist + Producer = ${maxArtistProducer}%)`}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={totalSplit !== 100}
          className="w-full py-4 bg-slate-900 text-white text-[0.9375rem] font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md tracking-[-0.01em]"
        >
          <div className="flex items-center justify-center gap-2">
            <Music className="w-5 h-5" strokeWidth={2.5} />
            Register Song on Blockchain
          </div>
        </button>
      </form>
    </div>
  );
};

export default UploadSongForm;
