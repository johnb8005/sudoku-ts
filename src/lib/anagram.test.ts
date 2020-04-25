import * as A from './anagram';

const dict = ['ana', 'gram'];

test('isAnagram', () => {
  expect(A.isAnagram('abc', 'cba')).toEqual(true);
  expect(A.isAnagram('abc', 'cbfa')).toEqual(false);
  expect(A.isAnagram('abc', 'cfa')).toEqual(false);
});

test('findAnagram', () => {
  expect(A.findAnagram('grma', dict)).toEqual(['gram']);
});
