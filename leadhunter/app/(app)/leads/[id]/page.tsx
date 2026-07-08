import Link from 'next/link';
import { Lead } from '@/types/lead';
import { CopyableText } from '@/components/CopyableText';
import { 
  ArrowLeft, Building2, Phone, Globe, 
  MapPin, Briefcase, ExternalLink, UserRound, Contact
} from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

import { INITIAL_MOCK_LEADS } from '@/lib/mock-data';

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Desestruturando o ID de forma assíncrona (padrão Next.js 15)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Na vida real, faríamos um fetch aqui usando o ID
  const lead = INITIAL_MOCK_LEADS.find(l => l.id === id);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Lead não encontrado</h1>
        <p className="text-zinc-500 dark:text-zinc-400">O lead com ID {id} não existe ou foi removido.</p>
        <Link 
          href="/leads"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }
  
  const renderNotMapped = () => (
    <span className="text-sm italic text-zinc-400 dark:text-zinc-500 font-medium transition-colors">Não mapeado</span>
  );

  return (
    <div className="transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Cabeçalho de Navegação */}
        <div>
          <Link 
            href="/leads"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a lista
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/20 transition-colors">
              {lead.company_name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight transition-colors">{lead.company_name}</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors">ID do Lead: {id}</p>
            </div>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Informações de Contato */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors">
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 transition-colors">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2 transition-colors">
                <Contact className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                Informações de Contato
              </h2>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex gap-4">
                <Building2 className="w-5 h-5 text-zinc-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Empresa</p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium transition-colors">{lead.company_name}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Telefone</p>
                  <CopyableText text={lead.phone} />
                </div>
              </div>

              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Website</p>
                  {lead.website ? (
                    <a href={`https://${lead.website}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                      {lead.website}
                    </a>
                  ) : renderNotMapped()}
                </div>
              </div>

              <div className="flex gap-4">
                <InstagramIcon className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Instagram</p>
                  {lead.instagram ? (
                    <a href={`https://instagram.com/${lead.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-pink-600 dark:text-pink-500 hover:text-pink-700 dark:hover:text-pink-400 font-medium transition-colors">
                      {lead.instagram}
                    </a>
                  ) : renderNotMapped()}
                </div>
              </div>

            </div>
          </div>

          {/* Card 2: Dados Cadastrais */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors">
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 transition-colors">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2 transition-colors">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                Dados Cadastrais
              </h2>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Cidade / Estado</p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium transition-colors">{lead.city}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Briefcase className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Setor Econômico</p>
                  <p className="text-zinc-900 dark:text-zinc-100 font-medium transition-colors">{lead.sector}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <ExternalLink className="w-5 h-5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 transition-colors">Consulta Tributária</p>
                  {lead.cnpj_link ? (
                    <a 
                      href={lead.cnpj_link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium transition-colors"
                    >
                      Abrir CNPJ
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : renderNotMapped()}
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Decisores */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-colors">
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 transition-colors">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2 transition-colors">
                <UserRound className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                Mapeamento de Decisores
              </h2>
            </div>
            <div className="p-6">
              
              <div className="flex gap-4 bg-amber-50/50 dark:bg-amber-500/10 p-4 rounded-xl border border-amber-100 dark:border-amber-500/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shrink-0 transition-colors">
                  {lead.decision_maker ? lead.decision_maker.charAt(0) : '?'}
                </div>
                <div>
                  <p className="text-xs font-semibold text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wider mb-0.5 transition-colors">Decisor</p>
                  {lead.decision_maker ? (
                    <>
                      <p className="text-zinc-900 dark:text-white font-semibold transition-colors">{lead.decision_maker}</p>
                    </>
                  ) : renderNotMapped()}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
