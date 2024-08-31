const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

router.get('/', auth, transactionController.getTransactions);
router.post('/', auth, transactionController.addTransaction);

module.exports = router;
