import React, { FC, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RepoSkeleton } from '@components/Repo/RepoSkeleton';
import { Repo } from '@components/Repo/Repo';
import { getTranslateXValue, percentage } from '@app/utils';
import { Dispatch } from '@app/store';
import { fetchRepos } from '@features/repos/actions';
import { getRepos } from '@features/repos/selectors';

import ArrowRight from '@images/icons/arrow-right.svg';
import ArrowLeft from '@images/icons/arrow-left.svg';

import './RepoList.scss';

export const RepoList: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const repos = useSelector(getRepos);

  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [animationProgress, setAnimationProgress] = useState<boolean>(false);
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
  const [startPointer, setStartPointer] = useState<boolean>(false);
  const [movePointer, setMovePointer] = useState<boolean>(false);

  const reposRef = useRef<HTMLDivElement>(null);
  const reposContainerRef = useRef<HTMLDivElement>(null);

  // Get repos data with loading
  useEffect(() => {
    setLoading(true);
    dispatch(fetchRepos()).then(() => {
      setLoading(false);
    });
  }, []);

  // Carousel
  // Show next slide
  const showNext = () => {
    // Don't fire slide change if previous is not finished
    if (animationProgress) {
      return;
    }
    setAnimationProgress(true);
    setCurrentIndex((prevState) => prevState + 1);
  };

  // Show prev slide
  const showPrev = () => {
    // Don't fire slide change if previous is not finished
    if (animationProgress) {
      return;
    }
    setAnimationProgress(true);
    setCurrentIndex((prevState) => prevState - 1);
  };

  // Animation end handler
  const animationEndHandler = () => {
    // Set indicator that animation is over
    setAnimationProgress(false);

    // Check if loop should be initiated
    if (currentIndex < 1) {
      // Disable animation
      setEnableAnimation(false);
      // Move index to the last item
      setCurrentIndex(repos.length);
    } else if (currentIndex > repos.length) {
      setEnableAnimation(false);
      // Move index to the first item
      setCurrentIndex(1);
    }
  };

  // Turn on animation back
  useEffect(() => {
    if (currentIndex === 1 || currentIndex === repos.length) {
      setEnableAnimation(true);
    }
  }, [currentIndex, repos]);

  // Start pointer event
  const pointerDownHandler = () => {
    // Turn off animation
    setEnableAnimation(false);
    // Get initial values of the pointer
    const translateXValue = getTranslateXValue(reposRef.current as HTMLDivElement);
    setInitialPosition(translateXValue);
    setCurrentPosition(translateXValue);
    // Set indicator that pointer event is started
    setStartPointer(true);
  };

  // To enable move/up pointer events to be continued outside of the slider,
  // added listeners on the document instead
  useEffect(() => {
    // Move pointer event
    const pointerMoveHandler = (e: PointerEvent) => {
      if (startPointer) {
        if (reposRef?.current) {
          setCurrentPosition((prev) => prev - e.movementX);
          reposRef.current.style.transform = `translateX(-${currentPosition}px)`;
        }
      }
    };

    // Up pointer event
    const pointerUpHandler = () => {
      // Turn on animations
      setEnableAnimation(true);
      // Set indicator that pointer events is finished
      setStartPointer(false);

      // Switch to the next slide or back to the current
      if (reposContainerRef?.current && reposRef?.current) {
        const diff = Math.abs(currentPosition - initialPosition);
        const repoWidth = reposContainerRef.current.offsetWidth;
        if (percentage(diff, repoWidth) > 50) {
          if (currentPosition > initialPosition) {
            showNext();
          } else {
            showPrev();
          }
        } else {
          reposRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
      }
    };

    // Document event listeners
    if (startPointer) {
      document.addEventListener('pointermove', pointerMoveHandler);
      document.addEventListener('pointerup', pointerUpHandler);
    } else {
      document.removeEventListener('pointermove', pointerMoveHandler);
      document.removeEventListener('pointerup', pointerUpHandler);
    }

    return () => {
      document.removeEventListener('pointermove', pointerMoveHandler);
      document.removeEventListener('pointerup', pointerUpHandler);
    };
  }, [startPointer, currentPosition]);

  // Set indicator that the move was fired
  // to prevent then the click on the repo item
  useEffect(() => {
    if (Math.abs(currentPosition - initialPosition) > 5) {
      setMovePointer(true);
    } else {
      setMovePointer(false);
    }
  }, [currentPosition, initialPosition]);

  // Show skeleton on loading
  if (loading) {
    return (
      <div className="repos">
        <button className="repos__button repos__button--prev">
          <ArrowLeft className="repos__button-icon" />
        </button>
        <div className="repos__container">
          <RepoSkeleton />
        </div>
        <button className="repos__button repos__button--next">
          <ArrowRight className="repos__button-icon" />
        </button>
      </div>
    );
  }

  return (
    <>
      {repos && (
        <div className="repos">
          <button className="repos__button repos__button--prev" onClick={showPrev} aria-label="Show prev slide">
            <ArrowLeft className="repos__button-icon" />
          </button>
          <div className="repos__container" ref={reposContainerRef}>
            <div
              className="repos__wrap"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: enableAnimation ? `transform 250ms ease-in` : undefined,
              }}
              onTransitionEnd={animationEndHandler}
              onPointerDown={pointerDownHandler}
              ref={reposRef}
            >
              <Repo repo={repos[repos.length - 1]} preventClick={movePointer} />
              {repos.map((repo) => (
                <Repo key={repo.id} repo={repo} preventClick={movePointer} />
              ))}
              <Repo repo={repos[0]} preventClick={movePointer} />
            </div>
          </div>
          <button className="repos__button repos__button--next" onClick={showNext} aria-label="Show next slide">
            <ArrowRight className="repos__button-icon" />
          </button>
        </div>
      )}
    </>
  );
};
