import { Router } from 'express'
import cartsController from '../controllers/carts.controller.js'
import passport from 'passport'
import { verifyCartAcces } from '../middlewares/cars.middleware.js'
import { authorization } from '../config/auth.config.js'

const router = Router()

router.get('/', cartsController.getCarts)

router.get('/:cid', cartsController.getCartById)

router.post('/', cartsController.addCart)

router.post('/:cid/products/:pid', passport.authenticate('jwt', {session: false}), authorization('USER' || 'PREMIUM'), verifyCartAcces, cartsController.addProduct)

router.put('/:cid', cartsController.updateAllProducts)

router.put('/:cid/products/:pid', cartsController.updateQuantity)

router.delete('/:cid', cartsController.deleteAllProductsOfCart)

export default router