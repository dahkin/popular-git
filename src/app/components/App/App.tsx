import React, { FC } from 'react';
import { Page } from '@components/Page/Page';
import './App.scss';

export const App: FC = () => {
  return (
    <div className="page">
      <div className="container">
        <Page />
      </div>
    </div>
  );
};
