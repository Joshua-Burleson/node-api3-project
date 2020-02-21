const express = require('express');
const { validateUserId, validatePost } = require('../custom-middleware/customMiddleware');
const { getUserPosts } = require('./userDb');
const insertPost = require('../posts/postDb').insert;
const router = express.Router({mergeParams: true});

router.use(validateUserId);


router.get('/', async (req, res) => {
    try {
        const userPosts = await getUserPosts(req.user.id);
        res.status(200).send(JSON.stringify(userPosts));
    }
    catch(exception){
        res.status(500).send(String(exception));
    }
});


router.post('/', validatePost, async (req, res) => {
    try {
      const post = {user_id: req.user.id, text: req.body.text};
      const addedPost = await insertPost(post);
      res.status(200).send(JSON.stringify(addedPost));
    }
    catch(exception){
      res.status(500).send(String(exception));
    }
});


module.exports = router;