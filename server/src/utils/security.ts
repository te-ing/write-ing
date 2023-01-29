import crypto, { createPrivateKey, createPublicKey } from 'crypto';
import bcrypt from 'bcryptjs';

const privateKey = createPrivateKey(process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n'));
const publicKey = createPublicKey(process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n'));

export const encodeRSA = (text: string) => {
  const buffer = Buffer.from(text);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('hex');
};

export const decodeRSA = (text: string) => {
  const buffer = Buffer.from(text, 'hex');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

export const encodeHash = (text: string, saltLength = 10) => {
  const salt = bcrypt.genSaltSync(saltLength);
  const hashedText = bcrypt.hashSync(text, salt);
  return hashedText;
};
