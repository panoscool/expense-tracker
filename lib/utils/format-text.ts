export const trimToLowerCaseString = (str: string) => {
  return str.toLowerCase().trim();
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
