import React, { FC } from 'react';
import Fork from '@images/icons/fork-icon.svg';
import Star from '@images/icons/star-icon.svg';
import './RepoData.scss';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';
import { useAdaptive } from '@app/hooks';

export const RepoDataSkeleton: FC = () => {
  const { isDesktop } = useAdaptive();
  return (
    <div className="repo repo--short">
      <h2 className="repo__title">
        <SkeletonText accent />
      </h2>
      <p className="repo__description">
        <SkeletonText rowsCount={isDesktop ? 2 : 3} />
      </p>

      <div className="repo__data">
        <span className="repo__data-item">
          <Star className="repo__data-icon" />
          <SkeletonText />
        </span>
        <span className="repo__data-item">
          <Fork className="repo__data-icon" />
          <SkeletonText />
        </span>
      </div>
    </div>
  );
};
