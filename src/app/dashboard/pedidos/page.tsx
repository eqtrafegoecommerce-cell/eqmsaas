
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type StatusPedido =
  | "Novo"
  | "Em preparação"
  | "Pronto"
  | "Concluído"
  | "Cancelado";

type Pedido = {
  id: string;
  cliente: string;
  telefone: string;
  data: string;
  itens: string;
  total: number;
  status: StatusPedido;
};

const pedidosExemplo: Pedido[] = [
  {
    id: "PED-1008",
    cliente: "Mariana Oliveira",
    telefone: "(11) 99999-1111",
    data: "11/10/2026",
    itens: "2x Bolo de chocolate, 1x Brigadeiros",
    total: 89.9,
    status: "Novo",
  },
  {
    id: "PED-1007",
    cliente: "Ana Souza",
    telefone: "(11) 99999-2222",
    data: "11/10/2026",
    itens: "1x Bolo de cenoura",
    total: 45,
    status: "Em preparação",
  },
  {
    id: "PED-1006",
    cliente: "Carlos Mendes",
    telefone: "(11) 99999-3333",
    data: "10/10/2026",
    itens: "3x Brownie, 2x Cookies",
    total: 67.5,
    status: "Pronto",
  },
  {
    id: "PED-1005",
    cliente: "Juliana Lima",
    telefone: "(11) 99999-4444",
    data: "10/10/2026",
    itens: "1x Kit festa",
    total: 150,
    status: "Concluído",
  },
  {
    id: "PED-1004",
    cliente: "Pedro Santos",
    telefone: "(11) 99999-5555",
    data: "09/10/2026",
    itens: "2x Torta de limão",
    total: 78,
    status: "Cancelado",
  },
];

const statusOpcoes: StatusPedido[] = [
  "Novo",
  "Em preparação",
  "Pronto",
  "Concluído",
  "Cancelado",
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function estiloStatus(status: StatusPedido) {
  const estilos: Record<StatusPedido, string> = {
    Novo: "bg-blue-50 text-blue-700",
    "Em preparação": "bg-amber-50 text-amber-700",
    Pronto: "bg-violet-50 text-violet-700",
    Concluído: "bg-emerald-50 text-emerald-700",
    Cancelado: "bg-red-50 text-red-700",
  };

  return estilos[status];
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState(pedidosExemplo);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [pedidoSelecionado, setPedidoSelecionado] =
    useState<Pedido | null>(null);

  const pedidosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return pedidos.filter((pedido) => {
      const correspondeBusca =
        pedido.id.toLowerCase().includes(termo) ||
        pedido.cliente.toLowerCase().includes(termo);

      const correspondeStatus =
        filtroStatus === "Todos" || pedido.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [pedidos, busca, filtroStatus]);

  const novos = pedidos.filter((p) => p.status === "Novo").length;
  const preparando = pedidos.filter(
    (p) => p.status === "Em preparação"
  ).length;
  const prontos = pedidos.filter((p) => p.status === "Pronto").length;

  function atualizarStatus(id: string, status: StatusPedido) {
    setPedidos((atuais) =>
      atuais.map((pedido) =>
        pedido.id === id ? { ...pedido, status } : pedido
      )
    );

    setPedidoSelecionado((atual) =>
      atual?.id === id ? { ...atual, status } : atual
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
              Gestão de pedidos
            </h1>

            <p className="mt-2 text-slate-500">
              Acompanhe e organize as encomendas da sua loja.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            Exibindo dados demonstrativos
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total de pedidos</p>
            <p className="mt-3 text-3xl font-bold">{pedidos.length}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Novos pedidos</p>
            <p className="mt-3 text-3xl font-bold text-blue-700">{novos}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Em preparação</p>
            <p className="mt-3 text-3xl font-bold text-amber-700">
              {preparando}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Prontos para entrega</p>
            <p className="mt-3 text-3xl font-bold text-violet-700">
              {prontos}
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold">Todos os pedidos</h2>
              <p className="mt-1 text-sm text-slate-500">
                {pedidosFiltrados.length} pedido(s) encontrado(s)
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por cliente ou código..."
                aria-label="Buscar pedidos"
                className="min-w-0 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 sm:w-72"
              />

              <select
                value={filtroStatus}
                onChange={(event) => setFiltroStatus(event.target.value)}
                aria-label="Filtrar por status"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value="Todos">Todos os status</option>
                {statusOpcoes.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Pedido</th>
                  <th className="px-5 py-4">Cliente</th>
                  <th className="px-5 py-4">Data</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Ação</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold">{pedido.id}</td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{pedido.cliente}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {pedido.telefone}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {pedido.data}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatarMoeda(pedido.total)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${estiloStatus(pedido.status)}`}
                      >
                        {pedido.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setPedidoSelecionado(pedido)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-700"
                      >
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}

                {pedidosFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      Nenhum pedido encontrado com esses filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {pedidoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPedidoSelecionado(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-pedido"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Detalhes do pedido</p>
                <h2 id="titulo-pedido" className="mt-1 text-xl font-bold">
                  {pedidoSelecionado.id}
                </h2>
              </div>

              <button
                onClick={() => setPedidoSelecionado(null)}
                aria-label="Fechar detalhes"
                className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-slate-500">Cliente</p>
                <p className="mt-1 font-semibold">
                  {pedidoSelecionado.cliente}
                </p>
                <p className="mt-1 text-slate-500">
                  {pedidoSelecionado.telefone}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Itens do pedido</p>
                <p className="mt-1">{pedidoSelecionado.itens}</p>
              </div>

              <div>
                <p className="text-slate-500">Total</p>
                <p className="mt-1 text-xl font-bold">
                  {formatarMoeda(pedidoSelecionado.total)}
                </p>
              </div>

              <div>
                <label
                  htmlFor="status-pedido"
                  className="block text-slate-500"
                >
                  Atualizar status
                </label>

                <select
                  id="status-pedido"
                  value={pedidoSelecionado.status}
                  onChange={(event) =>
                    atualizarStatus(
                      pedidoSelecionado.id,
                      event.target.value as StatusPedido
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                >
                  {statusOpcoes.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-xs text-slate-400">
                  Nesta versão demonstrativa, a alteração não é salva no banco.
                </p>
              </div>
            </div>

            <button
              onClick={() => setPedidoSelecionado(null)}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-white hover:bg-emerald-600"
            >
              Fechar detalhes
            </button>
          </section>
        </div>
      )}
    </main>
  );
}