import type { StorageError, StorageFile } from '../types';
import { db } from '../client';

/**
 * Upload a file to storage
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
): Promise<StorageFile | null> {
  try {
    const { data, error } = await db.storage.from(bucket).upload(path, file);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

/**
 * Download a file from storage
 */
export async function downloadFile(
  bucket: string,
  path: string,
): Promise<Blob | null> {
  try {
    const { data, error } = await db.storage.from(bucket).download(path);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error downloading file:', error);
    return null;
  }
}

/**
 * Remove a file from storage
 */
export async function removeFile(bucket: string, path: string): Promise<void> {
  try {
    const { error } = await db.storage.from(bucket).remove([path]);
    if (error) throw error;
  } catch (error) {
    console.error('Error removing file:', error);
  }
}

/**
 * List files in a bucket
 */
export async function listFiles(bucket: string, path?: string): Promise<StorageFile[]> {
  try {
    const { data, error } = await db.storage.from(bucket).list(path);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: string, path: string): string {
  return db.storage.from(bucket).getPublicUrl(path).data.publicUrl;
} 