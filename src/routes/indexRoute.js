const router = require("express").Router();
const contactRouter = require('./contactRoute')
const authRouter = require('./authRoute');
require('dotenv').config()

router.use('/auth', authRouter)
router.use('/contactUs', contactRouter)
module.exports = router