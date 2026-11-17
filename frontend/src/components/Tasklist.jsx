import React, { useState } from "react";

const Tasklist = ({ todos, deleteTodo, updateTodo }) => {
  // Track which row is currently being edited
  const [editingId, setEditingId] = useState(null);

  // Temporary state for the row being edited
  const [editTask, setEditTask] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  // When clicking "Edit", fill the inputs with current values
  const startEditing = (todo) => {
    setEditingId(todo.todo_id);
    setEditTask(todo.task);
    setEditDesc(todo.description || "");
    setEditStatus(todo.status);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = (id) => {
    updateTodo(id, {
      task: editTask,
      description: editDesc,
      status: editStatus,
    });
    setEditingId(null);
  };

  return (
    <div className="overflow-x-auto w-full max-w-3xl mt-5">
      <table className="bg-lime-400 w-full text-left border border-lime-500 rounded-lg overflow-hidden">
        <thead className="bg-lime-800 border-b border-lime-500 text-black-500">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Task</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-lime-500">
          {todos.map((todo, index) => {
            const isEditing = editingId === todo.todo_id;

            return (
              <tr
                key={todo.todo_id}
                className="group hover:bg-skye-500 group-hover:bg-emerald-100"
              >
                <td className="p-3">{index + 1}</td>

                {/* 1. TASK CELL */}
                <td className="p-3">
                  {isEditing ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                  ) : (
                    todo.task
                  )}
                </td>

                {/* 2. DESCRIPTION CELL */}
                <td className="p-3">
                  {isEditing ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                  ) : (
                    todo.description
                  )}
                </td>

                {/* 3. STATUS CELL */}
                <td className="p-3">
                  {isEditing ? (
                    <select
                      className="border p-1 rounded"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="in-progress">in-progress</option>
                      <option value="done">done</option>
                    </select>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-lime-500">
                      {todo.status}
                    </span>
                  )}
                </td>

                {/* 4. ACTION BUTTONS */}
                <td className="p-3 text-right space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(todo.todo_id)}
                        className="bg-green-600 text-white text-xs px-2.5 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-lime-500 text-white text-xs px-2.5 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out space-x-2">
                      <button
                        onClick={() => startEditing(todo)}
                        className="my-1 bg-blue-500 hover:scale-110 transition-transform duration-300 ease hover:bg-blue-600 text-white text-xs px-2.5 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.todo_id)}
                        className="bg-red-500 hover:bg-red-600 hover:scale-110 transition-transform duration-300 ease text-white text-xs px-2.5 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tasklist;
