export const translateGender = (g, isHe) => {
  if (!isHe) return g;
  if (g === 'Male') return 'זכר';
  if (g === 'Female') return 'נקבה';
  return g;
};

export const translateSize = (s, isHe) => {
  if (!isHe) return s;
  const map = { Small: 'קטן', Medium: 'בינוני', Large: 'גדול' };
  return map[s] ?? s;
};

export const translateAge = (a, isHe) => {
  if (!isHe) return a;
  const m = a.match(/^(\d+)\s+(year|years|month|months)$/);
  if (m) {
    const heUnit = { year: 'שנה', years: 'שנים', month: 'חודש', months: 'חודשים' }[m[2]];
    return `\u200F${m[1]} ${heUnit}`;
  }
  return a;
};
