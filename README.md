# 🎵 MusicChain - Decentralized Music Royalty Distribution Platform

A blockchain-based music royalty distribution system that ensures transparent, automated, and fair payment distribution to artists, producers, and platforms. Built with React, Vite, and SHA-256 cryptographic hashing.

![MusicChain](https://img.shields.io/badge/Blockchain-Music-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Blockchain Architecture](#blockchain-architecture)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**MusicChain** is a decentralized music royalty distribution platform that leverages blockchain technology to create a transparent, immutable record of music plays and automatic royalty payments. Every time a song is played, the transaction is recorded on the blockchain, and royalties are automatically distributed to artists, producers, and the platform based on predefined splits.

### Why MusicChain?

- **Transparency**: Every transaction is recorded on an immutable blockchain
- **Automation**: Royalties are automatically calculated and distributed
- **Fairness**: Artists and producers get paid instantly for every play
- **Security**: SHA-256 cryptographic hashing ensures data integrity
- **Decentralization**: No central authority controls the payment distribution

---

## ✨ Features

### Core Features

- **🎵 Song Registration**: Register songs on the blockchain with metadata
- **💰 Automatic Royalty Distribution**: Smart contract-like logic for instant payments
- **👥 Multi-Party Splits**: Configurable splits between artist, producer, and platform
- **🔐 Wallet System**: Track earnings for each participant
- **✅ Chain Validation**: Verify blockchain integrity in real-time
- **�� Analytics Dashboard**: View plays, earnings, and top songs
- **🔍 Blockchain Explorer**: Inspect every block and transaction
- **🎭 User Roles**: Separate listener, artist, and producer wallets

### Advanced Features

- **💾 Data Persistence**: LocalStorage integration for data survival
- **📥 Export/Import**: Download and upload blockchain data as JSON
- **🎪 Demo Data**: Pre-loaded sample songs for testing
- **🔔 Toast Notifications**: Real-time success/error feedback
- **📱 Responsive Design**: Works on mobile, tablet, and desktop
- **⌨️ Keyboard Shortcuts**: Quick navigation (⌘1-5)
- **♿ Accessibility**: ARIA labels and keyboard navigation
- **🎨 Modern UI**: Clean, professional design with smooth animations

---

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **TailwindCSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Icon library

### Blockchain & Crypto
- **crypto-js** - SHA-256 hashing algorithm
- **Custom Blockchain Implementation** - JavaScript-based blockchain

### Storage
- **LocalStorage** - Client-side data persistence

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🔧 How It Works

### Blockchain Structure

Each block in the MusicChain contains:

```javascript
{
  index: 0,                    // Block number
  timestamp: "2025-11-09...",  // ISO timestamp
  data: {                      // Transaction data
    type: "SONG_REGISTRATION" | "PLAY_RECORD",
    songId: "SONG-123456789",
    // ... additional data
  },
  previousHash: "abc123...",   // Link to previous block
  hash: "def456..."            // Current block hash (SHA-256)
}
```

### Royalty Distribution

1. **Song Registration**: Artist uploads song with royalty split configuration
2. **Play Event**: Listener plays the song
3. **Validation**: System checks listener is not the artist/producer
4. **Transaction**: Play is recorded as a new block on the blockchain
5. **Distribution**: Royalties are automatically split:
   - **Artist**: 60% (configurable)
   - **Producer**: 30% (configurable)
   - **Platform**: 10% (fixed)

### Security Features

- **Immutability**: Once recorded, blocks cannot be altered
- **Chain Validation**: Continuous verification of block integrity
- **Hash Verification**: SHA-256 ensures data hasn't been tampered
- **Self-Play Prevention**: Artists/producers cannot earn from own plays

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/musicchain.git
cd musicchain
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- Vite
- TailwindCSS & PostCSS
- crypto-js
- lucide-react
- All dev dependencies

### Step 3: Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173**

### Step 4: Build for Production

```bash
npm run build
```

Production files will be in the `dist/` directory.

---

## 📖 Usage Guide

### 1. Select a Listener Wallet

Before playing any songs, select or add a listener wallet:

1. Click the **User Selector** dropdown in the header
2. Choose from default listeners (Listener 1, 2, 3, Fan 001)
3. Or click the **+** button to add a custom wallet address

### 2. Upload a Song

1. Navigate to **Upload Song** tab (⌘2)
2. Fill in the form:
   - **Song Title** (required)
   - **Artist Name** (required)
   - **Artist Wallet** (required, must start with 0x)
   - **Producer Name** (optional)
   - **Producer Wallet** (optional)
   - **Genre** (optional)
3. Configure **Royalty Split**:
   - Adjust Artist % (0-90%)
   - Producer % auto-adjusts
   - Platform fee is fixed at 10%
   - Total must equal 100%
4. Click **Register Song on Blockchain**

### 3. Play a Song

1. Go to **Music Library** tab (⌘1)
2. Hover over a song card
3. Click the **Play** button
4. The system will:
   - Validate you're not the artist/producer
   - Record the play on the blockchain
   - Distribute royalties automatically
   - Show a success notification

### 4. View Analytics

Navigate to **Analytics** tab (⌘3) to see:
- Total songs, plays, and revenue
- Wallet balances for all participants
- Top performing songs
- Revenue breakdown

### 5. Explore Blockchain

Go to **Blockchain** tab (⌘4) to:
- View all blocks in the chain
- Expand blocks to see transaction details
- Verify chain integrity
- Inspect hashes and timestamps

### 6. Manage Data

Use **Data Manager** tab (⌘5) to:
- **Export Blockchain**: Download as JSON file
- **Import Blockchain**: Upload previously exported data
- **Load Demo Data**: Populate with sample songs
- **Clear All Data**: Reset the blockchain

---

## 📁 Project Structure

```
Blockchain_Project/
├── src/
│   ├── components/
│   │   ├── Block.jsx              # Individual block display (legacy)
│   │   ├── AddBlockForm.jsx       # Add block form (legacy)
│   │   ├── ChainValidator.jsx     # Chain validation (legacy)
│   │   ├── SongCard.jsx           # Song card component
│   │   ├── UploadSongForm.jsx     # Song upload form
│   │   ├── Dashboard.jsx          # Analytics dashboard
│   │   ├── BlockchainExplorer.jsx # Blockchain inspector
│   │   ├── UserSelector.jsx       # Listener wallet selector
│   │   ├── DataManager.jsx        # Data import/export
│   │   └── Toast.jsx              # Notification system
│   ├── utils/
│   │   └── blockchain.js          # Blockchain core logic
│   ├── App.jsx                    # Main application
│   ├── App.css                    # Custom styles
│   ├── index.css                  # Global styles + Tailwind
│   └── main.jsx                   # React entry point
├── public/                        # Static assets
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # This file
```

---

## 🏗️ Blockchain Architecture

### Class: `MusicBlock`

Represents a single block in the blockchain.

```javascript
class MusicBlock {
  constructor(index, timestamp, data, previousHash)
  calculateHash() // Returns SHA-256 hash
}
```

### Class: `MusicRoyaltyBlockchain`

Manages the entire blockchain and business logic.

**Key Methods:**

- [registerSong(songData)](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:222:2-260:3) - Add new song to blockchain
- [recordPlay(songId, listenerWallet)](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:262:2-314:3) - Record play and distribute royalties
- [isChainValid()](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:348:2-362:3) - Verify blockchain integrity
- [exportBlockchain()](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:83:2-93:3) - Export as JSON
- [importBlockchain(jsonData)](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:95:2-122:3) - Import from JSON
- [loadDemoData()](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:134:2-186:3) - Load sample data
- [saveToStorage()](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:44:2-60:3) - Persist to LocalStorage
- [loadFromStorage()](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:62:2-81:3) - Load from LocalStorage

---

## 📚 API Reference

### Blockchain Methods

#### [registerSong(songData)](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:222:2-260:3)

Registers a new song on the blockchain.

**Parameters:**
```javascript
{
  title: string,           // Song title (required)
  artist: string,          // Artist name (required)
  artistWallet: string,    // Artist wallet address (required)
  producer: string,        // Producer name (optional)
  producerWallet: string,  // Producer wallet (optional)
  genre: string,           // Music genre (optional)
  royaltySplit: {
    artist: number,        // Artist percentage (0-90)
    producer: number,      // Producer percentage (0-90)
    platform: 10           // Platform fee (fixed)
  }
}
```

**Returns:**
```javascript
{
  success: boolean,
  songId?: string,
  errors?: string[]
}
```

#### [recordPlay(songId, listenerWallet, revenuePerPlay = 0.01)](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:262:2-314:3)

Records a play event and distributes royalties.

**Parameters:**
- `songId`: Song identifier
- `listenerWallet`: Listener's wallet address
- `revenuePerPlay`: Revenue per play (default: $0.01)

**Returns:**
```javascript
{
  success: boolean,
  message?: string,
  block?: MusicBlock
}
```

#### [isChainValid()](cci:1://file:///Users/smitthakkar/Desktop/Blockchain_Project/src/utils/blockchain.js:348:2-362:3)

Validates the entire blockchain.

**Returns:** `boolean`

---

## 🖼️ Screenshots

### Music Library
Browse and play songs with real-time blockchain recording.

### Upload Song
Register new songs with customizable royalty splits.

### Analytics Dashboard
View comprehensive statistics and wallet balances.

### Blockchain Explorer
Inspect every block and transaction in detail.

### Data Manager
Export, import, and manage blockchain data.

---

## 🎯 Key Concepts

### Immutability
Once a block is added to the chain, it cannot be modified. Any attempt to change data will break the chain's integrity.

### Cryptographic Hashing
Each block's hash is calculated using SHA-256, combining:
- Block index
- Timestamp
- Transaction data
- Previous block's hash

### Chain Validation
The system continuously verifies:
1. Each block's hash matches its calculated hash
2. Each block's previousHash matches the actual previous block's hash

### Smart Contract Logic
Royalty distribution is automated through code:
```javascript
royalties = {
  artist: revenue * (artistPercent / 100),
  producer: revenue * (producerPercent / 100),
  platform: revenue * 0.10
}
```

---

## 🚀 Future Enhancements

- [ ] Real blockchain integration (Ethereum/Polygon)
- [ ] Actual audio file upload and streaming
- [ ] NFT minting for songs
- [ ] Multi-currency support (ETH, USDC)
- [ ] Social features (following, playlists)
- [ ] Mobile app (React Native)
- [ ] Smart contract deployment
- [ ] IPFS integration for decentralized storage
- [ ] Proof of Work mining
- [ ] Consensus mechanism

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Your Name**
- GitHub: [@smit061205](https://github.com/smit061205)
- Email: smit061205@gmail.com

---

## 🙏 Acknowledgments

- Built as a blockchain technology demonstration project
- Inspired by decentralized music platforms like Audius
- Uses SHA-256 cryptographic hashing (same as Bitcoin)
- React and Vite for modern web development
- TailwindCSS for beautiful, responsive design

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: smit061205@gmail.com


---

**⭐ If you found this project helpful, please give it a star!**

---


