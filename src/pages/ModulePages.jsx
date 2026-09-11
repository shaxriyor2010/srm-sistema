import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, CheckCircle2, CreditCard, DollarSign, GraduationCap, Sparkles, Users, WalletCards } from 'lucide-react'
import { AddStudentModal } from '../components/AddStudentModal'

const baseStudents = [
  { id: 1, name: 'Aziza Karimova', email: 'aziza@example.com', phone: '+998 90 123 45 67', group: 'IELTS Advanced', status: 'Active', balance: 420000, attendance: 92, progress: 78, teacher: 'Nodira Akhmedova', monthlyFee: 600000 },
  { id: 2, name: 'Bobur Tursunov', email: 'bobur@example.com', phone: '+998 93 765 43 21', group: 'Business English', status: 'Pending', balance: 150000, attendance: 80, progress: 69, teacher: 'Dilshod Zokirov', monthlyFee: 500000 },
  { id: 3, name: 'Madinabonu Rustamova', email: 'madina@example.com', phone: '+998 99 111 22 33', group: 'Kids Starter', status: 'Active', balance: 0, attendance: 96, progress: 88, teacher: 'Sardor Mavlonov', monthlyFee: 450000 },
  { id: 4, name: 'Nilufar Juraeva', email: 'nilufar@example.com', phone: '+998 91 576 33 00', group: 'Speaking Lab', status: 'Active', balance: 280000, attendance: 90, progress: 75, teacher: 'Nodira Akhmedova', monthlyFee: 550000 },
  { id: 5, name: 'Jamshid Alimov', email: 'jamshid@example.com', phone: '+998 94 234 56 78', group: 'Business English', status: 'Inactive', balance: 100000, attendance: 68, progress: 59, teacher: 'Dilshod Zokirov', monthlyFee: 500000 },
]

export const studentCatalog = Array.from({ length: 1000 }, (_, index) => {
  const base = baseStudents[index % baseStudents.length]
  return {
    ...base,
    id: index + 1,
    name: `${base.name.split(' ')[0]} ${index + 1}`,
    email: `student${index + 1}@example.com`,
    phone: `+998 90 ${String((index * 7) % 100).padStart(2, '0')} ${String((index * 13) % 100).padStart(2, '0')} ${String((index * 9) % 100).padStart(2, '0')}`,
    balance: (base.balance + index * 12000) % 800000,
    progress: 55 + ((index * 7) % 40),
    attendance: 60 + ((index * 13) % 35),
    monthlyFee: base.monthlyFee,
  }
})

const groups = [
  { id: 1, name: 'IELTS Advanced', teacher: 'Nodira Akhmedova', schedule: 'Mon/Wed/Fri', room: 'A-204', count: 18 },
  { id: 2, name: 'Business English', teacher: 'Dilshod Zokirov', schedule: 'Tue/Thu', room: 'B-101', count: 12 },
  { id: 3, name: 'Kids Starter', teacher: 'Sardor Mavlonov', schedule: 'Mon/Tue/Thu', room: 'C-305', count: 16 },
  { id: 4, name: 'Speaking Lab', teacher: 'Nodira Akhmedova', schedule: 'Wed/Sat', room: 'A-110', count: 9 },
]

const teachers = [
  { id: 1, name: 'Nodira Akhmedova', specialty: 'IELTS', workload: 86, salary: 4800000, groups: ['IELTS Advanced', 'Speaking Lab'] },
  { id: 2, name: 'Dilshod Zokirov', specialty: 'Business English', workload: 74, salary: 3900000, groups: ['Business English'] },
  { id: 3, name: 'Sardor Mavlonov', specialty: 'Kids', workload: 94, salary: 4200000, groups: ['Kids Starter'] },
]

const schedule = [
  { id: 1, day: 'Mon', time: '09:00', group: 'IELTS Advanced', room: 'A-204' },
  { id: 2, day: 'Tue', time: '11:00', group: 'Business English', room: 'B-101' },
  { id: 3, day: 'Wed', time: '15:00', group: 'Speaking Lab', room: 'A-110' },
  { id: 4, day: 'Thu', time: '17:00', group: 'Kids Starter', room: 'C-305' },
]

const payments = [
  { id: 1, student: 'Aziza Karimova', amount: 420000, status: 'Paid', date: '2026-09-05' },
  { id: 2, student: 'Bobur Tursunov', amount: 150000, status: 'Pending', date: '2026-09-08' },
  { id: 3, student: 'Madinabonu Rustamova', amount: 300000, status: 'Paid', date: '2026-09-02' },
  { id: 4, student: 'Nilufar Juraeva', amount: 280000, status: 'Paid', date: '2026-09-04' },
  { id: 5, student: 'Jamshid Alimov', amount: 100000, status: 'Debt', date: '2026-09-01' },
]

const attendance = [
  { name: 'Mon', value: 84 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 91 },
  { name: 'Thu', value: 86 },
  { name: 'Fri', value: 94 },
]

const revenueSeries = [
  { name: 'Jan', value: 14000000 },
  { name: 'Feb', value: 15000000 },
  { name: 'Mar', value: 17000000 },
  { name: 'Apr', value: 16200000 },
  { name: 'May', value: 17500000 },
  { name: 'Jun', value: 18400000 },
]

const leadStatuses = ['New', 'Contacted', 'Trial lesson', 'Enrolled', 'Rejected']

const initialLeads = [
  { id: 1, name: 'Jasur Nematov', phone: '+998 90 900 11 22', status: 'New', source: 'Instagram' },
  { id: 2, name: 'Sevinch Murodova', phone: '+998 97 440 12 34', status: 'Contacted', source: 'Website' },
  { id: 3, name: 'Asadbek Qodirov', phone: '+998 95 777 88 99', status: 'Trial lesson', source: 'Referral' },
  { id: 4, name: 'Maftuna Yuldasheva', phone: '+998 98 551 23 44', status: 'Enrolled', source: 'Flyer' },
  { id: 5, name: 'Sardor Salimov', phone: '+998 90 222 11 44', status: 'New', source: 'Telegram' },
]

const reportData = [
  { name: 'Jan', conversion: 18, revenue: 14 },
  { name: 'Feb', conversion: 22, revenue: 15 },
  { name: 'Mar', conversion: 24, revenue: 17 },
  { name: 'Apr', conversion: 27, revenue: 16 },
  { name: 'May', conversion: 35, revenue: 17 },
  { name: 'Jun', conversion: 39, revenue: 18 },
]

export function DashboardPage() {
  const [students, setStudents] = useState(studentCatalog.slice(0, 8))
  const [showModal, setShowModal] = useState(false)

  const stats = useMemo(() => ({
    totalStudents: studentCatalog.length,
    activeGroups: groups.length,
    monthlyRevenue: studentCatalog.reduce((sum, student) => sum + (student.monthlyFee || 0), 0),
    newLeads: initialLeads.length,
  }), [])

  const handleSave = (newStudent) => {
    setStudents((current) => [newStudent, ...current])
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Umumiy ko'rsatkichlar</p>
          <h1>Dashboard</h1>
        </div>
        <button className="primary-button" onClick={() => setShowModal(true)}>O'quvchi qo'shish</button>
      </section>

      <div className="stats-grid">
        {[{ key: 'totalStudents', label: 'Jami o\'quvchilar', value: stats.totalStudents, icon: Users, accent: 'purple' }, { key: 'activeGroups', label: 'Faol guruhlar', value: stats.activeGroups, icon: GraduationCap, accent: 'blue' }, { key: 'monthlyRevenue', label: 'Oylik daromad', value: `${(stats.monthlyRevenue / 1000000).toFixed(1)}M`, icon: WalletCards, accent: 'green' }, { key: 'newLeads', label: 'Yangi lidlar', value: stats.newLeads, icon: Sparkles, accent: 'orange' }].map(({ key, label, value, icon: Icon, accent }) => (
          <div key={key} className="stat-card glass-card">
            <div className={`stat-icon ${accent}`}><Icon size={18} /></div>
            <div>
              <p>{label}</p>
              <h3>{value}</h3>
            </div>
            <div className="trend positive"><ArrowUpRight size={14} /> 12.4%</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel glass-card">
          <div className="panel-header"><h2>Oylik daromad</h2></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueSeries}>
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
          <div className="panel-header"><h2>So'nggi faoliyat</h2></div>
          <ul className="activity-list">
            {students.slice(0, 4).map((student) => (
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
          <div className="panel-header"><h2>Kelgusi darslar</h2></div>
          <ul className="lesson-list">
            {schedule.map((item) => (
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

        <div className="panel glass-card">
          <div className="panel-header"><h2>Attendance</h2></div>
          <div className="chart-wrap small">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={attendance}>
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

      <AddStudentModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleSave} />
    </div>
  )
}

export function StudentsPage() {
  const [students, setStudents] = useState(studentCatalog)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = useMemo(() => {
    const query = search.toLowerCase()
    return students.filter((student) => [student.name, student.email, student.group, student.teacher].join(' ').toLowerCase().includes(query))
  }, [students, search])

  const totalDebt = students.reduce((sum, student) => sum + (student.balance || 0), 0)
  const monthlyRevenue = students.reduce((sum, student) => sum + (student.monthlyFee || 0), 0)

  function handleSave(student) {
    setStudents((current) => [student, ...current])
  }

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">O'quvchilar</p>
          <h1>O'quvchilar</h1>
        </div>
        <button className="primary-button" onClick={() => setShowModal(true)}>O'quvchi qo'shish</button>
      </section>

      <div className="stats-row glass-card">
        <div><span>Jami o'quvchilar</span><strong>{students.length}</strong></div>
        <div><span>Qarzdorlik</span><strong>{totalDebt.toLocaleString()} so'm</strong></div>
        <div><span>Oylik to'lov</span><strong>{monthlyRevenue.toLocaleString()} so'm</strong></div>
      </div>

      <div className="table-toolbar glass-card">
        <div className="search-box compact-search">
          <Users size={16} />
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Qidirish..." />
        </div>
      </div>

      <div className="table-card glass-card">
        <table>
          <thead>
            <tr>
              <th>Ism</th>
              <th>Email</th>
              <th>Guruh</th>
              <th>Holat</th>
              <th>Qarzdorlik</th>
              <th>Oylik to'lov</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 100).map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.group}</td>
                <td><span className="status-pill">{student.status}</span></td>
                <td>{(student.balance || 0).toLocaleString()} so'm</td>
                <td>{(student.monthlyFee || 0).toLocaleString()} so'm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStudentModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleSave} />
    </div>
  )
}

export function GroupsPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div><p className="eyebrow">Guruhlar</p><h1>Guruhlar</h1></div>
        <button className="primary-button">Guruh qo'shish</button>
      </section>
      <div className="module-grid">
        {groups.map((group) => (
          <div key={group.id} className="module-card glass-card">
            <div className="module-card-header">
              <h3>{group.name}</h3>
              <span className="tag">{group.count} ta</span>
            </div>
            <p><strong>O'qituvchi:</strong> {group.teacher}</p>
            <p><strong>Jadval:</strong> {group.schedule}</p>
            <p><strong>Xona:</strong> {group.room}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TeachersPage() {
  const totalSalary = teachers.reduce((sum, teacher) => sum + teacher.salary, 0)
  return (
    <div className="page-stack">
      <section className="page-header">
        <div><p className="eyebrow">Ustozlar</p><h1>O'qituvchilar</h1></div>
        <button className="primary-button">Ustoz qo'shish</button>
      </section>
      <div className="stats-grid">
        <div className="stat-card glass-card"><div className="stat-icon purple"><BriefcaseBusiness size={18} /></div><div><p>Jami ustozlar</p><h3>{teachers.length}</h3></div></div>
        <div className="stat-card glass-card"><div className="stat-icon blue"><Users size={18} /></div><div><p>Biriktirilgan guruhlar</p><h3>{teachers.reduce((sum, teacher) => sum + teacher.groups.length, 0)}</h3></div></div>
        <div className="stat-card glass-card"><div className="stat-icon green"><DollarSign size={18} /></div><div><p>Oylik maosh</p><h3>{totalSalary.toLocaleString()} so'm</h3></div></div>
      </div>
      <div className="module-grid">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="module-card glass-card">
            <h3>{teacher.name}</h3>
            <p><strong>Mutaxassislik:</strong> {teacher.specialty}</p>
            <p><strong>Yuklama:</strong> {teacher.workload}%</p>
            <p><strong>Guruhlar:</strong> {teacher.groups.join(', ')}</p>
            <p><strong>Maosh:</strong> {teacher.salary.toLocaleString()} so'm</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SchedulePage() {
  return (
    <div className="page-stack">
      <section className="page-header"><div><p className="eyebrow">Jadval</p><h1>Dars jadvali</h1></div></section>
      <div className="table-card glass-card">
        <table>
          <thead>
            <tr><th>Kun</th><th>Vaqt</th><th>Guruh</th><th>Xona</th></tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.id}><td>{item.day}</td><td>{item.time}</td><td>{item.group}</td><td>{item.room}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function PaymentsPage() {
  const total = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const debt = payments.filter((payment) => payment.status === 'Debt').reduce((sum, payment) => sum + payment.amount, 0)
  return (
    <div className="page-stack">
      <section className="page-header"><div><p className="eyebrow">To'lovlar</p><h1>To'lovlar</h1></div><button className="primary-button">To'lov qo'shish</button></section>
      <div className="stats-grid">
        <div className="stat-card glass-card"><div className="stat-icon green"><CreditCard size={18} /></div><div><p>Jami kirim</p><h3>{total.toLocaleString()} so'm</h3></div></div>
        <div className="stat-card glass-card"><div className="stat-icon orange"><WalletCards size={18} /></div><div><p>Qarzdorlar</p><h3>{debt.toLocaleString()} so'm</h3></div></div>
      </div>
      <div className="table-card glass-card">
        <table>
          <thead><tr><th>Talaba</th><th>Summa</th><th>Status</th><th>Sana</th></tr></thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}><td>{payment.student}</td><td>{payment.amount.toLocaleString()} so'm</td><td><span className="status-pill">{payment.status}</span></td><td>{payment.date}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AttendancePage() {
  return (
    <div className="page-stack">
      <section className="page-header"><div><p className="eyebrow">Davomat</p><h1>Davomat</h1></div></section>
      <div className="panel glass-card">
        <div className="chart-wrap small">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads)

  function handleDrop(status, id) {
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead))
  }

  return (
    <div className="page-stack">
      <section className="page-header"><div><p className="eyebrow">Lidlar</p><h1>CRM voronkasi</h1></div></section>
      <div className="kanban-board">
        {leadStatuses.map((status) => (
          <div key={status} className="kanban-column glass-card" onDragOver={(event) => event.preventDefault()} onDrop={() => handleDrop(status, window.draggedLeadId)}>
            <h3>{status}</h3>
            {leads.filter((lead) => lead.status === status).map((lead) => (
              <div key={lead.id} className="lead-card" draggable onDragStart={() => { window.draggedLeadId = lead.id }}>
                <strong>{lead.name}</strong>
                <span>{lead.phone}</span>
                <small>{lead.source}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReportsPage() {
  return (
    <div className="page-stack">
      <section className="page-header"><div><p className="eyebrow">Hisobotlar</p><h1>Hisobotlar</h1></div></section>
      <div className="panel glass-card">
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="conversion" stroke="#22c55e" fill="rgba(34,197,94,0.18)" />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="rgba(139,92,246,0.22)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export function SettingsPage() {
  return (
    <div className="page-stack">
      <section className="page-header"><div><p className="eyebrow">Sozlamalar</p><h1>Sozlamalar</h1></div></section>
      <div className="settings-grid">
        <div className="panel glass-card">
          <h3>Profil</h3>
          <div className="form-stack">
            <label><span>F.I.Sh</span><input defaultValue="Admin User" /></label>
            <label><span>Email</span><input defaultValue="admin@learncrm.uz" /></label>
            <label><span>Rol</span><select defaultValue="Admin"><option>Admin</option><option>Menejer</option><option>O'qituvchi</option></select></label>
          </div>
        </div>
        <div className="panel glass-card">
          <h3>Tizim sozlamalari</h3>
          <div className="form-stack">
            <label><input type="checkbox" defaultChecked /> Til: O'zbek</label>
            <label><input type="checkbox" defaultChecked /> Dark mode</label>
            <label><input type="checkbox" defaultChecked /> Telegram xabarnomalar</label>
          </div>
        </div>
      </div>
    </div>
  )
}
