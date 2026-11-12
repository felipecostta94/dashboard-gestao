import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sincroniza a aba ativa com base na URL atual do navegador
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/customers')) setActiveTab('customers');
    else if (path.startsWith('/transactions')) setActiveTab('transactions');
    else if (path.startsWith('/analytics')) setActiveTab('analytics');
    else if (path.startsWith('/notifications')) setActiveTab('notifications');
    else if (path.startsWith('/settings')) setActiveTab('settings');
    else setActiveTab('dashboard');
  }, [location.pathname]);

  // Mapeia a aba selecionada no menu para a rota correspondente
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/');
    else navigate(`/${tab}`);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070a11] text-slate-100 font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onNavigate={(tab) => handleTabChange(tab)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}