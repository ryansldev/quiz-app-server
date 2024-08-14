import { prisma } from '~databases/prisma'

class ListTasksService {
  async execute () {
    const tasks = await prisma.task.findMany({
      orderBy: {
        deadline: 'asc'
      }
    })

    return tasks
  }
}

export { ListTasksService }
