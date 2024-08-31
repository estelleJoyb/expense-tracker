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
      where: { UserId: req.user.id },  // Utilisez 'UserId' au lieu de 'user'
      order: [['date', 'DESC']],       // Trie par date décroissante
    });
    res.json(transactions);
  } catch (err) {
    console.error('Error in getTransactions:', err);  // Ajouter un log pour l'erreur
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
    console.error('Error in deleteTransaction:', err);  // Ajouter un log pour l'erreur
    res.status(500).send('Server error');
  }
};
