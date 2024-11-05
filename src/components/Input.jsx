import { useState } from "react";

function Input()
{

    const [task, setTask] = useState("")

    function handleSubmit(e) 
    {
        console.log(task)
        setTask(() => "")
    }

    function handleChange(e)
    {
        setTask(() => e.target.value);
        console.log(task)
    }

    return(
        <div>
            <input onChange={handleChange} className="w-11/12 h-16 p-4 outline-none text-custom-slategray" placeholder="What shall i do today?" value={task}>
            </input>
            <button onClick={handleSubmit} className="bg-white w-1/12 h-16 border-none outline-none text-custom-slategray">
                +
            </button>
        </div>
    )
}

export default Input;