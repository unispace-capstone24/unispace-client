import { atomFamily, selectorFamily } from 'recoil';

const initialState = [
  {
    label: '과제 시작하기',
    isDone: true,
    id: '1',
    category: {
      label: 'GDSC',
      color: '#ae68ec',
    },
  },
  {
    label: '과제 완료 토글 구현하기',
    isDone: false,
    id: '2',
    category: {
      label: 'GDSC',
      color: '#ae68ec',
    },
  },
  {
    label: '검정치마 노래듣기',
    isDone: false,
    id: '3',
    category: {
      label: '할일',
      color: '#dc7b82',
    },
  },
];

export const todoState = atomFamily({
  key: 'todo',
  default: initialState, // 여기서 initialState를 기본값으로 설정
});

export const todosByCategory = selectorFamily({
  key: 'todoSelector',
  get: ({ todoItemKey, categoryLabel }) => ({ get }) =>
    get(todoState(todoItemKey)).filter(
      (todo) => todo.category.label === categoryLabel,
    ),
});
