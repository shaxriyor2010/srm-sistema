import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Bell,
  BriefcaseBusiness,
  CalendarRange,
  ChevronDown,
  CreditCard,
  House,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  Users,
  UserRound,
  BarChart3,
  BookOpenCheck,
  GraduationCap,
  Menu,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import { LoginModal } from './LoginModal'

const navItems = [
  { to: '/', labelKey: 'dashboard', icon: House },
  { to: '/students', labelKey: 'students', icon: Users },
  { to: '/groups', labelKey: 'groups', icon: GraduationCap },
  { to: '/teachers', labelKey: 'teachers', icon: BriefcaseBusiness },
  { to: '/schedule', labelKey: 'schedule', icon: CalendarRange },
  { to: '/payments', labelKey: 'payments', icon: CreditCard },
  { to: '/attendance', labelKey: 'attendance', icon: BookOpenCheck },
  { to: '/leads', labelKey: 'leads', icon: BarChart3 },
  { to: '/reports', labelKey: 'reports', icon: BarChart3 },
  { to: '/settings', labelKey: 'settings', icon: Settings },
]

export function Layout({ children }) {
  const { t } = useTranslation()
  const { theme, toggleTheme, language, setLanguage, supportedLanguages } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  function handleLogin(email, password) {
    const valid = email === 'admin@learncrm.uz' && password === 'admin123'
    if (valid) {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark">L</div>
          <div>
            <div className="brand-name">LearnCRM</div>
            <div className="brand-sub">Center OS</div>
          </div>
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <Menu />
          </button>
        </div>

        <nav className="nav-list">
          {navItems.map(({ to, labelKey, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{t(labelKey)}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-panel">
        <header className="topbar glass-card">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Open menu">
            <Menu />
          </button>

          <div className="search-box">
            <Search size={16} />
            <input type="text" placeholder={t('search')} />
          </div>

          <div className="topbar-actions">
            <div className="language-switcher">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {supportedLanguages.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>

            {isLoggedIn ? (
              <div className="profile-wrap">
                <button className="profile-button" onClick={() => setProfileOpen((prev) => !prev)}>
                  <div className="avatar">A</div>
                  <div className="profile-meta">
                    <strong>Admin</strong>
                    <span>admin@learncrm.uz</span>
                  </div>
                  <ChevronDown size={16} />
                </button>

                {profileOpen && (
                  <motion.div
                    className="profile-dropdown glass-card"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Link to="/settings" onClick={() => setProfileOpen(false)}>
                      <UserRound size={16} /> {t('profile')}
                    </Link>
                    <Link to="/settings" onClick={() => setProfileOpen(false)}>
                      <Settings size={16} /> {t('settingsTitle')}
                    </Link>
                    <button type="button" onClick={() => { setIsLoggedIn(false); setProfileOpen(false) }}>
                      <LogOut size={16} /> {t('logout')}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button className="primary-button small" type="button" onClick={() => setLoginOpen(true)}>
                {t('login')}
              </button>
            )}
          </div>
        </header>

        {!isLoggedIn ? (
          <div className="login-gate glass-card">
            <p className="eyebrow">Demo kirish</p>
            <h2>CRMni ishlatish uchun tizimga kiring</h2>
            <p>Email: admin@learncrm.uz</p>
            <p>Parol: admin123</p>
            <button className="primary-button" onClick={() => setLoginOpen(true)}>Kirish</button>
          </div>
        ) : (
          <main className="content-area">{children}</main>
        )}
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
    </div>
  )
}
