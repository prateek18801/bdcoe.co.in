const router = require("express").Router();
const userController = require("../controllers/user");
const { ifRegistrationOpen } = require("../middlewares/registration");

router.get("/register", ifRegistrationOpen, userController.getRegister);
router.post("/registerg82Oa7j1Px7CXYR3LdtyTNSXH9j7m9Jp", ifRegistrationOpen, userController.postRegister);
router.post("/contactqj5bJpdoFu2rwWBdXkGbeliJqLNGBqjT", userController.postContact);

module.exports = router;