import { StaticImageData } from 'next/image';

export type GiftStatus = 'disponivel' | 'indisponivel';

export interface Gift {
  id: string;
  nome: string;
  status: GiftStatus;
  dadoPor?: string;
  categoria?: string;
  descricao?: string;
  imageUrl?: StaticImageData;
  createdAt: number;
}