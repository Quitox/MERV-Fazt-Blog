import dotenv from "dotenv";

dotenv.config();// gestionar las variables de entorno dentro de la aplicación

// DB
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/FastPostsDB";

// Alojamiento
export const PORT = process.env.PORT || 4000;