import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const gifts = await prisma.gift.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(gifts)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nome, descricao, categoria, imageUrl } = body
  const created = await prisma.gift.create({
    data: { nome, descricao, categoria, imageUrl }
  })
  return NextResponse.json(created)
}
