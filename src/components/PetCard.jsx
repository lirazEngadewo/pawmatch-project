function PetCard({ pet, onSelect }) {
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
          <span className="match-pill">{pet.matchPercent}% match</span>
          <button className="button button-secondary" onClick={() => onSelect(pet.id)}>
            View profile
          </button>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
