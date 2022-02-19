const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.index_get);
router.get('/dashboard', dashboardController.dashboard_get);
router.get('/dashboard-settings', dashboardController.dashboard_settings_get);
router.post('/dashboard-settings', dashboardController.dashboard_settings_post);
router.get('/leds/:id?', dashboardController.leds_get);
router.put('/leds/:id?', dashboardController.leds_put);
router.post('/lcd-text', dashboardController.lcd_text_post);

module.exports = router;