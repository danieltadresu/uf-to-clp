const express = require('express');
const conversionController = require('../controllers/conversion');

const router = express.Router();

router.get('/:date/:amount', conversionController.get);

// router.post('/', conversionController.add);

// router.delete('/', conversionController.delete);

module.exports = router;