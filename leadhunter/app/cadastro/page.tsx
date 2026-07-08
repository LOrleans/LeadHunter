'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User as UserIcon, Building2, ArrowRight, Target } from 'lucide-react';

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [errors, setErrors] = useState<{
    name?: string;
    company?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = 'O nome completo é obrigatório.';
    if (!company.trim()) newErrors.company = 'O nome da empresa é obrigatório.';

    if (!email) {
      newErrors.email = 'O e-mail corporativo é obrigatório.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Por favor, insira um e-mail válido.';
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve conter no mínimo 6 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        await register(name, email);
      } catch (err) {
        console.error('Falha ao registrar:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-8 space-y-8 transition-colors">
        
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-colors">
            <Target className="w-7 h-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors">Criar Conta</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 transition-colors">Comece a prospectar com o LeadHunter</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">Nome Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <UserIcon className={`h-5 w-5 ${errors.name ? 'text-red-400 dark:text-red-500' : 'text-zinc-400 dark:text-zinc-500'} transition-colors`} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.name 
                    ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500' 
                    : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm`}
                placeholder="João da Silva"
              />
            </div>
            {errors.name && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5 transition-colors">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">Empresa</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Building2 className={`h-5 w-5 ${errors.company ? 'text-red-400 dark:text-red-500' : 'text-zinc-400 dark:text-zinc-500'} transition-colors`} />
              </div>
              <input
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors({ ...errors, company: undefined });
                }}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.company 
                    ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500' 
                    : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm`}
                placeholder="Sua Empresa Ltda"
              />
            </div>
            {errors.company && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5 transition-colors">{errors.company}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">E-mail Corporativo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400 dark:text-red-500' : 'text-zinc-400 dark:text-zinc-500'} transition-colors`} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.email 
                    ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500' 
                    : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm`}
                placeholder="voce@empresa.com"
              />
            </div>
            {errors.email && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5 transition-colors">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400 dark:text-red-500' : 'text-zinc-400 dark:text-zinc-500'} transition-colors`} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`block w-full pl-10 pr-3 py-2.5 border ${
                  errors.password 
                    ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-red-500' 
                    : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800'
                } rounded-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all sm:text-sm`}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-500 dark:text-red-400 text-xs font-medium mt-1.5 transition-colors">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 transition-all active:scale-[0.98] disabled:opacity-70 mt-6"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Finalizar Cadastro
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 transition-colors">
          Já possui uma conta?{' '}
          <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}
