import { AddTodoForm } from 'components/ui/add-todo-form';
import Head from 'next/head';
import { memo } from 'react';

const Home = memo(function Home() {
  return (
    <div>
      <Head>
        <title>TODO LIST</title>
        <meta name="description" content="TODO LIST with nested items" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddTodoForm />
    </div>
  );
});

export default Home;
