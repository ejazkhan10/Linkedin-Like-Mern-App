const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const User = require("../../models/User");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.get("/", (req, res) => res.json({ Working: "test user route" }));

//Route   /api/users/register
//desc    Resiters user
//access  Public
router.post("/register", (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "User already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});

//Route  users/api/login
//desc    used to login a user
//access  public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(404).json(errors);
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          // User password matched
          //Create jwt payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          jwt.sign(
            payload,
            keys.secretOrkey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
});

//Route  /api/users/current
// desc  get current user
// access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

//Route /api/users/registered
//desc  Get registered users
//access Public

router.get("/registered", (req, res) => {
  User.find()
    .then(users => {
      var length = users.length;
      var registeredusers = [];

      for (var i = 0; i < length; i++) {
        registeredusers[i] =
          "Email: " + users[i].email + " and  Name: " + users[i].name;
      }

      res.json({ registeredusers });
    })
    .catch(err => {
      return res.status(404).json({ NotFound: "No users registered" });
    });
});

module.exports = router;
