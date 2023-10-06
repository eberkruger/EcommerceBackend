export const verifyCartAcces = (req, res, next) => {
  if (req.user.cart === req.params.cid) {
    next()
  } else {
    res.send({status: 'failure', message: 'Solo puedes usar tu carrito'})
  }
}