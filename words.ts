/**
 * Count the number of letters in an array of strings
 * @param {[string]} words
 * @returns {object} Letter count
 */

export function countLetters(words: string[]): Record<string, number> {
  const letterCounter: Record<string, number> = {};
  words.forEach((word) => {
    word.split('').forEach((letter) => {
      if (letterCounter[letter]) {
        letterCounter[letter]++;
      } else {
        letterCounter[letter] = 1;
      }
    });
  });
  return letterCounter;
}

export function selectRandomWord(words: string[]) {
  return words[Math.floor(Math.random() * words.length)];
}

export function removeWord(words: string[], word: string) {
  return words.filter((w) => w !== word);
}
