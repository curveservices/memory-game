import '../styles/Card.css'

const Card = ({ id, name, image, handleCardClick }) => {
  return (
    <div className="card" onClick={() => handleCardClick({ id, name, image })}>
      <img src={image} alt={name} />
      <p className='pokeName'>{name}</p>
    </div>
  );
};

export default Card;
