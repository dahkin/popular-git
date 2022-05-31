import React, { FC, useState } from 'react';
import { RepoModal } from '@components/RepoModal/RepoModal';
import { RepoData } from '@components/RepoData/RepoData';
import './Repo.scss';
import { RepoAPI } from '@app/types';

interface Props {
  repo: RepoAPI;
  preventClick?: boolean;
}

export const Repo: FC<Props> = ({ repo, preventClick }) => {
  const [repoModalShown, setRepoModalShown] = useState(false);

  const showModal = () => {
    setRepoModalShown(true);
  };

  return (
    <>
      <div className="repo-item" onClick={!preventClick ? showModal : undefined}>
        <RepoData repo={repo} />
      </div>
      <RepoModal
        repo={repo}
        shown={repoModalShown}
        onClose={() => {
          setRepoModalShown(false);
        }}
      />
    </>
  );
};
