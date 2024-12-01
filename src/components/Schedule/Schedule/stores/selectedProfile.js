import { atom } from 'recoil';

const selectedProfileState = atom({
  key: 'selectedProfile',
  default: 'user1',
});

export default selectedProfileState;
