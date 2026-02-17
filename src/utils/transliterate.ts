const TRANSLIT_MAP: Record<string, string> = {
  // Русский
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'y',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',

  // Украинский
  ґ: 'g',
  є: 'ye',
  і: 'i',
  ї: 'yi',
};

export const transliterate = (text: string): string => {
  return (
    text
      .toLowerCase()
      .trim()
      // транслитерация RU + UA
      .replace(/[а-яёіїєґ]/g, char => TRANSLIT_MAP[char] ?? char)
      // всё, кроме латиницы и цифр → пробел
      .replace(/[^a-z0-9]+/g, ' ')
      // пробелы → дефис
      .trim()
      .replace(/\s+/g, '-')
  );
};
