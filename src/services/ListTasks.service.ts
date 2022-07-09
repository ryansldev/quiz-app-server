import { prisma } from '~databases/prisma'

class ListTasksService {
  async execute () {
    const tasks = await prisma.task.findMany()

    return tasks
  }
}

export { ListTasksService }
