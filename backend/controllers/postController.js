const asyncHandler = require('express-async-handler');
const Posts = require('../models/postModel');
const User = require('../models/userModel');

// @DESC    GET ALL POSTS
// @ROUTE   GET api/posts
// @ACCESS  PRIVATE 

const getPosts = asyncHandler(async(req, res) => {
    const posts = await Posts.find({user: req.user.id});
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
        user: req.user.id,
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

    const user = await User.findById(req.body.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    if(post.user.toString() !== user.id){
        res.status(401);
        throw new Error('User is not authorized');
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

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    if(post.user.toString() !== user.id){
        res.status(401);
        throw new Error('User is not authorized');
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