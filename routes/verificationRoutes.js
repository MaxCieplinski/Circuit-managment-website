const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

router.get('/sign-up', verificationController.verification_signup_get);
router.post('/sign-up', verificationController.verification_signup_post);
router.get('/log-in', verificationController.verification_login_get);
router.post('/log-in', verificationController.verification_login_post);
router.post('/log-out', verificationController.verification_logout_post);

module.exports = router;