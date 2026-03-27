import { Gift } from './types'
import imgAirFryer from '@/assets/gifts/air fryer.jpg'
import imgAlexa from '@/assets/gifts/alexa.jpg'
import imgBatedeira from '@/assets/gifts/batedeira.jpg'
import imgCentrifuga from '@/assets/gifts/centrifuga.jpg'
import imgCoifa from '@/assets/gifts/coifa.jpg'
import imgComoda from '@/assets/gifts/comoda.jpg'
import imgEspelho from '@/assets/gifts/Espelho.jpeg'
import imgFaqueiro from '@/assets/gifts/Faqueiro.jpeg'
import imgFechadura from '@/assets/gifts/fechadura.jpg'
import imgFerroDePassar from '@/assets/gifts/ferrodepassar.jpeg'
import imgFondue from '@/assets/gifts/fondue.jpeg'
import imgFruteira from '@/assets/gifts/fruteira.jpeg'
import imgJogoDePanela from '@/assets/gifts/jogodepanela.jpeg'
import imgLiquidificador from '@/assets/gifts/liquidificador.jpg'
import imgMixer from '@/assets/gifts/mixer.jpeg'
import imgPanelaDePressao from '@/assets/gifts/paneladepressao.jpg'
import imgPanelaEletrica from '@/assets/gifts/panelaeletrica.jpg'
import imgRack from '@/assets/gifts/Rack.jpg'
import imgSanduicheira from '@/assets/gifts/sanduicheira.jpg'
import imgTabua from '@/assets/gifts/tábua.jpg'
import imgTanquinho from '@/assets/gifts/tanquinho.jpg'
import imgTapete from '@/assets/gifts/tapete.jpg'
import imgTelevisao from '@/assets/gifts/televisao.jpg'
import imgTorradeira from '@/assets/gifts/torradeira.jpg'
import imgWap from '@/assets/gifts/wap.jpeg'
import imgXicara from '@/assets/gifts/xicara.jpeg'

const API_BASE = '/api/gifts'

// If NEXT_PUBLIC_USE_MOCK=true the app will use an in-memory mock list
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

const giftsData = [
  { name: 'Air fryer', status: 'Disponível', image: imgAirFryer },
  { name: 'Alexa', status: 'Disponível', image: imgAlexa },
  { name: 'Batedeira', status: 'Disponível', image: imgBatedeira },
  { name: 'Centrifuga', status: 'Disponível', image: imgCentrifuga },
  { name: 'Coifa', status: 'Disponível', image: imgCoifa },
  { name: 'Cômoda', status: 'Disponível', image: imgComoda },
  { name: 'Espelho', status: 'Disponível', image: imgEspelho },
  { name: 'Faqueiro', status: 'Disponível', image: imgFaqueiro },
  { name: 'Fechadura', status: 'Disponível', image: imgFechadura },
  { name: 'Ferro de passar', status: 'Disponível', image: imgFerroDePassar },
  { name: 'Fondue', status: 'Disponível', image: imgFondue },
  { name: 'Fruteira', status: 'Disponível', image: imgFruteira },
  { name: 'Jogo de panelas', status: 'Disponível', image: imgJogoDePanela },
  { name: 'Liquidificador', status: 'Disponível', image: imgLiquidificador },
  { name: 'Mixer', status: 'Disponível', image: imgMixer },
  { name: 'Panela de pressão', status: 'Disponível', image: imgPanelaDePressao },
  { name: 'Panela elétrica', status: 'Disponível', image: imgPanelaEletrica },
  { name: 'Rack', status: 'Disponível', image: imgRack },
  { name: 'Sanduicheira', status: 'Disponível', image: imgSanduicheira },
  { name: 'Tábua', status: 'Disponível', image: imgTabua },
  { name: 'Tanquinho', status: 'Disponível', image: imgTanquinho },
  { name: 'Tapete', status: 'Disponível', image: imgTapete },
  { name: 'Televisão', status: 'Disponível', image: imgTelevisao },
  { name: 'Torradeira', status: 'Disponível', image: imgTorradeira },
  { name: 'WAP', status: 'Disponível', image: imgWap },
  { name: 'Xícara', status: 'Disponível', image: imgXicara },
  // Itens sem imagem definida
  // { name: 'Fogão', status: 'Escolhido' },
  // { name: 'Geladeira', status: 'Escolhido' },
  // { name: 'Máquina de lavar', status: 'Escolhido' },
  // { name: 'Cama', status: 'Escolhido' },
  // { name: 'Guarda roupa', status: 'Escolhido' },
  // { name: 'Cabeceira', status: 'Disponível' },
  // { name: 'Robô aspirador', status: 'Escolhido' },
  // { name: 'Mesa com cadeiras', status: 'Disponível' },
  // { name: 'Armário de cozinha', status: 'Disponível' },
  // { name: 'Microondas', status: 'Escolhido' },
  // { name: 'Jogo de jantar', status: 'Disponível' },
  // { name: 'Bebedouro', status: 'Disponível' },
  // { name: 'Panela pressão elétrica', status: 'Disponível' },
  // { name: 'Aspirador de pó', status: 'Disponível' }
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
    imageUrl: g.image,
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
