import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (fileLocalPath) => {
  try {
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });

    if (!response) console.log("Bad response", response);
    console.log("Uploaded on cloudinary");
    return response.secure_url;
  } catch (error) {
    console.log("Error uploading on cloudinary", error);
  }
};

export const deleteOnCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);

    console.log("File deleted on cloudinary");

    return response;
  } catch (error) {
    console.log("Error deleting on cloudinary", error);
  }
};
