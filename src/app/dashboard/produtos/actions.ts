"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/client";

export async function buscarProdutos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function criarProduto(dados: any) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError ||!user) {
throw new Error("Usuário não autenticado no sistema.");}
const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("tenant_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.tenant_id) {
    throw new Error("Perfil ou empresa (tenant) não encontrados para este usuário.");
  }

  const dadosParaOBanco = {
    name: dados?.nome?.trim(),
    description: dados?.descricao?.trim() || "",
    price: Number(dados?.preco) || 0,
    image_url: dados?.imagem?.trim() || "",
    is_available: dados?.disponivel ?? true,
    category_id: dados?.categoria,
    tenant_id: profile.tenant_id,
  };

  if (!dadosParaOBanco.name) throw new Error("O nome do produto é obrigatório.");
  if (!dadosParaOBanco.category_id) throw new Error("A categoria do produto é obrigatória.");

  const { error } = await supabase.from("products").insert([dadosParaOBanco]);

  if (error) throw new Error(error.message);

  revalidatePath("/produtos");
  return true;
}

export async function atualizarProduto(id: string, dados: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update(dados).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/produtos");
}

export async function excluirProdutoBanco(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/produtos");
}