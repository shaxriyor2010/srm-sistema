import { useEffect, useState } from 'react'
import { BriefcaseBusiness, DollarSign, Users } from 'lucide-react'

export function TeachersPage() {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/teachers')
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch(() => setTeachers([]))
  }, [])

  const totalSalary = teachers.reduce((sum, teacher) => sum + (teacher.salary || 0), 0)

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Teachers</p>
          <h1>O'qituvchilar</h1>
        </div>
        <button className="primary-button">Add teacher</button>
      </section>

      <div className="stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-icon purple"><BriefcaseBusiness size={18} /></div>
          <div>
            <p>Jami ustozlar</p>
            <h3>{teachers.length}</h3>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon green"><Users size={18} /></div>
          <div>
            <p>Biriktirilgan guruhlar</p>
            <h3>{teachers.reduce((sum, teacher) => sum + (teacher.groups?.length || 0), 0)}</h3>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon orange"><DollarSign size={18} /></div>
          <div>
            <p>Oylik maosh</p>
            <h3>{totalSalary.toLocaleString()} so'm</h3>
          </div>
        </div>
      </div>

      <div className="table-card glass-card">
        <table>
          <thead>
            <tr>
              <th>Ism</th>
              <th>Mutaxassislik</th>
              <th>Yuklama</th>
              <th>Guruhlar</th>
              <th>Oylik maosh</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.specialty}</td>
                <td>{teacher.workload}%</td>
                <td>{teacher.groups?.join(', ')}</td>
                <td>{teacher.salary?.toLocaleString()} so'm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
