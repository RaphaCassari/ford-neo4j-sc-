const express = require('express'),
    router = express.Router(),
    Usercontroller = require('../controllers/courseController'),
    userController = new Usercontroller()

router.get('/', userController.get)
router.post('/createMany', userController.createMany)

module.exports = router;