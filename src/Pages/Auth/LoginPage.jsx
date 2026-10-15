import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LOGO = '/sewignLogo.png';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rememberedCredentials');
    if (saved) {
      try {
        const { userName: u, password: p } = JSON.parse(saved);
        setUserName(u);
        setPassword(p);
        setRememberMe(true);
      } catch { /* ignore */ }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!userName.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    setLoading(true);
    const result = await login(userName.trim(), password);
    setLoading(false);
    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('rememberedCredentials', JSON.stringify({ userName: userName.trim(), password }));
      } else {
        localStorage.removeItem('rememberedCredentials');
      }
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-48 -left-48 w-[28rem] h-[28rem] rounded-full bg-purple-700/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 w-[28rem] h-[28rem] rounded-full bg-fuchsia-700/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-purple-500/10 blur-[110px]" />

      <div className="relative w-full max-w-4xl">
        <div className="rounded-2xl border border-purple-500/25 bg-black shadow-[0_0_90px_-20px_rgba(147,51,234,0.45)] overflow-hidden lg:flex">
          <div className="hidden lg:flex flex-col items-center justify-center gap-6 lg:w-[46%] p-10 bg-black border-r border-purple-500/15">
            <img
              src={LOGO}
              alt="Sewing Dashboard logo"
              className="w-full max-w-sm drop-shadow-[0_0_40px_rgba(168,85,247,0.35)] select-none"
              draggable="false"
            />
            </div>

          <div className="w-full lg:w-[54%] p-8 sm:p-10">
            <div className="flex flex-col items-center mb-8 lg:hidden">
              <img src={LOGO} alt="Sewing Dashboard logo" className="w-32 h-32 object-contain" />
              <h1 className="text-2xl font-bold text-white mt-3">Sewing Dashboard</h1>
              <p className="text-white/50 text-sm mt-1">Sign in to continue</p>
            </div>

            <div className="hidden lg:block mb-8">
              <h1 className="text-2xl font-bold text-white">Welcome back</h1>
              <p className="text-white/50 text-sm mt-1">Sign in to continue to your dashboard</p>
            </div>

            {error && (
              <div className="mb-4 px-3 py-2 rounded-md bg-red-500/15 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/40" />
                  <input
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-purple-950/30 border border-purple-400/20 rounded-lg text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                    placeholder="Enter username"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-purple-950/30 border border-purple-400/20 rounded-lg text-white text-sm placeholder-white/25 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-purple-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-purple-400/40 bg-transparent accent-purple-500 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs text-white/50 cursor-pointer select-none">Remember me</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">SWF DHU Dashboard — Sewing Efficiency &amp; Quality Tracking</p>
      </div>
    </div>
  );
}
