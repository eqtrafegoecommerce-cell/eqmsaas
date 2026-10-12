
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type DadosLoja = {
  nome: string;
  slug: string;
  descricao: string;
  segmento: string;
  whatsapp: string;
  endereco: string;
  instagram: string;
  corPrimaria: string;
  corFundo: string;
  aberta: boolean;
};

const dadosIniciais: DadosLoja = {
  nome: "Minha Loja",
  slug: "minha-loja",
  descricao: "Produtos feitos com carinho para você.",
  segmento: "Doceria e confeitaria",
  whatsapp: "",
  endereco: "",
  instagram: "",
  corPrimaria: "#10b981",
  corFundo: "#ffffff",
  aberta: true,
};

function gerarSlug(valor: string) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export default function MinhaLojaPage() {
  const [loja, setLoja] = useState<DadosLoja>(dadosIniciais);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [editandoSlug, setEditandoSlug] = useState(false);

  function atualizar<K extends keyof DadosLoja>(
    campo: K,
    valor: DadosLoja[K]
  ) {
    setLoja((atual) => ({ ...atual, [campo]: valor }));
    setMensagem("");
    setErro("");
  }

  function salvarLoja(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    if (!loja.nome.trim()) {
      setErro("Informe o nome da sua loja.");
      return;
    }

    const slug = gerarSlug(loja.slug);

    if (!slug) {
      setErro("Informe um endereço válido para sua loja.");
      return;
    }

    if (loja.whatsapp && !/^[+\d\s().-]{8,25}$/.test(loja.whatsapp)) {
      setErro("Confira o número de WhatsApp informado.");
      return;
    }

    if (
      loja.instagram &&
      !/^@?[a-zA-Z0-9._]{1,30}$/.test(loja.instagram.trim())
    ) {
      setErro("Informe apenas o usuário do Instagram, com ou sem @.");
      return;
    }

    setLoja((atual) => ({ ...atual, slug }));
    setMensagem(
      "Validação concluída! Esta demonstração ainda não salva os dados no Supabase."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Link
            href="/dashboard"
            className="mb-3 inline-block text-sm text-slate-500 hover:text-emerald-700"
          >
            ← Voltar ao dashboard
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Minha Loja
              </h1>
              <p className="mt-2 text-slate-500">
                Personalize sua loja virtual e prepare-a para receber pedidos.
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                loja.aberta
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  loja.aberta ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {loja.aberta ? "Loja aberta" : "Loja fechada"}
            </span>
          </div>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-3">
          <section className="space-y-6 xl:col-span-2">
            <form onSubmit={salvarLoja} className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-bold">Informações gerais</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Apresente seu negócio aos clientes.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-2 block text-sm font-medium"
                    >
                      Nome da loja *
                    </label>
                    <input
                      id="nome"
                      required
                      maxLength={100}
                      value={loja.nome}
                      onChange={(event) => {
                        const nome = event.target.value;
                        setLoja((atual) => ({
                          ...atual,
                          nome,
                          ...(!editandoSlug
                            ? { slug: gerarSlug(nome) }
                            : {}),
                        }));
                        setMensagem("");
                        setErro("");
                      }}
                      placeholder="Ex.: Doces da Maria"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="descricao"
                      className="mb-2 block text-sm font-medium"
                    >
                      Descrição da loja
                    </label>
                    <textarea
                      id="descricao"
                      rows={3}
                      maxLength={500}
                      value={loja.descricao}
                      onChange={(event) =>
                        atualizar("descricao", event.target.value)
                      }
                      placeholder="Conte um pouco sobre seus produtos e seu negócio."
                      className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />
                    <p className="mt-1 text-right text-xs text-slate-400">
                      {loja.descricao.length}/500
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="segmento"
                      className="mb-2 block text-sm font-medium"
                    >
                      Segmento do negócio
                    </label>
                    <select
                      id="segmento"
                      value={loja.segmento}
                      onChange={(event) =>
                        atualizar("segmento", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                    >
                      <option>Doceria e confeitaria</option>
                      <option>Salgaderia</option>
                      <option>Marmitaria</option>
                      <option>Padaria</option>
                      <option>Restaurante</option>
                      <option>Loja de bebidas</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-bold">Endereço da loja</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Configure o endereço que poderá ser compartilhado com seus clientes.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="mb-2 block text-sm font-medium"
                  >
                    Link personalizado
                  </label>

                  <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 sm:flex-row">
                    <span className="border-b border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500 sm:border-b-0 sm:border-r">
                      pedidofacil.com/loja/
                    </span>
                    <input
                      id="slug"
                      required
                      maxLength={50}
                      value={loja.slug}
                      onFocus={() => setEditandoSlug(true)}
                      onBlur={() => setEditandoSlug(false)}
                      onChange={(event) =>
                        atualizar("slug", gerarSlug(event.target.value))
                      }
                      placeholder="nome-da-loja"
                      className="min-w-0 flex-1 px-4 py-3 outline-none focus:bg-emerald-50/30"
                    />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    O endereço definitivo dependerá do domínio e das rotas
                    configuradas no projeto. A disponibilidade do nome ainda
                    não é verificada nesta versão.
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-bold">Contato e localização</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Facilite o contato e a retirada dos pedidos.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="mb-2 block text-sm font-medium"
                    >
                      WhatsApp comercial
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      maxLength={25}
                      value={loja.whatsapp}
                      onChange={(event) =>
                        atualizar("whatsapp", event.target.value)
                      }
                      placeholder="(11) 99999-9999"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Use o número comercial com DDD.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="endereco"
                      className="mb-2 block text-sm font-medium"
                    >
                      Endereço ou área de atendimento
                    </label>
                    <input
                      id="endereco"
                      maxLength={250}
                      value={loja.endereco}
                      onChange={(event) =>
                        atualizar("endereco", event.target.value)
                      }
                      placeholder="Ex.: Centro, São Paulo - SP"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="instagram"
                      className="mb-2 block text-sm font-medium"
                    >
                      Instagram
                    </label>
                    <input
                      id="instagram"
                      maxLength={31}
                      value={loja.instagram}
                      onChange={(event) =>
                        atualizar("instagram", event.target.value)
                      }
                      placeholder="@sua_loja"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <div className="mb-6">
                  <h2 className="text-lg font-bold">Aparência da loja</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Escolha as cores que representam sua marca.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="corPrimaria"
                      className="mb-3 block text-sm font-medium"
                    >
                      Cor principal
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                      <input
                        id="corPrimaria"
                        type="color"
                        value={loja.corPrimaria}
                        onChange={(event) =>
                          atualizar("corPrimaria", event.target.value)
                        }
                        className="h-10 w-12 cursor-pointer rounded border-0 bg-transparent"
                      />
                      <span className="text-sm font-medium">
                        {loja.corPrimaria.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="corFundo"
                      className="mb-3 block text-sm font-medium"
                    >
                      Cor de fundo
                    </label>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                      <input
                        id="corFundo"
                        type="color"
                        value={loja.corFundo}
                        onChange={(event) =>
                          atualizar("corFundo", event.target.value)
                        }
                        className="h-10 w-12 cursor-pointer rounded border-0 bg-transparent"
                      />
                      <span className="text-sm font-medium">
                        {loja.corFundo.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      checked={loja.aberta}
                      onChange={(event) =>
                        atualizar("aberta", event.target.checked)
                      }
                      className="h-4 w-4 accent-emerald-500"
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        Loja aberta para pedidos
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        Você poderá alterar esse status conforme sua operação.
                      </span>
                    </span>
                  </label>
                </div>
              </article>

              {erro && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
                >
                  {erro}
                </p>
              )}

              {mensagem && (
                <p
                  role="status"
                  className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800"
                >
                  {mensagem}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600"
                >
                  Salvar informações
                </button>
              </div>
            </form>
          </section>

          <aside className="xl:sticky xl:top-24">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <h2 className="font-bold">Prévia da sua loja</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Uma prévia visual das suas configurações.
                </p>
              </div>

              <div
                className="p-5"
                style={{ backgroundColor: loja.corFundo }}
              >
                <div
                  className="rounded-2xl p-5 text-white"
                  style={{ backgroundColor: loja.corPrimaria }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold">
                    {loja.nome.trim().charAt(0).toUpperCase() || "L"}
                  </div>

                  <h3 className="break-words text-xl font-bold">
                    {loja.nome || "Nome da sua loja"}
                  </h3>

                  <p className="mt-2 break-words text-sm text-white/90">
                    {loja.descricao || "A descrição da sua loja aparecerá aqui."}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      loja.aberta
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {loja.aberta ? "Recebendo pedidos" : "Temporariamente fechada"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {loja.segmento}
                  </span>
                </div>

                <div className="mt-5 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      <span>🛍️</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Seus produtos</p>
                      <p className="text-xs text-slate-500">
                        O catálogo será exibido aqui.
                      </p>
                    </div>
                  </div>

                  <div
                    className="mt-4 rounded-lg px-4 py-3 text-center text-sm font-semibold text-white"
                    style={{ backgroundColor: loja.corPrimaria }}
                  >
                    Ver produtos
                  </div>
                </div>

                {loja.whatsapp && (
                  <div className="mt-4 break-words text-xs text-slate-500">
                    WhatsApp: {loja.whatsapp}
                  </div>
                )}

                {loja.endereco && (
                  <div className="mt-2 break-words text-xs text-slate-500">
                    Atendimento: {loja.endereco}
                  </div>
                )}
              </div>
            </article>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold">Dica para vender mais</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use um nome fácil de lembrar, boas fotos dos produtos e uma
                descrição que destaque o diferencial da sua loja.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}