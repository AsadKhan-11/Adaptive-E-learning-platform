const router = require("express").Router();
const { signup } = require("../Controllers/AuthController");

router.post("/signup", signup);

module.exports = router;
