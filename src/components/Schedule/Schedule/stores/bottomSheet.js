import { atom } from 'recoil';

export const bottomSheetState = atom({
  key: 'bottomSheet',
  default: { selectedItem: null, isOpen: false },
});
