const router = require("express").Router();
const errorController = require("../controllers/error");
const userController = require("../controllers/user");
const { ifRegistrationOpen } = require("../middlewares/registration");
const { contactLimiter, eventLimiter, feedbackLimiter } = require("../middlewares/limiter");

router.get("/register", ifRegistrationOpen, userController.getRegister);
router.get("/feedback", ifRegistrationOpen, userController.getFeedback);
router.post("/registerg82Oa7j1Px7CXYR3LdtyTNSXH9j7m9Jp", ifRegistrationOpen, userController.postRegister);
router.post("/contactqj5bJpdoFu2rwWBdXkGbeliJqLNGBqjT", contactLimiter, userController.postContact);
router.post("/eventeQotDxuv9fNSCJS1IVIhYplZME8WK3g3", eventLimiter, userController.postEvent);
router.post("/feedbackzhS6FKDWRivf6ke0lCv7y0Y4asGjVeoI", feedbackLimiter, userController.postFeedback);
router.get("/q8CLbbym1GRf27Ngh685vHWqtZyVYwbi", errorController.getFailed);
router.get("/snz4Um9AKSkiAzq3c7IuRI0qdex3qTkZ", errorController.getClosed);

module.exports = router;