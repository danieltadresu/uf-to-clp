const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.add);

router.get('/:email/:password', userController.get);

module.exports = router;