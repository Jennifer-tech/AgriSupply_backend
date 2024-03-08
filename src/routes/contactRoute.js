const router = require("express").Router();
const validate = require("../middlewares/validateMiddleware");
const { isAuth } = require("../middlewares/authMiddleware");
const {
    CreateSchema,
} = require("../schemas/contactSchema");
const {
    createContact,
} = require("../controllers/contactCtrl");

router.post("/submit", validate(CreateSchema), createContact );


module.exports = router