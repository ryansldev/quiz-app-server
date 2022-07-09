import { prisma } from '~databases/prisma'

class FindTaskService {
  async execute (id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    return task
  }
}

export { FindTaskService }
