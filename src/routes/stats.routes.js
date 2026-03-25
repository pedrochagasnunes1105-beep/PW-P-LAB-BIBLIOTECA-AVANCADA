const express = require("express");
const router = express.Router();
const {
 getStats,
 getGenresStats,
} = require("../controllers/stats.controller");
router.get("/", getStats);
router.get("/genres", getGenresStats);
module.exports = router;