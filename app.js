import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./src/models/articleTag.model.js";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";
import { articleTagRouter } from "./src/routes/articleTag.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", tagRouter);
app.use("/api", articleRouter);
app.use("/api", articleTagRouter);


app.listen(PORT, async () => {
        await startDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});