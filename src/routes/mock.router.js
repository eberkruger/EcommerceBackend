import { Router } from "express"
import getMocksProductsController from "../controllers/mock.controller.js"

const router = Router()

router.get('/', getMocksProductsController)

export default router