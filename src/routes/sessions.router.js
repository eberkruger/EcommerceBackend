import { Router } from 'express'
import usersController from '../controllers/users.controller.js'
import passport from 'passport'
import { authorization } from "../config/auth.config.js"

const router = Router()

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerError', failureMessage: true }), usersController.register)

router.get('/registerError', usersController.registerError)

router.get('/all', usersController.getAllUsers)

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginError', failureMessage: true }), usersController.login)

router.get('/loginError', usersController.loginError)

router.get('/github', passport.authenticate('github', { scope: 'user:email' }), usersController.github)

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), usersController.githubcallback)

router.get('/logout', usersController.logout)

router.get('/current', authorization('USER'), passport.authenticate('jwt', { session: false }), usersController.current)

router.post('/premium/:uid', passport.authenticate('jwt', { session: false }), usersController.changeRole)

export default router