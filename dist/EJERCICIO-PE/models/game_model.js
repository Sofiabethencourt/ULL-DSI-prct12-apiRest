import { Schema, model } from 'mongoose';
const GameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true,
        validate: (value) => {
            if (value.length === 0) {
                throw new Error('At least one genre must be specified');
            }
        },
        enum: ['Action', 'RPG', 'Strategy', 'Puzzle', 'Sports', 'Simulation', 'Horror', 'Adventure']
    },
    platform: {
        type: [String],
        required: true,
        validate: (value) => {
            if (value.length === 0) {
                throw new Error('At least one platform must be specified');
            }
        },
        enum: ['PC', 'PS5', 'Xbox', 'Switch', 'Mobile']
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        validate: (value) => {
            if (value < 0) {
                throw new Error('Price must be a positive number');
            }
        }
    },
    score: {
        type: Number,
        validate: (value) => {
            if (value < 0 || value > 100) {
                throw new Error('Score must be between 0-100');
            }
        }
    },
    multiplayer: {
        type: Boolean,
        default: false
    },
    dlcs: [{
            name: {
                type: String,
                required: true
            },
            priceEur: {
                type: Number,
                validate: (value) => {
                    if (value < 0) {
                        throw new Error('Price must be a positive number');
                    }
                }
            }
        }]
});
export const Game = model('Game', GameSchema);
