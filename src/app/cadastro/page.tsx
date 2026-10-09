"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, User, Building, Globe, ChevronDown } from "lucide-react";
import { slugify } from "../../utils/slugify";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function lidarComCadastro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            display_name: nome,
            company_name: empresa,
          },
        },
      });

      if (authError) {
        setErro(authError.message);
        setCarregando(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setErro("Não foi possível conectar ao servidor. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-900">
      
      {/* SEÇÃO DA ESQUERDA: BARRA LATERAL ESCURA */}
      <aside className="hidden lg:flex w-[43%] bg-[#0d233a] flex-col justify-between p-12 text-white relative">
        <div className="text-3xl font-bold tracking-tight">EQ</div>
        
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-72 h-auto max-w-full text-center">
            <span className="text-[120px] block leading-none select-none">🏪🚀</span>
          </div>
        </div>
        
        <div className="h-6"></div>
      </aside>

      {/* SEÇÃO DA DIREITA: CONTEÚDO E FORMULÁRIO */}
      <main className="flex-1 flex flex-col justify-between min-h-screen relative bg-white">
        
        {/* Seletor de Idioma Superior */}
        <header className="absolute top-0 right-0 p-6 flex justify-end w-full">
          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium cursor-pointer hover:text-slate-900 transition">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>BR</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </header>

        {/* Área do Formulário Centralizado */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 max-w-xl mx-auto w-full pt-20 pb-12">
          <div className="w-full">
            <h1 className="text-[32px] font-bold tracking-tight text-slate-900">
              Crie sua conta
            </h1>
            <p className="mt-2 text-sm text-slate-500 font-normal">
              Preencha os campos abaixo para iniciar seu MicroSaaS.
            </p>

            <form onSubmit={lidarComCadastro} className="mt-8 space-y-4">
              
              {/* Campo Nome */}
              <div>
                <label htmlFor="nome" className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Nome Completo
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="Seu nome"
                  />
                </div>
              </div>

              {/* Campo Empresa */}
              <div>
                <label htmlFor="empresa" className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Nome da Empresa / Loja
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="empresa"
                    type="text"
                    required
                    value={empresa}
                    onChange={(event) => setEmpresa(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="Ex: Doces da Ana"
                  />
                </div>
                {empresa && (
                  <p className="mt-1 text-[11px] text-slate-400 italic">
                    URL da sua loja: <span className="font-medium text-slate-600">://seudominio.com{slugify(empresa)}</span>
                  </p>
                )}
              </div>

              {/* Campo E-mail */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
                  E-mail corporativo
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="ana@email.com"
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div>
                <label htmlFor="senha" className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Senha de acesso
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="senha"
                    type="password"
                    required
                    minLength={6}
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              {erro && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-600 font-medium">
                  {erro}
                </p>
              )}

              {/* Botão de Cadastro */}
              <button
                type="submit"
                disabled={carregando}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm disabled:opacity-60 mt-2"
              >
                {carregando ? "Criando sua conta..." : "Concluir cadastro"}
              </button>
            </form>

            {/* Links Auxiliares */}
            <div className="mt-6 flex flex-col items-center gap-3 text-sm text-center">
              <p className="text-slate-600">
                Já possui uma conta ativa?{" "}
                <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                  Fazer login
                </Link>
              </p>
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
