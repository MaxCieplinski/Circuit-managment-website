const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.index_get);
router.get('/dashboard', dashboardController.dashboard_get);
router.get('/dashboard-settings', dashboardController.dashboard_settings_get);
router.post('/dashboard-settings', dashboardController.dashboard_settings_post);

module.exports = router;