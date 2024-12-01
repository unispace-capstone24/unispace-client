import { createContext, useReducer, useContext } from "react";

const WorkspaceStateContext = createContext(undefined);
const WorkspaceDispatchContext = createContext(undefined);

function workspaceReducer(state, action) {
  if (action.type === "UPDATE_MD") {
    return { ...state, md: action.md };
  }

  if (action.type === "UPLOAD_MD") {
    console.log("마크다운 업로드 코드 작성하기");
    return { ...state };
  }

  throw new Error("WorkspaceContext - Unhandled Action");
}

const initialState = {
  md: "",
};

export function WorkspaceContextProvider({ children }) {
  const [workspaceState, workspaceDispatch] = useReducer(
    workspaceReducer,
    initialState
  );

  return (
    <WorkspaceDispatchContext.Provider value={workspaceDispatch}>
      <WorkspaceStateContext.Provider value={workspaceState}>
        {children}
      </WorkspaceStateContext.Provider>
    </WorkspaceDispatchContext.Provider>
  );
}

export function useWorkspaceState() {
  const state = useContext(WorkspaceStateContext);
  if (!state)
    throw new Error("WorkspaceContext - WorkspaceStateProvider not found");
  return state;
}

export function useWorkspaceDispatch() {
  const dispatch = useContext(WorkspaceDispatchContext);
  if (!dispatch)
    throw new Error("WorkspaceContext - WorkspaceDispatchProvider not found");
  return dispatch;
}
