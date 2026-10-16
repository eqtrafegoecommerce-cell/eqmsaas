import { Suspense } from 'react';

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // O Suspense aqui no servidor protege a renderização dinâmica da página filha
    <Suspense fallback={<div>Carregando estrutura da loja...</div>}>
      {children}
    </Suspense>
  );
}
