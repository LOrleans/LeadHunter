'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lead, LeadStatus } from '@/types/lead';
import { Role } from '@/types/auth';
import { CopyableText } from '@/components/CopyableText';
import { 
  Building2, MapPin, Phone, 
  ChevronLeft, ChevronRight, Search, Filter, Briefcase, UserRound, ChevronDown, MoreHorizontal, UserCheck
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

import { INITIAL_MOCK_LEADS, MOCK_USERS } from '@/lib/mock-data';

export default function LeadsPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [leads, setLeads] = useState<Lead[]>(INITIAL_MOCK_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filterRef = React.useRef<HTMLDivElement>(null);
  
  // Controle de dropdown de ação por linha
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionDropdownRef = React.useRef<HTMLDivElement>(null);

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'waiting_contact', label: 'Esperando Contato' },
    { value: 'contacted', label: 'Alguém Entrou em Contato' },
    { value: 'meeting', label: 'Reunião Marcada' },
    { value: 'lost', label: 'Lead Fugiu' },
  ];

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target as Node)) {
        setOpenActionId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const renderStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'waiting_contact':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mr-1.5"></span>
            Esperando Contato
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mr-1.5"></span>
            Alguém Entrou em Contato
          </span>
        );
      case 'meeting':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 mr-1.5"></span>
            Reunião Marcada
          </span>
        );
      case 'lost':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 mr-1.5"></span>
            Lead Fugiu
          </span>
        );
      default:
        return null;
    }
  };

  const renderNotMapped = () => (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
      Não Mapeado
    </span>
  );

  const handleRowClick = (leadId: string) => {
    router.push('/app/leads/' + leadId);
  };

  const handleAssignToMe = (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation();
    if (!user) return;
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, owner: user.name, status: 'contacted' }
        : lead
    ));
  };

  const updateLeadStatus = (e: React.MouseEvent, leadId: string, status: LeadStatus) => {
    e.stopPropagation();
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status } : lead
    ));
    setOpenActionId(null);
  };

  const assignLeadOwner = (e: React.MouseEvent, leadId: string, ownerName: string) => {
    e.stopPropagation();
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, owner: ownerName } : lead
    ));
    setOpenActionId(null);
  };

  return (
    <div className="transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 transition-colors">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              Gestão de Leads
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 transition-colors">Gerencie, filtre e acompanhe o status dos leads capturados.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar empresa ou cidade..."
                className="pl-9 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600"
              />
            </div>
            <div className="relative w-full sm:w-48" ref={filterRef}>
              <button 
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between pl-9 pr-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 cursor-pointer"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Filter className="w-4 h-4" />
                </div>
                <span className="truncate">{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <div className="absolute z-10 right-0 sm:left-0 w-56 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg py-1.5 overflow-hidden origin-top-right sm:origin-top-left transition-all">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setStatusFilter(option.value);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        statusFilter === option.value
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 font-medium'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabela de Leads */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden transition-colors">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold transition-colors">
                  <th className="px-6 py-4">Empresa / Contato</th>
                  <th className="px-6 py-4">Setor</th>
                  <th className="px-6 py-4">Localização</th>
                  <th className="px-6 py-4">Telefone</th>
                  <th className="px-6 py-4">Redes Sociais</th>
                  <th className="px-6 py-4">Status & Resp.</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80 text-sm">
                {paginatedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-zinc-500">
                      Nenhum lead encontrado com os filtros atuais.
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      onClick={() => handleRowClick(lead.id)}
                      className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
                    >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 text-zinc-500 dark:text-zinc-400 font-bold group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                          {lead.company_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100 transition-colors">{lead.company_name}</p>
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 transition-colors">
                            <UserRound className="w-3 h-3" />
                            {lead.decision_maker ? (
                              <span>{lead.decision_maker}</span>
                            ) : (
                              renderNotMapped()
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 transition-colors">
                        <Briefcase className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                        {lead.sector}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 transition-colors">
                        <MapPin className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                        {lead.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div 
                        className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-4 h-4 text-zinc-400" />
                        <CopyableText text={lead.phone} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <InstagramIcon className="w-4 h-4 text-pink-600 dark:text-pink-500" />
                        {lead.instagram ? (
                          <span className="text-zinc-600 dark:text-zinc-400 text-sm transition-colors">{lead.instagram}</span>
                        ) : (
                          renderNotMapped()
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-2">
                        {renderStatusBadge(lead.status)}
                        {lead.owner && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
                            <UserCheck className="w-3 h-3" />
                            Resp: {lead.owner}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user?.role === 'consultor' ? (
                        <button
                          onClick={(e) => handleAssignToMe(e, lead.id)}
                          className="inline-flex items-center justify-center px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors active:scale-95"
                        >
                          Assumir
                        </button>
                      ) : (
                        <div className="relative inline-block text-left">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionId(openActionId === lead.id ? null : lead.id);
                            }}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          
                          {openActionId === lead.id && (
                            <div 
                              ref={actionDropdownRef}
                              className="absolute right-0 z-50 mt-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg py-2 overflow-hidden transition-all text-left"
                            >
                              <div className="px-3 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                Alterar Status
                              </div>
                              <div className="px-1 mb-2 border-b border-zinc-100 dark:border-zinc-700/50 pb-2">
                                <button onClick={(e) => updateLeadStatus(e, lead.id, 'waiting_contact')} className="w-full text-left px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors">Esperando Contato</button>
                                <button onClick={(e) => updateLeadStatus(e, lead.id, 'contacted')} className="w-full text-left px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors">Contatado</button>
                                <button onClick={(e) => updateLeadStatus(e, lead.id, 'meeting')} className="w-full text-left px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors">Reunião Marcada</button>
                                <button onClick={(e) => updateLeadStatus(e, lead.id, 'lost')} className="w-full text-left px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">Lead Fugiu</button>
                              </div>

                              <div className="px-3 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                Atribuir a
                              </div>
                              <div className="px-1 max-h-32 overflow-y-auto">
                                {MOCK_USERS.map(member => (
                                  <button 
                                    key={member.id} 
                                    onClick={(e) => assignLeadOwner(e, lead.id, member.name)}
                                    className="w-full text-left px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors truncate"
                                  >
                                    {member.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30 transition-colors">
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Mostrando <span className="font-medium text-zinc-900 dark:text-zinc-200">{filteredLeads.length > 0 ? startIndex + 1 : 0}</span> a <span className="font-medium text-zinc-900 dark:text-zinc-200">{Math.min(endIndex, filteredLeads.length)}</span> de <span className="font-medium text-zinc-900 dark:text-zinc-200">{filteredLeads.length}</span> leads
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page 
                      ? 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                      : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-white dark:bg-zinc-800 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
