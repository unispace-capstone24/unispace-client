import React from 'react';
import { useRecoilValue } from "recoil";
import CategoryButton from "./CategoryButton";
import TodoItem from "./TodoItem";
import selectedDateState from "../stores/selectedDate";
import selectedProfileState from "../stores/selectedProfile";
import InputForm from "./InputForm";
import { editingState } from "../stores/editing";
import { todosByCategory } from "../stores/todos";

const FeedItemList = ({ category }) => {
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedProfile = useRecoilValue(selectedProfileState);
  const todos = useRecoilValue(
    todosByCategory({
      todoItemKey: [selectedDate, selectedProfile],
      categoryLabel: category.label,
    }),
  );
  const editing = useRecoilValue(editingState);

  return (
    <>
      <CategoryButton category={category} />
      {todos.map((todo) =>
        editing === todo.id ? (
          <InputForm
            category={category}
            initialValue={todo.label}
            id={todo.id}
            key={todo.id} // 추가: key prop을 TodoItem과 동일하게 추가
          />
        ) : (
          <TodoItem item={todo} key={todo.id} />
        )
      )}
      {editing === category.label && <InputForm category={category} />}
    </>
  );
};

export default FeedItemList;
