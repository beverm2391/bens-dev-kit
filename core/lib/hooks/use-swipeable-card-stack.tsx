"use client";

import { useEffect, useRef, useState } from "react";

export const useSwipeableCardStack = (cardCount: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  const scrollableContainerRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {
      const {
        // @ts-ignore
        scrollLeft, // @ts-ignore
        scrollWidth, // @ts-ignore
        clientWidth,
      } = scrollableContainerRef.current;

      const newScrollProgress = scrollLeft / (scrollWidth - clientWidth);
      setGlobalScrollProgress(newScrollProgress);
      handleActiveIndex(newScrollProgress);
    };

    // @ts-ignore
    scrollableContainerRef.current.addEventListener("scroll", handleScroll);
    return () => {
        // @ts-ignore
      scrollableContainerRef.current?.removeEventListener( 
        "scroll",
        handleScroll,
      );
    };
  }, [cardCount]);

  const handleActiveIndex = (progress: any) => { // TODO type this
    const relativeScrollPerCard = 1 / (cardCount - 1);
    const previousScrollSnapPoint = relativeScrollPerCard * (activeIndex - 1);
    const nextScrollSnapPoint = relativeScrollPerCard * (activeIndex + 1);

    if (progress <= previousScrollSnapPoint && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (progress >= nextScrollSnapPoint && activeIndex < cardCount - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const calculateCardStyles = (index: number) => {
    const maxCardsOnOneSide = 5;
    const relativeScrollPerCard = cardCount > 1 ? 1 / (cardCount - 1) : 1;
    const cardRelativeScrollStart = relativeScrollPerCard * index;
    const cardScrollProgress =
      (globalScrollProgress - cardRelativeScrollStart) / relativeScrollPerCard;
    const absoluteCardScrollProgress = Math.abs(cardScrollProgress);
    const activeCardScrollProgress =
      globalScrollProgress / relativeScrollPerCard - activeIndex;
    const absoluteActiveCardScrollProgress = Math.abs(activeCardScrollProgress);

    // Reuse the calculation logic from the original VisibleCard class
    let translateX = 0;
    if (activeIndex === index) {
      if (absoluteCardScrollProgress < 0.5) {
        translateX = -128 * cardScrollProgress;
      } else {
        translateX = -128 * Math.sign(cardScrollProgress);
        translateX += 128 * cardScrollProgress;
        translateX += -((1 - absoluteCardScrollProgress / cardCount / 4) * 10) *
          (absoluteCardScrollProgress - 0.5) * 2 *
          Math.sign(cardScrollProgress);
      }
    } else {
      translateX = cardScrollProgress *
        -((1 - absoluteCardScrollProgress / cardCount / 4) * 10);
    }

    const translateZ = 200 - absoluteCardScrollProgress * 40;

    let rotateY = 0;
    if (absoluteActiveCardScrollProgress < 0.5) {
      rotateY = absoluteActiveCardScrollProgress * -75;
    } else {
      rotateY = (1 - absoluteActiveCardScrollProgress) * -75;
    }

    if (index === activeIndex) {
      if (absoluteCardScrollProgress < 0.5) {
        rotateY = absoluteCardScrollProgress * -90;
      } else {
        rotateY = (1 - absoluteCardScrollProgress) * -90;
      }
    }

    rotateY *= Math.sign(activeCardScrollProgress) *
      (1 - Math.abs(activeIndex - index) / cardCount);

    const rotateZ = cardScrollProgress * 2 * -1;

    let scale = 1 - absoluteCardScrollProgress * 0.05;
    if (index === activeIndex) {
      if (absoluteCardScrollProgress < 0.5) {
        scale -= absoluteCardScrollProgress * 0.25;
      } else {
        scale -= (1 - absoluteCardScrollProgress) * 0.25;
      }
    }
    scale = Math.max(scale, 0);

    const distanceIndex = Math.abs(activeIndex - index);
    let zIndex = cardCount - distanceIndex;

    if (Math.sign(activeCardScrollProgress) === -1) {
      if (index < activeIndex) {
        zIndex += 1;
        if (activeCardScrollProgress < -0.5) {
          zIndex += 1;
        }
      }
    }
    if (Math.sign(activeCardScrollProgress) === 1) {
      if (index === activeIndex) {
        zIndex += 1;
      }
      if (index > activeIndex) {
        zIndex += 1;
        if (activeCardScrollProgress > 0.5) {
          zIndex += 1;
        }
      }
    }

    let opacity = maxCardsOnOneSide - absoluteCardScrollProgress;
    opacity = Math.max(0, Math.min(1, opacity));

    return {
      transform: `translateX(${
        translateX - 50
      }%) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  return { scrollableContainerRef, calculateCardStyles };
};
