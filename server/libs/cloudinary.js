import cloudinary, { v2 } from "cloudinary";

cloudinary.config({
  cloud_name: "dmvpnvecr",
  api_key: "629599396711755",
  api_secret: "fgYEIvJR1aO2LSbd2PXzjMion5Y",
});

export const uploadImage = async (filePath) => {
  return await v2.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await v2.uploader.destroy(id);
};