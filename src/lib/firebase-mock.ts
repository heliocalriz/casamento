import { Gift, GiftStatus } from './types';
import { PlaceHolderImages } from './placeholder-images';

// Initial dummy data
let gifts: Gift[] = [
  {
    id: '1',
    nome: 'Cafeteira Expressa',
    status: 'disponivel',
    categoria: 'Eletrodomésticos',
    descricao: 'Uma cafeteira moderna para os amantes de café.',
    imageUrl: PlaceHolderImages[0].imageUrl,
    createdAt: Date.now() - 100000
  },
  {
    id: '2',
    nome: 'Jogo de Cama Algodão',
    status: 'indisponivel',
    dadoPor: 'Maria Silva',
    categoria: 'Cama, Mesa e Banho',
    descricao: 'Conjunto de lençóis de 400 fios extremamente macio.',
    imageUrl: PlaceHolderImages[1].imageUrl,
    createdAt: Date.now() - 200000
  },
  {
    id: '3',
    nome: 'Liquidificador Turbo',
    status: 'disponivel',
    categoria: 'Cozinha',
    descricao: 'Liquidificador de alta potência com 12 velocidades.',
    imageUrl: PlaceHolderImages[2].imageUrl,
    createdAt: Date.now() - 300000
  }
];

export async function getGifts(): Promise<Gift[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...gifts].sort((a, b) => b.createdAt - a.createdAt);
}

export async function addGift(gift: Omit<Gift, 'id' | 'createdAt'>): Promise<Gift> {
  const newGift: Gift = {
    ...gift,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: Date.now(),
  };
  gifts = [newGift, ...gifts];
  return newGift;
}

export async function updateGift(id: string, updates: Partial<Gift>): Promise<void> {
  gifts = gifts.map(g => g.id === id ? { ...g, ...updates } : g);
}

export async function deleteGift(id: string): Promise<void> {
  gifts = gifts.filter(g => g.id !== id);
}

export async function claimGift(id: string, name: string): Promise<void> {
  await updateGift(id, { status: 'indisponivel', dadoPor: name });
}