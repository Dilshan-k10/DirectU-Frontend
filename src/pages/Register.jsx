import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const InputField = ({ label, type, placeholder, icon, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">{label}</label>
    <div className="relative">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-brand-card border border-slate-200 dark:border-brand-border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
      />
    </div>
  </div>
);

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: field === 'terms' ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up registration API
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-dark via-[#1a1435] to-brand-dark">
      <div className="w-full max-w-[480px]">

        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white mb-3 shadow-lg shadow-primary/20">
            <img src={logo} alt="DirectU logo" className="size-8 object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">DirectU</h1>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-brand-card rounded-xl shadow-2xl p-8 border border-slate-200 dark:border-brand-border">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Your Account</h2>
            <p className="text-slate-500 dark:text-slate-400">Join the future of university admissions</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField label="Full Name" type="text" placeholder="John Doe" icon="person"
              value={form.name} onChange={handleChange('name')} />

            <InputField label="Email Address" type="email" placeholder="name@university.edu" icon="mail"
              value={form.email} onChange={handleChange('email')} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Password" type="password" placeholder="••••••••" icon="lock"
                value={form.password} onChange={handleChange('password')} />
              <InputField label="Confirm Password" type="password" placeholder="••••••••" icon="lock_reset"
                value={form.confirm} onChange={handleChange('confirm')} />
            </div>

            <div className="flex items-start gap-3 py-2">
              <input
                id="terms" type="checkbox" checked={form.terms} onChange={handleChange('terms')}
                className="mt-1 size-5 rounded border-slate-300 dark:border-brand-border text-accent bg-slate-50 dark:bg-brand-card focus:ring-accent focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-tight">
                I agree to the{' '}
                <a href="#" className="text-accent hover:underline font-medium">Terms and Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-accent hover:underline font-medium">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group"
            >
              Create Account
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-brand-border text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary dark:text-accent font-bold hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
