import { Schema, model } from 'mongoose';
const BookSchema = new Schema({
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
        validate: (value) => {
            if (value < 1000 || value > new Date().getFullYear()) {
                throw new Error('Date must be between 1000 and current year');
            }
        }
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => value.length === 13,
            message: 'ISBN must be 13 characters long'
        }
    },
    pages: {
        type: Number,
        validate: (value) => {
            if (value < 0) {
                throw new Error('Pages must be a positive number');
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
        validate: (value) => {
            if (value < 0 || value > 5) {
                throw new Error('Rate must be between 0-5');
            }
        }
    }
});
export const Book = model('Book', BookSchema);
