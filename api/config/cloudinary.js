import { v2 as cloudinary } from "cloudinary";
import dotevn from "dotenv";
dotevn.config();
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`, // Click 'View API Keys' above to copy your API secret
});
export default cloudinary;
