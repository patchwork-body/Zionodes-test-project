import { nanoid } from 'nanoid';

export type Todo = {
  id: string;
  desc: string;
};

export const createTodo = (desc: string): Todo => ({
  id: nanoid(),
  desc,
});
