import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })
  console.log({ alice, bob })

  const todos = [
    {
      id: 1,
      content: 'Check out Prisma with Next.js',
      done: false,
    },
    {
      id: 2,
      content: 'Follow Prisma on Twitter',
      done: false,
    },
    {
      id: 3,
      content: 'Follow Nexus on Twitter',
      done: false,
    },
  ];

  todos.forEach(async (todo) => {
    const newTodo = await prisma.todo.upsert({
      where: { id: todo.id },
      update: {},
      create: {
        content: todo.content,
        done: todo.done,
      },
    })

    console.log(newTodo);
  })
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
