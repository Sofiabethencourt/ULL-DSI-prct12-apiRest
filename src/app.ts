import express from 'express';
import './db/mongoose.js';
import { gameRouter } from './EJERCICIO-PE/routes/gameRoute.js';

export const app = express();

app.use(express.json());
app.use(gameRouter);