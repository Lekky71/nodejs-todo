const express = require('express');
let bodyParser = require('body-parser');
const path = require('path');

const app = express();
const mongoose = require('mongoose');
const Todo =  require('./models/Todo');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'statics')));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todoApp', {useNewUrlParser: true})
    .then(() => {console.log('Database is Connected');})
    .catch((err) => {throw err});

// Create a todo
app.post('/', (req, res) => {
    const {title, content} = req.body;
    console.log(req.body);

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
        return res.redirect('/todo/all');
    });
});

// Get a todo by id
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

// Get all todos
app.get('/todo/all',(req,res)=>{
    Todo.find({}, function(err, todo) {
        if (err) throw err;
        if (todo.length === 0){
            return res.json({
                message: "No todo found"
            })
        }
        return res.render('homepage', {allTodos: todo, name: 'Emmanuel'});
        // return res.json({
        //     success: true,
        //     length: todo.length,
        //     todo
        // })
      });
});

app.get('/', (req, res) => {
    return res.render('add-todo');
});
// Search for todo by content or title
app.get('/search',(req,res)=>{
    console.log(req.query);
    const queryString = req.query.q;
    //validate endpoints
  if(!queryString){
      return res.json({error: 'Enter param q'});
  }

    const searchQuery = {title: { $regex: queryString, $options: "i" }};

    Todo.find(searchQuery,(err, todo)=>{
        if (err) throw err;
        if (todo.length === 0){
            return res.json({
                message: "No todo found"
            })
        }
        return res.json({
            found: todo.length,
            todo
        })
    });
});


app.listen(3000, (err) => {
   if(err) throw err;
   console.log(`Server is running on port 3000`);
});
