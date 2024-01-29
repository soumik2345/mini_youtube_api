import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("file upload on cloudinary", response.url);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //  remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const deleteFromCloudinary = async (cloudinaryFilePath) => {
  try {
    const publicId = extractPublicId(cloudinaryFilePath);

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Something went wrong! while uplodaing image"
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
