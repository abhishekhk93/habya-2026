"use client";

import { useEffect, useState } from "react";
import { getMatchData } from "@/lib/scoreboard/storage";
import { MatchData } from "@/lib/scoreboard/types";
import { displayStyles } from "./Display.styles";
import type { DisplayProps } from "./Display.types";
import confetti from "canvas-confetti";

export default function Display({ matchId }: DisplayProps) {
  const [data, setData] = useState<MatchData | null>(null);

  useEffect(() => {
    setData(getMatchData(matchId));
    
    const handleStorage = () => {
      setData(getMatchData(matchId));
    };
    
    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage", handleStorage);
    };
  }, [matchId]);

  // Confetti celebration when a match winner is set
  useEffect(() => {
    let animationFrameId: number;
    let isActive = true;

    if (data?.matchWinner !== null && data?.matchWinner !== undefined) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        if (!isActive) return;
        
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });

        if (Date.now() < end) {
          animationFrameId = requestAnimationFrame(frame);
        }
      };
      
      frame();
    }

    return () => {
      isActive = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      confetti.reset();
    };
  }, [data?.matchWinner]);

  // Handle hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !data) return null;

  return (
    <div className={displayStyles.wrapper}>
      {/* Header */}
      <div className={displayStyles.header}>
        <div className={displayStyles.headerText}>{data.eventName || "\u00A0"}</div>
        <div className={displayStyles.headerText}>{data.round || "\u00A0"}</div>
      </div>

      {/* Main Scoreboard */}
      <main className={displayStyles.main}>
        <div className={displayStyles.tableContainer}>
          <table className={displayStyles.table}>
            <thead>
              <tr>
                <th className={displayStyles.thEmpty}></th>
                <th className={displayStyles.thSet}>Set 1</th>
                <th className={displayStyles.thSet}>Set 2</th>
                <th className={displayStyles.thSet}>Set 3</th>
              </tr>
            </thead>
            <tbody>
              {/* Player 1 Row */}
              <tr className={displayStyles.trPlayer}>
                <td className={displayStyles.tdName}>
                  <div className={`${displayStyles.playerNameBase} ${data.matchWinner === 1 ? displayStyles.playerNameWinner : displayStyles.playerNameDefault}`}>
                    <span>{data.players[0].name || "Player 1"}</span>
                    {data.matchWinner === 1 && <span>🎉</span>}
                  </div>
                </td>
                {data.sets.map((set, i) => (
                  <td key={`p1-set-${i}`} className={displayStyles.tdScore}>
                    <div className={`${displayStyles.scoreWrapper} ${set.winner === 1 ? displayStyles.scoreWinner : set.p1 === null ? displayStyles.scoreEmpty : displayStyles.scoreLoser}`}>
                      <span key={set.p1} className="inline-block animate-fade-up">
                        {set.p1 === null ? "−" : set.p1}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Player 2 Row */}
              <tr className={displayStyles.trPlayer}>
                <td className={displayStyles.tdName}>
                  <div className={`${displayStyles.playerNameBase} ${data.matchWinner === 2 ? displayStyles.playerNameWinner : displayStyles.playerNameDefault}`}>
                    <span>{data.players[1].name || "Player 2"}</span>
                    {data.matchWinner === 2 && <span>🎉</span>}
                  </div>
                </td>
                {data.sets.map((set, i) => (
                  <td key={`p2-set-${i}`} className={displayStyles.tdScore}>
                    <div className={`${displayStyles.scoreWrapper} ${set.winner === 2 ? displayStyles.scoreWinner : set.p2 === null ? displayStyles.scoreEmpty : displayStyles.scoreLoser}`}>
                      <span key={set.p2} className="inline-block animate-fade-up">
                        {set.p2 === null ? "−" : set.p2}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
