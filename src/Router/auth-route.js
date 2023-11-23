const express = require('express')
const authController = require('../controllers/auth-controller')
const authenticateMiddleware = require('../middlewares/authenticate');
const router = express.Router()


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/product', authController.createProduct)
router.get('/product', authController.allproduct)
router.get('/me', authenticateMiddleware, authController.getMe);
router.delete('/product', authController.deleteProduct)
router.put('/product', authController.updatedProduct)
router.post('/upload', authController.uploadProductImg)
router.post('/order', authController.createOrder);
router.get('/getorder', authController.allOrder);
module.exports = router;