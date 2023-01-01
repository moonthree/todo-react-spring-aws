import React, { useEffect, useState } from "react";
import { todoCall } from "../api/todo/TodoApi";
import TodoAdd from "../components/todo/TodoAdd";
import Todolist from "../components/todo/Todolist";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoCall("/todo", "GET", null).then((response) => setTodos(response.data));
  }, []);

  const addTodo = (title) => {
    todoCall("/todo", "POST", title).then((response) =>
      setTodos(response.data)
    );
  };

  const deleteTodo = (item) => {
    todoCall("/todo", "DELETE", item).then((response) =>
      setTodos(response.data)
    );
  };

  const updateTodo = (item) => {
    todoCall("/todo", "PUT", item).then((response) => setTodos(response.data));
  };

  return (
    <>
      <TodoAdd addTodo={addTodo} />
      {todos &&
        todos.map((todo) => (
          <Todolist
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
    </>
  );
}
