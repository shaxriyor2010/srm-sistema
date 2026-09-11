import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, X } from 'lucide-react'

export function LoginModal({ isOpen, onClose, onLogin }) {
  const [form, setForm] = useState({ email: 'admin@learncrm.uz', password: 'admin123' })
  const [error, setError] = useState('')

  if (!isOpen) return null

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.email || !form.password) {
      setError('Email va parolni kiriting')
      return
    }

    const ok = onLogin(form.email, form.password)
    if (!ok) {
      setError('Noto\'g\'ri ma\'lumotlar. Demo uchun: admin@learncrm.uz / admin123')
      return
    }

    setError('')
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        className="modal-card glass-card"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Kirish</p>
            <h3>CRM tizimiga kirish</h3>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <div className="input-with-icon">
              <Mail size={16} />
              <input name="email" value={form.email} onChange={handleChange} type="email" />
            </div>
          </label>

          <label>
            <span>Parol</span>
            <div className="input-with-icon">
              <Lock size={16} />
              <input name="password" value={form.password} onChange={handleChange} type="password" />
            </div>
          </label>

          {error ? <div className="error-box">{error}</div> : null}

          <button className="primary-button full-width" type="submit">Kirish</button>
          <a href="#" className="text-link">Parolni unutdingizmi?</a>
        </form>
      </motion.div>
    </div>
  )
}
