import React, { FC } from 'react';
import { RepoList } from '@features/repos/components/RepoList/RepoList';
// import { Carousel } from '@components/Carousel/Carousel';
import './Page.scss';

export const Page: FC = () => {
  return (
    <>
      <h2 className="title">Топ популярных javascript репозиториев</h2>
      <RepoList />
    </>
  );
};
