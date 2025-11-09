import SHA256 from 'crypto-js/sha256';

export class MusicBlock {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data)
    ).toString();
  }
}

export class MusicRoyaltyBlockchain {
  constructor() {
    this.chain = [];
    this.songs = new Map();
    this.wallets = new Map();
    this.currentUser = null;
    
    // Load from localStorage or initialize
    this.loadFromStorage();
    
    if (this.chain.length === 0) {
      this.chain = [this.createGenesisBlock()];
      this.saveToStorage();
    }
  }

  createGenesisBlock() {
    return new MusicBlock(0, new Date().toISOString(), {
      type: "GENESIS",
      message: "Music Royalty Blockchain Initialized"
    }, "0");
  }

  // Save blockchain to localStorage
  saveToStorage() {
    try {
      const data = {
        chain: this.chain,
        songs: Array.from(this.songs.entries()),
        wallets: Array.from(this.wallets.entries()),
        currentUser: this.currentUser,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('musicchain_blockchain', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save blockchain:', error);
      return false;
    }
  }

  // Load blockchain from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('musicchain_blockchain');
      if (stored) {
        const data = JSON.parse(stored);
        this.chain = data.chain.map(block => 
          new MusicBlock(block.index, block.timestamp, block.data, block.previousHash)
        );
        this.songs = new Map(data.songs);
        this.wallets = new Map(data.wallets);
        this.currentUser = data.currentUser;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load blockchain:', error);
      return false;
    }
  }

  // Export blockchain as JSON
  exportBlockchain() {
    const data = {
      chain: this.chain,
      songs: Array.from(this.songs.entries()),
      wallets: Array.from(this.wallets.entries()),
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    return JSON.stringify(data, null, 2);
  }

  // Import blockchain from JSON
  importBlockchain(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate structure
      if (!data.chain || !Array.isArray(data.chain)) {
        throw new Error('Invalid blockchain data structure');
      }

      // Reconstruct blockchain
      this.chain = data.chain.map(block => 
        new MusicBlock(block.index, block.timestamp, block.data, block.previousHash)
      );
      this.songs = new Map(data.songs);
      this.wallets = new Map(data.wallets);
      
      // Validate chain integrity
      if (!this.isChainValid()) {
        throw new Error('Imported blockchain is invalid');
      }

      this.saveToStorage();
      return { success: true, message: 'Blockchain imported successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Clear all data
  clearBlockchain() {
    this.chain = [this.createGenesisBlock()];
    this.songs = new Map();
    this.wallets = new Map();
    this.currentUser = null;
    localStorage.removeItem('musicchain_blockchain');
    this.saveToStorage();
  }

  // Load sample demo data
  loadDemoData() {
    this.clearBlockchain();
    
    const demoSongs = [
      {
        title: "Blockchain Dreams",
        artist: "Crypto Artist",
        artistWallet: "0xArtist001",
        producer: "Beat Master",
        producerWallet: "0xProducer001",
        genre: "Electronic",
        royaltySplit: { artist: 60, producer: 30, platform: 10 }
      },
      {
        title: "Decentralized Love",
        artist: "Web3 Singer",
        artistWallet: "0xArtist002",
        producer: "Sound Engineer",
        producerWallet: "0xProducer002",
        genre: "Pop",
        royaltySplit: { artist: 65, producer: 25, platform: 10 }
      },
      {
        title: "Smart Contract Symphony",
        artist: "NFT Composer",
        artistWallet: "0xArtist003",
        producer: "Digital Producer",
        producerWallet: "0xProducer003",
        genre: "Classical",
        royaltySplit: { artist: 70, producer: 20, platform: 10 }
      }
    ];

    // Register demo songs
    demoSongs.forEach(song => {
      this.registerSong(song);
    });

    // Simulate some plays
    const listeners = ['0xListener1', '0xListener2', '0xFan001'];
    const songIds = Array.from(this.songs.keys());
    
    songIds.forEach((songId, idx) => {
      for (let i = 0; i < (idx + 1) * 3; i++) {
        const listener = listeners[i % listeners.length];
        this.recordPlay(songId, listener);
      }
    });

    this.saveToStorage();
    return { success: true, message: 'Demo data loaded successfully' };
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  setCurrentUser(userWallet) {
    this.currentUser = userWallet;
    this.saveToStorage();
  }

  // Validate song data
  validateSongData(songData) {
    const errors = [];
    
    if (!songData.title || songData.title.trim().length === 0) {
      errors.push('Song title is required');
    }
    if (!songData.artist || songData.artist.trim().length === 0) {
      errors.push('Artist name is required');
    }
    if (!songData.artistWallet || songData.artistWallet.trim().length === 0) {
      errors.push('Artist wallet is required');
    }
    if (songData.artistWallet && !songData.artistWallet.startsWith('0x')) {
      errors.push('Artist wallet must start with 0x');
    }
    
    const total = songData.royaltySplit.artist + songData.royaltySplit.producer + songData.royaltySplit.platform;
    if (total !== 100) {
      errors.push('Royalty split must total 100%');
    }

    return errors;
  }

  registerSong(songData) {
    // Validate data
    const errors = this.validateSongData(songData);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const songId = `SONG-${Date.now()}`;
    const block = new MusicBlock(
      this.chain.length,
      new Date().toISOString(),
      {
        type: "SONG_REGISTRATION",
        songId,
        title: songData.title,
        artist: songData.artist,
        artistWallet: songData.artistWallet,
        producer: songData.producer || 'N/A',
        producerWallet: songData.producerWallet || '',
        royaltySplit: songData.royaltySplit,
        duration: songData.duration || '0:00',
        genre: songData.genre || 'Unknown',
        coverArt: songData.coverArt || '',
        audioUrl: songData.audioUrl || ''
      },
      this.getLatestBlock().hash
    );
    
    this.chain.push(block);
    this.songs.set(songId, {
      ...songData,
      songId,
      plays: 0,
      totalEarnings: 0
    });
    
    this.saveToStorage();
    return { success: true, songId };
  }

  recordPlay(songId, listenerWallet, revenuePerPlay = 0.01) {
    const song = this.songs.get(songId);
    if (!song) return { success: false, message: "Song not found" };

    if (!listenerWallet || listenerWallet.trim().length === 0) {
      return { success: false, message: "Listener wallet is required" };
    }

    if (listenerWallet === song.artistWallet) {
      return { 
        success: false, 
        message: "Artists cannot earn royalties from their own plays" 
      };
    }

    if (listenerWallet === song.producerWallet && song.producerWallet) {
      return { 
        success: false, 
        message: "Producers cannot earn royalties from their own plays" 
      };
    }

    const royalties = this.calculateRoyalties(song.royaltySplit, revenuePerPlay);
    
    const block = new MusicBlock(
      this.chain.length,
      new Date().toISOString(),
      {
        type: "PLAY_RECORD",
        songId,
        title: song.title,
        listenerWallet,
        revenuePerPlay,
        royalties,
        timestamp: new Date().toISOString()
      },
      this.getLatestBlock().hash
    );
    
    this.chain.push(block);
    
    song.plays += 1;
    song.totalEarnings += revenuePerPlay;
    
    this.creditWallet(song.artistWallet, royalties.artist);
    if (song.producerWallet) {
      this.creditWallet(song.producerWallet, royalties.producer);
    }
    this.creditWallet('PLATFORM', royalties.platform);
    
    this.saveToStorage();
    return { success: true, block };
  }

  calculateRoyalties(split, revenue) {
    return {
      artist: (revenue * split.artist) / 100,
      producer: (revenue * split.producer) / 100,
      platform: (revenue * split.platform) / 100
    };
  }

  creditWallet(address, amount) {
    if (!address || address === '') return;
    const current = this.wallets.get(address) || 0;
    this.wallets.set(address, current + amount);
  }

  getWalletBalance(address) {
    return this.wallets.get(address) || 0;
  }

  getAllSongs() {
    return Array.from(this.songs.values());
  }

  getSongById(songId) {
    return this.songs.get(songId);
  }

  getPlayHistory(songId) {
    return this.chain.filter(block => 
      block.data.type === "PLAY_RECORD" && block.data.songId === songId
    );
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getStats() {
    return {
      totalBlocks: this.chain.length,
      totalSongs: this.songs.size,
      totalPlays: Array.from(this.songs.values()).reduce((sum, song) => sum + song.plays, 0),
      totalRevenue: Array.from(this.songs.values()).reduce((sum, song) => sum + song.totalEarnings, 0),
      totalWallets: this.wallets.size,
      isValid: this.isChainValid(),
      lastSaved: new Date().toISOString()
    };
  }
}
