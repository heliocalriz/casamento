import { Gift } from './types'

const API_BASE = '/api/gifts'

// If NEXT_PUBLIC_USE_MOCK=true the app will use an in-memory mock list
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

const mockGifts: Gift[] = [
  { id: '1', nome: 'Fogão', status: 'indisponivel', dadoPor: 'fogao.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '2', nome: 'Geladeira', status: 'indisponivel', dadoPor: 'geladeira.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '3', nome: 'Máquina de lavar', status: 'indisponivel', dadoPor: 'maquina.lavar.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '4', nome: 'Cama', status: 'indisponivel', dadoPor: 'cama.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '5', nome: 'Guarda roupa', status: 'indisponivel', dadoPor: 'guarda.roupa.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '6', nome: 'Cabeceira', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '7', nome: 'Robô aspirador', status: 'indisponivel', dadoPor: 'robo.aspirador.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '8', nome: 'Mesa com cadeiras', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '9', nome: 'Armário de cozinha', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '10', nome: 'Rack', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '11', nome: 'Espelho', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '12', nome: 'Liquidificador', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '13', nome: 'Torradeira', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '14', nome: 'Microondas', status: 'indisponivel', dadoPor: 'microondas.doador@gmail.com', categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '15', nome: 'Air fryer', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '16', nome: 'Tapete', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '17', nome: 'Televisão', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '18', nome: 'Centrifuga', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '19', nome: 'Tanquinho', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '20', nome: 'Jogo de panelas', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '21', nome: 'Jogo de jantar', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '22', nome: 'Cômoda', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '23', nome: 'Batedeira', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '24', nome: 'Faqueiro', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '25', nome: 'Ferro de passar', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '26', nome: 'Sanduicheira', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '27', nome: 'Panela elétrica', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '28', nome: 'Mixer', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '29', nome: 'WAP', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '30', nome: 'Bebedouro', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '31', nome: 'Panela pressão elétrica', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() },
  { id: '32', nome: 'Aspirador de pó', status: 'disponivel', dadoPor: undefined, categoria: undefined, descricao: undefined, imageUrl: undefined, createdAt: Date.now() }
]

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
