export interface NavItem {
    label: string;
    href: string;
    subItems?: NavItem[];
}

export interface NavbarProps {
    items?: NavItem[];
}
