import { prisma } from '~databases/prisma'

interface CreateTaskServiceRequest {
  title: string;
  description?: string;
  done: boolean;
  deadline?: Date;
}

class CreateTaskService {
  async execute ({
    title,
    description,
    done,
    deadline
  }: CreateTaskServiceRequest) {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        done,
        deadline
      }
    })

    return task
  }
}

export { CreateTaskService }
