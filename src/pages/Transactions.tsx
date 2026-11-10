import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Download, MoreHorizontal } from 'lucide-react';

interface FullTransaction {
  id: string;
  client: string;
  email: string;
  plan: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'income' | 'expense';
  gateway: string;
}

const FULL_TRANSACTIONS: FullTransaction[] = [
  {
    id: 'tx_101',
    client: 'TechCorp Soluções',
    email: 'financeiro@techcorp.com',
    plan: 'Enterprise Annual',
    amount: 'R$ 4.500,00',
    date: '10 Nov 2026, 14:20',
    status: 'completed',
    type: 'income',
    gateway: 'Stripe (Cartão)',
  },
  {
    id: 'tx_102',
    client: 'Marina Silva',
    email: 'marina.dev@gmail.com',
    plan: 'Pro Monthly',
    amount: 'R$ 149,90',
    date: '10 Nov 2026, 11:05',
    status: 'completed',
    type: 'income',
    gateway: 'Pix',
  },
  {
    id: 'tx_103',
    client: 'CloudHosting AWS',
    email: 'billing@aws-partner.com',
    plan: 'Infraestrutura Cloud',
    amount: '-R$ 1.250,00',
    date: '09 Nov 2026',
    status: 'completed',
    type: 'expense',
    gateway: 'Boleto Bancário',
  },
  {
    id: 'tx_104',
    client: 'Lucas Andrade',
    email: 'lucas@startupbr.io',
    plan: 'Pro Annual',
    amount: 'R$ 1.499,00',
    date: '08 Nov 2026',
    status: 'pending',
    type: 'income',
    gateway: 'Stripe (Cartão)',
  },
  {
    id: 'tx_105',
    client: 'Design Studio Ltda',
    email: 'contato@designstudio.br',
    plan: 'Starter Monthly',
    amount: 'R$ 79,90',
    date: '05 Nov 2026',
    status: 'failed',
    type: 'income',
    gateway: 'Stripe (Cartão)',
  },
];

export function Transactions() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTransactions = FULL_TRANSACTIONS.filter((tx) => {
    const matchesSearch =
      tx.client.toLowerCase().includes(search.toLowerCase()) ||
      tx.email.toLowerCase().includes(search.toLowerCase()) ||
      tx.plan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Histórico de Transações</h1>
          <p className="text-xs text-slate-400">Gerencie entradas, faturamentos, pagamentos e repasses da plataforma.</p>
        </div>
        <Button variant="outline" size="md" className="gap-2 shrink-0">
          <Download className="h-4 w-4" /> Exportar Relatório (CSV)
        </Button>
      </div>

      {/* Tabela e Filtros */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por cliente, e-mail ou plano..."
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
              <option value="completed">Concluído</option>
              <option value="pending">Pendente</option>
              <option value="failed">Falhou</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-medium">Cliente / Transação</th>
                <th className="pb-3 font-medium">Plano</th>
                <th className="pb-3 font-medium">Gateway</th>
                <th className="pb-3 font-medium">Data</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Valor</th>
                <th className="pb-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 pr-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
                          tx.type === 'income'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}
                      >
                        {tx.type === 'income' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-200">{tx.client}</span>
                        <span className="text-[11px] text-slate-500">{tx.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-slate-300">{tx.plan}</td>
                  <td className="py-3.5 pr-3 text-slate-400">{tx.gateway}</td>
                  <td className="py-3.5 pr-3 text-slate-400">{tx.date}</td>
                  <td className="py-3.5 pr-3">
                    {tx.status === 'completed' && <Badge variant="success">Concluído</Badge>}
                    {tx.status === 'pending' && <Badge variant="warning">Pendente</Badge>}
                    {tx.status === 'failed' && <Badge variant="danger">Falhou</Badge>}
                  </td>
                  <td
                    className={`py-3.5 pr-3 text-right font-semibold ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    {tx.amount}
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
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