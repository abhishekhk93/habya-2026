export const displayStyles = {
  wrapper: "w-[100vw] h-[100vh] bg-[#000000] text-white overflow-hidden flex flex-col font-sans select-none cursor-none",
  header: "flex justify-between items-center px-[4vw] py-[3vh] border-b border-white/10 shrink-0",
  headerText: "text-[3.5vw] font-bold tracking-widest uppercase bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]",
  
  main: "flex-1 flex flex-col items-center justify-center w-full px-[4vw] py-[2vh]",
  tableContainer: "w-full max-w-[92vw]",
  table: "w-full border-collapse table-fixed",
  
  thEmpty: "w-[40%]", // For player name column
  thSet: "w-[20%] text-[2.5vw] font-medium text-white/40 text-center pb-[3vh]",
  
  trPlayer: "border-b border-white/5 last:border-0",
  tdName: "py-[3vh] pr-[2vw]",
  playerNameBase: "inline-flex items-center gap-[1.5vw] text-[3.2vw] font-medium leading-tight break-words px-[1.5vw] py-[1.5vh] rounded-xl border-2 transition-all duration-700",
  playerNameDefault: "border-transparent text-white",
  playerNameWinner: "border-amber-400 bg-gradient-to-r from-yellow-200/15 to-amber-500/15 shadow-[0_0_25px_rgba(251,191,36,0.25)] text-yellow-300 transform scale-[1.02] origin-left animate-fade-up",
  
  tdScore: "text-[7vw] font-bold text-center py-[2vh]",
  
  scoreWrapper: "mx-auto w-[80%] rounded-xl flex items-center justify-center py-[1vh]",
  scoreWinner: "bg-green-600 text-white shadow-[0_0_30px_rgba(22,163,74,0.3)]",
  scoreLoser: "text-white",
  scoreEmpty: "text-white/20",
} as const;
