const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0:27017/fullstacktodo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DataBase")).catch(console.error);

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) =>{
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();
    
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.json(todo);
})

const path = require('path');

app.get('./favicon.ico', (req, res) => {
  // Use actual relative path to your .ico file here
  res.sendFile(path.resolve(__dirname, './favicon.ico'));
});

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("API is running..");
  });

app.listen(3001, () => console.log("Server started on port 3001"));
