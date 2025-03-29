// controllers/expenseController.js
const Expense = require('../models/Expense');
const Group = require('../models/Group');

exports.createExpense = async (req, res) => {
  try {
    const { category, amount, description, date, groupId } = req.body;

    // If groupId is provided, optionally check if the user is part of that group:
    // (Optional security check)
    const group = await Group.findById(groupId);
    if (group && !group.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not a member of this group' });
    }

    const newExpense = new Expense({
      userId: req.user._id,
      groupId: groupId || null,
      category,
      amount,
      description,
      date: date || new Date(),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    // If you want to show personal + group
    // find expenses where userId === req.user._id
    // OR user is included in the group's members

    // Approach A: Just personal
    // const expenses = await Expense.find({ userId: req.user._id });

    // Approach B: personal + group
    // 1) find groups user is in
    const groups = await Group.find({ members: req.user._id }).select('_id');
    const groupIds = groups.map(g => g._id);

    // 2) find expenses where ( userId = user OR groupId in groupIds )
    const expenses = await Expense.find({
      $or: [
        { userId: req.user._id },
        { groupId: { $in: groupIds } }
      ]
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, description, date } = req.body;

    let expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update fields
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await expense.remove();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    // optional membership check
    const group = await Group.findById(groupId);
    if (!group || !group.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not in this group' });
    }

    const expenses = await Expense.find({ groupId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
