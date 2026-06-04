import { Navigate, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { NAV_SECTIONS } from './data'
import type { SectionId } from './types'
import Dashboard from './pages/Dashboard'
import Ucebnice from './pages/Ucebnice'
import Textbook from './pages/Textbook'
import Wiki from './pages/Wiki'
import Mapy from './pages/Mapy'
import Trener from './pages/Trener'
import Komise from './pages/Komise'
import Shrnuti from './pages/Shrnuti'
import Zdroje from './pages/Zdroje'
import Tipy from './pages/Tipy'
import ProgressPage from './pages/Progress'
import './app.css'

const SECTION_PATH: Record<SectionId, string> = {
  dashboard: '/',
  ucebnice: '/ucebnice',
  predmety: '/predmety',
  wiki: '/wiki',
  mapy: '/mapy',
  shrnuti: '/shrnuti',
  trener: '/trener',
  komise: '/komise',
  zdroje: '/zdroje',
  tipy: '/tipy',
  progress: '/progress',
}

function DashboardRoute() {
  const navigate = useNavigate()
  return (
    <Dashboard
      onNavigate={(section, subjectId) => {
        if (section === 'predmety' && subjectId) {
          navigate(`/predmety/${subjectId}`)
        } else {
          navigate(SECTION_PATH[section])
        }
      }}
    />
  )
}

function ZdrojeRoute() {
  const navigate = useNavigate()
  return <Zdroje onNavigate={(section) => navigate(SECTION_PATH[section])} />
}

function TextbookRoute() {
  const navigate = useNavigate()
  const { subjectId } = useParams<{ subjectId?: string }>()
  return (
    <Textbook
      subjectId={subjectId}
      onSelect={(id) => navigate(`/predmety/${id}`)}
      onBack={() => navigate('/predmety')}
    />
  )
}

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-eyebrow">VŠE · FIS</div>
          <div className="sidebar-logo-title">Státnice</div>
        </div>
        <nav className="sidebar-nav">
          {NAV_SECTIONS.map((s) => (
            <NavLink
              key={s.id}
              to={SECTION_PATH[s.id]}
              end={s.id === 'dashboard'}
              className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
            >
              <span className="sidebar-item-icon">{s.icon}</span>
              {s.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main">
        <Routes>
          <Route path="/" element={<DashboardRoute />} />
          <Route path="/ucebnice" element={<Ucebnice />} />
          <Route path="/predmety" element={<TextbookRoute />} />
          <Route path="/predmety/:subjectId" element={<TextbookRoute />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/mapy" element={<Mapy />} />
          <Route path="/shrnuti" element={<Shrnuti />} />
          <Route path="/trener" element={<Trener />} />
          <Route path="/komise" element={<Komise />} />
          <Route path="/zdroje" element={<ZdrojeRoute />} />
          <Route path="/tipy" element={<Tipy />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
