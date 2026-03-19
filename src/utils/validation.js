export const validators = {
  name: (v) => {
    if (!v.trim()) return 'Full name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 6) return 'Password must be at least 6 characters.';
    return '';
  },
  confirm: (v, password) => {
    if (!v) return 'Please confirm your password.';
    if (v !== password) return 'Passwords do not match.';
    return '';
  },
};

export const validateLoginForm = ({ email, password }) => ({
  email: validators.email(email),
  password: validators.password(password),
});

export const validateRegisterForm = ({ name, email, password, confirm }) => ({
  name: validators.name(name),
  email: validators.email(email),
  password: validators.password(password),
  confirm: validators.confirm(confirm, password),
});
