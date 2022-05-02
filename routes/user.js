const router = require("express").Router();
const errorController = require("../controllers/error");
const userController = require("../controllers/user");
const { ifRegistrationOpen } = require("../middlewares/registration");
const { contactLimiter, eventLimiter, feedbackLimiter } = require("../middlewares/limiter");

router.get("/register", ifRegistrationOpen, userController.getRegister);
router.get("/feedback", ifRegistrationOpen, userController.getFeedback);
router.post("/register", ifRegistrationOpen, eventLimiter, userController.postRegister);
router.post("/feedback", feedbackLimiter, userController.postFeedback);

router.get("/api/v1/availability", ifRegistrationOpen, userController.getTeamAvailability);

router.post("/contactqj5bJpdoFu2rwWBdXkGbeliJqLNGBqjT", contactLimiter, userController.postContact);
router.get("/q8CLbbym1GRf27Ngh685vHWqtZyVYwbi", errorController.getFailed);
router.get("/snz4Um9AKSkiAzq3c7IuRI0qdex3qTkZ", errorController.getClosed);

module.exports = router;