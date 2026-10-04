"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);
  const boxesRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const car = carRef.current;
    const trail = trailRef.current;

    if (!section || !track || !car || !trail) return;

    const ctx = gsap.context(() => {
      // Hide car initially
      gsap.set(car, { opacity: 0 });

      // Initial animation
      const intro = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      // WELCOME ITZFIZZ letters
      intro.fromTo(
        lettersRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
        }
      );

      // Statistics
      intro.fromTo(
        boxesRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
        },
        "-=0.15"
      );

      // Show car
      intro.to(car, {
        opacity: 1,
        duration: 0.3,
      });

      // Scroll animation
      const roadWidth = track.getBoundingClientRect().width;
      const carWidth = car.getBoundingClientRect().width;

      const startX = -carWidth;
      const endX = roadWidth - carWidth / 2;

      gsap.fromTo(
        car,
        {
          x: startX,
        },
        {
          x: endX,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            pin: track,
          },

          onUpdate: () => {
            const carX =
              gsap.getProperty(car, "x") + carWidth / 2;

            // Green trail
            gsap.set(trail, {
              width: Math.max(0, carX),
            });
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const addLetter = (letter) => {
    lettersRef.current.push(letter);
  };

  const addBox = (box) => {
    boxesRef.current.push(box);
  };

  return (
    <main
      ref={sectionRef}
      className="relative h-[200vh] bg-[#121212]"
    >
      <div
        ref={trackRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center bg-[#d1d1d1]"
      >
        <div className="relative h-[200px] w-screen overflow-hidden bg-[#1e1e1e]">
          
          {/* Green trail */}
          <div
            ref={trailRef}
            className="absolute left-0 top-0 z-[1] h-[200px] w-0 bg-[#45db7d]"
          />

          {/* Car */}
          <img
            ref={carRef}
            src="/McLaren 720S 2022 top view.png"
            alt="Car"
            className="absolute left-0 top-0 z-10 h-[200px] w-auto will-change-transform"
          />

          {/* WELCOME ITZFIZZ */}
          <div className="absolute left-[5%] top-[15%] z-[5] flex gap-[0.2rem] whitespace-nowrap text-[7rem] font-bold">
            {"WELCOME ITZFIZZ".split("").map((letter, index) => (
              <span
                key={index}
                ref={addLetter}
                className="inline-block text-[#111] opacity-0 will-change-[opacity,transform]"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div
          ref={addBox}
          className="absolute right-[30%] top-[5%] z-[5] m-4 flex flex-col items-start justify-center gap-[5px] rounded-[10px] bg-[#def54f] p-[30px] text-[18px] text-[#111] opacity-0 will-change-[transform,opacity]"
        >
          <span className="text-[58px] font-semibold">58%</span>
          Increase in pick up point use
        </div>

        <div
          ref={addBox}
          className="absolute bottom-[5%] right-[35%] z-[5] m-4 flex flex-col items-start justify-center gap-[5px] rounded-[10px] bg-[#6ac9ff] p-[30px] text-[18px] text-[#111] opacity-0 will-change-[transform,opacity]"
        >
          <span className="text-[58px] font-semibold">23%</span>
          Decreased in customer phone calls
        </div>

        <div
          ref={addBox}
          className="absolute right-[10%] top-[5%] z-[5] m-4 flex flex-col items-start justify-center gap-[5px] rounded-[10px] bg-[#333] p-[30px] text-[18px] text-white opacity-0 will-change-[transform,opacity]"
        >
          <span className="text-[58px] font-semibold">27%</span>
          Increase in pick up point use
        </div>

        <div
          ref={addBox}
          className="absolute bottom-[5%] right-[12.5%] z-[5] m-4 flex flex-col items-start justify-center gap-[5px] rounded-[10px] bg-[#fa7328] p-[30px] text-[18px] text-[#111] opacity-0 will-change-[transform,opacity]"
        >
          <span className="text-[58px] font-semibold">40%</span>
          Decreased in customer phone calls
        </div>
      </div>
    </main>
  );
}