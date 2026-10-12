
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConfiguracoesPage() {
  const [nome, setNome] = useState("Administrador");
  const [email, setEmail] = useState("");
  const [notificacoes, setNotificacoes] = useState(true);
  const [pedidosAutomaticos, setPedidosAutomaticos] = useState(true);
  const [mensagem, setMensagem] = useState("");

  function salvarConfiguracoes(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Nesta etapa, os dados ainda não são enviados ao Supabase.
    setMensagem("Configurações validadas! A integração com o banco será feita na próxima etapa.");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          ← Voltar ao painel
        </Link>

        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            PedidoFácil
          </p>
          <h1 className="mt-2 text-3xl font-bold">Configurações</h1>
          <p className="mt-2 text-gray-500">
            Gerencie suas preferências e as opções do seu painel.
          </p>
        </header>

        <form onSubmit={salvarConfiguracoes} className="space-y-6">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Perfil do administrador</h2>
            <p className="mb-5 mt-1 text-sm text-gray-500">
              Informações da pessoa responsável pela conta.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="mb-1 block text-sm font-medium">
                  Nome
                </label>
                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  E-mail de contato
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="voce@exemplo.com"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Preferências</h2>
            <p className="mb-5 mt-1 text-sm text-gray-500">
              Escolha como deseja acompanhar os pedidos.
            </p>

            <div className="space-y-5">
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <span className="block font-medium">Notificações de pedidos</span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Permite ativar avisos de novos pedidos quando essa função estiver integrada.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={notificacoes}
                  onChange={(e) => setNotificacoes(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-blue-600"
                />
              </label>

              <hr className="border-gray-100" />

              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <span className="block font-medium">Recebimento de pedidos</span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Preferência para habilitar o recebimento automático de pedidos.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={pedidosAutomaticos}
                  onChange={(e) => setPedidosAutomaticos(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-blue-600"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Segurança</h2>
            <p className="mb-4 mt-1 text-sm text-gray-500">
              A alteração de senha será integrada à autenticação do Supabase.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
            >
              Voltar ao painel
            </Link>
          </section>

          {mensagem && (
            <p
              role="status"
              className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
            >
              {mensagem}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Salvar configurações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}