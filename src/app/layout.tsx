// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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