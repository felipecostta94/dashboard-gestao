import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, LayoutGrid } from 'lucide-react';

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As palavras-passe não coincidem.');
      return;
    }
    // Lógica futura de cadastro com a API Node.js
    console.log('Cadastrando:', { name, email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-[#1f2937] w-full max-w-md p-8 rounded-2xl shadow-2xl">
        
        {/* Ícone de Cabeçalho */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#1f2937] p-3 rounded-xl border border-[#374151]">
            <LayoutGrid className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        {/* Títulos */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Criar uma conta</h1>
          <p className="text-sm text-gray-400">Insira os seus dados para começar a usar a plataforma</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Nome */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider">
              Nome completo / Empresa *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-[#0b0f19] border border-[#374151] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider">
              E-mail *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[#0b0f19] border border-[#374151] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Palavra-passe */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider">
              Palavra-passe *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0b0f19] border border-[#374151] rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirmar Palavra-passe */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 uppercase tracking-wider">
              Confirmar palavra-passe *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0b0f19] border border-[#374151] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Botão de Submissão */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-2"
          >
            Registar na plataforma
          </button>
        </form>

        {/* Link para voltar ao Login */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline font-medium">
              Acessar à conta
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}