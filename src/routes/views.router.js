import { Router } from "express"
import { authorization } from "../config/auth.config.js"
import viewsController from "../controllers/views.controller.js"

const router = Router()

/* home */
router.get('/', authorization('USER'), viewsController.getAllProducts)

/* realTimeProducts */
router.get('/realtimeproducts', authorization('ADMIN'), viewsController.realtimeproducts)

/* Carts */
router.get('/carts/:cid', authorization('USER'), viewsController.getCart)

/* chat */
router.get('/chat', viewsController.chat)

/* Sessions */
router.get('/register', viewsController.register)
router.get('/login', viewsController.login)
router.get('/profile', authorization('USER'), viewsController.profile)

export default router;