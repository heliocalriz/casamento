import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  await prisma.gift.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()
  if (body.claim && body.name) {
    const updated = await prisma.gift.update({ where: { id }, data: { status: 'indisponivel', dadoPor: body.name } })
    return NextResponse.json(updated)
  }
  const updated = await prisma.gift.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}
