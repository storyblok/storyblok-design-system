/**
 * @method truncate
 * @param  {Number} letters max letters numbers
 * @param  {String} word    word to analyze
 * @return {String} truncated word
 */
export const truncate = (letters, word) => {
  if (word.length > letters) {
    return word.slice(0, letters) + '...'
  }

  return word
}
