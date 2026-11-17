const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//GET all todos request
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ");
    res.json(allTodos.rows);
  } catch (err) {
    console.log("Cannot connect to a GET requests");
    res.status(500).json({
      error: "Server error",
    });
  }
});

//GET a specific todo id
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoRow = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todoRow.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "cannot get id",
    });
  }
});

// POST request
app.post("/todos", async (req, res) => {
  try {
    const { task, description, status } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (task, description, status) Values ($1, $2, $3) RETURNING *",
      [task, description, status],
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(
      "Error connecting to get request, error message : ",
      err.message,
    );
    res.status(500).json({
      error: "Server error",
    });
  }
});

//Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, description, status } = req.body;
    const updatedRow = await pool.query(
      "UPDATE todo SET task=$1, description=$2, status=$3 WHERE todo_id = $4 RETURNING *",
      [task, description, status, id],
    );
    res.json(updatedRow.rows[0]);
  } catch (err) {
    console.log("Error :", err);
    res.status(500).json({
      error: "Server error updating todo",
    });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id]);
    res.json({ message: `Todo ${id} was deleted!` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Server error in the process of delete",
    });
  }
});

// APP listening on port 1234
app.listen(1234, () => {
  console.log("app is listening on port 1234");
});
