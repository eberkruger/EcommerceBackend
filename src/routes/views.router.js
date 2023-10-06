import { Router } from "express"
import { authorization } from "../config/auth.config.js"
import viewsController from "../controllers/views.controller.js"
import passport from "passport"

const router = Router()

/* home */
router.get('/', viewsController.getAllProducts)

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
router.get('/resetPassword', passport.authenticate('jwtRequestPassword', {session: false, failureRedirect: 'requestResetPassword'}), viewsController.resetPassword)
router.get('/requestResetPassword', viewsController.requestResetPassword)

export default router;