import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch(`http://localhost:2000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <button
                // type="button"
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${todo.todo_id}`}
            >
                Edit
            </button>

            <div
                class="modal"
                id={`id${todo.todo_id}`}
                onClick={(e) => setDescription(todo.description)}
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                className="d-flex justify-content-center align-items-center"
                                onClick={(e) =>
                                    setDescription(todo.description)
                                }
                            >
                                &times;
                            </button>
                        </div>

                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div class="modal-footer">
                            <button
                                class="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={(e) => updateTodo(e)}
                            >
                                Edit
                            </button>
                            <button
                                class="btn btn-danger "
                                data-bs-dismiss="modal"
                                onClick={(e) =>
                                    setDescription(todo.description)
                                }
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;
