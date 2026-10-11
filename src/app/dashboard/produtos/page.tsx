
"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

type Produto = {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  imagem: string;
  disponivel: boolean;
};

type FormularioProduto = Omit<Produto, "id">;

const categorias = [
  "Bolos",
  "Doces",
  "Salgados",
  "Bebidas",
  "Combos",
  "Outros",
];

const produtosIniciais: Produto[] = [
  {
    id: "1",
    nome: "Bolo de chocolate",
    descricao: "Bolo fofinho com cobertura de brigadeiro.",
    categoria: "Bolos",
    preco: 55,
    imagem: "",
    disponivel: true,
  },
  {
    id: "2",
    nome: "Brigadeiro tradicional",
    descricao: "Brigadeiro artesanal com chocolate granulado.",
    categoria: "Doces",
    preco: 3.5,
    imagem: "",
    disponivel: true,
  },
  {
    id: "3",
    nome: "Coxinha de frango",
    descricao: "Massa artesanal com recheio de frango.",
    categoria: "Salgados",
    preco: 6,
    imagem: "",
    disponivel: true,
  },
  {
    id: "4",
    nome: "Kit festa",
    descricao: "Uma opção especial para comemorações.",
    categoria: "Combos",
    preco: 120,
    imagem: "",
    disponivel: false,
  },
];

const formularioVazio: FormularioProduto = {
  nome: "",
  descricao: "",
  categoria: "Bolos",
  preco: 0,
  imagem: "",
  disponivel: true,
};

function moeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroDisponibilidade, setFiltroDisponibilidade] =
    useState("Todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] =
    useState<string | null>(null);
  const [formulario, setFormulario] =
    useState<FormularioProduto>(formularioVazio);
  const [erro, setErro] = useState("");

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return produtos.filter((produto) => {
      const correspondeBusca =
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo);

      const correspondeCategoria =
        filtroCategoria === "Todas" ||
        produto.categoria === filtroCategoria;

      const correspondeDisponibilidade =
        filtroDisponibilidade === "Todos" ||
        (filtroDisponibilidade === "Disponíveis" &&
          produto.disponivel) ||
        (filtroDisponibilidade === "Indisponíveis" &&
          !produto.disponivel);

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeDisponibilidade
      );
    });
  }, [produtos, busca, filtroCategoria, filtroDisponibilidade]);

  const disponiveis = produtos.filter((p) => p.disponivel).length;
  const indisponiveis = produtos.length - disponiveis;

  function abrirNovoProduto() {
    setProdutoEditando(null);
    setFormulario(formularioVazio);
    setErro("");
    setModalAberto(true);
  }

  function abrirEdicao(produto: Produto) {
    setProdutoEditando(produto.id);
    setFormulario({
      nome: produto.nome,
      descricao: produto.descricao,
      categoria: produto.categoria,
      preco: produto.preco,
      imagem: produto.imagem,
      disponivel: produto.disponivel,
    });
    setErro("");
    setModalAberto(true);
  }

  function salvarProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    const nome = formulario.nome.trim();

    if (!nome) {
      setErro("Informe o nome do produto.");
      return;
    }

    if (!Number.isFinite(formulario.preco) || formulario.preco <= 0) {
      setErro("Informe um preço maior que zero.");
      return;
    }

    if (
      formulario.imagem &&
      !/^https?:\/\//i.test(formulario.imagem)
    ) {
      setErro("Informe uma URL válida para a imagem.");
      return;
    }

    const dados: FormularioProduto = {
      ...formulario,
      nome,
      descricao: formulario.descricao.trim(),
      imagem: formulario.imagem.trim(),
    };

    if (produtoEditando) {
      setProdutos((atuais) =>
        atuais.map((produto) =>
          produto.id === produtoEditando
            ? { ...produto, ...dados }
            : produto
        )
      );
    } else {
      setProdutos((atuais) => [
        {
          id: crypto.randomUUID(),
          ...dados,
        },
        ...atuais,
      ]);
    }

    setModalAberto(false);
    setProdutoEditando(null);
    setFormulario(formularioVazio);
  }

  function excluirProduto(produto: Produto) {
    const confirmou = window.confirm(
      `Deseja realmente excluir "${produto.nome}"?`
    );

    if (!confirmou) return;

    setProdutos((atuais) =>
      atuais.filter((item) => item.id !== produto.id)
    );
  }

  function alternarDisponibilidade(id: string) {
    setProdutos((atuais) =>
      atuais.map((produto) =>
        produto.id === id
          ? { ...produto, disponivel: !produto.disponivel }
          : produto
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-block text-sm text-slate-500 hover:text-emerald-700"
            >
              ← Voltar ao dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight">
              Produtos
            </h1>

            <p className="mt-2 text-slate-500">
              Gerencie seu catálogo, preços e disponibilidade.
            </p>
          </div>

          <button
            onClick={abrirNovoProduto}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-600"
          >
            + Novo produto
          </button>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total de produtos</p>
            <p className="mt-3 text-3xl font-bold">{produtos.length}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Disponíveis para venda</p>
            <p className="mt-3 text-3xl font-bold text-emerald-700">
              {disponiveis}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Indisponíveis</p>
            <p className="mt-3 text-3xl font-bold text-amber-700">
              {indisponiveis}
            </p>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col gap-3 lg:flex-row">
              <input
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar produto..."
                aria-label="Buscar produto"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              />

              <select
                value={filtroCategoria}
                onChange={(event) =>
                  setFiltroCategoria(event.target.value)
                }
                aria-label="Filtrar por categoria"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value="Todas">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <select
                value={filtroDisponibilidade}
                onChange={(event) =>
                  setFiltroDisponibilidade(event.target.value)
                }
                aria-label="Filtrar por disponibilidade"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value="Todos">Todas as situações</option>
                <option value="Disponíveis">Disponíveis</option>
                <option value="Indisponíveis">Indisponíveis</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-bold">Seu catálogo</h2>
            <span className="text-sm text-slate-500">
              {produtosFiltrados.length} produto(s)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Produto</th>
                  <th className="px-5 py-4">Categoria</th>
                  <th className="px-5 py-4">Preço</th>
                  <th className="px-5 py-4">Disponibilidade</th>
                  <th className="px-5 py-4">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {produto.imagem ? (
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="h-12 w-12 rounded-xl border border-slate-100 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700">
                            {produto.categoria === "Bolos"
                              ? "🎂"
                              : produto.categoria === "Doces"
                                ? "🍬"
                                : produto.categoria === "Salgados"
                                  ? "🥟"
                                  : produto.categoria === "Bebidas"
                                    ? "🥤"
                                    : "🍽️"}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold">{produto.nome}</p>
                          <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {produto.descricao || "Sem descrição"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium">
                        {produto.categoria}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {moeda(produto.preco)}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          alternarDisponibilidade(produto.id)
                        }
                        aria-label={`Alterar disponibilidade de ${produto.nome}`}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          produto.disponivel
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {produto.disponivel
                          ? "Disponível"
                          : "Indisponível"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => abrirEdicao(produto)}
                          className="font-semibold text-emerald-700 hover:underline"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => excluirProduto(produto)}
                          className="font-semibold text-red-600 hover:underline"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {produtosFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      Nenhum produto encontrado. Experimente alterar os
                      filtros ou cadastre um novo produto.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-4 text-xs text-slate-400">
          Versão de demonstração: os dados ainda não são salvos no Supabase.
        </p>
      </div>

      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalAberto(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-formulario"
            className="my-6 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="titulo-formulario"
                  className="text-xl font-bold"
                >
                  {produtoEditando ? "Editar produto" : "Novo produto"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Preencha os dados do item do seu catálogo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                aria-label="Fechar formulário"
                className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <form onSubmit={salvarProduto} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium"
                >
                  Nome do produto *
                </label>
                <input
                  id="nome"
                  required
                  maxLength={120}
                  value={formulario.nome}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      nome: event.target.value,
                    })
                  }
                  placeholder="Ex.: Bolo de chocolate"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="descricao"
                  className="mb-2 block text-sm font-medium"
                >
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  rows={3}
                  maxLength={1000}
                  value={formulario.descricao}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      descricao: event.target.value,
                    })
                  }
                  placeholder="Descreva os ingredientes, tamanho ou detalhes."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="categoria"
                    className="mb-2 block text-sm font-medium"
                  >
                    Categoria *
                  </label>
                  <select
                    id="categoria"
                    required
                    value={formulario.categoria}
                    onChange={(event) =>
                      setFormulario({
                        ...formulario,
                        categoria: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                  >
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preco"
                    className="mb-2 block text-sm font-medium"
                  >
                    Preço (R$) *
                  </label>
                  <input
                    id="preco"
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={formulario.preco || ""}
                    onChange={(event) =>
                      setFormulario({
                        ...formulario,
                        preco: Number(event.target.value),
                      })
                    }
                    placeholder="0,00"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="imagem"
                  className="mb-2 block text-sm font-medium"
                >
                  URL da imagem (opcional)
                </label>
                <input
                  id="imagem"
                  type="url"
                  value={formulario.imagem}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      imagem: event.target.value,
                    })
                  }
                  placeholder="https://exemplo.com/produto.jpg"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Nesta versão, informe um endereço de imagem público.
                  O envio de arquivos será implementado com o Supabase Storage.
                </p>
              </div>

              {formulario.imagem &&
                /^https?:\/\//i.test(formulario.imagem) && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Prévia</p>
                    <img
                      src={formulario.imagem}
                      alt="Prévia do produto"
                      className="h-32 w-32 rounded-xl border border-slate-200 object-cover"
                    />
                  </div>
                )}

              <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={formulario.disponivel}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      disponivel: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-emerald-500"
                />
                Produto disponível para venda
              </label>

              {erro && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  {erro}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white hover:bg-emerald-600"
                >
                  {produtoEditando ? "Salvar alterações" : "Cadastrar produto"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}