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
  { name: 'Air fryer', status: 'Disponível', image: imgAirFryer, descricao: 'Frita alimentos com ar quente, ideal para uma alimentação mais saudável.' },
  { name: 'Alexa', status: 'Disponível', image: imgAlexa, descricao: 'Assistente de voz inteligente para automação residencial e muito mais.' },
  { name: 'Batedeira', status: 'Disponível', image: imgBatedeira, descricao: 'Essencial para preparar bolos, massas e diversas receitas na cozinha.' },
  { name: 'Centrifuga', status: 'Disponível', image: imgCentrifuga, descricao: 'Ideal para secar roupas de forma rápida e eficiente.' },
  { name: 'Coifa', status: 'Disponível', image: imgCoifa, descricao: 'Remove fumaça e odores da cozinha, mantendo o ambiente limpo.' },
  { name: 'Cômoda', status: 'Disponível', image: imgComoda, descricao: 'Móvel com gavetas para organização de roupas e objetos pessoais.' },
  { name: 'Espelho', status: 'Disponível', image: imgEspelho, descricao: 'Um lindo espelho para decorar qualquer ambiente da casa.' },
  { name: 'Faqueiro', status: 'Disponível', image: imgFaqueiro, descricao: 'Conjunto completo de talheres para todas as ocasiões.' },
  { name: 'Fechadura', status: 'Disponível', image: imgFechadura, descricao: 'Segurança e tecnologia para sua casa com uma fechadura moderna.' },
  { name: 'Ferro de passar', status: 'Disponível', image: imgFerroDePassar, descricao: 'Deixa suas roupas impecáveis e prontas para usar.' },
  { name: 'Fondue', status: 'Disponível', image: imgFondue, descricao: 'Perfeito para noites especiais com queijo, chocolate ou carne.' },
  { name: 'Fruteira', status: 'Disponível', image: imgFruteira, descricao: 'Organize suas frutas de forma prática e decorativa.' },
  { name: 'Jogo de panelas', status: 'Disponível', image: imgJogoDePanela, descricao: 'Panelas de alta qualidade para cozinhar suas melhores receitas.' },
  { name: 'Liquidificador', status: 'Disponível', image: imgLiquidificador, descricao: 'Versátil para sucos, vitaminas e diversas preparações.' },
  { name: 'Mixer', status: 'Disponível', image: imgMixer, descricao: 'Prático para triturar e misturar alimentos em pequenas quantidades.' },
  { name: 'Panela de pressão', status: 'Disponível', image: imgPanelaDePressao, descricao: 'Cozinha alimentos rapidamente e economiza tempo na cozinha.' },
  { name: 'Panela elétrica', status: 'Disponível', image: imgPanelaEletrica, descricao: 'Facilita o preparo de diversos pratos com praticidade.' },
  { name: 'Rack', status: 'Disponível', image: imgRack, descricao: 'Móvel elegante para sua sala, ideal para TV e aparelhos.' },
  { name: 'Sanduicheira', status: 'Disponível', image: imgSanduicheira, descricao: 'Prepara sanduíches deliciosos e crocantes em minutos.' },
  { name: 'Tábua', status: 'Disponível', image: imgTabua, descricao: 'Tábua de corte resistente e prática para o preparo de alimentos.' },
  { name: 'Tanquinho', status: 'Disponível', image: imgTanquinho, descricao: 'Opção econômica para lavar roupas com eficiência.' },
  { name: 'Tapete', status: 'Disponível', image: imgTapete, descricao: 'Aconchego e estilo para sua sala ou quarto.' },
  { name: 'Televisão', status: 'Disponível', image: imgTelevisao, descricao: 'Entretenimento garantido com imagem e som de alta qualidade.' },
  { name: 'Torradeira', status: 'Disponível', image: imgTorradeira, descricao: 'Torradas perfeitas para o café da manhã.' },
  { name: 'WAP', status: 'Disponível', image: imgWap, descricao: 'Aspirador de pó potente para uma limpeza completa.' },
  { name: 'Xícara', status: 'Disponível', image: imgXicara, descricao: 'Conjunto de xícaras elegantes para seu café ou chá.' },
  { name: 'Fogão', status: 'Escolhido', descricao: 'Fogão moderno com diversas funcionalidades para sua cozinha.' },
  { name: 'Geladeira', status: 'Escolhido', descricao: 'Geladeira espaçosa e eficiente para armazenar seus alimentos.' },
  { name: 'Máquina de lavar', status: 'Escolhido', descricao: 'Lava roupas de forma prática e economiza seu tempo.' },
  { name: 'Cama', status: 'Escolhido', descricao: 'Conforto e qualidade para suas noites de sono.' },
  { name: 'Guarda roupa', status: 'Escolhido', descricao: 'Organização e espaço para suas roupas e acessórios.' },
  { name: 'Cabeceira', status: 'Disponível', descricao: 'Completa a decoração do seu quarto com estilo.' },
  { name: 'Robô aspirador', status: 'Escolhido', descricao: 'Limpeza automática e prática para o dia a dia.' },
  { name: 'Mesa com cadeiras', status: 'Disponível', descricao: 'Ideal para refeições em família e amigos.' },
  { name: 'Armário de cozinha', status: 'Disponível', descricao: 'Organização e praticidade para sua cozinha.' },
  { name: 'Microondas', status: 'Escolhido', descricao: 'Aqueça e prepare alimentos rapidamente.' },
  { name: 'Jogo de jantar', status: 'Disponível', descricao: 'Elegância para suas refeições especiais.' },
  { name: 'Bebedouro', status: 'Disponível', descricao: 'Água fresca e pura sempre à mão.' },
  { name: 'Panela pressão elétrica', status: 'Disponível', descricao: 'Praticidade e rapidez no preparo de suas receitas.' },
  { name: 'Aspirador de pó', status: 'Disponível', descricao: 'Mantenha sua casa limpa com praticidade e eficiência.' }
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
    descricao: g.descricao || 'Sem descrição disponível.',
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
