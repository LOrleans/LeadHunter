'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Hash, Play, Activity, AlertCircle, CheckCircle2, UserX } from 'lucide-react';

export default function DashboardPage() {
  const [sector, setSector] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ quantity?: string; sector?: string; location?: string }>({});
  
  const [isSearching, setIsSearching] = useState(false);
  const [leadsFound, setLeadsFound] = useState(0);
  const [duplicatesIgnored, setDuplicatesIgnored] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!sector.trim()) newErrors.sector = 'O setor é obrigatório.';
    if (!location.trim()) newErrors.location = 'A localização é obrigatória.';
    if (quantity === '' || Number(quantity) <= 0) {
      newErrors.quantity = 'A quantidade deve ser maior que 0.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSearching(true);
      setIsFinished(false);
      setLeadsFound(0);
      setDuplicatesIgnored(0);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isSearching && typeof quantity === 'number') {
      intervalId = setInterval(() => {
        setLeadsFound((prev) => {
          const increase = Math.floor(Math.random() * 5) + 1;
          const newValue = prev + increase;

          if (Math.random() > 0.7) {
            setDuplicatesIgnored((d) => d + Math.floor(Math.random() * 3) + 1);
          }

          if (newValue >= quantity) {
            clearInterval(intervalId);
            setIsSearching(false);
            setIsFinished(true);
            return quantity;
          }
          return newValue;
        });
      }, 500); 
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSearching, quantity]);

  const targetQuantity = typeof quantity === 'number' ? quantity : 1;
  const progressPercent = isFinished ? 100 : Math.min(100, Math.round((leadsFound / targetQuantity) * 100));

  return (
    <div className="transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 transition-colors">
            <Search className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 transition-colors">Configure os parâmetros e inicie o mapeamento de novos leads em tempo real.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna Esquerda: Formulário */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-6 transition-colors">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
                Configuração da Busca
              </h2>

              <form onSubmit={handleStartSearch} className="space-y-5">
                
                {/* Input: Setor */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Setor de Atuação</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Briefcase className={`h-5 w-5 ${errors.sector ? 'text-red-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
                    </div>
                    <input
                      type="text"
                      disabled={isSearching}
                      value={sector}
                      onChange={(e) => {
                        setSector(e.target.value);
                        if (errors.sector) setErrors({ ...errors, sector: undefined });
                      }}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.sector ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                      } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
                      placeholder="Ex: Clínicas Odontológicas"
                    />
                  </div>
                  {errors.sector && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5">{errors.sector}</p>}
                </div>

                {/* Input: Cidade/Estado */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Cidade/Estado</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <MapPin className={`h-5 w-5 ${errors.location ? 'text-red-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
                    </div>
                    <input
                      type="text"
                      disabled={isSearching}
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        if (errors.location) setErrors({ ...errors, location: undefined });
                      }}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.location ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                      } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
                      placeholder="Ex: São Paulo, SP"
                    />
                  </div>
                  {errors.location && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5">{errors.location}</p>}
                </div>

                {/* Input: Quantidade */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quantidade Desejada</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Hash className={`h-5 w-5 ${errors.quantity ? 'text-red-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
                    </div>
                    <input
                      type="number"
                      disabled={isSearching}
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value === '' ? '' : Number(e.target.value));
                        if (errors.quantity) setErrors({ ...errors, quantity: undefined });
                      }}
                      className={`block w-full pl-10 pr-3 py-2.5 border ${
                        errors.quantity ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                      } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
                      placeholder="Ex: 50"
                    />
                  </div>
                  {errors.quantity && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5">{errors.quantity}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white transition-all active:scale-[0.98] mt-6 ${
                    isSearching ? 'bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900'
                  }`}
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Buscando Leads...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      Iniciar Descoberta
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Coluna Direita: Telemetria */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bloco de Progresso */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-6 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  Progresso da Captura
                </h2>
                {isFinished && (
                  <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Concluído
                  </span>
                )}
                {isSearching && (
                  <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 transition-colors">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-blue-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-blue-400"></span>
                    </span>
                    Em andamento
                  </span>
                )}
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <span>Leads Encontrados</span>
                  <span className="text-blue-600 dark:text-blue-400">{leadsFound} / {targetQuantity === 1 && !quantity ? 0 : targetQuantity}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden transition-colors">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 animate-[shimmer_2s_infinite] -skew-x-12"></div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-right transition-colors">{progressPercent}% Concluído</p>
              </div>
            </div>

            {/* Bloco de Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card de Duplicados */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-6 flex flex-col items-center justify-center text-center transition-colors">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-3 transition-colors">
                  <UserX className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 transition-colors">{duplicatesIgnored}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1.5 transition-colors">
                  Leads Duplicados Ignorados
                  <AlertCircle className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                </p>
              </div>

              {/* Card Estimativa / Status */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-6 flex flex-col justify-center transition-colors">
                <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 transition-colors">Status da Operação</h4>
                <div className="text-zinc-900 dark:text-white font-medium transition-colors">
                  {!isSearching && !isFinished && 'Aguardando início...'}
                  {isSearching && 'Buscando ativamente na rede.'}
                  {isFinished && 'Captura finalizada com sucesso!'}
                </div>
                {isSearching && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3 animate-pulse transition-colors">
                    Consultando fontes públicas de dados...
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
