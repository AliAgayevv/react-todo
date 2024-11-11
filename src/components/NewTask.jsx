import { useState } from "react";

export default function NewTask({ name: initialTaskName, isEnd: initialIsEnd, onDelete, onEdit, onToggleEnd }) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskName, setTaskName] = useState(initialTaskName);

    function handleTaskToggle() {
        onToggleEnd();
    }

    function handleEditToggle() {
        setIsEditing(!isEditing);
    }

    function handleTaskNameChange(e) {
        setTaskName(e.target.value);
    }

    function handleSave() {
        onEdit(taskName); 
        setIsEditing(false);
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            handleSave();
        }
    }

    return (
        <div className="flex justify-between mt-5">
            {isEditing ? (
                <input
                    value={taskName}
                    onChange={handleTaskNameChange}
                    onKeyPress={handleKeyPress}
                    className="ml-5 border-b border-gray-300 outline-none"
                    autoFocus
                />
            ) : (
                <button
                    onClick={handleTaskToggle} 
                    className={`ml-5 ${initialIsEnd ? 'line-through opacity-25' : ''}`}
                >
                    {taskName}
                </button>
            )}
            
            <div className="flex gap-3 mr-5">
                <button onClick={onDelete} className="delete-button border-2 p-2">Delete</button>
                {isEditing ? (
                    <button onClick={handleSave} className="save-button border-2 p-2">Save</button>
                ) : (
                    <button onClick={handleEditToggle} className="edit-button border-2 p-2">Edit</button>
                )}
            </div>
        </div>
    );
}