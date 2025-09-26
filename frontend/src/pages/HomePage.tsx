import { useEffect, useMemo, useState } from 'react'
import SweetCard from '../ui/SweetCard'
import { fallbackSweets } from '../data/fallbackSweets'

type Sweet = {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
  inStock: boolean
  quantity: number
  category?: string
  tags?: string[]
}

export default function HomePage() {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    fetch('/api/sweets')
      .then(r => r.ok ? r.json() : [])
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSweets(data)
        else setSweets(fallbackSweets as any)
      })
      .catch(() => setSweets(fallbackSweets as any))
  }, [])

  const filtered = useMemo(() => {
    return sweets.filter(s => {
      const matchQ = !query || s.name.toLowerCase().includes(query.toLowerCase())
      const matchC = !category || (s.category || '').toLowerCase() === category.toLowerCase()
      const matchMin = !minPrice || s.price >= Number(minPrice)
      const matchMax = !maxPrice || s.price <= Number(maxPrice)
      return matchQ && matchC && matchMin && matchMax
    })
  }, [sweets, query, category, minPrice, maxPrice])

  return (
    <div className="container">
      <h2>Discover Sweets</h2>
      <div className="filters card">
        <input placeholder="Search by name" value={query} onChange={e => setQuery(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        <input placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
      <div className="grid">
        {filtered.map((s: any, idx) => (
          <SweetCard key={s._id || idx} sweet={s} onPurchased={updated => {
            setSweets(prev => prev.map(x => (x._id || '') === (updated._id || '') ? updated : x))
          }} />
        ))}
      </div>
    </div>
  )
}


