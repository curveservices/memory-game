// components/Scoreboard.js
import "../styles/Scoreboard.css";

const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="scoreboard">
      <p>
        Score: <span className="number">{score}</span>
      </p>
      <p>
        Best Score: <span className="number">{bestScore}</span>
      </p>
    </div>
  );
};

export default Scoreboard;
