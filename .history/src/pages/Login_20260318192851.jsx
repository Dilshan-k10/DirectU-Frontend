import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark font-display">

      {/* Background blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[480px]">

        {/* Card */}
        <div className="bg-white dark:bg-brand-card rounded-xl shadow-2xl border border-slate-200 dark:border-brand-border overflow-hidden">
          <div className="p-8 sm:p-12">

            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="bg-primary p-3 rounded-xl mb-4 shadow-lg shadow-primary/20">
                <img src={logo} alt="DirectU logo" className="w-10 h-10 object-contain" />
              </div>
              <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
                Enter your credentials to access your admission portal
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                  <input
                    type="email"
                    placeholder="lahiru@gmail.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full bg-slate-50 dark:bg-brand-dark border border-slate-200 dark:border-primary/30 rounded-lg py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold">
                    Password
                  </label>
                  <a href="#" className="text-accent hover:text-accent-hover text-xs font-semibold transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange('password')}
                    className="w-full bg-slate-50 dark:bg-brand-dark border border-slate-200 dark:border-primary/30 rounded-lg py-3.5 pl-12 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent to-accent-hover hover:opacity-90 text-white font-bold py-4 rounded-lg shadow-lg shadow-accent/20 transition-all active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            

          {/* Card Footer */}
          <div className="bg-slate-50 dark:bg-[#1a181f] py-6 px-8 text-center border-t border-slate-200 dark:border-brand-border">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Don't have an account?
              <Link to="/register" className="text-accent hover:text-accent-hover font-bold ml-1 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Help links */}
        <div className="mt-8 flex justify-center items-center gap-6">
          <a href="#" className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-sm">help</span>
            Help Center
          </a>
          <a href="#" className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-sm">security</span>
            Privacy Policy
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;
