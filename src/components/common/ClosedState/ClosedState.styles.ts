export const closedStateStyles = {
    wrapper: "flex flex-col items-center justify-start py-12 px-4 text-center animate-in fade-in duration-700",
    
    card: "w-[calc(100%-1rem)] sm:w-full max-w-[500px] flex flex-col bg-white rounded-[20px] px-6 pt-10 pb-14 sm:px-10 sm:pt-12 sm:pb-16 shadow-sm border border-[#d9d9d9] items-center gap-6",
    
    iconContainer: "w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-colors duration-300",
    
    title: "text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300",
    
    description: "text-base font-light text-black/60 leading-relaxed max-w-xs",
    
    theme: {
        indigo: {
            iconContainer: "bg-indigo-50/50 text-indigo-600 border border-indigo-200",
            title: "text-indigo-600",
        },
        brown: {
            iconContainer: "bg-amber-50 text-amber-800",
            title: "text-amber-900",
        },
        emerald: {
            iconContainer: "bg-emerald-100 text-emerald-600",
            title: "text-emerald-600",
        },
        default: {
            iconContainer: "bg-black/5 text-black/40",
            title: "text-black/90",
        }
    }
} as const;
