const ENERGY_LEVELS = ['low', 'medium', 'high'];
const KID_FRIENDLY_TAGS = ['Good with kids', 'Great with kids', 'Friendly with kids'];

function mapEnergyLevel(energyLevelText) {
  const text = (energyLevelText || '').toLowerCase();
  if (text.startsWith('very high') || text.startsWith('medium-high') || text.startsWith('high')) return 'high';
  if (text.startsWith('low-medium') || text.startsWith('medium')) return 'medium';
  if (text.startsWith('low')) return 'low';
  return 'medium';
}

function petTypeScore(petTypePreference, species) {
  if (petTypePreference === 'both') return 25;
  return petTypePreference === species ? 25 : 0;
}

function availabilityScore(availability, petEnergy) {
  if (!availability) return 0;
  if (availability === petEnergy) return 25;
  const diff = Math.abs(ENERGY_LEVELS.indexOf(availability) - ENERGY_LEVELS.indexOf(petEnergy));
  return diff === 1 ? 12 : 0;
}

function homeTypeScore(homeType, size, petEnergy) {
  if (homeType === 'house') return 15;
  if (homeType === 'apartment') {
    const sizeLower = (size || '').toLowerCase();
    if (sizeLower === 'large' || petEnergy === 'high') return 0;
    if ((sizeLower === 'small' || sizeLower === 'medium') && (petEnergy === 'low' || petEnergy === 'medium')) return 15;
    return 7;
  }
  return 0;
}

function kidsScore(goodWithKids, tags) {
  if (!goodWithKids) return 15;
  const hasKidFriendlyTag = (tags || []).some((tag) => KID_FRIENDLY_TAGS.includes(tag));
  return hasKidFriendlyTag ? 15 : 0;
}

function sizeScore(preferredSize, size) {
  if (!preferredSize || !size) return 0;
  return preferredSize.toLowerCase() === size.toLowerCase() ? 10 : 0;
}

const CITY_TO_REGION = {
  'Tel Aviv':       'Center',
  'Ramat Gan':      'Center',
  'Herzliya':       'Sharon',
  'Hod HaSharon':   'Sharon',
  'Rishon LeZion':  'Shephelah',
  'Rehovot':        'Shephelah',
  'Haifa':          'Haifa and Krayot',
  'Kiryat Bialik':  'Haifa and Krayot',
  'Tiberias':       'Lower Galilee',
  'Nazareth':       'Lower Galilee',
  'Safed':          'Upper Galilee',
  'Kiryat Shmona':  'Upper Galilee',
  'Jerusalem':      'Jerusalem',
  'Beit Shemesh':   'Jerusalem',
  "Be'er Sheva":    'South',
  'Eilat':          'South',
};

function locationScore(preferredRegion, city) {
  if (!preferredRegion || !city) return 0;
  const region = CITY_TO_REGION[city] ?? city;
  return region === preferredRegion ? 10 : 0;
}

export function calculateMatchPercent(pet, userPreferences) {
  if (!userPreferences?.completed) {
    console.log('calculateMatchPercent:', pet.name, '-> null (userPreferences.completed is', userPreferences?.completed, ')');
    return null;
  }

  const petEnergy = mapEnergyLevel(pet.healthCare?.energyLevel);

  const breakdown = {
    petType: petTypeScore(userPreferences.pet_type_preference, pet.species),
    availability: availabilityScore(userPreferences.availability, petEnergy),
    homeType: homeTypeScore(userPreferences.home_type, pet.size, petEnergy),
    kids: kidsScore(userPreferences.good_with_kids, pet.tags),
    size: sizeScore(userPreferences.preferred_size, pet.size),
    location: locationScore(userPreferences.preferred_location, pet.location),
  };

  const score = Object.values(breakdown).reduce((sum, v) => sum + v, 0);
  const result = Math.min(100, Math.max(0, score));
  console.log('calculateMatchPercent:', pet.name, '-> ', result, breakdown);

  return result;
}
