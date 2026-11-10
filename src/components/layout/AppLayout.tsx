import { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  children: (activeTab: string) => ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070a11] text-slate-100 font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Passamos o setActiveTab para o Header controlar a navegação */}
        <Header onNavigate={(tab) => setActiveTab(tab)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children(activeTab)}
        </main>
      </div>
    </div>
  );
}