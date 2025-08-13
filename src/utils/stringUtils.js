export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const formatFilter = str => {
  if (!str.includes('-')) {
    return capitalize(str);
  } else {
    let formatedFilter = str.replace('-', ' ');
    return formatedFilter.charAt(0).toUpperCase() + formatedFilter.slice(1).toLowerCase();
  }
};
