import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MUV Academia - Jiu-Jitsu, Funcional, Boxe e MMA",
  description: "Academia completa com aulas de Jiu-Jitsu, Funcional, Boxe e MMA. Conheça o Projeto SOMA - aulas gratuitas de Jiu-Jitsu para crianças.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
