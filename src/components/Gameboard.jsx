import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import Scoreboard from "./Scoreboard";

const Gameboard = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);

  useEffect(() => {
    fetchCards();
    setScore(0)
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
    const randomIds = await fetchRandomCardIds(6);

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
      console.log("Handle Game Over");
      handleGameOver();
    } else {
      // User clicked on a new card
      const newClickedIds = [...clickedIds, clickedPokemon.id];
      console.log("New Clicked IDs:", newClickedIds);
      setClickedIds(newClickedIds);
      shuffleCards();

      // Check for a match
      if (newClickedIds.length === cards.length) {
        console.log("Handle Game Win");
        // All cards clicked - User wins!
        handleGameWin();
      } else {
        // Update current score and best score
        const newScore = newClickedIds.length;
        console.log("New Score:", newScore + 1);
        setScore(newScore);

        if (newScore > bestScore) {
          console.log("Set Best Score:", newScore);
          setBestScore(newScore);
        }
      }
    }
  };

  const handleGameOver = () => {
    setClickedIds([]);
    setScore(0);
    alert("Game Over! Try Again!");
    shuffleCards();
  };

  const handleGameWin = async () => {
    setClickedIds([]);
    setScore(0)
    alert("Congrats you win");
    await fetchRandomCardIds();
    await fetchCards();
  };

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
    <div className="game-board">
      <Scoreboard score={score} bestScore={bestScore} />
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} {...card} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Gameboard;