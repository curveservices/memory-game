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
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=');
            const fetchedCards = response.data.results.map((pokemon, index) => ({
                id: index,
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            }));
            setCards(fetchedCards);
        }   catch(error) {
            console.log('Error fetching cards:', error);
        }
    };

    const handleCardClick = (clickedPokemon) => {
        if (clickedIds.includes(clickedPokemon.id)) {
            handleGameOver();
        } else {
            const newClickedIds = [...clickedIds, clickedPokemon.id];
            setClickedIds(newClickedIds);

        if (newClickedIds.length === cards.length) {
            handleGameWin();
        } else {
            const newScore = score + 1;
            setScore(newScore);
            if (newScore > bestScore) {
                setBestScore(newScore);
            }
          }
        }
    };

    const handleGameOver = () => {
        setClickedIds([]);
        setScore(0);
        alert('Game Over! Try Again!');
        shuffleCards();
    };

    const handleGameWin = () => {
        setClickedIds([]);
        setScore(0);
        alert('Congrats you win');
        shuffleCards();
    };

    const shuffleCards = () => {
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }

        setCards(shuffledCards);
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

