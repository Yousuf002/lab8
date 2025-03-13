const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');
const auth = require('../Middleware/auth');

// All routes are protected
router.use(auth);

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
