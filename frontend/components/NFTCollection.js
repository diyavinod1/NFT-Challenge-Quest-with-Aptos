const NFTCollection = ({ nfts }) => {
  if (nfts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎁</div>
        <h2 className="text-3xl font-bold text-white mb-4">No NFTs Yet!</h2>
        <p className="text-xl text-white/80">
          Complete challenges to earn your first hilarious NFT!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Your NFT Collection 🎨
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-300 hover:scale-105 transition-transform">
            <div className="text-6xl text-center mb-4">{nft.emoji || '🖼️'}</div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              {nft.name}
            </h3>
            <p className="text-gray-600 text-center mb-4">{nft.description}</p>
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-bold">
                {nft.rarity} ⭐ Rarity
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTCollection;
