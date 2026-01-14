import cloudinary from "../config/cloudinary.js";

export const uploadPdfToCloudinary = async (localPath) => {
  const result = await cloudinary.uploader.upload(localPath, {
    folder: "pdfs",
    resource_type: "raw", 
    access_mode:"public"
  });

  return result.secure_url;
};
