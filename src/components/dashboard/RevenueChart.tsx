import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card } from '../ui/Card';

const data = [
  { month: 'Jan', receita: 28000, despesas: 14000 },
  { month: 'Fev', receita: 32000, despesas: 15500 },
  { month: 'Mar', receita: 31000, despesas: 14800 },
  { month: 'Abr', receita: 39000, despesas: 17000 },
  { month: 'Mai', receita: 42000, despesas: 18200 },
  { month: 'Jun', receita: 48250, despesas: 19100 },
];

export function RevenueChart() {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Crescimento de Receita</h3>
          <p className="text-xs text-slate-400">Comparativo entre Receita e Custos Operacionais</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-slate-400">Receita</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span className="text-slate-400">Despesas</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#334155" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#334155" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val / 1000}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="receita" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" />
            <Area type="monotone" dataKey="despesas" stroke="#475569" strokeWidth={2} fillOpacity={1} fill="url(#colorDespesas)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}