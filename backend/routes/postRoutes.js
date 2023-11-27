const express = require('express');
const router = express.Router();
const {getPosts, getSinglePost, createPost, updatePost, deletePost} = require('../controllers/postController');
const {protect} = require('../middleware/authMiddleware');

// Fetch All Posts
router.get('/posts', protect, getPosts);

// Fetch A Single Post
router.get('/post/:id', protect, getSinglePost);

// Create A Post
router.post('/post', protect, createPost);

// Update A Post
router.put('/post/:id', protect, updatePost);

// Delete A Post
router.delete('/post/:id', protect, deletePost);

module.exports = router;