import { v2 as cloudinary } from 'cloudinary';

// cloudinary.uploader
//   .upload('my_image.jpg')
//   .then((result) => console.log(result));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,

  // upload_prefix: 'https://api-eu.cloudinary.com',
});
export const saveFileToCloudinary = async (buffer, userId, callback) => {
  const options = {
    folder: 'note-app/avatar',
    public_id: `avatar_${userId}`,
    resource_type: 'image',
    overwrite: true,
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'auto' },
      { fetch_format: 'auto', quality: 'auto' },
    ],
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};
