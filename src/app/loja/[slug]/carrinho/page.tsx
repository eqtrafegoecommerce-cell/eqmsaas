// src/app/loja/[slug]/carrinho/page.tsx

// 1. Defina a tipagem correta para o parâmetro dinâmico da URL
interface CarrinhoProps {
  params: Promise<{
    slug: string;
  }>;
}

// 2. Garanta que a função use "async" e seja exportada como "default"
export default async function CarrinhoPage({ params }: CarrinhoProps) {
  // Desembrulha o parâmetro de forma segura
  const { slug } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Carrinho da loja: {slug}</h1>
      <p>Ajuste o conteúdo interno do seu carrinho aqui.</p>
    </div>
  );
}
