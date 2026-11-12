import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, Trash2, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: string;
  amount: number | string;
  status: 'paid' | 'pending' | 'overdue' | string;
  date: string;
  dueDate: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'active' | 'inactive' | 'trial';
  spent: string;
  joinedDate: string;
  avatar: string;
}

export function Customers() {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Sincroniza e deriva os clientes convertendo corretamente os valores e status do localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('saas_transactions');
    if (savedTransactions) {
      try {
        const parsed: Transaction[] = JSON.parse(savedTransactions);
        
        const clientMap: Record<string, { name: string; email: string; plan: string; totalSpent: number; status: 'active' | 'inactive' | 'trial'; date: string }> = {};

        parsed.forEach((tx) => {
          const email = (tx.customerEmail || '').toLowerCase();
          if (!email) return;

          // Converte o amount com segurança (seja string formatada ou número)
          let rawAmount = tx.amount;
          let numericAmount = 0;
          if (typeof rawAmount === 'string') {
            numericAmount = parseFloat(
              rawAmount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
            ) || 0;
          } else {
            numericAmount = Number(rawAmount) || 0;
          }

          const statusStr = String(tx.status || '').toLowerCase();
          const isPaid = statusStr === 'paid' || statusStr === 'pago';

          if (!clientMap[email]) {
            clientMap[email] = {
              name: tx.customerName || 'Cliente sem nome',
              email: tx.customerEmail,
              plan: (tx.plan || 'Pro').split(' ')[0],
              totalSpent: isPaid ? numericAmount : 0,
              status: isPaid ? 'active' : (tx.plan || '').toLowerCase().includes('trial') ? 'trial' : 'inactive',
              date: tx.date || '-',
            };
          } else {
            if (isPaid) {
              clientMap[email].totalSpent += numericAmount;
              clientMap[email].status = 'active';
            }
            clientMap[email].plan = (tx.plan || 'Pro').split(' ')[0];
          }
        });

        const derivedCustomers: Customer[] = Object.values(clientMap).map((c, index) => ({
          id: `usr_dyn_${index + 1}`,
          name: c.name,
          email: c.email,
          plan: c.plan.includes('Enterprise') ? 'Enterprise' : c.plan.includes('Starter') ? 'Starter' : 'Pro',
          status: c.status,
          spent: c.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          joinedDate: c.date,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(c.name)}`,
        }));

        setCustomers(derivedCustomers);
      } catch (err) {
        console.error("Erro ao processar transações para clientes:", err);
        setCustomers([]);
      }
    }
  }, []);

  // Efeito global para fechar o menu ao clicar fora
  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveMenuId(null);
    };

    if (activeMenuId) {
      window.addEventListener('click', handleGlobalClick);
    }

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [activeMenuId]);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const handleDeleteCustomer = (emailToRemove: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente e seu histórico associado?')) {
      const savedTransactions = localStorage.getItem('saas_transactions');
      if (savedTransactions) {
        const parsed: Transaction[] = JSON.parse(savedTransactions);
        const filtered = parsed.filter((tx) => tx.customerEmail.toLowerCase() !== emailToRemove.toLowerCase());
        localStorage.setItem('saas_transactions', JSON.stringify(filtered));
        
        setCustomers((prev) => prev.filter((c) => c.email.toLowerCase() !== emailToRemove.toLowerCase()));
      }
      setActiveMenuId(null);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>;
      case 'trial':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Trial</span>;
      case 'inactive':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">Inativo</span>;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Clientes & Assinantes</h1>
          <p className="text-xs text-slate-400">Base sincronizada automaticamente com o histórico de transações</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/transactions')}
          className="flex items-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" /> Gerenciar na Fatura
        </Button>
      </div>

      <Card className="overflow-hidden border-slate-800 bg-slate-900/40">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="text-xs text-indigo-400 font-medium">
            Total: {filteredCustomers.length} cliente(s)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/30">
                <th className="py-3 px-4 font-semibold">Cliente</th>
                <th className="py-3 px-4 font-semibold">Plano</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Total Gasto</th>
                <th className="py-3 px-4 font-semibold">Data de Cadastro</th>
                <th className="py-3 px-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Nenhum cliente encontrado. Adicione transações na aba correspondente.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img 
                        src={customer.avatar} 
                        alt={customer.name} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-700 bg-slate-800" 
                      />
                      <div>
                        <div className="font-medium text-white">{customer.name}</div>
                        <div className="text-slate-400 text-[11px]">{customer.email}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">{customer.plan}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(customer.status)}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-400">{customer.spent}</td>
                    <td className="py-3.5 px-4 text-slate-400">{customer.joinedDate}</td>
                    <td className="py-3.5 px-4 text-right relative">
                      <button
                        onClick={(e) => toggleMenu(customer.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === customer.id && (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-12 bottom-2 w-36 bg-[#111827] border border-slate-800 rounded-xl shadow-2xl py-1 z-50 text-left"
                        >
                          <button
                            onClick={() => handleDeleteCustomer(customer.email)}
                            className="w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}