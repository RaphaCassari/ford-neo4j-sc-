const express = require('express'),
    router = express.Router(),
    Usercontroller = require('../../controllers/userController'),
    userController = new Usercontroller()

router.post('/', userController.userById);
router.post('/create', userController.createCandidate)

module.exports = router;