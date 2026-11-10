import { DollarSign, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../ui/Card';

export function MetricsGrid() {
  const metrics = [
    {
      title: 'Receita Recorrente (MRR)',
      value: 'R$ 48.250',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      description: 'em relação ao mês anterior',
    },
    {
      title: 'Assinantes Ativos',
      value: '1.429',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      description: '112 novos este mês',
    },
    {
      title: 'Taxa de Churn',
      value: '1.8%',
      change: '-0.4%',
      isPositive: true, // Redução de churn é positivo
      icon: ArrowDownRight,
      description: 'meta mantida abaixo de 2%',
    },
    {
      title: 'Ticket Médio (ARPU)',
      value: 'R$ 185,00',
      change: '-1.2%',
      isPositive: false,
      icon: TrendingUp,
      description: 'variação no plano anual',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{item.title}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-white">{item.value}</span>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                    item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {item.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{item.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}