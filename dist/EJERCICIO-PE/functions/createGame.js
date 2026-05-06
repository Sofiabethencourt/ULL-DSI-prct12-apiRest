import '../db/mongoose.js';
import { Game } from '../models/game_model.js';
/**
 * Funcion para crear un nuevo videojuego e insertarlo en la bd
 * @param game - Juego que vamos a crear
 * @returns El juego insertado
 */
export async function createVideogame(req, res) {
    const new_game = new Game(req.body);
    try {
        const saved_game = await new_game.save();
        res.status(200).send(saved_game);
    }
    catch (error) {
        res.status(500).send(error);
    }
}
