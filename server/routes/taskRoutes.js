// server/routes/taskRoutes.js (Corrected Code)

const express = require('express');
// Ensure all functions are imported here
const { 
    getTasks, 
    addTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskController'); 
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// The problematic line is likely within this section (line 9)
// If any of the imported names above is undefined, the error occurs.

// GET /api/tasks (Fetch all tasks for the user)
// POST /api/tasks (Create a new task)
router.route('/').get(protect, getTasks).post(protect, addTask); 

// PUT /api/tasks/:id (Update a task)
// DELETE /api/tasks/:id (Delete a task)
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask); 

module.exports = router;