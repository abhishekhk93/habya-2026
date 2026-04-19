"use client";

import { scatteredDotsStyles as s } from "./ScatteredDots.styles";

const DOTS = [
  { top: "85%", left: "35%", isPeach: false },
  { top: "80%", left: "45%", isPeach: true },
  { top: "88%", left: "55%", isPeach: false },
  { top: "82%", left: "65%", isPeach: true },
  { top: "92%", left: "40%", isPeach: true },
  { top: "90%", left: "50%", isPeach: false },
  { top: "95%", left: "60%", isPeach: true },
];

export default function ScatteredDots() {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {DOTS.map((dot, i) => (
          <span
            key={i}
            className={`${s.dot} ${dot.isPeach ? 'bg-[#ffccb3]' : 'bg-[#b3d9ff]'}`}
            style={{ top: dot.top, left: dot.left, opacity: 0.6 }}
          />
        ))}
      </div>
    </div>
  );
}
