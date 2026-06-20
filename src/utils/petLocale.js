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
  return a
    .replace(/\byears\b/, 'שנים')
    .replace(/\byear\b/, 'שנה')
    .replace(/\bmonths\b/, 'חודשים')
    .replace(/\bmonth\b/, 'חודש');
};
