import { generatePrime } from 'node:crypto';
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
        const filter: any = {};

        const {platform, genre, multiplayer } = req.query;

        if (platform ) filter.platform = platform.toString();
        if (genre) filter.genre = genre.toString();
        if (multiplayer) filter.multiplayer = multiplayer.toString();

        if (Object.keys(filter).length === 0) {
            return res.status(400).send({ error: 'Debe proporcionar al menos un criterio: genre, multiplayer o platform'});
        }

        const games = await Game.findOne(filter);
        if (!games) {
            res.status(404).send("No se ha encontrado ningun juego con esas caracteristicas");
        }
        else {
            res.status(200).send(games);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
    