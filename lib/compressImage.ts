import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // maksimal ukuran 1MB
    maxWidthOrHeight: 1280, // maksimal resolusi 1280px
    useWebWorker: true,
    fileType: file.type,
  };

  try {
    const compressed = await imageCompression(file, options);
    return compressed;
  } catch (error) {
    console.error('Gagal compress gambar:', error);
    return file;
  }
};
