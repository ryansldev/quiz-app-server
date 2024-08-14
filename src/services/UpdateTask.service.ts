import { prisma } from '~databases/prisma'

type DataType = {
  title?: string;
  description?: string;
  done?: boolean;
  deadline?: Date;
}

class UpdateTaskService {
  async execute (id: string, data: DataType) {
    await prisma.task.update({
      where: {
        id
      },
      data
    })
  }
}

export { UpdateTaskService }
