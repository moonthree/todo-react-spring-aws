import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";

export default function TodoAdd(props) {
  const [title, setTitle] = useState({ title: "" });
  const addTodo = props.addTodo;

  const onTitleHandler = (event) => {
    setTitle({ title: event.currentTarget.value });
  };

  const onSubmitHandler = (event) => {
    // preventDefault : 새로고침 방지
    event.preventDefault();
    addTodo(title);
    setTitle({ title: "" });
  };

  return (
    <>
      <FormField onSubmit={onSubmitHandler}>
        <InputWrapper>
          <Input
            onChange={onTitleHandler}
            type="text"
            placeholder="Add Todo"
            value={title.title}
          />
          <InputBtn>Add</InputBtn>
        </InputWrapper>
      </FormField>
    </>
  );
}

const FormField = styled.form`
  ${tw`mb-4`}
`;
const InputWrapper = styled.div`
  ${tw`flex mt-4`}
`;
const Input = styled.input`
  ${tw`shadow appearance-none border rounded w-full
  py-2 px-3 mr-4 text-gray-600`}
`;
const InputBtn = styled.button`
  ${tw`flex-shrink-0 p-2 border-2 rounded text-teal-300
  border-teal-300 hover:text-white hover:bg-teal-300`}
`;
