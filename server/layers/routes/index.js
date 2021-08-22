/* 
if (express().get('env') === 'development') {
    const devRouter = require('./dev.routes.js');
    routes.use(devRouter);
}
*/
const userRoute = require('./user/user.routes');
const courseRoute = require('./course.routes');
const MainController = require('../controllers/mainController')
const express = require('express');
const router = express.Router();

mainController = new MainController()


router.use('/user', userRoute);
router.use('/course', courseRoute)
router.post('/getLabel', mainController.getLabel);

router.get('/', function(req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});

module.exports = router;