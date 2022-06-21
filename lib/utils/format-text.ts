export const cleanLabel = (label: string) => {
  return label.toLowerCase().trim();
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
