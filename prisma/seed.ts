import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'
const prisma = new PrismaClient()

async function main() {
    for(let i=0; i<50; i++){
        const free=Math.random()<0.25;

        await prisma.song.create({
        data:{
            title: faker.music.songName(),
            author: faker.music.artist(),
            length: faker.number.int({min: 60, max:150}),
            price: free? 0: faker.number.int({min: 99, max: 300}),
            rating: faker.number.float({min:1, max:5})
        }
      })
}
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })