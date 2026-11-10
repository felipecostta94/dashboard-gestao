import { Search, Bell, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { user } = useAuth();

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

        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white transition-colors cursor-pointer">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
        </button>
      </div>
    </header>
  );
}