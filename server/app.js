import express from "express";
import fileupload from "express-fileupload";
import postsRoutes from "./routes/posts.routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))

//middlewares - antes de que llegue a las rutas se procesan las cosas
app.use(express.json());
app.use(fileupload({ useTempFiles: true, tempFileDir: "./upload" }));

//routes
app.use(postsRoutes);
app.use(express.static(join(__dirname, '../client/build')))

app.get("*", (req,res)=>{
    res.sendFile(join(__dirname, "../client/build/index.html"))
})

export default app;
