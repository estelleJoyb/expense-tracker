const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { description, amount, category } = req.body;

  try {
    const transaction = new Transaction({
      UserId: req.user.id,
      description,
      amount,
      category,
      date : new Date()
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error('Error in addTransaction:', err);  // Ajouter un log pour l'erreur
    res.status(500).send('Server error');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { UserId: req.user.id }, 
      order: [['date', 'DESC']],  //to have the most recent fist
    });
    res.json(transactions);
  } catch (err) {
    console.error('Error in getTransactions:', err);  
    res.status(500).send('Server error');
  }
};

exports.updateTransaction = async (req, res) => {
  const { description, amount, category } = req.body;

  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    if (transaction.UserId !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // update values
    transaction.description = description || transaction.description;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    await transaction.save();

    res.json(transaction);
  } catch (err) {
    console.error('Error in updateTransaction:', err);
    res.status(500).send('Server error');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    await transaction.destroy();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error('Error in deleteTransaction:', err);
    res.status(500).send('Server error');
  }
};