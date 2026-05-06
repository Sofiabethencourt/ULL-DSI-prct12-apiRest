import '../db/mongoose.js';
import { Game } from '../models/game_model.js';
/**
 * Funcion para eliminar los videogjuegos por su id
 * @param id - Parámetro para encontrar el juego
 * @returns El juego eliminado
 */
export async function deleteGame(req, res) {
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
    catch (error) {
        res.status(500).send(error);
    }
}
