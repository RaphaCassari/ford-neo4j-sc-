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
const path = require('path');
let multer = require('multer');

const cql = require('../queries/cql');
const db = require('../database/qneo4j');
const excel = require('../utils/excel')

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
let upload = multer({
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(_req, file, callback) {
            //const filename = `${file.originalname}`;
            const filename = `main.xlsx`;
            return callback(null, filename);
        },
    }),
});
router.post('/upload', upload.array('file'), async(req, res) => {
    excelData = await excel.split()
    const { cypher, params } = cql.uploadPdfUsers(excelData)
    const users = await db.execute({ cypher, params });
    return res.json(users);
});

mainController = new MainController()

router.use('/user', userRoute);
router.use('/course', courseRoute)
router.post('/getLabel', mainController.getLabel);
router.get('/graphInfos', mainController.getGraphInfos)

router.get('/', function(req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});

module.exports = router;