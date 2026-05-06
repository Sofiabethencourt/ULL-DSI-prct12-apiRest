import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

/**
 * Interfaz que define la estructura de un documento de libro en MongoDB.
 * Incluye validaciones para cada campo según los requisitos del modelo.
 */
export interface Filter {
    genre: string;
    author: string;
}

/**
 * Interfaz que extiende Document de Mongoose para definir los campos de un libro.
 */
interface BookDocument extends Document {
    title: string;
    author: string;
    genre: 'Fiction' | 'Non-Fiction' | 'Science' | 'History' | 'Fantasy' | 'Biography';
    year: number;
    isbn: string;
    pages: number;
    available: boolean;
    rating: number;
}

const BookSchema = new Schema<BookDocument>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Fantasy', 'Biography'],
    },
    year: {
        type: Number,
        validate: (value: number) => {
            if (value < 1000 || value > new Date().getFullYear()) {
                throw new Error ('Date must be between 1000 and current year');
            }
        }
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => value.length === 13,
            message: 'ISBN must be 13 characters long'
        }
    },
    pages: {
        type: Number,
        validate: (value: number) => {
            if (value < 0) {
                throw new Error ('Pages must be a positive number');
            }
        }
    },
    available: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number, 
        required: false,
        validate: (value: number) => {
            if (value < 0 || value > 5) {
                throw new Error ('Rate must be between 0-5');
            }
        }
    }
});


export const Book = model<BookDocument>('Book', BookSchema);
