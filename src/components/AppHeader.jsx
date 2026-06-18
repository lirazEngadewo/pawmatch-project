import { useState, useRef, useEffect } from 'react';

function AppHeader({ currentPage, onNavigate, isLoggedIn, currentUser, avatarUrl, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'How It Works', page: 'landing' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'about' },
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

  const handleNavClick = (event, item) => {
    event.preventDefault();
    setDropdownOpen(false);

    if (item.label === 'How It Works') {
      if (currentPage === 'landing') {
        document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('landing');
        setTimeout(() => {
          document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.label === 'Contact') {
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

  const getInitials = () => {
    if (!currentUser) return '?';
    const first = currentUser.user_metadata?.first_name?.[0] || '';
    const last = currentUser.user_metadata?.last_name?.[0] || '';
    return (first + last).toUpperCase();
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    onLogout();
  };

  return (
    <header className="app-header-bar">
      <div className="app-header">
        <div className="brand-block" onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">🐾</div>
          <div className="brand-copy">
            <p className="eyebrow">PawMatch</p>
          </div>
        </div>

        <nav className="page-nav">
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.label}
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
                onClick={(e) => { e.preventDefault(); onNavigate('requests'); }}
              >
                Requests
              </a>
            )}
            {isLoggedIn && (
              <a
                href="#!"
                className={`nav-link nav-link--donate${currentPage === 'donation' ? ' nav-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); onNavigate('donation'); }}
              >
                Donate ❤️
              </a>
            )}
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
                  <p className="dropdown-name">
                    {currentUser.user_metadata?.first_name} {currentUser.user_metadata?.last_name}
                  </p>
                  <button
                    className="dropdown-item"
                    onClick={() => { setDropdownOpen(false); onNavigate('userProfile'); }}
                  >
                    My Profile
                  </button>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="button button-outline" onClick={() => onNavigate('register')}>
              Register
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
