import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, MapPin, User, ShieldCheck, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetchingDoc, setFetchingDoc] = useState(false);
  const [fetchingCep, setFetchingCep] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    cnpj: '',
    email: '',
    phone: '',
    plan: 'Pro' as 'Enterprise' | 'Pro' | 'Starter',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (isEditing && id) {
      const savedCustomers = JSON.parse(localStorage.getItem('saas_customers') || '[]');
      const foundCustomer = savedCustomers.find((c: any) => c.id === id);
      if (foundCustomer) {
        setFormData(foundCustomer);
      }
    }
  }, [id, isEditing]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleNumericChange = (field: string, value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, [field]: onlyNumbers }));
    if (errorMessage) setErrorMessage(null);
  };

  // Consulta automática de CNPJ (14 dígitos) ou aviso de CPF (11 dígitos)
  const handleDocumentBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const doc = e.target.value.replace(/\D/g, '');
    
    if (doc.length === 14) {
      setFetchingDoc(true);
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${doc}`);
        const data = await response.json();
        if (!data.message) {
          setFormData((prev) => ({
            ...prev,
            companyName: data.razao_social || data.nome_fantasia || prev.companyName,
            cep: data.cep ? data.cep.replace(/\D/g, '') : prev.cep,
            street: data.logradouro || prev.street,
            number: data.numero || prev.number,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.municipio || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
      } finally {
        setFetchingDoc(false);
      }
    } else if (doc.length === 11) {
      // É CPF - como APIs públicas de CPF não existem por LGPD, preenchemos a Razão Social com o nome padrão se estiver vazia
      setFormData((prev) => ({
        ...prev,
        companyName: prev.companyName || (prev.name ? `Pessoa Física - ${prev.name}` : 'Pessoa Física'),
      }));
    }
  };

  // Consulta automática de CEP
  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cepLimpo = e.target.value.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      setFetchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setFetchingCep(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() || 
      !formData.companyName.trim() || 
      !formData.cnpj.trim() || 
      !formData.email.trim() || 
      !formData.phone.trim() || 
      !formData.plan
    ) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios marcados com asterisco (*).');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedCustomers = JSON.parse(localStorage.getItem('saas_customers') || '[]');

      if (isEditing) {
        const updated = savedCustomers.map((c: any) => 
          c.id === id ? { ...c, ...formData } : c
        );
        localStorage.setItem('saas_customers', JSON.stringify(updated));
      } else {
        const newCustomer = {
          id: `usr_${Date.now()}`,
          ...formData,
          status: 'active' as const,
          spent: 'R$ 0,00',
          joinedDate: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
          avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`,
        };
        savedCustomers.push(newCustomer);
        localStorage.setItem('saas_customers', JSON.stringify(savedCustomers));
      }

      setLoading(false);
      navigate('/customers');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/customers"
            className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">
              {isEditing ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
            </h1>
            <p className="text-xs text-slate-400">
              {isEditing ? `Atualizando informações de ${formData.name || 'cliente'}` : 'Preencha os dados cadastrais e fiscais obrigatórios'}
            </p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-between">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-red-300 font-bold ml-2">✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-indigo-400" /> Informações Principais & Plano
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Nome do Responsável / Contato *"
                placeholder="Ex: Carlos Silva"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {!formData.name.trim() && errorMessage && (
                <span className="text-[10px] text-red-400 mt-1 block">Campo obrigatório</span>
              )}
            </div>

            <div>
              <Input
                label="Razão Social / Nome da Empresa *"
                placeholder="Ex: Silva Soluções LTDA"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
              {!formData.companyName.trim() && errorMessage && (
                <span className="text-[10px] text-red-400 mt-1 block">Campo obrigatório</span>
              )}
            </div>

            <div className="relative">
              <Input
                label="CNPJ ou CPF (Preenchimento Automático) *"
                placeholder="Digite apenas números (14 ou 11 dígitos)"
                value={formData.cnpj}
                onChange={(e) => handleNumericChange('cnpj', e.target.value)}
                onBlur={handleDocumentBlur}
              />
              {fetchingDoc && (
                <div className="absolute right-3 top-9 flex items-center text-xs text-indigo-400 gap-1 bg-[#0b0f19] px-2 py-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Buscando...
                </div>
              )}
              {!formData.cnpj.trim() && errorMessage && (
                <span className="text-[10px] text-red-400 mt-1 block">Campo obrigatório</span>
              )}
            </div>

            <div>
              <Input
                label="E-mail Corporativo *"
                type="email"
                placeholder="contato@empresa.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {!formData.email.trim() && errorMessage && (
                <span className="text-[10px] text-red-400 mt-1 block">Campo obrigatório</span>
              )}
            </div>

            <div>
              <Input
                label="Telefone / WhatsApp (Apenas números) *"
                placeholder="41999999999"
                value={formData.phone}
                onChange={(e) => handleNumericChange('phone', e.target.value)}
              />
              {!formData.phone.trim() && errorMessage && (
                <span className="text-[10px] text-red-400 mt-1 block">Campo obrigatório</span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Plano Assinado *
              </label>
              <div className="relative">
                <select
                  value={formData.plan}
                  onChange={(e) => handleChange('plan', e.target.value as any)}
                  className="w-full bg-[#0b0f19] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 appearance-none"
                >
                  <option value="Enterprise">Enterprise</option>
                  <option value="Pro">Pro</option>
                  <option value="Starter">Starter</option>
                </select>
                <ShieldCheck className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </Card>

        {/* Endereço */}
        <Card className="p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-indigo-400" /> Endereço e Localização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            <div className="relative">
              <Input
                label="CEP (Apenas números)"
                placeholder="80020030"
                value={formData.cep}
                onChange={(e) => handleNumericChange('cep', e.target.value)}
                onBlur={handleCepBlur}
              />
              {fetchingCep && (
                <div className="absolute right-3 top-9 flex items-center text-xs text-indigo-400 gap-1 bg-[#0b0f19] px-2 py-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Buscando...
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <Input
                label="Logradouro (Rua, Avenida...)"
                placeholder="Ex: Av. XV de Novembro"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
              />
            </div>
            <Input
              label="Número (Apenas números)"
              placeholder="1000"
              value={formData.number}
              onChange={(e) => handleNumericChange('number', e.target.value)}
            />
            <Input
              label="Bairro"
              placeholder="Ex: Centro"
              value={formData.neighborhood}
              onChange={(e) => handleChange('neighborhood', e.target.value)}
            />
            <Input
              label="Cidade"
              placeholder="Ex: Curitiba"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            <Input
              label="Estado (UF)"
              placeholder="Ex: PR"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </div>
        </Card>

        <div className="flex items-center justify-end space-x-3">
          <Link
            to="/customers"
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-colors"
          >
            Cancelar
          </Link>
          <Button type="submit" variant="primary" isLoading={loading} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> {isEditing ? 'Salvar Alterações' : 'Salvar Cliente'}
          </Button>
        </div>
      </form>
    </div>
  );
}