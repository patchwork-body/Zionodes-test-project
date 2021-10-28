import { nanoid } from 'nanoid';

export type Todo = {
  id: number;
  key: string;
  createdAt: string;
  desc: string;
  completed: boolean;
};

export const createTodo = (desc: string): Partial<Todo> => ({
  key: nanoid(),
  createdAt: new Date().toUTCString(),
  desc,
  completed: false,
});
