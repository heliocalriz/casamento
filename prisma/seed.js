const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const imageMap = {
  'Air fryer': '/fotos/air fryer.jpg',
  'Alexa': '/fotos/alexa.jpg',
  'Batedeira': '/fotos/batedeira.jpg',
  'Centrifuga': '/fotos/centrifuga.jpg',
  'Coifa': '/fotos/coifa.jpg',
  'Cômoda': '/fotos/comoda.jpg',
  'Espelho': '/fotos/Espelho.jpeg',
  'Faqueiro': '/fotos/Faqueiro.jpeg',
  'Fechadura Digital': '/fotos/fechadura.jpg',
  'Ferro de passar': '/fotos/ferrodepassar.jpeg',
  'Fondue': '/fotos/fondue.jpeg',
  'Fruteira': '/fotos/fruteira.jpeg',
  'Jogo de panelas': '/fotos/jogodepanela.jpeg',
  'Liquidificador': '/fotos/liquidificador.jpg',
  'Mixer': '/fotos/mixer.jpeg',
  'Panela de pressão': '/fotos/paneladepressaeletrica.jpg',
  'Panela elétrica': '/fotos/panela eletrica.jpeg',
  'Rack': '/fotos/Rack.jpg',
  'Sanduicheira': '/fotos/sanduicheira.jpg',
  'Tábua de passar roupa': '/fotos/tábua.jpg',
  'Tanquinho': '/fotos/tanquinho.jpg',
  'Tapete': '/fotos/tapete.jpg',
  'Televisão': '/fotos/televisao.jpg',
  'Torradeira': '/fotos/torradeira.jpg',
  'WAP': '/fotos/wap.jpeg',
  'Xícara': '/fotos/xicara.jpeg',
  'Sapateira': '/fotos/Sapateira.jpeg',
  'Bau organizador': '/fotos/bau-organizador.jpeg',
  // Itens que não têm imagem e devem exibir o placeholder
  'Fogão': null,
  'Geladeira': null,
  'Máquina de lavar': null,
  'Cama': null,
  'Guarda roupa': null,
  'Cabeceira': null,
  'Robô aspirador': null,
  'Mesa com cadeiras': null,
  'Armário de cozinha': null,
  'Microondas': null,
  'Jogo de jantar': null,
  'Bebedouro': null,
  'Panela pressão elétrica': null,
  'Aspirador de pó': null,
  'Aspirador': '/fotos/aspirador.jpeg',
};

async function main() {
  // remove existing rows to avoid duplicates in dev



// ATENÇÃO: Em ambientes de produção, evite rodar `prisma db push --force-reset`
// e certifique-se de que o comando `prisma db seed` seja executado apenas
// para inserir dados iniciais ou novos itens que não existem.
// Se descrições editadas ou novos itens sumirem após um deploy no Vercel,
// verifique as configurações de Build/Deploy no Vercel para garantir que
// não haja um comando de reset de banco de dados sendo executado.



  const gifts = [
    { nome: 'Fogão', status: 'indisponivel', dadoPor: 'fogao.doador@gmail.com', imageUrl: imageMap['Fogão'] },
    { nome: 'Geladeira', status: 'indisponivel', dadoPor: 'geladeira.doador@gmail.com', imageUrl: imageMap['Geladeira'] },
    { nome: 'Máquina de lavar', status: 'indisponivel', dadoPor: 'maquina.lavar.doador@gmail.com', imageUrl: imageMap['Máquina de lavar'] },
    { nome: 'Cama', status: 'indisponivel', dadoPor: 'cama.doador@gmail.com', imageUrl: imageMap['Cama'] },
    { nome: 'Guarda roupa', status: 'indisponivel', dadoPor: 'guarda.roupa.doador@gmail.com', imageUrl: imageMap['Guarda roupa'] },
    { nome: 'Cabeceira', status: 'disponivel', imageUrl: imageMap['Cabeceira'] },
    { nome: 'Robô aspirador', status: 'indisponivel', dadoPor: 'robo.aspirador.doador@gmail.com', imageUrl: imageMap['Robô aspirador'] },
    { nome: 'Mesa com cadeiras', status: 'disponivel', imageUrl: imageMap['Mesa com cadeiras'] },
    { nome: 'Armário de cozinha', status: 'disponivel', imageUrl: imageMap['Armário de cozinha'] },
    { nome: 'Rack', status: 'disponivel', imageUrl: imageMap['Rack'] },
    { nome: 'Espelho', status: 'disponivel', imageUrl: imageMap['Espelho'] },
    { nome: 'Liquidificador', status: 'disponivel', imageUrl: imageMap['Liquidificador'] },
    { nome: 'Torradeira', status: 'disponivel', imageUrl: imageMap['Torradeira'] },
    { nome: 'Microondas', status: 'indisponivel', dadoPor: 'microondas.doador@gmail.com', imageUrl: imageMap['Microondas'] },
    { nome: 'Air fryer', status: 'disponivel', imageUrl: imageMap['Air fryer'] },
    { nome: 'Tapete', status: 'disponivel', imageUrl: imageMap['Tapete'] },
    { nome: 'Televisão', status: 'disponivel', imageUrl: imageMap['Televisão'] },
    { nome: 'Centrifuga', status: 'disponivel', imageUrl: imageMap['Centrifuga'] },
    { nome: 'Tanquinho', status: 'disponivel', imageUrl: imageMap['Tanquinho'] },
    { nome: 'Jogo de panelas', status: 'disponivel', imageUrl: imageMap['Jogo de panelas'] },
    { nome: 'Jogo de jantar', status: 'disponivel', imageUrl: imageMap['Jogo de jantar'] },
    { nome: 'Cômoda', status: 'disponivel', imageUrl: imageMap['Cômoda'] },
    { nome: 'Batedeira', status: 'disponivel', imageUrl: imageMap['Batedeira'] },
    { nome: 'Fechadura Digital', status: 'disponivel', imageUrl: imageMap['Fechadura Digital'] },
    { nome: 'Faqueiro', status: 'disponivel', imageUrl: imageMap['Faqueiro'] },
    { nome: 'Ferro de passar', status: 'disponivel', imageUrl: imageMap['Ferro de passar'] },
    { nome: 'Sanduicheira', status: 'disponivel', imageUrl: imageMap['Sanduicheira'] },
    { nome: 'Panela elétrica', status: 'disponivel', imageUrl: imageMap['Panela elétrica'] },
    { nome: 'Mixer', status: 'disponivel', imageUrl: imageMap['Mixer'] },
    { nome: 'WAP', status: 'disponivel', imageUrl: imageMap['WAP'] },
    { nome: 'Bebedouro', status: 'disponivel', imageUrl: imageMap['Bebedouro'] },
    { nome: 'Panela pressão elétrica', status: 'disponivel', imageUrl: imageMap['Panela pressão elétrica'] },
    { nome: 'Aspirador de pó', status: 'disponivel', imageUrl: imageMap['Aspirador de pó'] },
    { nome: 'Sapateira', status: 'disponivel', imageUrl: imageMap['Sapateira'] },
    { nome: 'Bau organizador', status: 'disponivel', imageUrl: imageMap['Bau organizador'] },
    { nome: 'Aspirador', status: 'disponivel', imageUrl: imageMap['Aspirador'] },
    { nome: 'Fruteira', status: 'disponivel', imageUrl: imageMap['Fruteira'] },
    { nome: 'Xícara', status: 'disponivel', imageUrl: imageMap['Xícara'] },
    { nome: 'Coifa', status: 'disponivel', imageUrl: imageMap['Coifa'] },
    { nome: 'Alexa', status: 'disponivel', imageUrl: imageMap['Alexa'] },
    { nome: 'Tábua de passar roupa', status: 'disponivel', imageUrl: imageMap['Tábua de passar roupa'] },
  ];

  for (const g of gifts) {
    if (g.imageUrl) {
      // Verifica se um presente com este nome já existe
      const existingGift = await prisma.gift.findFirst({
        where: { nome: g.nome },
      });

      if (!existingGift) {
        // Se não existir, cria o presente
        await prisma.gift.create({ data: g });
      }
    }
  }

  console.log('seed complete: inserted/checked', gifts.length, 'gifts')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
