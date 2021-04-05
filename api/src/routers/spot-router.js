const express = require('express');
const router = express.Router();
const { store, index } = require('../controllers/spot-controller');
const { store: storeBooking } = require('../controllers/booking-controller');
const multer = require('multer');
const multerConfig = require('../config/multer-config');
const upload = multer(multerConfig);

router.get('/', index);
router.post('/', upload.single('thumbnail'), store);
router.post('/:spot_id/bookings', storeBooking);

module.exports = router;