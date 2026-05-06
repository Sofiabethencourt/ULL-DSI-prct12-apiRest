import { Document } from 'mongoose';
export interface Filter {
    genre?: string;
    author?: string;
}
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
export declare const Book: import("mongoose").Model<BookDocument, {}, {}, {}, Document<unknown, {}, BookDocument, {}, import("mongoose").DefaultSchemaOptions> & BookDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, BookDocument>;
export {};
