import React from "react";

export interface HamburgerMenuItem {
  label: string;
  href: string;
  prefetch?: boolean;
  icon?: React.ReactNode;
  showBadge?: boolean;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: HamburgerMenuItem[];
  onLogout: () => void;
}
