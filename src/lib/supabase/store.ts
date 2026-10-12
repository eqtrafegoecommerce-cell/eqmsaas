import { createClient } from "./client";

// 1. Busca a loja pelo slug cadastrado
export async function getStoreBySlug(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tenants")
    .select("id, name, slug, logo_url, status, created_at")
    .single();

  if (error) {
    console.error("Erro ao buscar loja pelo slug:", error.message);
    return null;
  }
  return data;
}

// 2. Busca os produtos que pertencem a este Tenant ID específico
export async function getProductsByTenant(tenantId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, tenant_id, category_id, name, slug, description, price, promotional_price, image_url, active, featured, sort_order")
    .eq("tenant_id", tenantId)
    .eq("active", true) // Traz apenas produtos ativos
    .order("sort_order", { ascending: true }); // Ordena conforme a escolha do lojista

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return [];
  }
  return data;
}

// Interface baseada estritamente nas colunas da sua tabela 'orders'
interface CreateOrderInput {
  tenant_id: string;
  customer_id?: string | null; // Opcional caso o cliente compre deslogado
  status?: string;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  payment_method: string;
  delivery_type: string;
}

// 3. Salva o pedido finalizado no seu banco de dados
export async function createOrder(orderData: CreateOrderInput) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        tenant_id: orderData.tenant_id,
        customer_id: orderData.customer_id || null,
        status: orderData.status || "received",
        subtotal: orderData.subtotal,
        delivery_fee: orderData.delivery_fee,
        discount: orderData.discount,
        total: orderData.total,
        payment_method: orderData.payment_method,
        delivery_type: orderData.delivery_type,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao inserir pedido na tabela orders:", error.message);
    throw error;
  }

  return data;
}
