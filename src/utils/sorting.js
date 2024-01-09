export const rankByStringMatch = (x, query) => {
  if (x.toLowerCase().startsWith(query.toLowerCase())) {
    return 10;
  } else if (x.toLowerCase().includes(query.toLowerCase())) {
    return 1;
  }
  return 0;
};
