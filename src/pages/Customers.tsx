import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, UserPlus, MoreHorizontal, Mail, ShieldCheck } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  plan: 'Enterprise' | 'Pro' | 'Starter';
  status: 'active' | 'inactive' | 'trial';
  spent: string;
  joinedDate: string;
  avatar: string;
}

const CUSTOMERS_DATA: Customer[] = [
  {
    id: 'usr_1',
    name: 'Ana Beatris',
    email: 'ana.beatris@techsolucoes.com',
    plan: 'Enterprise',
    status: 'active',
    spent: 'R$ 14.500,00',
    joinedDate: '15 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 'usr_2',
    name: 'Carlos Eduardo',
    email: 'carlos@inovacaodigital.io',
    plan: 'Pro',
    status: 'active',
    spent: 'R$ 1.798,80',
    joinedDate: '02 Fev 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 'usr_3',
    name: 'Fernanda Lima',
    email: 'nanda.lima@designstudio.br',
    plan: 'Starter',
    status: 'trial',
    spent: 'R$ 0,00',
    joinedDate: '01 Nov 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
  {
    id: 'usr_4',
    name: 'Ricardo Mendes',
    email: 'ricardo@mendesconsultoria.com',
    plan: 'Pro',
    status: 'inactive',
    spent: 'R$ 899,40',
    joinedDate: '10 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
];

export function Customers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCustomers = CUSTOMERS_DATA.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Gestão de Clientes</h1>
          <p className="text-xs text-slate-400">Administre os assinantes ativos, retenção e históricos da plataforma.</p>
        </div>
        <Button variant="primary" size="md" className="gap-2 shrink-0">
          <UserPlus className="h-4 w-4" /> Adicionar Cliente
        </Button>
      </div>

      {/* Métricas Rápidas da Base */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">Total de Assinantes</span>
            <p className="text-xl font-bold text-white">1.429</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">Contratos Ativos</span>
            <p className="text-xl font-bold text-white">1.280</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">Em Período de Teste</span>
            <p className="text-xl font-bold text-white">149</p>
          </div>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="trial">Em Teste</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Plano</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Total Investido</th>
                <th className="pb-3 font-medium">Membro desde</th>
                <th className="pb-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 pr-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-200">{customer.name}</span>
                        <span className="text-[11px] text-slate-500">{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-slate-300 font-medium">{customer.plan}</td>
                  <td className="py-3.5 pr-3">
                    {customer.status === 'active' && <Badge variant="success">Ativo</Badge>}
                    {customer.status === 'trial' && <Badge variant="warning">Em Teste</Badge>}
                    {customer.status === 'inactive' && <Badge variant="danger">Inativo</Badge>}
                  </td>
                  <td className="py-3.5 pr-3 text-slate-200 font-semibold">{customer.spent}</td>
                  <td className="py-3.5 pr-3 text-slate-400">{customer.joinedDate}</td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors cursor-pointer">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}