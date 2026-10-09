export const dynamic = "force-dynamic";

import FooterYear from "@/components/FooterYer";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold">
          EQ <span className="text-orange-400">MicroSaas</span>
        </Link>

        <Link
          href="/login"
          className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
        >
          Entrar
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 font-semibold text-orange-400">
            SEU NEGÓCIO, MAIS ORGANIZADO
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Seus pedidos em um só lugar.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Crie sua loja online, apresente seus produtos e facilite
            os pedidos dos seus clientes.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/cadastro"
              className="rounded-xl bg-orange-400 px-6 py-3 font-bold text-slate-950 hover:bg-orange-300"
            >
              Criar minha loja
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800"
            >
              Já tenho uma conta
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Resumo dos pedidos</h2>
            <span className="rounded-full bg-orange-400/10 px-3 py-1 text-sm text-orange-400">
              Exemplo
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Pedidos recebidos</p>
              <p className="mt-1 text-3xl font-bold">12</p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-sm text-slate-400">Vendas do período</p>
              <p className="mt-1 text-3xl font-bold">R$ 680,00</p>
            </div>

            <p className="text-sm text-slate-400">
              Os números acima são ilustrativos, não vêm do banco de dados.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} EQ MicroSaas. Todos os direitos reservados.
      </footer>
    </main>
  );
}