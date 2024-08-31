const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

router.get('/', auth, transactionController.getTransactions);
router.post('/', auth, transactionController.addTransaction);
router.delete('/:id', auth, transactionController.deleteTransaction);
router.put('/:id', auth, transactionController.updateTransaction);

module.exports = router;
