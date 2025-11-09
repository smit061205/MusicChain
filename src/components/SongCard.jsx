import React from 'react';
import { Play, Music, TrendingUp, DollarSign } from 'lucide-react';

const SongCard = ({ song, onPlay, isPlaying }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover-lift">
      <div className="relative h-48 bg-slate-900 flex items-center justify-center">
        {song.coverArt ? (
          <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
        ) : (
          <Music className="w-20 h-20 text-slate-700" strokeWidth={1.5} />
        )}
        <button
          onClick={() => onPlay(song.songId)}
          title="Simulate a play and record on blockchain"
          className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all ${
            isPlaying ? 'opacity-100' : ''
          }`}
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all">
            <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" strokeWidth={0} />
          </div>
        </button>
        {isPlaying && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-blue-600 text-white text-[0.6875rem] font-bold rounded-full shadow-lg uppercase tracking-wider">
            Simulating Play
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-[1.125rem] font-bold text-slate-900 mb-1.5 truncate tracking-[-0.02em] leading-tight">{song.title}</h3>
        <p className="text-[0.875rem] text-slate-600 mb-5 font-semibold tracking-[-0.011em]">{song.artist}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
              <span className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">Plays</span>
            </div>
            <p className="text-[1.5rem] font-black text-slate-900 tabular-nums leading-none">{song.plays}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
              <span className="text-[0.6875rem] font-bold text-slate-400 uppercase tracking-wider">Earned</span>
            </div>
            <p className="text-[1.5rem] font-black text-white tabular-nums leading-none">${song.totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider mb-2.5">Royalty Split</div>
          <div className="flex gap-2 text-[0.6875rem]">
            <span className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg font-bold tracking-wide">
              Artist {song.royaltySplit.artist}%
            </span>
            <span className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg font-bold tracking-wide">
              Producer {song.royaltySplit.producer}%
            </span>
            <span className="px-2.5 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold tracking-wide">
              Platform {song.royaltySplit.platform}%
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-[0.6875rem] text-slate-500 font-medium tracking-[-0.011em] leading-relaxed">
            💡 Click play to simulate a stream and see blockchain royalty distribution in action
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
