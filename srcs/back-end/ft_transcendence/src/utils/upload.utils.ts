import * as fs from 'fs';
import * as path from 'path'


export async function saveBase64ToFile(base64Link: string, userId: number): Promise<string> {

  const fileExtension = base64Link.substring("data:image/".length, base64Link.indexOf(";base64"))
    const base64Data = base64Link.split(';base64,').pop() || '';
    const binaryData = Buffer.from(base64Data, 'base64');

    const fileName = `avatar_${userId}.${fileExtension}`; // Nom du fichier avec l'identifiant de l'utilisateur et l'extension
    const uploadPath = '/ft_transcendence/src/uploads';
    const filePath = path.join(uploadPath, fileName);

    const avatarFileName = `avatar_${userId}`;
    const files = fs.readdirSync(uploadPath);
    files.forEach((file) => {
      // Vérifier si le nom du fichier contient 'avatar_${userId}'
      if (file.includes(avatarFileName)) {
        const filePath = path.join(uploadPath, file);
        // Supprimer le fichier
        fs.unlinkSync(filePath);
      }
    });
    
    fs.writeFileSync(filePath, binaryData);
    
    return fileName;
  }

export async function saveBase64ToFileChan(base64Link: string, chan_id: number): Promise<string> {

  const fileExtension = base64Link.substring("data:image/".length, base64Link.indexOf(";base64"))
  const base64Data = base64Link.split(';base64,').pop() || '';
  const binaryData = Buffer.from(base64Data, 'base64');

  const fileName = `logo_${chan_id}.${fileExtension}`; // Nom du fichier avec l'identifiant de l'utilisateur et l'extension
  const uploadPath = '/ft_transcendence/src/uploads';
  const filePath = path.join(uploadPath, fileName);

  const avatarFileName = `logo_${chan_id}`;
  const files = fs.readdirSync(uploadPath);
  files.forEach((file) => {
    // Vérifier si le nom du fichier contient 'avatar_${userId}'
    if (file.includes(avatarFileName)) {
      const filePath = path.join(uploadPath, file);
      // Supprimer le fichier
      fs.unlinkSync(filePath);
    }
  });
  
  fs.writeFileSync(filePath, binaryData);
  
  return fileName;
}