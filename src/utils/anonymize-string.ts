import crypto from "crypto";
import { CHAR_SET } from "./data/char-set";

function stringToPseudoRandom(input: string) {
  const hash = crypto.createHash("sha256").update(input).digest("hex");

  const result = [];
  for (let i = 0; i < 8; i++) {
    const hashIndex =
      parseInt(hash.substring(i * 2, i * 2 + 2), 16) % CHAR_SET.length;
    result.push(CHAR_SET[hashIndex]);
  }

  return result.join("");
}

export default stringToPseudoRandom;
