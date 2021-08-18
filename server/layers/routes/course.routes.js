const express = require('express'),
    router = express.Router(),
    Usercontroller = require('../controllers/courseController'),
    userController = new Usercontroller()

router.get('/', userController.getCourses)
router.post('/createMany', userController.createManyCourse)

module.exports = router;