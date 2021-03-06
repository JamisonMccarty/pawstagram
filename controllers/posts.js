// import the Post model
const Post = require('../models/post')


module.exports = {

     getProfile: async (req,res)=>{
        try{
            const posts = await Post.find({user:req.user.id})
            res.render('profile.ejs', {posts: posts, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getFeed: async (req,res)=>{
        try{
            const posts = await Post.find()
                .sort({ createdAt: 'desc' })
                .lean()
            res.render('feed.ejs', {posts: posts})
        }catch(err){
            console.log(err)
        }
    },
    getPost: async (req, res) => {
      try {
          const post = await Post.findById(req.params.id)
          res.render('post.ejs', {post: post, user: req.user})
      } catch (err){
        console.log(err)
      }
    }
    ,
    getFeed: async (req,res)=>{
        try{
            const posts = await Post.find()
                .sort({ createdAt: 'desc' })
                .lean()
            res.render('feed.ejs', {posts: posts})
        }catch(err){
            console.log(err)
        }
    },
    // finds the post in the database that matches the id (from ":id" in the route) -cc
    
    createPost: async (req, res)=>{
        try{
            await Post.create({
                title: req.body.title, 
                image: '/uploads/' + req.file.filename, 
                caption: req.body.caption,
                likes: 0,
                user: req.user.id
            })
            console.log('Post has been added!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    // creates a post -cc

    likePost: async (req, res)=>{
        try{
            await Post.findOneAndUpdate({_id:req.params.id},
                {
                    $inc : {'likes' : 1}
                })
            console.log('Likes +1')
            res.redirect(`/post/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    },
    // like a post -cc

    deletePost: async (req, res)=>{
        try{
            console.log(req.params)
            await Post.findOneAndDelete({_id:req.params.id})
            console.log('Deleted Post')
            res.redirect('/profile')
        }catch(err){
            res.redirect('/profile')
        }
    }
    // delete a post, if you are the user that created it -cc
}    