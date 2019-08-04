const router =require('express').Router()
const {login,register,allUser} =require('../controllers/userController')

//Registration Route

router.post('/register', register)

// Login ROute

router.post('/login',login)
router.get('/all',allUser)

module.exports= router