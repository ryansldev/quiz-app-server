import { prisma } from '~databases/prisma'

class CreateTaskService {
  async execute (title: string, description: string, done: boolean) {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        done
      }
    })

    return task
  }
}

export { CreateTaskService }
