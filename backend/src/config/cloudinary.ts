import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};

export default cloudinaryConnect;