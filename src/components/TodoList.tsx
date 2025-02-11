import { useState } from "react";
import { Todo } from "../types";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: "", duedate: "" });
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        if (!todo.description || !todo.duedate) {
            alert("Please both description and due date");
        } else {
            setTodos([todo, ...todos]);
            setTodo({ description: "", duedate: "" });
        }
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <>
            <h1>Todo List</h1>
            <input
                type="text"
                value={todo.description}
                placeholder="Type what to do"
                onChange={(e) =>
                    setTodo({ ...todo, description: e.target.value })
                }
            />
            <input
                type="date"
                value={todo.duedate}
                placeholder="Type due date"
                onChange={(e) => setTodo({ ...todo, duedate: e.target.value })}
            />
            <button onClick={addTodo}>Add</button>

            <TodoTable todos={todos} deleteTodo={deleteTodo}/>
        </>
    );
}

export default TodoList;
