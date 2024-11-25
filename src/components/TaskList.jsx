function TaskList() {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                <span className="text-xl font-semibold text-gray-700">Tasks</span>
                <span className="text-xl font-semibold text-gray-700">Actions</span>
            </div>
        </div>
    );
}

export default TaskList;