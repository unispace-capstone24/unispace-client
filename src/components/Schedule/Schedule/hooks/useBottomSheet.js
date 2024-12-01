import { useRecoilState } from 'recoil';
import { bottomSheetState } from '../stores/bottomSheet';

const useBottomSheet = (initial) => {
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetState);
  const { isOpen, selectedItem } = bottomSheet;

  const onOpen = (item) => {
    setBottomSheet({ selectedItem: item, isOpen: true });
  };

  const onDismiss = () => {
    setBottomSheet({ selectedItem: null, isOpen: false });
  };

  return { isOpen, selectedItem, onOpen, onDismiss };
};

export default useBottomSheet;
