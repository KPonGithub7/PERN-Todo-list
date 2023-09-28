const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

//middlewares
app.use(cors());
app.use(express.json()); //req.body

//Routes

//create a todo

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", //returning * returns the data
            [description]
        );
        res.json(newTodo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
            id,
        ]);
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json(updateTodo.rows);
        res.json("todo was updated. ");
    } catch (error) {
        console.error(error.message);
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("the task is succesfully deleted.");
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(2000, () => {
    console.log("Server is running on port 2000.");
});
