import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm";

function TaskList({ tasks, removeTask, toggleTaskCompletion, editTask }) {
    const [editingId, setEditingId] = useState(null)

    const toggleEditing = (id) => {
        setEditingId(editingId === id ? null : id);
    };

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <li 
                    className={`task-item ${task.completed ? "task-completed" : ""}`} 
                    key={task.id}
                    onClick={() => {
                        if (editingId !== task.id) {
                            toggleTaskCompletion(task.id);
                        }
                    }}
                    >
                        
                    {editingId === task.id ? (
                        <EditTaskForm
                        task={task}
                        editTask={editTask}
                        toggleEditing={() => toggleEditing(task.id)}
                        />
                        ) : (

                            <div className="task-content">
                                <span className={`task-priority ${task.priority}`}>{task.priority}</span>
                                {task.text}
                                <span className="task-category">{task.category}</span>
                                <span className="task-due-date">Due: {task.dueDate}</span> 
                                <button className="task-remove-button" onClick={(e)     => {
                                    e.stopPropagation();
                                    removeTask(task.id);
                                    }}>Remove</button>  
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    toggleEditing(task.id);
                                    }}>Edit</button>
                            </div>
                        )}                                              
                </li>
            ))}
        </ul>
    );
}

export default TaskList