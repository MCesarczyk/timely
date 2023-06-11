import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function seedPeriod() {
  const periods = [
    {
      id: 1,
      startTime: new Date('2021-01-01T08:00:00.000Z'),
      endTime: new Date('2021-01-01T13:00:00.000Z'),
      type: 'work',
      todoId: 3,
    },
    {
      id: 2,
      startTime: new Date('2021-01-01T13:00:00.000Z'),
      endTime: new Date('2021-01-01T13:30:00.000Z'),
      type: 'break',
    },
    {
      id: 3,
      startTime: new Date('2021-01-01T13:30:00.000Z'),
      endTime: new Date('2021-01-01T18:00:00.000Z'),
      type: 'work',
      todoId: 3,
    },
  ];

  periods.forEach(async (period) => {
    const newPeriod = await prisma.period.upsert({
      where: { id: period.id },
      update: {},
      create: {
        id: period.id,
        startTime: period.startTime,
        endTime: period.endTime,
        type: period.type,
        todoId: period.todoId,
      },
    })

    console.log(newPeriod);
  })
}
