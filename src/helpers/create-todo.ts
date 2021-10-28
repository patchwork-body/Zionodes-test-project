import { nanoid } from 'nanoid';

export type Todo = {
  id: number;
  key: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  desc: string;
  completed: boolean;
};

type CreateTodoParams = {
  desc: string;
  order: number;
};

export const createTodo = ({ desc, order }: CreateTodoParams): Partial<Todo> => ({
  key: nanoid(),
  order,
  createdAt: new Date().toUTCString(),
  updatedAt: new Date().toUTCString(),
  desc,
  completed: false,
});
