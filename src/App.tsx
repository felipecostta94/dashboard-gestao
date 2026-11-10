import './App.css'

export function App() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm text-center space-y-6">
        
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full">
          Ambiente React Ativo
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white">
          Tailwind Configurado com Sucesso!
        </h1>

        <p className="text-sm text-slate-400">
          O projeto React com Tailwind v3 está rodando perfeitamente. Pronto para começarmos a criar os componentes.
        </p>

        <div className="pt-4 flex gap-3 justify-center">
          <button 
            onClick={() => alert('Botão funcional no React!')} 
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            Testar Clique
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
