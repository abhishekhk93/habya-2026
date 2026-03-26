export const shopStyles = {
    // Main container
    container: [
        "h-full",
        "w-full",
        "flex",
        "flex-col",
        "lg:flex-row", // Split layout: Shop items + Cart sidebar
        "bg-white",
        "relative",
        "overflow-hidden",
    ].join(" "),

    // Products section
    mainSection: [
        "flex-1",
        "h-full",
        "overflow-y-auto",
        "p-6",
        "md:p-12",
        "lg:p-16",
        "flex",
        "flex-col",
    ].join(" "),

    // Grid for shirts
    gridContainer: [
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "xl:grid-cols-3",
        "gap-4",
    ].join(" "),

    shirtCard: [
        "flex",
        "flex-col",
        "bg-white",
        "rounded-2xl",
        "border",
        "border-black/5",
        "shadow-lg",
        "shadow-black/5",
        "overflow-hidden",
        "transition-all",
        "duration-300",
        "hover:shadow-2xl",
        "hover:shadow-black/10",
        "hover:border-black/10",
        "group",
    ].join(" "),

    imageFlipper: [
        "relative",
        "w-full",
        "aspect-[3/2]",
        "bg-gray-50",
        "overflow-hidden",
    ].join(" "),

    shirtImage: [
        "object-contain",
        "object-center",
        "w-full",
        "h-full",
        "scale-[0.85]",
        "transition-all",
        "duration-500",
    ].join(" "),

    cardContent: [
        "px-6",
        "py-4",
        "flex",
        "flex-col",
        "gap-2",
    ].join(" "),

    shirtName: [
        "text-md",
        "font-semibold",
        "text-black",
        "tracking-tight",
    ].join(" "),

    shirtPrice: [
        "text-sm",
        "font-medium",
        "text-black/60",
    ].join(" "),

    // Modal styles
    modalOverlay: [
        "fixed",
        "inset-0",
        "z-[60]",
        "bg-black/40",
        "backdrop-blur-sm",
        "flex",
        "items-center",
        "justify-center",
        "p-4",
        "opacity-0",
        "pointer-events-none",
        "transition-opacity",
        "duration-300",
    ].join(" "),

    modalOverlayOpen: "opacity-100 pointer-events-auto",

    modalContent: [
        "bg-white",
        "rounded-3xl",
        "shadow-2xl",
        "w-full",
        "max-w-2xl",
        "overflow-hidden",
        "transform",
        "scale-95",
        "transition-transform",
        "duration-300",
        "flex",
        "flex-col",
        "md:flex-row",
        "max-h-[90vh]", // ensure it doesn't overflow viewport height
    ].join(" "),
    
    modalContentOpen: "scale-100",

    modalImageSection: [
        "w-full",
        "md:w-5/12",
        "bg-gray-50",
        "relative",
        "h-48",
        "md:h-auto",
    ].join(" "),

    modalFormSection: [
        "flex-1",
        "px-4",
        "py-6",
        "md:p-8",
        "flex",
        "flex-col",
        "gap-6",
        "overflow-y-auto",
    ].join(" "),

    formGroup: [
        "flex",
        "flex-col",
        "gap-2",
    ].join(" "),

    label: [
        "text-sm",
        "font-medium",
        "text-black/90",
    ].join(" "),

    input: [
        "w-full",
        "p-2",
        "text-sm",
        "rounded-xl",
        "bg-black/5",
        "border",
        "border-black/10",
        "text-black",
        "placeholder:text-black/30",
        "placeholder:text-xs",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-black/10",
        "focus:border-black/20",
        "transition-all",
    ].join(" "),

    chipsContainer: [
        "flex",
        "flex-wrap",
        "gap-2",
    ].join(" "),

    chip: [
        "px-3",
        "py-2",
        "rounded-xl",
        "border",
        "text-xs",
        "font-medium",
        "cursor-pointer",
        "transition-all",
        "duration-200",
    ].join(" "),

    chipSelected: "bg-black text-white border-black shadow-md shadow-black/20",
    chipUnselected: "bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black",

    kidsDropdown: [
        "absolute",
        "top-full",
        "left-0",
        "mt-2",
        "p-2",
        "bg-white",
        "border",
        "border-black/10",
        "rounded-2xl",
        "shadow-xl",
        "z-[70]",
        "flex",
        "flex-wrap",
        "gap-2",
        "w-50",
    ].join(" "),

    sizeInfo: [
        "italic",
        "font-thin",
        "text-[10px]"
    ].join(" "),

    closeButton: [
        "w-8",
        "h-8",
        "flex",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-black/5",
        "text-black/60",
        "hover:bg-black/10",
        "hover:text-black",
        "transition-all",
        "absolute",
        "top-4",
        "right-4",
    ].join(" "),

    badge: [
        "fixed",
        "top-20",
        "right-5",
        "flex",
        "items-center",
        "gap-3",
        "bg-green-100",
        "text-green-800",
        "px-4",
        "py-3",
        "rounded-lg",
        "shadow-lg",
        "border",
        "border-green-300",
    ].join(" "),
    
    tickIcon: [
        "flex",
        "items-center",
        "justify-center",
        "w-6",
        "h-6",
        "bg-green-500",
        "text-white",
        "rounded-full",
        "text-sm",
    ].join(" "),

    badgeOpen: "opacity-100 pointer-events-auto",
} as const;
