import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const emojis = ['🎮', '🎲', '🎯', '🎪'];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || cards[cardId].isMatched || cards[cardId].isFlipped) {
      return;
    }

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every(card => card.isMatched)) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[secondCard].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            Memory Game
            <Sparkles className="w-8 h-8" />
          </h1>
          <div className="flex justify-center gap-4 text-white mb-4">
            <p className="text-lg">Moves: {moves}</p>
            <button
              onClick={initializeGame}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
            >
              New Game
            </button>
          </div>
        </div>

        {gameWon ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Congratulations! 🎉</h2>
            <p className="text-gray-600 mb-4">You won in {moves} moves!</p>
            <button
              onClick={initializeGame}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg text-4xl flex items-center justify-center transition-all duration-300 transform ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white rotate-0'
                    : 'bg-purple-700 rotate-y-180'
                } ${card.isMatched ? 'opacity-50' : ''}`}
                disabled={card.isMatched}
              >
                {(card.isFlipped || card.isMatched) && card.emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;