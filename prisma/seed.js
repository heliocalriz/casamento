const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function imageFor(name) {
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`
}

async function main() {
  // remove existing rows to avoid duplicates in dev
  await prisma.gift.deleteMany()

  const gifts = [
    { nome: 'Fogão', status: 'indisponivel', dadoPor: 'fogao.doador@gmail.com', imageUrl: imageFor('Fogão') },
    { nome: 'Geladeira', status: 'indisponivel', dadoPor: 'geladeira.doador@gmail.com', imageUrl: imageFor('Geladeira') },
    { nome: 'Máquina de lavar', status: 'indisponivel', dadoPor: 'maquina.lavar.doador@gmail.com', imageUrl: imageFor('Máquina de lavar') },
    { nome: 'Cama', status: 'indisponivel', dadoPor: 'cama.doador@gmail.com', imageUrl: imageFor('Cama') },
    { nome: 'Guarda roupa', status: 'indisponivel', dadoPor: 'guarda.roupa.doador@gmail.com', imageUrl: imageFor('Guarda roupa') },
    { nome: 'Cabeceira', status: 'disponivel', imageUrl: imageFor('Cabeceira') },
    { nome: 'Robô aspirador', status: 'indisponivel', dadoPor: 'robo.aspirador.doador@gmail.com', imageUrl: imageFor('Robô aspirador') },
    { nome: 'Mesa com cadeiras', status: 'disponivel', imageUrl: imageFor('Mesa com cadeiras') },
    { nome: 'Armário de cozinha', status: 'disponivel', imageUrl: imageFor('Armário de cozinha') },
    { nome: 'Rack', status: 'disponivel', imageUrl: imageFor('Rack') },
    { nome: 'Espelho', status: 'disponivel', imageUrl: imageFor('Espelho') },
    { nome: 'Liquidificador', status: 'disponivel', imageUrl: imageFor('Liquidificador') },
    { nome: 'Torradeira', status: 'disponivel', imageUrl: imageFor('Torradeira') },
    { nome: 'Microondas', status: 'indisponivel', dadoPor: 'microondas.doador@gmail.com', imageUrl: imageFor('Microondas') },
    { nome: 'Air fryer', status: 'disponivel', imageUrl: imageFor('Air fryer') },
    { nome: 'Tapete', status: 'disponivel', imageUrl: imageFor('Tapete') },
    { nome: 'Televisão', status: 'disponivel', imageUrl: imageFor('Televisão') },
    { nome: 'Centrifuga', status: 'disponivel', imageUrl: imageFor('Centrifuga') },
    { nome: 'Tanquinho', status: 'disponivel', imageUrl: imageFor('Tanquinho') },
    { nome: 'Jogo de panelas', status: 'disponivel', imageUrl: imageFor('Jogo de panelas') },
    { nome: 'Jogo de jantar', status: 'disponivel', imageUrl: imageFor('Jogo de jantar') },
    { nome: 'Cômoda', status: 'disponivel', imageUrl: imageFor('Cômoda') },
    { nome: 'Batedeira', status: 'disponivel', imageUrl: imageFor('Batedeira') },
    { nome: 'Faqueiro', status: 'disponivel', imageUrl: imageFor('Faqueiro') },
    { nome: 'Ferro de passar', status: 'disponivel', imageUrl: imageFor('Ferro de passar') },
    { nome: 'Sanduicheira', status: 'disponivel', imageUrl: imageFor('Sanduicheira') },
    { nome: 'Panela elétrica', status: 'disponivel', imageUrl: imageFor('Panela elétrica') },
    { nome: 'Mixer', status: 'disponivel', imageUrl: imageFor('Mixer') },
    { nome: 'WAP', status: 'disponivel', imageUrl: imageFor('WAP') },
    { nome: 'Bebedouro', status: 'disponivel', imageUrl: imageFor('Bebedouro') },
    { nome: 'Panela pressão elétrica', status: 'disponivel', imageUrl: imageFor('Panela pressão elétrica') },
    { nome: 'Aspirador de pó', status: 'disponivel', imageUrl: imageFor('Aspirador de pó') }
  ]

  for (const g of gifts) {
    await prisma.gift.create({ data: g })
  }

  console.log('seed complete: inserted', gifts.length, 'gifts')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
