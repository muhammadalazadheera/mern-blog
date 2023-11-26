const asyncHandler = require('express-async-handler');
const Posts = require('../models/postModel');

// @DESC    GET ALL POSTS
// @ROUTE   GET api/posts
// @ACCESS  PRIVATE 

const getPosts = asyncHandler(async(req, res) => {
    const posts = await Posts.find();
    res.status(200).json(posts);
});

// @DESC    GET A SINGLE POST
// @ROUTE   GET api/post/:id
// @ACCESS  PRIVATE 

const getSinglePost = asyncHandler(async (req, res) => {
    const post = await Posts.findById(req.params.id);
    res.status(200).json(post);
})

// @DESC    CREATE A POST
// @ROUTE   POST api/post
// @ACCESS  PRIVATE 

const createPost = asyncHandler(async(req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('Title Is Required');
    }

    const post = await Posts.create({
        title: req.body.title
    })

    res.status(200).json(post);
});

// @DESC    UPDATE A POST
// @ROUTE   PUT api/posts/:id
// @ACCESS  PRIVATE 

const updatePost = asyncHandler(async (req, res) => {
    const post = await Posts.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error('Post not found');
    }

    const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedPost);
});

// @DESC    DELETE A POST
// @ROUTE   DELETE api/post/:id
// @ACCESS  PRIVATE 

const deletePost = asyncHandler(async (req, res) => {
    const post = await Posts.findById(req.params.id);
    if(!post){
        res.status(400);
        throw new Error('Post not found');
    }

    await post.deleteOne();

    res.status(200).json({
        message: `Post was deleted successfully!`
    });
});

module.exports = {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}