import { z } from 'zod'
import type { Request, Response } from 'express'
import { CreateTaskService } from '~services/CreateTask.service'
import { DeleteTaskService } from '~services/DeleteTask.service'
import { FindTaskService } from '~services/FindTask.service'
import { ListTasksService } from '~services/ListTasks.service'
import { UpdateTaskService } from '~services/UpdateTask.service'

class TaskController {
  public async create (req: Request, res: Response) {
    const createTaskBodySchema = z.object({
      title: z.string(),
      description: z.string().optional(),
      done: z.boolean().default(false),
      deadline: z.string().date().optional()
    })

    const { title, description, done, deadline } = createTaskBodySchema.parse(req.body)
    const createTask = new CreateTaskService().execute

    const task = await createTask({
      title,
      description,
      done,
      deadline: deadline ? new Date(deadline) : undefined
    })

    req.io.emit('taskCreated', task)

    res.status(200).json(task)
  }

  public async list (_req: Request, res: Response) {
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
    const updateTaskParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = updateTaskParamsSchema.parse(req.params)

    const updateTaskBodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      done: z.boolean().optional(),
      deadline: z.string().optional().transform((str) => str && new Date(str))
    })
    const { title, description, done, deadline } = updateTaskBodySchema.parse(req.body)
    const updateTask = new UpdateTaskService().execute
    await updateTask(id, {
      title,
      description,
      done,
      deadline: deadline ? new Date(deadline) : undefined
    })

    const listTasks = new ListTasksService().execute

    const newTaskList = await listTasks()

    req.io.emit('taskEdited', newTaskList)

    res.status(200).send()
  }

  public async delete (req: Request, res: Response) {
    const deleteTaskParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = deleteTaskParamsSchema.parse(req.params)

    const deleteTask = new DeleteTaskService().execute
    await deleteTask(id)

    req.io.emit('taskDeleted', id)

    res.status(200).send()
  }
}

export { TaskController }
