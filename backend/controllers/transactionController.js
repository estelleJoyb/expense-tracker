const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { description, amount, category } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.id,
      description,
      amount,
      category,
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    await transaction.remove();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
