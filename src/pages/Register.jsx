import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { userRegister } from '../services/authService';
import FieldError from '../components/FieldError';
import { validators, validateRegisterForm } from '../utils/validation';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === 'terms' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => () => {
    const error = field === 'confirm'
      ? validators.confirm(form.confirm, form.password)
      : validators[field]?.(form[field]);
    if (error) setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const inputClass = (field) =>
    `w-full bg-slate-50 dark:bg-brand-dark border rounded-lg py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 outline-none transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-red-400/30'
        : 'border-slate-200 dark:border-primary/30 focus:ring-accent/50 focus:border-accent'
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const fieldErrors = validateRegisterForm(form);
    if (!form.terms) fieldErrors.terms = 'Please accept the terms and conditions.';
    if (Object.values(fieldErrors).some(Boolean)) { setErrors(fieldErrors); return; }
    setLoading(true);
    try {
      await userRegister(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
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
              <img src={logo} alt="DirectU logo" className="w-40 h-30 object-contain" />
              <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
                Join the future of university admissions
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">person</span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    className={inputClass('name') + ' pr-4'}
                  />
                </div>
                <FieldError message={errors.name} />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                  <input
                    type="email"
                    placeholder="name@university.edu"
                    value={form.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    className={inputClass('email') + ' pr-4'}
                  />
                </div>
                <FieldError message={errors.email} />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    className={inputClass('password') + ' pr-12'}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300">
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <FieldError message={errors.password} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock_reset</span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange('confirm')}
                    onBlur={handleBlur('confirm')}
                    className={inputClass('confirm') + ' pr-12'}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300">
                    <span className="material-symbols-outlined text-[20px]">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <FieldError message={errors.confirm} />
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-start gap-3 py-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={form.terms}
                    onChange={handleChange('terms')}
                    className="mt-1 size-4 rounded border-slate-300 dark:border-brand-border text-accent bg-slate-50 dark:bg-brand-dark focus:ring-accent focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-tight">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:text-accent-hover font-semibold">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:text-accent-hover font-semibold">Privacy Policy</a>.
                  </label>
                </div>
                <FieldError message={errors.terms} />
              </div>

              {/* API Error */}
              {apiError && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {apiError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0A1035] to-[#2A528A] hover:from-[#0A1035] hover:to-[#1A2255] text-[#EAEAEA] font-bold py-4 rounded-lg shadow-lg shadow-[#03061A]/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2 mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

          </div>

          {/* Card Footer */}
          <div className="bg-slate-50 dark:bg-[#1a181f] py-6 px-8 text-center border-t border-slate-200 dark:border-brand-border">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Already have an account?
              <Link to="/login" className="text-primary hover:text-accent-hover font-bold ml-1 transition-colors">Sign In</Link>
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

export default Register;
