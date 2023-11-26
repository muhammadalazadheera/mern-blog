const express = require('express');
const router = express.Router();
const {getPosts, getSinglePost, createPost, updatePost, deletePost} = require('../controllers/postController');

// Fetch All Posts
router.get('/posts', getPosts);

// Fetch A Single Post
router.get('/post/:id', getSinglePost);

// Create A Post
router.post('/post', createPost);

// Update A Post
router.put('/post/:id', updatePost);

// Delete A Post
router.delete('/post/:id', deletePost);

module.exports = router;