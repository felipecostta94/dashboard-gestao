import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { AppLayout } from './components/layout/AppLayout';
import { Card } from './components/ui/Card';

function DashboardShell() {
  return (
    <AppLayout>
      {(activeTab) => (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white capitalize">{activeTab}</h1>
            <span className="text-xs text-slate-400">Visão Geral &gt; {activeTab}</span>
          </div>

          <Card className="p-8 text-center space-y-2">
            <h2 className="text-lg font-semibold text-slate-200">
              Conteúdo da aba: <span className="text-indigo-400 uppercase">{activeTab}</span>
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              A espinha dorsal de navegação está pronta! Agora só falta preenchermos cada aba com os widgets de métricas e gráficos.
            </p>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}

function MainRouter() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070a11] text-slate-400 text-sm">
        A carregar...
      </div>
    );
  }

  return isAuthenticated ? <DashboardShell /> : <Login />;
}

export function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}

export default App;