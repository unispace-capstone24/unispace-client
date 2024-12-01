import { createContext, useReducer, useContext } from "react";

const UIStateContext = createContext(undefined);
const UIDispatchContext = createContext(undefined);

function uiReducer(state, action) {
  // 메인 space 공간을 Workspace로
  if (action.type === "OPEN_WORKSPACE") {
    return { ...state, isSpaceWorkspace: true };
  }

  // 메인 space 공간을 Calendar로
  if (action.type === "OPEN_CALENDAR") {
    return { ...state, isSpaceWorkspace: false };
  }

  // Chatting 열고 닫기
  if (action.type === "TOGGLE_CHATTING") {
    return { ...state, isOpenChatting: !state.isOpenChatting };
  }

  throw new Error("UIContext - Unhandled action");
}

const initialState = {
  isSpaceWorkspace: true,
  isOpenChatting: false,
};

export function UIContextProvider({ children }) {
  const [uiState, uiDispatch] = useReducer(uiReducer, initialState);

  return (
    <UIDispatchContext.Provider value={uiDispatch}>
      <UIStateContext.Provider value={uiState}>
        {children}
      </UIStateContext.Provider>
    </UIDispatchContext.Provider>
  );
}

export function useUIState() {
  const state = useContext(UIStateContext);
  if (!state) throw new Error("UIContext - UIStateProvider not found");
  return state;
}

export function useUIDispatch() {
  const dispatch = useContext(UIDispatchContext);
  if (!dispatch) throw new Error("UIContext - UIDispatchProvider not found");
  return dispatch;
}
