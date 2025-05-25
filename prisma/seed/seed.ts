import { PrismaClient } from '@prisma/client'
import { seedUser } from './seed.user'
import { seedTodo } from './seed.todo';
// import { seedPeriod } from './seed.period';
const prisma = new PrismaClient()

async function main() {
  seedUser();
  seedTodo();
  // seedPeriod();
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
