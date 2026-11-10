import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bell, ShieldAlert, CreditCard, CheckCircle2, Trash2, Check } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'security' | 'billing' | 'system';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Nova tentativa de login detectada',
    date: 'Hoje, 14:15',
    description: 'Um acesso foi realizado a partir de um novo dispositivo em São Paulo, SP.',
    type: 'security',
    read: false,
  },
  {
    id: 'notif_2',
    title: 'Fatura de R$ 4.500,00 aprovada',
    date: 'Ontem, 11:20',
    description: 'O pagamento da assinatura Enterprise Annual foi processado com sucesso via Stripe.',
    type: 'billing',
    read: false,
  },
  {
    id: 'notif_3',
    title: 'Atualização do Sistema v2.4',
    date: '08 Nov 2026',
    description: 'Novos recursos de exportação de relatórios em CSV já estão disponíveis na sua conta.',
    type: 'system',
    read: true,
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Central de Notificações</h1>
          <p className="text-xs text-slate-400">Acompanhe alertas de segurança, movimentações financeiras e avisos da plataforma.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-1.5">
            <Check className="h-3.5 w-3.5" /> Marcar todas como lidas
          </Button>
        </div>
      </div>

      {/* Lista de Notificações */}
      <Card className="space-y-3">
        {notifications.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Bell className="h-8 w-8 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">Nenhuma notificação no momento</p>
            <p className="text-xs text-slate-500">Você está com a caixa de entrada limpa!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0 transition-colors ${
                  !notif.read ? 'bg-indigo-950/10 -mx-4 px-4 rounded-xl border-l-2 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border mt-0.5 ${
                      notif.type === 'security'
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        : notif.type === 'billing'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    }`}
                  >
                    {notif.type === 'security' && <ShieldAlert className="h-4 w-4" />}
                    {notif.type === 'billing' && <CreditCard className="h-4 w-4" />}
                    {notif.type === 'system' && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200">{notif.title}</span>
                      {!notif.read && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{notif.description}</p>
                    <span className="text-[11px] text-slate-500 block pt-0.5">{notif.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeNotification(notif.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
                  title="Excluir notificação"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}