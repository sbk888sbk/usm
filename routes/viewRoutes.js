const express = require('express');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/dashboard', viewController.getDashboard);
router.get('/report', viewController.getReport)

module.exports = router;