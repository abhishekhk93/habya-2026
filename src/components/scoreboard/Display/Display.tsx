"use client";

import { useEffect, useState } from "react";
import { getMatchData } from "@/lib/scoreboard/storage";
import { MatchData } from "@/lib/scoreboard/types";
import { displayStyles } from "./Display.styles";
import type { DisplayProps } from "./Display.types";

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
                <td className={displayStyles.tdName}>{data.players[0].name || "Player 1"}</td>
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
                <td className={displayStyles.tdName}>{data.players[1].name || "Player 2"}</td>
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

      {/* Winner Banner Space */}
      <div className={displayStyles.bannerContainer}>
        {data.matchWinner !== null && (
          <div className={displayStyles.bannerText}>
            🏆 WINNER: {data.players[data.matchWinner - 1].name || `Player ${data.matchWinner}`}
          </div>
        )}
      </div>
    </div>
  );
}
