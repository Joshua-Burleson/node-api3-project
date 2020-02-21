const express = require('express');
const { validateUser } = require('../custom-middleware/customMiddleware');
const IDsubrouter = require('./userIDSubRouter');
const { get, insert } = require('./userDb');
const router = express.Router();

router.use('/:id', IDsubrouter);

router.post('/', validateUser, async (req, res) => {
  try {
    const user = {name: req.body.name};
    const addedUser = await insert(user);
    res.status(200).send(JSON.stringify(addedUser));
  }
  catch(exception) {
    res.status(500).send(String(exception));
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await get();
    res.status(200).send(JSON.stringify(users));
  }
  catch(exception){
    res.status(500).send(String(exception));
  }
});


module.exports = router;
