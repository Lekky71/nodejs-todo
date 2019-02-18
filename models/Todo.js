const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: String,
    content: String,
    date_created: {type: Date, default: Date.now}
});

const Todo = mongoose.model('todo', todoSchema);


module.exports = Todo;
