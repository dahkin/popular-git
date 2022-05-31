import React, { FC } from 'react';
import './Repo.scss';
import { RepoDataSkeleton } from '@components/RepoData/RepoDataSkeleton';

export const RepoSkeleton: FC = () => {
  return (
    <>
      <div className="repo-item">
        <RepoDataSkeleton />
      </div>
    </>
  );
};
