import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowUpRight, BookOpenText, Users, Wallet, Sparkles } from 'lucide-react'

const formatMoney = (value) => `${(value / 1000000).toFixed(1)}M`

export function DashboardPage() {
  const { t } = useTranslation()
  const [data, setData] = useState({ stats: {}, revenueSeries: [], attendance: [], students: [], schedule: [] })

  useEffect(() => {
    fetch('http://localhost:4000/api/dashboard')
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch(() => setData({ stats: {}, revenueSeries: [], attendance: [], students: [], schedule: [] }))
  }, [])

  const statCards = [
    { key: 'totalStudents', value: data.stats.totalStudents ?? '0', icon: Users, accent: 'purple' },
    { key: 'activeGroups', value: data.stats.activeGroups ?? '0', icon: BookOpenText, accent: 'blue' },
    { key: 'monthlyRevenue', value: formatMoney(data.stats.monthlyRevenue ?? 0), icon: Wallet, accent: 'green' },
    { key: 'newLeads', value: data.stats.newLeads ?? '0', icon: Sparkles, accent: 'orange' },
  ]

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">{t('overview')}</p>
          <h1>{t('dashboard')}</h1>
        </div>
        <button className="primary-button">{t('addStudent')}</button>
      </section>

      <div className="stats-grid">
        {statCards.map(({ key, value, icon: Icon, accent }) => (
          <div key={key} className="stat-card glass-card">
            <div className={`stat-icon ${accent}`}>
              <Icon size={18} />
            </div>
            <div>
              <p>{t(key)}</p>
              <h3>{value}</h3>
            </div>
            <div className="trend positive">
              <ArrowUpRight size={14} /> 12.4%
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel glass-card wide-panel">
          <div className="panel-header">
            <h2>{t('monthlyRevenue')}</h2>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data.revenueSeries}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} so'm`} />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#revenueFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel glass-card">
          <div className="panel-header">
            <h2>{t('recentActivity')}</h2>
          </div>
          <ul className="activity-list">
            {(data.students || []).slice(0, 4).map((student) => (
              <li key={student.id}>
                <div className="activity-item-main">
                  <div className="dot" />
                  <div>
                    <strong>{student.name}</strong>
                    <span>{student.group}</span>
                  </div>
                </div>
                <small>{student.status}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel glass-card">
          <div className="panel-header">
            <h2>{t('upcomingLessons')}</h2>
          </div>
          <ul className="lesson-list">
            {(data.schedule || []).map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.group}</strong>
                  <span>{item.day} · {item.time}</span>
                </div>
                <span className="tag">{item.room}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel glass-card wide-panel">
          <div className="panel-header">
            <h2>Attendance</h2>
          </div>
          <div className="chart-wrap small">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.attendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
