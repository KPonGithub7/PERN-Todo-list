import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //delete todo function

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:2000/todos/${id}`, {
                method: "DELETE",
            });
            setTodos(todos.filter((todo) => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getAllTodos = async () => {
        try {
            const response = await fetch("http://localhost:2000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getAllTodos();
    }, []);

    console.log(todos);
    return (
        <div className="mt-8">
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTodo;
