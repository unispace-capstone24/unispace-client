import { atom, selectorFamily } from "recoil";

const initialState = [
  { label: "공부", color: "#AE68EC" },
  { label: "약속", color: "#DC7B82" },
  { label: "할일", color: "#FFDA40" },
];

export const categoryState = atom({
  key: "category",
  default: initialState,
});

export const selectTodoItemCategoryColor = selectorFamily({
  key: "selectTodoItemCategoryColor",
  get: (labels) => ({ get }) => {
    const category = get(categoryState);
    const result = labels.map((label) => 
      category.filter((v) => v.label === label)[0]?.color
    );
    return result;
  },
});
