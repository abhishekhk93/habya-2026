import { titleBlockStyles as s } from "./TitleBlock.styles";

interface TitleBlockProps {
  title: string;
  subtitle: string;
}

export default function TitleBlock({ title, subtitle }: TitleBlockProps) {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{title}</h1>
      <p className={s.subtitle}>{subtitle}</p>
    </div>
  );
}
