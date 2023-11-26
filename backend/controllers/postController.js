const asyncHandler = require('express-async-handler');


// @DESC    GET ALL POSTS
// @ROUTE   GET api/posts
// @ACCESS  PRIVATE 

const getPosts = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: 'All Posts'
    });
});

// @DESC    GET A SINGLE POST
// @ROUTE   GET api/post/:id
// @ACCESS  PRIVATE 

const getSinglePost = (req, res) => {
    res.status(200).json({
        message: `Post ID Is: ${req.params.id}`
    });
}

// @DESC    CREATE A POST
// @ROUTE   POST api/post
// @ACCESS  PRIVATE 

const createPost = (req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('Title Is Required');
    }
    res.status(200).json({
        message: 'Create A Single Post.',
        text: req.body.title
    });
}

// @DESC    UPDATE A POST
// @ROUTE   PUT api/posts/:id
// @ACCESS  PRIVATE 

const updatePost = (req, res) => {
    res.status(200).json({
        message: `Update Post With ID: ${req.params.id}`
    });
}

// @DESC    DELETE A POST
// @ROUTE   DELETE api/post/:id
// @ACCESS  PRIVATE 

const deletePost = (req, res) => {
    res.status(200).json({
        message: `Delete Post With ID: ${req.params.id}`
    });
}

module.exports = {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}