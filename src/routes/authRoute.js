const router = require("express").Router();
const validate = require("../middlewares/validateMiddleware");
const { isAuth } = require("../middlewares/authMiddleware");
const {
    RegisterSchema,
    LoginSchema,
} = require("../schemas/userSchema");
const {
    login,
    register,
} = require("../controllers/authCtrl");

router.post("/login", validate(LoginSchema), login);
router.post("/register", validate(RegisterSchema), register);

module.exports = router