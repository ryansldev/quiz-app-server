import { Router } from 'express'
import { TaskController } from '~controllers/Task.controller'

const taskController = new TaskController()
const router = Router()

router.post('/tasks', taskController.create)
router.get('/tasks', taskController.list)
router.get('/tasks/:id', taskController.find)
router.put('/tasks/:id', taskController.update)
router.delete('/tasks/:id', taskController.delete)

export { router }
