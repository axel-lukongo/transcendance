"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateTwoFactorCode = void 0;
const crypto = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
const generateTwoFactorCode = () => {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();
    return code;
};
exports.generateTwoFactorCode = generateTwoFactorCode;
const generateAccessToken = (userId) => {
    const secret = process.env.CLIENT_SECRET_BACKEND;
    const expiresIn = '1d';
    const payload = { userId };
    return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn });
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=auth.utils.js.map