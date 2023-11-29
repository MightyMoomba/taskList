import React, { useState } from "react";

function TaskForm({ addTask }) {
    const [newTask, setNewTask] = useState("")
    const [error, setError] = useState("");
    const [priority, setPriority] = useState("low");
    const [category, setCategory] = useState("");
    const [dueDate, setDueDate ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask.trim()) {
            setError("Task cannot be empty");
            return;
        }
        setError("")
        addTask(newTask, priority, category, dueDate);
        setNewTask("");
    };
    return (
        <div className="task-form">
        <form onSubmit={handleSubmit}>
            <input
                className="task-input"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />

            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />

            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}> 
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            </select>
            <button className="task-submit" type="submit">Add Task</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default TaskForm;