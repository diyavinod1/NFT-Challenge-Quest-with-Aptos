import { useState, useEffect } from 'react';

const WalletConnector = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.aptos) {
      try {
        const response = await window.aptos.connect();
        const account = await window.aptos.account();
        setAccount(account.address);
        setIsConnected(true);
        onConnect(account.address);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install Petra Wallet!');
    }
  };

  const disconnectWallet = async () => {
    if (window.aptos) {
      await window.aptos.disconnect();
      setIsConnected(false);
      setAccount(null);
      onConnect(null);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-green-400">●</span>
          <span className="text-sm">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </span>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnector;
