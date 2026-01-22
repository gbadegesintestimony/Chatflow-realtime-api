import CryptoJS from "crypto-js";

const SECRET = process.env.E2E_SECRET || "chatflow_secret_key";

export const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET).toString();
};

export const decryptMessage = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};
