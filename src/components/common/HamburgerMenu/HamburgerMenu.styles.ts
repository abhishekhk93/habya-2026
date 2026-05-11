export const hamburgerMenuStyles = {
  // Backdrop overlay
  backdrop: "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
  backdropHidden: "opacity-0 pointer-events-none",
  backdropVisible: "opacity-100",

  // Slide-in panel
  panel: "fixed top-0 right-0 z-50 h-full w-60 sm:w-72 bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col overflow-y-auto",
  panelHidden: "translate-x-full",
  panelVisible: "translate-x-0",

  // Close button
  closeButton: "self-end mt-6 mr-6 mb-2 w-11 h-11 flex items-center justify-center rounded-full border border-black/10 hover:bg-black/5 transition-all duration-300 cursor-pointer",

  // Menu items (No layout padding here, so lines stretch 100% width!)
  itemsList: "flex flex-col mt-0",

  // Instead, apply padding INTO the item, with a sleek light shadow and ultra-light border combination spanning the full 100% width
  item: "block w-full text-lg sm:text-xl font-light text-black/70 hover:text-black px-8 py-3 border-b border-black/[0.03] shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-colors duration-200",

  // Logout button matches full width style
  logoutButton: "block w-full px-8 py-3 text-lg font-light text-black/50 hover:text-red-500 hover:bg-black/5 transition-colors duration-200 text-left cursor-pointer border-b border-black/[0.03]",
};
