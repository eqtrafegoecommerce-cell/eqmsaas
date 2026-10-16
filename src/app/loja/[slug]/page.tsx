
"use client";

import { useMemo, useState } from "react";

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  emoji: string;
  destaque?: boolean;
};

type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

const produtos: Produto[] = [
  {
    id: 1,
    nome: "Brigadeiro Gourmet",
    descricao: "Chocolate cremoso com granulado especial.",
    preco: 4.5,
    categoria: "Doces",
    emoji: "🍫",
    destaque: true,
  },
  {
    id: 2,
    nome: "Brownie de Chocolate",
    descricao: "Casquinha crocante e interior macio.",
    preco: 8.0,
    categoria: "Doces",
    emoji: "🍰",
    destaque: true,
  },
  {
    id: 3,
    nome: "Bolo no Pote",
    descricao: "Camadas generosas de bolo e recheio.",
    preco: 12.0,
    categoria: "Bolos",
    emoji: "🧁",
  },
  {
    id: 4,
    nome: "Coxinha de Frango",
    descricao: "Massa douradinha com recheio temperado.",
    preco: 7.0,
    categoria: "Salgados",
    emoji: "🥟",
    destaque: true,
  },
  {
    id: 5,
    nome: "Empada Artesanal",
    descricao: "Massa amanteigada e recheio saboroso.",
    preco: 6.0,
    categoria: "Salgados",
    emoji: "🥧",
  },
  {
    id: 6,
    nome: "Combo do Dia",
    descricao: "Dois doces e dois salgados para compartilhar.",
    preco: 24.9,
    categoria: "Combos",
    emoji: "🎁",
  },
];

const categorias = ["Todos", "Doces", "Bolos", "Salgados", "Combos"];

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function LojaPublicaPage() {
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  // Demonstração: o nome será carregado pelo slug na integração com o banco.
  const slug =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").filter(Boolean).pop()
      : "";

  const nomeLoja = slug
    ? slug
        .split("-")
        .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ")
    : "Minha Loja";

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const correspondeCategoria =
        categoria === "Todos" || produto.categoria === categoria;

      const termo = busca.toLocaleLowerCase("pt-BR");
      const correspondeBusca =
        produto.nome.toLocaleLowerCase("pt-BR").includes(termo) ||
        produto.descricao.toLocaleLowerCase("pt-BR").includes(termo);

      return correspondeCategoria && correspondeBusca;
    });
  }, [categoria, busca]);

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );

  function adicionarProduto(produto: Produto) {
    setCarrinho((atual) => {
      const existente = atual.find(
        (item) => item.produto.id === produto.id
      );

      if (existente) {
        return atual.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...atual, { produto, quantidade: 1 }];
    });
  }

  function alterarQuantidade(id: number, variacao: number) {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.produto.id === id
            ? { ...item, quantidade: item.quantidade + variacao }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function finalizarPedido() {
    alert(
      "O carrinho está funcionando! Na próxima etapa, vamos integrar a finalização do pedido ao Supabase e configurar o envio pelo WhatsApp da loja."
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-gray-900">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="#inicio" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              🧁
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold">{nomeLoja}</p>
              <p className="text-xs text-gray-500">Feito com carinho ❤️</p>
            </div>
          </a>

          <button
            onClick={() => setCarrinhoAberto(!carrinhoAberto)}
            className="relative flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-gray-700"
          >
            🛒 <span className="hidden sm:inline">Meu carrinho</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-500 px-1 text-xs">
              {quantidadeTotal}
            </span>
          </button>
        </div>
      </header>

      {/* Banner principal */}
      <section id="inicio" className="px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-200 via-rose-100 to-amber-100">
          <div className="grid min-h-[300px] items-center gap-4 p-7 sm:p-12 md:grid-cols-[1.3fr_0.7fr]">
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-800">
                Produção artesanal
              </span>
              <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Seu momento merece algo delicioso.
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-gray-700">
                Descubra nossos doces, bolos e salgados preparados com
                carinho. Escolha seus favoritos e faça seu pedido!
              </p>
              <a
                href="#cardapio"
                className="mt-6 inline-flex rounded-full bg-gray-900 px-6 py-3.5 font-bold text-white transition hover:bg-gray-700"
              >
                Ver cardápio ↓
              </a>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-white/50 bg-white/40 text-8xl shadow-xl sm:h-60 sm:w-60 sm:text-9xl">
                🍰
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-3 sm:px-6">
        {[
          { emoji: "🧑‍🍳", titulo: "Feito artesanalmente", texto: "Cuidado em cada detalhe" },
          { emoji: "💝", titulo: "Feito para você", texto: "Sabor que conquista" },
          { emoji: "🛍️", titulo: "Pedido fácil", texto: "Escolha e monte seu carrinho" },
        ].map((item) => (
          <div
            key={item.titulo}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4"
          >
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <p className="font-bold">{item.titulo}</p>
              <p className="text-sm text-gray-500">{item.texto}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              Nosso cardápio
            </p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Escolha seus favoritos
            </h2>
            <p className="mt-2 text-gray-500">
              Produtos preparados para deixar seu dia mais gostoso.
            </p>
          </div>

          <div className="w-full sm:max-w-xs">
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="🔎 Buscar produto..."
              aria-label="Buscar produto"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categorias.map((item) => (
            <button
              key={item}
              onClick={() => setCategoria(item)}
              className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold transition ${
                categoria === item
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-orange-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <article
              key={produto.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-orange-50 to-rose-100">
                <span className="text-8xl transition duration-300 group-hover:scale-110">
                  {produto.emoji}
                </span>

                {produto.destaque && (
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-orange-700 shadow-sm">
                    ⭐ Mais pedido
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {produto.categoria}
                </p>
                <h3 className="mt-2 text-xl font-extrabold">
                  {produto.nome}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                  {produto.descricao}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xl font-black">
                    {moeda(produto.preco)}
                  </span>
                  <button
                    onClick={() => adicionarProduto(produto)}
                    aria-label={`Adicionar ${produto.nome} ao carrinho`}
                    className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-4xl">🔎</p>
            <p className="mt-3 text-lg font-bold">Nenhum produto encontrado</p>
            <p className="mt-1 text-gray-500">
              Tente outro nome ou escolha uma categoria diferente.
            </p>
          </div>
        )}
      </section>

      {/* Rodapé */}
      <footer className="mt-10 border-t border-gray-200 bg-white px-4 py-8 text-center">
        <p className="font-extrabold">{nomeLoja}</p>
        <p className="mt-2 text-sm text-gray-500">
          Agradecemos pela visita. Esperamos seu pedido! ❤️
        </p>
        <p className="mt-5 text-xs text-gray-400">
          Loja criada com PedidoFácil
        </p>
      </footer>

      {/* Painel do carrinho */}
      {carrinhoAberto && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <button
            aria-label="Fechar carrinho"
            onClick={() => setCarrinhoAberto(false)}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-black">Seu carrinho 🛒</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}
                </p>
              </div>
              <button
                onClick={() => setCarrinhoAberto(false)}
                aria-label="Fechar carrinho"
                className="rounded-full bg-gray-100 px-4 py-2 text-lg hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {carrinho.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <span className="text-6xl">🛍️</span>
                <p className="mt-4 text-lg font-bold">Seu carrinho está vazio</p>
                <p className="mt-2 text-sm text-gray-500">
                  Adicione produtos do cardápio para começar seu pedido.
                </p>
                <button
                  onClick={() => setCarrinhoAberto(false)}
                  className="mt-5 rounded-full bg-gray-900 px-5 py-3 font-bold text-white"
                >
                  Ver cardápio
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {carrinho.map((item) => (
                    <div
                      key={item.produto.id}
                      className="flex items-center gap-3 border-b border-gray-100 pb-4"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                        {item.produto.emoji}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold">
                          {item.produto.nome}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {moeda(item.produto.preco * item.quantidade)}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => alterarQuantidade(item.produto.id, -1)}
                            aria-label={`Diminuir ${item.produto.nome}`}
                            className="h-8 w-8 rounded-full border border-gray-200 font-bold"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() => alterarQuantidade(item.produto.id, 1)}
                            aria-label={`Aumentar ${item.produto.nome}`}
                            className="h-8 w-8 rounded-full border border-gray-200 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t bg-gray-50 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Total dos produtos
                    </span>
                    <span className="text-2xl font-black">
                      {moeda(valorTotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-gray-500">
                    Entrega e outras taxas serão calculadas na finalização.
                  </p>
                  <button
                    onClick={finalizarPedido}
                    className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-extrabold text-white transition hover:bg-orange-600"
                  >
                    Finalizar pedido →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
