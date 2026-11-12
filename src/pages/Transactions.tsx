import { useState, useEffect } from 'react';
import { Search, Filter, Download, DollarSign, CheckCircle2, Clock, AlertCircle, Plus, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_101',
    customerName: 'Ana Beatris',
    customerEmail: 'ana.beatris@techsolucoes.com',
    plan: 'Enterprise (Anual)',
    amount: 14500.00,
    status: 'paid',
    date: '15 Jan 2026',
    dueDate: '15 Jan 2026',
  },
  {
    id: 'tx_102',
    customerName: 'Carlos Eduardo',
    customerEmail: 'carlos@inovacaodigital.io',
    plan: 'Pro (Mensal)',
    amount: 899.40,
    status: 'paid',
    date: '02 Fev 2026',
    dueDate: '02 Fev 2026',
  },
  {
    id: 'tx_103',
    customerName: 'Fernanda Lima',
    customerEmail: 'nanda.lima@designstudio.br',
    plan: 'Starter (Trial 15 Dias)',
    amount: 0.00,
    status: 'pending',
    date: '01 Nov 2026',
    dueDate: '16 Nov 2026',
  },
  {
    id: 'tx_104',
    customerName: 'Ricardo Mendes',
    customerEmail: 'ricardo@mendesconsultoria.com',
    plan: 'Pro (Mensal)',
    amount: 899.40,
    status: 'overdue',
    date: '10 Mar 2026',
    dueDate: '10 Abr 2026',
  },
];

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados do formulário de nova cobrança (Iniciando com Pro como padrão)
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newPlan, setNewPlan] = useState('Pro (Mensal)');
  const [newAmount, setNewAmount] = useState('899.40');
  
  // Função auxiliar para calcular data formatada para inputs (yyyy-mm-dd) adicionando dias ou anos
  const getCalculatedDate = (daysToAdd: number = 30, addYears: number = 0) => {
    const d = new Date();
    if (addYears > 0) {
      d.setFullYear(d.getFullYear() + addYears);
    } else {
      d.setDate(d.getDate() + daysToAdd);
    }
    return d.toISOString().split('T')[0];
  };

  const [newDueDate, setNewDueDate] = useState(getCalculatedDate(30)); // Inicializa padrão 30 dias para o Pro

  // Tabela de preços pré-definidos por plano
  const planDefaultPrices: Record<string, string> = {
    'Enterprise (Anual)': '14500.00',
    'Pro (Mensal)': '899.40',
    'Starter (Mensal)': '299.00',
    'Starter (Trial 15 Dias)': '0.00',
    'Cobrança Avulsa': '150.00',
  };

  useEffect(() => {
    const saved = localStorage.getItem('saas_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const sanitized = parsed.map((tx: any) => ({
          ...tx,
          amount: typeof tx.amount === 'string' 
            ? parseFloat(tx.amount.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0 
            : Number(tx.amount) || 0,
        }));
        setTransactions(sanitized);
      } catch (e) {
        setTransactions(INITIAL_TRANSACTIONS);
        localStorage.setItem('saas_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
      }
    } else {
      setTransactions(INITIAL_TRANSACTIONS);
      localStorage.setItem('saas_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    }
  }, []);

  const saveToStorage = (updated: Transaction[]) => {
    setTransactions(updated);
    localStorage.setItem('saas_transactions', JSON.stringify(updated));
  };

  // Monitora mudança de plano para atualizar valor e calcular automaticamente a data de vencimento
  const handlePlanChange = (planValue: string) => {
    setNewPlan(planValue);
    const defaultVal = planDefaultPrices[planValue] || '0.00';
    setNewAmount(defaultVal);

    // Regras automáticas de vencimento por plano
    if (planValue.includes('Enterprise')) {
      setNewDueDate(getCalculatedDate(0, 1)); // 1 ano à frente
    } else if (planValue.includes('Trial')) {
      setNewDueDate(getCalculatedDate(15)); // 15 dias corridos
    } else if (planValue.includes('Avulsa')) {
      setNewDueDate(getCalculatedDate(10)); // 10 dias corridos
    }else {
      setNewDueDate(getCalculatedDate(30)); // 30 dias padrão para mensais/avulsa
    }
  };

  const handleCreateCharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName || !newDueDate) return;

    const isTrial = newPlan.includes('Trial');
    const today = new Date();
    const dueDateObj = new Date(newDueDate + 'T00:00:00'); // Garante leitura correta do input date
    
    const finalAmount = isTrial ? 0.00 : (parseFloat(newAmount) || 0);

    const newTx: Transaction = {
      id: `tx_${Date.now().toString().slice(-4)}`,
      customerName: newCustomerName,
      customerEmail: newCustomerEmail || `${newCustomerName.toLowerCase().replace(/\s+/g, '')}@empresa.com`,
      plan: newPlan,
      amount: finalAmount,
      status: 'pending',
      date: today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      dueDate: dueDateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    saveToStorage([newTx, ...transactions]);
    setIsModalOpen(false);
    setNewCustomerName('');
    setNewCustomerEmail('');
    setNewPlan('Pro (Mensal)');
    setNewAmount('899.40');
    setNewDueDate(getCalculatedDate(30));
  };

  const handleToggleStatus = (id: string) => {
    const updated = transactions.map((tx) => {
      if (tx.id === id) {
        const nextStatus: Transaction['status'] = tx.status === 'paid' ? 'pending' : 'paid';
        return { ...tx, status: nextStatus };
      }
      return tx;
    });
    saveToStorage(updated);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Cliente', 'E-mail', 'Plano', 'Valor', 'Status', 'Vencimento'];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      `"${tx.customerName}"`,
      tx.customerEmail,
      `"${tx.plan}"`,
      tx.amount.toFixed(2),
      tx.status,
      tx.dueDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transacoes_saas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPaid = transactions.filter(t => t.status === 'paid').reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const totalPending = transactions.filter(t => t.status === 'pending').reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
  const totalOverdue = transactions.filter(t => t.status === 'overdue').reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const formatCurrency = (val: number) => {
    return (Number(val) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getStatusBadge = (status: Transaction['status'], id: string) => {
    switch (status) {
      case 'paid':
        return (
          <button 
            onClick={() => handleToggleStatus(id)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors cursor-pointer"
            title="Clique para alterar status"
          >
            <CheckCircle2 className="w-3 h-3" /> Pago
          </button>
        );
      case 'pending':
        return (
          <button 
            onClick={() => handleToggleStatus(id)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/25 hover:bg-amber-500/20 transition-colors cursor-pointer"
            title="Clique para dar baixa (Marcar como Pago)"
          >
            <Clock className="w-3 h-3" /> Pendente
          </button>
        );
      case 'overdue':
        return (
          <button 
            onClick={() => handleToggleStatus(id)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500/20 transition-colors cursor-pointer"
            title="Clique para dar baixa (Marcar como Pago)"
          >
            <AlertCircle className="w-3 h-3" /> Atrasado
          </button>
        );
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Transações & Faturas</h1>
          <p className="text-xs text-slate-400">Acompanhe o histórico financeiro, cobranças e status de pagamento</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nova Cobrança
          </Button>
        </div>
      </div>

      {/* Cards de Resumo Dinâmicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Receita Total Confirmada</p>
            <h3 className="text-lg font-bold text-emerald-400 mt-1">{formatCurrency(totalPaid)}</h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Pendentes de Pagamento</p>
            <h3 className="text-lg font-bold text-amber-400 mt-1">{formatCurrency(totalPending)}</h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-5 h-5" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Faturas Vencidas</p>
            <h3 className="text-lg font-bold text-red-400 mt-1">{formatCurrency(totalOverdue)}</h3>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Tabela de Transações */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por cliente, e-mail ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0b0f19] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Todos os Status</option>
              <option value="paid">Pagos</option>
              <option value="pending">Pendentes</option>
              <option value="overdue">Atrasados</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                <th className="py-3 px-4 font-medium">ID da Fatura</th>
                <th className="py-3 px-4 font-medium">Cliente</th>
                <th className="py-3 px-4 font-medium">Plano / Descrição</th>
                <th className="py-3 px-4 font-medium">Valor</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Vencimento</th>
                <th className="py-3 px-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-indigo-400 font-medium">{tx.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white">{tx.customerName}</div>
                      <div className="text-slate-400 text-[11px]">{tx.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{tx.plan}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{formatCurrency(tx.amount)}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(tx.status, tx.id)}</td>
                    <td className="py-3.5 px-4 text-slate-400">{tx.dueDate}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => alert(`Gerando recibo em PDF da fatura ${tx.id}...`)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors inline-flex items-center gap-1 text-[11px]"
                        title="Baixar Recibo PDF"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Nova Cobrança */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-indigo-400" /> Nova Cobrança / Fatura
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCharge} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nome do Cliente *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">E-mail do Cliente</label>
                <input
                  type="email"
                  placeholder="contato@empresa.com"
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Plano / Descrição *</label>
                <select
                  value={newPlan}
                  onChange={(e) => handlePlanChange(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Enterprise (Anual)">Enterprise (Anual)</option>
                  <option value="Pro (Mensal)">Pro (Mensal)</option>
                  <option value="Starter (Mensal)">Starter (Mensal)</option>
                  <option value="Starter (Trial 15 Dias)">Starter (Trial 15 Dias)</option>
                  <option value="Cobrança Avulsa">Cobrança Avulsa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Valor (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  disabled={newPlan.includes('Trial')}
                  placeholder="899.40"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className={`w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 ${
                    newPlan.includes('Trial') ? 'opacity-50 cursor-not-allowed bg-slate-900/50' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Data de Vencimento *</label>
                <input
                  type="date"
                  required
                  disabled={newPlan.includes('Trial')}
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className={`w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 ${
                    newPlan.includes('Trial') ? 'opacity-50 cursor-not-allowed bg-slate-900/50' : ''
                  }`}
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs border-slate-700 text-slate-300"
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" className="text-xs">
                  Gerar Cobrança
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}