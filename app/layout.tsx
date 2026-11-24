import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: [
    { url: (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-icon-32.png", type: "image/png", sizes: "32x32" },
    { url: (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/brand-icon.png", type: "image/png", sizes: "64x64" },
  ] },
  title: "Vereda Refúgio | Projeto conceitual",
  description: "Um intervalo entre árvores. Landing page conceitual de portfólio.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
