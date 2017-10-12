const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const homeController = require('../controllers/homeController')
const apiController = require('../controllers/apiController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
//const reviewController = require('../controllers/reviewController')

router.get('/', catchErrors(homeController.getHome))

router.post('/api/fileUpload', apiController.upload, catchErrors(apiController.resize), apiController.fileUpload)

router.post('/register', userController.validateRegister, userController.register, authController.afterLogin)
router.post('/login', authController.login, authController.afterLogin)
router.get('/logout', authController.isLoggedIn, authController.logout)
router.post('/user/passport/change', catchErrors(userController.updatePassportData))
router.post('/auth/password/change', authController.confirmedPassword, catchErrors(authController.changePassword))
router.post('/account/forgot', catchErrors(authController.forgot))
router.get('/account/reset/:token', catchErrors(authController.reset))
router.post('/account/reset/:token', authController.confirmedPassword, catchErrors(authController.update))

module.exports = router
