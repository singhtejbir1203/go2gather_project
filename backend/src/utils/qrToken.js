import jwt from "jsonwebtoken";

export const generateQrToken = ({ payload, expiresAt }) => {
  return jwt.sign(payload, process.env.QR_SECRET, {
    expiresIn: Math.floor((expiresAt - Date.now()) / 1000),
  });
};

export const verifyQrToken = (token) => {
  return jwt.verify(token, process.env.QR_SECRET);
};
