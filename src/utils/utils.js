export function filterByKeyword(movieArray, keyword) {
  return movieArray.filter((movieCard) => {
    return keyword.length === '' ||
      movieCard.nameRU.toLowerCase().includes(keyword.toLowerCase().trim()) ||
      movieCard.nameEN.toLowerCase().includes(keyword.toLowerCase().trim());
  });
}

export function filterByIsShortMovies(movieArray, isShortMovies) {
  return movieArray.filter((movieCard) => {
    const isShortDuration = movieCard.duration < 40;
    return isShortMovies ? isShortDuration : true;
  });
}

