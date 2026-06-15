function PetCard({ pet, onSelect, matchPercent }) {
  console.log('PetCard received:', pet.name, 'matchPercent =', matchPercent, typeof matchPercent);
  return (
    <article className="card pet-card">
      <img src={pet.image} alt={pet.name} className="pet-card-image" />
      <div className="pet-card-body">
        <div className="pet-card-content">
          <p className="pet-type">{pet.type}</p>
          <h3>{pet.name}</h3>
          <p className="pet-meta">{pet.age} · {pet.location}</p>
          <p className="pet-description">{pet.description}</p>
        </div>
        <div className="pet-footer">
          {matchPercent !== null && matchPercent !== undefined && (
            <span className="match-pill">{matchPercent}% match</span>
          )}
          <button className="button button-secondary" onClick={() => onSelect(pet.id)}>
            View profile
          </button>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
