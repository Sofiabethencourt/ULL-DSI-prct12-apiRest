import '../db/mongoose.js';
import { Game } from '../models/game_model.js';
export async function updateVideogame(req, res) {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            res.status(400).send('No se ha encontrado el id');
        }
        else {
            const updategame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updategame) {
                res.status(400).send('Error recibiendo el videojuego actualizado');
            }
            else {
                res.status(200).send(updategame);
            }
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}
