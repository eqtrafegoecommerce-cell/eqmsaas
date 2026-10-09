// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Captura as chaves públicas do ambiente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validação preventiva para evitar que o código quebre silenciosamente
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(" Erro: As variáveis de ambiente do Supabase não foram encontradas no .env.local");
  }

  return createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
  )
}
