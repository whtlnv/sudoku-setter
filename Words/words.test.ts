import {
  assert,
  assertEquals,
  assertNotEquals,
} from 'https://deno.land/std@0.126.0/testing/asserts.ts';
import { countLetters, removeWord, selectRandomWord } from './words.ts';

Deno.test('Should count letters from a word', () => {
  const words = ['abc'];
  const expected = {
    a: 1,
    b: 1,
    c: 1,
  };
  assertEquals(countLetters(words), expected);
});

Deno.test('Should count letters from several words', () => {
  const words = ['abc', 'adef'];
  const expected = {
    a: 2,
    b: 1,
    c: 1,
    d: 1,
    e: 1,
    f: 1,
  };
  assertEquals(countLetters(words), expected);
});

Deno.test('Should select a random word from a list', () => {
  const words = [...Array(100).keys()].map((i) => `word${i}`);

  const random1 = selectRandomWord(words);
  const random2 = selectRandomWord(words);

  assert(words.includes(random1));
  assert(words.includes(random2));
  assertNotEquals(random1, random2);
});

Deno.test('Should delete a word from a list', () => {
  const words = [...Array(100).keys()].map((i) => `word${i}`);
  const word = words[Math.floor(Math.random() * words.length)];

  const remaining = removeWord(words, word);

  assert(words.includes(word));
  assert(!remaining.includes(word));
});
