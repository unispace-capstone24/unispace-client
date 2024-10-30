import { createContext, useContext, useReducer } from "react";

const TeamStateContext = createContext(undefined);
const TeamDispatchContext = createContext(undefined);

function teamReducer(state, action) {
  // Personal Space로 변경
  if (action.type === "TO_PERSONAL") {
    return { isPersonal: true };
  }

  // Team 변경
  if (action.type === "TO_OTHER_TEAM") {
    return { isPersonal: false };
  }

  throw new Error("TeamStateContext - Unhandled action");
}

const initialState = {
  isPersonal: true,
};

export function TeamContextProvider({ children }) {
  const [teamState, teamDispatch] = useReducer(teamReducer, initialState);

  return (
    <TeamDispatchContext.Provider value={teamDispatch}>
      <TeamStateContext.Provider value={teamState}>
        {children}
      </TeamStateContext.Provider>
    </TeamDispatchContext.Provider>
  );
}

export function useTeamState() {
  const state = useContext(TeamStateContext);
  if (!state) throw new Error("TeamContext - TeamStateProvider not found");
  return state;
}

export function useTeamDispatch() {
  const dispatch = useContext(TeamDispatchContext);
  if (!dispatch) {
    throw new Error("TeamContext - TeamDispatchProvider not found");
  }
  return dispatch;
}
