import { useState } from "react";

export default function NewTask(props) {
    const taskName = props.name;

    const [isEnd, setIsEnd] = useState(props.isEnd)


    function handleTask()
    {
        setIsEnd(() => !isEnd)
        console.log(isEnd)
        // isEnd === false ? isEnd = !isEnd : isEnd = isEnd
        // console.log(isEnd);
    }

    return (
        
            <div className="flex justify-between mt-5">
                {
                    isEnd === true ?  <button onClick={handleTask} className="ml-5 line-through opacity-25  " >{taskName}</button> : 
                    <button onClick={handleTask} className="ml-5" >{taskName}</button>
                }
                
                <div className="flex gap-3 mr-5">
                    <button className="bg-transparent border-custom-gold" /> Delete
                    <button className="bg-transparent border-custom-gold" /> Edit
                </div>
            </div>

    )
}

