
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const menuItems = [
  { label: "Visão geral", href: "/admin", icon: "📊" },
  { label: "Lojas", href: "/admin/lojas", icon: "🏪" },
  { label: "Planos", href: "/admin/planos", icon: "📦" },
  { label: "Assinaturas", href: "/admin/assinaturas", icon: "💳" },
  {
    label: "Funcionalidades",
    href: "/admin/funcionalidades",
    icon: "⚙️",
  },
];

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  // 1. Verifica a identidade do usuário no servidor.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login?next=/admin");
  }

  // 2. Confirma que o usuário está autorizado como administrador.
  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) {
    // Falha fechada: se não for possível verificar, não libera o painel.
    throw new Error("Não foi possível verificar a permissão administrativa.");
  }

  if (!admin) {
    redirect("/dashboard");
  }

  // 3. Renderiza a área administrativa apenas após a autorização.
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-slate-900 p-6 md:flex">
          <Link href="/admin" className="text-xl font-black tracking-tight">
            Pedido<span className="text-orange-400">Fácil</span>
          </Link>

          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            Super Admin
          </p>

          <nav className="mt-10 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href="/dashboard"
              className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              ← Painel da loja
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-slate-900/70 px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-slate-400">
                Administração da plataforma
              </p>
              <p className="mt-1 font-bold">PedidoFácil SaaS</p>
            </div>

            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-2 text-xs font-bold text-orange-300">
              Super Admin
            </span>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
