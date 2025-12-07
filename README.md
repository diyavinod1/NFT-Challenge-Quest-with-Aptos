# 🎮 NFT Challenge Quest

Complete fun challenges, earn hilarious NFTs, and compete on the leaderboard!

# ✨ Features
🎯 Interactive Challenges
- Silly Quizzes: "Which meme are you?" type questions

- Mini Games: Click-based games, reaction tests

- Easter Egg Hunts: Find hidden surprises for bonus NFTs

- Real-time Feedback: Animated rewards and funny feedback

🎨 NFT Collection
- Unique NFTs: Dancing bananas, laughing aliens, wacky robots

- Rarity System: 1-5 star rarity for each NFT

- On-Chain Storage: NFTs stored securely on Aptos blockchain

- Animated NFTs: GIF-based NFTs for extra fun

🏆 Competitive Elements
- Leaderboard: Ranked by NFT points and rarity

- Points System: Earn points based on NFT rarity

- Achievements: Special badges for completing challenges

🔗 Blockchain Integration
- Aptos Blockchain: Fast and secure L1 blockchain

- Petra Wallet: Seamless wallet connection

- Gasless Minting: User-friendly NFT minting experience

# 🏗️ Tech Stack
Frontend
- React.js / Next.js - Modern UI framework

- Tailwind CSS - Utility-first CSS framework

- Lucide React - Beautiful icons

- Aptos SDK - Blockchain interaction

Blockchain
- Aptos Move - Smart contract language

- Petra Wallet - Aptos browser wallet

- Aptos Testnet - Development environment

Backend (Optional)
- Node.js / Express - API server

- MongoDB - Database for challenge tracking

- IPFS / Arweave - NFT metadata storage

# 🚀 Quick Start
Prerequisites
- Node.js 16+ and npm

- Petra Wallet browser extension

- Aptos CLI (for contract deployment)

1. Clone and Install

git clone https://github.com/diyavinod1/NFT-Challenge-Quest-with-Aptos.git
cd NFT-Challenge-Quest-with-Aptos

# Install frontend dependencies
cd frontend
npm install

# Install contract dependencies (optional)
cd ../contracts/nft_challenge
aptos move init

2. Configure Environment

# Frontend .env.local
cp .env.example .env.local
Edit .env.local:

env
NEXT_PUBLIC_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_APP_NAME=NFT Challenge Quest

3. Run Development Servers
bash
# Start frontend (from /frontend directory)
npm run dev

# Team Members
Diya Vinod

Aishwarya S

Harshitha MB

⭐ Show Your Support
Give a ⭐️ if this project helped you!

Built with ❤️ by the NFT Challenge Quest Team
