import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export function AddStudentModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    group: 'IELTS Advanced',
    status: 'Active',
    balance: 0,
    monthlyFee: 600000,
  })

  if (!isOpen) return null

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: name === 'balance' || name === 'monthlyFee' ? Number(value) : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      id: Date.now(),
      ...form,
      attendance: 0,
      progress: 0,
      teacher: 'Nodira Akhmedova',
    })
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
            <p className="eyebrow">Yangi</p>
            <h3>O'quvchi qo'shish</h3>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Close dialog">
            <X size={16} />
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>To'liq ism</span>
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" value={form.email} onChange={handleChange} type="email" required />
          </label>
          <label>
            <span>Telefon</span>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <div className="split-grid">
            <label>
              <span>Guruh</span>
              <select name="group" value={form.group} onChange={handleChange}>
                <option>IELTS Advanced</option>
                <option>Business English</option>
                <option>Kids Starter</option>
                <option>Speaking Lab</option>
              </select>
            </label>
            <label>
              <span>Holat</span>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>
          <div className="split-grid">
            <label>
              <span>Qarzdorlik</span>
              <input name="balance" value={form.balance} onChange={handleChange} type="number" />
            </label>
            <label>
              <span>Oylik to'lov</span>
              <input name="monthlyFee" value={form.monthlyFee} onChange={handleChange} type="number" />
            </label>
          </div>

          <button className="primary-button full-width" type="submit">Saqlash</button>
        </form>
      </motion.div>
    </div>
  )
}
