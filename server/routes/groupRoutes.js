// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require auth
router.use(authMiddleware);

router.post('/', groupController.createGroup); // POST /api/groups
router.post('/join', groupController.joinGroup); // POST /api/groups/join
router.get('/mine', groupController.getMyGroups); // GET /api/groups/mine
// Get details of a specific group
router.get('/group/:groupId', groupController.getGroupDetails);

// Get all expenses for a group
router.get('/expenses/group/:groupId', groupController.listGroupExpenses);

module.exports = router;
