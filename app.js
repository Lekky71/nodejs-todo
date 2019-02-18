const express = require('express');
const app = express();

// CRUD Create Read Update Delete Operations
// get request
app.get('/', (req, res) => {
    return res.send('Welcome!!');
});

app.get('/search', (req, res) => {
    console.log(req.query);
    const name = req.query.name;
    const school = req.query.school;
    const level = req.query.level;
    return res.json({msg: `Welcome, ${name}`, uni: school, class: level});
});
app.post('/', (req, res) => {
    return res.json({message: 'This is the post endpoint.'})
});


app.listen(3000, (err)=> {
    if(err) {
        console.log(err);
        process.exit(1)
    }
   console.log(`Server is running on port 3000`);
});

