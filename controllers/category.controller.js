const Categorymodel = require("../models/category.model");

// Create Category function

exports.createCategory = async (req, res) => {
  try {
    const { categoryName, isStatus } = req.body;  

    if (!categoryName && !isStatus) {
      res.status(400).json({ message: "Category data can not be empty!", statusCode:400 });
    }

    const Category = new Categorymodel({
      categoryName: categoryName,
      isStatus: isStatus
    });

    const savedUser = await Category.save();

    res.status(201).json({ message: "Category data created successfully!", Category: savedUser, statusCode:201});
  } catch (err) {
    res.status(500).json({message: "An error occurred while creating category data", statusCode:500});
  }
};

// Find a Category function

exports.getCategory = async (req, res) => {
  try {
    const getCategory = await Categorymodel.findById(req.params.id);
    res.status(200).json({ message: "get a category successfully", getCategory, statusCode:200});
  } catch (error) {
     res.status(404).json({message: "An error occurred while get a category data", statusCode:404});
  }
};

// Findall Category function

exports.getAllCategories = async (req, res) => {
    try {
      const getCategories = await Categorymodel.find();
      res.status(200).json({ message: "get all category list successfully", getCategories, statusCode:200 });
    } catch (error) {
      res.status(404).json({ message: "An error occurred while getall category data", statusCode:404});
    }
  };

// Update Category function

exports.updateCategory = async (req, res) => {
  try {
      const categoryId = req.params.id;
      const { categoryName, isStatus } = req.body;

      // Your logic to update the category using categoryId
      const updatedCategory = await Categorymodel.findByIdAndUpdate(categoryId, { categoryName, isStatus }, { new: true });

      if (!updatedCategory) {
          return res.status(404).json({ message: 'Category not found' });
      }

      res.json({ message: 'Category updated successfully', data: updatedCategory });
  } catch (error) {
      res.status(500).json({ message: 'Error updating category', error });
  }
};



// Delete Category function

exports.destroyCategory = async (req, res) => {
  const { id } = req.body;
  await Categorymodel.findByIdAndRemove(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Category data not found.", statusCode:(404) });
      } else {
        res.status(200).json({ message: "Category data deleted successfully!", statusCode:(200) });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "An error occurred while deleting Category data", statusCode:(500)});
    });
};
