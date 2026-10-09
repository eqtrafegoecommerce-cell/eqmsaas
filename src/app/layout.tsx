// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // ESTA LINHA É OBRIGATÓRIA

export const metadata: Metadata = {
  title: "EQ MicroSaas",
  description: "Gerencie sua loja",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="BR">
      {/* Adicione a propriedade abaixo para ignorar alterações de extensões */}
      <body 
        className={`min-h-full flex flex-col`} 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}