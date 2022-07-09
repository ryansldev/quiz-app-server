import { celebrate, Joi } from 'celebrate'
import { Router } from 'express'
import { TaskController } from '~controllers/Task.controller'

const taskController = new TaskController()
const router = Router()

router.post('/tasks', celebrate({
  body: {
    title: Joi.string().not().empty().required(),
    description: Joi.string().not().empty().required(),
    done: Joi.boolean().not().empty().required()
  }
}), taskController.create)
router.get('/tasks', taskController.list)
router.get('/tasks/:id', taskController.find)
router.put('/tasks/:id', celebrate({
  body: {
    title: Joi.string(),
    description: Joi.string(),
    done: Joi.boolean()
  }
}), taskController.update)
router.delete('/tasks/:id', taskController.delete)

export { router }
