import { Filters } from 'contexts/todo-store-context';

export type Filter = {
  searchQuery: string;
  filterName: Filters;
};

export type FilterWithId = Filter & {
  id: number;
};

export const createFilter = ({ searchQuery, filterName }: Filter): Filter => ({
  searchQuery,
  filterName,
});
