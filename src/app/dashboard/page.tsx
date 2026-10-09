"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const menu = [
  { nome: "Visão geral", href: "/dashboard", icone: "▦" },
  { nome: "Pedidos", href: "/dashboard/pedidos", icone: "▤" },
  { nome: "Produtos", href: "/dashboard/produtos", icone: "□" },
  { nome: "Categorias", href: "/dashboard/categorias", icone: "☷" },
  { nome: "Minha loja", href: "/dashboard/minha-loja", icone: "⌂" },
  { nome: "Configurações", href: "/dashboard/configuracoes", icone: "⚙" },
];

const indicadores = [
  { titulo: "Pedidos recebidos", valor: "0", detalhe: "Pedidos no período", cor: "bg-blue-50 text-blue-700", icone: "▤" },
  { titulo: "Vendas do período", valor: "R\$ 0,00", detalhe: "Total dos pedidos", cor: "bg-emerald-50 text-emerald-700", icone: "R\$" },
  { titulo: "Produtos cadastrados", valor: "0", detalhe: "No seu catálogo", cor: "bg-violet-50 text-violet-700", icone: "□" },
  { titulo: "Pedidos pendentes", valor: "0", detalhe: "Aguardando atendimento", cor: "bg-amber-50 text-amber-700", icone: "◷" },
];

export default function PainelPage() {
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  // Função para fazer logout e mandar o lojista de volta para o Login
  async function fazerLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {menuAberto && (
        <button
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform md:translate-x-0 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link href="/dashboard" className="text-2xl font-extrabold tracking-tight">
            Pedido<span className="text-emerald-500">Fácil</span>
          </Link>
          <button
            onClick={() => setMenuAberto(false)}
            className="text-xl md:hidden"
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu principal
          </p>

          <nav className="space-y-1">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  item.href === "/dashboard"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="w-5 text-center text-lg">{item.icone}</span>
                {item.nome}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-5">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold">Sua loja online</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Organize seus produtos e receba pedidos em um só lugar.
            </p>
          </div>
          <button
            onClick={fazerLogout}
            className="mt-4 block w-full text-left px-2 text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
          >
            ← Sair da conta
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="min-h-screen md:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuAberto(true)}
              className="rounded-lg border border-slate-200 px-3 py-2 md:hidden"
              aria-label="Abrir menu"
            >
              ☰
            </button>
            <div>
              <p className="text-sm text-slate-500">Área administrativa</p>
              <h1 className="font-bold">Visão geral</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Minha conta</p>
              <p className="text-xs text-slate-500">Lojista</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              L
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-8">
          {/* Seção de Boas-vindas */}
          <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Olá! Boas-vindas 👋
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Acompanhe o movimento da sua loja por aqui.
              </p>
            </div>

            <Link
              href="/dashboard/produtos"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600"
            >
              + Cadastrar produto
            </Link>
          </section>

          {/* Cards Indicadores */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {indicadores.map((item) => (
              <article
                key={item.titulo}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">{item.titulo}</p>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${item.cor}`}>
                    {item.icone}
                  </span>
                </div>
                <p className="mt-5 text-2xl font-bold">{item.valor}</p>
                <p className="mt-2 text-xs text-slate-400">{item.detalhe}</p>
              </article>
            ))}
          </section>

          {/* Seções de Pedidos Recentes e Acesso Rápido */}
          <section className="mt-8 grid gap-6 xl:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold">Pedidos recentes</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Acompanhe os últimos pedidos da sua loja.
                  </p>
                </div>
                <Link
                  href="/dashboard/pedidos"
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Ver todos →
                </Link>
              </div>

              <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
                  ▤
                </div>
                <p className="mt-4 font-semibold">Nenhum pedido por enquanto</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Quando seus clientes fizerem pedidos, você poderá acompanhar
                  tudo nesta área.
                </p>
              </div>
            </article>

            {/* Acesso rápido finalizado */}
            <article className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold">Acesso rápido</h3>
                <p className="mt-1 text-sm text-slate-500">Atalhos para gerenciar seu espaço.</p>
                
                <div className="mt-4 space-y-2">
                  <Link href="/dashboard/minha-loja" className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-50 text-sm text-slate-700">
                    <span>⌂</span> Ver dados da loja
                  </Link>
                  <Link href="/dashboard/configuracoes" className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-50 text-sm text-slate-700">
                    <span>⚙</span> Configurações de pagamento
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}