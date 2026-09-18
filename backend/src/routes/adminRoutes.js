const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncHandler = require("../utils/asyncHandler");

router.use(auth, admin);
router.get("/dashboard", asyncHandler(adminController.dashboard));

module.exports = router;
