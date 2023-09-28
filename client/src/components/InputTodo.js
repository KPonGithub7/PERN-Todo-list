import { useState } from "react";

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch("http://localhost:2000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">PERN Stack Todo</h1>
            <form className="mt-5 d-flex" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    );
};

export default InputTodo;
