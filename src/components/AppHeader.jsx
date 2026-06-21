import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function AppHeader({ currentPage, onNavigate, isLoggedIn, currentUser, avatarUrl, profileName, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();

  const navItems = [
    { id: 'home',       label: t('nav.home'),       page: 'home' },
    { id: 'howItWorks', label: t('nav.howItWorks'), page: 'landing' },
    { id: 'aboutUs',    label: t('nav.aboutUs'),    page: 'about' },
    { id: 'contact',    label: t('nav.contact'),    page: 'about' },
  ];

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleNavClick = (event, item) => {
    event.preventDefault();
    closeAll();

    if (item.id === 'howItWorks') {
      if (currentPage === 'landing') {
        document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('landing');
        setTimeout(() => {
          document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.id === 'contact') {
      if (currentPage === 'about') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('about');
        setTimeout(() => {
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      onNavigate(item.page);
    }
  };

  const handleLangToggle = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getInitials = () => {
    if (!currentUser) return '?';
    if (profileName) {
      const parts = profileName.trim().split(/\s+/);
      return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || profileName[0].toUpperCase();
    }
    const first = currentUser.user_metadata?.first_name?.[0] || '';
    const last = currentUser.user_metadata?.last_name?.[0] || '';
    if (first || last) return (first + last).toUpperCase();
    return (currentUser.email?.[0] ?? '?').toUpperCase();
  };

  const displayName = profileName
    || [currentUser?.user_metadata?.first_name, currentUser?.user_metadata?.last_name].filter(Boolean).join(' ')
    || currentUser?.email
    || '';

  const handleLogout = () => {
    closeAll();
    onLogout();
  };

  const isHebrew = i18n.language === 'he';

  return (
    <header className="app-header-bar">
      <div className="app-header">
        <div className="brand-block" onClick={() => { closeAll(); onNavigate('landing'); }} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">🐾</div>
          <div className="brand-copy">
            <p className="eyebrow">PawMatch</p>
          </div>
        </div>

        <nav className={`page-nav${menuOpen ? ' page-nav--open' : ''}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#!"
                className="nav-link"
                onClick={(event) => handleNavClick(event, item)}
              >
                {item.label}
              </a>
            ))}
            {isLoggedIn && (
              <a
                href="#!"
                className={`nav-link${currentPage === 'requests' ? ' nav-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); closeAll(); onNavigate('requests'); }}
              >
                {t('nav.requests')}
              </a>
            )}
            {isLoggedIn && (
              <a
                href="#!"
                className={`nav-link nav-link--donate${currentPage === 'donation' ? ' nav-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); closeAll(); onNavigate('donation'); }}
              >
                {t('nav.donate')}
              </a>
            )}
          </div>

          <div className="lang-toggle">
            <button
              className={`lang-btn${!isHebrew ? ' lang-btn--active' : ''}`}
              onClick={() => handleLangToggle('en')}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              className={`lang-btn${isHebrew ? ' lang-btn--active' : ''}`}
              onClick={() => handleLangToggle('he')}
              aria-label="Switch to Hebrew"
            >
              HE
            </button>
          </div>

          {isLoggedIn ? (
            <div className="user-avatar-wrap" ref={dropdownRef}>
              <button
                className="user-avatar"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-label="User menu"
              >
                {avatarUrl
                  ? <img src={avatarUrl} alt="avatar" className="user-avatar-img" />
                  : getInitials()
                }
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <p className="dropdown-name">{displayName}</p>
                  <button
                    className="dropdown-item"
                    onClick={() => { closeAll(); onNavigate('userProfile'); }}
                  >
                    {t('nav.myProfile')}
                  </button>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="button button-outline header-register-btn"
              onClick={() => { closeAll(); onNavigate('register'); }}
            >
              {t('nav.register')}
            </button>
          )}
        </nav>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
