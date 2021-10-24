import { memo, useEffect, useState } from 'react';
import { useROTransaction } from 'hooks/use-ro-transaction';
import type { Todo } from 'helpers/create-todo';

export const TodoList = memo(function TodoList() {
  const [data, setData] = useState<Todo[]>([]);
  const { getAll } = useROTransaction();

  useEffect(() => {
    getAll().then((nextItems: Todo[]) => setData(nextItems));
  });

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.desc}</li>
      ))}
    </ul>
  );
});
