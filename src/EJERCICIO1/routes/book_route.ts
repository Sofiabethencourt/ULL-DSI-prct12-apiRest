import express from 'express';
import '../db/mongoose.js';
import { Book, Filter } from '../models/book_model.js';


export const bookRouter = express.Router();

/**
 * Crea un nuevo libro en la base de datos.
 * @remarks Verifica primero si el ISBN ya existe para evitar duplicados.
 * @param req - Objeto de petición de Express. El cuerpo debe cumplir con la interfaz BookDocument.
 * @param res - Objeto de respuesta de Express.
 * @returns 201 si se crea con éxito, 400 si hay errores de validación o ISBN duplicado.
 */
bookRouter.post('/books', (req, res) => {
    const book = new Book(req.body);
  
    Book.findOne({ isbn: book.isbn }).then((existingBook) => {
        if (existingBook) {
            return res.status(400).send({ error: 'ISBN already exists' });
        }
        book.save().then((book) => {
            res.status(201).send(book);
        }).catch((error) => {
            res.status(400).send(error);
        });
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

/**
 * Recupera una lista de libros, con opciones de filtrado por género y autor.
 * @param req - Objeto de petición de Express. Puede incluir query parameters 'genre' y 'author' para filtrar resultados.
 * @param res - Objeto de respuesta de Express.
 * @returns 200 con la lista de libros que coinciden con los filtros, o 500 si ocurre un error en la consulta.
 */
bookRouter.get('/books', (req, res) => {
    const filter: Partial<Filter> = {};
    if (req.query.genre) filter.genre = req.query.genre.toString();
    if (req.query.author) filter.author = req.query.author.toString();

    Book.find(filter)
    .then((books) => {
        res.send(books);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

/**
 * Recupera un libro específico por su ID.
 * @param req - Objeto de petición de Express. El parámetro 'id' debe contener el ID del libro a recuperar.
 * @param res - Objeto de respuesta de Express.
 * @returns 200 con el libro encontrado, o 404 si no se encuentra.
 */
bookRouter.get('/books/:id', (req, res) => {
    const id = req.params.id;
    Book.findById(id)
    .then((book) => {
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        res.send(book);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

/**
 * Actualiza la información de un libro existente.
 * @param req - Objeto de petición de Express. El parámetro 'id' debe contener el ID del libro a actualizar. El cuerpo puede incluir cualquier campo de 
 * BookDocument para actualizar.
 * @param res - Objeto de respuesta de Express.
 * @returns 200 con el libro actualizado, 400 si hay campos no permitidos o errores de validación, o 404 si no se encuentra el libro.
 */
bookRouter.patch('/books/:id', (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'author', 'genre', 'year', 'pages', 'available', 'rating'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((book) => {
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        res.send(book);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
});

/**
 * Elimina un libro de la base de datos por su ID.
 * @param req - Objeto de petición de Express. El parámetro 'id' debe contener el ID del libro a eliminar.
 * @param res - Objeto de respuesta de Express.
 * @returns 200 con el libro eliminado, 404 si no se encuentra el libro, o 500 si ocurre un error en la eliminación.
 */
bookRouter.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndDelete(id)
    .then((book) => {
        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }
        res.send(book);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});