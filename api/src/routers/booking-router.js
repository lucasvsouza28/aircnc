const express = require('express');
const router = express.Router();
const {approve, reject} = require('../controllers/booking-controller');

router.post('/:id/approve', approve);
router.post('/:id/reject', reject);

module.exports = router;