import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const dashboard = {
  stats: {
    totalStudents: 124,
    activeGroups: 8,
    monthlyRevenue: 18400000,
    newLeads: 32,
  },
  revenueSeries: [
    { name: 'Jan', value: 14000000 },
    { name: 'Feb', value: 15000000 },
    { name: 'Mar', value: 17000000 },
    { name: 'Apr', value: 16200000 },
    { name: 'May', value: 17500000 },
    { name: 'Jun', value: 18400000 },
  ],
  attendance: [
    { name: 'Mon', value: 84 },
    { name: 'Tue', value: 88 },
    { name: 'Wed', value: 91 },
    { name: 'Thu', value: 86 },
    { name: 'Fri', value: 94 },
  ],
  students: [
    { id: 1, name: 'Aziza Karimova', email: 'aziza@example.com', phone: '+998 90 123 45 67', group: 'IELTS Advanced', status: 'Active', balance: 420000, attendance: 92, progress: 78, teacher: 'Nodira Akhmedova' },
    { id: 2, name: 'Bobur Tursunov', email: 'bobur@example.com', phone: '+998 93 765 43 21', group: 'Business English', status: 'Pending', balance: 150000, attendance: 80, progress: 69, teacher: 'Dilshod Zokirov' },
    { id: 3, name: 'Madinabonu Rustamova', email: 'madina@example.com', phone: '+998 99 111 22 33', group: 'Kids Starter', status: 'Active', balance: 0, attendance: 96, progress: 88, teacher: 'Sardor Mavlonov' },
  ],
  schedule: [
    { id: 1, day: 'Monday', time: '09:00', room: 'A-204', group: 'IELTS Advanced', teacher: 'Nodira Akhmedova' },
    { id: 2, day: 'Tuesday', time: '11:00', room: 'B-101', group: 'Business English', teacher: 'Dilshod Zokirov' },
    { id: 3, day: 'Thursday', time: '15:00', room: 'C-305', group: 'Kids Starter', teacher: 'Sardor Mavlonov' },
  ],
}

const students = [
  ...dashboard.students,
  { id: 4, name: 'Nilufar Juraeva', email: 'nilufar@example.com', phone: '+998 91 576 33 00', group: 'Speaking Lab', status: 'Active', balance: 280000, attendance: 90, progress: 75, teacher: 'Nodira Akhmedova' },
  { id: 5, name: 'Jamshid Alimov', email: 'jamshid@example.com', phone: '+998 94 234 56 78', group: 'Business English', status: 'Inactive', balance: 100000, attendance: 68, progress: 59, teacher: 'Dilshod Zokirov' },
]

const groups = [
  { id: 1, name: 'IELTS Advanced', students: 18, teacher: 'Nodira Akhmedova', schedule: 'Mon/Wed/Fri', room: 'A-204' },
  { id: 2, name: 'Business English', students: 12, teacher: 'Dilshod Zokirov', schedule: 'Tue/Thu', room: 'B-101' },
  { id: 3, name: 'Kids Starter', students: 16, teacher: 'Sardor Mavlonov', schedule: 'Mon/Tue/Thu', room: 'C-305' },
  { id: 4, name: 'Speaking Lab', students: 9, teacher: 'Nodira Akhmedova', schedule: 'Wed/Sat', room: 'A-110' },
]

const teachers = [
  { id: 1, name: 'Nodira Akhmedova', specialty: 'IELTS', workload: 86, salary: 4800000, groups: ['IELTS Advanced', 'Speaking Lab'] },
  { id: 2, name: 'Dilshod Zokirov', specialty: 'Business', workload: 74, salary: 3900000, groups: ['Business English'] },
  { id: 3, name: 'Sardor Mavlonov', specialty: 'Kids', workload: 94, salary: 4200000, groups: ['Kids Starter'] },
]

const payments = [
  { id: 1, student: 'Aziza Karimova', amount: 420000, status: 'Paid', date: '2026-09-05' },
  { id: 2, student: 'Bobur Tursunov', amount: 150000, status: 'Pending', date: '2026-09-08' },
  { id: 3, student: 'Madinabonu Rustamova', amount: 300000, status: 'Paid', date: '2026-09-02' },
  { id: 4, student: 'Nilufar Juraeva', amount: 280000, status: 'Paid', date: '2026-09-04' },
]

const leads = [
  { id: 1, name: 'Jasur Nematov', phone: '+998 90 900 11 22', status: 'New', source: 'Instagram' },
  { id: 2, name: 'Sevinch Murodova', phone: '+998 97 440 12 34', status: 'Contacted', source: 'Website' },
  { id: 3, name: 'Asadbek Qodirov', phone: '+998 95 777 88 99', status: 'Trial lesson', source: 'Referral' },
  { id: 4, name: 'Maftuna Yuldasheva', phone: '+998 98 551 23 44', status: 'Enrolled', source: 'Flyer' },
  { id: 5, name: 'Sardor Salimov', phone: '+998 90 222 11 44', status: 'New', source: 'Telegram' },
]

const settings = {
  profile: {
    name: 'Admin User',
    email: 'admin@learncrm.uz',
    role: 'Admin',
  },
  roles: ['Admin', 'Menejer', 'O\'qituvchi'],
  system: {
    language: 'uz',
    timezone: 'Asia/Tashkent',
    notifications: true,
    darkMode: true,
  },
}

app.get('/api/dashboard', (req, res) => {
  res.json(dashboard)
})

app.get('/api/students', (req, res) => {
  res.json(students)
})

app.get('/api/groups', (req, res) => {
  res.json(groups)
})

app.get('/api/teachers', (req, res) => {
  res.json(teachers)
})

app.get('/api/schedule', (req, res) => {
  res.json({ schedule: dashboard.schedule })
})

app.get('/api/payments', (req, res) => {
  res.json(payments)
})

app.get('/api/leads', (req, res) => {
  res.json(leads)
})

app.get('/api/settings', (req, res) => {
  res.json(settings)
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'learncrm-api' })
})

app.listen(port, () => {
  console.log(`CRM API running on http://localhost:${port}`)
})
