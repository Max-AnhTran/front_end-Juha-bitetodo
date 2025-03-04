import { useState, useRef } from "react";
import { Todo } from "../types";
// import TodoTable from "./TodoTable";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial, themeBalham } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: "", duedate: "", priority: "" });
    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact<Todo>>(null);
    const [colDefs] = useState<ColDef[]>([
        { field: "description", sortable: true, filter: true, floatingFilter: true},
        { field: "duedate", sortable: true, filter: true, floatingFilter: true },
        { field: "priority", sortable: true, filter: true, floatingFilter: true,
            cellStyle: (params) => {
            if (params.value === "High") {
                return { color: "red" };
            } else if (params.value === "Medium") {
                return { color: "orange" };
            } else {
                return { color: "green" };
            }
         },
         },
    ]);

    const addTodo = () => {
        if (!todo.description || !todo.duedate || !todo.priority) {
            alert("Please fill in all fields.");
        } else {
            setTodos([todo, ...todos]);
            setTodo({ description: "", duedate: "", priority: ""});
        }
    };

    // const deleteTodo = (index: number) => {
    //     setTodos(todos.filter((_, i) => i !== index));
    // };

    const handleDelete = () => {
        setTodos(
          todos.filter(
            (_, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
          )
        )
      }

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
                    onChange={(e) =>
                        setTodo({ ...todo, duedate: e.target.value })
                    }
                />
                <input
                    type="text"
                    value={todo.priority}
                    placeholder="Type priority"
                    onChange={(e) =>
                        setTodo({ ...todo, priority: e.target.value })
                    }
                />
                <button type="submit" onClick={addTodo}>Add</button>
                <button onClick={handleDelete}>Delete</button>

            <div style={{ width: 700, height: 500 }}>
                <AgGridReact 
                ref={gridRef}
                rowData={todos} 
                columnDefs={colDefs} 
                rowSelection={"single"}
                theme={themeMaterial}/>
            </div>

            {/* <TodoTable todos={todos} deleteTodo={deleteTodo} /> */}
        </>
    );
}

export default TodoList;
