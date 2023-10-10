const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories with associated products
router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            attributes: ['id', 'category_name'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
                }
            ]
        });
        res.json(categoryData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get one category by id with associated products
router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'category_name'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
                }
            ]
        });

        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }

        res.json(categoryData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a new category
router.post('/', async (req, res) => {
    try {
        const newCategory = await Category.create({
            category_name: req.body.category_name
        });

        res.status(200).json(newCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update a category by id
router.put('/:id', async (req, res) => {
    try {
        await Category.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const updatedCategory = await Category.findByPk(req.params.id);

        if (!updatedCategory) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }

        res.status(200).json(updatedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete a category by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedCategory) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }

        res.status(200).json(deletedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
