const express = require('express');
const router = express.Router();
const { show } = require('../controllers/dashboard-controller');

router.get('/', show);

module.exports = router;