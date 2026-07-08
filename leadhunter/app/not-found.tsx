import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold mb-2">404 - Página Não Encontrada</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Ops! A página que você está procurando não existe ou você não tem permissão para acessá-la.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
