import React, { FC } from 'react';
import { ModalWrapper } from '@components/ModalWrapper/ModalWrapper';
import Cross from '@images/icons/cross-icon.svg';
import './RepoModal.scss';
import { RepoData } from '@components/RepoData/RepoData';
import { RepoAPI } from '@app/types';

interface EmailModalProps {
  onClose: VoidFunction;
  shown: boolean;
  repo: RepoAPI;
}

export const RepoModal: FC<EmailModalProps> = ({ onClose, shown, repo }) => {
  return (
    <ModalWrapper shown={shown} onClose={onClose}>
      <div className="repo-modal">
        <div className="repo-modal__close-wrap">
          <button className="repo-modal__close-btn" onClick={onClose} aria-label="Close modal">
            <Cross className="repo-modal__close-btn-icon" />
          </button>
        </div>
        <RepoData repo={repo} isExtended />
      </div>
    </ModalWrapper>
  );
};
