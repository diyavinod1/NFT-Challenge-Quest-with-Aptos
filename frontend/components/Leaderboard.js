const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, address: '0x742d...1a3b', points: 1500, nfts: 15 },
    { rank: 2, address: '0x8a9f...2c4d', points: 1200, nfts: 12 },
    { rank: 3, address: '0x3b5c...7e9f', points: 900, nfts: 9 },
    { rank: 4, address: '0x1d2a...5b6c', points: 750, nfts: 8 },
    { rank: 5, address: '0x9e8f...3a4b', points: 600, nfts: 6 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        🏆 Leaderboard
      </h2>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  player.rank === 1 ? 'bg-yellow-400 text-white' :
                  player.rank === 2 ? 'bg-gray-400 text-white' :
                  player.rank === 3 ? 'bg-orange-400 text-white' :
                  'bg-purple-200 text-purple-600'
                }`}>
                  {player.rank}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{player.address}</div>
                  <div className="text-sm text-gray-600">{player.nfts} NFTs</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-purple-600">{player.points} pts</div>
                <div className="text-sm text-gray-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < Math.ceil(player.nfts / 3) ? '⭐' : '☆'}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
