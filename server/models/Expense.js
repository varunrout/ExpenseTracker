const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, // Update category to have subcategory as well
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model('Expense', expenseSchema);
