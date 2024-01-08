import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, onRestart, message, buttonText }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        {buttonText === "Start Game" ? (
          <button onClick={onRestart}>Start Game</button>
        ) : (
          <button onClick={onRestart}>Go Again?</button>
        )}
      </div>
    </div>
  );
};

export default Modal;
