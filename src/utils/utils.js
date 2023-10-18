export function searchFilter(movieArray, keyword, isShortMovies) {
  return movieArray.filter((movieCard) => {
    const isMatchingKeyword = keyword.length === '' ||
      movieCard.nameRU.toLowerCase().includes(keyword.toLowerCase().trim()) ||
      movieCard.nameEN.toLowerCase().includes(keyword.toLowerCase().trim());
    const isShortDuration = movieCard.duration < 40;

    if (isShortMovies) {
      return isMatchingKeyword && isShortDuration;
    } else {
      return isMatchingKeyword;
    }
  });
}