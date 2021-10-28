import { memo } from 'react';
import Head from 'next/head';
import { RootTodoList } from 'components/root-todo-list';
import { AddTodoForm } from 'components/ui/add-todo-form';

const Home = memo(function Home() {
  return (
    <div>
      <Head>
        <title>TODO LIST</title>
        <meta name="description" content="TODO LIST with nested items" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddTodoForm />
      <RootTodoList />
    </div>
  );
});

export default Home;
