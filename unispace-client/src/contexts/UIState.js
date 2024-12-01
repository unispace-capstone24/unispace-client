import { atom } from "recoil";

export const uiState = atom({
  key: "uiInfoState",
  default: {
    isChatting: false,
  },
});
