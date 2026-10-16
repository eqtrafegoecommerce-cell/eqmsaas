"use client";

import Link from "next/link";

const indicadores = [
  {
    titulo: "Lojas cadastradas",
    valor: "—",
    descricao: "Total de lojas na plataforma",
    icone: "🏪",
  },
  {
    titulo: "Assinaturas ativas",
    valor: "—",
    descricao: "Lojas com plano ativo",
    icone: "💳",
  },
  {
    titulo: "Planos disponíveis",
    valor: "—",
    descricao: "Planos comerciais cadastrados",
    icone: "📦",
  },
  {
    titulo: "Receita recorrente",
    valor: "—",
    descricao: "Valor mensal das assinaturas",
    icone: "📈",
  },
];

const modulos = [
  {
    titulo: "Lojas",
    descricao: "Consultar e administrar as lojas cadastradas.",
    icone: "🏪",
    href: "/admin/lojas",
  },
  {
    titulo: "Planos",
    descricao: "Definir preços, limites e recursos dos planos.",
    icone: "📦",
    href: "/admin/planos",
  },
  {
    titulo: "Assinaturas",
    descricao: "Acompanhar planos contratados e seus status.",
    icone: "💳",
    href: "/admin/assinaturas",
  },
  {
    titulo: "Funcionalidades",
    descricao: "Controlar os recursos liberados por plano.",
    icone: "⚙️",
    href: "/admin/funcionalidades",
  },
];

export default function SuperAdminPage() {
  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8">
        <p className="text-sm font-semibold text-orange-300">
          CENTRAL DO PEDIDOFÁCIL
        </p>

        <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
          Gerencie sua plataforma em um só lugar.
        </h2>

        <p className="mt-4 max-w-2xl leading-7 text-slate-300">
          Acompanhe as lojas, organize os planos comerciais e controle
          quais funcionalidades estarão disponíveis para cada cliente.
        </p>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Indicadores da plataforma</h2>
          <p className="mt-1 text-sm text-slate-400">
            Os números serão carregados do banco de dados na próxima etapa.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {indicadores.map((item) => (
            <article
              key={item.titulo}
              className="rounded-2xl border border-white/10 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {item.titulo}
                </span>
                <span className="text-2xl">{item.icone}</span>
              </div>

              <p className="mt-5 text-3xl font-black">{item.valor}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {item.descricao}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold">Gestão da plataforma</h2>
        <p className="mt-1 text-sm text-slate-400">
          Acesse os módulos administrativos.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {modulos.map((modulo) => (
            <Link
              key={modulo.href}
              href={modulo.href}
              className="group rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-orange-400/50 hover:bg-slate-800"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{modulo.icone}</span>
                <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-orange-400">
                  →
                </span>
              </div>

              <h3 className="mt-5 font-bold">{modulo.titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {modulo.descricao}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
