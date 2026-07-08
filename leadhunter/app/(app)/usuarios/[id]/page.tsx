'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, UserRound, ShieldCheck, AlertOctagon, Mail, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';
import { Role } from '@/types/auth';

export default function UserManagementPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState(() => MOCK_USERS.find(u => u.id === id) || null);
  const [selectedRole, setSelectedRole] = useState<Role>(user?.role || 'consultor');
  
  // UI states para o MVP
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Usuário não encontrado</h1>
        <p className="text-zinc-500 dark:text-zinc-400">O funcionário com ID {id} não existe no sistema.</p>
        <Link 
          href="/usuarios"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaving(true);
    // Simula uma chamada de API
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setUser(prev => prev ? { ...prev, role: selectedRole } : null);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    // Simula uma chamada de API
    setTimeout(() => {
      router.push('/usuarios');
    }, 1000);
  };

  return (
    <div className="transition-colors duration-200">
      <div className="max-w-[1000px] mx-auto space-y-8">
        
        {/* Navegação e Cabeçalho */}
        <div>
          <Link 
            href="/usuarios"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para os Usuários
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-600/20 transition-colors">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors">
                  Gerenciar Acesso
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 transition-colors">
                  Visualizando configurações de <strong className="text-zinc-700 dark:text-zinc-300">{user.name}</strong>
                </p>
              </div>
            </div>

            {showSuccess && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-right-4">
                <CheckCircle2 className="w-4 h-4" />
                Configurações salvas!
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Perfil */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors">
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 transition-colors">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2 transition-colors">
                <UserRound className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                Informações Pessoais
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Nome Completo</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    value={user.name}
                    disabled
                    className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 cursor-not-allowed transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Endereço de E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="email" 
                    value={user.email}
                    disabled
                    className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 cursor-not-allowed transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Permissões */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors flex flex-col">
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 transition-colors">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2 transition-colors">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
                Permissões (RBAC)
              </h2>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1 space-y-4">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Nível de Acesso</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as Role)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.2em 1.2em'
                  }}
                >
                  <option value="consultor">Consultor</option>
                  <option value="manager">Gerente</option>
                  <option value="admin">Administrador</option>
                </select>
                
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  A alteração do nível de acesso entra em vigor imediatamente após salvar.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
                <button 
                  onClick={handleSave}
                  disabled={isSaving || selectedRole === user.role}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSaving ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Danger Zone */}
        <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-2xl overflow-hidden transition-colors mt-8">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-red-900 dark:text-red-400 mb-1">Revogar Acesso do Usuário</h3>
              <p className="text-sm text-red-700 dark:text-red-500/70">
                Ao remover este usuário, ele perderá acesso imediato à plataforma. Os leads atualmente atribuídos a ele ficarão órfãos. Esta ação não pode ser desfeita.
              </p>
            </div>
            
            <button 
              onClick={handleRemove}
              disabled={isRemoving}
              className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shadow-red-600/20 disabled:opacity-50 active:scale-[0.98]"
            >
              {isRemoving ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Remover Usuário
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
