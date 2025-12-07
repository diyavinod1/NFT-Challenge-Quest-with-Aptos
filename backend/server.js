const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock database - replace with real MongoDB
let users = [];
let challenges = [];
let nfts = [];

// Routes
app.get('/api/user/:address/nfts', (req, res) => {
  const userNFTs = nfts.filter(nft => nft.owner === req.params.address);
  res.json(userNFTs);
});

app.post('/api/challenge/complete', (req, res) => {
  const { userAddress, challengeId, nftData } = req.body;
  
  // In real implementation, verify challenge completion
  // Then call smart contract to mint NFT
  
  const newNFT = {
    id: Date.now().toString(),
    owner: userAddress,
    ...nftData,
    mintedAt: new Date().toISOString()
  };
  
  nfts.push(newNFT);
  
  res.json({ 
    success: true, 
    nft: newNFT,
    transaction: '0x' + Math.random().toString(16).substr(2, 64) // mock tx hash
  });
});

app.get('/api/leaderboard', (req, res) => {
  // Calculate leaderboard from NFTs
  const leaderboard = Object.entries(
    nfts.reduce((acc, nft) => {
      acc[nft.owner] = (acc[nft.owner] || 0) + nft.rarity * 100;
      return acc;
    }, {})
  )
    .map(([address, points]) => ({ address, points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  res.json(leaderboard);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
