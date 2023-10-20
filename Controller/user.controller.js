const { uuid } = require("uuidv4");
const userSchema = require("../Modules/userSchema");
const path = require("path");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const homeroute = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/index.html"));
};

const visitResister = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/Resister.html"));
};

const visitlogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../Views/Login.html"));
};

// app.post('/login',

//   function(req, res) {
//     res.redirect('/');
//   });

const createUser = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (user) {
      return res.send({ message: "User already exists" });
    }
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).send({ message: "Error hashing password" });
      }
      const NewUser = new userSchema({
        // id: uuid(),
        email: req.body.email,
        password: hash,
      });
      await NewUser.save();
      res.redirect("/user/login");
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error, something is broken" });
  }
};

const checkresister = passport.authenticate("local", {
  failureRedirect: "/user/login",
  successRedirect: "/user/profile",
});

const loginUser = (req, res) => {
  res.redirect("/");
};

const profile = (req, res) => {
  // if(req.isAuthenticated()){

  // }
  res.sendFile(path.join(__dirname, "../Views/Profile.html"));

  // res.sendFile('../Views/Profile.html')
};

module.exports = {
  homeroute,
  visitResister,
  createUser,
  visitlogin,
  profile,
  checkresister,
  loginUser,
};
