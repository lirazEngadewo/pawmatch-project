import { describe, test, expect, beforeAll, vi } from 'vitest';
import { calculateMatchPercent } from '../utils/matching.js';
import pets from '../data/pets.js';

// Silence the temporary debug console.logs inside calculateMatchPercent
beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

const milo = pets.find((p) => p.id === 'milo'); // small, low-energy cat, 'מרכז'
const luna = pets.find((p) => p.id === 'luna'); // large, high-energy dog, 'השרון'

// ── Score reference ────────────────────────────────────────────────────────────
// petType   : match → 25  |  mismatch → 0  |  'both' → 25
// availability: exact → 25  |  adjacent → 12  |  2 apart → 0  |  unset → 0
// homeType  : 'house' → 15  |  'apartment' + small/med + low/med energy → 15  |  else → 0
// kids      : user has no kids → 15  |  user has kids + pet has kid-tag → 15  |  else → 0
// size      : exact (case-insensitive) → 10  |  no preference → 0
// location  : exact match → 10  |  no preference → 0
// ──────────────────────────────────────────────────────────────────────────────

describe('calculateMatchPercent', () => {

  test('scores 90 with Milo for a cat-seeking, low-availability, apartment, no-kids, small-size user', () => {
    // Expected: petType=25 + availability=25 + homeType=15 + kids=15 + size=10 + location=0 = 90
    const prefs = {
      completed: true,
      pet_type_preference: 'cat',
      availability: 'low',
      home_type: 'apartment',
      good_with_kids: false,
      preferred_size: 'small',
      preferred_location: null,
    };
    expect(calculateMatchPercent(milo, prefs)).toBe(90);
  });

  test('scores 65 with Luna for a dog-seeking, high-availability, house, has-kids user', () => {
    // Luna has no kid-friendly tag, so kids=0 despite user having kids
    // Expected: petType=25 + availability=25 + homeType=15 + kids=0 + size=0 + location=0 = 65
    const prefs = {
      completed: true,
      pet_type_preference: 'dog',
      availability: 'high',
      home_type: 'house',
      good_with_kids: true,
      preferred_size: null,
      preferred_location: null,
    };
    expect(calculateMatchPercent(luna, prefs)).toBe(65);
  });

  test('pet-type mismatch costs exactly 25 points: cat preference against a dog scores 25 less than dog preference', () => {
    // With only pet_type_preference set, the difference between matching and mismatching
    // species is exactly the 25-point petType weight.
    // cat prefs against Luna (dog): petType=0 + kids=15 (no kids pref) = 15
    // dog prefs against Luna (dog): petType=25 + kids=15 = 40
    const catPrefs = { completed: true, pet_type_preference: 'cat' };
    const dogPrefs = { completed: true, pet_type_preference: 'dog' };

    const catScore = calculateMatchPercent(luna, catPrefs);
    const dogScore = calculateMatchPercent(luna, dogPrefs);

    expect(catScore).toBe(15);
    expect(dogScore).toBe(40);
    expect(dogScore - catScore).toBe(25);
  });

  test('returns null when preferences are null, empty, or not completed', () => {
    expect(calculateMatchPercent(milo, null)).toBeNull();
    expect(calculateMatchPercent(milo, {})).toBeNull();
    expect(calculateMatchPercent(milo, { completed: false })).toBeNull();
    expect(calculateMatchPercent(milo, { completed: false, pet_type_preference: 'cat' })).toBeNull();
  });

});
