const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session-controller');

router.get('/', sessionController.index);
router.post('/', sessionController.store);

module.exports = router;