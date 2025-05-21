import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task }]);
      setTask('');
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add new todo"
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.text}
            <button onClick={() => handleDelete(todo.id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="mt-3 text-muted">No todos yet!</p>}
    </div>
  );
}

export default App;