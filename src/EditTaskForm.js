import React, { useState } from "react";

function EditTaskForm({ task, editTask, toggleEditing }) {
    const [newText, setNewText] = useState(task.text);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        editTask(task.id, newText);
        toggleEditing(false);
    };

    const handleInputChange = (e) => {
        e.stopPropagation();
        setNewText(e.target.value);
    }

    const handleCancelClick = (e) => {
        e.stopPropagation();
        toggleEditing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newText}
                onChange={handleInputChange}
                onClick={e => e.stopPropagation()}
                />
                <button type="submit">Update</button>
                <button onClick={handleCancelClick}>Cancel</button>
        </form>
    );
}

export default EditTaskForm;