const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./router/todo');

const app = express();

// Menggunakan body-parser untuk parsing request body
app.use(bodyParser.json());

// Menggunakan routes dari file todo.js
app.use('/todos', todoRoutes);

module.exports = app;
