import {describe, test, expect, beforeEach} from 'vitest';
import {Book} from '../../src/EJERCICIO1/models/book_model.js';
import {app} from '../../src/EJERCICIO1/app.js';
import request from 'supertest';
import { response } from 'express';
import mongoose from 'mongoose';

const bookData = {
  title: "The Big Bang",
  author: "John Doe",
  isbn: "9781234567890",
  genre: "Science",
  year: 2000,
  pages: 300,
  available: true,
  rating: 4.5
};

let createdBookId: string;

beforeEach(async () => {
  await Book.deleteMany();
  const book = await new Book(bookData).save();
  createdBookId = book._id.toString();
});

// Tests for POST /books
describe("POST /books", () => {
  test("Should successfully create a new book", async () => {
    await request(app).post("/books")
      .send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Fiction",
        year: 1925,
        pages: 180,
        available: true,
        rating: 4.5
      })
      .expect(201);
  });

  test("Should not create a book with missing required fields", async () => {
    const response = await request(app).post("/books")
      .send({
        title: "The Great Gatsby",
        isbn: "9780743273565",
        genre: "Fiction"
      })
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('author');

  });

  test ("Should not create a book with invalid ISBN", async () => {
    const response = await request(app).post("/books")
    .send({
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "123456789",
      genre: "Fiction",
      year: 1925,
      pages: 180,
      available: true,
      rating: 4.5
    })
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('ISBN must be 13 characters long');  
  
  });

  test ("Should succesfully create a new book", async () => {
    const response = await request(app).post("/books")
      .send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Fiction",
        year: 1925,
        pages: 180,
        available: true,
        rating: 4.5
      })
      .expect(201);

      expect(response.body).to.include({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Fiction",
        year: 1925,
        pages: 180,
        available: true,
        rating: 4.5
      });
  });

  test ("Should not create a book with duplicate ISBN", async () => {
    const response = await request(app).post("/books")
      .send({
        title: "Another Book",
        author: "Jane Doe",
        isbn: "9781234567890",
        genre: "Fiction",
        year: 2020,
        pages: 250,
        available: true,
        rating: 4.0
      })
      .expect(400);
      
    expect(response.body.error).toBe('ISBN already exists');
  });

  test ("Should return 500 if there is an error in the database", async () => {
    await mongoose.connection.close();
    const response = await request(app).post("/books")
      .send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Fiction",
        year: 900,
        pages: 180,
        available: true,
        rating: 4.5
      });

    expect(response.status).toBe(500);
    await mongoose.connect('mongodb://localhost:27017/library-app');
  });

});

// Tests for GET /books
describe("GET /books", () => {
  test("Should retrieve books by genre", async () => {
    await request(app).get("/books?genre=Science")
      .expect(200)
      .then((response) => {
        expect(response.body[0].title).toEqual(bookData.title);
        expect(response.body[0]).toMatchObject(bookData);
      });
  });

  test("Should retrieve books by author", async () => {
    await request(app).get("/books?author=John Doe")
      .expect(200)
      .then((response) => {
        expect(response.body[0].title).toEqual(bookData.title);
        expect(response.body[0]).toMatchObject(bookData);
      });
  });

  test("Should retrieve books by genre and author", async () => {
    await request(app).get("/books?genre=Science&author=John Doe")
      .expect(200)
      .then((response) => {
        expect(response.body[0].title).toEqual(bookData.title);
        expect(response.body[0]).toMatchObject(bookData);
      });
  });

  test("Should return all the books if no filters are provided", async () => {
    await request(app).get("/books")
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toEqual(bookData.title);
        expect(response.body[0]).toMatchObject(bookData);
      });
  });

  test ("Should return 500 if there is an error in the database", async () => {
    await mongoose.connection.close();
    const response = await request(app).get("/books/?genre=Science")

    expect(response.status).toBe(500);
    await mongoose.connect('mongodb://localhost:27017/library-app');
  });
});

// Tests for GET /books/:id
describe("GET /books/:id", () => {
  test("Should retrieve a book by ID", async () => {
    await request(app).get(`/books/${createdBookId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.title).toEqual(bookData.title);
        expect(response.body).toMatchObject(bookData);
      });
  });

  test("Should return 404 if book not found", async () => {
    const nonExistentId = "69f0f2f438bcefcf607957d6";
    const response = await request(app).get(`/books/${nonExistentId}`)
      .expect(404);
    expect(response.body.error).toBe('Book not found');
  });

  test ("Should return 500 if id is invalid", async () => {
    const response = await request(app).get("/books/invalid-id")
      .expect(500);
    expect(response.body.message).toContain('Cast to ObjectId failed');
  });
});

// Tests for PATCH /books/:id
describe("PATCH /books/:id", () => {
  test("Should update a book's information", async () => {
    const response = await request(app).patch(`/books/${createdBookId}`)
      .send({
        title: "The Big Bang Theory",
        available: false,
        rating: 4.0
      })
      .expect(200);
    
    expect(response.body.title).toBe("The Big Bang Theory");
    expect(response.body.available).toBe(false);
    expect(response.body.rating).toBe(4.0);
  });

  test("Should return an error if trying to update isbn field", async () => {
    const response = await request(app).patch(`/books/${createdBookId}`)
      .send({
        isbn: "9780987654321"
      })
      .expect(400);
    
    expect(response.body.error).toBe('Invalid updates');
  });

  test("Should return 404 if book not found", async () => {
    const nonExistentId = "69f0f2f438bcefcf607957d6";
    const response = await request(app).patch(`/books/${nonExistentId}`)
      .send({
        title: "Non-existent Book"
      })
      .expect(404);
    
    expect(response.body.error).toBe('Book not found');
  });

  test ("Should return 400 if there are validation errors", async () => {
    const response = await request(app).patch(`/books/${createdBookId}`)
      .send({
        year: 99,
        rating: 6.0,
        pages: -10
      })
      .expect(400);
    
    expect(response.body.message).toContain('Date must be between 1000 and current year');
    expect(response.body.message).toContain('Rate must be between 0-5');
    expect(response.body.message).toContain('Pages must be a positive number');
  });

});

// Tests for DELETE /books/:id
describe("DELETE /books/:id", () => {
  test("Should delete a book by ID", async () => {
    await request(app).delete(`/books/${createdBookId}`)
      .expect(200);
    
    const response = await request(app).get(`/books/${createdBookId}`)
      .expect(404);
    
    expect(response.body.error).toBe('Book not found');
  });

  test("Should return 404 if book not found", async () => {
    const nonExistentId = "69f0f2f438bcefcf607957d6";
    const response = await request(app).delete(`/books/${nonExistentId}`)
      .expect(404);
    
    expect(response.body.error).toBe('Book not found');
  });

  test ("Should return 500 if there is a server error", async () => {
    const response = await request(app).delete("/books/invalid-id")
      .expect(500);
    
    expect(response.body.message).toContain('Cast to ObjectId failed');
  });
});

// Tests for default route
describe("Default route", () => {
  test("Should return 501 for undefined routes", async () => {
    await request(app).get("/undefined-route")
      .expect(501);
  });
});

// Tests for model validations
describe("Model validations", () => {
  test("Should not create a book with invalid year", async () => {
    const response = await request(app).post("/books")
      .send({
        title: "Invalid Year Book",
        author: "John Doe",
        isbn: "9780987654321",
        genre: "Fiction",
        year: 99,
        pages: 180,
        available: true,
        rating: 4.5
      })
      .expect(400);
      expect(response.body.message).toContain('Date must be between 1000 and current year');
  });

  test("Should not create a book with invalid rating", async () => {
    const response = await request(app).post("/books")
      .send({
        title: "Invalid Rating Book",
        author: "John Doe",
        isbn: "9780987654321",
        genre: "Fiction",
        year: 2023,
        pages: 180,
        available: true,
        rating: 6.0
      })
      .expect(400);
    expect(response.body.message).toContain('Rate must be between 0-5');
  });

  test("Should not create a book with negative pages", async () => {
    const response = await request(app).post("/books")
      .send({
        title: "Negative Pages Book",
        author: "John Doe",
        isbn: "9780987654321",
        genre: "Fiction",
        year: 2023,
        pages: -10,
        available: true,
        rating: 4.5
      })
      .expect(400);
    expect(response.body.message).toContain('Pages must be a positive number');
  });

});
