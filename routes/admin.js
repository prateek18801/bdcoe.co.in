const router = require("express").Router();
const adminController = require("../controllers/admin");
const { isAuthenticated } = require("../middlewares/authwall");

router.get("/", adminController.getLogin);
router.get("/logout", adminController.getLogout);
router.post("/loginiwpiQhRjbUIpB7j3aMvqWk51seFOZ1qJ", adminController.postLogin);
router.get("/panelwC448WgVJxvyx9tsA8rN5nQ67dRU1F3G/:userid", isAuthenticated, adminController.getPanel);
router.get("/statusozp7Fi8bKbDtNFGLXnOTsODvVuv52LPE/:userid", isAuthenticated, adminController.getRegistrationStatus);
router.get("/eventlog8hUM5uE8unNJCOiGWhY197SqKPOJtwiJ/:userid", isAuthenticated, adminController.getEventLog);
router.post("/togglenrUrxS5yvupftlt9RW6c1NeOdmz6ptOs", isAuthenticated, adminController.postToggle);
router.get("/contactlogtehtp5Dy6FqYB6YEKvu4o9xJhlAeE3Xw/:userid", isAuthenticated, adminController.getContactLog);
router.get("/tc7pwG8CkGLZGyNehzxAJrQCejNhDvrh", isAuthenticated, adminController.downloadEventLog);
router.get("/qR8sGo7iS08zWdTmAvIPfK1Dy5SOwRPumgFvS0b5K6UYuU3pKhtXaAEO5bBvCLVe2RL896KztY47f9qFY65B00Ldo4iPdiaPCETVBBLbBQ3hYNi0a4jXx47flsJJy6ei", adminController.downloadFeedbackLog);
// router.get("/sendinvite", adminController.getSendInvite);


module.exports = router;