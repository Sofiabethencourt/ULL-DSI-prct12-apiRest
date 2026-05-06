import express from 'express';
import { createVideogame } from '../functions/createGame.js';
import { deleteGame } from '../functions/deleteGame.js';
export const gameRouter = express.Router();
gameRouter.post('/videogames', createVideogame);
gameRouter.delete('/videogames/:id', deleteGame);
