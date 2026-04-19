import { sectionLabelStyles as s } from "./SectionLabel.styles";

interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return <div className={s.label}>{children}</div>;
}
