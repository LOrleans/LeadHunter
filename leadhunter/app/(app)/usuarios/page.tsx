'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Role } from '@/types/auth';
import { 
  Users, UserPlus, ShieldCheck, Mail, ShieldAlert, Settings, X, Send, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_USERS } from '@/lib/mock-data';

export default function UsuariosPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  
  // Modal states
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setIsInviting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsInviting(false);
      setInviteSuccess(true);
      setTimeout(() => {
        setIsInviteModalOpen(false);
        setInviteSuccess(false);
        setInviteEmail('');
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === 'consultor') {
      router.replace('/dashboard');
    } else {
      setIsAuthorized(true);
    }
  }, [user, isAuthenticated, router]);

  if (!isAuthorized) {
    return null;
  }

  const renderRoleBadge = (role: Role) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
            Administrador
          </span>
        );
      case 'manager':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Gerente
          </span>
        );
      case 'consultor':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            Consultor
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Cabeçalho da Governança */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 transition-colors">
              <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
              Usuários
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 transition-colors">Gerencie os acessos e permissões dos membros da sua equipe.</p>
          </div>

          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-600/20 active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4" />
            Convidar Novo Usuário
          </button>
        </div>

        {/* Listagem em Linhas Simples */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden transition-colors">
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {MOCK_USERS.map((member) => (
              <li 
                key={member.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors group"
              >
                {/* Coluna Esquerda: Dados do Usuário */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-bold shrink-0 transition-colors">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white transition-colors">{member.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 transition-colors">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: Badges e Ações */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                  <div className="flex-shrink-0">
                    {renderRoleBadge(member.role)}
                  </div>
                  
                  <Link 
                    href={`/app/usuarios/${member.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Gerenciar
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Alerta de Segurança Restrita */}
        <div className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-4 transition-colors">
          <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 transition-colors" />
          <div className="text-sm text-indigo-900 dark:text-indigo-200 transition-colors">
            <span className="font-semibold block mb-1">Área Restrita</span>
            Esta página é protegida pelo sistema de Role-Based Access Control (RBAC). Apenas Administradores e Gerentes possuem visualização dessa listagem.
          </div>
        </div>
        {/* Modal de Convite */}
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  Convidar para a Equipe
                </h3>
                <button 
                  onClick={() => setIsInviteModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                {inviteSuccess ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Convite Enviado!</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Um e-mail com as instruções de acesso foi enviado para <br/>
                      <strong className="text-zinc-700 dark:text-zinc-300">{inviteEmail}</strong>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInvite} className="space-y-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      O usuário receberá um e-mail com um link para criar sua senha e acessar a plataforma.
                    </p>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">Endereço de E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input 
                          type="email" 
                          required
                          placeholder="exemplo@empresa.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsInviteModalOpen(false)}
                        className="px-4 py-2.5 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit"
                        disabled={isInviting || !inviteEmail}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-600/20 disabled:opacity-50 active:scale-[0.98]"
                      >
                        {isInviting ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Enviar Convite
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
