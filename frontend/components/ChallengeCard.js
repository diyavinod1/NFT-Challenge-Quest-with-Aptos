const ChallengeCard = ({ challenge, onComplete, userAddress }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    if (!userAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      // Simulate challenge completion
      if (challenge.type === 'quiz') {
        const answer = prompt(challenge.question);
        if (answer?.toLowerCase() === challenge.answer.toLowerCase()) {
          await onComplete(challenge);
          setIsCompleted(true);
        } else {
          alert('Wrong answer! Try again!');
        }
      } else if (challenge.type === 'click') {
        alert('Click the dancing element when it appears!');
        // This would trigger a mini-game in real implementation
        await onComplete(challenge);
        setIsCompleted(true);
      } else if (challenge.type === 'easter-egg') {
        const found = confirm('Have you found the hidden Easter egg?');
        if (found) {
          await onComplete(challenge);
          setIsCompleted(true);
        }
      }
    } catch (error) {
      console.error('Challenge completion failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl">{challenge.emoji}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
          <p className="text-gray-600">{challenge.description}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          {challenge.rarity}⭐
        </span>
        
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            isCompleted
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          {isCompleted ? 'Completed! 🎉' : 'Start Challenge'}
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
