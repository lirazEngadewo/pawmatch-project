import { useTranslation } from 'react-i18next';

function RegistrationModal({ onClose, onNavigate }) {
  const { t } = useTranslation();

  const handleRegister = () => {
    onClose();
    onNavigate('register');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{t('registrationModal.title')}</h2>
        <p className="modal-message">{t('registrationModal.message')}</p>
        <div className="modal-actions">
          <button className="button button-primary" onClick={handleRegister}>
            {t('registrationModal.register')}
          </button>
          <button className="modal-later-btn" onClick={onClose}>
            {t('registrationModal.later')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;
