const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/authenticated');

router.get('/get-posts', postController.getPosts);
router.post('/add-post', [auth.ensureAuth], postController.addPost);
router.put("/update-post/:id", [auth.ensureAuth], postController.updatePost);
router.delete("/delete-post/:id", [auth.ensureAuth], postController.deletePost);
router.get("/get-post/:url", postController.getPost);
router.get("/total-posts", [auth.ensureAuth], postController.totalPosts)

module.exports = router;