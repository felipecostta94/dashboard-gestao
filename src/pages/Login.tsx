import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Mail, Lock, Eye, EyeOff, LayoutDashboard } from 'lucide-react';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090d16] p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-600/10 text-indigo-500 border border-indigo-500/20 mb-2">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Aceder à conta</h1>
          <p className="text-xs text-slate-400">Insira as suas credenciais para aceder ao dashboard</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Palavra-passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between pt-1">
              <Checkbox id="remember" label="Lembrar sessão" />
              <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                Esqueceu a palavra-passe?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isSubmitting}>
              Entrar na plataforma
            </Button>
          </form>
          {/* Link para ir para a página de Cadastro */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Ainda não tem uma conta?{' '}
              <Link to="/register" className="text-indigo-400 hover:underline font-medium">
                Criar uma conta
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}