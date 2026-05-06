import '../db/mongoose.js';
import { Request, Response } from 'express';
/**
 * Obtiene los juegos por su id
 * @param id - Parámetro de búsqueda
 * @returns El juego que tiene el id correspondiente
 */
export declare function getGameById(req: Request, res: Response): Promise<void>;
