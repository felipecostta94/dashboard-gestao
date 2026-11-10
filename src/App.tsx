import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { TrendingUp, ArrowRight, ShieldAlert } from 'lucide-react';

export function App() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-md w-full space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="success" className="gap-1">
            <TrendingUp className="h-3 w-3" /> +14.2% este mês
          </Badge>
          <Badge variant="neutral">MRR</Badge>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Receita Recorrente
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
            R$ 48.250,00
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="primary" size="md">
            Ver Relatórios <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="md">
            Filtrar
          </Button>
          <Button variant="danger" size="md">
            <ShieldAlert className="h-4 w-4" /> Alerta
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;