import { Todo } from 'helpers/create-todo';
import { createContext, Dispatch, memo, ReactNode, useReducer } from 'react';

export type TodoStoreState = {
  draggableTodo: Todo | null;
  todos: Todo[];
};

export enum TodoStoreActions {
  INIT_TODOS = '@INIT_TODOS',
  SET_DRAGGABLE_TODO = '@SET_DRAGGABLE_TODO',
  ADD_TODO = '@ADD_TODO',
  UPDATE_TODO = '@UPDATE_TODO',
  REMOVE_TODO = '@REMOVE_TODO',
}

export type TodoStoreContextValue = {
  state: TodoStoreState;
  dispatch: Dispatch<{ type: TodoStoreActions; payload: any }>;
};

export type TodoStoreContextProviderProps = {
  children: ReactNode;
};

export const reducerInitState: TodoStoreState = {
  todos: [],
  draggableTodo: null,
};

export const TodoStoreContext = createContext<TodoStoreContextValue>({
  state: reducerInitState,
  dispatch: () => null,
});

const sortByOrder = (left: Todo, right: Todo) => (left.order > right.order ? 1 : -1);

export const TodoStoreContextProvider = memo(function TodoStoreContextProvider({
  children,
}: TodoStoreContextProviderProps) {
  const [state, dispatch] = useReducer(
    (state: TodoStoreState, action: { type: TodoStoreActions; payload: any }) => {
      switch (action.type) {
        case TodoStoreActions.INIT_TODOS:
          return { ...state, todos: action.payload.sort(sortByOrder) };

        case TodoStoreActions.SET_DRAGGABLE_TODO:
          return { ...state, draggableTodo: action.payload };

        case TodoStoreActions.ADD_TODO:
          return { ...state, todos: [...state.todos, action.payload] };

        case TodoStoreActions.UPDATE_TODO:
          return {
            ...state,
            todos: state.todos
              .map(todo => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo))
              .sort(sortByOrder),
          };

        case TodoStoreActions.REMOVE_TODO:
          return { ...state, todos: state.todos.filter(({ id }) => id !== action.payload) };

        default:
          return state;
      }
    },

    {
      draggableTodo: null,
      todos: [],
    },
  );

  return <TodoStoreContext.Provider value={{ state, dispatch }}> {children} </TodoStoreContext.Provider>;
});
