import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

type OptionType = {
  folder: string;
  resource_type: string;
  height?: number;
  quality?: number;
};

const fileUploadCloudinary = async (
  file: any,
  folder: string,
  height: number | null = null,
  quality: number | null = null
) => {
  let options: OptionType = { folder, resource_type: "auto" };

  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  return await cloudinary.uploader.upload(
    file.tempFilePath,
    options as UploadApiOptions
  );
};

export default fileUploadCloudinary;
