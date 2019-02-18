const express = require('express');
let bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const Todo =  require('./models/Todo');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// CREATE TODO
// GET ALL TODOs
// GET A TODO BY IT'S ID
// SEARCH FOR TODO BY TITLE OR CONTENT
// UPDATE A TODO
// DELETE A TODO

mongoose.connect('mongodb://localhost:27017/todoApp', {useNewUrlParser: true})
    .then(() => {console.log('Database is Connected');})
    .catch((err) => {throw err});

app.post('/', (req, res) => {
    const {title, content} = req.body;
    if(!title){
        return res.json({error: 'Enter title.'})
    }
    if(!content){
        return res.json({error: 'Enter content.'})
    }
    const todo = new Todo({
        title,
        content
    });
    todo.save((err) => {
        if(err) throw err;
        return res.json({'message': 'todo created'});
    });
});

app.get('/:id', (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.json({error: 'Enter id.'})
    }
    Todo.findById(id, (err, todo) => {
        if(err) return res.json({error: 'Enter valid id.'});
        if(!todo){
            return res.json({error: 'No todo found with the ID.'})
        }
        return res.json({
            success: true,
            todo
        })

    });

});


app.listen(3000, (err) => {
   if(err) throw err;
   console.log(`Server is running on port 3000`);
});
