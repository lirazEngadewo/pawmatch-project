import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mapAuthError(error, mode, t) {
  const msg = error?.message ?? '';
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
    return t('register.authErrorNetwork');
  }
  if (mode === 'signin') {
    if (msg.includes('Invalid login credentials') || msg.includes('invalid_credentials')) {
      return t('register.authErrorInvalidCredentials');
    }
    if (msg.includes('Email not confirmed')) {
      return t('register.authErrorEmailNotConfirmed');
    }
  }
  if (mode === 'signup') {
    if (msg.includes('User already registered') || msg.includes('already been registered')) {
      return t('register.authErrorUserExists');
    }
    if (msg.includes('Password should be at least') || msg.includes('weak_password')) {
      return t('register.authErrorWeakPassword');
    }
  }
  return msg || t('register.authErrorGeneral');
}

function RegisterPage({ onNavigate, onSignUpSuccess, sessionExpiredMessage }) {
  const { t } = useTranslation();
  const [authMode, setAuthMode] = useState('signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (authMode === 'signup') {
      if (!firstName.trim()) return t('register.errorFirstName');
      if (!lastName.trim()) return t('register.errorLastName');
    }
    if (!email.trim()) return t('register.errorEmail');
    if (!EMAIL_RE.test(email)) return t('register.errorEmailInvalid');
    if (!password) return t('register.errorPassword');
    if (authMode === 'signup' && password.length < 6) return t('register.errorPasswordShort');
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
      setError(mapAuthError(authError, 'signin', t));
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
      setError(mapAuthError(authError, 'signup', t));
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
            <h1>{authMode === 'signin' ? t('register.signInTitle') : t('register.signUpTitle')}</h1>
            <p className="body-copy">
              {authMode === 'signin' ? t('register.signInSubtitle') : t('register.signUpSubtitle')}
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
                      placeholder={t('register.placeholderFirstName')}
                      className="form-input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder={t('register.placeholderLastName')}
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
                  placeholder={t('register.placeholderEmail')}
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('register.placeholderPassword')}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="button button-primary register-submit" disabled={loading}>
                {loading
                  ? (authMode === 'signin' ? t('register.signingIn') : t('register.creatingAccount'))
                  : (authMode === 'signin' ? t('register.signIn') : t('register.createAccount'))}
              </button>
            </form>

            <div className="register-helpers">
              {authMode === 'signin' ? (
                <>
                  <p>{t('register.noAccount')}{' '}
                    <a href="#!" onClick={(e) => switchMode(e, 'signup')}>{t('register.createNow')}</a>
                  </p>
                  <p><a href="#!" onClick={(e) => e.preventDefault()}>{t('register.forgotPassword')}</a></p>
                </>
              ) : (
                <p>{t('register.haveAccount')}{' '}
                  <a href="#!" onClick={(e) => switchMode(e, 'signin')}>{t('register.signInLink')}</a>
                </p>
              )}
            </div>

            <p className="register-legal">{t('register.legal')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
