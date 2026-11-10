import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Bell,
  BarChart3,
  Receipt,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Métricas', icon: BarChart3 },
    { id: 'transactions', label: 'Transações', icon: Receipt },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-md transition-all duration-300 select-none z-20',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Botão de Toggle (Retrair/Expandir) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-7 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer"
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Header da Sidebar */}
      <div className="flex h-16 items-center px-5 gap-3 border-b border-slate-800/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/20">
          <ShieldCheck className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-white">SaaS Core</span>
            <span className="text-[10px] font-medium text-indigo-400 uppercase tracking-wider">Enterprise</span>
          </div>
        )}
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-1.5 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all cursor-pointer',
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-indigo-400' : 'text-slate-400')} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer do Usuário */}
      <div className="border-t border-slate-800/60 p-3">
        <div className={cn('flex items-center gap-3 rounded-xl p-2 bg-slate-900/40 border border-slate-800/40', collapsed && 'justify-center')}>
          <img
            src={user?.avatarUrl || 'https://github.com/shadcn.png'}
            alt={user?.name}
            className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-700 shrink-0"
          />
          {!collapsed && (
            <div className="flex flex-1 flex-col truncate">
              <span className="text-xs font-semibold text-slate-200 truncate">{user?.name}</span>
              <span className="text-[10px] text-slate-500 truncate">{user?.email}</span>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={logout}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1 cursor-pointer"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}