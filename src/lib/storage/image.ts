import { supabase } from '../supabaseClient';

export const saveImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from('cover-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('画像アップロードエラー', error.message);
    return null;
  }

  const { data } = supabase.storage.from('cover-images').getPublicUrl(filePath);

  return data.publicUrl;

  {
    /*const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/images');

  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (err) {
    console.error('画像保存エラー', err);
  } */
  }
};
