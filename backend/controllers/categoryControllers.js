import Category from "../models/Category.js";


export const AddCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const DeleteCategory = async (req, res) => {
    const id = req.params.id;

    const category = await Category.findById(id); // Find the category by ID

    await category.remove(); // Remove the category from the database
    res.send("Category deleted");
};

