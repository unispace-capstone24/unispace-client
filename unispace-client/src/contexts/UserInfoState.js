import { atom } from "recoil";

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  // setSelf -> Callbacks to set or reset the value of the atom.
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  // onSet -> Subscribe to changes in the atom value.
  onSet((newValue, _, inReset) => {
    inReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    id: -1,
    name: null,
    logined: false,
    defaultPageId: -1,
    inPersonal: true,
    activeTeamId: null,
    activeChattingRoomId: null,
    teamList: [],
  },
  effects: [localStorageEffect("userInfoState")],
});
