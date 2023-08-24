"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBase64ToFile = void 0;
const fs = require("fs");
const path = require("path");
async function saveBase64ToFile(base64Link, userId) {
    const fileExtension = base64Link.substring("data:image/".length, base64Link.indexOf(";base64"));
    const base64Data = base64Link.split(';base64,').pop() || '';
    const binaryData = Buffer.from(base64Data, 'base64');
    const fileName = `avatar_${userId}.${fileExtension}`;
    const uploadPath = '/ft_transcendence/src/uploads';
    const filePath = path.join(uploadPath, fileName);
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
//# sourceMappingURL=upload.utils.js.map