import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Todo } from 'helpers/create-todo';
import { TodoItem } from './';

describe('TodoItem', () => {
  test('delete todo item', () => {
    const todo: Todo = {
      id: 'awesome-id',
      order: 0,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      desc: 'todo name',
      completed: false,
    };

    render(<TodoItem todo={todo} />);
    userEvent.click(screen.getByLabelText('delete todo'));
  });
});
