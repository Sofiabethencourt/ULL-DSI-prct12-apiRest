import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';
import {Request, Response} from 'express';

/**
 * Funcion para eliminar los videogjuegos por su id
 * @param id - Parámetro para encontrar el juego
 * @returns El juego eliminado
 */
export async function deleteGame(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const response = await Game.findByIdAndDelete(id);
        if (!response) {
            res.status(404).send('Not found');
        }
        else {
            res.status(200).send(response);
        }
    }
    catch (error){
        res.status(500).send(error);
    }
}