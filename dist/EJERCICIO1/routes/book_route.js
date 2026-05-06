import express from 'express';
import '../db/mongoose.js';
import { Book } from '../models/book_model.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.post('/books', (req, res) => {
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
app.get('/books', (req, res) => {
    const filter = {};
    if (req.query.genre)
        filter.genre = req.query.genre.toString();
    if (req.query.author)
        filter.author = req.query.author.toString();
    if (Object.keys(filter).length === 0) {
        return res.status(400).send({ error: 'At least one filter (genre or author) must be provided' });
    }
    Book.find(filter)
        .then((books) => {
        res.send(books);
    })
        .catch((error) => {
        res.status(500).send(error);
    });
});
app.get('/books/:id', (req, res) => {
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
app.patch('/books/:id', (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'author', 'genre', 'year', 'pages', 'available', 'rating'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
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
app.delete('/books/:id', (req, res) => {
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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
