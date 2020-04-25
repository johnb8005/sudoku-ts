export const isAnagram = (w1:string, w2:string):boolean => {
  const w1arr = w1.split('');
  const w2arr = w2.split('');

  if (w2arr.length != w1arr.length) {
    return false;
  }

  return w1arr.map(c1 => {
    const wi = w2arr.indexOf(c1);

    if (wi > -1) {
      delete(w2arr[wi]);
      return true;
    }

    return false;
  })
  .reduce((a, b) => a && b);
}

export const findAnagram = (w:string, dict:string[]) => dict.filter(word => isAnagram(w, word));

export const findAndPrintAnagram = (w:string, dict:string[]) => {
  const anagrams:string[] = findAnagram(w, dict);

  anagrams.map(a => {
    console.log(`${a} is an anagram of ${w}`);
  });
}