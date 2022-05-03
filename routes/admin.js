const router = require("express").Router();
const adminController = require("../controllers/admin");
const { isAuthenticated } = require("../middlewares/authwall");

router.get("/", adminController.getLogin);
router.get("/logout", adminController.getLogout);
router.get("/registrationstatus/:userid", isAuthenticated, adminController.getRegistrationStatus);
router.post("/toggleregistration", isAuthenticated, adminController.postToggle);
router.post("/login", adminController.postLogin);
router.get("/panel/:userid", isAuthenticated, adminController.getPanel);
router.get("/eventinfo/:userid", isAuthenticated, adminController.getEventLog);

router.get("/eventlog", isAuthenticated, adminController.downloadEventLog);
router.get("/feedbacklog", isAuthenticated, adminController.downloadFeedbackLog);
router.get("/participantlog", isAuthenticated, adminController.downloadParticipantLog);

router.get("/contactinfo/:userid", isAuthenticated, adminController.getContactLog);
// router.get("/sendinvite", adminController.getSendInvite);


module.exports = router;