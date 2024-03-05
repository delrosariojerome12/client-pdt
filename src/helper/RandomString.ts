import * as Crypto from "expo-crypto";

export const generateRandomString = async (length: number) => {
  const randomBytes = await Crypto.getRandomBytesAsync(length);
  const byteIntegers = Array.from(randomBytes);
  const hexString = byteIntegers
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hexString;
};
