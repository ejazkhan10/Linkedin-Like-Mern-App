const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

//@route  /api/posts
//desc    retrieves all the posts
//@access Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .then(posts => {
      if (posts) {
        return res.status(200).json(posts);
      } else {
        return res.status(404).json({ NoPosts: "No Posts found" });
      }
    })
    .catch(err => res.json({ No: "aaaa" }));
});

//@route  /api/posts/:post_id
//desc    get post by post id
//@access public

router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      return res.status(200).json(post);
    })
    .catch(err => res.status(404).json({ NotFound: "Post does not exist" }));
});

//@route  /api/posts
//desc    add posts
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route  /api/posts/:post_id
//desc    delete post
//@access Private

router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ NotAuthorized: "User not authorized" });
          }
          post.remove().then(() => res.json({ Success: true }));
        })
        .catch(err => res.status(404).json({ post: "Post not found" }));
    });
  }
);

//@route  /api/posts/like/:post_id
//desc    like post
//@access Private

router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ AlreadtLiked: "User Already Liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ post: "Post Not Found" }));
    });
  }
);

//@route  /api/posts/unlike/:post_id
//desc    unlike post
//@access Private

router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post.save().then(post => {
              return res.status(200).json(post);
            });
          } else {
            return res
              .status(404)
              .json({ NotLiked: "You haven't liked this post" });
          }
        })
        .catch(err => res.status(404).json({ NotFound: "Post Not Found" }));
    });
  }
);

//@route  /api/posts/comment/:post_id
//desc    comment on post
//@access Private

router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ notfound: "Post does not exist" }));
  }
);

//@route  /api/posts/comment/:post_id/:comment_id
//desc    Delete comment on post
//@access Private

router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ NoComment: "you haven't commented" });
        }

        //Find index of comment
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice out of arra
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ notfound: "Post does not exist" }));
  }
);

module.exports = router;
