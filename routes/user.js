const router = require("express").Router();
const userController = require("../controllers/user");
const { ifRegistrationOpen } = require("../middlewares/registration");
const { contactLimiter, eventLimiter } = require("../middlewares/limiter");

router.get("/register", ifRegistrationOpen, userController.getRegister);
router.post("/registerg82Oa7j1Px7CXYR3LdtyTNSXH9j7m9Jp", ifRegistrationOpen, userController.postRegister);
router.post("/contactqj5bJpdoFu2rwWBdXkGbeliJqLNGBqjT", contactLimiter, userController.postContact);
router.post("/eventeQotDxuv9fNSCJS1IVIhYplZME8WK3g3", eventLimiter, userController.postEvent);

module.exports = router;