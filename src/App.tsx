import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { LayoutDashboard, LogOut } from 'lucide-react';

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#090d16]">
      <Card className="max-w-md w-full space-y-6 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-white">Bem-vindo, {user?.name}!</h1>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>
        <p className="text-xs text-slate-500">
          Sessão autenticada com sucesso. Este é o ponto de partida do nosso Dashboard SaaS.
        </p>
        <Button variant="danger" size="md" onClick={logout} className="w-full gap-2">
          <LogOut className="h-4 w-4" /> Terminar sessão
        </Button>
      </Card>
    </div>
  );
}

function MainRouter() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090d16] text-slate-400 text-sm">
        A carregar...
      </div>
    );
  }

  return isAuthenticated ? <DashboardContent /> : <Login />;
}

export function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}

export default App;