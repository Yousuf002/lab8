const Category = require('../Model/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const category = new Category({
      name,
      description,
      userId: req.user.id
    });
    
    await category.save();
    
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories for the logged-in user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const category = await Category.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    if (name) category.name = name;
    if (description) category.description = description;
    
    await category.save();
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    await category.remove();
    
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
