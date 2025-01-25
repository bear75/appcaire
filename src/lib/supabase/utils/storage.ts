import { supabase } from '../client';

const BUCKET_NAME = 'appcaire-uploads';

export async function uploadFile(
  path: string,
  file: File,
  options?: { contentType?: string; cacheControl?: string },
) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: options?.cacheControl || '3600',
      contentType: options?.contentType || file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }
  return data;
}

export async function downloadFile(path: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(path);

  if (error) {
    throw error;
  }
  return data;
}

export async function getPublicUrl(path: string) {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

  return data.publicUrl;
}

export async function removeFile(path: string) {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    throw error;
  }
}

export async function listFiles(prefix?: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(prefix || '');

  if (error) {
    throw error;
  }
  return data;
}
