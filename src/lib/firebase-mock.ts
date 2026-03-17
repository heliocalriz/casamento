import { Gift, GiftStatus } from './types';
import { PlaceHolderImages } from './placeholder-images';

// Helper to get a placeholder image by cycling through the available ones
const getImg = (index: number) => PlaceHolderImages[index % PlaceHolderImages.length].imageUrl;

// Initial dummy data based on the provided list
let gifts: Gift[] = [
  { id: '1', nome: 'Fogão', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Eletrodomésticos', imageUrl: getImg(0), createdAt: Date.now() - 1000 },
  { id: '2', nome: 'Geladeira', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Eletrodomésticos', imageUrl: getImg(1), createdAt: Date.now() - 2000 },
  { id: '3', nome: 'Máquina de lavar', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Eletrodomésticos', imageUrl: getImg(2), createdAt: Date.now() - 3000 },
  { id: '4', nome: 'Cama', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Quarto', imageUrl: getImg(3), createdAt: Date.now() - 4000 },
  { id: '5', nome: 'Guarda roupa', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Quarto', imageUrl: getImg(0), createdAt: Date.now() - 5000 },
  { id: '6', nome: 'Cabeceira', status: 'disponivel', categoria: 'Quarto', imageUrl: getImg(1), createdAt: Date.now() - 6000 },
  { id: '7', nome: 'Robô aspirador', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Eletrodomésticos', imageUrl: getImg(2), createdAt: Date.now() - 7000 },
  { id: '8', nome: 'Mesa com cadeiras', status: 'disponivel', categoria: 'Sala de Jantar', imageUrl: getImg(3), createdAt: Date.now() - 8000 },
  { id: '9', nome: 'Armário de cozinha', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(0), createdAt: Date.now() - 9000 },
  { id: '10', nome: 'Rack', status: 'disponivel', categoria: 'Sala', imageUrl: getImg(1), createdAt: Date.now() - 10000 },
  { id: '11', nome: 'Espelho', status: 'disponivel', categoria: 'Decoração', imageUrl: getImg(2), createdAt: Date.now() - 11000 },
  { id: '12', nome: 'Liquidificador', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(3), createdAt: Date.now() - 12000 },
  { id: '13', nome: 'Torradeira', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(0), createdAt: Date.now() - 13000 },
  { id: '14', nome: 'Microondas', status: 'indisponivel', dadoPor: 'Já ganhamos', categoria: 'Cozinha', imageUrl: getImg(1), createdAt: Date.now() - 14000 },
  { id: '15', nome: 'Air fryer', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(2), createdAt: Date.now() - 15000 },
  { id: '16', nome: 'Tapete', status: 'disponivel', categoria: 'Sala', imageUrl: getImg(3), createdAt: Date.now() - 16000 },
  { id: '17', nome: 'Televisão', status: 'disponivel', categoria: 'Eletrônicos', imageUrl: getImg(0), createdAt: Date.now() - 17000 },
  { id: '18', nome: 'Centrifuga', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(1), createdAt: Date.now() - 18000 },
  { id: '19', nome: 'Tanquinho', status: 'disponivel', categoria: 'Lavanderia', imageUrl: getImg(2), createdAt: Date.now() - 19000 },
  { id: '20', nome: 'Jogo de panelas', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(3), createdAt: Date.now() - 20000 },
  { id: '21', nome: 'Jogo de jantar', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(0), createdAt: Date.now() - 21000 },
  { id: '22', nome: 'Cômoda', status: 'disponivel', categoria: 'Quarto', imageUrl: getImg(1), createdAt: Date.now() - 22000 },
  { id: '23', nome: 'Batedeira', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(2), createdAt: Date.now() - 23000 },
  { id: '24', nome: 'Faqueiro', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(3), createdAt: Date.now() - 24000 },
  { id: '25', nome: 'Ferro de passar', status: 'disponivel', categoria: 'Eletrodomésticos', imageUrl: getImg(0), createdAt: Date.now() - 25000 },
  { id: '26', nome: 'Sanduicheira', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(1), createdAt: Date.now() - 26000 },
  { id: '27', nome: 'Panela elétrica', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(2), createdAt: Date.now() - 27000 },
  { id: '28', nome: 'Mixer', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(3), createdAt: Date.now() - 28000 },
  { id: '29', nome: 'WAP', status: 'disponivel', categoria: 'Limpeza', imageUrl: getImg(0), createdAt: Date.now() - 29000 },
  { id: '30', nome: 'Bebedouro', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(1), createdAt: Date.now() - 30000 },
  { id: '31', nome: 'Panela pressão elétrica', status: 'disponivel', categoria: 'Cozinha', imageUrl: getImg(2), createdAt: Date.now() - 31000 },
  { id: '32', nome: 'Aspirador de pó', status: 'disponivel', categoria: 'Eletrodomésticos', imageUrl: getImg(3), createdAt: Date.now() - 32000 },
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
