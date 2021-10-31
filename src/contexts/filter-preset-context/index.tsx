import { FilterWithId } from 'helpers/create-filter';
import { createContext, Dispatch, memo, ReactNode, useReducer } from 'react';

export type FilterPresetStoreState = FilterWithId[];

export enum FilterPresetStoreActions {
  INIT_FILTER_PRESET = '@INIT_FILTER_PRESET',
  ADD_FILTER_PRESET = '@ADD_FILTER_PRESET',
  REMOVE_FILTER_PRESET = '@REMOVE_FILTER_PRESET',
}

export type FilterPresetStoreContextValue = {
  state: FilterPresetStoreState;
  dispatch: Dispatch<{ type: FilterPresetStoreActions; payload: any }>;
};

export type FilterPresetStoreContextProviderProps = {
  children: ReactNode;
};

export const reducerInitState: FilterPresetStoreState = [];

export const FilterPresetStoreContext = createContext<FilterPresetStoreContextValue>({
  state: reducerInitState,
  dispatch: () => null,
});

export const FilterPresetStoreContextProvider = memo(function FilterPresetStoreContextProvider({
  children,
}: FilterPresetStoreContextProviderProps) {
  const [state, dispatch] = useReducer(
    (state: FilterPresetStoreState, action: { type: FilterPresetStoreActions; payload: any }) => {
      switch (action.type) {
        case FilterPresetStoreActions.INIT_FILTER_PRESET:
          return [...state];

        case FilterPresetStoreActions.ADD_FILTER_PRESET:
          return [...state, action.payload];

        case FilterPresetStoreActions.REMOVE_FILTER_PRESET:
          return state.filter(({ id }) => id === action.payload);

        default:
          return state;
      }
    },

    [],
  );

  return <FilterPresetStoreContext.Provider value={{ state, dispatch }}>{children}</FilterPresetStoreContext.Provider>;
});
