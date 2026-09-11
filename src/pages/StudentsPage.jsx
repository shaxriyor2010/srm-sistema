import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Plus } from 'lucide-react'
import { AddStudentModal } from '../components/AddStudentModal'

const initialStudents = [
  { id: 1, name: 'Aziza Karimova', email: 'aziza@example.com', phone: '+998 90 123 45 67', group: 'IELTS Advanced', status: 'Active', balance: 420000, attendance: 92, progress: 78, teacher: 'Nodira Akhmedova', monthlyFee: 600000 },
  { id: 2, name: 'Bobur Tursunov', email: 'bobur@example.com', phone: '+998 93 765 43 21', group: 'Business English', status: 'Pending', balance: 150000, attendance: 80, progress: 69, teacher: 'Dilshod Zokirov', monthlyFee: 500000 },
  { id: 3, name: 'Madinabonu Rustamova', email: 'madina@example.com', phone: '+998 99 111 22 33', group: 'Kids Starter', status: 'Active', balance: 0, attendance: 96, progress: 88, teacher: 'Sardor Mavlonov', monthlyFee: 450000 },
  { id: 4, name: 'Nilufar Juraeva', email: 'nilufar@example.com', phone: '+998 91 576 33 00', group: 'Speaking Lab', status: 'Active', balance: 280000, attendance: 90, progress: 75, teacher: 'Nodira Akhmedova', monthlyFee: 550000 },
  { id: 5, name: 'Jamshid Alimov', email: 'jamshid@example.com', phone: '+998 94 234 56 78', group: 'Business English', status: 'Inactive', balance: 100000, attendance: 68, progress: 59, teacher: 'Dilshod Zokirov', monthlyFee: 500000 },
]

const seedStudents = Array.from({ length: 1000 }, (_, index) => {
  const base = initialStudents[index % initialStudents.length]
  return {
    ...base,
    id: index + 1,
    name: `${base.name.split(' ')[0]} ${index + 1}`,
    email: `student${index + 1}@example.com`,
    balance: (base.balance + index * 12000) % 800000,
    progress: 55 + ((index * 7) % 40),
    attendance: 60 + ((index * 13) % 35),
    monthlyFee: base.monthlyFee,
  }
})

export function StudentsPage() {
  const { t } = useTranslation()
  const [students, setStudents] = useState(() => seedStudents)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4000/api/students')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStudents(data)
        }
      })
      .catch(() => setStudents(seedStudents))
  }, [])

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase()
    return students.filter((student) => {
      return [student.name, student.email, student.group, student.teacher]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }, [students, search])

  function handleAddStudent(newStudent) {
    setStudents((current) => [newStudent, ...current])
  }

  const totalDebt = students.reduce((sum, student) => sum + (student.balance || 0), 0)
  const monthlyRevenue = students.reduce((sum, student) => sum + (student.monthlyFee || 0), 0)

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">{t('students')}</p>
          <h1>{t('students')}</h1>
        </div>
        <button className="primary-button" onClick={() => setShowModal(true)}>
          <Plus size={16} /> {t('addStudent')}
        </button>
      </section>

      <div className="stats-row glass-card">
        <div>
          <span>Jami o'quvchilar</span>
          <strong>{students.length}</strong>
        </div>
        <div>
          <span>Qarzdorlik</span>
          <strong>{totalDebt.toLocaleString()} so'm</strong>
        </div>
        <div>
          <span>Oylik to'lov</span>
          <strong>{monthlyRevenue.toLocaleString()} so'm</strong>
        </div>
      </div>

      <div className="table-toolbar glass-card">
        <div className="search-box compact-search">
          <Search size={16} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search students..."
          />
        </div>
      </div>

      <div className="table-card glass-card">
        <table>
          <thead>
            <tr>
              <th>{t('fullName')}</th>
              <th>{t('email')}</th>
              <th>{t('groups')}</th>
              <th>{t('status')}</th>
              <th>Qarzdorlik</th>
              <th>Oylik to'lov</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.slice(0, 100).map((student) => (
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

      <AddStudentModal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleAddStudent} />
    </div>
  )
}
