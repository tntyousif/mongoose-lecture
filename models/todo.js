// models/todo.js
const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
    text: String,
    isComplete: Boolean,
})

const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
  subtasks: [subTaskSchema],

  assignee:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;