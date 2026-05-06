import '../db/mongoose.js';
import { Request, Response } from 'express';
/**
 * Funcion para crear un nuevo videojuego e insertarlo en la bd
 * @param game - Juego que vamos a crear
 * @returns El juego insertado
 */
export declare function createVideogame(req: Request, res: Response): Promise<void>;
