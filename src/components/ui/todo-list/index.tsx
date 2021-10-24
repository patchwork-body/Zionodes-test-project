import { memo, useEffect, useState } from 'react';
import { useROTransaction } from 'hooks/use-ro-transaction';

export const TodoList = memo(function TodoList() {
  const [data, setData] = useState<any[]>([]);
  const { getAll } = useROTransaction();

  useEffect(() => {
    getAll().then((nextItems: any[]) => setData(nextItems));
  });

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.desc}</li>
      ))}
    </ul>
  );
});
