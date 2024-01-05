import '../styles/Card.css'
import Tilt from 'react-parallax-tilt'

const Card = ({ id, name, image, handleCardClick }) => {
  
  return (
    <Tilt>
      <div className="card" 
      onClick={() => 
      handleCardClick({ id, name, image })}
      >
        <img src={image} alt={name} />
        <p className='pokeName'>{name}</p>
      </div>
    </Tilt>
  );
};

export default Card;
