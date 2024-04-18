const express = require('express');
const CategoryService = require('../services/categories.services');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});  

router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const category = await service.findOne(categoryId);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

router.get('/:categoryId/products', async (req, res) => {
  const { categoryId } = req.params;
  const products = await service.findProducts(categoryId);
  res.json(products);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json({
    message: 'Created',
    data: newCategory,
  });
});

router.patch('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  const category = await service.update(categoryId, body);
  res.json(category);
});

router.delete('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const category = await service.delete(categoryId);
  res.json(category);
});

module.exports = router;