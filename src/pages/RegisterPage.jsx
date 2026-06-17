import { useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mapAuthError(error, mode) {
  const msg = error?.message ?? '';
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
    return 'Connection error. Please try again.';
  }
  if (mode === 'signin') {
    if (msg.includes('Invalid login credentials') || msg.includes('invalid_credentials')) {
      return 'Incorrect email or password.';
    }
    if (msg.includes('Email not confirmed')) {
      return 'Please verify your email before signing in.';
    }
  }
  if (mode === 'signup') {
    if (msg.includes('User already registered') || msg.includes('already been registered')) {
      return 'An account with this email already exists.';
    }
    if (msg.includes('Password should be at least') || msg.includes('weak_password')) {
      return 'Password must be at least 6 characters.';
    }
  }
  return msg || 'Something went wrong. Please try again.';
}

function RegisterPage({ onNavigate, onSignUpSuccess, sessionExpiredMessage }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (authMode === 'signup') {
      if (!firstName.trim()) return 'Please enter your first name.';
      if (!lastName.trim()) return 'Please enter your last name.';
    }
    if (!email.trim()) return 'Please enter your email.';
    if (!EMAIL_RE.test(email)) return 'Please enter a valid email address.';
    if (!password) return 'Please enter a password.';
    if (authMode === 'signup' && password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });
    setLoading(false);

    if (authError) {
      setError(mapAuthError(authError, 'signin'));
      return;
    }

    onNavigate('home');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setError('');
    setLoading(true);
    const { data: signUpData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    });

    if (authError) {
      setLoading(false);
      setError(mapAuthError(authError, 'signup'));
      return;
    }

    if (signUpData?.user) {
      await supabase.from('profiles').insert({
        user_id: signUpData.user.id,
        full_name: `${firstName.trim()} ${lastName.trim()}`,
      });
    }

    setLoading(false);
    onSignUpSuccess?.();
    onNavigate('home');
  };

  const switchMode = (e, next) => {
    e.preventDefault();
    setAuthMode(next);
    setError('');
  };

  return (
    <main className="page page-register">
      <div className="register-container">
        <div className="register-card card">
          <div className="register-header">
            <div className="brand-block">
              <div className="brand-logo">🐾</div>
              <div className="brand-copy">
                <p className="eyebrow">PawMatch</p>
              </div>
            </div>
          </div>

          <div className="register-content">
            <h1>{authMode === 'signin' ? 'Welcome back' : 'Create your PawMatch account'}</h1>
            <p className="body-copy">
              {authMode === 'signin'
                ? 'Sign in to continue your PawMatch journey.'
                : 'Join PawMatch to save pets, like profiles, and send adoption requests.'}
            </p>

            {sessionExpiredMessage && (
              <p className="form-session-banner">{sessionExpiredMessage}</p>
            )}

            <form
              className="register-form"
              onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp}
            >
              {authMode === 'signup' && (
                <div className="form-row-two">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="button button-primary register-submit" disabled={loading}>
                {loading
                  ? (authMode === 'signin' ? 'Signing in…' : 'Creating account…')
                  : (authMode === 'signin' ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="register-helpers">
              {authMode === 'signin' ? (
                <>
                  <p>Don't have an account?{' '}
                    <a href="#!" onClick={(e) => switchMode(e, 'signup')}>Create one now!</a>
                  </p>
                  <p><a href="#!" onClick={(e) => e.preventDefault()}>Forgot password?</a></p>
                </>
              ) : (
                <p>Already have an account?{' '}
                  <a href="#!" onClick={(e) => switchMode(e, 'signin')}>Sign in</a>
                </p>
              )}
            </div>

            <p className="register-legal">
              By continuing, you agree to PawMatch's adoption process and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
