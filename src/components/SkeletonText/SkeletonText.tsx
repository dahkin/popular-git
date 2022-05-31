import React, { FC } from 'react';
import classNames from 'classnames';
import './SkeletonText.scss';
import { repeat } from '@app/utils';

interface SkeletonTextProps {
  rowsCount?: number;
  accent?: boolean;
}

export const SkeletonText: FC<SkeletonTextProps> = ({ accent = false, rowsCount = 1 }: SkeletonTextProps) => {
  return (
    <span
      className={classNames('skeleton-text', {
        'skeleton-text--accent': accent,
      })}
    >
      {repeat((i: number) => {
        return <span key={i} className="skeleton-text__row skeleton-gradient" />;
      }, rowsCount)}
    </span>
  );
};
