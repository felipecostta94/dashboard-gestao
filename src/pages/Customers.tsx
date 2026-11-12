import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, Edit, Trash2, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Customer {
  id: string;
  name: string;
  companyName?: string;
  email: string;
  plan: 'Enterprise' | 'Pro' | 'Starter';
  status: 'active' | 'inactive' | 'trial';
  spent: string;
  joinedDate: string;
  avatar: string;
}

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'usr_1',
    name: 'Ana Beatris',
    companyName: 'Tech Soluções',
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
    companyName: 'Inovação Digital',
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
    companyName: 'Design Studio',
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
    companyName: 'Mendes Consultoria',
    email: 'ricardo@mendesconsultoria.com',
    plan: 'Pro',
    status: 'inactive',
    spent: 'R$ 899,40',
    joinedDate: '10 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
];

export function Customers() {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Carrega do localStorage ou inicializa com os dados padrão
  useEffect(() => {
    const saved = localStorage.getItem('saas_customers');
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      setCustomers(INITIAL_CUSTOMERS);
      localStorage.setItem('saas_customers', JSON.stringify(INITIAL_CUSTOMERS));
    }
  }, []);

  // Efeito global para fechar o menu ao clicar em QUALQUER LUGAR da tela
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
    e.stopPropagation(); // Impede que o clique no botão feche e reabra instantaneamente
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  // Função de Exclusão funcional
  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      localStorage.setItem('saas_customers', JSON.stringify(updated));
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
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>;
      case 'trial':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Trial</span>;
      case 'inactive':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">Inativo</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Clientes</h1>
          <p className="text-xs text-slate-400">Gerencie sua base de assinantes e contas ativas</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/customers/new')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Adicionar Cliente
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                <th className="py-3 px-4 font-medium">Cliente</th>
                <th className="py-3 px-4 font-medium">Plano</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Total Gasto</th>
                <th className="py-3 px-4 font-medium">Data de Cadastro</th>
                <th className="py-3 px-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img 
                        src={customer.avatar} 
                        alt={customer.name} 
                        className="w-8 h-8 rounded-full object-cover border border-slate-700" 
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
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === customer.id && (
                        <div 
                          onClick={(e) => e.stopPropagation()} // Impede que cliques dentro do próprio menu fechem ele
                          className="absolute right-12 bottom-2 w-36 bg-[#111827] border border-slate-800 rounded-xl shadow-2xl py-1 z-50 text-left"
                        >
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              navigate(`/customers/edit/${customer.id}`);
                            }}
                            className="w-full px-3 py-2 text-xs text-slate-300 hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center gap-2 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" /> Editar
                          </button>
                          <button
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
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