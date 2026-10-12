"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, type FormEvent } from "react";
import {  } from "@/lib/supabase/store";

type Categoria = {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  ativa: boolean;
};

const categoriasIniciais: Categoria[] = [
  {
    id: "1",
    nome: "Bolos",
    descricao: "Bolos inteiros, fatias e bolos decorados.",
    cor: "bg-pink-100 text-pink-700",
    ativa: true,
  },
  {
    id: "2",
    nome: "Doces",
    descricao: "Brigadeiros, brownies, trufas e docinhos.",
    cor: "bg-violet-100 text-violet-700",
    ativa: true,
  },
  {
    id: "3",
    nome: "Salgados",
    descricao: "Coxinhas, empadas, pastéis e salgados variados.",
    cor: "bg-amber-100 text-amber-700",
    ativa: true,
  },
  {
    id: "4",
    nome: "Bebidas",
    descricao: "Sucos, refrigerantes e outras bebidas.",
    cor: "bg-blue-100 text-blue-700",
    ativa: true,
  },
  {
    id: "5",
    nome: "Combos",
    descricao: "Kits especiais e combinações de produtos.",
    cor: "bg-emerald-100 text-emerald-700",
    ativa: false,
  },
];

const coresDisponiveis = [
  { nome: "Rosa", valor: "bg-pink-100 text-pink-700" },
  { nome: "Roxo", valor: "bg-violet-100 text-violet-700" },
  { nome: "Amarelo", valor: "bg-amber-100 text-amber-700" },
  { nome: "Azul", valor: "bg-blue-100 text-blue-700" },
  { nome: "Verde", valor: "bg-emerald-100 text-emerald-700" },
  { nome: "Cinza", valor: "bg-slate-100 text-slate-700" },
];

const formularioVazio = {
  nome: "",
  descricao: "",
  cor: coresDisponiveis[0].valor,
  ativa: true,
};

export default function CategoriasPage() {
  const [categorias, setCategorias] =
    useState<Categoria[]>(categoriasIniciais);

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todas");
  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] =
    useState<string | null>(null);

  const [formulario, setFormulario] = useState(formularioVazio);
  const [erro, setErro] = useState("");

  const categoriasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return categorias.filter((categoria) => {
      const correspondeBusca =
        categoria.nome.toLowerCase().includes(termo) ||
        categoria.descricao.toLowerCase().includes(termo);

      const correspondeStatus =
        filtroStatus === "Todas" ||
        (filtroStatus === "Ativas" && categoria.ativa) ||
        (filtroStatus === "Inativas" && !categoria.ativa);

      return correspondeBusca && correspondeStatus;
    });
  }, [categorias, busca, filtroStatus]);

  const totalAtivas = categorias.filter((c) => c.ativa).length;
  const totalInativas = categorias.length - totalAtivas;

  function abrirNovaCategoria() {
    setCategoriaEditando(null);
    setFormulario(formularioVazio);
    setErro("");
    setModalAberto(true);
  }

  function abrirEdicao(categoria: Categoria) {
    setCategoriaEditando(categoria.id);
    setFormulario({
      nome: categoria.nome,
      descricao: categoria.descricao,
      cor: categoria.cor,
      ativa: categoria.ativa,
    });
    setErro("");
    setModalAberto(true);
  }

  function salvarCategoria(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    const nome = formulario.nome.trim();

    if (!nome) {
      setErro("Informe o nome da categoria.");
      return;
    }

    const nomeDuplicado = categorias.some(
      (categoria) =>
        categoria.nome.toLowerCase() === nome.toLowerCase() &&
        categoria.id !== categoriaEditando
    );

    if (nomeDuplicado) {
      setErro("Já existe uma categoria com esse nome.");
      return;
    }

    const dados = {
      ...formulario,
      nome,
      descricao: formulario.descricao.trim(),
    };

    if (categoriaEditando) {
      setCategorias((atuais) =>
        atuais.map((categoria) =>
          categoria.id === categoriaEditando
            ? { ...categoria, ...dados }
            : categoria
        )
      );
    } else {
      setCategorias((atuais) => [
        {
          id: crypto.randomUUID(),
          ...dados,
        },
        ...atuais,
      ]);
    }

    setModalAberto(false);
    setCategoriaEditando(null);
    setFormulario(formularioVazio);
  }

  function alternarStatus(id: string) {
    setCategorias((atuais) =>
      atuais.map((categoria) =>
        categoria.id === id
          ? { ...categoria, ativa: !categoria.ativa }
          : categoria
      )
    );
  }

  function excluirCategoria(categoria: Categoria) {
    const confirmou = window.confirm(
      `Deseja excluir a categoria "${categoria.nome}"?`
    );

    if (!confirmou) return;

    setCategorias((atuais) =>
      atuais.filter((item) => item.id !== categoria.id)
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
              Categorias
            </h1>

            <p className="mt-2 text-slate-500">
              Organize os produtos e facilite a navegação dos clientes.
            </p>
          </div>

          <button
            type="button"
            onClick={abrirNovaCategoria}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-600"
          >
            + Nova categoria
          </button>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total de categorias</p>
            <p className="mt-3 text-3xl font-bold">{categorias.length}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Categorias ativas</p>
            <p className="mt-3 text-3xl font-bold text-emerald-700">
              {totalAtivas}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Categorias inativas</p>
            <p className="mt-3 text-3xl font-bold text-amber-700">
              {totalInativas}
            </p>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row">
            <input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar categoria..."
              aria-label="Buscar categoria"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />

            <select
              value={filtroStatus}
              onChange={(event) => setFiltroStatus(event.target.value)}
              aria-label="Filtrar categorias por status"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
            >
              <option value="Todas">Todas as categorias</option>
              <option value="Ativas">Somente ativas</option>
              <option value="Inativas">Somente inativas</option>
            </select>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-bold">Suas categorias</h2>
            <span className="text-sm text-slate-500">
              {categoriasFiltradas.length} encontrada(s)
            </span>
          </div>

          {categoriasFiltradas.length > 0 ? (
            <div className="grid gap-4 p-5 pt-0 sm:grid-cols-2 xl:grid-cols-3">
              {categoriasFiltradas.map((categoria) => (
                <article
                  key={categoria.id}
                  className="flex flex-col rounded-2xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${categoria.cor}`}
                    >
                      {categoria.nome.charAt(0).toUpperCase()}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        categoria.ativa
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {categoria.ativa ? "Ativa" : "Inativa"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {categoria.nome}
                  </h3>

                  <p className="mt-2 min-h-10 flex-1 text-sm leading-6 text-slate-500">
                    {categoria.descricao || "Sem descrição cadastrada."}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => abrirEdicao(categoria)}
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => alternarStatus(categoria.id)}
                      className="text-sm font-semibold text-slate-600 hover:underline"
                    >
                      {categoria.ativa ? "Desativar" : "Ativar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => excluirCategoria(categoria)}
                      className="ml-auto text-sm font-semibold text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-5 py-16 text-center">
              <div className="text-4xl">☷</div>
              <h3 className="mt-4 font-bold">
                Nenhuma categoria encontrada
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tente outra busca ou crie uma nova categoria.
              </p>
              <button
                type="button"
                onClick={abrirNovaCategoria}
                className="mt-5 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600"
              >
                Criar categoria
              </button>
            </div>
          )}
        </section>

        <p className="mt-4 text-xs text-slate-400">
          Versão demonstrativa: as alterações ainda não são salvas no Supabase.
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
            aria-labelledby="titulo-categoria"
            className="my-6 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="titulo-categoria" className="text-xl font-bold">
                  {categoriaEditando ? "Editar categoria" : "Nova categoria"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Organize seus produtos em grupos.
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

            <form onSubmit={salvarCategoria} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="nome-categoria"
                  className="mb-2 block text-sm font-medium"
                >
                  Nome da categoria *
                </label>
                <input
                  id="nome-categoria"
                  required
                  maxLength={80}
                  value={formulario.nome}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      nome: event.target.value,
                    })
                  }
                  placeholder="Ex.: Doces artesanais"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="descricao-categoria"
                  className="mb-2 block text-sm font-medium"
                >
                  Descrição
                </label>
                <textarea
                  id="descricao-categoria"
                  rows={3}
                  maxLength={500}
                  value={formulario.descricao}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      descricao: event.target.value,
                    })
                  }
                  placeholder="Explique quais produtos pertencem a esta categoria."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="cor-categoria"
                  className="mb-2 block text-sm font-medium"
                >
                  Cor de identificação
                </label>
                <select
                  id="cor-categoria"
                  value={formulario.cor}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      cor: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                >
                  {coresDisponiveis.map((cor) => (
                    <option key={cor.nome} value={cor.valor}>
                      {cor.nome}
                    </option>
                  ))}
                </select>

                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-xl px-4 py-2 text-sm font-semibold ${formulario.cor}`}
                  >
                    {formulario.nome.trim() || "Prévia da categoria"}
                  </span>
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={formulario.ativa}
                  onChange={(event) =>
                    setFormulario({
                      ...formulario,
                      ativa: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-emerald-500"
                />
                Categoria ativa
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
                  {categoriaEditando ? "Salvar alterações" : "Cadastrar categoria"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}