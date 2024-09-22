import crypto from "crypto";
import { CHAR_SET } from "./data/char-set";

export const generateDeterministicString = (input: string): string => {
  const hash = crypto.createHash("sha256").update(input).digest("hex");

  const randomString = hash.slice(0, 8);

  return randomString;
};

export default generateDeterministicString;
