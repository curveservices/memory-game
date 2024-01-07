const StartModal = ({ isOpen, onClose, onStartGame, onViewRules }) => {
        if(!isOpen) return null;
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Play PokéMem?</h2>
                <p>Click Start Game to begin.</p>
                <button onClick={onStartGame}>Start Game</button>
                <button onClick={{onViewRules}}>View Rules</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default StartModal;