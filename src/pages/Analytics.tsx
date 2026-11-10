import { Card } from '../components/ui/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, ArrowUpRight, Target } from 'lucide-react';

const ACQUISITION_DATA = [
  { month: 'Jan', organic: 400, paid: 240, referral: 180 },
  { month: 'Fev', organic: 450, paid: 290, referral: 220 },
  { month: 'Mar', organic: 520, paid: 320, referral: 250 },
  { month: 'Abr', organic: 610, paid: 380, referral: 290 },
  { month: 'Mai', organic: 730, paid: 410, referral: 340 },
  { month: 'Jun', organic: 850, paid: 490, referral: 410 },
];

const DEVICE_DATA = [
  { name: 'Desktop', value: 62, color: '#6366f1' },
  { name: 'Mobile', value: 28, color: '#3b82f6' },
  { name: 'Tablet', value: 10, color: '#64748b' },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white">Análise de Desempenho & Analytics</h1>
          <p className="text-xs text-slate-400">Métricas consolidadas de aquisição, engajamento e retenção de usuários.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Período:</span>
          <select className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500">
            <option>Últimos 6 meses</option>
            <option>Últimos 30 dias</option>
            <option>Este ano</option>
          </select>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Taxa de Conversão</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">3.42%</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +0.6%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Visitantes vs. Assinantes</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">LTV Médio</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">R$ 2.450</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +4.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Valor do tempo de vida</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">CAC (Custo Aquisição)</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">R$ 142,00</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> -5.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Eficiência de marketing</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Sessões Diárias</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">18.420</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" /> +14%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Média de usuários ativos</p>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Canais de Aquisição */}
        <Card className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Origem de Novas Assinaturas</h3>
            <p className="text-xs text-slate-400">Comparativo mensal por canal de tráfego</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACQUISITION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="organic" name="Orgânico" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="paid" name="Pago (Ads)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="referral" name="Indicação" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Gráfico Rosca: Dispositivos */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Acessos por Dispositivo</h3>
            <p className="text-xs text-slate-400">Distribuição de tráfego da plataforma</p>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DEVICE_DATA} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                  {DEVICE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            {DEVICE_DATA.map((device) => (
              <div key={device.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: device.color }} />
                  <span className="text-slate-300">{device.name}</span>
                </div>
                <span className="font-semibold text-slate-400">{device.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}