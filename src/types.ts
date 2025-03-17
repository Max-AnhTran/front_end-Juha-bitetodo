export type Todo = {
    priority: any;
    description: string;
    duedate: string;
};

export type TableProps = {
    todos: Todo[];
    deleteTodo: (index: number) => void;
};
