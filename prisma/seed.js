const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // remove existing rows to avoid duplicates in dev
  await prisma.gift.deleteMany()

  const gifts = [
    { nome: 'Fogão', status: 'indisponivel', dadoPor: 'fogao.doador@gmail.com' },
    { nome: 'Geladeira', status: 'indisponivel', dadoPor: 'geladeira.doador@gmail.com' },        
    { nome: 'Máquina de lavar', status: 'indisponivel', dadoPor: 'maquina.lavar.doador@gmail.com' }, 
    { nome: 'Cama', status: 'indisponivel', dadoPor: 'cama.doador@gmail.com' },
    { nome: 'Guarda roupa', status: 'indisponivel', dadoPor: 'guarda.roupa.doador@gmail.com' },     
    { nome: 'Cabeceira', status: 'disponivel' },
    { nome: 'Robô aspirador', status: 'indisponivel', dadoPor: 'robo.aspirador.doador@gmail.com' },   
    { nome: 'Mesa com cadeiras', status: 'disponivel' },
    { nome: 'Armário de cozinha', status: 'disponivel' },
    { nome: 'Rack', status: 'disponivel' },
    { nome: 'Espelho', status: 'disponivel' },
    { nome: 'Liquidificador', status: 'disponivel' },
    { nome: 'Torradeira', status: 'disponivel' },
    { nome: 'Microondas', status: 'indisponivel', dadoPor: 'microondas.doador@gmail.com' },       
    { nome: 'Air fryer', status: 'disponivel' },
    { nome: 'Tapete', status: 'disponivel' },
    { nome: 'Televisão', status: 'disponivel' },
    { nome: 'Centrifuga', status: 'disponivel' },
    { nome: 'Tanquinho', status: 'disponivel' },
    { nome: 'Jogo de panelas', status: 'disponivel' },
    { nome: 'Jogo de jantar', status: 'disponivel' },
    { nome: 'Cômoda', status: 'disponivel' },
    { nome: 'Batedeira', status: 'disponivel' },
    { nome: 'Faqueiro', status: 'disponivel' },
    { nome: 'Ferro de passar', status: 'disponivel' },
    { nome: 'Sanduicheira', status: 'disponivel' },
    { nome: 'Panela elétrica', status: 'disponivel' },
    { nome: 'Mixer', status: 'disponivel' },
    { nome: 'WAP', status: 'disponivel' },
    { nome: 'Bebedouro', status: 'disponivel' },
    { nome: 'Panela pressão elétrica', status: 'disponivel' },
    { nome: 'Aspirador de pó', status: 'disponivel' }
  ]

  for (const g of gifts) {
    await prisma.gift.create({ data: g })
  }

  console.log('seed complete: inserted', gifts.length, 'gifts')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
