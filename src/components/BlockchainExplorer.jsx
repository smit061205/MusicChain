import React, { useState } from 'react';
import { Box, ChevronDown, ChevronUp, Music, Play, FileText } from 'lucide-react';

const BlockchainExplorer = ({ blockchain }) => {
  const [expandedBlocks, setExpandedBlocks] = useState(new Set([0]));

  const toggleBlock = (index) => {
    const newExpanded = new Set(expandedBlocks);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedBlocks(newExpanded);
  };

  const getBlockIcon = (type) => {
    switch(type) {
      case 'SONG_REGISTRATION': return Music;
      case 'PLAY_RECORD': return Play;
      default: return FileText;
    }
  };

  const getBlockColor = (type) => {
    switch(type) {
      case 'SONG_REGISTRATION': return 'blue';
      case 'PLAY_RECORD': return 'emerald';
      default: return 'slate';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-black text-slate-900 tracking-[-0.03em] leading-none">Blockchain Explorer</h2>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider">Total Blocks: </span>
            <span className="text-[0.875rem] font-black text-slate-900 tabular-nums">{blockchain.chain.length}</span>
          </div>
          <div className={`px-4 py-2 rounded-xl border-2 ${
            blockchain.isChainValid() 
              ? 'bg-emerald-50 border-emerald-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <span className={`text-[0.875rem] font-black ${
              blockchain.isChainValid() ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {blockchain.isChainValid() ? '✓ Chain Valid' : '✗ Chain Invalid'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {blockchain.chain.slice().reverse().map((block, idx) => {
          const actualIndex = blockchain.chain.length - 1 - idx;
          const isExpanded = expandedBlocks.has(actualIndex);
          const BlockIcon = getBlockIcon(block.data.type);
          const color = getBlockColor(block.data.type);

          return (
            <div key={actualIndex} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover-lift">
              {/* Block Header */}
              <button
                onClick={() => toggleBlock(actualIndex)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
                    <BlockIcon className={`w-6 h-6 text-${color}-600`} strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-[1.125rem] font-bold text-slate-900 tracking-[-0.02em]">
                        Block #{block.index}
                      </h3>
                      <span className={`px-2.5 py-1 bg-${color}-100 text-${color}-700 text-[0.6875rem] font-bold rounded-lg uppercase tracking-wider`}>
                        {block.data.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[0.75rem] text-slate-600 font-medium">
                      {new Date(block.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
                )}
              </button>

              {/* Block Details */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-200 bg-slate-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hash */}
                    <div>
                      <div className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider mb-2">Current Hash</div>
                      <p className="text-[0.75rem] font-mono font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 break-all">
                        {block.hash}
                      </p>
                    </div>

                    {/* Previous Hash */}
                    <div>
                      <div className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider mb-2">Previous Hash</div>
                      <p className="text-[0.75rem] font-mono font-medium text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200 break-all">
                        {block.previousHash}
                      </p>
                    </div>
                  </div>

                  {/* Block Data */}
                  <div className="mt-4">
                    <div className="text-[0.6875rem] font-bold text-slate-700 uppercase tracking-wider mb-2">Block Data</div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                      {block.data.type === 'SONG_REGISTRATION' && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Song Title:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">{block.data.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Artist:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">{block.data.artist}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Artist Wallet:</span>
                            <span className="text-[0.75rem] font-mono font-medium text-slate-700">{block.data.artistWallet}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Royalty Split:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">
                              Artist {block.data.royaltySplit.artist}% • Producer {block.data.royaltySplit.producer}% • Platform {block.data.royaltySplit.platform}%
                            </span>
                          </div>
                        </div>
                      )}

                      {block.data.type === 'PLAY_RECORD' && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Song:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">{block.data.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Listener:</span>
                            <span className="text-[0.75rem] font-mono font-medium text-slate-700">{block.data.listenerWallet}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Revenue:</span>
                            <span className="text-[0.75rem] font-black text-emerald-600">${block.data.revenuePerPlay.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Artist Royalty:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">${block.data.royalties.artist.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Producer Royalty:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">${block.data.royalties.producer.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[0.75rem] font-semibold text-slate-600">Platform Fee:</span>
                            <span className="text-[0.75rem] font-bold text-slate-900">${block.data.royalties.platform.toFixed(4)}</span>
                          </div>
                        </div>
                      )}

                      {block.data.type === 'GENESIS' && (
                        <div className="text-center py-2">
                          <p className="text-[0.875rem] font-bold text-slate-900">{block.data.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockchainExplorer;
