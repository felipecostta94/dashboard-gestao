import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { AppLayout } from './components/layout/AppLayout';
import { MetricsGrid } from './components/dashboard/MetricsGrid';
import { RevenueChart } from './components/dashboard/RevenueChart';
import { RecentTransactions } from './components/dashboard/RecentTransactions';
import { Settings } from './pages/Settings';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { Transactions } from './pages/Transactions';
import { Notifications } from './pages/Notifications';
import { Card } from './components/ui/Card';

function DashboardShell() {
  return (
    <AppLayout>
      {(activeTab) => (
        <div className="space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white capitalize">{activeTab}</h1>
                  <p className="text-xs text-slate-400">Acompanhamento em tempo real das métricas da sua plataforma</p>
                </div>
                <span className="text-xs text-slate-400">Visão Geral &gt; {activeTab}</span>
              </div>
              <MetricsGrid />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RevenueChart />
                </div>
                <div>
                  <Card className="h-full flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">Distribuição de Planos</h3>
                      <p className="text-xs text-slate-400">Participação por categoria de assinatura</p>
                    </div>
                    <div className="space-y-3 my-auto">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Enterprise</span>
                          <span className="text-slate-400 font-medium">45%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full w-[45%]" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Pro Monthly</span>
                          <span className="text-slate-400 font-medium">35%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full w-[35%]" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Starter</span>
                          <span className="text-slate-400 font-medium">20%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-600 rounded-full w-[20%]" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 text-center">
                      <span className="text-[11px] text-slate-500">Atualizado há 5 minutos</span>
                    </div>
                  </Card>
                </div>
              </div>
              <RecentTransactions />
            </div>
          )}

          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'transactions' && <Transactions />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'customers' && <Customers />}
          {activeTab === 'settings' && <Settings />}

          {activeTab !== 'dashboard' &&
            activeTab !== 'notifications' &&
            activeTab !== 'transactions' &&
            activeTab !== 'analytics' &&
            activeTab !== 'customers' &&
            activeTab !== 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-bold text-white capitalize">{activeTab}</h1>
                  <span className="text-xs text-slate-400">Visão Geral &gt; {activeTab}</span>
                </div>
                <Card className="p-8 text-center space-y-2">
                  <h2 className="text-lg font-semibold text-slate-200">
                    Conteúdo da aba: <span className="text-indigo-400 uppercase">{activeTab}</span>
                  </h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Módulo em desenvolvimento para gerenciar os dados desta seção.
                  </p>
                </Card>
              </div>
            )}
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