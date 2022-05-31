import React, { FC } from 'react';
import classNames from 'classnames';
import { RepoAPI } from '@app/types';
import { capitalizeFirstLetter, readableURL } from '@app/utils';

import Fork from '@images/icons/fork-icon.svg';
import Star from '@images/icons/star-icon.svg';
import Link from '@images/icons/link-icon.svg';

import './RepoData.scss';

interface Props {
  repo: RepoAPI;
  isExtended?: boolean;
}

export const RepoData: FC<Props> = ({ repo, isExtended }) => {
  return (
    <div className={classNames('repo', isExtended ? 'repo--extended' : 'repo--short')}>
      {isExtended && capitalizeFirstLetter(repo.owner.login)}
      <h2 className="repo__title">{repo.name}</h2>
      <p className="repo__description">{repo.description}</p>
      {isExtended && (
        <>
          {repo.homepage && (
            <div className="repo__data">
              <span className="repo__data-item">
                <Link className="repo__data-icon" />
                <a href={repo.homepage} target="_blank" rel="noreferrer" className="repo__data-item">
                  {readableURL(repo.homepage)}
                </a>
              </span>
            </div>
          )}
          {repo.topics.length > 0 && (
            <div className="repo__tag-group">
              {repo.topics.map((topic) => (
                <div key={topic} className="repo__tag">
                  {topic}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="repo__data">
        <span className="repo__data-item">
          <Star className="repo__data-icon" /> {repo.stargazers_count}
        </span>
        <span className="repo__data-item">
          <Fork className="repo__data-icon" /> {repo.forks_count}
        </span>
      </div>
    </div>
  );
};
