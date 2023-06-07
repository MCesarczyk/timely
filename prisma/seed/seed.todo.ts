import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedTodo() {
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
