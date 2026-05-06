import {describe, test, expect, beforeEach} from 'vitest';
import {gameRouter} from '../../src/EJERCICIO-PE/routes/gameRoute.js';
import { GameDocumentInterface, Game } from '../../src/EJERCICIO-PE/models/game_model.js';
import "../../src/EJERCICIO-PE/db/mongoose.js";
import request from "supertest";
import {app} from '../../src/app.js'; 
import { create } from 'node:domain';
import { response } from 'express';
import { Http2ServerResponse } from 'node:http2';

let createdGameId: string;

const gameData = {
            title: "Hola",
            developer: "adffd",
            publisher: "Abracadabra",
            genre: ["Action"],
            platform: ["PS5"],
            releaseDate: new Date(),
            price: 70,
            score: 90,
            multiplayer: false,
            dlcs: [{
                name: "Expansión 1",
                priceEur: 20
            }]
};

beforeEach(async () => {
    await Game.deleteMany();
    const game = await new Game(gameData).save();
    createdGameId = game._id.toString();
});

describe ("POST de videogames", () => {
    test ("Es posible crear un nuevo videojuego", async() => {
        await request(app)
        .post("/videogames")
        .send({
            title: "HOlaaaa",
            developer: "sofia",
            publisher: "Abracadabra",
            genre: ["Action"],
            platform: ["PS5"],
            releaseDate: new Date(),
            price: 70,
            score: 90,
            multiplayer: false,
            dlcs: [{
                name: "Expansión 1",
                priceEur: 20
            }]
        })
        .expect(200);
    });
});

describe('GET de videogames', () => {
    test ('Es posible encontrar un videojuego por su id', async() => {
        await request(app)
        .get(`/videogames/${createdGameId}`)
        .expect(200);
    });
    
    test ("Da error si el id no se encuentra", async() => {
        await request(app)
        .get(`/videogames/69fb1b53ebad320bd0826878`)
        .expect(404);
    });
});

describe ('DELETE de videogames', () => {
    test ('Es posible eliminar un videojuego por su id', async() => {
        await request(app)
        .delete(`/videogames/${createdGameId}`)
        .expect(200);
    });

    test ("Da error si el id no se encuentra", async() => {
        await request(app)
        .delete(`/videogames/69fb1b53ebad320bd0826878`)
        .expect(404);
    });
});

describe ('GET de videogames', () => {
    test ('Es posible obtener un videojuego por sus caracteristicas', async() => {
        const response = await request(app)
        .get(`/videogames?multiplayer=false`);
        expect(response.status).toBe(200);
    });

    test ("Da error si quieres obtener un juego por caracteristicas no validas", async() => {
        const response = await request(app)
        .get(`/videogames`)
        .send({
            title: "GI"
        });
        expect(response.status).toBe(400);
    })
});

describe ('PATCH de videogames', () => {
    test ('Es posible actualizar un videojuego', async() => {
        const response = await request(app)
        .patch(`/videogames/${createdGameId}`)
        .send({
            genre: ["RPG"],
            platform: ["Xbox"],
            releaseDate: new Date(),
            price: 60,
            score: 99,
            multiplayer: true,
        })
        .expect(200);
    });

    test ('Da error si el id del juego no es del formato adecuado', async() => {
        const response = await request(app)
        .patch(`/videogames/inventado"`)
        .send({
            genre: ["RPG"],
            platform: ["Xbox"],
            releaseDate: new Date(),
            price: 60,
            score: 99,
            multiplayer: true,
        })
        .expect(500);
        expect(response._body.message).include('Cast to ObjectId failed for value "inventado"');
    });
})