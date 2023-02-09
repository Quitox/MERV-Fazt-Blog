import app from "./app.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js"; //administra las var de entorno

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
  console.log(`http://localhost:${PORT}`);
});
