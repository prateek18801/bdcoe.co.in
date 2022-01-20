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
module.exports = router;