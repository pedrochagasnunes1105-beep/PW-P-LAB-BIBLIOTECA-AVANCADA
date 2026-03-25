const statsService = require("../services/stats.service");
const getStats = async (req, res, next) => {
 try {
     const stats = await statsService.getStats();
 res.status(200).json(stats);
 } catch (error) {
 next(error);
 }
};
const getGenresStats = async (req, res, next) => {
 try {
 const stats = await statsService.getGenresStats();
 res.status(200).json(stats);
 } catch (error) {
 next(error);
 }
};
module.exports = {
 getStats,
 getGenresStats,
};
