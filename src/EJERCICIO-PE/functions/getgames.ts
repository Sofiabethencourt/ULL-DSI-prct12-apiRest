import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';
import {Request, Response} from 'express';

/**
 * Función para obtener videojuegos por un filtro
 * @param req - Cuerpo de petición
 * @param res - Cuerpo de respuesta
 * @returns Los juegos filtrados
 */
export async function getVideogames(req: Request, res: Response){
    try {
        const filter = req.body;
        const games = await Game.find(filter);
        if (games.length == 0) {
            res.status(404).send("No se ha encontrado ningun juego con esas caracteristicas");
        }
        else {
            res.status(200).send(games);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
    