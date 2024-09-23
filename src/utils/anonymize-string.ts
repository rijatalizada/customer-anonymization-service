import crypto from 'crypto';

export const generateDeterministicString = (input: string): string => {
  const hash = crypto.createHash('sha256').update(input).digest('hex');

  const randomString = hash.slice(0, 8);

  return randomString;
};

export const anonymizeEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  return `${generateDeterministicString(localPart)}@${domain}`;
};

export default generateDeterministicString;
