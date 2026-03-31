export interface HamburgerMenuItem {
  label: string;
  href: string;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: HamburgerMenuItem[];
  onLogout: () => void;
}
