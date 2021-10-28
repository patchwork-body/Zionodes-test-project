import React, { memo } from 'react';
import Head from 'next/head';
import { TodoForm } from 'components/todo-form';
import { TodoList } from 'components/todo-list';

const Home = memo(function Home() {
  return (
    <div>
      <Head>
        <title>TODO LIST</title>
        <meta name="description" content="TODO LIST with nested items" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoForm parent="root" />
      <TodoList parent="root" />
    </div>
  );
});

export default Home;
