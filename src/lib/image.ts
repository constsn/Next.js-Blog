import { writeFile } from 'fs/promises';
import path from 'path';

export const saveImage = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/images');

  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (err) {
    console.error('画像保存エラー', err);
  }
};
