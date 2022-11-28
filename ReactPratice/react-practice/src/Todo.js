import React from "react";

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClink() {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClink} />
                {todo.name}
            </label>
        </div>
    )
}