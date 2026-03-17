export type GiftStatus = 'disponivel' | 'indisponivel';

export interface Gift {
  id: string;
  nome: string;
  status: GiftStatus;
  dadoPor?: string;
  categoria?: string;
  descricao?: string;
  imageUrl?: string;
  createdAt: number;
}