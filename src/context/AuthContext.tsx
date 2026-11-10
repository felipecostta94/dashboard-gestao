import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'usr_1',
  name: 'Felipe Costa',
  email: 'felipe@exemplo.com',
  avatarUrl: 'https://github.com/shadcn.png',
  role: 'admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula verificação de token/sessão ao carregar a página
    const storedAuth = localStorage.getItem('@saas-dashboard:auth');
    if (storedAuth) {
      setUser(JSON.parse(storedAuth));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simula atraso da API de login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password) {
      const loggedUser = { ...MOCK_USER, email };
      setUser(loggedUser);
      localStorage.setItem('@saas-dashboard:auth', JSON.stringify(loggedUser));
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@saas-dashboard:auth');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }
  return context;
}