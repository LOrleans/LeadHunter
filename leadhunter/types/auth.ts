export type Role = 'admin' | 'manager' | 'consultor';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: Role;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}
