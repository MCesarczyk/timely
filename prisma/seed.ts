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
      title: 'Check out Prisma with Next.js',
      content: 'lorem ipsum dolor sit amet ...',
      done: false,
    },
    {
      id: 2,
      title: 'Follow Prisma on Twitter',
      content: 'edisni maet noisufnoc ...',
      done: false,
    },
    {
      id: 3,
      title: 'Follow Nexus on Twitter',
      content: 'uneviled maet noisufnoc ...',
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
