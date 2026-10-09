"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Impede o envio via GET padrão do HTML que causa o 404
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

      // Redirecionamento correto para a pasta que você escolheu manter
      router.push("/dashboard");
    } catch {
      setErro("Não foi possível conectar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <Link href="/" className="text-2xl font-extrabold">
          Pedido<span className="text-emerald-400">Fácil</span>
        </Link>

        <h1 className="mt-8 text-3xl font-bold">Bem-vindo de volta!</h1>

        <p className="mt-2 text-slate-400">
          Entre na sua conta para gerenciar sua loja.
        </p>

        <form onSubmit={entrar} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-400 text-slate-100"
              placeholder="voce@exemplo.com"
            />
          </div>

          <div>
            <label htmlFor="senha" className="mb-2 block text-sm font-medium">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-emerald-400 text-slate-100"
              placeholder="Digite sua senha"
            />
          </div>

          {erro && (
            <p role="alert" className="rounded-lg bg-red-950 p-3 text-sm text-red-300">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar na minha conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Ainda não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-emerald-400 hover:underline"
          >
            Criar conta
          </Link>
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-white">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
