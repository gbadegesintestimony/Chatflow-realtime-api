import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(errorMiddleware);

export default app;
