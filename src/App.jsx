import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/Layout'
import {
  AttendancePage,
  DashboardPage,
  GroupsPage,
  LeadsPage,
  PaymentsPage,
  ReportsPage,
  SchedulePage,
  SettingsPage,
  StudentsPage,
  TeachersPage,
} from './pages/ModulePages'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
