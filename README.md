# Product Requirement Document (PRD) — LeadHunter

## 1. Visão Geral do Produto
* **Nome do Produto:** LeadHunter
* **Status do Documento:** Pronto para Backlog
* **Público-Atvo:** Equipes de vendas B2B, SDRs, BDRs, agências de inteligência comercial e fundadores de startups no mercado brasileiro.
* **Objetivo Estratégico:** Validar a proposta de valor como um MVP acadêmico escalável, estruturado em arquitetura de microsserviços (Frontend desacoplado em React/Next.js), pronto para ser convertido em um modelo SaaS comercial de alta fidelidade.

---

## 2. Objetivos & Escopo

### Objetivos do Negócio/Produto
* Eliminar o trabalho manual de mineração, enriquecimento e cópia de dados públicos corporativos.
* Prover uma interface limpa, rápida e em tempo real para tomada de decisão comercial.
* Estruturar o gerenciamento de contas em níveis hierárquicos para suportar contratações corporativas (onde um gestor controla os acessos da sua equipe).

### Fora de Escopo (Não-Objetivos nesta fase)
* Disparos automatizados de e-mails ou mensagens de WhatsApp (Cold Mailing / Cold Messaging).
* Módulo completo de CRM (histórico detalhado de interações, agendas de tarefas, comentários e linhas do tempo complexas).
* Processamento interno de pagamentos ou gerenciamento de assinaturas (Stripe/Gateway).

---

## 3. Arquitetura de Permissões (Matriz de Acesso RBAC)

Para atender ao modelo de negócios e aos requisitos do painel de controle, o sistema implementará três níveis de permissão controlados via Contexto e rotas do Next.js:

| Funcionalidade / Tela | Admin (SaaS) | Manager (Dono da Empresa) | Consultor (SDR / Operador) |
| :--- | :---: | :---: | :---: |
| **Dashboard (`/app/dashboard`)** | ✅ Sim | ✅ Sim | ✅ Sim |
| **Lista de Leads (`/app/leads`)** | ✅ Sim | ✅ Sim | ✅ Sim |
| **Visualizar Detalhes (`/app/leads/:id`)** | ✅ Sim | ✅ Sim | ✅ Sim |
| **Alterar Status do Lead** | ✅ Sim | ✅ Sim | ✅ Sim |
| **Gestão de Usuários (`/app/usuarios`)** | ✅ Sim (Global) | ✅ Sim (Sua Empresa) | ❌ Bloqueado |

---

## 4. Requisitos Funcionais e Critérios de Aceitação

### Módulo: Autenticação & Sessão
#### RF-01 (MUST-01): Login com Controle de Permissão
* **Descrição:** O sistema deve permitir a entrada de usuários autenticados e injetar o escopo de privilégios (`admin`, `manager`, `consultor`) no estado global da aplicação.
* **Critérios de Aceitação:**
  * Validação no cliente impede submissão sem e-mail válido e senhas menores de 6 caracteres.
  * Erros de autenticação do servidor devem se projetar abaixo do respectivo input sem quebrar o layout da página.
  * Usuários autenticados com sucesso são enviados para `/app/dashboard`.

### Módulo: Motor de Busca e Monitoramento
#### RF-02 (MUST-02): Configuração Parametrizada de Busca
* **Descrição:** Interface amigável para envio de inputs de rastreio à API em Python.
* **Critérios de Aceitação:**
  * Obrigatório o preenchimento de: **Setor**, **Cidade/Estado** e um campo numérico de **Quantidade Desejada de Leads**.
  * O campo numérico deve impedir valores menores ou iguais a zero.
  * O botão de submissão entra em estado de `loading` e fica temporariamente desabilitado enquanto a requisição estiver ativa.

#### RF-03 (MUST-03): Painel de Telemetria em Tempo Real
* **Descrição:** Feedback dinâmico do progresso da automação em execução.
* **Critérios de Aceitação:**
  * Exibição de uma barra de progresso cujo cálculo percentual é baseado no número de leads retornados sobre a quantidade total solicitada no formulário.
  * Exibição de um card/badge numérico destacado no painel indicando o contador de **"Leads Duplicados Ignorados"** detectados pelo backend durante o processamento ativo.

### Módulo: Gestão e Detalhes de Leads
#### RF-04 (MUST-04): Tabela de Prospecção Inicial
* **Descrição:** Listagem consolidada baseada na resposta da API Python (conforme a estrutura do JSON vista em `image_3ed7de.jpg`).
* **Critérios de Aceitação:**
  * Renderização de colunas obrigatórias: *Nome*, *Cidade*, *Telefone*, *Redes*, *CNPJ* e *Status*.
  * A coluna **Status** deve exibir tags visuais distintas para os seguintes estados pré-definidos: `Esperando Contato`, `Alguém Entrou em Contato`, `Reunião Marcada` e `Lead Fugiu`.
  * Se um campo opcional vier como nulo (`null`), o sistema deve renderizar de forma elegante uma tag cinza neutra (Ex: *"Não Mapeado"*).

#### RF-05 (MUST-06): Visão de Detalhes Dinâmicos
* **Descrição:** Rota dinâmica para aprofundamento de dados para o SDR antes da abordagem.
* **Critérios de Aceitação:**
  * O clique em uma linha da tabela direciona para `/app/leads/:id` conforme o sitemap do sistema (detalhado em `image_3ed7e2.png`).
  * A interface deve separar os dados lógicos em cards limpos: Dados de Contato, Informações Cadastrais (CNPJ) e Decisores Mapeados.

### Módulo: Governança Corporativa
#### RF-06 (MUST-05): Tela de Controle de Usuários (Team Management)
* **Descrição:** Painel administrativo interno da empresa contratante.
* **Critérios de Aceitação:**
  * Listagem completa de colaboradores com badges claros identificando quem é `Admin`, `Manager` ou `Consultor`.
  * **Guarda de Rotas (Router Guard):** Caso um usuário com a claim `Consultor` digite diretamente na URL a rota `/app/usuarios`, o ecossistema do Next.js deve interceptar a ação, redirecioná-lo à página `/app/dashboard` e disparar um feedback de *"Acesso Negado"*.

---

## 5. Requisitos Não-Funcionais (RNF)

* **RNF-01 (Segurança):** Dados de sessão e tokens JWT devem ser gerenciados de forma segura, mantendo o estado de privilégios (`role`) síncrono por toda a árvore de componentes através da Context API.
* **RNF-02 (Desempenho Visual):** A renderização da tabela de leads não pode travar o navegador ao lidar com a listagem máxima permitida de dados em memória; paginação local deve ser usada para mitigar gargalos.
* **RNF-03 (Consistência Estética):** Toda a interface deve ser responsiva usando Tailwind CSS v4+, garantindo usabilidade em desktops de operação.

---

## 6. Riscos & Mitigações Técnicas

### Risco: Latência Extrema ou Timeout na API Python
* **Impacto:** Alto. Scripts de automação ou scrapping que mapeiam dezenas de leads levam tempo para consolidar informações.
* **Mitigação:** O frontend em React nunca operará em modo cego. O estado de carregamento exibirá mensagens de progresso parciais dinâmicas, mantendo o fluxo assíncrono controlado no cliente para evitar requisições duplicadas acidentais.

### Risco: Inconsistência de Dados (Campos Nulos)
* **Impacto:** Médio. Empresas sem presença digital podem estourar erros de renderização (`Cannot read properties of null`).
* **Mitigação:** Tipagem rigorosa com **TypeScript** e uso generalizado de encadeamento opcional (*Optional Chaining*: `lead?.instagram`) aliado à renderização condicional por toda a interface de exibição.
