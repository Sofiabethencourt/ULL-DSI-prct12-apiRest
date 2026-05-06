import express from "express";
import "./db/mongoose.js";
import { defaultRouter } from "./routes/default_route.js";
import { bookRouter } from "./routes/book_route.js";

export const app = express();
app.use(express.json());
app.use(bookRouter);
app.use(defaultRouter);