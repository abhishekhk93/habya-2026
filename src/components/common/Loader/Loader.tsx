import { loaderStyles as s } from "./Loader.styles";
import type { LoaderProps } from "./Loader.types";

export default function Loader({ message }: LoaderProps) {
  return (
    <div className={s.container}>
      <div className={s.spinner} />
      {message && <p className={s.message}>{message}</p>}
    </div>
  );
}
