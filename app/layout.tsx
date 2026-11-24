import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vereda Refúgio | Projeto conceitual",
  description: "Um intervalo entre árvores. Landing page conceitual de portfólio.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
