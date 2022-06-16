export const getInitials = (name: string) => {
  const nameSplit = name.split(' ');
  if (nameSplit.length === 1) {
    return nameSplit[0][0].toLocaleUpperCase();
  }

  return `${nameSplit[0][0]}${nameSplit[1][0]}`.toLocaleUpperCase();
};
