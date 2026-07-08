'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, Role } from '../types/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  // Carrega a sessão inicial do localStorage
  useEffect(() => {
    const storedSession = localStorage.getItem('mock_session_user');
    if (storedSession) {
      try {
        setUser(JSON.parse(storedSession));
      } catch (e) {
        console.error('Failed to parse session', e);
      }
    }
    setIsLoadingAuth(false);
  }, []);

  const login = async (email: string) => {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
    let targetUser = storedUsers.find(u => u.email === email);

    if (!targetUser) {
      // Fallback para mock accounts caso não exista no localStorage
      let role: Role = 'consultor';
      let name = 'Consultor Padrão';

      if (email === 'admin@teste.com') {
        role = 'admin';
        name = 'Admin Teste';
      } else if (email === 'manager@teste.com') {
        role = 'manager';
        name = 'Manager Teste';
      } else if (email === 'consultor@teste.com') {
        role = 'consultor';
        name = 'Consultor Teste';
      } else {
        name = email.split('@')[0];
      }

      targetUser = {
        id: Math.random().toString(36).substring(2, 11),
        name,
        email,
        company: 'LeadHunter Corp',
        role,
      };
    }

    setUser(targetUser);
    localStorage.setItem('mock_session_user', JSON.stringify(targetUser));
    router.push('/app/dashboard');
  };

  const register = async (name: string, email: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      company: 'Sua Empresa', // Mock padrão
      role: 'consultor', // Por segurança, novos cadastros são sempre 'consultor' inicialmente
    };

    const storedUsers: User[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
    storedUsers.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(storedUsers));

    // Faz o login automático após o registro
    setUser(newUser);
    localStorage.setItem('mock_session_user', JSON.stringify(newUser));
    router.push('/app/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_session_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoadingAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
