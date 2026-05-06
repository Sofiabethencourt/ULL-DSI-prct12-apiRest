import '../db/mongoose.js';
import { Game } from '../models/game_model.js';
/**
 * Obtiene los juegos por su id
 * @param id - Parámetro de búsqueda
 * @returns El juego que tiene el id correspondiente
 */
export async function getGameById(req, res) {
    try {
        const id = req.params.id;
        const game = await Game.findById(id);
        if (!game) {
            res.status(404).send('Not found');
        }
        else {
            res.status(200).send(game);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}
