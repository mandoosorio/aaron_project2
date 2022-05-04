const router = require('express').Router();
const golferRoutes = require('./golferRoutes');
const imageRoutes = require("./image-routes");
const scoreRoutes = require("./scoreRoutes");

router.use('/golfer', golferRoutes);
router.use("/image", imageRoutes);
router.use("/score", scoreRoutes);

module.exports = router;
