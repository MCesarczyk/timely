import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedTodo() {
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
