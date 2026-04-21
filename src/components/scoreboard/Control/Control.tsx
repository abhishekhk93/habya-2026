"use client";

import { useEffect, useState } from "react";
import { getMatchData, saveMatchData, clearMatchData } from "@/lib/scoreboard/storage";
import { MatchData } from "@/lib/scoreboard/types";
import { controlStyles } from "./Control.styles";
import type { ControlProps } from "./Control.types";

export default function Control({ matchId }: ControlProps) {
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

  if (!data) return null;

  const updateData = (newData: MatchData) => {
    setData(newData);
    saveMatchData(matchId, newData);
  };

  const handleClear = () => {
    // Keep it simple and prompt-less as requested, but a standard confirm is fine since we "Clear Match" is destructive
    // Actually the prompt said "No confirmation dialogs (keep simple)". Let's remove confirm.
    setData(clearMatchData(matchId));
  };

  const isMatchFinished = data.matchWinner !== null;

  return (
    <div className={controlStyles.wrapper}>
      <div className={`${controlStyles.container} ${isMatchFinished ? "opacity-75 transition-opacity" : ""}`}>
        
        {/* Match Header Info */}
        <div className={controlStyles.headerCard}>
          <h2 className={controlStyles.title}>Match Info</h2>
          <div className={controlStyles.grid2}>
            <div className={controlStyles.inputGroup}>
              <label className={controlStyles.label}>Event Name</label>
              <input
                type="text"
                className={controlStyles.input}
                value={data.eventName}
                onChange={(e) => updateData({ ...data, eventName: e.target.value })}
                placeholder="e.g. Finals 2026"
              />
            </div>
            <div className={controlStyles.inputGroup}>
              <label className={controlStyles.label}>Round</label>
              <input
                type="text"
                className={controlStyles.input}
                value={data.round}
                onChange={(e) => updateData({ ...data, round: e.target.value })}
                placeholder="e.g. Semi-Final"
              />
            </div>
          </div>
          
          <div className="mt-4 md:mt-5">
            <h3 className="text-base md:text-lg font-medium mb-3">Players</h3>
            <div className={controlStyles.grid2}>
              <div className={controlStyles.inputGroup}>
                <label className={controlStyles.label}>Player 1 Name</label>
                <input
                  type="text"
                  className={controlStyles.input}
                  value={data.players[0].name}
                  onChange={(e) => {
                    const newPlayers = [...data.players] as typeof data.players;
                    newPlayers[0] = { name: e.target.value };
                    updateData({ ...data, players: newPlayers });
                  }}
                  placeholder="Player 1"
                />
              </div>
              <div className={controlStyles.inputGroup}>
                <label className={controlStyles.label}>Player 2 Name</label>
                <input
                  type="text"
                  className={controlStyles.input}
                  value={data.players[1].name}
                  onChange={(e) => {
                    const newPlayers = [...data.players] as typeof data.players;
                    newPlayers[1] = { name: e.target.value };
                    updateData({ ...data, players: newPlayers });
                  }}
                  placeholder="Player 2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sets */}
        {data.sets.map((set, i) => (
          <div key={i} className={controlStyles.setCard}>
            <div className={controlStyles.setCardHeader}>
              <span className="font-semibold text-gray-800">Set {i + 1}</span>
            </div>
            
            {/* Player 1 Row */}
            <div className={controlStyles.scoreRow}>
              <span className={controlStyles.scorePlayerName}>
                {data.players[0].name || "Player 1"}
              </span>
              <div className={controlStyles.scoreControls}>
                <button
                  className={controlStyles.scoreBtn}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    const cur = set.p1 === null ? 0 : set.p1;
                    newSets[i] = { ...set, p1: Math.max(0, cur - 1) };
                    updateData({ ...data, sets: newSets });
                  }}
                  disabled={set.p1 === null || set.p1 === 0}
                >
                  −
                </button>
                <span className={controlStyles.scoreValue}>{set.p1 === null ? "-" : set.p1}</span>
                <button
                  className={controlStyles.scoreBtn}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    const cur = set.p1 === null ? 0 : set.p1;
                    newSets[i] = { ...set, p1: cur + 1 };
                    // If p2 is null, initialize it to 0
                    if (newSets[i].p2 === null) newSets[i].p2 = 0;
                    updateData({ ...data, sets: newSets });
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Player 2 Row */}
            <div className={controlStyles.scoreRow}>
              <span className={controlStyles.scorePlayerName}>
                {data.players[1].name || "Player 2"}
              </span>
              <div className={controlStyles.scoreControls}>
                <button
                  className={controlStyles.scoreBtn}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    const cur = set.p2 === null ? 0 : set.p2;
                    newSets[i] = { ...set, p2: Math.max(0, cur - 1) };
                    updateData({ ...data, sets: newSets });
                  }}
                  disabled={set.p2 === null || set.p2 === 0}
                >
                  −
                </button>
                <span className={controlStyles.scoreValue}>{set.p2 === null ? "-" : set.p2}</span>
                <button
                  className={controlStyles.scoreBtn}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    const cur = set.p2 === null ? 0 : set.p2;
                    newSets[i] = { ...set, p2: cur + 1 };
                    // If p1 is null, initialize it to 0
                    if (newSets[i].p1 === null) newSets[i].p1 = 0;
                    updateData({ ...data, sets: newSets });
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Set Winner */}
            <div className={controlStyles.winnerGroup}>
              <div className={controlStyles.winnerTitle}>Set Winner</div>
              <div className={controlStyles.winnerButtons}>
                <button
                  className={`${controlStyles.winnerBtn} ${set.winner === 1 ? controlStyles.winnerBtnActive : controlStyles.winnerBtnInactive}`}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    newSets[i] = { ...set, winner: set.winner === 1 ? null : 1 };
                    updateData({ ...data, sets: newSets });
                  }}
                >
                  {data.players[0].name || "Player 1"}
                </button>
                <button
                  className={`${controlStyles.winnerBtn} ${set.winner === 2 ? controlStyles.winnerBtnActive : controlStyles.winnerBtnInactive}`}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    newSets[i] = { ...set, winner: set.winner === 2 ? null : 2 };
                    updateData({ ...data, sets: newSets });
                  }}
                >
                  {data.players[1].name || "Player 2"}
                </button>
                <button
                  className={`${controlStyles.winnerBtn} ${controlStyles.winnerBtnClear}`}
                  onClick={() => {
                    const newSets = [...data.sets] as typeof data.sets;
                    newSets[i] = { ...set, winner: null };
                    updateData({ ...data, sets: newSets });
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Match Controls */}
        <div className={controlStyles.matchControlCard}>
          <h2 className={controlStyles.title}>Match Result</h2>
          <div className={controlStyles.winnerGroup}>
            <div className={controlStyles.winnerTitle}>Set Match Winner</div>
            <div className={controlStyles.matchWinnerButtons}>
              <button
                className={`${controlStyles.winnerBtn} py-3 text-base ${data.matchWinner === 1 ? controlStyles.winnerBtnActive : controlStyles.winnerBtnInactive}`}
                onClick={() => {
                  updateData({ 
                    ...data, 
                    matchWinner: data.matchWinner === 1 ? null : 1,
                    status: data.matchWinner === 1 ? "LIVE" : "FINISHED"
                  });
                }}
              >
                {data.players[0].name || "Player 1"}
              </button>
              <button
                className={`${controlStyles.winnerBtn} py-3 text-base ${data.matchWinner === 2 ? controlStyles.winnerBtnActive : controlStyles.winnerBtnInactive}`}
                onClick={() => {
                  updateData({ 
                    ...data, 
                    matchWinner: data.matchWinner === 2 ? null : 2,
                    status: data.matchWinner === 2 ? "LIVE" : "FINISHED"
                  });
                }}
              >
                {data.players[1].name || "Player 2"}
              </button>
              <button
                className={`${controlStyles.winnerBtn} py-3 text-base ${controlStyles.winnerBtnClear}`}
                onClick={() => {
                  updateData({ 
                    ...data, 
                    matchWinner: null,
                    status: "LIVE"
                  });
                }}
              >
                Clear
              </button>
            </div>
          </div>

          <button className={controlStyles.dangerBtn} onClick={handleClear}>
            Clear Match
          </button>
        </div>

      </div>
    </div>
  );
}
