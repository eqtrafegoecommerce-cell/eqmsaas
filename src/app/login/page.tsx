"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Globe, ChevronDown } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        setErro("E-mail ou senha inválidos. Confira os dados e tente novamente.");
        setCarregando(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setErro("Não foi possível conectar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      {/* SEÇÃO DA ESQUERDA: BARRA LATERAL ESCURA */}
      <aside className="hidden lg:flex w-[43%] bg-[#000000] flex-col justify-between p-12 text-white relative">
        <div className="text-3xl font-bold tracking-tight">EQ MicroSaas</div>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-72 h-auto max-w-full text-center">
            <span className="text-[120px] block leading-none select-none">🏪🔒</span>
          </div>
        </div>
        <div className="h-6"></div>
      </aside>

      {/* SEÇÃO DA DIREITA: CONTEÚDO E FORMULÁRIO */}
      <main className="flex-1 flex flex-col justify-between min-h-screen relative p-8 lg:p-16">
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>BR</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Bem-vindo de volta!</h1>
          <p className="text-slate-500 mb-6 text-sm">
            Entre na sua conta para gerenciar sua loja.
          </p>

          {erro && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={entrar} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">E-mail</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="pedro@pedro.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Senha</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 cursor-pointer"
            >
              {carregando ? "Entrando..." : "Entrar na minha conta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 space-y-2">
            <p>
              Ainda não tem uma conta?{" "}
              <Link href="/cadastro" className="font-semibold text-blue-600 hover:underline">
                Criar conta
              </Link>
            </p>
            <p>
              <Link href="/recuperar" className="text-xs text-slate-400 hover:underline">
                Esqueceu a senha?
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 border border-slate-200 px-4 py-1.5 rounded-lg transition">
            ← Voltar ao início
          </Link>
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} EQ MicroSaas. Todos os direitos reservados.
          </div>
        </div>
      </main>
    </div>
  );
}