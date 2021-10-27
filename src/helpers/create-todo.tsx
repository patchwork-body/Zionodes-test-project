import { nanoid } from 'nanoid';

export type Todo = {
  id: string;
  createdAt: string;
  desc: string;
};

export const createTodo = (desc: string): Todo => ({
  id: nanoid(),
  createdAt: new Date().toUTCString(),
  desc,
});
