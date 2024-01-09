export const levelWithSuffix = (level) => {
  // converts an integer level (like 1, 2, 3, etc.)
  // to a string that includes a suffix used for ranking (1st, 2nd, 3rd, etc.)
  switch (level % 10) {
    case 1:
      return `${level}st`;
    case 2:
      return `${level}nd`;
    case 3:
      return `${level}rd`;
    default:
      return `${level}th`;
  }
};
