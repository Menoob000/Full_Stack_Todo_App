import React, { useState } from "react";

const InputTodo = ({ onTodoAdded }) => {
  // Toggle form visibility
  const [isNewTodo, setIsNewTodo] = useState(false);

  // Form field state
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  function toggleTodo() {
    setIsNewTodo(!isNewTodo);
  }

  async function addTodo(e) {
    e.preventDefault(); // 1. Prevent page refresh on form submit

    try {
      const response = await fetch("http://localhost:1234/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 2. Tells Express to parse JSON body
        },
        body: JSON.stringify({ task, description, status }), // 3. Must be JSON string
      });

      if (response.ok) {
        // 4. Reset form fields
        setTask("");
        setDescription("");
        setStatus("pending");
        setIsNewTodo(false); // Close the form

        // 5. Notify parent (App.jsx) to refresh the table if prop was passed
        if (onTodoAdded) {
          onTodoAdded();
        }
      }
    } catch (err) {
      console.error("Error adding todo:", err.message);
    }
  }

  return (
    <div className="w-full my-4">
      <button
        className="bg-lime-400 hover:bg-lime-300 text-gray-950 font-bold py-2.5 px-5 rounded-lg shadow-lg shadow-lime-400/40 transition-all duration-200 cursor-pointer"
        onClick={toggleTodo}
      >
        {isNewTodo ? "✕ Close Form" : "+ Add a Task"}
      </button>

      {/* Neon green themed form matching full table width */}
      {isNewTodo ? (
        <form
          onSubmit={addTodo}
          className="mt-4 w-full flex flex-col gap-3.5 p-5 bg-lime-50 border-2 border-lime-400 rounded-2xl shadow-xl shadow-lime-400/20"
        >
          <h3 className="text-lg font-bold text-lime-900 tracking-wide">
            Create New Task
          </h3>

          <input
            type="text"
            placeholder="Task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            className="border-2 border-lime-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-300 bg-white p-2.5 rounded-lg outline-none text-gray-800 placeholder-gray-400 transition"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-lime-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-300 bg-white p-2.5 rounded-lg outline-none text-gray-800 placeholder-gray-400 transition"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-2 border-lime-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-300 bg-white p-2.5 rounded-lg outline-none text-gray-800 transition cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            type="submit"
            className="mt-1 bg-lime-400 hover:bg-lime-300 text-gray-950 font-bold py-2.5 px-4 rounded-lg shadow-md shadow-lime-400/40 transition duration-150 cursor-pointer"
          >
            Submit Task
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default InputTodo;
