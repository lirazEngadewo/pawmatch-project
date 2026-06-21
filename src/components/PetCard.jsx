import { useTranslation } from 'react-i18next';
import { translateAge } from '../utils/petLocale.js';

function PetCard({ pet, onSelect, matchPercent }) {
  const { t, i18n } = useTranslation();
  const isHe = i18n.language === 'he';

  const displayName = isHe && pet.name_he ? pet.name_he : pet.name;
  const displayDescription = isHe && pet.short_description_he ? pet.short_description_he : pet.description;
  const displayType = isHe && pet.type_he ? pet.type_he : pet.type;

  return (
    <article className="card pet-card">
      <img src={pet.image} alt={pet.name} className="pet-card-image" />
      <div className="pet-card-body">
        <div className="pet-card-content">
          <p className="pet-type">{displayType}</p>
          <h3>{displayName}</h3>
          <p className="pet-meta">{translateAge(pet.age, isHe)} · {isHe && pet.location_he ? pet.location_he : pet.location}</p>
          <p className="pet-description">{displayDescription}</p>
        </div>
        <div className="pet-footer">
          {matchPercent !== null && matchPercent !== undefined && (
            <span className="match-pill">{matchPercent}% match</span>
          )}
          <button className="button button-secondary" onClick={() => onSelect(pet.id)}>
            {t('landing.viewFullProfile')}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
