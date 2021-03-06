import { memo } from 'react';
import Head from 'next/head';
import { TodoForm } from 'components/todo-form';
import { TodoList } from 'components/todo-list';
import { SearchQuery } from 'components/search-query';
import { SelectFilter } from 'components/select-filter';
import { SaveFilterPreset } from 'components/save-filter-preset';
import { FilterPresetList } from 'components/filter-preset-list';
import { WorkspaceName } from 'components/workspace-name';

const Home = memo(function Home() {
  return (
    <div className="grid mx-5 py-10 sm:py-20">
      <Head>
        <title>TODO LIST</title>
        <meta name="description" content="TODO LIST with nested items" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid w-full max-w-3xl justify-self-center gap-y-7">
        <WorkspaceName />
        <TodoForm parent="root" />

        <div className="grid grid-flow-row sm:grid-cols-auto/1fr gap-y-5 sm:gap-x-5 bg-yellow-50 p-3 rounded-md">
          <SearchQuery />

          <div className="grid grid-cols-1fr/auto">
            <SelectFilter />
            <SaveFilterPreset />
          </div>
        </div>

        <FilterPresetList />
        <TodoList parent="root" />
      </div>
    </div>
  );
});

export default Home;
