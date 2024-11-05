import { useState } from "react";

export default function NewTask(props) {
    const { name: taskName, isEnd: initialIsEnd, onDelete } = props;

    const [isEnd, setIsEnd] = useState(initialIsEnd);

    function handleTask() {
        setIsEnd(!isEnd);
    }

    return (
        <div className="flex justify-between mt-5">
            <button 
                onClick={handleTask} 
                className={`ml-5 ${isEnd ? 'line-through opacity-25' : ''}`}
            >
                {taskName}
            </button>
            
            <div className="flex gap-3 mr-5">
                <button onClick={onDelete} className="delete-button">Delete</button>
                <button className="bg-transparent border-custom-gold">Edit</button>
            </div>
        </div>
    );
}
