export type Todo = {
  id: number;
  createdAt: string;
  desc: string;
};

export const createTodo = (desc: string): Partial<Todo> => ({
  createdAt: new Date().toUTCString(),
  desc,
});
