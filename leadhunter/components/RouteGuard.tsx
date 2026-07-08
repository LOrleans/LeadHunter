'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isProtectedRoute = pathname.startsWith('/app');
    
    if (isProtectedRoute && !isAuthenticated && !isLoadingAuth) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoadingAuth, pathname, router, isMounted]);

  // Evita problemas de hidratação e flashes de conteúdo
  if (!isMounted || isLoadingAuth) {
    return null;
  }

  const isProtectedRoute = pathname.startsWith('/app');
  if (isProtectedRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
