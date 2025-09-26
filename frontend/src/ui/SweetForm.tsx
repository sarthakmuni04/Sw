import { useEffect, useState } from 'react'

export default function SweetForm({ onCreated, editing, onSaved, onCancel }: { onCreated: (s: any) => void, editing?: any | null, onSaved: (s: any) => void, onCancel: () => void }) {
  const [form, setForm] = useState<any>({ name: '', description: '', price: 0, imageUrl: '', category: '', tags: '', quantity: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editing) {
      setForm({ ...editing, tags: (editing.tags || []).join(',') })
    }
  }, [editing])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, tags: String(form.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean), price: Number(form.price), quantity: Number(form.quantity) }
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/sweets/${editing._id}` : '/api/sweets'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
    setLoading(false)
    if (!res.ok) return
    const data = await res.json()
    if (editing) onSaved(data); else onCreated(data)
    setForm({ name: '', description: '', price: 0, imageUrl: '', category: '', tags: '', quantity: 0 })
    onCancel()
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <div className="grid two">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
      </div>
      <input placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
      <div className="row">
        <button disabled={loading}>{editing ? 'Save' : 'Add Sweet'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}


