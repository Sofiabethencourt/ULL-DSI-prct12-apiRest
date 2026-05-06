import {describe, test, expect, beforeEach} from 'vitest';
import {gameRouter} from '../../src/EJERCICIO-PE/routes/gameRoute.js';
import { GameDocumentInterface, Game } from '../../src/EJERCICIO-PE/models/game_model.js';
import "../../src/EJERCICIO-PE/db/mongoose.js";
import request from "supertest";
import {app} from '../../src/app.js'; 

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
        const new_game = {
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
        };
        await request(app)
        .post("/videogames")
        .send(new_game)
        .expect(200);
    });
});