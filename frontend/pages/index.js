import { useState, useEffect } from 'react';
import Head from 'next/head';
import WalletConnector from '../components/WalletConnector';
import ChallengeCard from '../components/ChallengeCard';
import NFTCollection from '../components/NFTCollection';
import Leaderboard from '../components/Leaderboard';

const CHALLENGES = [
  {
    id: 1,
    title: "Meme Quiz",
    description: "Which meme perfectly describes your life right now?",
    type: "quiz",
    emoji: "🤔",
    rarity: 3,
    question: "What is the answer to the ultimate question of life, the universe, and everything?",
    answer: "42",
    nft: {
      name: "Philosophical Meme NFT",
      description: "You've questioned existence and survived!",
      image_url: "https://example.com/meme-nft.gif",
      rarity: 3
    }
  },
  {
    id: 2,
    title: "Dancing Cat Clicker",
    description: "Click the dancing cat 10 times before time runs out!",
    type: "click",
    emoji: "🐱",
    rarity: 2,
    nft: {
      name: "Dancing Cat NFT",
      description: "You've got the rhythm!",
      image_url: "https://example.com/dancing-cat.gif",
      rarity: 2
    }
  },
  {
    id: 3,
    title: "Easter Egg Hunt",
    description: "Find the hidden Easter egg somewhere on this page!",
    type: "easter-egg",
    emoji: "🥚",
    rarity: 5,
    nft: {
      name: "Golden Easter Egg NFT",
      description: "You found the secret! Legendary status achieved!",
      image_url: "https://example.com/golden-egg.gif",
      rarity: 5
    }
  }
];

export default function Home() {
  const [userAddress, setUserAddress] = useState(null);
  const [userNFTs, setUserNFTs] = useState([]);
  const [activeTab, setActiveTab] = useState('challenges');

  const handleWalletConnect = (address) => {
    setUserAddress(address);
  };

  const completeChallenge = async (challenge) => {
    if (!userAddress) return;

    try {
      // In a real implementation, you'd call your smart contract here
      console.log('Completing challenge:', challenge.id);
      console.log('Minting NFT:', challenge.nft);
      
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to local NFTs (replace with actual blockchain call)
      setUserNFTs(prev => [...prev, {
        ...challenge.nft,
        id: Date.now(),
        challengeId: challenge.id
      }]);
      
      alert(`🎉 Challenge completed! You earned: ${challenge.nft.name}`);
    } catch (error) {
      console.error('Failed to complete challenge:', error);
      alert('Failed to complete challenge. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      <Head>
        <title>NFT Challenge Quest</title>
        <meta name="description" content="Complete fun challenges and earn hilarious NFTs!" />
      </Head>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎮 NFT Challenge Quest
              </h1>
            </div>
            <WalletConnector onConnect={handleWalletConnect} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {['challenges', 'collection', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-500'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!userAddress ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to NFT Challenge Quest!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Connect your wallet to start earning hilarious NFTs through fun challenges!
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'challenges' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Complete Challenges, Earn NFTs! 🏆
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CHALLENGES.map(challenge => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onComplete={completeChallenge}
                      userAddress={userAddress}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'collection' && (
              <NFTCollection nfts={userNFTs} />
            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard />
            )}
          </>
        )}
      </main>
    </div>
  );
}
