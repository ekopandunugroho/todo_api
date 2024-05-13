const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// List All Todo
router.get('/', todoController.listAllTodos);

// Detail Todo
router.get('/:id', todoController.detailTodo);

// Create Todo
router.post('/', todoController.createTodo);

// Delete Todo (Soft Delete)
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
