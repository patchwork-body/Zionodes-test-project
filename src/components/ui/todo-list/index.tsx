import { memo } from 'react';
import type { Todo } from 'helpers/create-todo';
import { TodoItem } from 'components/ui/todo-item';

export type TodoListProps = {
  todos: Todo[];
};

export const TodoList = memo(function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
});
