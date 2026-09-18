const router = require("express").Router();
const controller = require("../controllers/courseController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncHandler = require("../utils/asyncHandler");

router.get("/", asyncHandler(controller.listCourses));
router.get("/:id", asyncHandler(controller.getCourse));
router.post("/add", auth, admin, asyncHandler(controller.createCourse));
router.delete("/:id", auth, admin, asyncHandler(controller.deleteCourse));

module.exports = router;
