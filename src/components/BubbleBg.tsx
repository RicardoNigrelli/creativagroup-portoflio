"use client";

import { useEffect } from "react";

interface BubbleType {
  children: React.ReactNode;
}

export const BubbleBg: React.FC<BubbleType> = ({ children }) => {
  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>(".interactive")!;
    if (!interBubble) {
      console.error("Elemento .interactive no encontrado.");
      return;
    }
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const proximityFactor = 0.4;

    function move() {
      curX += (tgX - curX) * proximityFactor;
      curY += (tgY - curY) * proximityFactor;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();
  }, []);

  return (
    <div className="gradient-bg">
      {children}
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>

        <div className="interactive"></div>
      </div>
    </div>
  );
};