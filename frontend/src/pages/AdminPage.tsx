import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import SweetForm from '../ui/SweetForm'

export default function AdminPage() {
  const { user } = useAuth()
  const [sweets, setSweets] = useState<any[]>([])
  const [editing, setEditing] = useState<any | null>(null)

  useEffect(() => {
    fetch('/api/sweets').then(r => r.json()).then(setSweets)
  }, [])

  const onCreated = (s: any) => setSweets(prev => [s, ...prev])
  const onUpdated = (s: any) => setSweets(prev => prev.map(x => x._id === s._id ? s : x))
  const onDeleted = async (id: string) => {
    const res = await fetch(`/api/sweets/${id}`, { method: 'DELETE', credentials: 'include' })
    if (res.ok) setSweets(prev => prev.filter(x => x._id !== id))
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <SweetForm onCreated={onCreated} editing={editing} onSaved={onUpdated} onCancel={() => setEditing(null)} />
      <div className="grid">
        {sweets.map(s => (
          <div key={s._id} className="card">
            <h3>{s.name}</h3>
            <p>${s.price.toFixed(2)}</p>
            <p>Qty: {s.quantity}</p>
            <div className="row">
              <button onClick={() => setEditing(s)}>Edit</button>
              <button onClick={() => onDeleted(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


