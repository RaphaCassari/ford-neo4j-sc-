const express = require('express'),
    router = express.Router(),
    Usercontroller = require('../controllers/courseController'),
    userController = new Usercontroller()

router.post('/createMany', userController.createMany)
router.post('/getByArea', userController.getByCpf)

module.exports = router;