import { prisma } from '~databases/prisma'

class DeleteTaskService {
  async execute (id: string) {
    await prisma.task.delete({
      where: {
        id
      }
    })
  }
}

export { DeleteTaskService }
