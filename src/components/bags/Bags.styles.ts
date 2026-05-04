export const bagStyles = {
  wrapper: "relative z-10 flex flex-col items-center justify-start min-h-[calc(100svh-160px)] py-12 px-4",
  
  card: "w-[calc(100%-1rem)] sm:w-full max-w-5xl lg:max-w-[1200px] mx-auto my-auto flex flex-col bg-white rounded-[20px] px-6 pt-6 pb-10 sm:px-10 sm:pt-6 sm:pb-12 mt-0 shadow-sm border border-[#d9d9d9]",

  header: "text-2xl font-light tracking-tight mb-2 text-center",

  subtitle: "text-sm font-light mb-4 text-center",

  container: "h-full w-full flex flex-col lg:flex-row bg-white relative overflow-hidden",

  mainSection: "flex-1 h-full overflow-y-auto p-6 md:p-12 lg:p-16 flex flex-col",

  gridContainer: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",

  shirtCard: "flex flex-col rounded-2xl border shadow-lg shadow-black/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:border-black/10 group bg-[#ffd4b3]/30 w-full mb-4 border-[#ffd4b3] hover:border-[#ffd4b3]/30",
  
  imageFlipper: "relative w-full aspect-[3/2] bg-white overflow-hidden",

  shirtImage: "object-contain object-center w-full h-full scale-[1.1] transition-all duration-500",

  cardContent: "px-6 py-4 flex flex-col gap-2",

  shirtName: "text-md font-semibold text-black tracking-tight flex justify-center items-center",

  shirtPrice: "text-sm font-medium text-black/60",

  controlsContainer: "flex items-center justify-center gap-6 my-2",

  counterButton: "w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#B45309]/30 text-[#B45309] hover:bg-[#B45309] hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-30",

  countDisplay: "text-lg font-medium text-black min-w-[1rem] text-center",

  arrowButton: "absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 border border-[#B45309]/30 backdrop-blur-sm shadow flex items-center justify-center text-[#B45309] hover:bg-[#B45309] hover:text-white transition-colors z-10",

} as const;
