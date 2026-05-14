// This is frontend-only demo authentication for prototype purposes.
import { useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage({ onNavigate, onLogin }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleSignIn = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    const users = JSON.parse(localStorage.getItem('pawmatch_users') || '[]');
    const found = users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!found) {
      setError('Email or password is incorrect.');
      return;
    }

    onLogin(found);
    onNavigate('home');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    const users = JSON.parse(localStorage.getItem('pawmatch_users') || '[]');
    if (users.find((u) => u.email === email.toLowerCase())) {
      setError('An account with this email already exists. Sign in instead.');
      return;
    }

    const user = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password,
    };

    users.push(user);
    localStorage.setItem('pawmatch_users', JSON.stringify(users));
    onLogin(user);
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

              <button type="submit" className="button button-primary register-submit">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
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
