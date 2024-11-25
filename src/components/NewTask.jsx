import { useState } from "react";

export default function NewTask({ name: initialTaskName, isEnd: initialIsEnd, onDelete, onEdit, onToggleEnd }) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskName, setTaskName] = useState(initialTaskName);

    function handleSave() {
        onEdit(taskName); 
        setIsEditing(false);
    }

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mt-4">
            {isEditing ? (
                <input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    onKeyPress={(e) => (e.key === "Enter" ? handleSave() : null)}
                    className="flex-grow mr-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                />
            ) : (
                <span
                    onClick={onToggleEnd}
                    className={`flex-grow mr-4 cursor-pointer text-lg ${
                        initialIsEnd ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                >
                    {taskName}
                </span>
            )}

            <div className="flex items-center gap-3">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={onDelete}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}