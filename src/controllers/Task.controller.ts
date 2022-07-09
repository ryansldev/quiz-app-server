import type { Request, Response } from 'express'
import { CreateTaskService } from '~services/CreateTask.service'
import { DeleteTaskService } from '~services/DeleteTask.service'
import { FindTaskService } from '~services/FindTask.service'
import { ListTasksService } from '~services/ListTasks.service'
import { UpdateTaskService } from '~services/UpdateTask.service'

class TaskController {
  public async create (req: Request, res: Response) {
    const { title, description, done } = req.body
    const createTask = new CreateTaskService().execute

    const task = await createTask(title, description, done)
    res.status(200).json(task)
  }

  public async list (req: Request, res: Response) {
    const listTasks = new ListTasksService().execute

    const tasks = await listTasks()

    res.status(200).json(tasks)
  }

  public async find (req: Request, res: Response) {
    const { id } = req.params
    const findTask = new FindTaskService().execute
    const task = await findTask(id)
    res.status(200).json(task)
  }

  public async update (req: Request, res: Response) {
    const { id } = req.params
    const data = req.body
    const updateTask = new UpdateTaskService().execute
    await updateTask(id, data)
    res.status(200).send()
  }

  public async delete (req: Request, res: Response) {
    const { id } = req.params
    const deleteTask = new DeleteTaskService().execute
    await deleteTask(id)
    res.status(200).send()
  }
}

export { TaskController }
