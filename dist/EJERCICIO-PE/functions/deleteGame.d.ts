import '../db/mongoose.js';
import { Request, Response } from 'express';
/**
 * Funcion para eliminar los videogjuegos por su id
 * @param id - Parámetro para encontrar el juego
 * @returns El juego eliminado
 */
export declare function deleteGame(req: Request, res: Response): Promise<void>;
