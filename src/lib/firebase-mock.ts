import { Gift } from './types'

const API_BASE = '/api/gifts'

// If NEXT_PUBLIC_USE_MOCK=true the app will use an in-memory mock list
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

const giftsData = [
  { name: 'Fogão', status: 'Escolhido' },
  { name: 'Geladeira', status: 'Escolhido' },
  { name: 'Máquina de lavar', status: 'Escolhido' },
  { name: 'Cama', status: 'Escolhido' },
  { name: 'Guarda roupa', status: 'Escolhido' },
  { name: 'Cabeceira', status: 'Disponível' },
  { name: 'Robô aspirador', status: 'Escolhido' },
  { name: 'Mesa com cadeiras', status: 'Disponível' },
  { name: 'Armário de cozinha', status: 'Disponível' },
  { name: 'Rack', status: 'Disponível' },
  { name: 'Espelho', status: 'Disponível' },
  { name: 'Liquidificador', status: 'Disponível' },
  { name: 'Torradeira', status: 'Disponível' },
  { name: 'Microondas', status: 'Escolhido' },
  { name: 'Air fryer', status: 'Disponível' },
  { name: 'Tapete', status: 'Disponível' },
  { name: 'Televisão', status: 'Disponível' },
  { name: 'Centrifuga', status: 'Disponível' },
  { name: 'Tanquinho', status: 'Disponível' },
  { name: 'Jogo de panelas', status: 'Disponível' },
  { name: 'Jogo de jantar', status: 'Disponível' },
  { name: 'Cômoda', status: 'Disponível' },
  { name: 'Batedeira', status: 'Disponível' },
  { name: 'Faqueiro', status: 'Disponível' },
  { name: 'Ferro de passar', status: 'Disponível' },
  { name: 'Sanduicheira', status: 'Disponível' },
  { name: 'Panela elétrica', status: 'Disponível' },
  { name: 'Mixer', status: 'Disponível' },
  { name: 'WAP', status: 'Disponível' },
  { name: 'Bebedouro', status: 'Disponível' },
  { name: 'Panela pressão elétrica', status: 'Disponível' },
  { name: 'Aspirador de pó', status: 'Disponível' }
]

const mockGifts: Gift[] = giftsData.map((g, i) => {
  const isChosen = g.status === 'Escolhido'
  const id = String(i + 1)
  const dadoPor = isChosen ? `${g.name.toLowerCase().replace(/\s+/g, '.')}.doador@gmail.com` : undefined
  return {
    id,
    nome: g.name,
    status: isChosen ? 'indisponivel' : 'disponivel',
    dadoPor,
    categoria: undefined,
    descricao: undefined,
    imageUrl: undefined,
    createdAt: Date.now()
  }
})

export async function getGifts(): Promise<Gift[]> {
  if (useMock) return Promise.resolve(mockGifts)
  const res = await fetch(API_BASE)
  return res.json()
}

export async function addGift(gift: Omit<Gift, 'id' | 'createdAt'>): Promise<Gift> {
  if (useMock) {
    const id = String(Date.now())
    const created: Gift = { id, ...gift, createdAt: Date.now() }
    mockGifts.unshift(created)
    return Promise.resolve(created)
  }
  const res = await fetch(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(gift) })
  return res.json()
}

export async function updateGift(id: string, updates: Partial<Gift>): Promise<void> {
  if (useMock) {
    const idx = mockGifts.findIndex(g => g.id === id)
    if (idx !== -1) mockGifts[idx] = { ...mockGifts[idx], ...updates }
    return Promise.resolve()
  }
  await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) })
}

export async function deleteGift(id: string): Promise<void> {
  if (useMock) {
    const idx = mockGifts.findIndex(g => g.id === id)
    if (idx !== -1) mockGifts.splice(idx, 1)
    return Promise.resolve()
  }
  await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
}

export async function claimGift(id: string, name: string): Promise<void> {
  if (useMock) {
    const idx = mockGifts.findIndex(g => g.id === id)
    if (idx !== -1) mockGifts[idx] = { ...mockGifts[idx], status: 'indisponivel', dadoPor: name }
    return Promise.resolve()
  }
  await fetch(`${API_BASE}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ claim: true, name }) })
}
