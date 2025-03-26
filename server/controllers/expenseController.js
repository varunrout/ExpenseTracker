// controllers/expenseController.js
const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    // userId from req.user (set in authMiddleware)
    // category, amount, description, date from req.body
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

