export interface HamburgerMenuItem {
  label: string;
  href: string;
  prefetch?: boolean;
}

export interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: HamburgerMenuItem[];
  onLogout: () => void;
}
