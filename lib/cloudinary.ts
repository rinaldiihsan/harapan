import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export default cloudinary;

// Helper upload dari buffer (karena tidak ada multer di Next.js)
export const uploadToCloudinary = (buffer: Buffer, folder: string, filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: filename,
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
    const parts = url.split('/');
    const folderAndFile = parts.slice(-2).join('/');
    const publicId = folderAndFile.replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from cloudinary:', error);
  }
};
