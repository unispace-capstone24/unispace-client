import React, { useContext, useReducer, createContext } from "react";

const ScheduleStateContext = createContext(undefined);

const ScheduleDispatchContext = createContext(undefined);

const scheduleReducer = (state, action) => {
  // 완료한 todo
  if (action.type === "COMPLETE_TODO") {
    return { ...state, isTodo: true };
  }

  // 미완료 todo
  if (action.type === "ADD_CATEGORY") {
    return { ...state, isCategory: false };
  }

  // 카테고리창 열고 닫기
  if (action.type === "WRITE_TODO") {
    return { ...state, isCategory: !state.isCategory };
  }

  throw new Error("UIContext - Unhandled action");
};

const initialState = {
  isCategory: false,
  isTodo: false,
};

export function ScheduleContextProvider({ children }) {
  const [scheduleState, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialState
  );

  return (
    <ScheduleDispatchContext.Provider value={scheduleDispatch}>
      <ScheduleStateContext.Provider value={scheduleState}>
        {children}
      </ScheduleStateContext.Provider>
    </ScheduleDispatchContext.Provider>
  );
}

export function useScheduleState() {
  const state = useContext(ScheduleStateContext);
  if (!state)
    throw new Error("ScheduleContext - ScheduleStateProvider not found");
  return state;
}

export function useScheduleDispatch() {
  const dispatch = useContext(ScheduleDispatchContext);
  if (!dispatch)
    throw new Error("ScheduleContext - ScheduleDispatchProvider not found");
  return dispatch;
}
