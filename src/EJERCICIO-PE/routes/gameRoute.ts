import express from 'express';
import { createVideogame } from '../functions/createGame.js';
import { deleteGame } from '../functions/deleteGame.js';
import { Game } from '../models/game_model.js';
import { getGameById } from '../functions/getGameById.js';
import { getVideogames } from '../functions/getgames.js';
import { updateVideogame } from '../functions/updateGame.js';

export const gameRouter = express.Router();

gameRouter.post('/videogames',createVideogame);

gameRouter.delete('/videogames/:id', deleteGame);

gameRouter.get('/videogames/:id', getGameById);

gameRouter.get('/videogames', getVideogames);

gameRouter.patch('/videogames/:id', updateVideogame);