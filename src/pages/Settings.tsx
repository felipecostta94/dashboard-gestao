import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Globe, Bell, Moon, Shield } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white">Configurações da Conta</h1>
        <p className="text-xs text-slate-400">Gerencie suas informações pessoais, segurança e preferências do sistema.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Menu Lateral das Sub-abas */}
        <div className="w-full md:w-64 space-y-1">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'profile'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Perfil Público</span>
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'security'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Lock className="h-4 w-4" />
            <span>Segurança & Senha</span>
          </button>
          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'preferences'
                ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Preferências & Sistema</span>
          </button>
        </div>

        {/* Conteúdo das Sub-abas */}
        <div className="flex-1">
          {activeSubTab === 'profile' && (
            <Card className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Informações do Perfil</h3>
                <p className="text-xs text-slate-400">Atualize sua foto e dados exibidos na plataforma.</p>
              </div>

              <div className="flex items-center gap-4 py-2 border-y border-slate-800/80">
                <img
                  src={user?.avatarUrl || 'https://github.com/shadcn.png'}
                  alt={user?.name}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                />
                <div className="space-y-1">
                  <Button variant="outline" size="sm">Alterar Avatar</Button>
                  <p className="text-[11px] text-slate-500">JPG, GIF ou PNG. Máximo de 2MB.</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Nome Completo</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>E-mail Corporativo</Label>
                    <Input
                      type="email"
                      value={email}
                      disabled
                      className="opacity-60 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                  {saved && <span className="text-xs text-emerald-400 font-medium">Alterações salvas com sucesso!</span>}
                  {!saved && <span />}
                  <Button type="submit" variant="primary" size="md">
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeSubTab === 'security' && (
            <Card className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Segurança da Conta</h3>
                <p className="text-xs text-slate-400">Gerencie sua senha de acesso e autenticação.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Senha Atual</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label>Nova Senha</Label>
                  <Input type="password" placeholder="Mínimo de 8 caracteres" />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirmar Nova Senha</Label>
                  <Input type="password" placeholder="Repita a nova senha" />
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-slate-800/80">
                <Button variant="primary" size="md" onClick={() => alert('Senha atualizada com sucesso!')}>
                  Atualizar Senha
                </Button>
              </div>
            </Card>
          )}

          {activeSubTab === 'preferences' && (
            <Card className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Preferências do Sistema</h3>
                <p className="text-xs text-slate-400">Personalize a sua experiência de uso na plataforma.</p>
              </div>

              <div className="space-y-4 divide-y divide-slate-800/60">
                <div className="flex items-center justify-between pt-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <Bell className="h-3.5 w-3.5 text-indigo-400" /> Notificações por E-mail
                    </span>
                    <p className="text-[11px] text-slate-500">Receba resumos semanais de faturamento e alertas.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-indigo-600 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <Moon className="h-3.5 w-3.5 text-indigo-400" /> Modo Escuro Padrão
                    </span>
                    <p className="text-[11px] text-slate-500">Manter o tema escuro ativado ao iniciar a sessão.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-indigo-600 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5">
                    <span className="text-xs font-medium text-slate-200 flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-indigo-400" /> Log de Auditoria Ativo
                    </span>
                    <p className="text-[11px] text-slate-500">Registrar histórico de acessos por IP e navegador.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-indigo-600 cursor-pointer" />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}