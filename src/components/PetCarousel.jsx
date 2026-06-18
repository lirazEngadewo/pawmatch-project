import { useState, useRef, useEffect } from 'react';
import PetCard from './PetCard.jsx';
import { calculateMatchPercent } from '../utils/matching.js';

const TRACK_GAP = 24;

function PetCarousel({ pets, onSelectPet, userPreferences }) {
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const cpp = w <= 480 ? 1 : w <= 768 ? 2 : 3;
      setCardsPerPage(cpp);
      setPage(0);
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.ceil(pets.length / cardsPerPage);

  // Integer card width eliminates sub-pixel rounding drift across pages.
  // Floor so 3 cards never exceed viewportWidth (avoids a 1px overflow on the right).
  const cardWidth = viewportWidth > 0
    ? Math.floor((viewportWidth - (cardsPerPage - 1) * TRACK_GAP) / cardsPerPage)
    : null;

  // One page = N cards + N inter-item gaps (including the gap that separates pages).
  // Basing the translation on cardWidth (not viewportWidth) keeps it in sync with
  // the actual rendered pixel positions, so there is zero accumulation error.
  const pageWidth = cardWidth !== null ? cardsPerPage * (cardWidth + TRACK_GAP) : 0;
  const translateX = -page * pageWidth;

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="pet-carousel">
      <div className="pet-carousel-nav">
        <button
          className="pet-carousel-arrow"
          onClick={goPrev}
          disabled={page === 0}
          aria-label="Previous page"
        >
          ←
        </button>

        <div className="pet-carousel-viewport" ref={viewportRef}>
          <div
            className="pet-carousel-track"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {pets.map((pet) => {
              const matchPercent = calculateMatchPercent(pet, userPreferences);
              return (
                <div
                  key={pet.id}
                  className="pet-carousel-item"
                  style={cardWidth ? { width: `${cardWidth}px`, flex: `0 0 ${cardWidth}px` } : undefined}
                >
                  <PetCard pet={pet} onSelect={onSelectPet} matchPercent={matchPercent} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="pet-carousel-arrow"
          onClick={goNext}
          disabled={page >= totalPages - 1}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      <div className="pet-carousel-dots">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`pet-carousel-dot${i === page ? ' active' : ''}`}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1} of ${totalPages}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PetCarousel;
