import '../db/mongoose.js';
import { Game, GameDocumentInterface } from '../models/game_model.js';
import {Request, Response} from 'express';

export async function updateVideogame(req: Request, res: Response){
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            res.status(400).send('No se ha encontrado el id');
        }
        else {
            const updategame = await Game.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true })
            if (!updategame) {
                req.status(400).send('Error recibiendo el videojuego actualizado');
            }
            else {
                return updategame;
            }

        }
    }
    catch {
        throw new Error ("Internal error");
    }

}