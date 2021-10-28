import { Todo } from 'helpers/create-todo';
import { createContext, Dispatch, memo, ReactNode, useReducer } from 'react';

export type ReducerState = {
  workspaceName: string;
  todos: Todo[];
};

export type StoreContextValue = {
  state: ReducerState;
  dispatch: Dispatch<{ type: ReducerActions; payload: any }>;
};

export type StoreContextProviderProps = {
  children: ReactNode;
};

export enum ReducerActions {
  ADD_TODO = '@ADD_TODO',
  INIT_TODOS = '@INIT_TODOS',
  REMOVE_TODO = '@REMOVE_TODO',
}

export const reducerInitState: ReducerState = {
  workspaceName: '',
  todos: [],
};

export const StoreContext = createContext<StoreContextValue>({
  state: reducerInitState,
  dispatch: () => null,
});

export const StoreContextProvider = memo(function StoreContextProvider({ children }: StoreContextProviderProps) {
  const [state, dispatch] = useReducer(
    (state: ReducerState, action: { type: ReducerActions; payload: any }) => {
      switch (action.type) {
        case ReducerActions.ADD_TODO:
          return { ...state, todos: [...state.todos, action.payload] };
        case ReducerActions.REMOVE_TODO:
          return { ...state, todos: state.todos.filter(({ id }) => id !== action.payload) };
        case ReducerActions.INIT_TODOS:
          return { ...state, todos: action.payload };
        default:
          return state;
      }
    },

    {
      workspaceName: '',
      todos: [],
    },
  );

  return <StoreContext.Provider value={{ state, dispatch }}> {children} </StoreContext.Provider>;
});
