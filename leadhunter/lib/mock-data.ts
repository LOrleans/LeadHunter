import { Lead } from '@/types/lead';
import { Role } from '@/types/auth';

export const MOCK_USERS = [
  { id: '1', name: 'Admin Teste', email: 'admin@teste.com', role: 'admin' as Role },
  { id: '2', name: 'Manager Teste', email: 'manager@teste.com', role: 'manager' as Role },
  { id: '3', name: 'Consultor Teste', email: 'consultor@teste.com', role: 'consultor' as Role },
  { id: '4', name: 'Ana Souza', email: 'ana.souza@leadhunter.com', role: 'consultor' as Role },
  { id: '5', name: 'Carlos Andrade', email: 'carlos@leadhunter.com', role: 'manager' as Role },
];

export const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: "1",
    company_name: "Tech Solutions BR",
    status: "contacted",
    phone: "(11) 98765-4321",
    website: "techsolutions.com.br",
    instagram: "@techsolutions_br",
    city: "São Paulo",
    sector: "Tecnologia",
    cnpj_link: "https://receitaws.com.br/v1/cnpj/...",
    decision_maker: "Carlos Silva"
  },
  {
    id: "2",
    company_name: "Odonto Clean",
    status: "waiting_contact",
    phone: "(21) 99887-6655",
    website: null,
    instagram: null,
    city: "Rio de Janeiro",
    sector: "Saúde",
    cnpj_link: null,
    decision_maker: null
  },
  {
    id: "3",
    company_name: "Agro Forte",
    status: "meeting",
    phone: "(62) 99123-4567",
    website: "agroforte.com",
    instagram: "@agroforte",
    city: "Goiânia",
    sector: "Agronegócio",
    cnpj_link: null,
    decision_maker: "Roberto Alves"
  },
  {
    id: "4",
    company_name: "Varejo Express",
    status: "lost",
    phone: "(31) 98888-7777",
    website: "varejoexpress.com",
    instagram: null,
    city: "Belo Horizonte",
    sector: "Varejo",
    cnpj_link: null,
    decision_maker: "Mariana Costa"
  },
  {
    id: "5",
    company_name: "Consultoria Alpha",
    status: "waiting_contact",
    phone: "(41) 98811-2233",
    website: null,
    instagram: "@alpha_consulting",
    city: "Curitiba",
    sector: "Serviços",
    cnpj_link: null,
    decision_maker: null
  },
  {
    id: "6",
    company_name: "Inova Sistemas",
    status: "contacted",
    phone: "(51) 98711-2233",
    website: "inovasistemas.com.br",
    instagram: "@inova_sys",
    city: "Porto Alegre",
    sector: "Tecnologia",
    cnpj_link: null,
    decision_maker: "Fernanda Souza"
  },
  {
    id: "7",
    company_name: "Construtora Silva",
    status: "waiting_contact",
    phone: "(81) 99988-7766",
    website: null,
    instagram: null,
    city: "Recife",
    sector: "Construção",
    cnpj_link: null,
    decision_maker: null
  },
  {
    id: "8",
    company_name: "Logística Nacional",
    status: "meeting",
    phone: "(71) 99122-3344",
    website: "logisticanacional.com",
    instagram: "@log_nacional",
    city: "Salvador",
    sector: "Logística",
    cnpj_link: null,
    decision_maker: "Antônio Marcos"
  },
  {
    id: "9",
    company_name: "Educa Mais",
    status: "lost",
    phone: "(85) 98877-6655",
    website: "educamais.com.br",
    instagram: null,
    city: "Fortaleza",
    sector: "Educação",
    cnpj_link: null,
    decision_maker: "Helena Lima"
  },
  {
    id: "10",
    company_name: "Clínica Vida",
    status: "waiting_contact",
    phone: "(92) 98111-2233",
    website: null,
    instagram: "@clinica_vida",
    city: "Manaus",
    sector: "Saúde",
    cnpj_link: null,
    decision_maker: null
  }
];
