import { atom } from "recoil";

export const spaceState = atom({
  key: "spaceState",
  default: {
    title: undefined,
    content: undefined,
  },
});

export const spaceEditedState = atom({
  key: "spaceEditedState",
  default: false,
});
