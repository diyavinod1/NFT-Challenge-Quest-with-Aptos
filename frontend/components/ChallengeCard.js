import { useState } from 'react';

// Aptos Integration Helper Function
const mintNFTOnAptos = async (userAddress, nftData) => {
  if (!window.aptos) {
    throw new Error('Please install Petra Wallet from https://petra.app/');
  }

  try {
    // Connect to wallet first (in case not connected)
    await window.aptos.connect();
    
    const MODULE_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS'; // Replace with your deployed contract address
    
    const transaction = {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESS}::nft_challenge::mint_nft`,
      arguments: [
        Array.from(new TextEncoder().encode(nftData.name)),
        Array.from(new TextEncoder().encode(nftData.description)),
        Array.from(new TextEncoder().encode(nftData.image_url)),
        nftData.rarity
      ],
      type_arguments: []
    };

    console.log('Transaction payload:', transaction);
    
    // Sign and submit the transaction
    const response = await window.aptos.signAndSubmitTransaction(transaction);
    console.log('Transaction submitted:', response);
    
    return {
      success: true,
      hash: response.hash,
      message: 'NFT minted successfully!'
    };
  } catch (error) {
    console.error('Aptos minting error:', error);
    throw new Error(`Failed to mint NFT: ${error.message}`);
  }
};

const ChallengeCard = ({ challenge, onComplete, userAddress }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');

  const handleComplete = async () => {
    if (!userAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    // Step 1: Complete the challenge task
    let taskCompleted = false;
    
    if (challenge.type === 'quiz') {
      const answer = prompt(challenge.question);
      taskCompleted = answer?.toLowerCase() === challenge.answer.toLowerCase();
      if (!taskCompleted) {
        alert('Wrong answer! Try again!');
        return;
      }
    } 
    else if (challenge.type === 'click') {
      // Simple click game simulation
      let clicks = 0;
      const requiredClicks = 5;
      
      alert(`Quick! Click OK ${requiredClicks} times as fast as you can!`);
      
      for (let i = 0; i < requiredClicks; i++) {
        const clicked = confirm(`Click ${i + 1}/${requiredClicks}. Ready?`);
        if (!clicked) {
          alert('Too slow! Try again!');
          return;
        }
      }
      taskCompleted = true;
    } 
    else if (challenge.type === 'easter-egg') {
      // Easter egg hunt simulation
      const secretCode = Math.random().toString(36).substring(7);
      const userCode = prompt(`Find the hidden Easter egg! Secret code: ${secretCode}\n\nEnter the code above to claim your NFT:`);
      taskCompleted = userCode === secretCode;
      if (!taskCompleted) {
        alert('Wrong code! The Easter egg remains hidden...');
        return;
      }
    }

    if (!taskCompleted) return;

    // Step 2: Mint NFT on Aptos
    setIsMinting(true);
    setMintStatus('Minting your NFT...');

    try {
      // Call the Aptos minting function
      const mintResult = await mintNFTOnAptos(userAddress, challenge.nft);
      
      if (mintResult.success) {
        setIsCompleted(true);
        setMintStatus(`✅ NFT Minted! Transaction: ${mintResult.hash.slice(0, 10)}...`);
        
        // Notify parent component
        onComplete(challenge);
        
        // Show success message
        alert(`
          🎉 Congratulations! 
          You've earned: ${challenge.nft.name}
          
          Transaction Hash: ${mintResult.hash}
          View on explorer: https://explorer.aptoslabs.com/txn/${mintResult.hash}
        `);
      }
    } catch (error) {
      console.error('Minting failed:', error);
      setMintStatus('❌ Minting failed. Please try again.');
      alert(`Minting failed: ${error.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl animate-bounce-slow">{challenge.emoji}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
          <p className="text-gray-600 mb-3">{challenge.description}</p>
          
          {/* NFT Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-3 border border-purple-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎁</span>
              <span className="font-semibold text-purple-700">Reward:</span>
              <span className="text-gray-700">{challenge.nft.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Rarity Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 rounded-full text-sm font-medium">
              {Array(challenge.rarity).fill('⭐').join('')} Rarity
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
              Type: {challenge.type}
            </span>
          </div>
          
          {/* Challenge Status */}
          {isCompleted && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
              ✅ Completed
            </span>
          )}
        </div>
        
        {/* Minting Status */}
        {mintStatus && (
          <div className={`text-sm p-2 rounded ${mintStatus.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {mintStatus}
          </div>
        )}
        
        {/* Action Button */}
        <button
          onClick={handleComplete}
          disabled={isCompleted || isMinting || !userAddress}
          className={`
            w-full py-3 rounded-lg font-bold transition-all duration-300
            ${isCompleted 
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white cursor-not-allowed' 
              : isMinting
              ? 'bg-gradient-to-r from-purple-400 to-purple-300 text-white cursor-wait'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:shadow-lg'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isMinting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Minting NFT...
            </span>
          ) : isCompleted ? (
            '🎉 NFT Earned!'
          ) : (
            'Start Challenge & Mint NFT'
          )}
        </button>
        
        {/* Wallet Not Connected Warning */}
        {!userAddress && (
          <div className="text-center text-sm text-red-600 bg-red-50 p-2 rounded">
            ⚠️ Connect your wallet to start this challenge
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
