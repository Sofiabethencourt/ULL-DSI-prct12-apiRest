import { connect } from 'mongoose';

connect('mongodb://127.0.0.1:27017/games-app').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when connecting to the database');
});