import { Search, Bell, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onNavigate?: (tab: string) => void;
  unreadCount?: number;
}

export function Header({ onNavigate, unreadCount = 0 }: HeaderProps) {
  const { user } = useAuth();

  const handleNotificationClick = () => {
    if (onNavigate) {
      onNavigate('notifications');
    } else {
      const notificationTabButton = document.querySelector('[data-tab="notifications"]') as HTMLButtonElement;
      if (notificationTabButton) {
        notificationTabButton.click();
      } else {
        window.dispatchEvent(new CustomEvent('change-tab', { detail: 'notifications' }));
      }
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800/80 bg-slate-950/40 px-6 backdrop-blur-md">
      {/* Busca Rápida */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar relatórios, clientes..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 transition-all"
        />
      </div>

      {/* Ações / Status */}
      <div className="flex items-center gap-4">
        <Badge variant="success" className="gap-1.5 py-1 px-3">
          <Sparkles className="h-3 w-3" /> Sistema 100% Operacional
        </Badge>

        <button
          onClick={handleNotificationClick}
          className="relative p-2.5 rounded-xl bg-slate-900/10 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-900/20 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
          title="Ver notificações"
        >
          <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
        </button>
      </div>
    </header>
  );
}