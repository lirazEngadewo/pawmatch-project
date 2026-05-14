function RegistrationModal({ onClose, onNavigate }) {
  const handleRegister = () => {
    onClose();
    onNavigate('register');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Registration Required</h2>
        <p className="modal-message">
          To like pets, save favorites, or send adoption requests, you need to create an account first.
        </p>
        <div className="modal-actions">
          <button className="button button-primary" onClick={handleRegister}>
            Click here to register
          </button>
          <button className="modal-later-btn" onClick={onClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;
