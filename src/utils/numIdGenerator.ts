import { customAlphabet } from 'nanoid';

const MAX_SAFE_DECIMAL_DIGITS = 15; // безопасно для Number

export const numIdGenerator = (length: number = 10): number => {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error('length must be a positive integer');
  }
  if (length > MAX_SAFE_DECIMAL_DIGITS) {
    throw new Error(
      `length too large: numeric id with length > ${MAX_SAFE_DECIMAL_DIGITS} will be unsafe. Use string/BigInt instead.`
    );
  }

  // first digit must be 1-9 to avoid leading zero (keeps exact length after Number())
  if (length === 1) {
    const first = customAlphabet('123456789', 1);
    return Number(first());
  }

  const first = customAlphabet('123456789', 1);
  const rest = customAlphabet('0123456789', length - 1);
  const idStr = first() + rest();
  const idNum = Number(idStr);

  if (!Number.isFinite(idNum) || Number.isNaN(idNum)) {
    throw new Error('generated invalid number');
  }
  if (idNum > Number.MAX_SAFE_INTEGER) {
    throw new Error('generated number exceeds Number.MAX_SAFE_INTEGER');
  }

  return idNum;
};
