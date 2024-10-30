import { useRecoilValue } from "recoil";
import { todoState } from "../stores/todos";
import getSortedArray from "./getSortedArray";

const UseTodoInfo = (date, userId) => {
  const todos = useRecoilValue(todoState([date, userId]));

  const colors = todos
    .filter((todo) => todo.isDone === true)
    .map((done) => done.category.color);

  const colorSet = new Set(getSortedArray(colors));
  const colorSetArr = Array.from(colorSet);

  const count = todos.filter((todo) => !todo.isDone).length;
  const isDone = count === 0 && todos.length !== 0;

  return { count, colorSetArr, isDone };
};

export default UseTodoInfo;
