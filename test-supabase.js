import { createClient } from '@supabase/supabase-js'
// Se estiver usando CommonJS (sem "type": "module" no package.json), substitua por:
// const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ipjjenppbcvkxjvkkdzb.supabase.co'
const supabaseKey = 'sb_publishable_PEvjwcg3Ve1kyPEk9-8yaQ_bJ9IZI_P'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  // Tenta ler uma tabela qualquer do seu banco (ex: 'users' ou uma tabela sua)
  const { data, error } = await supabase.from('SuaTabelaAqui').select('*').limit(1)

  if (error) {
    console.error('❌ Erro ao conectar ao Supabase:', error.message)
  } else {
    console.log('✅ Conexão bem-sucedida! Dados recebidos:', data)
  }
}

testConnection()
