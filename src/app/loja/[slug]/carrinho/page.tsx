import { Suspense } from 'react'

type CheckoutProps = {
  isOpen: boolean
  onClose: () => void
  total: number
  subtotal: number
  onFinalizar: (dados: any) => Promise<void>
  carregando: boolean
}

function Checkout({ isOpen, onClose, total, subtotal, onFinalizar, carregando }: CheckoutProps) {
  if (!isOpen) return null

  return (
    <section aria-label="Resumo do carrinho">
      <p>Subtotal: {subtotal}</p>
      <p>Total: {total}</p>
      <button type="button" onClick={onClose}>Fechar</button>
      <button
        type="button"
        disabled={carregando}
        onClick={() => void onFinalizar({ subtotal, total })}
      >
        Finalizar compra
      </button>
    </section>
  )
}

export const instant = false; // Desativando a renderização instantânea para esta página  

export default function CarrinhoPage() {
  // Criamos funções e valores padrão para satisfazer os requisitos do componente Checkout
  const dadosMockadosDoCarrinho = {
    isOpen: true,
    onClose: () => console.log("Fechar carrinho"),
    total: 0,
    subtotal: 0,
    onFinalizar: async (dados: any) => console.log("Finalizando...", dados),
    carregando: false
  };

  return (
    <main>
      <h1>Seu Carrinho</h1>
      <Suspense fallback={<p>Carregando itens do carrinho...</p>}>
        {/* Passamos as propriedades obrigatórias usando o operador spread (...) */}
        <Checkout {...dadosMockadosDoCarrinho} />
      </Suspense>
    </main>
  )
}
