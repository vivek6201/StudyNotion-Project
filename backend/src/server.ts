import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/database";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoute";
import paymentRoutes from "./routes/paymentRoute";
import cloudinaryConnect from "./config/cloudinary";
import fileUpload from "express-fileupload";

//config express app
const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express is working fine");
});

// connect to DB and Cloudinary
connectToDatabase();
cloudinaryConnect();

// mount all routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);

// listen to server
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
