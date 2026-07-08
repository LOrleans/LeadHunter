export type LeadStatus = 'waiting_contact' | 'contacted' | 'meeting' | 'lost';

export interface Lead {
  id: string;
  company_name: string;
  status: LeadStatus;
  phone: string;
  website: string | null;
  instagram: string | null;
  city: string;
  sector: string;
  cnpj_link: string | null;
  decision_maker: string | null;
  owner?: string;
}
