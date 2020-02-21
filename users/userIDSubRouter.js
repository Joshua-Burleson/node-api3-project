const express = require('express');
const { validateUserId, validateUser } = require('../custom-middleware/customMiddleware');
const { update, remove } = require('./userDb');
const userPostsRouter = require('./userPostsSubRouter');
const router = express.Router({mergeParams: true});

router.use('/posts', userPostsRouter);
router.use(validateUserId);

router.get('/', (req, res) => {
    try {
      res.status(200).send(JSON.stringify(req.user));
    }
    catch(exception){
      res.status(500).send(String(exception));
    }
  });


router.put('/', validateUser, async (req, res) => {
    try {
        const updated = update(req.user.id, req.user);
        res.status(200).send(updated);
    }
    catch(exception){
        res.status(500).send(String(exception));
    }
});

router.delete('/', async (req, res) => {
    try {
        const deleted = await remove(req.user.id);
        const deletedMessage = {records_deleted: deleted}
        res.status(202).send(JSON.stringify(deletedMessage));
    }
    catch(exception){
        res.status(500).send(String(exception));
    }
});

module.exports = router;