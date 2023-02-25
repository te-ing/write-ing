import { getPublicKey } from 'api/auth.api';
import { publicEncrypt } from 'crypto';

export const rsaEncode = async (text: string): Promise<string> => {
  const publicKey = await getPublicKey();
  const buffer = Buffer.from(text);
  const encodedText = publicEncrypt(publicKey, buffer).toString('hex');
  return encodedText;
};
