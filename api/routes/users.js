const express = require('express');
const UserService = require('../services/users.services');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await service.findOne(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json({
    message: 'Created',
    data: newUser,
  });
});

router.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  const user = await service.update(userId, body);
  res.json(user);
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await service.delete(userId);
  res.json(user);
});

module.exports = router;
