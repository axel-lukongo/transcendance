"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBase64ToFileChan = exports.saveBase64ToFile = void 0;
const fs = require("fs");
const path = require("path");
async function saveBase64ToFile(base64Link, userId) {
    console.log(' ===============');
    const fileExtension = base64Link.substring("data:image/".length, base64Link.indexOf(";base64"));
    const base64Data = base64Link.split(';base64,').pop() || '';
    const binaryData = Buffer.from(base64Data, 'base64');
    const fileName = `avatar_${userId}.${fileExtension}`;
    const uploadPath = '/ft_transcendence/src/uploads';
    const filePath = path.join(uploadPath, fileName);
    console.log(' ===11223232323');
    const avatarFileName = `avatar_${userId}`;
    const files = fs.readdirSync(uploadPath);
    files.forEach((file) => {
        if (file.includes(avatarFileName)) {
            const filePath = path.join(uploadPath, file);
            fs.unlinkSync(filePath);
        }
    });
    fs.writeFileSync(filePath, binaryData);
    return fileName;
}
exports.saveBase64ToFile = saveBase64ToFile;
async function saveBase64ToFileChan(base64Link, chan_id) {
    const fileExtension = base64Link.substring("data:image/".length, base64Link.indexOf(";base64"));
    const base64Data = base64Link.split(';base64,').pop() || '';
    const binaryData = Buffer.from(base64Data, 'base64');
    const fileName = `logo_${chan_id}.${fileExtension}`;
    const uploadPath = '/ft_transcendence/src/uploads';
    const filePath = path.join(uploadPath, fileName);
    const avatarFileName = `logo_${chan_id}`;
    const files = fs.readdirSync(uploadPath);
    files.forEach((file) => {
        if (file.includes(avatarFileName)) {
            const filePath = path.join(uploadPath, file);
            fs.unlinkSync(filePath);
        }
    });
    fs.writeFileSync(filePath, binaryData);
    return fileName;
}
exports.saveBase64ToFileChan = saveBase64ToFileChan;
//# sourceMappingURL=upload.utils.js.map