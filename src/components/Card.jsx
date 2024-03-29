import "../styles/Card.css";
import Tilt from "react-parallax-tilt";
import cardBack from "../assets/card-back.png";

const Card = ({ id, name, image, flipped, handleCardClick }) => {
  return (
    <Tilt tiltReverse glareEnable glareReverse glarePosition="all">
      <div
        className={`card ${flipped ? "flipped" : ""}`}
        onClick={() => handleCardClick({ id, name, image })}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="pokeName">{name}</p>
            <img src={image} alt={name} />
          </div>
          <div className="flip-card-back">
            <img src={cardBack} alt={name} />
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
