import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";

export default function Todolist({ todo, deleteTodo, updateTodo }) {
  const [item, setItem] = useState(todo);
  const [readOnly, setReadOnly] = useState(true);
  const deleteEventHandler = () => {
    deleteTodo({ id: item.id });
  };
  const editEventHandler = (e) => {
    setItem({ ...item, title: e.target.value });
  };
  const turnOffReadOnly = () => {
    setReadOnly(false);
  };
  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      updateTodo(item);
    }
  };
  const checkboxEventHandler = (e) => {
    item.done = e.target.checked;
    updateTodo(item);
  };

  return (
    <>
      <TodoField>
        <Check
          checked={item.done}
          type="checkbox"
          onChange={checkboxEventHandler}
        />
        <Title
          type="text"
          readOnly={readOnly}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          value={item.title}
        />
        <RemoveBtn onClick={deleteEventHandler}>
          <AiOutlineDelete />
        </RemoveBtn>
      </TodoField>
    </>
  );
}

const TodoField = styled.div`
  ${tw`flex mb-4 items-center shadow-md`}
`;
const Title = styled.input`
  ${tw`w-full border-none`}
`;
const Check = styled.input`
  ${tw`w-5 h-5 mx-2 mt-0.5`}
`;
const RemoveBtn = styled.button`
  ${tw`flex-shrink-0 text-3xl mx-3 pb-2 rounded hover:text-red-400 text-gray-700`}
`;
