export const numberToUkrainianCurrency = (amount: number): string => {
  const ones = [
    '',
    'одна',
    'дві',
    'три',
    'чотири',
    'п’ять',
    'шість',
    'сім',
    'вісім',
    'дев’ять',
  ];
  const onesMasculine = [
    '',
    'один',
    'два',
    'три',
    'чотири',
    'п’ять',
    'шість',
    'сім',
    'вісім',
    'дев’ять',
  ];
  const teens = [
    'десять',
    'одинадцять',
    'дванадцять',
    'тринадцять',
    'чотирнадцять',
    'п’ятнадцять',
    'шістнадцять',
    'сімнадцять',
    'вісімнадцять',
    'дев’ятнадцять',
  ];
  const tens = [
    '',
    'десять',
    'двадцять',
    'тридцять',
    'сорок',
    'п’ятдесят',
    'шістдесят',
    'сімдесят',
    'вісімдесят',
    'дев’яносто',
  ];
  const hundreds = [
    '',
    'сто',
    'двісті',
    'триста',
    'чотириста',
    'п’ятсот',
    'шістсот',
    'сімсот',
    'вісімсот',
    'дев’ятсот',
  ];

  const units = [
    { one: 'гривня', few: 'гривні', many: 'гривень', gender: 'f' },
    { one: 'тисяча', few: 'тисячі', many: 'тисяч', gender: 'f' },
    { one: 'мільйон', few: 'мільйони', many: 'мільйонів', gender: 'm' },
    { one: 'мільярд', few: 'мільярди', many: 'мільярдів', gender: 'm' },
  ];

  function getForm(
    n: number,
    forms: { one: string; few: string; many: string }
  ): string {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n100 >= 11 && n100 <= 19) return forms.many;
    if (n10 === 1) return forms.one;
    if (n10 >= 2 && n10 <= 4) return forms.few;
    return forms.many;
  }

  function tripletToWords(num: number, gender: 'm' | 'f'): string {
    const words: string[] = [];
    const h = Math.floor(num / 100);
    const t = Math.floor((num % 100) / 10);
    const o = num % 10;

    if (h > 0) words.push(hundreds[h]);

    if (t > 1) {
      words.push(tens[t]);
      if (o > 0) words.push(gender === 'm' ? onesMasculine[o] : ones[o]);
    } else if (t === 1) {
      words.push(teens[o]);
    } else if (o > 0) {
      words.push(gender === 'm' ? onesMasculine[o] : ones[o]);
    }

    return words.join(' ');
  }

  const integerPart = Math.floor(amount);
  const fractionalPart = Math.round((amount - integerPart) * 100);

  if (integerPart === 0) {
    return `Нуль гривень ${fractionalPart.toString().padStart(2, '0')} копійок`;
  }

  const words: string[] = [];
  let tripletIndex = 0;
  let number = integerPart;

  while (number > 0) {
    const triplet = number % 1000;
    if (triplet > 0) {
      const unit = units[tripletIndex];
      words.unshift(
        `${tripletToWords(triplet, unit.gender as 'm' | 'f')} ${getForm(
          triplet,
          unit
        )}`
      );
    }
    number = Math.floor(number / 1000);
    tripletIndex++;
  }

  return (
    words.join(' ').trim() +
    ` ${fractionalPart.toString().padStart(2, '0')} ` +
    getForm(fractionalPart, {
      one: 'копійка',
      few: 'копійки',
      many: 'копійок',
    })
  );
};
