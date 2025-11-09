import React from 'react';
import { Wallet, TrendingUp, Music, DollarSign, Award } from 'lucide-react';

const Dashboard = ({ blockchain, songs }) => {
  const wallets = Array.from(blockchain.wallets.entries())
    .map(([address, balance]) => ({ address, balance }))
    .filter(w => w.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const topSongs = [...songs]
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 5);

  const totalRevenue = songs.reduce((sum, song) => sum + song.totalEarnings, 0);
  const totalPlays = songs.reduce((sum, song) => sum + song.plays, 0);
  const avgRevenuePerSong = songs.length > 0 ? totalRevenue / songs.length : 0;

  return (
    <div className="space-y-8">
      <h2 className="text-[2rem] font-black text-slate-900 tracking-[-0.03em] leading-none">Analytics Dashboard</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <Music className="w-8 h-8 text-blue-600" strokeWidth={2} />
          </div>
          <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Total Songs</div>
          <div className="text-[2rem] font-black text-slate-900 tabular-nums leading-none">{songs.length}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-purple-600" strokeWidth={2} />
          </div>
          <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Total Plays</div>
          <div className="text-[2rem] font-black text-slate-900 tabular-nums leading-none">{totalPlays}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-emerald-600" strokeWidth={2} />
          </div>
          <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Total Revenue</div>
          <div className="text-[2rem] font-black text-emerald-600 tabular-nums leading-none">${totalRevenue.toFixed(2)}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-orange-600" strokeWidth={2} />
          </div>
          <div className="text-[0.6875rem] text-slate-600 font-bold uppercase tracking-wider mb-1">Avg per Song</div>
          <div className="text-[2rem] font-black text-slate-900 tabular-nums leading-none">${avgRevenuePerSong.toFixed(2)}</div>
        </div>
      </div>

      {/* Wallet Balances */}
      <div>
        <h3 className="text-[1.25rem] font-bold text-slate-900 mb-4 flex items-center gap-2 tracking-[-0.02em]">
          <Wallet className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
          Wallet Balances
        </h3>
        {wallets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Wallet className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-slate-600 font-medium">No earnings yet. Start playing songs to see wallet balances!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((wallet, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <Wallet className="w-8 h-8 text-emerald-600" strokeWidth={2} />
                  <span className="text-[1.75rem] font-black text-emerald-600 tabular-nums leading-none">
                    ${wallet.balance.toFixed(2)}
                  </span>
                </div>
                <p className="text-[0.75rem] font-mono font-medium text-slate-600 truncate tracking-tight">
                  {wallet.address}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="text-[0.6875rem] text-slate-500 font-semibold uppercase tracking-wider">
                    {wallet.address === 'PLATFORM' ? 'Platform Fees' : 'Artist/Producer'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Performing Songs */}
      <div>
        <h3 className="text-[1.25rem] font-bold text-slate-900 mb-4 flex items-center gap-2 tracking-[-0.02em]">
          <TrendingUp className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
          Top Performing Songs
        </h3>
        {topSongs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Music className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-slate-600 font-medium">No songs uploaded yet!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">Song</th>
                  <th className="px-6 py-4 text-left text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-4 text-right text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">Plays</th>
                  <th className="px-6 py-4 text-right text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topSongs.map((song, idx) => (
                  <tr key={song.songId} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-sm">{idx + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-[0.9375rem] tracking-[-0.011em]">{song.title}</div>
                      <div className="text-[0.75rem] text-slate-600 font-medium">{song.genre || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 text-[0.875rem]">{song.artist}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-slate-900 text-[1.125rem] tabular-nums">{song.plays}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-emerald-600 text-[1.125rem] tabular-nums">${song.totalEarnings.toFixed(2)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
