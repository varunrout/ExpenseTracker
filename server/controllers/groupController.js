// controllers/groupController.js
const Group = require('../models/Group');
const User = require('../models/User');
const Expense = require('../models/Expense');

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    // e.g. user sends { name: 'My Household' }
    const { name } = req.body;

    // Create group with the current user as the first member
    const group = new Group({
      name,
      members: [req.user._id],
    });
    await group.save();

    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join an existing group
exports.joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Add user if not already a member
    if (!group.members.includes(req.user._id)) {
      group.members.push(req.user._id);
      await group.save();
    }

    res.json({ message: 'Joined the group', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all groups that the current user belongs to
exports.getMyGroups = async (req, res) => {
  try {
    // any group that has req.user._id in members
    const groups = await Group.find({ members: req.user._id });
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getGroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Find the group by ID
    const group = await Group.findById(groupId).populate('members', 'name email');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Ensure the user is part of the group before sending details
    if (!group.members.some(member => member._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not in this group' });
    }

    res.json(group);
  } catch (error) {
    console.error('Error fetching group details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Find the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Ensure the user is a member of the group
    if (!group.members.some(member => member.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not in this group' });
    }

    // Fetch expenses associated with the group
    const expenses = await Expense.find({ groupId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching group expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};