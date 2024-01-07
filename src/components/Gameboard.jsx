import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import Scoreboard from "./Scoreboard";
import Modal from "./Modal";

const Gameboard = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({
    message: '',
    buttonText: '',
    onRestart: () => {},
  });

  useEffect(() => {
    fetchCards();
    setModalContent({
      message: 'Click Start Game to play',
      buttonText: 'Start Game',
      onRestart: handleStartGame,
    });
    setModalOpen(true);
  }, []);

  const fetchRandomCardIds = async (count) => {
    try {
      const allPokemonIds = Array.from(
        { length: 1000 },
        (_, index) => index + 1,
      );
      // Shuffle the array of all Pokemon IDs
      const shuffledIds = shuffleArray(allPokemonIds);
      // Select the first 'count' IDs from the shuffled array
      const randomIds = shuffledIds.slice(0, count);

      return randomIds;
    } catch (error) {
      console.error("Error fetching random card IDs:", error);
      return [];
    }
  };

  const fetchCards = async () => {
    const randomIds = await fetchRandomCardIds(5);

    try {
      const fetchedCards = await Promise.all(
        randomIds.map(async (id) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
          );
          const pokemon = response.data;

          return {
            id: pokemon.id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        }),
      );

      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleCardClick = (clickedPokemon) => {
    if (clickedIds.includes(clickedPokemon.id)) {
      // User clicked on the same card twice - Game Over
      handleGameOver();
    } else {
      // User clicked on a new card
      const newClickedIds = [...clickedIds, clickedPokemon.id];
      setClickedIds(newClickedIds);
      shuffleCards();

      const newScore = newClickedIds.length;
      setScore(newScore);
      
      if (newScore > bestScore) {
          setBestScore(newScore);
        }
      // Check for a win
      if (newScore === cards.length) {
        // All cards clicked - User wins!
        handleGameWin();
    }
  }

    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        flipped: true,
      }))
    );

    setTimeout(() => {
      setCards((prevCards) => 
        prevCards.map((card) => ({
          ...card,
          flipped: false,
        }))
      );
    }, 500);
  };

  const handleStartGame = () => {
    setModalOpen(false);
    
  }

  const handleGameOver = () => {
    setClickedIds([]);
    setScore(0);
    setModalContent({
      message: 'Game Over! Try Again!',
      buttonText: 'Restart',
      onRestart: restartGame,
    });
    setModalOpen(true)
  };

  const handleGameWin = () => {
    console.log("handle game win")
    setClickedIds([]);
    setModalContent({
      message: 'Congrats you win!',
      buttonText: 'Play Again',
      onRestart: restartGame,
    });
    fetchRandomCardIds();
    fetchCards();
    setModalOpen(true)
  };

  const restartGame = () => {
    setModalOpen(false);
    fetchRandomCardIds();
    fetchCards();
  }

  const shuffleCards = () => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

    setCards(shuffledCards);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <main className="game-board">
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card 
          key={card.id} 
          {...card} 
          handleCardClick={(clickedPokemon) => handleCardClick(clickedPokemon, index)}/>
        ))}
      </div>
      <Modal 
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      onRestart={modalContent.onRestart}
      message={modalContent.message}
      buttonText={modalContent.buttonText}
      />
    </main>
  );
};

export default Gameboard;
