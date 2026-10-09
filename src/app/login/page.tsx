"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
// 1. IMPORTAÇÃO DOS ÍCONES DO LUCIDE
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
            {/* Mantido o marcador visual enquanto você não adiciona sua imagem/SVG final */}
            <span className="text-[120px] block leading-none select-none">🏪🔒</span>
          </div>
        </div>
        
        <div className="h-6"></div>
      </aside>

      {/* SEÇÃO DA DIREITA: CONTEÚDO E FORMULÁRIO */}
      <main className="flex-1 flex flex-col justify-between min-h-screen relative bg-white">
        
        {/* Seletor de Idioma Superior com Ícones */}
        <header className="absolute top-0 right-0 p-6 flex justify-end w-full">
          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium cursor-pointer hover:text-slate-900 transition">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>BR</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </header>

        {/* Área do Formulário Centralizado */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 max-w-xl mx-auto w-full pt-16">
          <div className="w-full">
            <h1 className="text-[32px] font-bold tracking-tight text-slate-900">
              Bem-vindo de volta!
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-normal">
              Entre na sua conta para gerenciar sua loja.
            </p>

            <form onSubmit={entrar} className="mt-8 space-y-5">
              {/* Campo E-mail */}
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-slate-700">
                  E-mail
                </label>
                <div className="relative flex items-center">
                  {/* Ícone de Envelope alinhado */}
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="voce@exemplo.com"
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div>
                <label htmlFor="senha" className="mb-2 block text-xs font-semibold text-slate-700">
                  Senha
                </label>
                <div className="relative flex items-center">
                  {/* Ícone de Cadeado alinhado */}
                  <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="senha"
                    type="password"
                    required
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>

              {erro && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-600 font-medium">
                  {erro}
                </p>
              )}

              {/* Botão de Enviar */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm disabled:opacity-60"
              >
                {carregando ? "Entrando..." : "Entrar na minha conta"}
              </button>
            </form>

            {/* Links Auxiliares */}
            <div className="mt-6 flex flex-col items-center gap-3 text-sm text-center">
              <p className="text-slate-600">
                Ainda não tem uma conta?{" "}
                <Link href="/cadastro" className="font-semibold text-blue-600 hover:underline">
                  Criar conta
                </Link>
              </p>
              
              <Link href="/recuperar" className="text-slate-400 text-xs hover:text-slate-600 transition">
                Esqueceu a senha?
              </Link>

              <Link href="/" className="mt-6 inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition">
                ← Voltar ao início
              </Link>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <footer className="p-6 bg-white border-t border-slate-100 text-xs text-slate-400 text-left px-8 sm:px-12">
          © 2026 EQ MicroSaas. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}