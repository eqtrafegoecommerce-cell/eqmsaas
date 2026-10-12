'use client';

import React, { useEffect, useState } from 'react';
import { getStoreBySlug, getProductsByTenant } from '@/lib/supabase/store';
import { ShoppingBag, Search, Plus, Minus, X } from 'lucide-react';
import Checkout from './components/checkout';

interface LojaProps {
  params: {
    slug: string;
  };
}

export default function LojaPublica({ params }: LojaProps) {
  const { slug } = params;

  // Estados para armazenar os dados vindos do Supabase
  const [loja, setLoja] = useState<any>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  
  const [busca, setBusca] = useState('');
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  // Carrega as informações assim que o componente monta em tela
  useEffect(() => {
    async function carregarDadosDaLoja() {
      setCarregando(true);
      
      // 1. Busca a loja pelo slug
      const dadosLoja = await getStoreBySlug(slug);
      
      if (dadosLoja) {
        setLoja(dadosLoja);
        
        // 2. Com o ID da loja, busca os produtos dela
        const listaProdutos = await getProductsByTenant(dadosLoja.id);
        setProdutos(listaProdutos);
      }
      
      setCarregando(false);
    }

    if (slug) {
      carregarDadosDaLoja();
    }
  }, [slug]);

  // Filtra os produtos com base na pesquisa por texto
  const produtosFiltrados = produtos.filter(p => 
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p className="animate-pulse text-lg font-medium text-emerald-400">Carregando cardápio...</p>
      </div>
    );
  }

  if (!loja) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400">Loja não encontrada</h1>
          <p className="text-slate-400 mt-2">Verifique o endereço digitado e tente novamente.</p>
        </div>
      </div>
    );
  }

  // ... (Sua lógica de adicionar ao carrinho e renderização do HTML continua aqui abaixo)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24">
      <header className="bg-white border-b sticky top-0 z-40 px-4 py-6 shadow-sm">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{loja.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{loja.description || 'Bem-vindo à nossa loja!'}</p>
          </div>
        </div>
      </header>
      
      {/* Restante do layout mapeando "produtosFiltrados" */}
    </div>
  );
}
