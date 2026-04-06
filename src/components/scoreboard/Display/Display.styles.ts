export const displayStyles = {
  wrapper: "w-[100vw] h-[100vh] bg-[#000000] text-white overflow-hidden flex flex-col font-sans select-none cursor-none",
  header: "flex justify-between items-center px-[4vw] py-[3vh] border-b border-white/10 shrink-0",
  headerText: "text-[3vw] font-light text-white/80 tracking-wide uppercase",
  
  main: "flex-1 flex flex-col items-center justify-center w-full px-[4vw] py-[2vh]",
  tableContainer: "w-full max-w-[92vw]",
  table: "w-full border-collapse table-fixed",
  
  thEmpty: "w-[40%]", // For player name column
  thSet: "w-[20%] text-[2.5vw] font-medium text-white/40 text-center pb-[3vh]",
  
  trPlayer: "border-b border-white/5 last:border-0",
  tdName: "text-[4.5vw] font-medium py-[4vh] truncate pr-[2vw]",
  tdScore: "text-[7vw] font-bold text-center py-[2vh]",
  
  scoreWrapper: "mx-auto w-[80%] rounded-xl flex items-center justify-center py-[1vh]",
  scoreWinner: "bg-green-600 text-white shadow-[0_0_30px_rgba(22,163,74,0.3)]",
  scoreLoser: "text-white",
  scoreEmpty: "text-white/20",
  
  bannerContainer: "h-[16vh] shrink-0 flex items-center justify-center border-t border-white/10 bg-gradient-to-t from-green-900/20 to-transparent",
  bannerText: "text-[4.5vw] font-bold text-green-400 tracking-widest uppercase",
} as const;
