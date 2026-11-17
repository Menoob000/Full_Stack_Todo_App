import React, { useState, useEffect } from "react";
import Tasklist from "./components/Tasklist";
import InputTodo from "./components/InputTodo";

const App = () => {
  const [todos, setTodos] = useState([{}]);

  async function getTodos() {
    try {
      const response = await fetch("http://localhost:1234/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error("Failed in fetching todos data :", err.message);
    }
  }

  // In App.jsx:
  async function updateTodo(id, updatedFields) {
    try {
      const response = await fetch(`http://localhost:1234/todos/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        // Update local state without needing a full re-fetch:
        setTodos(
          todos.map((todo) => (todo.todo_id === id ? updatedItem : todo)),
        );
      }
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  }

  async function deleteTodos(id) {
    try {
      await fetch(`http://localhost:1234/todos/${id}`, { method: "DELETE" });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  //UseEffect HOOK
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-3xl flex flex-col items-start">
        <InputTodo onTodoAdded={getTodos} />
        <Tasklist
          updateTodo={updateTodo}
          todos={todos}
          deleteTodo={deleteTodos}
        />
      </div>
    </div>
  );
};

export default App;
