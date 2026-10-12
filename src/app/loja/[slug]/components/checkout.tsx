'use client';

import React, { useState } from 'react';
import { X, MapPin, CreditCard, DollarSign, Landmark, Truck, ShoppingBag } from 'lucide-react';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  subtotal: number;
  onFinalizar: (dados: {
    delivery_type: string;
    payment_method: string;
    endereco: string;
  }) => void;
  carregando: boolean;
}

export default function Checkout({ isOpen, onClose, total, subtotal, onFinalizar, carregando }: CheckoutProps) {
  const [deliveryType, setDeliveryType] = useState('delivery'); 
  const [paymentMethod, setPaymentMethod] = useState('pix'); 
  
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deliveryType === 'delivery' && (!endereco || !bairro || !numero)) {
      alert('Por favor, preencha todos os campos do endereço para a entrega.');
      return;
    }

    onFinalizar({
      delivery_type: deliveryType === 'delivery' ? 'Entrega' : 'Retirada',
      payment_method: paymentMethod === 'pix' ? 'Pix' : paymentMethod === 'card' ? 'Cartão' : 'Dinheiro',
      endereco: deliveryType === 'delivery' ? `${endereco}, ${numero} - ${bairro}` : 'Retirada no balcão'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="bg-slate-900 text-white w-full max-w-md h-full flex flex-col p-6 shadow-2xl overflow-y-auto border-l border-slate-800">
        
        {/* Header do Checkout */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-emerald-400" /> Finalizar Pedido
          </h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-slate-800 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* 1. Tipo de Entrega */}
            <div>
              <label className="text-sm font-semibold text-slate-400 block mb-3">Como deseja receber?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl font-medium border transition ${
                    deliveryType === 'delivery'
                      ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <Truck size={18} /> Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`flex items-center justify-center gap-2 p-3.5 rounded-xl font-medium border transition ${
                    deliveryType === 'pickup'
                      ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <MapPin size={18} /> Retirada
                </button>
              </div>
            </div>

            {/* 2. Formulário de Endereço */}
            {deliveryType === 'delivery' && (
              <div className="space-y-4 bg-slate-800/30 p-4 rounded-xl border border-slate-800/80">
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin size={16} className="text-emerald-400" /> Endereço de Entrega
                </h3>
                
                <div>
                  <input
                    type="text"
                    placeholder="Rua / Avenida"
                    required
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <input
                      type="text"
                      placeholder="Número"
                      required
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Bairro"
                      required
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Método de Pagamento */}
            <div>
              <label className="text-sm font-semibold text-slate-400 block mb-3">Forma de Pagamento</label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                    paymentMethod === 'pix' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' : 'bg-slate-800/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-3 font-medium"><Landmark size={18} /> Pix</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'pix' ? 'border-emerald-500' : 'border-slate-600'}`}>
                    {paymentMethod === 'pix' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                    paymentMethod === 'card' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' : 'bg-slate-800/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-3 font-medium"><CreditCard size={18} /> Cartão (na entrega)</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-emerald-500' : 'border-slate-600'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('money')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition ${
                    paymentMethod === 'money' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' : 'bg-slate-800/50 border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-3 font-medium"><DollarSign size={18} /> Dinheiro</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'money' ? 'border-emerald-500' : 'border-slate-600'}`}>
                    {paymentMethod === 'money' && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo de Valores e Ação */}
          <div className="border-t border-slate-800 pt-4 bg-slate-900 sticky bottom-0 left-0 right-0 space-y-4">
            <div className="space-y-1.5 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R\$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>{deliveryType === 'delivery' ? 'A combinar' : 'Grátis'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-white pt-2 border-t border-slate-800/60">
                <span>Total estimado</span>
                <span className="text-emerald-400">R\$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-emerald-600 text-white text-center py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? 'Processando pedido...' : 'Confirmar e Enviar para WhatsApp'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
