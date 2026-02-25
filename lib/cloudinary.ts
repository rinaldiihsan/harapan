import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;

// Helper upload dari buffer (karena tidak ada multer di Next.js)
export const uploadToCloudinary = (buffer: Buffer, folder: string, filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const uniquePublicId = `${nameWithoutExt}-${Date.now()}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: uniquePublicId,
        overwrite: false,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );
    uploadStream.end(buffer);
  });
};

// Helper delete dari Cloudinary by URL
export const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    // Extract public_id dari URL cloudinary
    // Contoh URL: https://res.cloudinary.com/xxx/image/upload/v123/carousel/blob-1234567890.webp
    // public_id yang diambil: carousel/blob-1234567890
    const parts = url.split('/');
    const folderAndFile = parts.slice(-2).join('/');
    const publicId = folderAndFile.replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from cloudinary:', error);
  }
};
