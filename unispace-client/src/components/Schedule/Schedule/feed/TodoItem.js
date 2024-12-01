import styled from "styled-components";
import React from 'react';
import useTodo from "../hooks/useHandleTodo";
import useBottomSheet from "../hooks/useBottomSheet";
import { ReactComponent as ThreeDot } from "../images/three-dots.svg";
import { ReactComponent as TodoCheck } from "../images/todo-check.svg";
import { ReactComponent as CheckIcon } from "../images/check.svg";

const TodoItem = ({ item }) => {
  const { label, isDone, category, id } = item;
  const { toggleTodo } = useTodo();
  const { onOpen } = useBottomSheet(false);

  return (
    <Wrapper>
      <div>
        <Check onClick={() => toggleTodo(id)}>
          <TodoCheck fill={isDone ? category.color : "#DBDDDF"} />
          {isDone && <CheckIcon className="check" />}
        </Check>
        <p>{label}</p>
      </div>
      <ThreeDot onClick={() => onOpen(item)} />
    </Wrapper>
  );
};

export default React.memo(TodoItem);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 21px;
  margin: 6px 0;
  & > div {
    display: flex;
    align-items: flex-start;
    p {
      margin-left: 8px;
      line-height: 128%;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  /* threedot button */
  & > svg {
    cursor: pointer;
  }
`;

const Check = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  /* 체크박스 */
  svg {
    cursor: pointer;
  }
  .check {
    position: absolute;
  }
`;
