"use client";

import "@/core/styles/swipeable-card-stack.css";
import React, { Children, cloneElement } from "react";
import { useSwipeableCardStack } from "@/core/lib/hooks/use-swipeable-card-stack";
import { cn } from "@/core/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={cn("visible-card", className)} {...props}>
      <div className="visible-card-content">
        {children}
      </div>
    </div>
  );
};

const SwipeableCardStack = ({ children }: { children: React.ReactNode }) => {
  const cardImages = [
    "https://images.unsplash.com/photo-1579546928937-641f7ac9bced?w=270",
    "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=270",
    "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=270",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=270",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=270",
    "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=270",
    "https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?w=270",
  ];

  const cardCount = Children.count(children);
  const { scrollableContainerRef, calculateCardStyles } = useSwipeableCardStack(
    cardCount,
  );

  return (
    <main className="main sanity">
      <div id="parent">
        <div id="scrollable-container" ref={scrollableContainerRef}>
          {Children.map(
            children,
            (_, index) => (
              <a key={index} className="scrollable-card" href="/#"></a>
            ),
          )}
        </div>
        <div id="visible-cards-container">
          {Children.map(children, (child, index) =>
            cloneElement(child as React.ReactElement, {
              key: index,
              style: calculateCardStyles(index),
            }))}
        </div>
      </div>
    </main>
  );
};

export const SwipeableCardStackDemo = () => {
  return (
    <div className="app">
      <SwipeableCardStack>
        <Card>
          <h2>Card 1</h2>
          <p>This is the content for card 1</p>
        </Card>
        <Card>
          <h2>Card 2</h2>
          <p>Here's some content for card 2</p>
        </Card>
        <Card>
          <h2>Card 3</h2>
          <p>And this is card 3</p>
        </Card>
        <Card>
          <h2>Card 4</h2>
          <p>Content for card 4</p>
        </Card>
        <Card>
          <h2>Card 5</h2>
          <p>Here's card 5</p>
        </Card>
      </SwipeableCardStack>
    </div>
  );
};
