import { useState, useRef } from "react";
import { Todo } from "../types";
// import TodoTable from "./TodoTable";
import {
    AllCommunityModule,
    ModuleRegistry,
    ColDef,
    themeMaterial,
    themeBalham,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
    const [todo, setTodo] = useState<Todo>({
        description: "",
        duedate: "",
        priority: "",
    });
    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact<Todo>>(null);
    const [colDefs] = useState<ColDef[]>([
        {
            field: "description",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            field: "duedate",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            field: "priority",
            sortable: true,
            filter: true,
            floatingFilter: true,
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
            setTodo({ description: "", duedate: "", priority: "" });
        }
    };

    // const deleteTodo = (index: number) => {
    //     setTodos(todos.filter((_, i) => i !== index));
    // };

    const handleDelete = () => {
        setTodos(
            todos.filter(
                (_, index) =>
                    index !==
                    Number(gridRef.current?.api.getSelectedNodes()[0].id)
            )
        );
    };

    const setDueDate = (newValue: any) => {
        setTodo({ ...todo, duedate: dayjs(newValue).format("YYYY-MM-DD") });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1>Todo List</h1>

            <Stack direction="row" spacing={2} justifyContent={"center"}>
                <TextField
                    type="text"
                    value={todo.description}
                    label="Type what to do"
                    onChange={(e) =>
                        setTodo({ ...todo, description: e.target.value })
                    }
                />
                <DatePicker
                    value={todo.duedate ? dayjs(todo.duedate) : null}
                    label="Type due date"
                    onChange={(newValue) => setDueDate(newValue)}
                />
                <TextField
                    type="text"
                    value={todo.priority}
                    label="Type priority"
                    onChange={(e) =>
                        setTodo({ ...todo, priority: e.target.value })
                    }
                />
                <Button type="submit" onClick={addTodo}>
                    Add
                </Button>
                <Button onClick={handleDelete}>Delete</Button>
            </Stack>

            <div style={{ width: 700, height: 500, margin: "auto" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={todos}
                    columnDefs={colDefs}
                    rowSelection={"single"}
                    theme={themeMaterial}
                />
            </div>

            {/* <TodoTable todos={todos} deleteTodo={deleteTodo} /> */}
        </LocalizationProvider>
    );
}

export default TodoList;