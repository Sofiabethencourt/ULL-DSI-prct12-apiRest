import '../db/mongoose.js';
import { Request, Response } from 'express';
/**
 * Función para obtener videojuegos por un filtro
 * @param req - Cuerpo de petición
 * @param res - Cuerpo de respuesta
 * @returns Los juegos filtrados
 */
export declare function getVideogames(req: Request, res: Response): Promise<void>;
