
const Card = ({ id, name, image, handleCardClick }) => {
    return (
        <div  className="card" onClick={() => handleCardClick(id)} >
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    );
};

export default Card;