import React, { FC, HTMLAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './ModalWrapper.scss';
import { CSSTransition } from 'react-transition-group';

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  onClose: VoidFunction;
  shown: boolean;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children, className, onClose, shown, ...restProps }) => {
  useEffect(() => {
    if (shown) {
      document.documentElement.classList.add('--prevent-scroll');
    }

    return () => {
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, [shown]);

  useEffect(() => {
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', documentKeydownListener);
    return () => {
      document.removeEventListener('keydown', documentKeydownListener);
    };
  }, [onClose]);

  return createPortal(
    <CSSTransition
      in={shown}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames="modal-wrapper-animation"
    >
      <div className={classNames('modal-wrapper', className)} onClick={onClose} {...restProps}>
        <div
          className="modal-wrapper__children"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
