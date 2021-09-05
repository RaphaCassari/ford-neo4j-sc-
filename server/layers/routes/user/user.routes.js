const express = require('express'),
    router = express.Router(),
    Usercontroller = require('../../controllers/userController'),
    userController = new Usercontroller()

router.get('/', userController.get);
router.post('/create', userController.create)
router.post('/login', userController.login)

module.exports = router;