import { Document } from 'mongoose';
type Dlcs = {
    name: string;
    priceEur: number;
};
export interface GameDocumentInterface extends Document {
    title: string;
    developer: string;
    publisher: string;
    genre: string[];
    platform: string[];
    releaseDate: Date;
    price: number;
    score: number;
    multiplayer: boolean;
    dlcs: Dlcs[];
}
export declare const Game: import("mongoose").Model<GameDocumentInterface, {}, {}, {}, Document<unknown, {}, GameDocumentInterface, {}, import("mongoose").DefaultSchemaOptions> & GameDocumentInterface & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, GameDocumentInterface>;
export {};
