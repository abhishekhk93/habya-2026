import { Navbar } from "@/components/Navbar";
import { layoutStyles } from "./Layout.styles";
import type { LayoutProps } from "./Layout.types";

export default function Layout({ children }: LayoutProps) {
    
    return (
        <div className={layoutStyles.wrapper}>
            <Navbar />
            <main className={layoutStyles.main}>
                {children}
            </main>
        </div>
    );
}
